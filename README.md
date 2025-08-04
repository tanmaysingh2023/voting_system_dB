# 🗳️ Online Voting System (MERN Stack)

A secure and full-featured **online voting application** built using the **MERN stack**. The system supports role-based authentication, real-time poll creation, one-time vote casting, and an intuitive Admin Dashboard. Built with scalability and security in mind.

## 💡 Features

- 🔐 **JWT-based Authentication** for secure login
- 🧑‍⚖️ **Role-based access control** (Admin/User)
- 🗳️ **Vote once per user per poll** (strict check via backend)
- 🧠 **Admin Dashboard** to create/manage polls and monitor live stats
- 📩 **Email verification** on sign-up
- 📊 **Real-time vote count updates** (Socket.IO ready for scaling)
- 🧱 MongoDB for secure and flexible vote & user storage
- 📱 Fully responsive frontend with smooth UI (React + Tailwind CSS)

---

## 📁 Tech Stack

| Frontend  | Backend       | Database | Auth         | Other          |
|-----------|---------------|----------|--------------|----------------|
| React.js  | Node.js       | MongoDB  | JWT + bcrypt | Tailwind CSS   |
| Vite      | Express.js    | Mongoose | Nodemailer   | Email Verify   |

---

## 🛠️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/tanmaysingh2023/voting_system_dB.git
cd voting_system_dB
