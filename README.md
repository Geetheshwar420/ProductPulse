# ProductPulse

A production-ready product feedback and analysis platform.

## Architecture

This project uses a **Monorepo** architecture to manage the frontend and backend efficiently.

- **`/client`**: React + Vite + Tailwind CSS frontend.
- **`/server`**: Node.js + Express + Drizzle ORM (SQLite) backend.

## Tech Stack

- **Frontend**: React 18, Vite, Framer Motion, Tailwind CSS
- **Backend**: Node.js, Express, Drizzle ORM, Better-Sqlite3
- **Authentication**: JWT, Bcrypt
- **Storage**: Local SQLite database, Multi-part file uploads (Multer)

## Getting Started

### Prerequisites

- Node.js (v18+)
- npm

### Installation

1. Clone the repository
2. Install dependencies for all workspaces:
   ```bash
   npm run install:all
   ```
3. Set up environment variables:
   - Create `client/.env` and `server/.env` based on the `.env.example` files provided.

### Development

Start both the frontend and backend concurrently:
```bash
npm run dev
```

### Database Management

The project uses Drizzle ORM with SQLite.
- **Push Schema**: `npm run db:push --prefix server`
- **Seed Data**: `node server/src/db/seed.js`

## GitHub Readiness

This project has been restructured for scalability and public distribution:
- **Layered Backend**: Separated controllers, services, and routes.
- **Type Safety**: Integrated Drizzle ORM for database operations.
- **Modern ESM**: Backend uses modern ES module syntax.
- **Security**: Centralized auth middleware and secure password hashing.

---
*Developed by Geetheshwar420*
