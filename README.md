# Emir Portfolio

Production portfolio for Emir Şeren, built around the EMIR kinetic identity and a set of distinct project interaction systems.

## Experience

- Kinetic EMIR identity and DevFlow cinematic project sequence
- ScoutLab spatial workspace
- Pulseboard Analytics Data Lens
- Interactive Playground field and Penalty Game experiment
- Quieter About and Contact closing loop

## Stack

- Next.js App Router
- React and TypeScript
- CSS, SVG and Canvas 2D
- GSAP and ScrollTrigger for pinned sequences

## Development

```bash
npm install
npm run dev
npm run lint
npm run build
```

Set `NEXT_PUBLIC_SITE_URL` to the public deployment origin before generating preview or production metadata. The project uses a local development fallback only when that value is absent.

## Accessibility

Content remains available in normal document flow, with keyboard-visible focus states, responsive layouts and `prefers-reduced-motion` fallbacks. Interactive canvas work is an enhancement and has an HTML explanation beside it.

## Deployment

The project is prepared for Next.js/Vercel deployment. The internal `/motion-lab` route remains available for regression work but is marked `noindex` and excluded from the sitemap.
