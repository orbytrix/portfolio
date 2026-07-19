# OrbyTrix — React + Vite + TypeScript

Modern portfolio rebuild with React 18, Vite, TypeScript, and Tailwind CSS.

## Quick Start

```bash
cd react
npm install
npm run dev        # development server at localhost:5173
npm run build      # production build → dist/
npm run preview    # preview production build locally
```

## Deploy

### Vercel (recommended)
1. Push the `react/` folder (or the whole repo) to GitHub
2. Import into [vercel.com](https://vercel.com) — set **Root Directory** to `react`
3. Vercel auto-detects Vite. Click **Deploy**. Done.

### GitHub Pages
1. The workflow in `.github/workflows/deploy.yml` runs on every push to `main`
2. Go to repo **Settings → Pages → Source** → select **GitHub Actions**
3. Set the `VITE_BASE_PATH` secret to `/<repo-name>/` in **Settings → Secrets → Actions**
4. Push to `main` — it deploys automatically

### Netlify
1. Connect the repo, set **Base directory** to `react`, **Build command** to `npm run build`, **Publish directory** to `react/dist`
2. Add a `_redirects` file to `react/public/` with content: `/* /index.html 200`

## Structure

```
react/
├── src/
│   ├── components/     # Navbar, Footer, PageHero, ProjectCard, ScrollToTop
│   ├── hooks/          # useGalaxy, useScrollReveal
│   ├── pages/          # Home, About, Services, Projects, Contact
│   ├── data/           # projects.ts (all 11 projects)
│   ├── types/          # TypeScript interfaces
│   └── styles/         # globals.css (Tailwind + custom CSS)
├── vercel.json         # Vercel SPA routing config
└── .github/workflows/  # GitHub Pages CI/CD
```
