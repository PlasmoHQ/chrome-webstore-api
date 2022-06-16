import { createReadStream, ReadStream } from "fs"
import got from "got"

const baseAPIUrl = "https://www.googleapis.com"
const refreshTokenURI = `${baseAPIUrl}/oauth2/v4/token`

export type Options = {
  extId: string
  clientId: string
  refreshToken: string
  clientSecret:string
}

export type PublishTarget = "default" | "trustedTesters"

export type GetProjection = "DRAFT" | "PUBLISHED"

export type UploadState = "FAILURE" | "IN_PROGRESS" | "NOT_FOUND" | "SUCCESS"

export const errorMap = {
  extId:
    "No extension ID provided, e.g. https://chrome.google.com/webstore/detail/EXT_ID",
  clientId:
    "To get one: https://github.com/PlasmoHQ/chrome-webstore-api/blob/main/token.md",
  refreshToken:
    "No refresh token provided. To get one: https://github.com/PlasmoHQ/chrome-webstore-api/blob/main/token.md",
  clientSecret: "No client secret provided. To get one: https://github.com/PlasmoHQ/chrome-webstore-api/blob/main/token.md"
}

export const requiredFields = Object.keys(errorMap)

export class ChromeWebstoreAPI {
  options = {} as Options

  constructor(options: Options) {
    for (const field of requiredFields) {
      if (!options[field]) {
        throw new Error(errorMap[field])
      }

      this.options[field] = options[field]
    }
  }

  get uploadEndpoint() {
    return `${baseAPIUrl}/upload/chromewebstore/v1.1/items/${this.options.extId}`
  }

  getPublishEndpoint(target: PublishTarget) {
    return `${baseAPIUrl}/chromewebstore/v1.1/items/${this.options.extId}/publish?publishTarget=${target}`
  }

  getInfoEndpoint(projection: string) {
    return `${baseAPIUrl}/chromewebstore/v1.1/items/${this.options.extId}?projection=${projection}`
  }

  async submit({ filePath = "", target = "default" as PublishTarget }) {
    const accessToken = await this.getAccessToken()

    const { uploadState, itemError } = await this.upload(
      {
        readStream: createReadStream(filePath)
      },
      accessToken
    )

    if (uploadState === "FAILURE" || uploadState === "NOT_FOUND") {
      throw new Error(
        itemError.map(({ error_detail }) => error_detail).join("\n")
      )
    }

    return this.publish(
      {
        target
      },
      accessToken
    )
  }

  async upload({ readStream = null as ReadStream }, _accessToken = "") {
    if (!readStream) {
      throw new Error("Read stream missing")
    }

    const accessToken = _accessToken || (await this.getAccessToken())

    return got
      .put(this.uploadEndpoint, {
        headers: this.getHeaders(accessToken),
        body: readStream,
        throwHttpErrors: false
      })
      .json<{
        uploadState: UploadState
        itemError: Array<Record<string, string>>
      }>()
  }

  async publish({ target = "default" as PublishTarget }, _accessToken = "") {
    const accessToken = _accessToken || (await this.getAccessToken())

    return got
      .post(this.getPublishEndpoint(target), {
        headers: this.getHeaders(accessToken)
      })
      .json()
  }

  async get({ projection = "DRAFT" as GetProjection }, _accessToken = "") {
    const accessToken = _accessToken || (await this.getAccessToken())

    return got
      .get(this.getInfoEndpoint(projection), {
        headers: this.getHeaders(accessToken)
      })
      .json()
  }

  async getAccessToken() {
    const response = await got
      .post(refreshTokenURI, {
        json: {
          client_id: this.options.clientId,
          refresh_token: this.options.refreshToken,
          grant_type: "refresh_token",
          client_secret: this.options.clientSecret
        }
      })
      .json<{
        access_token: string
      }>()

    return response.access_token
  }

  getHeaders(token: string) {
    return {
      Authorization: `Bearer ${token}`,
      "x-goog-api-version": "2"
    }
  }
}
