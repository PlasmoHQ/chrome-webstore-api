# Chrome Webstore Upload

This module is a hard fork of [fregante/chrome-webstore-upload/](https://github.com/fregante/chrome-webstore-upload/) to upload an extension archive to the chrome webstore.

Feature includes:

- TypeScript, with type exports
- Frozen dependencies, updated via renovatebot
- Compiled down to CJS (for non-ESM bundling process)

## Usage

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

# Acknowledgment

- [fregante/chrome-webstore-upload/](https://github.com/fregante/chrome-webstore-upload/)

# License

[MIT](./license) 🚀 [Plasmo Corp.](https://plasmo.com)
