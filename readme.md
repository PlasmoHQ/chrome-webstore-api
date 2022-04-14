# Chrome Webstore Upload

This module is a hard fork of [fregante/chrome-webstore-upload/](https://github.com/fregante/chrome-webstore-upload/) to upload an extension archive to the chrome webstore.

Feature includes:

- TypeScript, with type exports
- ESM (if you need cjs, file an issue)
- Pinned dependencies, updated via renovatebot

## Usage

To obtain `clientId` and `refreshToken`, see: [token](./token.md)

## nodejs API

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

Join the [Discord channel](https://discord.browser.market)!

# Acknowledgment

- [fregante/chrome-webstore-upload/](https://github.com/fregante/chrome-webstore-upload/)

# License

[MIT](./license) 🚀 [Plasmo Corp.](https://plasmo.com)
