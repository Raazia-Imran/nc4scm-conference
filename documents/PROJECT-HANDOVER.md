# GCGC 2027 · Project continuity handover

> Storage update, 25 November 2026: Read [STORAGE-UPDATE.md](STORAGE-UPDATE.md) first. The local Source checkout is being retired after verified repository preservation; current materials live in documents on GitHub. Older working-copy and publication statements below are checkpoint history.

Checkpoint: 24 November 2026 · Asia/Karachi. Project owner/requester: Raazia Imran Reshamwala (USER-PROVIDED NOTE from recovered project context; the current prompt uses a name placeholder).

## 1. Read this first

VERIFIED FROM REPOSITORY: This is the Global Conference on Green Construction Materials and Practices 2027 public website, powered by NC4SCM. Repository: https://github.com/Raazia-Imran/nc4scm-conference. Public site address recorded in source: https://gcgc.nc4scm.com. It is separate from NC4SCM's institutional CMS/site at nc4scm-platform. Do not copy that project's team-directory tasks into this project.

VERIFIED FROM REPOSITORY: Inspected main baseline is `df08a481753c7236a3025c3923eebd23b727b4f8`, dated 14 November 2026, merge PR #37, corrected poster dates. This is the application baseline, not the documentation commit created by this handover.

VERIFIED FROM CURRENT FILE: The initial Linux workspace contained no project source files. A fresh repository checkout was obtained. On the connected Windows computer, `D:\ALL PROJECTS\nc4scm-conference` was clean at `c41718b6188cdcfa181da20e652ce7dc519b90a6`, dated 19 September 2026. Its origin points to the same repository. It is stale; do not use it as the current application source. A separate current checkout is prepared under `D:\PROJECTS DATA\GCGC 2027\Source`.

USER-PROVIDED NOTE: The current task authorizes an attractive README with actual website screenshots and badges, a project-specific developer guide, user manual, AI continuity notes and PDF, collected in one GCGC 2027 folder. It does not request a website redesign, DNS change, CMS publication, real enquiry, fee setup or new registration system.

## 2. Purpose, audience and success criteria

VERIFIED FROM REPOSITORY: The website presents conference research areas, author resources, dates, keynote profiles, GCGC 2025 photographs, delegate guidance and contact information. Intended audiences include prospective authors, researchers, civil/materials engineers, industry professionals, students, sustainability practitioners and policy/standards participants. The retained poster identifies UET Lahore and NC4SCM as joint organizers; this is a statement in supplied artwork, not independent event accreditation.

INFERENCE: Success means approved information is consistent across pages, poster and metadata; authors can access the real template and guidelines; visitors can distinguish confirmed content from previews; desktop/mobile navigation remains usable; developers can reproduce and maintain the site without mixing projects or overwriting good work.

UNRESOLVED: No course rubric, assignment page limit, institutional authorship policy, final project completion approval or handover submission deadline was found. This is website maintenance, not a research-paper screening project. No paper count, dataset count or experiment result applies.

## 3. Source authority and materials

| Material | Verified role and authority |
| --- | --- |
| Repository main, baseline above | VERIFIED FROM REPOSITORY: current inspected application source; includes complete git history |
| README.md | VERIFIED FROM REPOSITORY: existing setup/client guidance, retained and visually enhanced in this task |
| src/App.tsx | VERIFIED FROM REPOSITORY: page bodies, header/footer, contact, poster, portraits, routes and gallery behavior |
| src/data.ts | VERIFIED FROM REPOSITORY: three tracks, nine research areas, eight date milestones, navigation and committee categories |
| src/conference-content.json | VERIFIED FROM REPOSITORY: reviewed fallback snapshot for two keynote profiles, event ID and date fields |
| scripts/sync-keynotes.mjs | VERIFIED FROM REPOSITORY: public published Sanity read at build time; validates profiles and keeps fallback on failure |
| src/page-meta.json; src/event-schema.txt; index.html | VERIFIED FROM REPOSITORY: route metadata and homepage Event JSON-LD; dates need coordinated editing |
| scripts/build-pages.mjs; vercel.json; public/sitemap.xml | VERIFIED FROM REPOSITORY: generated route shells, CSP hash, allowlisted rewrites, sitemap and security headers |
| docs/SECURITY-PRIVACY-SEO-AUDIT.md; docs/live-baseline.json | VERIFIED FROM REPOSITORY: historical 31 October audit and response evidence, not current production certification |
| public/images/gcgc-2027-poster.webp | VERIFIED FROM REPOSITORY: current released poster asset; opens directly in a separate tab |
| Original GCGC_2027_Poster.pptx (4).png | VERIFIED FROM CURRENT FILE: retrieved from conference website attachments, 1080 × 1920; image visibly states 16–17 April 2027 and marks submission dates proposed |
| Earlier poster PNG versions (1), (2), (2)(1), (3) | VERIFIED FROM CURRENT FILE: retained historical image inputs; never automatically restore them over current artwork |
| public/downloads/GCGC_Paper_Template.docm | VERIFIED FROM REPOSITORY: existing author template, retained unchanged; template body not reviewed in this checkpoint |
| public/downloads/Springer_Nature_Proceedings_Guidelines.pdf | VERIFIED FROM REPOSITORY: existing guidance, retained unchanged; publisher-specific submission requirements not freshly validated |
| public/speakers; public/images; public/fonts | VERIFIED FROM REPOSITORY: portraits, archive photos, logos and local fonts/licenses |
| Existing September checkout and nc4scm-conference-source.zip | VERIFIED FROM CURRENT FILE: local historical sources; preserved separately, not merged into current main |

