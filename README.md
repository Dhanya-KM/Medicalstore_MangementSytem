"# Medical Store Management System

A full-stack web application for managing a medical store's inventory, sales, and user authentication. Built with a React frontend and Node.js/Express backend with MongoDB.

## Features

- **User Authentication**: Secure login and registration for store staff
- **Medicine Management**: Add, view, update, and delete medicines
- **Stock Tracking**: Monitor medicine stock levels
- **Billing System**: Generate bills for customer purchases
- **Dashboard**: Overview of store operations
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

### Frontend

- React 19
- Vite (build tool)
- Axios (HTTP client)
- Tailwind CSS (styling)
- React Router (routing)

### Backend

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT (authentication)
- bcryptjs (password hashing)
- CORS (cross-origin requests)

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (local installation or cloud service like MongoDB Atlas)
- npm or yarn

## Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd Medicalstore
   ```

2. **Backend Setup**

   ```bash
   cd backend
   npm install
   ```

   - Create a `.env` file in the `backend` directory with the following variables:
     ```
     MONGO_URI=mongodb://localhost:27017/medicalstore
     JWT_SECRET=your_jwt_secret_key
     PORT=5000
     ```

3. **Frontend Setup**
   ```bash
   cd ../frontend/vite-project
   npm install
   ```

## Running the Application

1. **Start the Backend Server**

   ```bash
   cd backend
   npm start
   ```

   The backend will run on http://localhost:5000

2. **Start the Frontend Development Server**

   ```bash
   cd frontend/vite-project
   npm run dev
   ```

   The frontend will run on http://localhost:5173

3. Open your browser and navigate to http://localhost:5173

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Medicines

- `GET /api/medicineRoutes` - Get all medicines
- `POST /api/medicineRoutes` - Add a new medicine
- `PUT /api/medicineRoutes/:id` - Update a medicine
- `DELETE /api/medicineRoutes/:id` - Delete a medicine

## Project Structure

```
Medicalstore/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── package.json
├── frontend/
│   └── vite-project/
│       ├── src/
│       │   ├── components/
│       │   └── ...
│       └── package.json
└── README.md
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License."
