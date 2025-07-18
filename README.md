# Christ Empire Conference App

A church video and audio conferencing web app that allows church admins to create live meetings, and church members to join them. Built with HTML/CSS/JavaScript frontend and a Node.js backend using the [Daily.co API](https://www.daily.co).

---

## ✨ Features

- Admin login to create video/audio conference rooms
- Members can join ongoing meetings
- Frontend built with vanilla HTML/CSS/JS
- Backend built with Express.js
- Video/Audio powered by Daily.co API

---

## 📁 Project Structure

```
ChristEmpireApp/
├── backend/        → Node.js + Express API with Daily.co integration
├── frontend/       → HTML, CSS, and JS for client-side
├── .gitignore      → Git ignored files
└── README.md       → Project documentation
```

---

## ⚙️ Installation

### Backend Setup

```bash
cd backend
npm install
touch .env
```

Create a `.env` file like:

```
DAILY_API_KEY=your_daily_api_key_here
JWT_SECRET=your_secret_key
```

Then start server:

```bash
node server.js
```

---

### Frontend Setup

Just open `index.html` in browser OR host it using Render/Netlify.

---

## 🚀 Deployment

### Backend on [Render](https://render.com)

1. Create a new **Web Service**
2. Set:
   - Build Command: `npm install`
   - Start Command: `node server.js`
   - Root Directory: `backend`
3. Add Environment Variables:
   - `DAILY_API_KEY`
   - `JWT_SECRET`

### Frontend on Render

1. Create a new **Static Site**
2. Publish directory: `frontend`
3. No build command needed

---

## 🔑 Default Admin Login

```
Email: admin@church.com
Password: admin123
```

---

## 📸 Screenshots

> _(Add screenshots here of login, dashboard, joining a call)_

---

## 📄 License

MIT# Christempireapp
