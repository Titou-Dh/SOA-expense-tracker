# API Documentation - Java Backend

This document provides detailed API documentation for the Expense Tracker Java backend, matching the Express server endpoints.

## Base URL
```
http://localhost:5000
```

## Endpoints

### 1. Get All Transactions

**Express Route:** `GET /api/transactions`  
**Java Endpoint:** `GET /api/transactions`

**Description:** Retrieves all transactions sorted by date (descending).

**Response:**
- **Status Code:** 200 OK
- **Content-Type:** application/json
- **Body:** Array of transaction objects

**Example Request:**
```bash
curl http://localhost:5000/api/transactions
```

**Example Response:**
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
  },
  {
    "id": 2,
    "description": "Groceries",
    "amount": 150.50,
    "type": "expense",
    "category": "Food",
    "date": "2024-01-14T15:30:00",
    "note": "Weekly groceries",
    "createdAt": "2024-01-14T15:30:00",
    "updatedAt": "2024-01-14T15:30:00"
  }
]
```

---

### 2. Get Transaction by ID

**Express Route:** Not implemented (but can be added)  
**Java Endpoint:** `GET /api/transactions/{id}`

**Description:** Retrieves a single transaction by its ID.

**Path Parameters:**
- `id` (integer, required): The transaction ID

**Response:**
- **Status Code:** 200 OK (success) or 404 NOT FOUND
- **Content-Type:** application/json

**Example Request:**
```bash
curl http://localhost:5000/api/transactions/1
```

**Example Response (200 OK):**
```json
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
```

**Example Response (404 NOT FOUND):**
```json
{
  "error": "Transaction not found"
}
```

---

### 3. Create Transaction

**Express Route:** `POST /api/transactions`  
**Java Endpoint:** `POST /api/transactions`

**Description:** Creates a new transaction.

**Request:**
- **Content-Type:** application/json
- **Body:** Transaction object (without id, createdAt, updatedAt)

**Request Body Schema:**
```json
{
  "description": "string (required, max 100 chars)",
  "amount": "number (required, >= 0)",
  "type": "string (required, 'income' or 'expense')",
  "category": "string (required, max 50 chars)",
  "date": "datetime (optional, defaults to current time)",
  "note": "string (optional, max 250 chars)"
}
```

**Response:**
- **Status Code:** 201 CREATED (success) or 400 BAD REQUEST or 500 INTERNAL SERVER ERROR
- **Content-Type:** application/json
- **Body:** Created transaction object (with id and timestamps)

**Example Request:**
```bash
curl -X POST http://localhost:5000/api/transactions \
  -H "Content-Type: application/json" \
  -d '{
    "description": "Rent Payment",
    "amount": 1200.00,
    "type": "expense",
    "category": "Housing",
    "date": "2024-01-15T10:00:00",
    "note": "Monthly rent"
  }'
```

**Example Response (201 CREATED):**
```json
{
  "id": 3,
  "description": "Rent Payment",
  "amount": 1200.00,
  "type": "expense",
  "category": "Housing",
  "date": "2024-01-15T10:00:00",
  "note": "Monthly rent",
  "createdAt": "2024-01-15T10:00:00",
  "updatedAt": "2024-01-15T10:00:00"
}
```

**Example Response (400 BAD REQUEST):**
```json
{
  "error": "Transaction description is required"
}
```

---

### 4. Update Transaction

**Express Route:** `PUT /api/transactions/:id`  
**Java Endpoint:** `PUT /api/transactions/{id}`

**Description:** Updates an existing transaction.

**Path Parameters:**
- `id` (integer, required): The transaction ID

**Request:**
- **Content-Type:** application/json
- **Body:** Transaction object (same as create, without id and timestamps)

**Response:**
- **Status Code:** 200 OK (success) or 404 NOT FOUND or 400 BAD REQUEST or 500 INTERNAL SERVER ERROR
- **Content-Type:** application/json
- **Body:** Updated transaction object

**Example Request:**
```bash
curl -X PUT http://localhost:5000/api/transactions/1 \
  -H "Content-Type: application/json" \
  -d '{
    "description": "Updated Salary",
    "amount": 5500.00,
    "type": "income",
    "category": "Salary",
    "date": "2024-01-15T10:00:00",
    "note": "Updated monthly salary"
  }'
```

**Example Response (200 OK):**
```json
{
  "id": 1,
  "description": "Updated Salary",
  "amount": 5500.00,
  "type": "income",
  "category": "Salary",
  "date": "2024-01-15T10:00:00",
  "note": "Updated monthly salary",
  "createdAt": "2024-01-15T10:00:00",
  "updatedAt": "2024-01-15T10:05:00"
}
```

**Example Response (404 NOT FOUND):**
```json
{
  "error": "Transaction not found"
}
```

---

### 5. Delete Transaction

**Express Route:** `DELETE /api/transactions/:id`  
**Java Endpoint:** `DELETE /api/transactions/{id}`

**Description:** Deletes a transaction by ID.

**Path Parameters:**
- `id` (integer, required): The transaction ID

**Response:**
- **Status Code:** 200 OK (success) or 404 NOT FOUND or 500 INTERNAL SERVER ERROR
- **Content-Type:** application/json

**Example Request:**
```bash
curl -X DELETE http://localhost:5000/api/transactions/1
```

**Example Response (200 OK):**
```json
{
  "message": "Transaction deleted successfully"
}
```

**Example Response (404 NOT FOUND):**
```json
{
  "error": "Transaction not found"
}
```

---

## Error Responses

All endpoints may return the following error responses:

### 400 Bad Request
```json
{
  "error": "Error message describing the validation issue"
}
```

### 404 Not Found
```json
{
  "error": "Transaction not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Error message describing the server error"
}
```

## Data Validation Rules

### Transaction Object
- **description**: Required, string, max 100 characters, trimmed
- **amount**: Required, number (decimal), must be >= 0
- **type**: Required, must be either "income" or "expense"
- **category**: Required, string, max 50 characters, trimmed
- **date**: Optional, datetime, defaults to current timestamp if not provided
- **note**: Optional, string, max 250 characters, trimmed

## CORS

CORS is enabled by default. The API accepts requests from any origin (`*`). In production, you should restrict this to specific domains.

## Notes

1. All timestamps are in ISO 8601 format
2. The `id`, `createdAt`, and `updatedAt` fields are automatically managed by the database
3. Transactions are automatically sorted by date (descending) when retrieving all transactions
4. The API uses PreparedStatements to prevent SQL injection attacks
5. All endpoints return JSON responses

