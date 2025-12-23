# 💰 Budget Tracker

A modern, full-stack personal finance management application built with the MERN stack. Track your expenses, visualize your spending patterns, and stay on top of your budget with a sleek, responsive interface.

---

## ✨ Features

- **Transaction Management**: Easily add, view, and manage your income and expenses.
- **Data Visualization**: Interactive charts and graphs powered by **Recharts** to help you understand your financial habits.
- **Modern UI/UX**: A beautiful, responsive design using **Tailwind CSS v4** and **Radix UI** components.
- **Real-time Updates**: Instant feedback and seamless data synchronization between frontend and backend.
- **Dark Mode Support**: Aesthetic and comfortable viewing experience in any lighting.

---

## 🚀 Tech Stack

### Frontend

- **React 19** & **Vite**
- **Tailwind CSS v4**
- **Radix UI** (Accessible primitives)
- **Recharts** (Data visualization)
- **Framer Motion** (Animations)
- **Lucide React** (Iconography)
- **Axios** (API requests)

### Backend

- **Node.js** & **Express**
- **MongoDB** with **Mongoose**
- **Dotenv** (Environment variable management)
- **CORS** (Cross-Origin Resource Sharing)

---

## 📁 Project Structure

```text
Budget Tracker/
├── client/             # Frontend React application (Vite)
│   ├── src/
│   │   ├── api/        # Axios client and API services
│   │   ├── components/ # Reusable UI components
│   │   └── App.jsx     # Main application logic
├── server/             # Backend Express application
│   ├── config/         # Database connection configuration
│   ├── controllers/    # API request handlers
│   ├── models/         # Mongoose schemas
│   ├── routes/         # API endpoint definitions
│   └── server.js       # Entry point
└── README.md
```

---

## 🛠️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [MongoDB](https://www.mongodb.com/try/download/community) (Local or Atlas)

### Installation

1. **Clone the repository**:

   ```bash
   git clone <your-repo-url>
   cd "Budget Tracker"
   ```

2. **Setup the Backend**:

   ```bash
   cd server
   npm install
   ```

   Create a `.env` file in the `server` directory and add:

   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/expense_tracker
   ```

3. **Setup the Frontend**:
   ```bash
   cd ../client
   npm install
   ```

### Running the Application

1. **Start the Backend Server**:

   ```bash
   cd server
   # Since there's no start script defined in package.json yet, use:
   node server.js
   ```

2. **Start the Frontend Development Server**:

   ```bash
   cd client
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:5173` (or the port shown in your terminal).

---
# SOA-expense-tracker
