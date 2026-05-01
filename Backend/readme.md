# Backend Setup Guide

## Getting Started

Follow these steps to set up and run the backend locally.

---

## 1. Install dependencies

Run the following command in your backend project folder:

npm install

---

## 2. Upload the db

Upload members_only.sql on your local machine.

## 3. Create environment file sample

Create a `.env` file in the root of your backend project and add the following:

DB_URL=postgresql://postgres:pw123@localhost:5432/odin-project-dbs  
PORT=1234  
SECRET=c03d89400fc5920099ef0c0069776e6874a55fb25e2565bb2a62e792d324e148  
ORIGIN=http://localhost:5173  
ADMIN_PW=ajtan123  
MEMBERSHIP_PASSCODE=ajtan22  
NODE_ENV=development

---

## 4. Environment Variables Explained

### DB_URL

Connection string used to connect to your PostgreSQL database.

### PORT

The port number where the backend server will run.

### SECRET

Secret key used for JWT signing and Passport authentication.

### ORIGIN

The URL of the frontend application allowed to access the backend (CORS configuration).

### ADMIN_PW

Password required for registering an admin user.

### MEMBERSHIP_PASSCODE

Code used to upgrade a user role from normal user to member.

### NODE_ENV

Defines the environment mode:

- `development` → for local development
- `production` → for deployed/live environment

---

## 5. Run the server

npm run dev

or (depending on your setup):

node index.js

---

## Notes

- Make sure PostgreSQL is running before starting the backend.
- Ensure `.env` values match your local or production setup.
- Never expose your `.env` file publicly.
