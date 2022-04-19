# Chrome Webstore API for nodejs

A nodejs library from [plasmo](https://www.plasmo.com/) to submit browser extension to the [Chrome Webstore](https://chrome.google.com/webstore/category/extensions/).

Feature includes:

- TypeScript, with type exports
- ESM (if you need cjs, please use dynamic import)
- Pinned dependencies, updated via renovatebot

## Usage

To obtain `clientId` and `refreshToken`, see: [token guide](https://github.com/plasmo-corp/chrome-webstore-api/blob/main/token.md)

### nodejs API

```ts
import { ChromeWebstoreClient } from "chrome-webstore-api"

const client = new ChromeWebstoreClient({
  extId,
  clientId,
  refreshToken
})


await client.submit({
  filePath: zip,
  target: "trustedTesters"
})
```

# Support

Join the [Discord channel](https://discord.browser.market)!

# Acknowledgment

- This library is inspired by, and was a rewrite/hard-fork of [fregante/chrome-webstore-upload/](https://github.com/fregante/chrome-webstore-upload/)

# License

[MIT](./license) 🚀 [Plasmo Corp.](https://plasmo.com)
