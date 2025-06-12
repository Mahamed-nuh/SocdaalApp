# 🚍 Socdaal App

**Socdaal** is a mobile application built to streamline bus transportation booking in Borama. It brings together multiple transportation companies into one platform where users can:

* Select a bus company
* Choose a departure time
* Reserve seats
* Make payments

This repository contains both frontend and backend folders, but **only the frontend is currently active**.



## 📁 Project Structure

```
socdaal/
├── frontend/   # React Native app (Active)
└── backend/    # Placeholder backend (Not in use currently)
```

### ✅ `frontend/`

* Built with **React Native**, **Tailwind CSS**, and **Expo Router**
* Uses **Appwrite** as the backend service
* Fully functional for development and testing

### ⚠️ `backend/`

* Not used in the current app version
* Reserved for future backend implementation
* All current backend logic is handled by Appwrite



## ⚙️ Setup & Run Instructions

### 1. 🔧 Configure Appwrite Connection

Before running the app, you must connect it to your Appwrite backend:

* In the `frontend` folder, locate the Appwrite config file (e.g. `lib/appwrite.js').
* Update it with your **Appwrite endpoint**, **project ID**, and **collection/database IDs**.

Example (`utils/appwriteConfig.js`):

```js
export const APPWRITE_ENDPOINT = "https://cloud.appwrite.io/v1";
export const APPWRITE_PROJECT_ID = "your_project_id_here";
export const DATABASE_ID = "your_database_id";
export const COLLECTION_ID = "your_collection_id";
```

> 💡 You can find these values in your Appwrite console.

---

### 2. 📦 Install Dependencies

```bash
cd frontend
npm install
```

---

### 3. 🚀 Start the App

```bash
npx expo start
```

Scan the QR code using the **Expo Go app** on your mobile device to run the app.

---

## 🔮 Future Plans

* Replace Appwrite with a **custom backend** (under development)
* Implement:

  * Company admin dashboards
  * Real-time seat booking updates
  * Payment integration
  * Push notifications

---

## 📬 Contact

* **Developer:** Mahamed Nuh Muse
* **Email:** [Mahamednuh353@gmail.com](mailto:Mahamednuh353@gmail.com)
