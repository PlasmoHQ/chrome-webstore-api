# Chrome Webstore API for nodejs

A nodejs library from [plasmo](https://www.plasmo.com/) to submit browser extension to the [Chrome Webstore](https://chrome.google.com/webstore/category/extensions/).

Feature includes:

- TypeScript, with type exports
- ESM (if you need cjs, please use dynamic import)
- Pinned dependencies, updated via renovatebot

## Usage

To obtain `clientId` and `refreshToken`, see: [token guide](https://github.com/PlasmoHQ/chrome-webstore-api/blob/main/token.md)

### nodejs API

```ts
import { ChromeWebstoreClient } from "@plasmo-corp/cwu"

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

Join the [Discord channel](https://www.plasmo.com/s/d)!

# Acknowledgment

- This library is inspired by, and was a rewrite/hard-fork of [fregante/chrome-webstore-upload/](https://github.com/fregante/chrome-webstore-upload/)

# License

[MIT](./license) 🚀 [Plasmo](https://plasmo.com)
