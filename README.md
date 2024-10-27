# fanhub
# API Endpoints

## Authentication

- **Login**
  - **URL:** `http://localhost:3000/login`
  - **Method:** POST
  - **Request Body:**
    ```json
    {
      "email": "user@example.com",
      "password": "yourpassword"
    }
    ```
  - **Response:**
    - On success: `{ "accessToken": "jwt-token-here" }`
    - On failure: HTTP status code and message.