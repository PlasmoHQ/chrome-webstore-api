<p align="center">
  <a href="https://plasmo.com">
    <img alt="plasmo logo banner" width="75%" src="https://www.plasmo.com/assets/banner-black-on-white.png" />
  </a>
</p>

<p align="center">
  <a aria-label="License" href="./license">
    <img alt="See License" src="https://img.shields.io/npm/l/@plasmohq/chrome-webstore-api"/>
  </a>
  <a aria-label="NPM" href="https://www.npmjs.com/package/@plasmohq/chrome-webstore-api">
    <img alt="NPM Install" src="https://img.shields.io/npm/v/@plasmohq/chrome-webstore-api?logo=npm"/>
  </a>
  <a aria-label="Twitter" href="https://www.twitter.com/plasmohq">
    <img alt="Follow PlasmoHQ on Twitter" src="https://img.shields.io/twitter/follow/plasmohq?logo=twitter"/>
  </a>
  <a aria-label="Twitch Stream" href="https://www.twitch.tv/plasmohq">
    <img alt="Watch our Live DEMO every Friday" src="https://img.shields.io/twitch/status/plasmohq?logo=twitch&logoColor=white"/>
  </a>
  <a aria-label="Discord" href="https://www.plasmo.com/s/d">
    <img alt="Join our Discord for support and chat about our projects" src="https://img.shields.io/discord/946290204443025438?logo=discord&logoColor=white"/>
  </a>
  <a aria-label="Build status" href="https://github.com/PlasmoHQ/bpp/actions">
    <img alt="typescript-action status" src="https://github.com/PlasmoHQ/bpp/workflows/build-test/badge.svg"/>
  </a>
</p>

# Chrome Webstore API for NodeJS

A nodejs library from [plasmo](https://www.plasmo.com/) to submit browser extension to the [Chrome Webstore](https://chrome.google.com/webstore/category/extensions/).

Feature includes:

- TypeScript, with type exports
- ESM (if you need cjs, please use dynamic import)
- Pinned dependencies, updated via renovatebot

## Usage

To obtain `clientId` and `refreshToken`, see: [token guide](https://github.com/PlasmoHQ/chrome-webstore-api/blob/main/token.md)

### nodejs API

```ts
import { ChromeWebstoreAPI } from "@plasmohq/chrome-webstore-api"

const client = new ChromeWebstoreAPI({
  extId,
  clientId,
  clientSecret,
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
