# GCGC 2027 · Developer guide

> Storage update, 25 November 2026: Read [STORAGE-UPDATE.md](STORAGE-UPDATE.md) first. The local Source checkout is being retired after verified repository preservation; current materials live in documents on GitHub. Older working-copy and publication statements below are checkpoint history.

Checkpoint: 24 November 2026. Implementation details below are VERIFIED FROM REPOSITORY at application baseline df08a481753c7236a3025c3923eebd23b727b4f8 unless explicitly marked otherwise. Begin with PROJECT-HANDOVER.md and DELIVERY-STATUS.md.

## 1. Working copies and setup

Current handover checkout: `D:\PROJECTS DATA\GCGC 2027\Source`. Historical checkout: `D:\ALL PROJECTS\nc4scm-conference`, September 19 commit c41718b. Keep the historical checkout intact; use the new Source directory or a fresh clone for future work. Do not copy node_modules from the old checkout into current source.

```bash
git clone --config core.autocrlf=false https://github.com/Raazia-Imran/nc4scm-conference.git
cd nc4scm-conference
git status --short
git log -1 --oneline
npm ci --ignore-scripts
npm run dev
```

Use Node >=22.12.0; existing CI uses Node 24. Follow the local URL printed by Vite. No environment file, database or private Sanity token is required for the inspected frontend. A functioning Node/npm installation and package access are required. Never put credentials into source or this documentation.

## 2. Architecture and authority

| Layer | Actual mechanism |
| --- | --- |
| Interface | React/TypeScript; React Router; custom CSS; Framer Motion; Lucide icons |
| Static assets | public/images, public/speakers, public/fonts, public/downloads |
| Shared content | src/data.ts; page content mainly src/App.tsx |
| Keynotes | Public published NC4SCM Sanity query during build; JSON fallback |
| Metadata | src/page-meta.json; PageMetadata.tsx; index.html; event-schema.txt |
| Build | Sync keynotes, TypeScript build, Vite bundle, build-pages route generation |
| Deployment | Existing Vercel integration described by repository; actual project mapping unresolved |
| Contact | Browser POST to FormSubmit, not a custom API |
| Privacy | Local saved preference gates optional Speed Insights |

Build-time data flow: the keynote importer fetches public fields from the NC4SCM event; valid results replace keynoteProfiles in the fallback file; bundling includes that snapshot. A new Sanity publication does not dynamically update an already-deployed static bundle. A new build/deployment is needed. Static poster and portrait assets remain in this repository.

## 3. File map for targeted edits

| Change | Inspect and edit |
| --- | --- |
| Visible page text | src/App.tsx; use named page function |
| Dates/tracks/navigation | src/data.ts plus duplicated App text and metadata |
| Calendar/event structured data | src/event-schema.txt, index.html and build-pages.mjs |
| Page title/description/canonical | src/page-meta.json and PageMetadata.tsx; generation script |
| CSS, responsive header, poster framing | src/styles.css |
| Poster | public/images/gcgc-2027-poster.webp; CallForPapers component |
| Speaker text/data | scripts/sync-keynotes.mjs and src/conference-content.json; published event when authorized |
| Speaker photos | public/speakers and portrait selection in Speakers component |
| Author downloads | public/downloads plus links in SubmissionDownloads/footer |
| Enquiry recipient/fields | Contact component; privacy notice; CSP form-action if provider changes |
| Privacy controls | src/privacy.ts, PrivacyControls.tsx, LegalPages.tsx |
| Routes and host headers | src/page-meta.json, App routes, nav, build-pages.mjs, vercel.json |

## 4. Editing recipes

### Replace the poster

Obtain the exact approved artwork first. Current reference PNG is 1080 × 1920; current site file is WebP. Preserve original artwork separately. Export an appropriately compressed WebP with the same aspect ratio to public/images/gcgc-2027-poster.webp. Inspect the image text, not just its filename. Keep the existing linked image, new-tab behavior, alt text, failure state and correct dates. Do not use a CMS upload for this poster. Review desktop/mobile framing and ensure the full-size link points to the same file.

### Update dates

Search the repository for both old and new date forms. Inspect data.ts, App.tsx header/footer/countdown/page copy, conference-content.json, index.html, event-schema.txt and page-meta.json. Poster and og-banner.png contain image text and require separate review. Regenerate route files, vercel.json and sitemap through the build. Coordinate any approved change with the separately managed NC4SCM event/announcement; do not assume a frontend change also updates CMS.

### Update a keynote

The importer uses project dxinqb51, dataset production, event ID event-gcgc-2027 and API v2024-01-01 with published perspective. These are public identifiers, not credentials. It accepts nonempty profiles only when required strings, HTTPS LinkedIn/sources, expertise and unique keys validate. It times out after 10 seconds and keeps the reviewed JSON on missing/invalid data or outage. A build can pass with fallback; record which happened.

