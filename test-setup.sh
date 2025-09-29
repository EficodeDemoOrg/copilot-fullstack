#!/bin/bash

echo "Task Manager - Development Setup Test"
echo "========================================"

# Wait for services to be ready
echo "Waiting for services to start..."
sleep 30

# Test database connection
echo "Testing database connection..."
if docker-compose exec -T database psql -U postgres -d taskmanager -c "SELECT 1;" > /dev/null 2>&1; then
  echo "Database connection successful"
else
  echo "Database connection failed"
fi

# Test backend API
echo "Testing backend API..."
if curl -s http://localhost:8000/api/health > /dev/null; then
  echo "Backend API is responding"
else
  echo "Backend API is not responding"
fi

# Test frontend
echo "Testing frontend..."
if curl -s http://localhost:3000 > /dev/null; then
  echo "Frontend is responding"
else
  echo "Frontend is not responding"
fi

echo ""
echo "Setup complete! Access your application at:"
echo "   Frontend: http://localhost:3000"
echo "   Backend:  http://localhost:8000"
echo "   Database: postgresql://localhost:5432/taskmanager"
echo ""
echo "Check the README.md for detailed usage instructions."
