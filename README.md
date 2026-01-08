
# Connectify

A full-stack social media platform for posting, liking, commenting, and following—built with a React + Vite frontend and an Express + Prisma backend.

## Project Overview

Connectify lets users sign up, create and manage posts (with images), like and comment on posts, and follow/unfollow other users. The project demonstrates a complete modern web app stack with server-side authentication, relational data modeling using Prisma + PostgreSQL, and a responsive React UI styled with CSS/SCSS.

## Key Features

- User authentication (signup/login) with JWT stored in cookies
- Create, edit, and delete posts (image upload supported)
- Like / unlike posts and add comments
- Follow / unfollow other users (relationships)
- Client styles with CSS and SCSS; responsive UI using MUI and custom components

## Tech Stack

- Frontend: React, Vite, React Router, MUI, Redux Toolkit
- Backend: Node.js, Express, Prisma (PostgreSQL), JWT, bcrypt, Multer
- Dev tools: Vite, Nodemon, Prisma, ESLint, Sass

## Repo Structure (high level)

- client/ — React (Vite) frontend
	- public/assets — static images uploaded by users stored here in development
	- src/ — React source code (components, pages, context, styles)
	- package.json — client scripts (`npm run dev`, `build`, etc.)
- server/ — Express backend + Prisma
	- controllers/ — request handlers for auth, posts, users, comments, likes, relationships
	- routes/ — Express route definitions for API endpoints
	- middleware/ — authentication middleware (token verification)
	- prisma/schema.prisma — database schema and models (User, Post, Comment, Like, Relationship, Story)
	- seed.js — sample data seeder using Prisma
	- package.json — server scripts (start) and dependencies

## Environment Variables

Create a `.env` file inside the `server/` folder with at minimum:

- `DATABASE_URL` — PostgreSQL connection string (required by Prisma)
- `JWT_SECRET` — secret used to sign JWT tokens
- `PORT` — (optional) server port, defaults to `8000`

Example `.env` (do not commit):

DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"
JWT_SECRET="your_jwt_secret_here"
PORT=8000

Note: The client currently uses a production API base URL in `client/src/axios.js`. For local development update `baseURL` to `http://localhost:8000/api/` or implement an environment-driven base URL.

## Local Development

Prerequisites:

- Node.js (v16+ recommended)
- npm or yarn
- PostgreSQL (or another DB supported by Prisma) and a `DATABASE_URL`

1. Install dependencies

```bash
# from repo root
cd server && npm install
cd ../client && npm install
```

2. Set up the database (Prisma)

```bash
# from server/
npx prisma generate
# Create and apply migrations (or use prisma db push during development)
npx prisma migrate dev --name init
# Optional: seed the DB
node seed.js
```

3. Run the backend and frontend

```bash
# Start server (from server/)
npm start

# Start client (from client/)
npm run dev
```

Open the client URL printed by Vite (typically `http://localhost:5173`) and ensure the backend is reachable at the configured API base URL.

## API Endpoints (overview)

The server exposes standard REST routes under `/api`:

- `POST /api/auth/signup` — create account (also used by sample upload at `/api/upload`)
- `POST /api/auth/login` — authenticate and receive token
- `GET/PUT/DELETE /api/users` — user-related operations
- `GET/POST/PUT/DELETE /api/posts` — posts and feed
- `POST /api/like` — like/unlike posts
- `GET/POST /api/comments` — comment operations
- `GET/POST /api/relationships` — follow/unfollow actions

See `server/routes` and `server/controllers` for detailed handlers and expected request/response shapes.

## Database

Prisma schema is at `server/prisma/schema.prisma`. Models include `User`, `Post`, `Comment`, `Like`, `Relationship`, and `Story`. Use `npx prisma studio` for a visual DB browser while developing.

## Notes & Tips

- Uploaded images are saved to `client/public/assets` during development via the `/api/upload` endpoint.
- The server sets an HTTP-only cookie named `token` on authentication; client code also stores a token in `localStorage` for API requests.
- Update `client/src/axios.js` base URL for local testing.

## Contributing

Feel free to open issues or PRs. For local changes, follow the setup steps above, create a feature branch, and include tests where applicable.

## License

This project does not include a license file. Add one if you plan to share the code publicly.

## Contact

Project created as part of a bootcamp—reach out to the maintainer for questions or demo requests.
