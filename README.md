# Coach Mohamed Gad — Personal Trainer Website (Vite + React)

## 🚀 Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Add Coach Photo
Place your photo at:
```
public/coach.jpg
```

### 3. Start Dev Server
```bash
npm run dev
```
Opens at: **http://localhost:5173**

### 4. Build for Production
```bash
npm run build
npm run preview   # preview the build locally
```

---

## 📂 Structure
```
coach-website/
├── index.html                  ← Vite entry HTML (root level)
├── vite.config.js
├── package.json
├── public/
│   ├── coach.jpg               ← ADD YOUR PHOTO HERE
│   └── favicon.svg
└── src/
    ├── main.jsx                ← React entry point
    ├── App.jsx
    ├── index.css
    ├── context/
    │   ├── LanguageContext.jsx ← All EN/AR translations here
    │   └── ThemeContext.jsx
    └── components/
        ├── Navbar.jsx
        ├── Hero.jsx
        ├── About.jsx
        ├── Services.jsx
        ├── Experience.jsx
        ├── Certifications.jsx
        ├── Videos.jsx
        ├── Contact.jsx
        └── Footer.jsx
```

## 🎬 Change Videos
Edit `src/components/Videos.jsx` — update the `id` in the `VIDEOS` array with your YouTube video IDs.

## 🌐 Change Text
All content (EN + AR) is in `src/context/LanguageContext.jsx`.
