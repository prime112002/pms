# Employee Management System

A full-stack CRUD application for managing employee data with a React frontend, Node.js/Express backend, and SQLite database.

## Features

* Create, Read, Update, Delete (CRUD) employees
* Employee data: Name, Email, Position
* RESTful API with error handling
* SQLite database persistence
* Responsive UI
* Real-time search/filter

## Tech Stack

**Frontend:** React, Vite, Axios, CSS3
**Backend:** Node.js, Express.js, SQLite3, Express-validator

## Project Structure

```
employee-management/
├── backend/
│   ├── src/
│   │   ├── config/database.js
│   │   ├── controllers/employeeController.js
│   │   ├── models/employeeModel.js
│   │   ├── routes/employeeRoutes.js
│   │   └── middleware/validation.js
│   ├── server.js
│   ├── package.json
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── EmployeeForm.jsx
│   │   │   ├── EmployeeList.jsx
│   │   │   └── Modal.jsx
│   │   ├── services/api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## Setup

### Backend

```bash
cd backend
npm install
```

Create `.env` file:

```env
PORT=5000
NODE_ENV=development
```

Run server:

```bash
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## API Endpoints

Base URL: `http://localhost:5000/api`

* **GET /employees** → Get all employees
* **GET /employees/:id** → Get employee by ID
* **GET /employees?search=term** → Search employees
* **POST /employees** → Create employee
* **PUT /employees/:id** → Update employee
* **DELETE /employees/:id** → Delete employee

## Database Schema

```sql
CREATE TABLE employees (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  position TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

## License

shetty
