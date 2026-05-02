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

- This project uses MySQL / MariaDB for its database. Configure your database credentials and any required secrets in the server environment variables or the config used by `server_side/utils/db.js`.

	Example environment variables (create a `.env` in `server_side/` or set in your host):

	```env
	DB_HOST=localhost
	DB_PORT=3306
	DB_USER=your_db_user
	DB_PASSWORD=your_db_password
	DB_NAME=employee_leave_db
	JWT_SECRET=your_jwt_secret
	EMAIL_USER=your_email@example.com
	EMAIL_PASS=your_email_password
	```

	- Default MySQL/MariaDB port is `3306`.
	- Ensure the database (`DB_NAME`) exists and the configured user has appropriate privileges.

- Configure mail settings in `server_side/utils/mail.js`.

## Helpful notes

- Front-end scripts (in `FRONT_END_REPO/package.json`): `dev`, `build`, `preview`.
- Server scripts (in `server_side/package.json`): `start` (runs `nodemon index.js`).

## Contributing

Feel free to open issues or submit pull requests with improvements.

---
Generated README for development convenience; adjust environment details as needed.
