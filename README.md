# Task Manager - Full Stack JavaScript Application

A modern task management application built with React, Node.js, PostgreSQL, and Docker.

## Features

- **Task Management**: Create, update, delete, and organize tasks with different statuses (To Do, In Progress, Done)
- **Comments System**: Add and manage comments on tasks with author information
- **Tags System**: Color-coded tags for task organization and filtering
- **Task Statistics**: Visual dashboard showing task counts by status
- **Responsive Design**: Dark theme with mobile-first approach
- **Real-time Updates**: Optimistic updates with React Query

## Technology Stack

- **Frontend**: React 19 + TypeScript + Vite
- **Backend**: Node.js + Express.js + TypeScript
- **Database**: PostgreSQL 15 with UUID primary keys
- **Containerization**: Docker + Docker Compose
- **State Management**: React Query (v3) for server state
- **Styling**: CSS Custom Properties (CSS Variables)
- **Icons**: Lucide React
- **Security**: Helmet.js, CORS, input validation with Joi


## Prerequisites

You can run this application either with Docker (recommended) or directly on your machine (without Docker). See below for the requirements for each approach.

### If Using Docker (Recommended)
- **Docker** and **Docker Compose** installed

### If Running Without Docker
- **PostgreSQL 15+** installed and running locally
- **Node.js 18+** and **npm** installed

## Quick Start with Docker (Recommended)

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd copilot-demo-fullstack
   ```

2. **Copy and configure environment variables**
   ```bash
   cp .env.example .env
   ```

3. **Start all services**
   ```bash
   docker-compose up --build
   ```

4. **Access the application**
   - **Frontend**: http://localhost:3000
   - **Backend API**: http://localhost:8000
   - **Database**: postgresql://localhost:5432/taskmanager

5. **Test the setup** (optional)
   ```bash
   chmod +x test-setup.sh
   ./test-setup.sh
   ```

## Local Development (Without Docker)

### Prerequisites for Local Development
- PostgreSQL 15+ installed and running
- Node.js 18+ and npm

### Setup Steps

1. **Database Setup**
   ```bash
   # Create database
   createdb taskmanager
   
   # Run initialization script
   psql -U postgres -d taskmanager -f database/init.sql
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   
   # Update .env with local database settings
   # DB_HOST=localhost (instead of 'database')
   
   npm run dev
   # Backend will run on http://localhost:5000
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   
   # Update .env with local backend URL if needed
   # VITE_API_URL=http://localhost:5000
   
   npm run dev
   # Frontend will run on http://localhost:3000
   ```

## API Endpoints

### Tasks
- `GET /api/tasks` - Get all tasks (with optional filtering)
- `GET /api/tasks/:id` - Get single task
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

### Comments
- `GET /api/comments/:taskId` - Get comments for a task
- `POST /api/comments/:taskId` - Add comment to task
- `PUT /api/comments/:id` - Update comment
- `DELETE /api/comments/:id` - Delete comment

### Tags
- `GET /api/tags` - Get all tags
- `POST /api/tags` - Create new tag
- `PUT /api/tags/:id` - Update tag
- `DELETE /api/tags/:id` - Delete tag

## Development Commands

### Docker Commands
```bash
# Start all services
docker-compose up

# Start in background
docker-compose up -d

# Stop all services
docker-compose down

# View logs
docker-compose logs -f [service-name]

# Rebuild services
docker-compose up --build
```

### Individual Service Commands
```bash
# Frontend only
docker-compose up frontend

# Backend only
docker-compose up backend

# Database only
docker-compose up database
```

### Database Management
```bash
# Access database shell
docker-compose exec database psql -U postgres -d taskmanager

# View database logs
docker-compose logs database

# Reset database
docker-compose down
docker volume rm task-manager_postgres_data
docker-compose up database
```

## Project Structure

```
├── docker-compose.yml          # Docker services configuration
├── .env.example               # Environment variables template
├── .env                       # Environment variables (local)
├── README.md                  # This file
├── test-setup.sh              # Setup validation script
├── frontend/                  # React frontend application
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   ├── pages/            # Page components (Tasks, Tags)
│   │   ├── services/         # API services and HTTP client
│   │   ├── types/            # TypeScript type definitions
│   │   └── styles/           # CSS styles and CSS variables
│   ├── package.json          # Frontend dependencies
│   ├── vite.config.ts        # Vite configuration
│   ├── index.html            # HTML entry point
│   └── Dockerfile.dev        # Development Docker image
├── backend/                   # Node.js backend application
│   ├── src/
│   │   ├── routes/           # API route handlers (tasks, comments, tags)
│   │   ├── database/         # Database connection and configuration
│   │   ├── types/            # TypeScript type definitions
│   │   ├── app.ts            # Express app configuration
│   │   └── server.ts         # Server entry point
│   ├── package.json          # Backend dependencies
│   ├── tsconfig.json         # TypeScript configuration
│   └── Dockerfile.dev        # Development Docker image
└── database/                  # Database initialization
    └── init.sql              # Database schema and seed data
```

## Environment Variables

The `.env.example` file contains all required environment variables:

```env
# Database Configuration
DB_HOST=database              # Use 'localhost' for local development
DB_PORT=5432
DB_NAME=taskmanager
DB_USER=postgres
DB_PASSWORD=password

# Backend Configuration
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000

# Frontend Configuration
VITE_API_URL=http://localhost:8000   # Backend API endpoint
```

**Note**: For local development without Docker, change `DB_HOST` to `localhost`.

## Database Schema

The application uses PostgreSQL with the following main tables:

- **tasks**: Task information with UUID primary keys
- **tags**: Color-coded tags for organization
- **task_tags**: Many-to-many relationship between tasks and tags
- **comments**: Task comments with author information

All tables use UUID primary keys and include proper indexes for performance.

## Architecture Decisions

- **Monorepo Structure**: Frontend and backend in separate folders
- **Docker-First Development**: Optimized for containerized development
- **TypeScript Throughout**: Both frontend and backend use TypeScript
- **React Query**: Handles server state, caching, and optimistic updates
- **CSS Variables**: Consistent theming with CSS custom properties
- **Security Headers**: Helmet.js for security best practices

## Troubleshooting

### Common Issues

**Port already in use**
```bash
docker-compose down
# Check for running processes on ports 3000, 8000, 5432
lsof -ti:3000,8000,5432 | xargs kill -9
```

**Database connection issues**
```bash
# Check database logs
docker-compose logs database

# Recreate database volume
docker-compose down
docker volume rm copilot-demo-fullstack_postgres_data
docker-compose up database
```

**Frontend build issues**
```bash
# Clear node_modules and reinstall
cd frontend
rm -rf node_modules package-lock.json
npm install
```

**Backend compilation errors**
```bash
# Clear TypeScript cache and rebuild
cd backend
rm -rf dist node_modules package-lock.json
npm install
npm run build
```

## Security Features

- CORS protection
- Helmet.js security headers
- Input validation with Joi
- SQL injection prevention with parameterized queries
- Environment variable protection

## License

This project is open source and available under the [MIT License](LICENSE).
