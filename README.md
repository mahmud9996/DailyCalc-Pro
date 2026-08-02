# DailyCalc Pro

An all-in-one smart calculator SaaS platform — 10 free tools for finance, health, and lifestyle — built with Next.js 14 (App Router), Tailwind CSS, and Chart.js. Optimized for SEO, AdSense monetization, and mobile-first UX, targeting the US, UK, and Bangladesh.

## 🧩 Calculators included

| Tool | Route |
|---|---|
| Age Calculator | `/calculators/age-calculator` |
| Prayer Time Calculator | `/calculators/prayer-time-calculator` |
| VAT / GST Calculator | `/calculators/vat-gst-calculator` |
| Mortgage Calculator | `/calculators/mortgage-calculator` |
| Salary to Hourly Converter | `/calculators/salary-to-hourly-calculator` |
| BMI Calculator | `/calculators/bmi-calculator` |
| Tip Calculator | `/calculators/tip-calculator` |
| Retirement Date Calculator | `/calculators/retirement-date-calculator` |
| Baby Due Date Calculator | `/calculators/baby-due-date-calculator` |
| Password Strength Checker | `/calculators/password-strength-checker` |

## 🏗️ Folder structure

```
daily-calc-pro/
├── app/
│   ├── layout.js              # Root layout: fonts, theme provider, AdSense script, header/footer
│   ├── page.js                 # Homepage
│   ├── globals.css             # Tailwind + design tokens + LCD-display component styles
│   ├── sitemap.js              # Dynamic sitemap.xml
│   ├── robots.js               # Dynamic robots.txt
│   ├── about/page.js
│   ├── privacy-policy/page.js
│   ├── contact/page.js
│   └── calculators/
│       └── [tool-slug]/page.js # One route per calculator (metadata + SEO content + FAQ)
├── components/
│   ├── CalculatorLayout.js     # Shared page shell — enforces the ad + content structure
│   ├── AdSlot.js                # AdSense placeholder/live unit, one per position
│   ├── StickyMobileAd.js        # Mobile-only sticky anchor ad
│   ├── FAQSection.js            # Accordion + FAQ ad slot
│   ├── SchemaMarkup.js          # WebApplication / FAQPage / Breadcrumb JSON-LD
│   ├── Header.js / Footer.js / SearchBar.js / ThemeToggle.js
│   ├── ShareButton.js / HistoryPanel.js / ContactForm.js
│   └── calculators/            # One interactive client component per tool
├── lib/
│   ├── calculators/            # Pure calculation logic, framework-agnostic (unit-testable)
│   ├── toolsList.js            # Single source of truth: nav, homepage, search, internal links
│   ├── theme-context.js        # Dark/light mode provider (localStorage-backed)
│   └── utils.js                # Formatting + localStorage helpers
├── hooks/
│   └── useLocalStorage.js      # Generic persisted state + "save history" hook
└── public/
```

Every calculator follows the same three-layer pattern, so adding an 11th tool is just:
1. `lib/calculators/yourTool.js` — pure calculation function(s).
2. `components/calculators/YourTool.js` — client component (`"use client"`) using the calculation + shared UI primitives (`HistoryPanel`, `ShareButton`, `.lcd-display`).
3. `app/calculators/your-tool-slug/page.js` — server component with `metadata`, `faqs`, explanation content, wrapped in `<CalculatorLayout>`.
4. Add an entry to `lib/toolsList.js` — it automatically appears in search, the homepage, the sitemap, and related-tools links.

## 💰 AdSense integration

`components/AdSlot.js` renders either:
- A live `<ins class="adsbygoogle">` unit, once `NEXT_PUBLIC_ADSENSE_CLIENT` and the relevant `NEXT_PUBLIC_AD_SLOT_*` env var are set, or
- A clearly labeled placeholder box (correct size, no layout shift) during development / before AdSense approval.

**Ad positions implemented per the required layout:**
- Calculator pages: Top → Calculator → **After-result** (highest CTR) → Explanation → Mid-content → FAQ → Related tools → Footer (site-wide) → Sticky mobile anchor.
- Homepage: Top banner → mid-scroll (between category sections) → footer.

