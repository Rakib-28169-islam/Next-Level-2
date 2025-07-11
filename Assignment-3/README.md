# 📚 Library Management System Backend


## 🤝 Author  [Rakib-28169-islam]()
 





----
A robust backend server for managing a library system, built with **Express**, **TypeScript**, **Mongoose**, and **MongoDB**. This API enables efficient book management, borrowing operations, and ensures data integrity through validation and centralized error handling.

---

## 🚀 Features

- **Books**
  - Create, read, update, and delete books
  - Filter, sort, and paginate book listings
  - Unique ISBN enforcement and genre validation

- **Borrowing**
  - Borrow books with quantity and due date checks
  - Aggregated summary of borrowed books

- **Validation & Error Handling**
  - Mongoose-based schema validation
  - Centralized global error handler for all API errors

- **Clean Architecture**
  - TypeScript interfaces for strong typing
  - Modular controllers, routes, and middlewares
  - Environment-based configuration

---

## 🛠️ Tech Stack

- Node.js
- Express.js
- TypeScript
- MongoDB + Mongoose
- Vercel Hosting

---

## 📁 Project Structure

```
e:\Next-level-2\Assignment-3
├── .env
├── .gitignore
├── package.json
├── README.md
├── tsconfig.json
├── src/
│   ├── app.ts
│   ├── server.ts
│   └── app/
│       ├── models/
│       │   ├── Book.model.ts
│       │   └── Borrow.model.ts
│       ├── interfaces/
│       │   ├── book.interface.ts
│       │   ├── borrow.interface.ts
│       │   └── error.interface.ts
│       ├── routes/
│       │   ├── books.route.ts
│       │   └── borrow.route.ts
│       ├── utils/
│       │   ├── apiResponse.ts
│       │   ├── globalError.ts
│       │   └── errorHandler.middleware.ts
```
- **.env**: Environment variables (MongoDB URL, PORT, etc.)
- **src/app.ts**: Express app setup
- **src/server.ts**: Server and database connection entry point
- **models/**: Mongoose schemas and models
- **interfaces/**: TypeScript type definitions
- **routes/**: API route definitions
- **utils/**: Utility functions (API response, error formatting, etc.)

---

## 📦 Installation

## 1. Clone the Repository

```bash
git clone https://github.com/Rakib-28169-islam/Next-Level-2.git
cd Assignment-3
```

## 2. Install Dependencies

```bash
npm install
```

> You can use your own MongoDB Atlas URL for `DATABASE_URL`.
> Ex: mongodb+srv://user_name:password@test.yzwhh.mongodb.net/data_base_name?retryWrites=true&w=majority&appName=test

## 3. Build and Run

## `Development Mode (with hot-reload)`
```bash
npm run dev
```
---

## 📬 API Endpoints

### Books

| Method | Endpoint           | Description              |
|--------|--------------------|--------------------------|
| `GET`    | /api/books         | Get all books            |
| `GET`    | /api/books/:id     | Get a single book        |
| `POST`   | /api/books         | Create a new book        |
| `PUT`    | /api/books/:id     | Update a book by ID      |
| `DELETE` | /api/books/:id     | Delete a book by ID      |

### Borrow

| Method | Endpoint       | Description                   |
|--------|---------------|-------------------------------|
| `POST`   | /api/borrow   | Borrow a book                 |
| `GET`    | /api/borrow   | Get summary of borrowed books |

---

## 📦 Example Requests & Responses

## 1. Add a Book

**Request**
```http
`POST` /api/books
Content-Type: application/json

{
  "title": "Atomic Habits",
  "author": "James Clear",
  "genre": "NON_FICTION",
  "isbn": "9780735211292",
  "description": "A book about building good habits.",
  "copies": 10,
  "available": true
}
```

**Response**
```json
{
  "success": true,
  "message": "Book created successfully",
  "data": {
    "_id": "60f7c2b8e1d3c2a5b8e1d3c2",
    "title": "Atomic Habits",
    "author": "James Clear",
    "genre": "NON_FICTION",
    "isbn": "9780735211292",
    "description": "A book about building good habits.",
    "copies": 10,
    "available": true,
    "createdAt": "2025-07-11T10:00:00.000Z"
  }
}
```

---

## 2. Get All Books

**Request**
```http
GET /api/books
```

**Response**
```json
{
  "success": true,
  "message": "Books retrieved successfully",
  "data": [
    {
      "_id": "60f7c2b8e1d3c2a5b8e1d3c2",
      "title": "Atomic Habits",
      "author": "James Clear",
      "genre": "NON_FICTION",
      "isbn": "9780735211292",
      "description": "A book about building good habits.",
      "copies": 10,
      "available": true
    }
    // ...other books
  ]
}
```

---

## 3. Get a Single Book

**Request**
```http
GET /api/books/60f7c2b8e1d3c2a5b8e1d3c2
```

**Response**
```json
{
  "success": true,
  "message": "Book retrieved successfully",
  "data": {
    "_id": "60f7c2b8e1d3c2a5b8e1d3c2",
    "title": "Atomic Habits",
    "author": "James Clear",
    "genre": "NON_FICTION",
    "isbn": "9780735211292",
    "description": "A book about building good habits.",
    "copies": 10,
    "available": true
  }
}
```

---

## 4. Update a Book

**Request**
```http
PATCH /api/books/60f7c2b8e1d3c2a5b8e1d3c2
Content-Type: application/json

{
  "copies": 8
}
```

**Response**
```json
{
  "success": true,
  "message": "Book updated successfully",
  "data": {
    "_id": "60f7c2b8e1d3c2a5b8e1d3c2",
    "copies": 8
    // ...other fields
  }
}
```

---

## 5. Delete a Book

**Request**
```http
DELETE /api/books/60f7c2b8e1d3c2a5b8e1d3c2
```

**Response**
```json
{
  "success": true,
  "message": "Book deleted successfully"
}
```

---

## 6. Borrow a Book

**Request**
```http
POST /api/borrow
Content-Type: application/json

{
  "book": "60f7c2b8e1d3c2a5b8e1d3c2",
  "quantity": 2,
  "dueDate": "2025-08-01"
}
```

**Response**
```json
{
  "success": true,
  "message": "Book borrowed successfully",
  "data": {
    "_id": "60f7c2b8e1d3c2a5b8e1d3c9",
    "book": "60f7c2b8e1d3c2a5b8e1d3c2",
    "quantity": 2,
    "dueDate": "2025-08-01T00:00:00.000Z",
    "createdAt": "2025-07-11T10:05:00.000Z"
  }
}
```

---

## 7. Get Summary of Borrowed Books

**Request**
```http
GET /api/borrow
```

**Response**
```json
{
  "success": true,
  "message": "Borrows retrieved successfully",
  "data": [
    {
      "book": {
        "isbn": "9780735211292",
        "title": "Atomic Habits"
      },
      "totalQuantity": 5
    }
    // ...other borrowed books
  ]
}
```

---

## 🛡️ Error Handling

- **Validation errors:** `HTTP 400` with details
- **Invalid ObjectId:** `HTTP 400`
- **Page Not found / Content not found** : `HTTP 404`
- **Internal server errors:** `HTTP 500`

---

## 🔗 Important Links

- [GitHub Repository](https://github.com/Rakib-28169-islam/Next-Level-2/tree/main/Assignment-3)
- [Live Deployment](#) <!-- Add your live link here -->
- [Explanation Video](#) <!-- Add your video link here -->

---

