#!/bin/bash

# Start backend
bash -c 'cd tasks-api && npm run dev' &

# Start frontend
bash -c 'cd tasks-frontend && npm start'