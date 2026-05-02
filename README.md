# Employee Leave Management System

This repository contains a React front-end and a Node.js/Express server for managing employee leave requests, categories, and admin/employee dashboards.

## Project structure

- `FRONT_END_REPO/` — React app (Vite)
- `server_side/` — Node.js Express backend

## Prerequisites

- Node.js (v16+ recommended)
- npm or yarn

## Setup and run

1. Front-end

```bash
cd FRONT_END_REPO
npm install
npm run dev
```

The front-end uses Vite; open the provided dev URL (usually http://localhost:5173).

2. Server

```bash
cd server_side
npm install
npm run start
```

This starts the server with `nodemon` (script: `start`). By default the server entrypoint is `index.js`.

## Environment & configuration

- Configure your database credentials and any required secrets in the server config or environment variables used by `server_side/index.js` (check `server_side/utils/db.js`).
- Configure mail settings in `server_side/utils/mail.js`.

## Helpful notes

- Front-end scripts (in `FRONT_END_REPO/package.json`): `dev`, `build`, `preview`.
- Server scripts (in `server_side/package.json`): `start` (runs `nodemon index.js`).

## Contributing

Feel free to open issues or submit pull requests with improvements.

---
Generated README for development convenience; adjust environment details as needed.
