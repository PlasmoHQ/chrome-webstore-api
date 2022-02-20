import { ReadStream, createReadStream } from "fs"
import got from "got"

const rootURI = "https://www.googleapis.com"
const refreshTokenURI = "https://www.googleapis.com/oauth2/v4/token"
const uploadExistingURI = (id: string) =>
  `${rootURI}/upload/chromewebstore/v1.1/items/${id}`
const publishURI = (id: string, target: string) =>
  `${rootURI}/chromewebstore/v1.1/items/${id}/publish?publishTarget=${target}`
const getURI = (id: string, projection: string) =>
  `${rootURI}/chromewebstore/v1.1/items/${id}?projection=${projection}`

export type Options = {
  extId: string
  clientId: string
  refreshToken: string
}

export type PublishTarget = "default" | "trustedTesters"

export type GetProjection = "DRAFT" | "PUBLISHED"

export type UploadState = "FAILURE" | "IN_PROGRESS" | "NOT_FOUND" | "SUCCESS"

export const errorMap = {
  extId:
    "No extension ID provided, e.g. https://chrome.google.com/webstore/detail/EXT_ID",
  clientId:
    "To get one: https://github.com/fregante/chrome-webstore-upload/blob/main/How%20to%20generate%20Google%20API%20keys.md",
  refreshToken:
    "No refresh token provided. To get one: https://github.com/fregante/chrome-webstore-upload/blob/main/How%20to%20generate%20Google%20API%20keys.md"
}

export const requiredFields = Object.keys(errorMap)

export class ChromeWebstoreClient {
  options = {} as Options

  constructor(options: Options) {
    for (const field of requiredFields) {
      if (!options[field]) {
        throw new Error(errorMap[field])
      }

      this.options[field] = options[field]
    }
  }

  async submit({ filePath = "", target = "default" as PublishTarget }) {
    const token = await this.fetchToken()

    const { uploadState, itemError } = await this.upload({
      readStream: createReadStream(filePath),
      token
    })

    if (uploadState === "FAILURE" || uploadState === "NOT_FOUND") {
      throw new Error(
        itemError.map(({ error_detail }) => error_detail).join("\n")
      )
    }

    return this.publish({
      target,
      token
    })
  }

  async upload({ readStream = null as ReadStream, token = "" }) {
    if (!readStream) {
      throw new Error("Read stream missing")
    }

    return got
      .put(uploadExistingURI(this.options.extId), {
        headers: this._headers(token || (await this.fetchToken())),
        body: readStream
      })
      .json<{
        uploadState: UploadState
        itemError: Array<Record<string, string>>
      }>()
  }

  async publish({ target = "default" as PublishTarget, token = "" }) {
    return got
      .post(publishURI(this.options.extId, target), {
        headers: this._headers(token || (await this.fetchToken()))
      })
      .json()
  }

  async get({ projection = "DRAFT" as GetProjection, token = "" }) {
    return got
      .get(getURI(this.options.extId, projection), {
        headers: this._headers(token || (await this.fetchToken()))
      })
      .json()
  }

  async fetchToken() {
    const { clientId, refreshToken } = this.options
    const json = {
      client_id: clientId,
      refresh_token: refreshToken,
      grant_type: "refresh_token"
    } as Record<string, string>

    const response = await got.post(refreshTokenURI, { json }).json<{
      access_token: string
    }>()

    return response.access_token
  }

  _headers(token: string) {
    return {
      Authorization: `Bearer ${token}`,
      "x-goog-api-version": "2"
    }
  }
}
