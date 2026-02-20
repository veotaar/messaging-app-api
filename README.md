# Messaging App API

[Frontend Repo (Vite, React, TS)](https://github.com/veotaar/messaging-app)

[Live Demo](https://messenger.ulus.uk/)

REST API backend for a real-time messaging application. Handles user authentication, friend requests, conversations, and message delivery. The frontend is a separate Vite + React + TypeScript app.

## Tech Stack

- **Runtime:** [Bun](https://github.com/oven-sh/bun). Originally written for **Node.js**, migrated to the Bun runtime with minimal changes. It is still a standard Express.js app.
- **Framework:** Express.js
- **Database:** MongoDB via Mongoose
- **Real-time:** Socket.IO used for live message delivery between connected clients
- **Authentication:** JWT bearer tokens. Protected routes require a valid `Authorization: Bearer <token>` header.
- **Validation:** Zod schemas applied via Express middleware on all incoming request bodies and params
- **Testing:** Bun's built-in test runner with Supertest and `mongodb-memory-server` for in-process integration tests. Originally used **Jest**, replaced with `bun:test` later. Bun's test runner is Jest-compatible.

## Features

- User registration and login
- Friend request system
- One-on-one conversations between users
- Paginated message history
- Real-time messaging via Socket.IO rooms

## Deployment

Containerized with Docker. A multi-stage `Dockerfile` compiles the app into a single self-contained executable using `bun build --compile`. Docker BuildKit secrets are used to inject environment variables at build time without leaking them into image layers.

The [live demo](https://messenger.ulus.uk/) runs on a [Hetzner](https://www.hetzner.com/) VPS.

## Local development

```bash
bun run dev
```

## Local build (single-file executable)

```bash
bun run build
bun run start
```

## Docker

```bash
bun run docker:build
bun run docker:run
```

## Tests

```bash
bun test
bun test --watch
```