VERIFIED FROM CURRENT FILE: Accessible context includes this conversation and supplied memory/breadcrumb summaries, not complete earlier chats. No claim is made to have read all previous conversations. The old `NC4SCM_Project_Handover_2026-10-26.md` was read only to disambiguate projects. Its institutional CMS profile details are excluded here.

VERIFIED FROM CURRENT FILE: Windows automatic CRLF conversion changed the generated JSON-LD CSP hash; Linux generated files reproduced main unchanged. Keep LF bytes for reproducible builds and do not commit the Windows-only derived hash as a documentation change. See developer guide.

VERIFIED FROM CURRENT FILE, follow-up 25 November 2026: The connected PC Assets folder contains GCGC_2027_Editable_Canva_Poster.pptx (222,626 bytes; SHA-256 eef4534510a98c8d0ee13dbf9fa9cf8a85a1de1baeda7e2c375b38af46b24a96). Its slide XML was inspected and still says 10–11 April 2027 in two places. Preserve it as an editable historical design, not current approved artwork. Additional local poster PNG exports and GCGC_2027_Poster.pptx.pdf were copied from Downloads; those additional exports were inventoried, not independently approved. The `.pptx (4).png` filename denotes a PNG image, not a PPTX. Full-resolution original photo/portrait source files, image rights approvals, private organiser decisions and mailbox/provider account evidence were not established.

## 4. Current application and completed work

VERIFIED FROM REPOSITORY: React 19.2.8, React DOM 19.2.8, TypeScript 7.0.2, Vite 8.3.5, React Router 7.18.2, Framer Motion 13.1.1 and Lucide React 1.33.0 are declared in package.json. Node engine is >=22.12.0; CI selects Node 24. Exact dependencies are in package-lock.json.

VERIFIED FROM REPOSITORY: Eleven main navigation pages plus Privacy, Cookies and Terms give 14 public metadata routes. Build generates route-specific HTML metadata shells; visible page bodies remain client rendered. Unknown paths have a dedicated missing-page view and generated 404 artifact. Deployment behavior must still be observed on the actual host.

VERIFIED FROM REPOSITORY: Header changes on scroll, mobile menu, animated track cards/dialog, countdown, author downloads, 2025 gallery/lightbox, speaker cards, poster and contact form are implemented. This source inspection is not an accessibility certification or proof every interaction works on production.

| History | Evidence and meaning |
| --- | --- |
| 31 Oct, 13c5302134d8f46886df5dfb233328a9cf4d8fc2 | VERIFIED FROM REPOSITORY: security/privacy/indexing improvements merged |
| 13 Nov, 2b4578a3d6d0a57cb471ceed49869701f72e8211 | VERIFIED FROM REPOSITORY: keynote integration and corrected April 16–17 dates |
| 13 Nov, ba70519e567bdddb30292fb6b5b6e11ae3882590 | VERIFIED FROM REPOSITORY: static portraits and simplified speaker page |
| 13 Nov, bc42b2e03700e8a300a8fcf06f30f08c20e3ca33 | VERIFIED FROM REPOSITORY: poster restored to local static asset after attempted CMS approach |
| 14 Nov, 6886b9500fcc54a19724b5e88d409b0ebfebb6c0 | VERIFIED FROM REPOSITORY: approved corrected poster committed; included in main through PR #37 |

