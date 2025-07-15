# 🚗 Trip Planner App

A simple and modular **Trip Planning App** built with **React Native CLI**, supporting trip creation, viewing, and simulated authentication. It uses **AsyncStorage** for local persistence and **Context API** for state management.

---

## 📱 Features

- ✅ Login with inline validation (no backend)
- ✅ Home screen to create new trips
- ✅ Trip listing with pull-to-refresh & delete on long press
- ✅ Settings screen to view user info and logout
- ✅ React Navigation v6 (Stack + Bottom Tab)
- ✅ Context API for state management
- ✅ AsyncStorage for local storage
- ✅ Inline form validations
- ✅ Font setup as per Figma design (e.g., Inter)
- ✅ Modular folder structure

---

## 📂 Folder Structure

```

/trip-planner-app
├── /assets
├── /components
├── /context
├── /screens
├── /navigation
├── /utils
├── App.tsx
└── ...

````

---

## 🧾 Step-by-step Guide

### 1. Clone the Repository

```bash
git clone https://github.com/sohrab09/trip_planner_app
cd trip-planner-app
````

### 2. Install Dependencies

```bash
npm install
```

### 3. Run Metro Bundler (in a new terminal)

```bash
npx react-native start
```

### 4. Run the App on Android Emulator or Device

```bash
npx react-native run-android
```

### 5. Run the App on iOS (Mac Only)

```bash
npx react-native run-ios
```

> 💡 **Make sure an emulator is running or a physical device is connected.**

---

## 🎨 Fonts Used

* **Inter** font is used throughout the app.
* To configure custom fonts:

  1. Add `.ttf` files in `assets/fonts`

  2. Add this to `react-native.config.js`:

     ```js
     module.exports = {
       assets: ['./assets/fonts'],
     };
     ```

  3. Run:

     ```bash
     npx react-native link
     ```

---

## 💡 Technologies Used

* React Native CLI
* TypeScript
* React Navigation v6
* AsyncStorage
* Context API
* Custom Components
* Modular Architecture
* Styled with `StyleSheet`

---

## ⚙️ VS Code Tips

* Use **React Native Tools** extension
* Debug easily with **Breakpoints** or `console.log`
* Use **"Terminal > New Terminal"** to run Metro bundler and emulator commands

---

## 🔐 Simulated Login

* The login form accepts any valid name, email, and password.
* No backend, no token – context is used to simulate authentication.
* User info is stored in memory using `AuthContext`.

💡 Default User
This app simulates login (no actual authentication). You can use any:

Name: any name

Email: anything@email.com

Password: any password

---

## 🧪 Bonus Features

* ✅ Trip deletion via long press and modal confirmation
* ✅ Pull-to-refresh on trips list
* ✅ Error handling with user-friendly messages
* ✅ Validations for each input field
* ✅ Responsive layout

---

---

## 📄 License

This project is for demo purposes.

---

## 📷 Screenshots

![Login](https://github.com/sohrab09/trip_planner_app/blob/0ed0620e7fc65c601c5cf1bef829a512731adbd5/login.jpg)
![Login Validation](https://github.com/sohrab09/trip_planner_app/blob/0ed0620e7fc65c601c5cf1bef829a512731adbd5/login%20validation.jpg)
![Home](https://github.com/sohrab09/trip_planner_app/blob/0ed0620e7fc65c601c5cf1bef829a512731adbd5/home.jpg)
![Load Unload Modal](https://github.com/sohrab09/trip_planner_app/blob/0ed0620e7fc65c601c5cf1bef829a512731adbd5/load%20unload.jpg)
![Home Validation](https://github.com/sohrab09/trip_planner_app/blob/0ed0620e7fc65c601c5cf1bef829a512731adbd5/home%20validation.jpg)
![Trips](https://github.com/sohrab09/trip_planner_app/blob/0ed0620e7fc65c601c5cf1bef829a512731adbd5/trips.jpg)
![Trips Delete](https://github.com/sohrab09/trip_planner_app/blob/0ed0620e7fc65c601c5cf1bef829a512731adbd5/delete%20trips.jpg)
![Settings](https://github.com/sohrab09/trip_planner_app/blob/0ed0620e7fc65c601c5cf1bef829a512731adbd5/settings.jpg)



---
