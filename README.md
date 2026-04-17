"# 🏥 Medical Store Management System

[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-19-blue)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-8.0-green)](https://www.mongodb.com/)

A full-stack web application for managing a medical store's inventory, sales, and user authentication. Built with a React frontend and Node.js/Express backend with MongoDB.

## Features

- **User Authentication**: Secure login and registration for store staff
- **Medicine Management**: Add, view, update, and delete medicines
- **Stock Tracking**: Monitor medicine stock levels
- **Billing System**: Generate bills for customer purchases
- **Dashboard**: Overview of store operations
- **Responsive Design**: Works on desktop and mobile devices

## 🛠️ Tech Stack

### Frontend

- ⚛️ React 19
- ⚡ Vite (build tool)
- 🌐 Axios (HTTP client)
- 🎨 Tailwind CSS (styling)
- 🧭 React Router (routing)

### Backend

- 🟢 Node.js
- 🚀 Express.js
- 🍃 MongoDB with Mongoose
- 🔑 JWT (authentication)
- 🔒 bcryptjs (password hashing)
- 🌍 CORS (cross-origin requests)

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- 🟢 [Node.js](https://nodejs.org/) (v16 or higher)
- 🍃 [MongoDB](https://www.mongodb.com/) (local installation or cloud service like MongoDB Atlas)
- 📦 npm or yarn

## 🚀 Quick Start

Get up and running in just a few steps!

### 1. Clone the Repository

```bash
git clone <repository-url>
cd Medicalstore
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:

```env
MONGO_URI=mongodb://localhost:27017/medicalstore
JWT_SECRET=your_jwt_secret_key_here
PORT=5000
```

### 3. Frontend Setup

```bash
cd ../frontend/vite-project
npm install
```

### 4. Run the Application

**Start Backend:**

```bash
cd backend
npm start
```

Backend runs on: http://localhost:5000

**Start Frontend:**

```bash
cd frontend/vite-project
npm run dev
```

Frontend runs on: http://localhost:5173

🎉 **Open your browser and navigate to http://localhost:5173**

## 📖 API Documentation

### Authentication Endpoints

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Medicine Endpoints

- `GET /api/medicineRoutes` - Get all medicines
- `POST /api/medicineRoutes` - Add a new medicine
- `PUT /api/medicineRoutes/:id` - Update a medicine
- `DELETE /api/medicineRoutes/:id` - Delete a medicine

<details>
<summary>🔍 View Detailed API Examples</summary>

#### Register User

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"password123"}'
```

#### Get All Medicines

```bash
curl -X GET http://localhost:5000/api/medicineRoutes \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

</details>

## 📁 Project Structure

```
Medicalstore/
├── backend/
│   ├── config/          # Database configuration
│   ├── controllers/     # Route controllers
│   ├── middleware/      # Authentication middleware
│   ├── models/          # MongoDB models
│   ├── routes/          # API routes
│   ├── server.js        # Main server file
│   └── package.json
├── frontend/
│   └── vite-project/
│       ├── src/
│       │   ├── components/  # React components
│       │   ├── api/         # API service functions
│       │   └── assets/      # Static assets
│       ├── public/          # Public files
│       └── package.json
├── screenshots/         # 📸 Screenshots (add your images here)
└── README.md
```

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. 🍴 Fork the repository
2. 🌿 Create a feature branch: `git checkout -b feature/AmazingFeature`
3. 💾 Commit your changes: `git commit -m 'Add some AmazingFeature'`
4. 📤 Push to the branch: `git push origin feature/AmazingFeature`
5. 🔄 Open a Pull Request

### Development Guidelines

- Follow the existing code style
- Write clear, concise commit messages
- Test your changes thoroughly
- Update documentation as needed

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">

**Made with ❤️ for efficient medical store management**

⭐ Star this repo if you find it helpful!

[Report Bug](https://github.com/yourusername/Medicalstore/issues) • [Request Feature](https://github.com/yourusername/Medicalstore/issues)

</div>"
