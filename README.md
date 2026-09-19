# GCGC 2027 Conference Website

Official website for the **Global Conference on Green Construction Materials and Practices (GCGC 2027)**, powered by the National Center for Sustainable Construction Materials (NC4SCM).

- Live website: [gcgc.nc4scm.com](https://gcgc.nc4scm.com)
- Conference dates: **10–11 April 2027**
- Conference city: **Karachi, Pakistan**
- Official email: **nc4scm@cloud.neduet.edu.pk**

---

## 1. Website Guide for Clients and Visitors

### About the website

The website is the public information centre for GCGC 2027. It introduces the conference, presents its research areas, supports paper preparation, communicates important dates, and provides information for speakers, delegates, partners and prospective authors.

The interface is fully responsive and designed for desktop computers, tablets and mobile phones. It includes animated content, accessible navigation, downloadable author resources, a live conference countdown and photographs from GCGC 2025.

### Website pages

| Page | Purpose |
| --- | --- |
| Home | Conference introduction, countdown, tracks, dates, institutions and 2025 highlights |
| About | Purpose, values and connection between research, industry and climate action |
| Call for Papers | Research tracks, submission workflow, requirements and downloadable author files |
| Programme | Two-day programme layout ready for confirmed sessions and speakers |
| Speakers | Keynote and invited-speaker layouts ready for approved profiles |
| Registration | Registration categories and policies ready for confirmed fees |
| Accommodation | Formal information for delegate accommodation support in Karachi |
| Committees | Conference governance and committee categories |
| Partners | Partnership opportunities and space for confirmed organizations |
| Archive | Interactive GCGC 2025 gallery and conference information |
| Contact | Conference details and an enquiry form connected to the official email |

### Conference research tracks

The programme is organized into three main tracks and nine research areas:

1. **Green Construction Materials**
   - Low-Carbon Cementitious Materials
   - Minerals and Chemical Admixtures
   - Waste-Derived Construction Materials
2. **Sustainable Construction**
   - Performance and Durability of Sustainable Structures
   - Modelling, Simulation and Digital Engineering
   - Sustainable Structural Design and Construction Practices
3. **Case Studies and Best Practices**
   - Industrial Decarbonisation and Best Practices
   - Policy, Standards and Green Construction
   - Sustainable Cities, Climate Action and Case Studies

### Available downloads

- GCGC paper template (`DOCM`)
- Springer Nature proceedings guidelines (`PDF`)

These files are available from the Home page, Call for Papers page and footer.

### Information awaiting confirmation

Some areas intentionally use professional preview content until official details are approved:

- EasyChair submission URL
- Final conference venue and complete address
- Speaker names, roles and photographs
- Detailed programme sessions and timings
- Registration fees and payment policies
- Committee member names and affiliations
- Confirmed partner logos
- Accommodation hotel, eligibility and reservation details

Only approved information should replace these placeholders. Dates, names, fees and links should never be guessed.

### Requesting a website update

When sending content to the developer, clearly identify:

1. The page and section to update.
2. The exact approved text.
3. Any link, document, logo or photograph required.
4. Whether older content should be replaced or retained.
5. The person who approved the change.

For images, provide the highest-quality original files and usage permission. Transparent PNG or SVG files are preferred for logos.

---

## 2. Developer and Maintenance Guide

### Technology

- React and TypeScript
- Vite
- React Router
- Framer Motion
- Lucide React icons
- Vercel Speed Insights
- Custom responsive CSS
- Vercel deployment

The project is a client-side React single-page application with multiple public routes. Vercel rewrites all routes to `index.html`, allowing direct visits and page reloads without 404 errors.

### Project structure

```text
.
├── index.html                 # Global metadata, canonical URL and Event schema
├── public/
│   ├── downloads/             # Author template and proceedings guidelines
│   ├── images/                # Conference images and institutional logos
│   ├── google6cebf148146998e0.html
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── App.tsx                # Layout, components, pages and routes
│   ├── data.ts                # Navigation, dates, tracks and shared data
│   ├── main.tsx               # React application entry point
│   └── styles.css             # Global and responsive styling
├── vercel.json                # Build settings, security headers and SPA rewrite
└── package.json
```

### Local development

Requirements: a current Node.js LTS release and npm.

```bash
npm install
npm run dev
```

Create a production build before every pull request:

```bash
npm run build
npm run preview
```

### Content maintenance

- Update conference dates, navigation and research tracks in `src/data.ts` where applicable.
- Page content and route components currently live in `src/App.tsx`.
- Add images under `public/images/` and reference them as `/images/filename.ext`.
- Add downloads under `public/downloads/` and reference them as `/downloads/filename.ext`.
- Add new public routes to both the `nav` array and `<Routes>` configuration.
- Add indexable routes to `public/sitemap.xml`.
- Test navigation, direct route loading and responsive layouts after every change.

### SEO and crawler configuration

SEO infrastructure is intentionally separated from visible page design:

- `index.html`: title, description, keywords, canonical URL, Open Graph tags and Event JSON-LD
- `public/robots.txt`: crawler access and sitemap location
- `public/sitemap.xml`: canonical public routes
- `public/google6cebf148146998e0.html`: Google Search Console ownership verification

Do not add large keyword blocks to the visible hero or alter approved interface copy solely to satisfy automated audit tools. React SPAs may generate false warnings when a crawler does not execute JavaScript.

### Critical safety rules

1. **Never delete, rename, move or edit** `public/google6cebf148146998e0.html`.
2. Preserve the catch-all React route in `src/App.tsx`.
3. Preserve the SPA rewrite in `vercel.json`:

   ```json
   { "source": "/(.*)", "destination": "/index.html" }
   ```

4. Preserve existing security headers when editing `vercel.json`.
5. Do not publish unconfirmed names, fees, URLs, hotels or venue addresses.
6. Do not reuse one conference photograph in multiple visible sections unless requested.
7. Maintain responsive behaviour across desktop, tablet and mobile breakpoints.
8. Run `npm run build` and inspect `git diff` before committing.

### Forms and external services

The contact form submits through FormSubmit to the official conference email. Test carefully when changing form fields or the recipient. The EasyChair portal remains a placeholder until the conference team supplies the official submission URL.

No application database or custom backend is currently required. Add one only when a confirmed feature cannot be handled safely by the existing static architecture.

### Deployment workflow

The production website is connected to the repository through Vercel.

1. Create a focused feature or fix branch.
2. Make the smallest necessary change.
3. Run the production build and responsive checks.
4. Open a pull request describing content and technical changes.
5. Merge only after validation.
6. Vercel deploys the updated `main` branch automatically.
7. Verify the live homepage and any changed interior routes after deployment.

### Recommended pre-merge checklist

- [ ] Production build passes
- [ ] Desktop, tablet and mobile layouts checked
- [ ] Navigation and active states work
- [ ] Direct interior-page reload works
- [ ] Dates and venue details are consistent
- [ ] Downloads and external links work
- [ ] Images include meaningful alternative text
- [ ] No approved content was unintentionally removed
- [ ] Google verification file is unchanged
- [ ] Vercel rewrite and security headers are intact
- [ ] Sitemap includes any new public route

### Current production status

The website includes the approved Karachi dates, research tracks, author downloads, conference archive, institutional identities, enquiry form, technical SEO files, security headers and accommodation information structure. Placeholder areas should be updated progressively as the organizing team confirms final content.
