# Gym Management System

A comprehensive monorepo gym management application with role-based access control, membership management, class reservations, and Stripe payment integration.

![Node.js](https://img.shields.io/badge/Node.js-25.9.0-green?logo=node.js) ![TypeScript](https://img.shields.io/badge/TypeScript-5.7.3-blue?logo=typescript) ![NestJS](https://img.shields.io/badge/NestJS-11.0.1-red?logo=nestjs) ![React](https://img.shields.io/badge/React-19.2.5-61dafb?logo=react) ![Docker](https://img.shields.io/badge/Docker-enabled-2496ED?logo=docker) ![License](https://img.shields.io/badge/License-UNLICENSED-yellow)

---

## Objective

The primary objective of this project was to develop a scalable gym management backend while gaining practical experience with NestJS and modern development workflows. The learning process involved containerizing the application with Docker and implementing CI/CD pipelines via GitHub Actions for automated quality assurance. Additionally, it provided a hands-on opportunity to integrate Stripe for payment processing and utilize Swagger/OpenAPI for comprehensive API documentation.

---

## Overview

This application provides a complete gym management solution with separate interfaces for administrators, instructors, and members (socios). It handles user management, class scheduling, reservation systems, membership tracking, and payment processing through Stripe.

**Target Users:**
- **Administrators**: Full system access for managing users, classes, memberships, and viewing payment history
- **Instructors**: Access to class rosters, student lists, and attendance tracking
- **Members (Socios)**: Class browsing, reservation management, and membership purchasing

**Key Features:**
- Role-based authentication with JWT tokens (httpOnly cookies)
- Class management with instructor assignment and capacity tracking
- Reservation system with membership validation
- Stripe payment integration for membership purchases
- PostgreSQL database with Prisma ORM
- Swagger API documentation
- Real-time state management with React Query and Zustand
- Responsive UI with Tailwind CSS

---

## Architecture

### Monorepo Structure

```
gym/
├── backend/          # NestJS REST API
├── frontend/         # React SPA
└── README.md         # This file
```

### Backend Architecture

The backend follows a **Service-Repository pattern** with clear separation of concerns:

```
src/
├── controllers/   # HTTP request handling, DTO validation
├── services/      # Business logic
├── repository/    # Database access layer
├── dto/           # Data transfer objects with class-validator
├── guards/        # Authentication & authorization
├── decorators/    # Custom decorators (@Roles, @Public)
└── types/         # TypeScript type definitions
```

**Architectural Pattern:** Service-Repository with dependency injection via NestJS modules. Each domain (auth, users, clases, membership, payment, reservations) is encapsulated in its own module with dedicated controllers, services, and repositories.

### Frontend Architecture

The frontend uses a **feature-based structure** organized by user role:

```
src/
├── admin/      # Administrator dashboard and features
├── instructor/ # Instructor-specific views
├── socio/      # Member (socio) functionality
├── login/      # Authentication pages
├── home/       # Landing page
└── auth/       # Auth context and providers
```

### Communication

- **Protocol:** REST API over HTTP
- **Authentication Flow:**
  1. User submits credentials to `/auth/login`
  2. Backend validates and returns JWT token
  3. Token stored in httpOnly cookie + localStorage
  4. Subsequent requests include `Authorization: Bearer <token>` header
  5. AuthGuard validates token on protected routes
  6. RolesGuard enforces role-based access control

---

## Redis & Caching

Even though the backend already performed well (with response times under 20ms), Redis was integrated into the project for learning purposes to practice caching patterns in a NestJS environment.

### Cache Strategy

We implemented the **Cache-Aside pattern**:
1. The application first checks the Redis cache for requested data.
2. If the data is present (**Cache Hit**), it is returned immediately.
3. If the data is missing (**Cache Miss**), the application fetches it from the PostgreSQL database, stores it in Redis for future requests, and then returns it.

### Implementation Details

- **Global Redis Module**: The `RedisService` is wrapped in a `@Global()` NestJS module. This allows it to be used across any module in the application without the need for redundant imports.
- **Official Client**: Uses the official `redis` npm package.
- **Key Naming Convention**: Keys follow the pattern `cache:<resource>` (e.g., `cache:clases`, `cache:type-memberships`).
- **TTL (Time to Live)**: Cached entries are set with a TTL of **5 minutes** (300 seconds).

### Cached Endpoints & Invalidation

| Endpoint | Cache Key | Invalidation Trigger |
|----------|-----------|-----------------------|
| `GET /typeMembership` | `cache:type-memberships` | N/A (Static data) |
| `GET /Clase` | `cache:clases` | `POST`, `PATCH`, `DELETE` on `/Clase` |

To ensure data consistency, the cache for classes is explicitly invalidated whenever a new class is created, or an existing one is updated or deleted.

---

## Tech Stack

### Backend

| Technology | Version | Purpose |
|------------|---------|---------|
| Node.js | 25.9.x | Runtime environment |
| TypeScript | 5.7.3 | Type-safe JavaScript |
| NestJS | 11.0.1 | Backend framework |
| Prisma | 6.19.3 | ORM and database toolkit |
| PostgreSQL | - | Primary database |
| Redis | 6.0.0 | Caching database |
| bcrypt | 6.0.0 | Password hashing |
| jsonwebtoken | 9.0.3 | JWT authentication |
| class-validator | 0.15.1 | DTO validation |
| class-transformer | 0.5.1 | Object transformation |
| Stripe | 22.0.2 | Payment processing |
| Swagger/OpenAPI | 11.4.1 | API documentation |

### Frontend

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19.2.5 | UI library |
| TypeScript | 6.0.2 | Type safety |
| Vite | 8.0.10 | Build tool and dev server |
| React Router | 7.14.2 | Client-side routing |
| TanStack Query | 5.100.6 | Server state management |
| Zustand | 5.0.12 | Client state management |
| React Hook Form | 7.74.0 | Form handling |
| Yup | 1.7.1 | Schema validation |
| Tailwind CSS | 4.2.4 | Utility-first CSS |
| Framer Motion | - | Animations |
| GSAP | 3.15.0 | Advanced animations |
| Recharts | 3.8.1 | Data visualization |
| Lucide React | 1.12.0 | Icon library |

---

## Getting Started

### Prerequisites

- **Node.js:** v25.9.0 or higher
- **npm:** Latest version (bundled with Node)
- **Docker:** 20.x or higher (optional, for containerized deployment)
- **Docker Compose:** 2.x or higher (optional)
- **PostgreSQL:** 14.x or higher (if running without Docker)

### Installation

#### 1. Clone the repository

```bash
git clone <repository-url>
cd gym
```

#### 2. Backend Setup

```bash
cd backend
npm install
```

Create `.env` file in the backend directory:

```bash
# PostgreSQL connection string
# Format: postgresql://<user>:<password>@<host>:<port>/<database>
DATABASE_URL="postgresql://postgres:your_password@localhost:5432/Gym"

# Number of salt rounds for bcrypt password hashing
SALT_ROUNDS=10

# Secret key for JWT token generation (64-character hex string recommended)
JWT_SECRET_KEY="a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6"

# Stripe secret key for payment processing
# Get from https://dashboard.stripe.com/test/apikeys
SECRET_STRIPE_KEY="sk_test_your_stripe_secret_key_here"

# Stripe webhook secret for payment events
# Create webhook endpoint in Stripe Dashboard to obtain this
STRIPE_WEBHOOK_SECRET="whsec_your_webhook_secret_here"

# Frontend origin for CORS
CORS_ORIGIN="http://localhost:5173"
```

Install Prisma dependencies and generate client:

```bash
npx prisma generate
npx prisma migrate dev --name init
```

#### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

Create `.env` file in the frontend directory:

```bash
# Backend API URL
# Points to the running backend server
VITE_API_URL="http://localhost:3000"
```

---

## Running the Application

### Running with Docker (Recommended)

**Note:** A `docker-compose.yml` file should be created at the root level for full-stack containerization. Currently, only the backend has a Dockerfile.

```bash
# Build and run backend container
cd backend
docker build -t gym-backend .
docker run -p 3000:3000 --env-file .env gym-backend

# Run frontend in development mode
cd ../frontend
npm run dev
```

### Running Locally (Without Docker)

#### Backend

```bash
cd backend

# Development mode with hot-reload
npm run start:dev

# Production build
npm run build
npm run start:prod

# Debug mode
npm run start:debug
```

Backend will be available at: `http://localhost:3000`
Swagger documentation: `http://localhost:3000/api`

#### Frontend

```bash
cd frontend

# Development server with Vite
npm run dev

# Production build
npm run build
npm run preview
```

Frontend will be available at: `http://localhost:5173`

---

## API Overview

The backend exposes the following endpoint groups:

| Endpoint | Description |
|----------|-------------|
| `/auth` | Authentication (login, logout, signup, session) |
| `/users` | User management (CRUD, instructor creation, profile) |
| `/Clase` | Class management (schedule, instructor assignment) |
| `/reservations` | Reservation system (book, cancel, view) |
| `/membership` | Membership assignment and management |
| `/typeMembership` | Membership type catalog |
| `/payment` | Payment processing and Stripe webhook |

**Swagger Documentation:** Available at `/api` when running the backend.

---

## Project Structure

```
gym/
├── backend/
│   ├── src/
│   │   ├── auth/                 # Authentication module
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.module.ts
│   │   │   ├── dto/
│   │   │   ├── services/
│   │   │   └── repository/
│   │   ├── users/                # User management module
│   │   ├── clase/                # Class management module
│   │   ├── reservations/         # Reservation system module
│   │   ├── membership/           # Membership module
│   │   ├── payment/              # Payment processing module
│   │   ├── typeMembership/       # Membership type module
│   │   ├── shared/               # Shared guards, decorators, types
│   │   ├── generated/prisma/     # Prisma generated types
│   │   ├── app.module.ts
│   │   ├── main.ts
│   │   └── prisma.service.ts
│   ├── prisma/
│   │   └── schema.prisma         # Database schema
│   ├── test/
│   ├── Dockerfile
│   ├── nest-cli.json
│   ├── tsconfig.json
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── admin/                # Admin dashboard
│   │   │   ├── layout/
│   │   │   ├── pages/
│   │   │   └── features/
│   │   ├── instructor/           # Instructor views
│   │   │   ├── layout/
│   │   │   └── pages/
│   │   ├── socio/                # Member (socio) views
│   │   │   ├── layout/
│   │   │   ├── pages/
│   │   │   └── features/
│   │   ├── login/                # Login page
│   │   ├── home/                 # Landing page
│   │   ├── auth/                 # Auth context & providers
│   │   ├── router/               # React Router configuration
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── public/
│   ├── vite.config.ts
│   ├── tsconfig.json
│   └── package.json
│
└── README.md
```

---

## Scripts

### Backend Scripts

| Script | Command | Description |
|--------|---------|-------------|
| `build` | `nest build` | Compile TypeScript to JavaScript |
| `start` | `nest start` | Start the application |
| `start:dev` | `nest start --watch` | Start with hot-reload for development |
| `start:debug` | `nest start --debug --watch` | Start with debugging enabled |
| `start:prod` | `node dist/main` | Start production build |
| `lint` | `eslint --fix` | Fix linting issues |
| `format` | `prettier --write` | Format code with Prettier |
| `test` | `jest` | Run unit tests |
| `test:watch` | `jest --watch` | Watch for test changes |
| `test:cov` | `jest --coverage` | Generate test coverage report |
| `test:e2e` | `jest --config ./test/jest-e2e.json` | Run end-to-end tests |

### Frontend Scripts

| Script | Command | Description |
|--------|---------|-------------|
| `dev` | `vite` | Start development server |
| `build` | `tsc -b && vite build` | Build for production |
| `lint` | `eslint .` | Run ESLint |
| `preview` | `vite preview` | Preview production build |

---

## Database Schema

The application uses the following entities:

- **Usuario**: Users (Administrador, Instructor, Socio)
- **Clase**: Fitness classes with instructor, schedule, capacity
- **Reserva**: Class reservations linked to users and classes
- **Membresia**: Membership subscriptions with validity periods
- **TipoMembresia**: Membership types (duration, price)
- **Pago**: Payment records with Stripe integration

---

## Environment Variables Summary

### Backend Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@localhost:5432/db` |
| `SALT_ROUNDS` | Bcrypt salt rounds | `10` |
| `JWT_SECRET_KEY` | JWT signing secret | 64-char hex string |
| `SECRET_STRIPE_KEY` | Stripe API secret key | `sk_test_...` |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook secret | `whsec_...` |
| `CORS_ORIGIN` | Allowed CORS origin | `http://localhost:5173` |

### Frontend Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API URL | `http://localhost:3000` |

---

## License

UNLICENSED - All rights reserved.