VERIFIED FROM REPOSITORY: The contact form still uses FormSubmit to nc4scm@cloud.neduet.edu.pk. It has field limits, required values, whitespace checks, a honeypot and provider CAPTCHA default. No custom backend, user accounts, payment implementation or working paper-submission portal is present. Do not transplant HosH's Web3Forms status into this project.

VERIFIED FROM REPOSITORY: Optional Vercel Speed Insights is gated by saved permission; default is off. The localStorage preference `gcgc-privacy-v1` lasts up to 180 days. There is no Vercel Web Analytics integration in inspected application source. Dashboard activation and actual intake remain unverified.

## 5. Dates, numbers and conflicts

| Item | Value and status |
| --- | --- |
| Conference | 16–17 April 2027, Karachi; VERIFIED FROM REPOSITORY and current poster image; final venue address unresolved |
| Call opens | 15 September 2026; VERIFIED FROM REPOSITORY as proposed timeline |
| Paper submission | 1 January 2027; VERIFIED FROM REPOSITORY as proposed timeline, not newly confirmed organiser deadline |
| First decision | 15 January 2027; proposed source value |
| Revision | 30 January 2027; proposed source value |
| Acceptance | 15 February 2027; proposed source value |
| Camera ready | 25 February 2027; proposed source value |
| Author registration | 1 March 2027; proposed source value |
| Tracks / areas | 3 / 9; VERIFIED FROM REPOSITORY, src/data.ts |
| Keynote snapshot | 2 profiles; VERIFIED FROM REPOSITORY; public professional roles were not independently re-researched in this task |
| Routes | 14 metadata entries; VERIFIED FROM REPOSITORY, src/page-meta.json; 11 main nav entries |
| Programme | Two-day preview; VERIFIED FROM REPOSITORY, not a confirmed schedule |
| Home/About statistic | “Nearly 11%” CO2 claim exists in source; VERIFIED FROM REPOSITORY only as displayed wording; underlying source, year and boundary unresolved |

Conflict resolved: older October institutional-site notes say April 10–11. Newer conference main and retained poster say April 16–17. Use newer conference source here; whether the separate institutional site and published CMS event dates were updated remains UNRESOLVED.

Conflict resolved: October audit says main unchanged and release awaiting merge. Git history proves the code merged on 31 October. Preserve the audit as dated evidence; do not repeat its unmerged status as current. Its unresolved production/account checks remain unresolved unless fresh evidence closes them.

Conflict resolved: the README's older Speakers description mentions visible source links and attendee relevance. Current cards render biography, expertise and LinkedIn only. `sources` and `attendeeValue` remain in the JSON and validation model, not the displayed cards.

## 6. Preserve these decisions

VERIFIED FROM REPOSITORY: Maintain deep green, lime/mint and warm paper palette, local DM Sans and Plus Jakarta Sans fonts, responsive navigation, motion and current approved content. Do not redesign page visuals as part of documentation.

USER-PROVIDED NOTE, supported by current implementation: keynote portraits should have white backgrounds; remove visible “profile sources”, “why expertise matters” and pending keynote-title filler. Do not reintroduce those labels just because the JSON retains source and attendee-value fields.

VERIFIED FROM REPOSITORY: Keep the poster local, original aspect ratio, accessible loading failure state, and link opening the full image in a new tab. A past Sanity-poster approach was superseded because this conference has no separate poster Studio; do not add one unnecessarily.

VERIFIED FROM REPOSITORY: Keep specific route rewrites and 404 behavior. A catch-all homepage rewrite was rejected for soft-404 and first-response metadata problems. Preserve `public/google6cebf148146998e0.html` unchanged. Never remove existing DNS verification records based on a documentation task.

VERIFIED FROM REPOSITORY: Preserve fallback on CMS failures, source-link data for traceability, local font licenses, privacy settings and restrictive headers. Do not weaken CSP to accommodate a development toolbar. Do not repeatedly seed production CMS from an old snapshot.

## 7. People and responsibilities

USER-PROVIDED NOTE: Raazia is the requesting developer/project owner. Recovered notes identify Dr. Tariq Jamil as NC4SCM PI/contact; they do not establish final approval of every conference detail. The current snapshot names Dr. Fernando Martirena and Dr. Sofía Sánchez Berriel as keynote speakers; current personal roles are repository content, not independently reverified appointments.

INFERENCE: Organizers must provide approved venue, fees, EasyChair URL, programme, committees, partners, accommodation and privacy/provider decisions. The developer implements approved content and records release evidence. No named person is assumed to have completed these decisions or approved the final site.

