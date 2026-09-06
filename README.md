# 🎓 Courses CRUD API

A complete REST API for managing courses and users built with Node.js, Express.js, and MongoDB with JWT authentication and comprehensive validation.

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Environment Setup](#environment-setup)
- [Running the Project](#running-the-project)
- [API Endpoints](#api-endpoints)
- [Authentication](#authentication)
- [Validation Rules](#validation-rules)
- [Error Handling](#error-handling)
- [API Examples](#api-examples)
- [Key Notes](#key-notes)

---

## 🎯 Project Overview

This project implements a production-ready REST API for managing educational courses and user accounts. It demonstrates best practices in Node.js development including:

- Clean MVC architecture
- Secure JWT-based authentication
- Role-based access control (Admin, Instructor, User)
- Comprehensive input validation
- Global error handling
- Pagination support
- Password encryption with bcrypt
- Protected routes with middleware

---

## ✨ Features

### 📚 Courses Management
- ✅ Get all courses with pagination (ADMIN/INSTRUCTOR only)
- ✅ Get a single course by ID (ADMIN/INSTRUCTOR only)
- ✅ Create new course (ADMIN only)
- ✅ Update existing course (ADMIN only)
- ✅ Delete course (ADMIN only)
- ✅ Pagination support (limit, page)

### 👥 Users Management
- ✅ User registration with password hashing
- ✅ User login with JWT generation
- ✅ Get all users (protected)
- ✅ Delete user (protected)
- ✅ Password encryption using bcryptjs
- ✅ Automatic JWT creation on registration/login

### 🔒 Security & Protection
- ✅ JWT token verification middleware
- ✅ Role-based access control (RBAC)
- ✅ Protected routes requiring Bearer token
- ✅ Password hashing with bcryptjs
- ✅ Email validation
- ✅ Input sanitization

### ✔️ Validation & Error Handling
- ✅ Required field validation
- ✅ Email format validation
- ✅ Price numeric validation
- ✅ Title length validation
- ✅ Global error handling middleware
- ✅ Custom error messages
- ✅ Route not found handling
- ✅ Unauthorized access handling

---

## 🛠️ Tech Stack

| Technology | Purpose |
|-----------|---------|
| **Node.js** | JavaScript runtime |
| **Express.js** | Web framework |
| **MongoDB** | NoSQL database |
| **Mongoose** | MongoDB ODM |
| **JWT** | Authentication |
| **bcryptjs** | Password hashing |
| **express-validator** | Input validation |
| **dotenv** | Environment variables |
| **cors** | Cross-origin requests |
| **nodemon** | Development auto-reload |

---

## 📁 Project Structure

```
nodejs-courses-project/
│
├── controllers/
│   ├── courses.controllers.js      # Course logic
│   └── users.controllers.js        # User logic
│
├── middleware/
│   ├── asyncWrapper.js            # Async error handling
│   ├── validationSchema.js        # Request validation rules
│   ├── verifyToken.js             # JWT verification
│   └── allowedTo.js               # Role-based access control
│
├── models/
│   ├── course.model.js            # Course schema
│   └── user.model.js              # User schema
│
├── routes/
│   ├── coursesRoutes.js           # Course endpoints
│   └── usersRoutes.js             # User endpoints
│
├── utils/
│   ├── appError.js                # Custom error class
│   ├── generatejwt.js             # JWT generation
│   ├── httpStatusText.js          # HTTP status constants
│   └── usersRoles.js              # User roles constants
│
├── .env                           # Environment variables
├── index.js                       # Application entry point
├── package.json                   # Dependencies
└── README.md                      # Documentation
```

---

## 🚀 Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Steps

1. **Clone the repository**
```bash
git clone https://github.com/AhmedGomaa2003/nodejs-courses-project.git
cd nodejs-courses-project
```

2. **Install dependencies**
```bash
npm install
```

3. **Create `.env` file**
```bash
cp .env.example .env
```

---

## ⚙️ Environment Setup

Create a `.env` file in the root directory with the following variables:

```env
# Server Port
port=4000

# MongoDB Connection
uri_DB=mongodb://localhost:27017/courses_db
# or for MongoDB Atlas:
# uri_DB=mongodb+srv://username:password@cluster.mongodb.net/courses_db

# JWT Secret Key
jwt_secret=your_super_secret_key_here_change_in_production
```

> **Note:** Make sure MongoDB is running locally or use a valid MongoDB Atlas connection string.

---

## ▶️ Running the Project

### Development Mode (with auto-reload)
```bash
npm start
```

or directly with nodemon:
```bash
npx nodemon index.js
```

### Production Mode
```bash
node index.js
```

The server will start on `http://localhost:4000`

---

## 🔗 API Endpoints

### 📚 Courses Endpoints

| Method | Endpoint | Protected | Role Required | Description |
|--------|----------|-----------|---------------|-------------|
| GET | `/api/courses` | ✅ | ADMIN, INSTRUCTOR | Get all courses with pagination |
| GET | `/api/courses/:courseId` | ✅ | ADMIN, INSTRUCTOR | Get a single course |
| POST | `/api/courses` | ✅ | ADMIN | Create new course |
| PATCH | `/api/courses/:courseId` | ✅ | ADMIN | Update existing course |
| DELETE | `/api/courses/:courseId` | ✅ | ADMIN | Delete a course |

### 👥 Users Endpoints

| Method | Endpoint | Protected | Description |
|--------|----------|-----------|-------------|
| POST | `/api/users/register` | ❌ | Register new user |
| POST | `/api/users/login` | ❌ | User login |
| GET | `/api/users` | ✅ | Get all users |
| DELETE | `/api/users/:userId` | ✅ | Delete user |

---

## 🔐 Authentication & Authorization

### User Roles
```javascript
const userRoles = {
  ADMIN: "ADMIN",
  INSTRUCTOR: "INSTRUCTOR",
  USER: "USER"
};
```

### JWT Token
- Tokens are issued upon successful registration or login
- Contains user `email` and `userId`
- Must be sent with protected requests
- Token verification happens automatically via middleware

### Using Token
```http
Authorization: Bearer <your_token_here>
```

### Token Expiration
Configure token expiration in `generatejwt.js`:
```javascript
const token = jwt.sign(payload, process.env.jwt_secret, {
  expiresIn: '7d' // 7 days
});
```

### Access Control
- **GET /api/courses** - Requires ADMIN or INSTRUCTOR role
- **POST /api/courses** - Requires ADMIN role
- **PATCH /api/courses/:courseId** - Requires ADMIN role
- **DELETE /api/courses/:courseId** - Requires ADMIN role

---

## ✔️ Validation Rules

### Course Validation
- **title**: Required, string, minimum 3 characters
- **price**: Required, numeric value

### User Registration Validation
- **firstname**: Required, string
- **lastname**: Required, string
- **email**: Required, valid email format, must be unique
- **password**: Required, minimum 6 characters

### User Login Validation
- **email**: Required, valid email format
- **password**: Required

---

## ❌ Error Handling

The API implements global error handling with custom error responses:

### Error Response Format
```json
{
  "status": "error",
  "code": 400,
  "message": "Error description here"
}
```

### Common Error Codes
| Code | Message | Cause |
|------|---------|-------|
| 400 | Bad Request | Invalid input data |
| 401 | Unauthorized | Missing or invalid token |
| 403 | Forbidden | User role not authorized |
| 404 | Not Found | Resource doesn't exist |
| 409 | Conflict | Duplicate email or resource |
| 500 | Server Error | Internal server error |

---

## 📡 API Examples

### 1️⃣ Register New User

**Request:**
```http
POST /api/users/register
Content-Type: application/json

{
  "firstname": "Ahmed",
  "lastname": "Gomaa",
  "email": "ahmed@example.com",
  "password": "password123"
}
```

**Response (Success - 201):**
```json
{
  "status": "success",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "_id": "507f1f77bcf86cd799439011",
      "firstname": "Ahmed",
      "lastname": "Gomaa",
      "email": "ahmed@example.com"
    }
  }
}
```

---

### 2️⃣ Login User

**Request:**
```http
POST /api/users/login
Content-Type: application/json

{
  "email": "ahmed@example.com",
  "password": "password123"
}
```

**Response (Success - 200):**
```json
{
  "status": "success",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "_id": "507f1f77bcf86cd799439011",
      "email": "ahmed@example.com"
    }
  }
}
```

---

### 3️⃣ Create New Course (ADMIN only)

**Request:**
```http
POST /api/courses
Content-Type: application/json
Authorization: Bearer <admin_token>

{
  "title": "Node.js Mastery",
  "price": 99.99
}
```

**Response (Success - 201):**
```json
{
  "status": "success",
  "data": {
    "course": {
      "_id": "507f1f77bcf86cd799439012",
      "title": "Node.js Mastery",
      "price": 99.99,
      "createdAt": "2024-01-15T10:30:00Z"
    }
  }
}
```

**Response (Forbidden - 403):**
```json
{
  "status": "error",
  "code": 403,
  "message": "You do not have permission to create courses"
}
```

---

### 4️⃣ Get All Courses (ADMIN/INSTRUCTOR only)

**Request:**
```http
GET /api/courses?page=1&limit=10
Authorization: Bearer <token>
```

**Response (Success - 200):**
```json
{
  "status": "success",
  "data": {
    "courses": [
      {
        "_id": "507f1f77bcf86cd799439012",
        "title": "Node.js Mastery",
        "price": 99.99
      },
      {
        "_id": "507f1f77bcf86cd799439013",
        "title": "Express.js Advanced",
        "price": 79.99
      }
    ],
    "currentPage": 1,
    "totalCourses": 2
  }
}
```

---

### 5️⃣ Get Single Course (ADMIN/INSTRUCTOR only)

**Request:**
```http
GET /api/courses/507f1f77bcf86cd799439012
Authorization: Bearer <token>
```

**Response (Success - 200):**
```json
{
  "status": "success",
  "data": {
    "course": {
      "_id": "507f1f77bcf86cd799439012",
      "title": "Node.js Mastery",
      "price": 99.99,
      "createdAt": "2024-01-15T10:30:00Z"
    }
  }
}
```

---

### 6️⃣ Update Course (ADMIN only)

**Request:**
```http
PATCH /api/courses/507f1f77bcf86cd799439012
Content-Type: application/json
Authorization: Bearer <admin_token>

{
  "title": "Node.js Advanced Mastery",
  "price": 129.99
}
```

**Response (Success - 200):**
```json
{
  "status": "success",
  "data": {
    "course": {
      "_id": "507f1f77bcf86cd799439012",
      "title": "Node.js Advanced Mastery",
      "price": 129.99,
      "updatedAt": "2024-01-15T11:45:00Z"
    }
  }
}
```

---

### 7️⃣ Delete Course (ADMIN only)

**Request:**
```http
DELETE /api/courses/507f1f77bcf86cd799439012
Authorization: Bearer <admin_token>
```

**Response (Success - 200):**
```json
{
  "status": "success",
  "message": "Course deleted successfully"
}
```

---

### 8️⃣ Get All Users (Protected)

**Request:**
```http
GET /api/users
Authorization: Bearer <token>
```

**Response (Success - 200):**
```json
{
  "status": "success",
  "data": {
    "users": [
      {
        "_id": "507f1f77bcf86cd799439011",
        "firstname": "Ahmed",
        "lastname": "Gomaa",
        "email": "ahmed@example.com"
      }
    ]
  }
}
```

---

## 📌 Key Notes

- **Password Security**: Passwords are hashed using bcryptjs before storage in MongoDB
- **JWT Creation**: Issued automatically after registration or successful login
- **Protected Routes**: All course endpoints require `Authorization: Bearer token`
- **Role-Based Access**: ADMIN role required for create, update, delete operations
- **ADMIN/INSTRUCTOR Access**: Both roles can view courses but only ADMIN can modify
- **Error Messages**: Comprehensive and user-friendly error responses
- **Pagination**: Supported through `page` and `limit` query parameters
- **Validation**: Input validation is performed on all endpoints
- **Architecture**: Project follows MVC pattern with clear separation of concerns
- **Middleware**: Custom middleware for token verification and role-based access control

---

## 🔧 Development Tips

### Adding New Endpoint
1. Create controller function in `/controllers`
2. Add validation rules in `/middleware/validationSchema.js`
3. Define route in `/routes` with appropriate role checks
4. Import route in `index.js`

### Testing with Postman
1. Import endpoints into Postman
2. Register a user to get token
3. Add token to Authorization header: `Bearer <token>`
4. Use role-based admin token for protected endpoints
5. Use query parameters for pagination: `?page=1&limit=10`

### Debugging
- Enable Morgan middleware for request logging
- Check MongoDB connection in `.env`
- Verify JWT secret is set correctly
- Check user role is set correctly in database
- Verify token hasn't expired
- Check validation rules for request data

---

## 📝 License

This project is open source and available under the MIT License.

---

## 👨‍💻 Author

**Ahmed Gomaa**
- GitHub: [@AhmedGomaa2003](https://github.com/AhmedGomaa2003)

---

## 🤝 Contributing

Contributions are welcome! Feel free to:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

---

## 📞 Support

If you have questions or need help, please:
- Open an issue on GitHub
- Check existing documentation
- Review the API examples above

---

**Made with ❤️ by Ahmed Gomaa**
