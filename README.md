# cinema_app
=======
# Welcome to G3T6's DBTT Interactive Prototype 

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Retrieve the files from Github Repo (if not yet in the local computer)

In your terminal, run:

```bash
git clone https://github.com/wolfparktaerim/cinema_app
```

Navigate into the project directory:

```bash
cd cinema_app
```

## Get Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the app:

   ```bash
   npx expo start
   ```

3. Open the prototype on a web page:
   - Go to [localhost](http://localhost:8081) in your browser.

4. Adjust screen dimensions:
   - Since this prototype is designed for a phone screen size, open Developer Tools (F12 or right-click -> Inspect) and set the screen size to a mobile device in responsive mode.

5. Choose how to open the app:
   - [Development build](https://docs.expo.dev/develop/development-builds/introduction/)
   - [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
   - [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
   - [Expo Go](https://expo.dev/go) (a limited sandbox for Expo app development)

6. To stop the prototype, press `Ctrl + C` in the terminal.

---

## Troubleshoot Guide

### 1. `expo start` fails or hangs
- Ensure you have installed dependencies correctly:
  ```bash
  npm install
  ```
- Try clearing the Expo cache and restarting:
  ```bash
  expo start --clear
  ```
- Check if another process is using the same port:
  ```bash
  lsof -i :8081
  ```
  If needed, kill the process:
  ```bash
  kill -9 <PID>
  ```
  ### 2. `Metro bundler` stuck on loading
- Restart Metro bundler:
  ```bash
  rm -rf .expo
  npx expo start --clear
  ```
- Ensure your Node.js version is up to date:
  ```bash
  node -v
  ```

### 3. Unable to load the app on a physical device
- Ensure your device and computer are on the same Wi-Fi network.
- If using Expo Go, scan the QR code shown in the terminal.
- If issues persist, try running the project in tunnel mode:
  ```bash
  npx expo start --tunnel
  ```

### 4. Android Emulator/iOS Simulator not working
- Ensure Android Studio or Xcode is installed.
- Open the emulator manually:
  ```bash
  npx expo start --android
  ```
  ```bash
  npx expo start --ios
  ```
- Check if your virtual device is running:
  ```bash
  adb devices
  ```

### 5. Dependency Issues
- If facing errors related to missing dependencies, reinstall them:
  ```bash
  rm -rf node_modules package-lock.json
  npm install
  ```
- If `expo` commands fail, reinstall Expo CLI globally:
  ```bash
  npm install -g expo-cli
  ```

### 6. `npm install` fails
- Try running with admin rights:
  ```bash
  sudo npm install
  ```
- If using Windows, run Command Prompt as Administrator.
- Check if you have a stable internet connection.

### 7. Port Conflicts
- If `expo start` fails due to a port conflict, try running on a different port:
  ```bash
  npx expo start --port 8082
  ```

For further assistance, refer to the [Expo Documentation](https://docs.expo.dev/) or open an issue in the repository.
