# API Authentication Project

A small REST API built with Node.js and Express. It demonstrates:
- User registration
- Password hashing with bcrypt
- Login and JSON Web Token (JWT) creation
- Bearer-token verification on a protected endpoint
- API testing with the included Postman collection

## Requirements
- Node.js 18 or later
- npm
- Postman (for testing)

## Setup
1. Extract this ZIP file.
2. Open the extracted `API_Authentication_Project` folder in VS Code.
3. Open a terminal in that folder and run:

   ```bash
   npm install
   ```

4. Copy `.env.example` and rename the copy to `.env`.
5. In `.env`, set `JWT_SECRET` to a random secret of at least 32 characters. Do not upload `.env` to GitHub.
6. Start the server:

   ```bash
   npm start
   ```

7. Visit `http://localhost:3000` to confirm that the API is running.

## API endpoints

### 1. Register
`POST http://localhost:3000/api/register`

JSON body:
```json
{
  "username": "student1",
  "password": "StrongPass123"
}
```
Expected response: `201 Created`.

### 2. Login
`POST http://localhost:3000/api/login`

Use the same JSON body. A successful login returns an `accessToken`.

### 3. Protected profile
`GET http://localhost:3000/api/profile`

Add this request header:
`Authorization: Bearer YOUR_ACCESS_TOKEN`

A valid token returns `200 OK`. Missing, invalid, or expired tokens return `401 Unauthorized`.

## Test using Postman
1. Import `postman/API_Authentication_Project.postman_collection.json`.
2. Run **Register User**.
3. Run **Login User**. The collection saves the returned access token in a collection variable.
4. Run **Get Protected Profile**.
5. Try the protected endpoint without a token to confirm it returns `401`.

## GitHub upload
Upload the project files and folders to your repository. Include `.env.example`, but do not upload `.env` or `node_modules`.

## Important limitations
This is a classroom demonstration, not a production-ready identity system. User records are kept in memory and disappear when the server restarts. A real deployment should use a database, HTTPS, rate limiting, account lockout or throttling, logging and monitoring, robust authorization checks, secure secret storage and rotation, and a well-designed token revocation/refresh strategy.
