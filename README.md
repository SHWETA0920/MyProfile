# 🚀 Shweta Gupta — Portfolio Website

A modern, animated, recruiter-ready portfolio built with **React + Tailwind CSS** (frontend) and **Node.js + Express** (backend).

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Tailwind CSS 3, Framer Motion |
| Animations | Framer Motion, react-type-animation, CSS keyframes |
| Backend | Node.js, Express.js |
| Email | Nodemailer (Gmail SMTP) |
| Security | Helmet, CORS, express-rate-limit |
| Icons | react-icons |
| Routing | react-scroll (smooth sections) |

---

## 📁 Project Structure

```
portfolio/          ← React frontend
  src/
    components/
      Navbar.jsx
      Hero.jsx        ← Particle canvas, typewriter, floating avatar
      About.jsx       ← Bio, education, contact info
      Experience.jsx  ← Timeline with animated entries
      Projects.jsx    ← Filterable project cards
      Skills.jsx      ← Animated skill bars + tabs
      Achievements.jsx
      Contact.jsx     ← Form → backend API
      Footer.jsx
    data/
      portfolio.js    ← ✏️ EDIT YOUR DATA HERE
    index.css         ← Tailwind + custom animations

portfolio-backend/  ← Node.js/Express backend
  server.js          ← Contact API + email sending
  .env.example       ← Environment variables template
```

---

## ⚡ Quick Start (Local Development)

### 1. Frontend

```bash
cd portfolio
npm install
cp .env.example .env
# Set REACT_APP_BACKEND_URL=http://localhost:5000
npm start
# Opens at http://localhost:3000
```

### 2. Backend

```bash
cd portfolio-backend
npm install
cp .env.example .env
# Fill in your Gmail credentials (see below)
npm run dev   # or: node server.js
# Runs at http://localhost:5000
```

### 3. Gmail App Password (for contact form emails)
1. Go to [myaccount.google.com](https://myaccount.google.com) → Security → 2-Step Verification (enable it)
2. Then go to **App passwords** → create one for "Mail"
3. Paste the 16-char password into `.env` as `EMAIL_PASS`

---

## 🌐 Deployment

### Option A: Vercel (Frontend) + Render (Backend) — **Recommended**

**Backend → [Render.com](https://render.com) (free)**
1. Push `portfolio-backend/` to a GitHub repo
2. New Web Service → connect repo → Build: `npm install`, Start: `node server.js`
3. Add environment variables in Render dashboard
4. Copy the Render URL (e.g. `https://shweta-portfolio-api.onrender.com`)

**Frontend → [Vercel.com](https://vercel.com) (free)**
1. Push `portfolio/` to a GitHub repo
2. Import into Vercel → Framework: Create React App
3. Add environment variable: `REACT_APP_BACKEND_URL=https://your-render-url.onrender.com`
4. Deploy → get your `*.vercel.app` URL

---

### Option B: Railway (Full-Stack)
1. Push both folders to GitHub
2. Railway → New Project → Deploy from GitHub
3. Add services for frontend and backend
4. Set environment variables in Railway dashboard

---

### Option C: VPS / DigitalOcean

```bash
# On your server (Ubuntu)
# Backend
cd portfolio-backend && npm install
npm install -g pm2
pm2 start server.js --name portfolio-api
pm2 save

# Frontend - build for production
cd portfolio && npm run build
# Serve with Nginx pointing to the build/ folder

# Nginx config example:
# server {
#   listen 80;
#   server_name shweta.dev;
#   root /var/www/portfolio/build;
#   index index.html;
#   location /api { proxy_pass http://localhost:5000; }
#   location / { try_files $uri /index.html; }
# }
```

---

## ✏️ Customization

All your data lives in **`src/data/portfolio.js`** — just edit:
- `personalInfo` — name, bio, links
- `projects` — add/remove projects
- `skills` — skill levels
- `experience` — work history
- `achievements` — awards, publications

To add your **real photo**: replace the emoji avatar in `Hero.jsx` with:
```jsx
<img src="/your-photo.jpg" alt="Shweta" className="w-full h-full object-cover" />
```
(Put the image in `public/` folder)

---

## 🎨 Features

- ✅ Animated particle canvas background
- ✅ Typewriter role animation
- ✅ Scroll-triggered section animations (Framer Motion)
- ✅ Filterable project cards
- ✅ Tabbed skill bars with animated progress
- ✅ Contact form → Express API → Gmail email + auto-reply
- ✅ Rate limiting & security headers (production-ready)
- ✅ Responsive (mobile + desktop)
- ✅ Smooth scroll navigation
- ✅ Loading screen + scroll-to-top button
- ✅ Dark theme with glassmorphism cards

---

## 📬 Contact Form Flow

```
User fills form → POST /api/contact
  → Validation (name, email, message)
  → Rate limiting (5 req / 15 min / IP)
  → Email to Shweta (HTML template)
  → Auto-reply to sender
  → Response to frontend
```

---

Built with ❤️ for Shweta Gupta's portfolio
