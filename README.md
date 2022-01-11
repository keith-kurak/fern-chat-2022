# CodeMash 2022 FERN Stack Pre-compiler prereqs

## Installation/ setup steps
(adapted from https://docs.expo.dev/get-started/installation/)
If you regularly do JavaScript development, you likely have many of these installed already!

#### Install Expo prerequisites
1. [Node.js LTS release](https://nodejs.org/en/) (version 14 or higher)
2. [Yarn Classic](https://classic.yarnpkg.com/en/docs/install) (1.22.x)
3. [Git](https://git-scm.com/). The [Github Desktop app](https://desktop.github.com/) installs this for you- that's what I use.
4. MacOS users only: [Watchman](https://facebook.github.io/watchman/docs/install#buildinstall)
5. Highly recommended: [Visual Studio Code](https://code.visualstudio.com/download). Any text editor will do, but my examples will be in VS Code.
#### Install CLI Tools
6. Install the Expo CLI (`npm install --global expo-cli`)
7. Install Firebase CLI (`npm install --global firebase-tools`)
#### Create Accounts
8. [Create an Expo Account](https://expo.dev/). Follow the link and click "Sign Up".
9. Download the "Expo Go" app on your phone from the App Store or Play Store. Sign into the app using the Expo account you just created.
10. Go to the [Firebase Console](https://console.firebase.google.com/), click "Create a Project" or "Add Project", give it a name like "[myname]-fern-chat-2022" and accept all the default options. A google account is required for this step.
#### Fork/ Clone the demo project and restore dependencies (recommended!)
*It's a good idea to restore dependencies in case the network goes wonky during the session! Fork AND clone the repo if you'd like to push anything you do to Github. Just cloning it is fine, too, if you just want to keep everything local.*

11. Click "Fork" at the top of this page to fork the repo.
12. Clone your fork (easy way: click the green "Code" button, then "Open in Github Desktop").
13. CD to the `fern-chat-2022` folder and run `yarn`.

### Platform-specific tips
#### Tips for Windows
- I tested this setup in Powershell and it was fine. I did have to change the execution policy first, using these instructions: https://tecadmin.net/powershell-running-scripts-is-disabled-system
- I've also worked with Expo in WSL. I followed these instructions previously to get it working with the terminal inside Visual Studio code: https://code.visualstudio.com/docs/remote/wsl
- You _may_ have to modify the Windows firewall to get the app running on your phone in the Expo Go app. If you keep getting connection timed out errors, you can try running `WF.msc` and then adding an inbound rule for port 19000.

#### Tips for Chromebook?
- It's been a while, but I have successfully setup most of this dev environment on a Chromebook. If you really want to try, you can follow my tips here: https://medium.com/@keith.kurak/develop-mobile-apps-on-a-chromebook-really-edd942ecd122
- I will very likely not have time to re-attempt a Chromebook setup to make sure this all still works, so YMMV!

## Verifying that everything is working
We will walk through this during the pre-compiler, but you can also try it ahead of time to be sure that everything is installed correctly.
(adapted from https://docs.expo.dev/get-started/create-a-new-app/ - see for troubleshooting tips)
1. Run `expo init test-expo-app` in the terminal. Choose the "blank" template.
2. Run `expo login` and enter your Expo account credentials.
3. Run `expo start`.
4. A webpage with a QR code will appear. On iOS, scan the code with the Camera app. On Android, scan the code with the Expo Go app.
5. If all goes well, the app will appear on your phone! If you have connection issues, verify your computer and phone are on the same network, or choose the "tunnel" option on the Expo web page that opened in the last step.
6. Click "Run in web browser" on the QR code web page (or press 'w' in the CLI). After a while, the app should appear in your browser, as well!

# FERN Stack Session Code-a-long
## Run the code
1. Run `yarn` to restore dependencies
2. Run `expo login` to login to your Expo account (only required for testing on an iOS device)
3. Run `yarn start` to start the bundler
4. Scan the QR code with your device to run in the Expo Go app (must be logged into Expo Go on iOS) AND/ OR
5. Press `w` to start webpack and run the web version.

## Try some code
[Open these slides to follow along with the coding exercises](https://docs.google.com/presentation/d/1a3LBu4Pr0bhZSaDZzKlDr8hrAeIiLIO2MQmbcSYabzs/edit?usp=sharing). This has just the "TODO" slides with links to the starting branch and Gist guide.

## Other presentation materials:
[The full slides](https://docs.google.com/presentation/d/1ppJL2kTDJbmn3Wu0Vn6AfyNN8duplaKttGFcfCkqnlo/edit?usp=sharing)
