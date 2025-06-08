# 🚗 RideOn - Ride Booking App

A real-time ride booking application built using **Expo (React Native)** for the frontend and **Node.js** for the backend. The app enables live location sharing between customers and drivers, features reusable UI components, real-time socket communication, Google Maps API integration, and cross-platform optimization for both Android and iOS devices.

---

## 📖 Summary

This project demonstrates the development of a ride booking app from the ground up. It covers key aspects like real-time location tracking, Google Maps integration, token-based authentication, and modular UI design. Built with performance and scalability in mind, the app is designed to provide a seamless user experience on both customer and driver interfaces, with support for dynamic bottom sheets and map interactions.

---

## 🚀 Highlights

- 🔐 **User Authentication and Token Management**
- 🌍 **Real-Time Location Sharing with Google Maps APIs**
- 💬 **Socket.io Integration for Real-Time Communication**
- 📱 **Cross-Platform Compatibility (iOS & Android)**
- 🎨 **Reusable UI Components (CustomText, CustomButton, LocationBar)**
- 🗺️ **Dynamic Height Adjustments for Bottom Sheets and Maps**
- ⚡ **Optimized Performance Using Third-Party Libraries**

---

## 🧠 Key Insights

### 🧱 Architecture Flow

- **Frontend**: Built with **Expo** (React Native), enabling rapid development and deployment for Android and iOS.
- **Backend**: Powered by **Node.js**, handling user authentication, socket events, and session control.

### 🔑 Token Management

- Secure **access token** and **refresh token** system
- **Interceptor-based API protection**
- Ensures secure session management for all users

### 🌐 Google Maps API Integration

- Real-time location tracking
- Geolocation, directions, and marker updates
- Seamless updates between users and drivers

### 🛠️ Reusable Components

- `CustomText`, `CustomButton`, and `LocationBar` components for consistency
- Designed for both driver and customer UI

### 📏 Dynamic UI Handling

- Responsive bottom sheet height logic
- Adjusts based on device size and platform
- Map view dynamically updates with ride status

### 🗺️ Marker Rendering & Logic

- Displays different icons for auto/bike
- Prevents overlapping using smart spacing and z-index
- Enhances map clarity and user understanding

### 📱 Cross-Platform Optimization

- iOS/Android specific layout fixes
- Prevents memory leaks and ensures smoother transitions
- Debugging strategies for platform-specific issues

---

## 🛠️ Tech Stack

- **Frontend**: React Native (via Expo)
- **Backend**: Node.js with Express
- **Realtime**: Socket.io
- **Maps**: Google Maps API
- **Auth**: JWT (Access + Refresh tokens)
- **Storage**: AsyncStorage / SecureStore (Expo)
- **Other**: React Native Bottom Sheet, Axios, etc.

---

## 🧪 Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/ride-booking-app.git
   cd ride-booking-app
2. Frontend Setup (Expo)
   cd client
   npm install
   npm start
3. Backend Setup (Node.js)
   cd server
   npm install
   npm run dev
4. Configure Environment Variables
   a. For frontend: .env
      GOOGLE_MAPS_API_KEY=your_api_key
      API_BASE_URL=http://your_server_url
   b. For backend: .env
      JWT_SECRET=your_jwt_secret
      REFRESH_TOKEN_SECRET=your_refresh_secret

   
📸 Demo & Screenshots
    comming soon...

👨‍💻 Author
Shivam Gupta
GitHub • Email

📄 License
This project is licensed under the MIT License.
Feel free to use, modify, and contribute.



