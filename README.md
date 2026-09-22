# Notion Clone

A full-stack Notion-like productivity and knowledge management application developed as a Full Stack Web Development (FSWD) subject project.

## Tech Stack

### Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS

### Backend

* FastAPI
* Python
* SQLModel

### Database

* PostgreSQL

### Authentication & Security

* bcrypt
* JWT

## Planned Features

* User registration and login
* Authentication and authorization
* Workspaces
* Pages and nested pages
* Rich text editor
* Notes and blocks
* Search
* User-friendly dashboard

## Project Structure

```text
Notion-Clone/
├── frontend/
├── backend/
├── .gitignore
└── README.md
```

## 21/09/26's Progress — Authentication

Implemented the complete backend authentication foundation for the Notion Clone.

### What I Built

* Set up the PostgreSQL database connection with FastAPI and SQLModel.
* Created the `User` database model.
* Added user registration using the `/register` API.
* Added secure password hashing using **bcrypt**.
* Added duplicate email checking during registration.
* Added user login using the `/login` API.
* Added JWT access-token generation after successful login.
* Added JWT token verification.
* Created a reusable authentication dependency using FastAPI's `Depends()`.
* Created a protected `/me` endpoint.
* Tested authentication with:

  * Valid login credentials
  * Invalid password
  * Unknown email
  * Duplicate email registration
  * Protected endpoint without a token
  * Protected endpoint with a valid JWT

### Authentication Flow

```text
Register
   ↓
Password → bcrypt hash
   ↓
PostgreSQL

Login
   ↓
Verify password
   ↓
Generate JWT
   ↓
Client receives token
   ↓
Protected API request
   ↓
Verify JWT
   ↓
Identify authenticated user
```

### Files Added / Updated

```text
backend/
├── auth.py
├── database.py
├── jwt_handler.py
├── main.py
├── models.py
├── schemas.py
└── security.py
```

### Current Status

The backend authentication foundation is now working successfully.

Next, we will connect the **Next.js frontend** to the authentication APIs and build the user-facing registration and login experience.
