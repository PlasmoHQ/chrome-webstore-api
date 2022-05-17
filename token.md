# How to generate Google API tokens

[chrome-webstore-api](https://github.com/PlasmoHQ/chrome-webstore-api) invokes the official [Chrome Web Store API](https://developer.chrome.com/docs/webstore/using_webstore_api/).

_Note:_ the names you enter here don't really matter. It's an app that only you will have access to. This will take approximately 10 minutes and Google likes to change these screens often 🤓...

## Process

Here's how to get the 2 keys: `clientId` and `refreshToken`

0. Visit https://console.developers.google.com/apis/credentials
1. Create a project:

   > <img width="772" alt="Google APIs: Create project" src="https://user-images.githubusercontent.com/1402241/77865620-9a8a3680-722f-11ea-99cb-b09e5c0c11ec.png">

2. Enter `chrome-webstore-upload` and **Create**
3. Visit https://console.cloud.google.com/apis/credentials/consent
4. Select on **External** and **Create**

   > <img width="804" alt="OAuth Consent Screen" src="https://user-images.githubusercontent.com/1402241/133878019-f159f035-2b76-4686-a461-0e0005355da6.png">

5. Only enter the Application name (e.g. `chrome-webstore-upload`) and required email fields, and click **Save**

   > <img width="475" alt="Consent screen configuration" src="https://user-images.githubusercontent.com/1402241/77865809-82ff7d80-7230-11ea-8a96-e381d55524c5.png">

6. On the 3rd screen, add your own email address:

   > <img width="632" alt="Test users selection" src="https://user-images.githubusercontent.com/1402241/106213510-7c180300-6192-11eb-97b4-b4ae92424bf1.png">

7. Visit https://console.developers.google.com/apis/library/chromewebstore.googleapis.com
8. Click **Enable**
9. Visit https://console.developers.google.com/apis/credentials
10. Click **Create credentials** > **OAuth client ID**:

    > <img width="771" alt="Create credentials" src="https://user-images.githubusercontent.com/1402241/77865679-e89f3a00-722f-11ea-942d-5245091f22b8.png">

11. Select **Desktop app**, enter `Chrome Webstore Upload`, and click **Create**

    > <img width="547" alt="Create OAuth client ID" src="https://user-images.githubusercontent.com/6723574/163024843-4856a90b-4f3d-41b1-877f-0d66a0e8dbba.png">

12. Download the OAuth client JSON key, save it into a `key.json` file:

    > <img width="567" alt="OAuth client created" src="https://user-images.githubusercontent.com/6723574/163025132-752a8ce7-388f-4b9c-aede-47e0c99a4847.png">

13. Visit https://console.cloud.google.com/apis/credentials/consent
14. Click **PUBLISH APP** and confirm

<img width="771" alt="Publish app" src="https://user-images.githubusercontent.com/27696701/114265946-2da2a280-9a26-11eb-9567-c4e00f572500.png">

15. Open a console/terminal where you stored your `key.json` file. Run the following, replacing `npx` with `pnpm dlx` or `yarn dlx` as needed:

    > npx gcp-refresh-token

16. The command will open an OAuth consent screen on the web. Follow its steps and warnings (this is your own personal app). Make sure the local `port` is correct.

17. Done. Now you should have ✅ `clientId` and ✅ `refreshToken` in `key.json`. You can use these for all your extensions, but don't share them!
