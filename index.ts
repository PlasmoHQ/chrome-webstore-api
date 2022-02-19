import type { ReadStream } from "fs"
import got from "got"

const rootURI = "https://www.googleapis.com"
const refreshTokenURI = "https://www.googleapis.com/oauth2/v4/token"
const uploadExistingURI = (id: string) =>
  `${rootURI}/upload/chromewebstore/v1.1/items/${id}`
const publishURI = (id: string, target: string) =>
  `${rootURI}/chromewebstore/v1.1/items/${id}/publish?publishTarget=${target}`
const getURI = (id: string, projection: string) =>
  `${rootURI}/chromewebstore/v1.1/items/${id}?projection=${projection}`

const requiredFields = ["extensionId", "clientId", "refreshToken"]

export type Options = {
  extId: string
  clientId: string
  refreshToken: string
  clientSecret?: string
}

export type PublishTarget = "default" | "trustedTesters"

export type GetProjection = "DRAFT" | "PUBLISHED"

class APIClient {
  options = {} as Options

  constructor(options: Options) {
    for (const field of requiredFields) {
      if (!options[field]) {
        throw new Error(`Option "${field}" is required`)
      }

      this.options[field] = options[field]
    }

    if (
      typeof options.clientSecret === "string" &&
      options.clientSecret.length > 0
    ) {
      this.options.clientSecret = options.clientSecret
    }
  }

  async uploadExisting({ readStream = null as ReadStream, token = "" }) {
    if (!readStream) {
      throw new Error("Read stream missing")
    }

    const { extId: extensionId } = this.options

    return got
      .put(uploadExistingURI(extensionId), {
        headers: this._headers(token || (await this.fetchToken())),
        body: readStream
      })
      .json<{
        uploadState: string
        itemError: Array<Record<string, string>>
      }>()
  }

  async publish({ target = "default" as PublishTarget, token = "" }) {
    const { extId: extensionId } = this.options

    return got
      .post(publishURI(extensionId, target), {
        headers: this._headers(token || (await this.fetchToken()))
      })
      .json()
  }

  async get({
    projection = "DRAFT" as GetProjection,
    token = this.fetchToken()
  }) {
    const { extId: extensionId } = this.options

    return got
      .get(getURI(extensionId, projection), {
        headers: this._headers(await token)
      })
      .json()
  }

  async fetchToken() {
    const { clientId, clientSecret, refreshToken } = this.options
    const json = {
      client_id: clientId,
      refresh_token: refreshToken,
      grant_type: "refresh_token"
    } as Record<string, string>

    if (clientSecret) {
      json.client_secret = clientSecret
    }

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

export function chromeWebstoreUpload(opt: Options) {
  return new APIClient(opt)
}
