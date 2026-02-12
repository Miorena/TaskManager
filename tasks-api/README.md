# Tasks API

REST API for task management with Express.js and Sequelize (SQLite).

## Installation
```bash
npm install
```

## Start
```bash
npm run dev
```

## Available Routes

| Method | Route        | Description               |
|--------|-------------|---------------------------|
| GET    | /tasks       | Get all tasks             |
| GET    | /tasks/:id   | Get a task by ID          |
| POST   | /tasks       | Create a new task         |
| PUT    | /tasks/:id   | Replace a task            |
| PATCH  | /tasks/:id   | Partially update a task   |
| DELETE | /tasks/:id   | Delete a task             |

## Examples

### Create a task
```bash
curl -X POST http://localhost:5000/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Learn Express"}'
```

### Mark as done
```bash
curl -X PATCH http://localhost:5000/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{"isDone": true}'
```

## Project Structure
```
tasks-api/
├── app.js                # Entry point
├── models/
│   └── index.js          # Sequelize model + DB
├── routes/
│   └── tasks.js          # /tasks routes
├── middleware/
│   └── validateId.js     # ID validation
└── package.json
```