To go live:
1. Get approved for [Google AdSense](https://www.google.com/adsense).
2. Create ad units for each position in your AdSense dashboard.
3. Copy `.env.example` to `.env.local` and fill in `NEXT_PUBLIC_ADSENSE_CLIENT` and each `NEXT_PUBLIC_AD_SLOT_*`.
4. Redeploy — `AdSlot` automatically switches from placeholder to live ads.

**Policy notes:** ad-to-content ratio is kept under ~30% by design, every ad is clearly boxed and labeled, and the sticky mobile ad includes a close button (never traps the user or mimics UI controls).

## 📈 SEO implementation

- Per-page `metadata` (title, description, canonical, Open Graph) via the App Router's `generateMetadata`/`metadata` export.
- `WebApplicationSchema`, `FAQSchema`, and `BreadcrumbSchema` JSON-LD on every calculator page.
- 300–800 words of unique, example-driven explanatory content per tool, with real H2/H3 structure.
- 3–5 FAQs per calculator (also marked up as FAQPage schema).
- Internal linking: every calculator links to 3 related tools; the footer and homepage link to all 10.
- Dynamic `sitemap.xml` and `robots.txt` generated from the same tool registry, so new tools are automatically included.
- Semantic, keyword-focused URL slugs (`/calculators/mortgage-calculator`, not `/tool?id=4`).

## 🚀 Deploying to Vercel

1. **Push this project to a GitHub repository.**
   ```bash
   cd daily-calc-pro
   git init
   git add .
   git commit -m "Initial commit — DailyCalc Pro"
   git branch -M main
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Import into Vercel.**
   - Go to [vercel.com/new](https://vercel.com/new) and import the repository.
   - Framework preset: Vercel auto-detects **Next.js** — no config needed.

3. **Set environment variables** in the Vercel project settings (copy from `.env.example`):
   - `NEXT_PUBLIC_SITE_URL` — your production domain, e.g. `https://www.dailycalcpro.com`
   - `NEXT_PUBLIC_ADSENSE_CLIENT`, `NEXT_PUBLIC_AD_SLOT_*` — once AdSense-approved
   - `NEXT_PUBLIC_GSC_VERIFICATION` — optional, for Google Search Console

4. **Deploy.** Vercel builds and deploys automatically; every push to `main` redeploys.

5. **Post-deploy checklist:**
   - Submit `/sitemap.xml` to Google Search Console and Bing Webmaster Tools.
   - Verify Core Web Vitals in PageSpeed Insights (target: 90+ Lighthouse).
   - Apply for AdSense once the site has real content and traffic history — required pages (About, Privacy Policy, Contact) are already included.
   - Update `hello@dailycalcpro.com` in `ContactForm.js` / privacy policy to your real support email.
   - Replace the placeholder domain (`dailycalcpro.com`) throughout with your actual domain if different.

## ⚙️ Local development

```bash
npm install
cp .env.example .env.local   # fill in values as needed
npm run dev                  # http://localhost:3000
npm run build && npm start   # production build test
```

## 🔮 Future scalability

The codebase is intentionally backend-free (all state lives in localStorage/URL params) so it can be extended without a rewrite:

- **Firebase Authentication** — add a `lib/firebase.js` client config and an `AuthProvider` alongside the existing `ThemeProvider` in `app/layout.js`.
- **Cloud database (sync history across devices)** — the `useHistory` hook in `hooks/useLocalStorage.js` is the single seam to swap: point `addEntry`/`history` at Firestore or a REST API instead of `localStorage` once a user is signed in, falling back to local storage for guests.
- **Premium / ad-free tier** — `AdSlot` already centralizes every ad render; gate it behind a `usePlan()` check (`if (plan === "premium") return null;`) once subscriptions exist.
- **User dashboard** — add `app/dashboard/page.js` reading from the same history/plan sources.

## ⚠️ Disclaimer

All calculators provide estimates for informational purposes only and are not a substitute for professional financial, medical, legal, or religious guidance.

## 🔒 A note on the Next.js version

This project pins `next@14.2.35` — the final patched release of the 14.x line, which closes the critical CVEs disclosed against Next.js in late 2025 (middleware auth bypass, SSRF, image-optimization issues). However, **Next.js 14 itself reached end-of-life on October 26, 2025** and will not receive fixes for any vulnerabilities disclosed after that patch. Nothing in this codebase depends on 14-specific APIs (no dynamic route params, no `cookies()`/`headers()` usage), so upgrading to the latest Next.js 15.x is expected to be low-risk — this is worth doing before a real production launch. Run `npx @next/codemod@latest upgrade latest` from the project root to automate most of the migration, then re-run `npm run build` to catch anything that needs manual attention.
