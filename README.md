# 🚍 Socdaal App

Socdaal App is a mobile application designed to simplify bus transportation booking and management in Borama. The app integrates multiple transportation companies into one unified platform where users can:

* Select a bus company
* Choose departure times
* Reserve seats
* Make payments

This project includes both frontend and backend directories, but only one is currently active.


## 📁 Project Structure

socdaal/
├── frontend/   # React Native app (Active)
└── backend/    # Placeholder backend (Not in use currently)


### ✅ `frontend/`

* Built with **React Native**, **Tailwind CSS**, and **Expo Router**
* Fully functional
* Uses **Appwrite** as the backend for now
* Handles:

  * Authentication
  * Seat selection
  * Booking logic
  * UI components and navigation

### ⚠️ `backend/`

* This folder **does not currently work** for the Socdaal app
* It may contain initial or experimental code
* **Appwrite** is being used instead for all backend services at this stage

---

## 🔗 Future Plans

* Connect the **frontend** to a **custom backend** (currently under development)
* Replace temporary services in Appwrite with real-time backend APIs
* Add features like payment integration, company dashboards, and notifications


## 💻 How to Run the Project

### Prerequisites

* Node.js
* Expo CLI
* Appwrite instance (locally or on cloud)

### Steps


cd frontend
npm install
npx expo start


Make sure your Appwrite endpoint and project ID are correctly set in your environment/config files.



## 📬 Contact

If you have questions or want to contribute:

* Email: **[Mahamednuh353@gmail.com](mailto:Mahamednuh353@gmail.com)**
* Developer: **Mahamed Nuh Muse**

