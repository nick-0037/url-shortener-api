# Url-shortener-api

A simple RESTful API built with Node.js and Express. This API allows users to shorten long URLs, perform CRUD operations, and provides statistics on the number of times a short URL has been accessed. Additionally, it includes a minimal frontend to interact with the API's endpoints.
https://roadmap.sh/projects/url-shortening-service

## Features:

- Shortener long URL
- Redirection to long URL
- Update long URL 
- Delete URL
- Retrieve statics number of times short URL has been accessed.

## Installation:

1. Clone the repository:
  ```bash
  git clone https://github.com/nick-0037/url-shortener-api.git
  cd url-shortener-api
  ```

2. Install dependencies for both backend and frontend:
  ```bash
  npm install
  cd frontend
  npm install
  ```

3. Start the servers:
  - Backend (API):
    ```bash
    npm start // localhost:3000
    ```
  - Frontend(vite):
    ```bash
    npm run dev // localhost:5173
    ```

## API Endpoints:

### 1. Short URL
  **POST** `/shorten`
  - Create a short URL.
  **Request**
  ```json
  {
    "url": "https://example.com"
  }
  ```
  **Response**
  ```json
  {
    "id": "some_unique_id",
    "url": "https://example.com",
    "shortCode": "abcd12",
    "createdAt": "2024-12-26T00:00:00.000Z",
    "updatedAt": "2024-12-26T00:00:00.000Z"
  }
  ```

### 2. Redirect
  **GET** `/shorten/:shortCode`
  - Redirects to long URL associated with the shortCode.
  **Response**
  Redirects to the long URL.

### 3. Update
  **PUT** `/shorten/:shortCode`
  - Update existing the long URL associated with the shortCode.
  **Request**
  ```json
  {
    "url": "https://example.updated.com"
  }
  ```
  **Response**
  ```json
  {
    "id": "some_unique_id",
    "url": "https://example.updated.com",
    "shortCode": "abcd12",
    "createdAt": "2024-12-26T00:00:00.000Z",
    "updatedAt": "2024-12-26T00:00:01.000Z"
  }
  ```

### 4. Delete
  **DELETE** `/shorten/:shortCode`
  - Delete existing the long URL associated with the shortCode.
  **Response**
  - No content

### 5. Statistics
  **GET** `/shorten/:shortCode/stats`
  - Retrieve a number of times short URL has been accessed.
  **Response**
  ```json
  {
    "id": "some_unique_id",
    "url": "https://example.updated.com",
    "shortCode": "abcd12",
    "createdAt": "2024-12-26T00:00:00.000Z",
    "updatedAt": "2024-12-26T00:00:01.000Z",
    "accessCount": 10
  }
  ```

## Frontend

The API includes a minimal frontend that interacts with the following endpoints:
1. POST /shorten - To shorten a long URL.
2. GET /shorten/:shortCode - To visit the shortened URL.

The frontend is built with React and served using Vite. You can interact with the API by visiting the frontend at http://localhost:5173 once both the backend and frontend servers are running.

## technologies:

- **Node.js**
- **Express.js**
- **MongoDB Atlas**
- **Mongoose**
- **Vite**
- **React**
