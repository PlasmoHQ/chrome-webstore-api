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

type Options = {
  extensionId: string
  clientId: string
  refreshToken: string
  clientSecret?: string
}

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

  async uploadExisting(readStream, token = this.fetchToken()) {
    if (!readStream) {
      throw new Error("Read stream missing")
    }

    const { extensionId } = this.options

    return got
      .put(uploadExistingURI(extensionId), {
        headers: this._headers(await token),
        body: readStream
      })
      .json<{
        uploadState: string
        itemError: Array<Record<string, string>>
      }>()
  }

  async publish(target = "default", token = this.fetchToken()) {
    const { extensionId } = this.options

    return got
      .post(publishURI(extensionId, target), {
        headers: this._headers(await token)
      })
      .json()
  }

  async get(projection = "DRAFT", token = this.fetchToken()) {
    const { extensionId } = this.options

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

  _headers(token) {
    return {
      Authorization: `Bearer ${token}`,
      "x-goog-api-version": "2"
    }
  }
}

export function chromeWebstoreUpload(opt: Options) {
  return new APIClient(opt)
}
