🚀 Full-Stack User Profile Management System

A robust, database-driven application for managing user accounts, built with React, Node.js, Express, and MySQL. This project demonstrates full CRUD capabilities, secure authentication, and role-based access control.

📅 Sprint 2 Accomplishments (Current Release)

We successfully transformed the static prototype into a fully functional dynamic application. Key milestones include:

Full-Stack Integration: Connected the React Frontend (Port 3000) to the Express Backend (Port 4000) using a Proxy configuration to resolve CORS/404 errors.

Database Persistence: Migrated from mock data to a live MySQL database. All user data persists across sessions.

Secure Authentication:

Refactored the system to use Email-Only Authentication (dropped the legacy username column).

Implemented JWT (JSON Web Token) security.

Secured API routes using authMiddleware and adminOnly middleware (RBAC).

CRUD Operations:

Create: "Add User" modal connected to /api/auth/signup.

Read: Dynamic User Table fetching data from /api/admin/users.

Update: "Edit User" modal connected to /api/admin/users/:id/profile.

Delete: Implemented Soft Delete (sets status to 'Offline' instead of erasing data).

Advanced UI: Added a Filter Modal form to sort users by Role and Status on the client side.

🛠️ Tech Stack

Frontend: React.js, React Bootstrap, Axios

Backend: Node.js, Express.js

Database: MySQL

Security: JSON Web Tokens (JWT), Bcrypt (Password Hashing)

Testing: Postman

🔌 API Endpoints

Authentication (/api/auth)

Method

Endpoint

Description

POST

/signup

Registers a new user (Hashes password, checks duplicate email).

POST

/login

Authenticates user via Email & Password; returns JWT Token.

Admin Management (/api/admin)

Requires Authorization: Bearer <token> header

Method

Endpoint

Description

GET

/users

READ: Fetches all user profiles from the database.

PATCH

/users/:id/profile

UPDATE: Updates Name, Email, and Role. Checks for conflicts.

DELETE

/users/:id

DELETE: Performs a "Soft Delete" (sets is_active to 0).

⚙️ Installation & Setup

1. Database Setup

Open phpMyAdmin.

Create a database named freelance_app_new.

Import the provided SQL schema or run the migration script.

Important: Ensure the users table does NOT have a username column (Email-only auth).

2. Backend Setup

cd backend
npm install
# Create a .env file with DB credentials and JWT_SECRET
npm start
# Server runs on Port 4000


3. Frontend Setup

cd frontend
# Ensure package.json includes: "proxy": "http://localhost:4000"
npm install
npm start
# App runs on http://localhost:3000


🧪 Testing

The API has been verified using Postman.

Auth: Verified Token generation on Login.

Security: Verified 401 Unauthorized when accessing Admin routes without a token.

Validation: Verified 409 Conflict when creating users with duplicate emails.

👥 Contributors

[Your Name/Group Name] - Full Stack Development
