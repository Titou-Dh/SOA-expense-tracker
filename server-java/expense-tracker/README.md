# Expense Tracker - Java Backend

A RESTful API backend for the Expense Tracker application built with Java, JAX-RS (Jersey), and MySQL. This backend provides the same endpoints as the Node.js/Express server, following the same architectural patterns.

## 🚀 Tech Stack

- **Java 8**
- **JAX-RS (Jersey 2.35)** - RESTful Web Services
- **Grizzly HTTP Server** - Embedded HTTP server
- **MySQL** - Relational database
- **Maven** - Dependency management

## 📁 Project Structure

```
expense-tracker/
├── src/main/java/org/example/
│   ├── Main.java                    # Server entry point
│   ├── config/
│   │   └── CORSFilter.java          # CORS configuration
│   ├── controller/
│   │   └── TransactionResource.java # REST API endpoints
│   ├── db/
│   │   └── ConnexionDB.java         # Database connection (singleton)
│   ├── model/
│   │   ├── Transaction.java         # Transaction entity
│   │   └── TransactionList.java    # Transaction list wrapper
│   └── service/
│       ├── TransactionService.java  # Service interface
│       └── TransactionServiceImpl.java # Service implementation
├── database/
│   └── schema.sql                   # Database schema script
└── pom.xml                          # Maven dependencies
```

## 🛠️ Prerequisites

- Java 8 or higher
- Maven 3.6+
- MySQL 5.7+ or MySQL 8.0+
- MySQL Connector/J (included in dependencies)

## 📦 Setup Instructions

### 1. Database Setup

1. **Create the database**:
   ```bash
   mysql -u root -p < database/schema.sql
   ```
   
   Or manually:
   ```sql
   CREATE DATABASE expense_tracker;
   USE expense_tracker;
   -- Then run the SQL from schema.sql
   ```

2. **Update database credentials** in `src/main/java/org/example/db/ConnexionDB.java`:
   ```java
   String url = "jdbc:mysql://localhost:3306/expense_tracker";
   String login = "root";
   String password = "your_password";
   ```

### 2. Build the Project

```bash
cd server-java/expense-tracker
mvn clean install
```

### 3. Run the Server

**Option 1: Using Maven**
```bash
mvn exec:java -Dexec.mainClass="org.example.Main"
```

**Option 2: Using Java directly**
```bash
mvn package
java -cp target/expense-tracker-1.0-SNAPSHOT.jar:target/dependency/* org.example.Main
```

The server will start on `http://localhost:5000`

## 📡 API Endpoints

All endpoints are prefixed with `/api/transactions`

### Get All Transactions
```
GET /api/transactions
```
**Response:** Array of transaction objects
```json
[
  {
    "id": 1,
    "description": "Salary",
    "amount": 5000.00,
    "type": "income",
    "category": "Salary",
    "date": "2024-01-15T10:00:00",
    "note": "Monthly salary",
    "createdAt": "2024-01-15T10:00:00",
    "updatedAt": "2024-01-15T10:00:00"
  }
]
```

### Get Transaction by ID
```
GET /api/transactions/{id}
```
**Response:** Single transaction object

### Create Transaction
```
POST /api/transactions
Content-Type: application/json
```
**Request Body:**
```json
{
  "description": "Groceries",
  "amount": 150.50,
  "type": "expense",
  "category": "Food",
  "date": "2024-01-15T10:00:00",
  "note": "Weekly groceries"
}
```
**Response:** Created transaction object with ID (201 Created)

### Update Transaction
```
PUT /api/transactions/{id}
Content-Type: application/json
```
**Request Body:** Same as create
**Response:** Updated transaction object (200 OK)

### Delete Transaction
```
DELETE /api/transactions/{id}
```
**Response:**
```json
{
  "message": "Transaction deleted successfully"
}
```

## 🔧 Configuration

### Database Connection
Edit `src/main/java/org/example/db/ConnexionDB.java` to change:
- Database URL
- Username
- Password

### Server Port
Edit `src/main/java/org/example/Main.java` to change the port:
```java
public static final String BASE_URI = "http://localhost:5000/";
```

### CORS Configuration
CORS is enabled by default in `CORSFilter.java`. Modify if needed for production.

## 🗄️ Database Schema

The `transactions` table structure:

| Column | Type | Constraints |
|--------|------|-------------|
| id | INT | PRIMARY KEY, AUTO_INCREMENT |
| description | VARCHAR(100) | NOT NULL |
| amount | DECIMAL(10,2) | NOT NULL, >= 0 |
| type | ENUM('income','expense') | NOT NULL, DEFAULT 'expense' |
| category | VARCHAR(50) | NOT NULL |
| date | DATETIME | NOT NULL, DEFAULT CURRENT_TIMESTAMP |
| note | VARCHAR(250) | NULL |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP |
| updated_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP ON UPDATE |

## 🏗️ Architecture

This project follows a layered architecture similar to TP11:

1. **Model Layer** (`model/`): Entity classes representing data structures
2. **Database Layer** (`db/`): Database connection management
3. **Service Layer** (`service/`): Business logic and data access
4. **Controller Layer** (`controller/`): REST API endpoints (JAX-RS resources)
5. **Configuration** (`config/`): Cross-cutting concerns (CORS, etc.)

## 🔄 Comparison with Express Server

| Feature | Express (Node.js) | Java (JAX-RS) |
|---------|-------------------|---------------|
| Framework | Express.js | Jersey (JAX-RS) |
| Database | MongoDB (Mongoose) | MySQL (JDBC) |
| ORM | Mongoose ODM | Raw JDBC |
| Server | Express HTTP | Grizzly HTTP |
| Port | 5000 | 5000 |
| Endpoints | Same | Same |

## 🐛 Troubleshooting

### Database Connection Issues
- Verify MySQL is running: `mysql -u root -p`
- Check database exists: `SHOW DATABASES;`
- Verify credentials in `ConnexionDB.java`

### Port Already in Use
- Change port in `Main.java` or stop the process using port 5000

### Maven Build Issues
- Clean and rebuild: `mvn clean install`
- Check Java version: `java -version` (should be 8+)

## 📝 Notes

- The service uses PreparedStatements to prevent SQL injection
- Transactions are sorted by date (descending) by default
- All endpoints return JSON
- Error responses follow the same format as the Express server

