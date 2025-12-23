# 💰 Expense Tracker

A modern, full-stack personal finance management application. Track your expenses, visualize your spending patterns, and stay on top of your budget with a sleek, responsive interface.

---

## ✨ Features

- **Transaction Management**: Easily add, view, edit, and delete your income and expenses.
- **Data Visualization**: Interactive charts and graphs powered by **Recharts** to help you understand your financial habits.
- **Modern UI/UX**: A beautiful, responsive design using **Tailwind CSS v4** and **Radix UI** components.
- **Real-time Updates**: Instant feedback and seamless data synchronization between frontend and backend.
- **Dark Mode Support**: Aesthetic and comfortable viewing experience in any lighting.
- **RESTful API**: Clean, well-documented REST API endpoints for all operations.

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

- **Java 8+** with **JAX-RS (Jersey)**
- **Grizzly HTTP Server** (Embedded server)
- **MySQL** (Relational database)
- **Maven** (Dependency management)
- **JDBC** (Database connectivity)

---

## 📁 Project Structure

```text
Expense-Tracker/
├── client/                    # Frontend React application (Vite)
│   ├── src/
│   │   ├── api/              # Axios client and API services
│   │   ├── components/        # Reusable UI components
│   │   └── App.jsx           # Main application logic
│   └── package.json
├── server-java/               # Java REST API backend
│   └── expense-tracker/
│       ├── src/main/java/org/example/
│       │   ├── controller/   # REST API endpoints (JAX-RS)
│       │   ├── service/      # Business logic layer
│       │   ├── model/        # Entity classes
│       │   ├── db/           # Database connection
│       │   ├── config/       # Configuration (CORS, etc.)
│       │   └── Main.java     # Server entry point
│       ├── database/
│       │   └── schema.sql    # MySQL database schema
│       ├── pom.xml           # Maven dependencies
│       └── README.md         # Java backend documentation
└── README.md
```

---

## 🛠️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [Java JDK](https://www.oracle.com/java/technologies/downloads/) (8 or higher)
- [Maven](https://maven.apache.org/download.cgi) (3.6+)
- [MySQL](https://dev.mysql.com/downloads/) (5.7+ or 8.0+)

### Installation

1. **Clone the repository**:

   ```bash
   git clone <your-repo-url>
   cd Expense-Tracker
   ```

2. **Setup the Database**:

   ```bash
   # Create and configure MySQL database
   mysql -u root -p < server-java/expense-tracker/database/schema.sql
   ```

   Or manually:
   ```sql
   CREATE DATABASE expense_tracker;
   USE expense_tracker;
   -- Then run the SQL from database/schema.sql
   ```

   **Update database credentials** in `server-java/expense-tracker/src/main/java/org/example/db/ConnexionDB.java`:
   ```java
   String url = "jdbc:mysql://localhost:3306/expense_tracker";
   String login = "root";
   String password = "your_password";
   ```

3. **Setup the Backend**:

   ```bash
   cd server-java/expense-tracker
   mvn clean install
   ```

4. **Setup the Frontend**:

   ```bash
   cd ../../client
   npm install --legacy-peer-deps
   ```

   > **Note**: Use `--legacy-peer-deps` flag due to React 19 compatibility with some packages.

---

## 🚀 Running the Application

### 1. Start the Backend Server

**Option 1: Using Maven**
```bash
cd server-java/expense-tracker
mvn exec:java -Dexec.mainClass="org.example.Main"
```

**Option 2: Using Java directly**
```bash
cd server-java/expense-tracker
mvn package
java -cp target/expense-tracker-1.0-SNAPSHOT.jar:target/dependency/* org.example.Main
```

The backend server will start on `http://localhost:5000`

### 2. Start the Frontend Development Server

```bash
cd client
npm run dev
```

The frontend will be available at `http://localhost:5173` (or the port shown in your terminal).

### 3. Access the Application

Open your browser and navigate to `http://localhost:5173`

---

## 📡 API Endpoints

All API endpoints are prefixed with `/api/transactions`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/transactions` | Get all transactions |
| GET | `/api/transactions/{id}` | Get transaction by ID |
| POST | `/api/transactions` | Create a new transaction |
| PUT | `/api/transactions/{id}` | Update a transaction |
| DELETE | `/api/transactions/{id}` | Delete a transaction |

For detailed API documentation, see:
- [Java Backend API Documentation](server-java/expense-tracker/API_DOCUMENTATION.md)
- [Java Backend README](server-java/expense-tracker/README.md)

---

## 🧪 Testing with Postman

Postman collection files are available for easy API testing:

- **Import Collection**: `server-java/expense-tracker/postman_collection.json`
- **Example Requests**: `server-java/expense-tracker/postman_examples.json`

To import:
1. Open Postman
2. Click "Import"
3. Select `postman_collection.json`
4. Start testing the API endpoints

---

## 🔧 Configuration

### Backend Configuration

- **Database**: Edit `server-java/expense-tracker/src/main/java/org/example/db/ConnexionDB.java`
- **Server Port**: Edit `server-java/expense-tracker/src/main/java/org/example/Main.java`
- **CORS**: Configured in `server-java/expense-tracker/src/main/java/org/example/config/CORSFilter.java`

### Frontend Configuration

- **API Base URL**: Edit `client/src/api/client.js` (default: `http://localhost:5000/api`)

---

## 📝 Notes

- The backend uses PreparedStatements to prevent SQL injection
- All endpoints return JSON responses
- CORS is enabled by default for development
- Transactions are automatically sorted by date (descending)

---

## 📚 Additional Documentation

- [Java Backend Documentation](server-java/expense-tracker/README.md)
- [API Documentation](server-java/expense-tracker/API_DOCUMENTATION.md)
- [Database Schema](server-java/expense-tracker/database/schema.sql)

---

## 🐛 Troubleshooting

### Database Connection Issues
- Verify MySQL is running: `mysql -u root -p`
- Check database exists: `SHOW DATABASES;`
- Verify credentials in `ConnexionDB.java`

### Port Already in Use
- Change port in `Main.java` or stop the process using port 5000

### Frontend Dependency Issues
- Use `npm install --legacy-peer-deps` for React 19 compatibility

---

## 📄 License

This project is part of a SOA (Service-Oriented Architecture) expense tracker application.
