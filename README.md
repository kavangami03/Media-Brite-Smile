# Media Brite Smile

Website for Media Brite Smile, a family, cosmetic and implant dental practice at 8 N Pennell Rd, Media, PA.

Built with Next.js 16 (App Router, Cache Components), Tailwind CSS v4, GSAP, Lenis and Motion.

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start the dev server on http://localhost:3000 |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript check |
| `npm run format` | Prettier (with Tailwind class sorting) |

## Where things live

- `src/app/`: routes (home, `about-us/[doctor]`, `locations`, `locations/[slug]`, `privacy-policy`, `terms-of-use`, `disclaimer`, 404)
- `src/content/`: all copy and data. `site.ts` (practice details, services, locations, FAQs), `doctors.ts` (doctor profiles), `legal.ts` (legal pages)
- `src/components/`: `layout/` (header, footer, menus, floating buttons), `sections/` (home page sections), `doctor/`, `location/`, `legal/`, `motion/` (animation wrappers), `ui/` (shared pieces)
- `src/lib/`: GSAP setup, motion presets, preloader/intro timing, utilities
- `public/images`, `public/videos`: photos and the office tour video

## Content rules

- Facts only: every claim, bio and review comes from the practice's current website or its published details.
- The Privacy Policy, Terms of Use and Disclaimer are plain-language drafts and must be reviewed by the practice before launch.