## 8. Gaps, risks and precise boundaries

UNRESOLVED: actual production Vercel team/project mapping, current deployment commit, origin certificate details, www subdomain intention, Search Console ownership/status, indexing, real CAPTCHA/mail delivery, mailbox retention, organizer review of notices and actual Speed Insights intake.

VERIFIED FROM CURRENT FILE: Browser capture on the connected computer could not resolve gcgc.nc4scm.com (ERR_NAME_NOT_RESOLVED). The public text reader returned no readable homepage lines and could not open interior pages. These observations do not prove a global outage or identify its cause. Local source-rendered screenshots are used and explicitly labeled as local previews, not production evidence.

UNRESOLVED: submission URL, registration fees/payment/refund policies, final venue/address, confirmed programme sessions, committee members, confirmed partners and accommodation booking details. Published placeholders are not approved commitments. A Springer guideline download does not establish a proceedings acceptance agreement.

VERIFIED FROM REPOSITORY: Portrait rendering maps Fernando's key to his file and every other key to Sofia's file. Adding a third speaker requires a targeted portrait mapping update; the current mapping is not general CMS-controlled portrait support.

Do not claim: project finished; all security checks passed on production; emails delivered; conference registration active; payments implemented; all source image rights cleared; dates in every related platform reconciled; a PDF or package proves delivery to D: unless the destination was checked.

## 9. Priority work and resume here

1. UNRESOLVED: Reconcile production against inspected main without changing DNS. Record actual hosting project, deployment commit, observable pages, poster image, dates and response metadata. Current DNS error prevents fresh live confirmation from the connected PC.
2. UNRESOLVED: Ask organizers only for exact missing approved content: EasyChair URL, venue/address, finalized deadlines, programme, fees/policies, committees, partners and accommodation. Do not invent replacements.
3. UNRESOLVED: Reconcile conference dates with the separate NC4SCM event/announcement and published CMS, using authorized access and current drafts before editing.
4. UNRESOLVED: Arrange a specifically authorized genuine enquiry test; inspect provider activation and received mailbox message. The handover task does not authorize sending test messages.
5. UNRESOLVED: Complete account-dependent privacy, monitoring, Search Console and certificate checks in the historical audit, recording fresh evidence.

Single best next step: read-only production/source reconciliation. Exact expected output: one table with Area, expected value/source, observed production value, evidence/time, discrepancy, and smallest follow-up. Include application commit if exposed by the authorized hosting account, April 16–17 dates, poster, speakers, route metadata, real missing URL status, author downloads and outstanding provider/account checks. Where inaccessible, state the exact barrier; do not reset DNS or reuse unrelated credentials.

## 10. Mandatory reads before editing

Read current README, this handover, DEVELOPER-GUIDE.md, USER-MANUAL.md, current git status/log/remote and any newly present AGENTS.md. Then read the actual target source and its relevant tests. No AGENTS.md was found in the inspected repository; the conversation supplies project-level scope instructions.

For content: App.tsx, data.ts, current poster, page-meta.json, event-schema.txt and index.html. For keynotes: sync-keynotes.mjs, conference-content.json, speaker assets and the current published NC4SCM event schema/document if accessible. For routing/privacy: build-pages.mjs, vercel.json, privacy.ts, PrivacyControls.tsx, LegalPages.tsx and historical audit. Read original organizer inputs before altering approved wording. Never expose secrets in handover notes.

## 11. Change log

| Date | Change | Status |
| --- | --- | --- |
| 24 Nov 2026 | Identified correct conference repository and stale September local copy | VERIFIED FROM REPOSITORY / VERIFIED FROM CURRENT FILE |
| 24 Nov 2026 | Resolved date, poster-CMS and historical unmerged-audit conflicts | VERIFIED FROM REPOSITORY |
| 24 Nov 2026 | Retrieved current and historical supplied poster PNGs; inspected current artwork | VERIFIED FROM CURRENT FILE |
| 24 Nov 2026 | Prepared visual README, developer guide, user manual, pasteable resume notes and PDF | VERIFIED FROM CURRENT FILE; publication/delivery evidence recorded in DELIVERY-STATUS.md |

Read DELIVERY-STATUS.md for final check results, repository publication state and confirmed folder delivery. This handover is an evidence checkpoint, not a completion sign-off.

| 25 Nov 2026 | Resumed delivery; verified editable historical PPTX still contains superseded April 10–11 dates | VERIFIED FROM CURRENT FILE |
