# 📝 Task Manager

A full-stack task management application built with **Express.js** and **React**.

![Task Manager](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![SQLite](https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=sqlite&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)

## 🚀 Features

- ✅ Create, read, update, and delete tasks
- ✅ Mark tasks as complete/incomplete
- ✅ Modern and responsive UI
- ✅ RESTful API architecture
- ✅ Persistent data storage with SQLite
- 🐳 Fully containerized development environment with **Docker Compose**

## 📁 Project Structure
```
TaskManager/
├── tasks-api/            # Backend - Express.js REST API
│   ├── app.js            # Entry point
│   ├── models/           # Sequelize models
│   ├── routes/           # API routes
│   ├── middleware/       # Custom middleware
│   ├── Dockerfile        # Backend container definition
│   ├── .dockerignore
│   └── package.json
│
├── tasks-frontend/       # Frontend - React application
│   ├── src/
│   │   ├── App.js        # Main component
│   │   └── App.css       # Styles
│   ├── public/
│   ├── Dockerfile        # Frontend container definition
│   ├── .dockerignore
│   └── package.json
│
└── docker-compose.yml    # Multi-container orchestration
```

## 🛠️ Tech Stack

### Backend
- **Node.js** - JavaScript runtime (`node:20-slim`)
- **Express.js** - Web framework
- **Sequelize** - ORM for database management
- **SQLite** - Lightweight database
- **CORS** - Cross-origin resource sharing

### Frontend
- **React** - UI library
- **Axios** - HTTP client
- **CSS3** - Modern styling with gradients and animations

### DevOps & Infrastructure
- **Docker** & **Docker Compose** - Application containerization

## 🐳 Quick Start with Docker (Recommended)

### Prerequisites
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running.

### Running the App

Run a single command to build and start both the backend and frontend containers:

```bash
docker compose up --build

The API will be available at `http://localhost:5000`

### Frontend Setup
```bash
# Navigate to frontend directory
cd tasks-frontend

# Install dependencies
npm install

# Start the development server (runs on port 3000)
npm start
```
🎨 Frontend: http://localhost:3000

⚡ Backend API: http://localhost:5000

## ▶️ Quick Start With This Script
```
./start.sh
```

## 🔌 API Endpoints

| Method | Endpoint      | Description               |
|--------|--------------|---------------------------|
| GET    | `/tasks`      | Get all tasks             |
| GET    | `/tasks/:id`  | Get a specific task       |
| POST   | `/tasks`      | Create a new task         |
| PUT    | `/tasks/:id`  | Replace a task (full)     |
| PATCH  | `/tasks/:id`  | Update a task (partial)   |
| DELETE | `/tasks/:id`  | Delete a task             |

### Example Request

**Create a task:**
```bash
curl -X POST http://localhost:5000/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Learn React"}'
```

**Update task status:**
```bash
curl -X PATCH http://localhost:5000/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{"isDone": true}'
```

## 🧪 Testing

### Backend
```bash
cd tasks-api
# Add your test commands here
```

### Frontend
```bash
cd tasks-frontend
npm test
```

## 📝 Environment Variables

### Backend (`tasks-api/.env`)
```env
PORT=5000
NODE_ENV=development
```

### Frontend (`tasks-frontend/.env`)
```env
REACT_APP_API_URL=http://localhost:5000
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 👤 Author

**Your Name**
- GitHub: [@Miorena](https://github.com/Miorena)

## 🙏 Acknowledgments

- Inspired by modern task management applications
- Built as a learning project for full-stack development

---

⭐ **Star this repo if you found it helpful!**
