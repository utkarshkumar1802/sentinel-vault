Sentinel: Zero-Trust Security Vault
Sentinel is a secure, role-based document management platform built to handle sensitive data with a "verify-first" philosophy. Developed as a final-year B.Tech project specializing in Cybersecurity at NIET, it demonstrates a full-stack implementation of modern authentication and authorization patterns.

🛡️ Core Security Features
As a Cybersecurity specialist, I focused on building multiple defensive layers:

Zero-Trust Authentication: Integrated JSON Web Tokens (JWT) to ensure that every request to the backend is verified and tied to an active session.

Asynchronous Password Hashing: Utilizes Bcrypt to hash passwords with a unique salt before they are stored in MongoDB, protecting user credentials against rainbow table attacks.

Role-Based Access Control (RBAC): Implemented a strict hierarchy where the Admin (Utkarsh) can access the System Command Center to monitor recruits and revoke access, while standard users are isolated to their own data.

Secure File Handling: Integrated Multer for controlled file uploads, ensuring files are handled as binary data and stored in a secure server-side archive.

🚀 Tech Stack
Frontend: React.js (Vite), Axios, JWT-Decode

Backend: Node.js, Express.js

Database: MongoDB Atlas (NoSQL)

Security: Bcrypt.js, JsonWebToken

🛠️ Installation & Setup
To review this locally, follow these steps:

1. Backend Setup

cd server
npm install
# Create a .env file with your MONGO_URI and JWT_SECRET
npm start
2. Frontend Setup

cd client
npm install
npm run dev
🕵️‍♂️ Admin Access
The highlight of this project is the Admin Command Center. To unlock it, manually update the user role to admin in your MongoDB collection. This provides access to real-time system stats and a centralized dashboard for user management.

📝 Author
Utkarsh Kumar Cybersecurity Specialist | Final Year B.Tech (2026) NIET, Greater Noida
