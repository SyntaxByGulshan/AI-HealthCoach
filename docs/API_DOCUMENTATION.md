# API Documentation

Base URL: `https://api.aihealthcoach.com/v1`

## 1. Authentication

### Register User
Create a new user account.

*   **URL**: `/auth/register`
*   **Method**: `POST`
*   **Body**:
    ```json
    {
      "email": "user@example.com",
      "password": "securePassword123",
      "name": "John Doe"
    }
    ```
*   **Response**: `201 Created`
    ```json
    {
      "token": "jwt_token_string",
      "user": { "id": "u123", "name": "John Doe" }
    }
    ```

### Login
Authenticate an existing user.

*   **URL**: `/auth/login`
*   **Method**: `POST`
*   **Body**:
    ```json
    {
      "email": "user@example.com",
      "password": "securePassword123"
    }
    ```
*   **Response**: `200 OK`
    ```json
    {
      "token": "jwt_token_string"
    }
    ```

## 2. User Profile

### Get Profile
Retrieve the authenticated user's profile.

*   **URL**: `/user/profile`
*   **Method**: `GET`
*   **Headers**: `Authorization: Bearer <token>`
*   **Response**: `200 OK`
    ```json
    {
      "age": 25,
      "weight": 70,
      "height": 175,
      "goal": "Weight Loss"
    }
    ```

### Update Profile
Update user details.

*   **URL**: `/user/profile`
*   **Method**: `PUT`
*   **Headers**: `Authorization: Bearer <token>`
*   **Body**:
    ```json
    {
      "weight": 68,
      "activityLevel": "Active"
    }
    ```
*   **Response**: `200 OK`

## 3. Plans

### Generate Plan
Generate a new AI-based plan.

*   **URL**: `/plans/generate`
*   **Method**: `POST`
*   **Headers**: `Authorization: Bearer <token>`
*   **Body**:
    ```json
    {
      "type": "diet", // or "workout"
      "preferences": ["vegetarian", "gluten-free"]
    }
    ```
*   **Response**: `200 OK`
    ```json
    {
      "planId": "p123",
      "week": 1,
      "content": { ... }
    }
    ```

## 4. Daily Log

### Sync Daily Log
Upload daily tracking data.

*   **URL**: `/daily-log/sync`
*   **Method**: `POST`
*   **Headers**: `Authorization: Bearer <token>`
*   **Body**:
    ```json
    {
      "date": "2025-11-28",
      "water": 2000,
      "steps": 8500,
      "sleep": 7.5
    }
    ```
*   **Response**: `200 OK`
