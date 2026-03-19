
# Bragboard-jan-26

# BragBoard - Shoutout Management

A full-stack employee recognition platform built with React, FastAPI, and PostgreSQL.

## 🚀 Features
- **Live Shoutouts**: CRUD operations persisted to PostgreSQL.
- **Dynamic Dashboard**: Real-time stats (Total, Reactions, Pinned, Active).
- **Moderation**: Pin, Edit, and Bulk Delete functionalities.
- **Search & Filter**: Search by name/message and filter by Department/Status.

## 🛠️ Setup

### 1. Database (PostgreSQL)
- Create a database named `bragboard_db`.
- Configure your credentials in `server/.env`.

### 2. Backend (FastAPI)
```bash
cd server
python -m venv venv
.\venv\Scripts\activate
pip install -r requirements.txt
uvicorn src.main:app --reload
```
*Note: Tables are auto-created on startup.*

### 3. Frontend (React + Vite)
```bash
cd client
npm install
npm run dev
```

## 📂 Project Structure
- `/client`: React (Vite, Tailwind, Lucide Icons)
- `/server`: FastAPI (SQLAlchemy, PostgreSQL, Pydantic)
=======
# BragBoard - Employee Recognition Platform

A full-stack employee recognition platform built with **React, FastAPI, and PostgreSQL**.

---

# 🚀 Features

### Employee Management
- Create, update, delete employees
- Search employees
- Filter by department
- Pagination support
- Role-based access control

### Shoutout Management
- CRUD operations for shoutouts
- Pin shoutouts
- Edit shoutouts
- Bulk delete shoutouts
- Search by employee name or message
- Filter by department/status

### Authentication
- JWT based login system
- Admin and Employee roles

### Dashboard
- Live statistics
- Top performers leaderboard
- Recognition badges

---

# 🛠 Tech Stack

### Frontend
- React 18
- Vite
- Tailwind CSS
- React Router
- Axios
- Lucide Icons

### Backend
- FastAPI
- SQLAlchemy
- PostgreSQL
- Pydantic
- JWT Authentication

---

# 📂 Project Structure

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
