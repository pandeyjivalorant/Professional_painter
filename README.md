# Vasu Art Work — Next.js Version

This is the Next.js (App Router) conversion of the original Vite + React + Tailwind CSS project. All pages, components, styling, and content are unchanged — only the routing/build layer was migrated.

## Getting Started

```bash
npm install
npm run dev
```

Open http://localhost:3000

## What changed (structural only, no content/logic rewrites)

- `react-router-dom` → Next.js App Router (`next/link`, `next/navigation`)
  - `<Link to="...">` → `<Link href="...">`
  - `useNavigate()` → `useRouter()` + `router.push()`
  - `useParams()` / `useSearchParams()` → `next/navigation` equivalents
  - `/painting/:id` → `app/painting/[id]/page.js`
- Vite's `import.meta.glob(...)` (used to auto-discover images) isn't available in Next.js/webpack, so:
  - `src/data/paintings.js` → `data/paintings.js`: image paths are now plain strings (e.g. `'/painting/paint01.jpg'`) instead of glob-resolved modules.
  - `CertificationsPage`'s certificate gallery now uses a static filename list instead of a glob, pointing at the same files in `public/certificate/`.
- Pages moved from `src/pages/*.jsx` into `app/**/page.js` (file-based routing).
- Client-only components (state, hooks, framer-motion, browser APIs) keep a `'use client'` directive at the top, since Next.js defaults to Server Components.
- `index.html` head tags (fonts, meta description/keywords, title) moved into `app/layout.js` using the Next.js Metadata API + manual `<head>` links for Google Fonts.
- Static assets (`/painting`, `/certificate`, `vasu_DP.jpg`, `favicon.svg`, `icons.svg`) moved into `public/`, served the same way Vite served files from the project root/`public`.
- `tailwind.config.js` / `postcss.config.js` content globs updated to scan `app/`, `components/`, `context/`, `data/` instead of `index.html` / `src/**`.

## Notes

- Dependencies were **not** installed in this build environment (no network access), so run `npm install` locally before `npm run dev` / `npm run build`.
- All original styling (`src/index.css`) is preserved as-is in `app/globals.css`.