If editing the fallback alone, the next successful published-data import can overwrite it. For an intended lasting content change, reconcile authorized published content and fallback deliberately. Do not seed or replace the institutional dataset. Current conference repo has no standalone Studio; its schema and publishing workflow belong to the separate NC4SCM platform.

Current displayed fields: name, role, affiliation, bio, expertise and LinkedIn. sources and attendeeValue are retained for provenance/validation but hidden from cards. Existing portrait mapping supports the two current keys only. A third speaker requires explicit portrait mapping and meaningful alt text.

### Activate submission/registration later

Get the actual organizer-approved URL and policy text. Replace only the corresponding placeholder; confirm whether it is an external link or embedded service. Current EasyChair steps describe intent, not a working portal. Current registration cards show Fee TBC and Opening soon; they do not collect registrations or money. Any future form/payment feature changes privacy, error handling and security requirements and needs a separately scoped implementation.

### Add a route

Update React Routes, navigation where relevant, and src/page-meta.json. Build regenerates known route documents, sitemap, redirects and vercel.json. Commit generated vercel.json and public/sitemap.xml together with route edits because Vercel reads routing configuration before the build. Do not add a catch-all homepage rewrite. Maintain a real missing-path response at deployment.

## 5. Reproducible checks and their limits

Existing README/CI requires production build and applicable checks before a PR. Use the existing commands rather than inventing a second test framework.

```bash
npm run typecheck
npm run lint
npm run build
git diff -- vercel.json public/sitemap.xml src/conference-content.json
npm run check
npm audit --audit-level=moderate
npx playwright install chromium
npm run test:browser
```

The build reads the public CMS and may modify the keynote snapshot. Review that diff; a documentation task must not accidentally publish unrelated remote content. `npm run serve:check` serves generated documents with configured headers at port 4173. `npm run preview` uses Vite fallback and cannot prove real deployment 404 behavior. Browser tests use the configured harness unless BASE_URL is supplied. No genuine enquiry should be sent by a screenshot/test capture task; existing form tests intercept POSTs.

Record commands, outcomes, exact source commit and limits in DELIVERY-STATUS.md. Historical counts in the October audit belong to that earlier run. A passing build is not a passed browser suite. Local checks cannot establish production CDN, certificates, mail delivery or Google processing.

## 6. Deployment and rollback

UNRESOLVED: Confirm the Vercel account/project actually serving gcgc.nc4scm.com before any production action; the historical audit found a similarly named accessible project without that custom domain. Never move the domain or alter DNS to resolve an identity uncertainty.

The existing process uses focused branches, checks and a PR. This documentation update is kept on a dedicated branch for review; it does not authorize merging application changes or changing production settings. Record the PR and commit in DELIVERY-STATUS.md. The current site can keep running from main until an authorized merge.

For an authorized release, establish the current deployment ID/commit, inspect the exact preview, merge through normal process, and observe the production domain on the deployed commit. Preserve original google6cebf148146998e0.html, verification records, host-specific noindex headers and the security headers. Never weaken CSP casually. Existing rollback guidance uses a revert PR or an authorized hosting rollback to a recorded deployment; no force-push or destructive reset.

## 7. Troubleshooting

| Symptom | Smallest investigation |
| --- | --- |
| Website DNS error on one device | Record failing hostname/network and time; compare other permitted routes/accounts; do not claim global outage or edit DNS without diagnosis |
| Poster missing | Check exact local asset path, case, deployed file and network response; inspect the fallback state |
| Speaker edit absent | Determine whether CMS published, a new build ran and importer accepted it; compare fallback and built bundle |
| Third speaker shows wrong photo | Fix current two-person portrait-selection mapping explicitly |
| Interior route reload fails | Check generated route metadata and committed vercel.json; avoid broad SPA catch-all |
| Enquiry fails | Record provider result; use public email fallback; only a specifically authorized delivery test establishes mailbox receipt |
| Old copy differs | Compare commit and status before copying; never overwrite newer source with September archive |
| Optional monitoring absent | Confirm saved permission, same-origin intake and hosting-project activation; off by default is expected |

## 8. Asset and evidence handling

Current original poster and earlier PNG revisions are retained outside source under Assets. Repository public assets remain inside Source. Original local source archives are backups, not live working copies. Evidence includes capture provenance, source baseline and delivery inventory. Keep source editable; the PDF is a readable companion and must not replace Markdown or source code.

No tests, screenshots, provider activations, approvals or completion should be claimed beyond the checkpoint evidence. Reinspect latest main and target files whenever resuming after this date.

## 9. Windows line endings and CSP reproducibility

VERIFIED FROM CURRENT FILE: A normal Windows checkout with automatic CRLF conversion produced a different inline JSON-LD CSP hash during build, despite no semantic content difference. The Linux build reproduced committed vercel.json exactly. Keep LF source bytes when creating a fresh Windows checkout (the clone command above sets core.autocrlf=false for that checkout). Do not commit an unexplained Windows-only generated hash as part of a documentation change. This is a reproducibility limitation discovered during packaging, not a production defect proven by this checkpoint. A repository-wide normalization change is outside this documentation scope.
