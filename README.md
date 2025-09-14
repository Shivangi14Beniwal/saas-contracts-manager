<<<<<<< HEAD

# 🚀 SaaS Contracts manager

A responsive single-page React + Tailwind application that simulates a SaaS contracts management dashboard. Built as part of an assignment to showcase frontend architecture, state management, and UI polish.

---

## ✨ Features

- 🔐 **Login Page** (mock auth; password: `test123`)
- 📄 **Contracts Dashboard** with:
  - Search, filters, pagination (10 per page)
  - Loading, empty, and error states
- 📑 **Contract Detail Page** with:
  - Clauses, AI-generated insights, evidence panel
- 📤 **Upload Modal** with drag & drop (simulated uploads)
- 🧠 **Context API** for Auth and Contracts state
- 📦 **Mock API** served via `public/contracts.json`

---

## 🛠 Tech Stack

- ⚛️ React (Hooks)
- ⚡ Vite
- 🎨 Tailwind CSS
- 🔗 Axios
- 🧭 React Router v6

---

## 🧪 Local Setup

```bash
# Step 1: Install dependencies
npm install

# Step 2: Run dev server
npm run dev
=======
# SaaS Contracts Dashboard - Assignment

This is a React + Tailwind single-page application (SPA) that simulates a SaaS contracts management dashboard as per the assignment requirements.

## Features implemented
- Login page (mock auth; password `test123`)
- Contracts dashboard with search, filters, pagination (10 per page), and loading/empty/error states
- Contract detail page with clauses, AI insights, and evidence panel
- Upload modal with drag & drop (simulated uploads with timeouts)
- Context API used for Auth and Contracts state
- Mock API served via `public/contracts.json`

## Tech stack
- React (hooks)
- Vite
- Tailwind CSS
- Axios
- React Router v6

## How to run locally
1. Install dependencies:
   ```bash
   npm install
   ```
2. Run dev server:
   ```bash
   npm run dev
   ```
3. App opens at http://localhost:5173 (or port shown by Vite)

## Deployment
- This project can be deployed to **Vercel** or **Netlify**.
- For Vercel: connect GitHub repo and set build command `npm run build` and output directory `dist`.

## Decisions & Assumptions
- Used **Vite** (fast dev) and simple Context API for state management.
- Mock API placed at `public/contracts.json` to keep everything frontend-only.
- No real backend or authentication — JWT is mocked and stored in `localStorage`.
- Simple, responsive layout using Tailwind utilities.

## Folder structure
```
/public
  contracts.json
/src
  /components
  /contexts
  /pages
  main.jsx
  App.jsx
  index.css
tailwind.config.cjs
postcss.config.cjs
package.json
vite.config.js
```

## Notes for submit
- Make repository public on GitHub.
- Deploy on Vercel / Netlify and include the demo link.
- README includes setup instructions and assumptions.

Good luck! If you want, I can also:
- Push this to a GitHub repo (I can't push directly from here, but I can give you exact git commands and full commit content).
- Provide a ready-to-paste GitHub Actions or Vercel setup note.
- Add small UI polish (icons, better spacing) or add unit tests.
>>>>>>> 2a555e3 (Initial push: SaaS Contracts Manager)
