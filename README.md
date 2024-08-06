# Project Name

This project consists of two main parts: the frontend (my-app) and the backend (backend). Follow the instructions below to set up and run both servers.

## Prerequisites

Ensure you have the following installed on your machine:
- [Node.js](https://nodejs.org/) (which includes npm)

## Environment Variables

Create a .env file in the root of the backend directory and add the following environment variables:

```ini
# .env file content

PORT

MONGODB_URL

JWT_SECRET

# Cloudinary
CLOUD_NAME
API_KEY
API_SECRET
FOLDER_NAME
# Mail sending
MAIL_USER
MAIL_HOST
MAIL_PASS

Running the Application
Running the Frontend
Navigate to the my-app directory:

cd my-app
Install the dependencies:

npm install
Start the frontend server:


npm start
The frontend should now be running on http://localhost:3000.
Running the Backend
Open another terminal window.
Navigate to the backend directory:
cd backend
Install the dependencies:
npm install
Start the backend server:
npm start
The backend should now be running on http://localhost:8800.
Additional Information
Cloudinary Configuration
Ensure you have a Cloudinary account and the Cloudinary configuration (CLOUD_NAME, API_KEY, API_SECRET, and FOLDER_NAME) set in your .env file.

Mail Sending Configuration
Ensure you have the correct MAIL_USER, MAIL_HOST, and MAIL_PASS configured in your .env file to enable email sending functionality.