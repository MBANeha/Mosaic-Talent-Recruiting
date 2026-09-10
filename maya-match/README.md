# Maya Match Dream Dates

A standalone prototype of the Maya Match "Dream Dates" launch product — built as a self-contained
sub-app inside this repository, independent from the Mosaic Talent Recruiting codebase alongside it.

Visual identity: modern Bollywood meets NYC, in jewel tones, with Apple-style restraint —
amethyst / sapphire / ruby / gold on warm cream and ink, `Fraunces` display serif over `Manrope` sans.

## Product model

Pool-building first, paid dating second: the app never lets a member buy a Dream Dates package in a
region that isn't ready to deliver on it. Three surfaces share one client-side "database"
(`src/data/store.tsx`, persisted to `localStorage`) so member actions show up live on Maya's side:

- **Member experience** — request an invitation → free Maya account/dashboard → build a Match Profile
  → Maya's review → Founding Membership ($100) or Sapphire/Amethyst/Diamond (consultation-gated) →
  Maya Picks → Dream Date request → scheduling → private feedback → mutual match & contact exchange →
  referrals.
- **Maya's matchmaker/admin console** (`/admin`) — Maya Today command center, profile review queue
  (AI-flagged, human-decided), Regional Pool Engine (reciprocal-match liquidity by market), and a
  Free Dates alumni migration dashboard.
- **Growth/liquidity system** — the Regional Pool Engine drives what membership tiers are even offered
  to a member in a given region, and surfaces targeted recruiting recommendations per market.

## Run locally

```bash
npm install
npm run dev      # http://localhost:3001
npm run build    # production build
npm run lint      # tsc --noEmit
```

No backend or environment variables required — all data is seeded and stored in the browser.
