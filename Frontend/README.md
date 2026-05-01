# Frontend Setup Guide

## Getting Started

Follow these steps to run the frontend locally.

### 1. Install dependencies

Open your terminal in the project folder and run:

npm install

---

### 2. Create environment file

Create a `.env` file in the root of the project and add the following:

VITE_API=http://localhost:1234

Replace the URL depending on where your backend is hosted.

Examples:

- Local backend → http://localhost:1234
- Deployed backend → https://your-api-url.com

---

### 3. Run the development server

npm run dev

---

## Notes

- Make sure your backend server is running before using the app.
- The frontend communicates with the backend using the `VITE_API` URL.
- If the API URL is incorrect, requests will fail.
