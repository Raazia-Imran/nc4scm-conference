# Conference security, privacy and indexing audit

Audit date: 31 October 2026. Target: https://gcgc.nc4scm.com/. Baseline source: `ae186b99277fc849938de6664e577bd574e84187`. Proposed branch: `fix/conference-security-privacy-seo`.

The baseline is a static React, TypeScript and Vite site, not a connected headless CMS. Its enquiry form uses FormSubmit and it mounts Vercel Speed Insights. Conference content, photographs, downloadable resources, dates, mailbox and approved visual design are preserved. No DNS, account, authentication, payment or production settings were changed. Published history is retained.

Repository changes are implemented and tested locally. They must not be described as verified on production until the reviewed release is deployed and checked. A build or header scan is not proof that a website is completely secure.

## Prioritized findings and disposition

“Verified” below is limited to the evidence stated. Account settings, browser behavior and production deployment are distinct checks.

| Priority | Area | Baseline classification | Evidence | Branch change / remaining verification |
| --- | --- | --- | --- | --- |
| High | Hosting identity | Implemented but not verified | Accessible Vercel team `raazias-projects-142c0b42` has `nc4scm-conference`, but its domain list excludes `gcgc.nc4scm.com`; API requests for that custom domain and deployment returned 404 | Confirm the actual production project and repository connection before merging. Do not attach/move domains based on the project name alone. |
| High | Security headers | Missing or incorrect | `vercel.json` mixes old filesystem routes and high-level headers. Live baseline GETs did not include configured frame/MIME/referrer protections | Replaced legacy catch-all routing with known-route rewrites; added CSP, Permissions-Policy, MIME, frame and referrer protections. Tested locally; inspect preview and production headers. |
| High | Missing-page status | Missing or incorrect | `/audit-missing-20261031` returns HTTP 200; original wildcard route renders Home | Generated `404.html`, removed catch-all server rewrite, and added React NotFound. Local HTTP and browser checks pass. Vercel deployment check still required. |
| High | Enquiry delivery | Implemented but not verified | `src/App.tsx` uses FormSubmit; provider GET returned 403 from this environment; no POST or mailbox access | Preserved recipient/provider. Restored default provider CAPTCHA, retained honeypot, added field limits, whitespace validation, privacy explanation and email fallback. Local intercepted POST passes; actual activation, CAPTCHA and delivery remain unverified. A GET failure does not establish a POST delivery failure. |
| High | Dependencies | Missing or incorrect | `npm audit` on baseline lock reports high findings in Vite and source-map-js | Vite 8.2.2 to 8.3.5 within major 8; source-map-js updated to patched version; existing other direct packages pinned. Final local audit reports zero known vulnerabilities. Rescan in CI. These were tooling findings, not evidence of a production compromise. |
| Medium | Per-page SEO | Missing or incorrect | `index.html` gives every server response the homepage canonical/title/description | `src/page-meta.json`, build-generated route documents and `PageMetadata.tsx` provide route-specific canonical/OG/title/description on initial responses and SPA navigation. |
| Medium | Preview and portfolio indexing | Missing or incorrect / account control partly verified | `nc4scm-conference.vercel.app` returned 200; accessible project reports SSO protection for non-custom domains, but live GET behavior does not establish effective protection | Noncanonical hosts receive `X-Robots-Tag: noindex, nofollow`; preview builds also emit noindex HTML. Verify Vercel protection and all custom preview aliases. Existing unrelated portfolio copies require their own owner-side check. |
| Medium | Privacy and notices | Missing or incorrect | No privacy/cookies/terms routes in original App | Added three pages and footer links, matching actual providers and limited conference functionality. No invented registration/refund policies, legal entity, address or compliance guarantee. Organizer review still needed. |
| Medium | Optional monitoring | Implemented but not verified | Original App mounts Speed Insights unconditionally; production dashboard activation not verified | Off by default. Footer/Cookies-page settings save explicit permission for up to 180 days. Only then mounts Speed Insights. Events remove URL query/fragment and recheck permission. Withdrawal reloads to stop existing callbacks. |
| Medium | Third-party font requests | Missing or incorrect | Original CSS imports Google Fonts on visit | Same font families and requested weights hosted locally with original open licenses in `public/fonts/`; no Google font connection on page visit. |
| Medium | Certificate inventory and www | Implemented but not verified | Main HTTPS requests succeeded. `www.gcgc.nc4scm.com` returned 503 through the network path | Cannot establish origin certificate coverage/expiry: this execution environment presents an OpenAI-issued HTTPS proxy certificate. Verify real certificates from a normal browser or hosting dashboard. No certificate-failure claim is made from the www response alone. |
| Low | HTTPS redirect | Implemented and verified for observed response | Read-only HTTP GET returned 308 with Location `https://gcgc.nc4scm.com/` | Preserve; test again after release, including paths and query strings. |
| Low | HSTS | Implemented and verified for observed response | Custom-domain HTTPS responses include `max-age=63072000`, without includeSubDomains/preload | Preserved hosting behavior. No new HSTS directive, includeSubDomains or preload request added. Vercel platform domains have their own provider-controlled policy. |
| Low | robots and sitemap | Implemented and verified for availability | Live files return HTTP 200 with expected text/XML content types and conference-domain URLs | Build synchronizes 14 intended route URLs, adding notices. Legacy `/images/sitemap.xml` redirects to the canonical sitemap. Check Search Console processing separately. |
| Low | Social metadata | Implemented and verified for source and image availability | Original OG/Twitter tags present; live `/og-banner.png` returns 200 | Retained image, fixed per-route OG URLs/text and favicon MIME. Social-network cached previews need a refresh after release. |
| Low | Google verification | Implemented and verified for file availability | Original verification file returns HTTP 200 | File unchanged. Removed incorrect meta value that repeated a verification filename rather than a confirmed meta-token. File-based verification remains intact; do not delete the existing DNS verification record. Account ownership remains unverified. |
| Low | Structured data | Implemented but not verified by Google | Homepage Event JSON-LD uses approved dates and city; full venue remains unconfirmed | Retained on homepage, removed from unrelated page shells, restored on SPA navigation to Home. No invented venue, price, speaker or rating added; rich-result eligibility is not guaranteed. |
| Low | Mixed content and unsafe rendering | Implemented and verified in inspected source/local pages | No insecure HTTP resource URLs, dangerous HTML insertion, eval or custom HTML rendering found in application source. Local sampled pages show no CSP violations or failed requests | CSP upgrades insecure requests and restricts script execution. This is a focused source/browser check, not a penetration test or historical secret scan. |
| N/A | Auth, authorization, sessions, payments, CMS keys | Not applicable | No corresponding backend, accounts, sessions, payment or CMS integration in this repository | No new backend introduced. No private credentials found in inspected app/config source. Existing `.env` exclusions retained; no secrets entered into reports or commits. |

## Files and implementation choices

- `src/App.tsx`: footer links, form safeguards, metadata/settings components and real missing-page route. Existing conference sections are unchanged.
- `src/LegalPages.tsx`: Privacy, Cookies/storage, Website Terms and NotFound views using the established design palette.
- `src/privacy.ts`, `src/PrivacyControls.tsx`: validated preference schema, 180-day expiry, fail-closed storage handling, modal keyboard focus, Escape, focus return, same-browser cross-tab refresh and withdrawal.
- `src/PageMetadata.tsx`, `src/page-meta.json`, `src/event-schema.txt`: canonical metadata and homepage-only Event JSON-LD.
- `scripts/build-pages.mjs`, `vercel.json`: 14 static HTML shells with route-specific metadata, known-route rewrites, permanent `.html` redirects, true missing-route fallback, generated CSP hash and host-specific indexing headers. The page body remains client rendered; this is not an SSR rewrite.
- `public/sitemap.xml`: synchronized route inventory. `public/google6cebf148146998e0.html` is unchanged.
- `public/fonts/`, `src/styles.css`: local copies of the same Google Fonts assets and small scoped styles for new notices/settings. Font licenses are included; original font source URL request is recorded in `public/fonts/README.md`.
- `package.json`, `package-lock.json`: reproducible direct versions, targeted vulnerability updates, lint and focused test tools. No major framework upgrade.
- `.github/workflows/checks.yml`: read-only-permission CI for typecheck, lint, build, generated-file consistency, unit/security checks, dependency audit and Chromium browser tests. Actions are pinned to commit SHAs. No deployment tokens or paid services introduced.
- `scripts/serve-check.mjs`: local static-route/header test harness only. It does not prove Vercel routing behavior.

The previous README instruction to preserve a catch-all homepage rewrite is intentionally superseded by this audit fix. Every valid route still loads directly, while nonexistent URLs can return 404. The replacement and maintenance steps are documented in README.

CSP uses same-origin scripts and an exact SHA-256 hash for static JSON-LD, rather than copying HosH's server-generated nonce. Script inline handlers and eval are not allowed; objects, frames and base changes are blocked. Inline styles remain allowed for the existing animation/style system. No third-party script origin is broadly permitted. Form actions allow only the existing FormSubmit provider. Vercel Speed Insights uses its same-origin intake when enabled. Verify hosting-injected Toolbar/monitoring scripts against CSP on the preview; do not weaken production CSP merely to accommodate a development toolbar.

## Browser storage and provider inventory

| Item | Purpose / provider | Lifetime | Before selection? |
| --- | --- | --- | --- |
| `gcgc-privacy-v1`, localStorage | This site's privacy selection: version, performance boolean and save time | Maximum 180 days; malformed, future-dated and expired records are rejected | No write until a visitor saves a choice |
| Application cookies | None set by the inspected application | N/A | No application cookies observed in local clean-browser test |
| sessionStorage | Not used by this application | N/A | None observed in local test |
| Speed Insights | Optional Vercel performance measurements | Provider controls received-data retention; browser permission expires after 180 days | No script load until saved permission; permission rechecked before sending |
| FormSubmit / CAPTCHA | Enquiry processing and spam prevention, on external service after submission | Provider-controlled; exact cookies/expiry require external flow verification | No embedded provider script or frame on ordinary page visit |
| Vercel hosting request information | Page delivery and infrastructure protection | Provider/account controlled, not set by frontend code | Required for page delivery |
| Fonts/images | Same-origin static resources | Ordinary browser HTTP cache | Loads for page presentation; no Google font request |

No advertising or Vercel Web Analytics integration was found. Provider anti-abuse infrastructure or future hosting changes may affect cookies; recheck production in a fresh browser after deployment. The settings dialog is reachable from the footer and Cookies page; no decorative banner is added. Choosing Essential only prevents optional collection; closing settings preserves the current choice. Withdrawing does not retroactively delete provider-held measurements. If preferences cannot be saved, monitoring stays disabled and the visitor receives an explanation.

This optional performance gate is a conservative product choice, not a claim that all anonymous measurements legally require consent everywhere. The organizers must confirm applicable audiences, processing basis, mailbox/provider retention, data-request handling and any international-processing requirements with appropriate advice. Website terms do not invent binding registration, payment, cancellation or refund rules while those services remain unopened.

## Verification and limits

Read-only network baseline is captured in `live-baseline.json`. Public response headers and URLs are included; no passwords, account tokens or personal enquiries are included. TLS inspection showed an HTTPS proxy certificate, so its expiry must not be reported as the site's origin expiry.

Local checks passed: production build, TypeScript, Oxlint, five Node security/privacy checks, seven Chromium browser tests, and dependency audit (zero known vulnerabilities). Browser tests cover all 14 public routes, missing paths, canonical metadata, verification/static files, initial storage, reject/allow/persistence/withdrawal, expired and blocked storage, URL redaction, keyboard focus/Escape, mobile width, native validation and an intercepted provider POST. The external form submission was intercepted; no message was delivered.

Desktop homepage, enquiry and privacy pages and a 390px mobile settings view were visually inspected. Sampled pages produced no CSP violations or failed resource requests under the local configured-header harness. Local Chromium used the environment's installed headless build because the newest browser download was unavailable. Cross-browser Safari/Firefox and assistive-technology checks are not claimed.

Still requires deployed verification: actual CDN routing and headers, trailing-slash redirects, real origin TLS coverage/expiry, provider CAPTCHA and delivery, actual Speed Insights intake/dashboard, production browser storage, every preview alias, and Google/social crawler processing. A local harness cannot certify these. GitHub/Vercel check results for the exact pushed commit should be recorded in the release status below.

## Manual release and account steps

1. In Vercel, locate the project actually serving `gcgc.nc4scm.com`. Record its team/project, domain mapping, production branch, current deployment ID and commit. Confirm it is connected to `Raazia-Imran/nc4scm-conference`. The accessible similarly named project currently does not list that custom domain. Do not move the domain or alter nameservers to resolve this uncertainty.
2. Review the pull request and its exact commit checks. Open the Vercel preview. Check all existing pages and downloads, new notice pages, HTTP status for a random missing path, headers, image loading, and initial HTML canonical/OG values. Confirm the verification file still returns its exact content without a redirect.
3. In a fresh browser, check site data before any choice, allow monitoring, reload, choose Essential only, reopen settings, and check that no further monitoring requests occur after withdrawal. Repeat at mobile width and with keyboard only. Confirm any randomized Speed Insights path is same origin and not blocked by CSP.
4. Organizers should authorize one enquiry test, verify FormSubmit recipient activation and complete the provider CAPTCHA. Check the official mailbox and provider error handling. If provider service is unavailable, agree a replacement and its configuration; never invent a public access key or silently redirect enquiries to another mailbox.
5. Inspect the origin TLS certificate in a normal browser for `gcgc.nc4scm.com`: correct SAN, issuer/trust chain, dates and renewal status. Repeat from another network if warnings are intermittent. Decide whether `www.gcgc.nc4scm.com` is intended; only add its certificate/redirect after recording existing DNS. `nc4scm.com` and `www.nc4scm.com` belong to the separate platform and are not conference-hostname alternatives.
6. Merge through the normal reviewed PR process only after checks and production-project identity are resolved. Vercel's existing integration should deploy the production branch. Verify the same commit on the custom domain, including redirect paths/query strings, no mixed content/loops, headers, HTML metadata, sitemap and real 404. No DNS or mail-record change is required for these repository fixes.
7. Confirm non-production custom domains have access protection or noindex response headers. Keep Googlebot able to see noindex on publicly accessible duplicates; a robots disallow alone does not reliably remove indexed URLs. Do not point every preview at a production redirect if reviewers need to inspect it.

### Google Search Console

Account access is unavailable in this session; the following are not marked complete.

1. Open Search Console and select the existing `sc-domain:nc4scm.com` property, which can cover the conference subdomain, or an existing URL-prefix property for `https://gcgc.nc4scm.com/`.
2. Settings → Users and permissions: confirm organizer/client ownership and intended developer access. Settings → Ownership verification: record the real method. Retain existing DNS TXT records and the unchanged HTML verification file. Do not use the removed filename-like meta string as a verification token; obtain an actual meta token from Google only if that method is deliberately added.
3. Sitemaps: submit `https://gcgc.nc4scm.com/sitemap.xml`, check fetch/parse results and last read. Avoid creating a duplicate property unnecessarily.
4. URL Inspection: inspect Home, Contact and an interior page, then Test Live URL. Check crawl eligibility, rendered content and user-declared versus Google-selected canonical. Request indexing for approved pages if appropriate; do not request indexing of preview hosts or 404 pages.
5. Review Page indexing, HTTPS, Security issues and Manual actions. Record exact examples and dates. A pending/stale HTTPS report is not proof of an origin certificate failure. No guarantee is made about ranking, indexing or a fixed processing time.

### Client information still needed

- Which Vercel project/team serves the production custom domain and whether the optional Speed Insights feature is enabled there.
- Confirmation of FormSubmit activation and a permitted real delivery test.
- Approved enquiry retention period, provider arrangements and a person responsible for privacy requests. The notice gives the official contact and does not invent a retention duration.
- Whether an additional www conference hostname is actually intended.
- Final registration/payment/submission services and policies when those features launch; approved venue and programme details for richer Event metadata.
- Organizer review of the new notices against their actual operations and intended jurisdictions.

## Rollback

Before release, record the live deployment ID and commit in Vercel. This branch does not change DNS, authentication, payment flows or existing verification records, so there is no DNS rollback.

If a reviewed release causes an issue, revert the merge through a new GitHub revert PR, run checks and merge the revert; do not reset or force-push published history. For an urgent outage, the authorized hosting administrator can roll back to the recorded prior production deployment, then follow up with the Git revert so the next deploy does not reintroduce the issue. Vercel rollback can affect automatic domain assignment; check subsequent deployment/promotion settings. Existing saved `gcgc-privacy-v1` entries are harmless if code is reverted, but the older unconditional monitoring implementation will resume, so consider this privacy tradeoff when choosing rollback scope.

## Checklist

- [x] Source and README reviewed; approved design/content/downloads retained.
- [x] Read-only live baseline and provider/reference review recorded.
- [x] Repository security, metadata, route and privacy fixes implemented.
- [x] Privacy, Cookies/storage and Website Terms pages added.
- [x] Google verification file preserved byte-for-byte.
- [x] Local build, type, lint, unit/security and browser checks passed.
- [x] Local dependency audit reports zero known vulnerabilities.
- [x] Exact implementation commit CI and Vercel build results recorded below.
- [ ] Protected preview application responses checked with authorized access.
- [ ] Actual custom-domain hosting project confirmed.
- [ ] Reviewed changes merged and production deployment verified.
- [ ] Origin certificate expiry/SAN and intended alternate hostname verified.
- [ ] Real enquiry delivery/CAPTCHA test authorized and completed.
- [ ] Production monitoring, privacy controls and CDN headers verified.
- [ ] Search Console ownership, sitemap, inspection and reports checked.
- [ ] Organizer privacy/retention and future registration policies confirmed.

## Official references consulted

- Vercel static configuration: https://vercel.com/docs/project-configuration/vercel-json
- Vercel generated deployment URLs: https://vercel.com/docs/deployments/generated-urls
- Vercel Speed Insights privacy: https://vercel.com/docs/speed-insights/privacy-policy
- Vercel Speed Insights beforeSend: https://vercel.com/docs/speed-insights/package
- Google canonical URLs: https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls
- FormSubmit features/CAPTCHA: https://formsubmit.co/documentation
- FormSubmit privacy: https://formsubmit.co/privacy.pdf

HosH reference: its `src/lib/security-policy.ts`, `src/lib/privacy-preferences.ts` and live response were inspected. Its nonce-based server CSP and Web3Forms configuration were not copied into this static FormSubmit application. The reference's useful principles are restrictive headers, working preference controls and truthful notices adapted to the actual implementation.

## Release status

Implementation pushed in [PR #27](https://github.com/Raazia-Imran/nc4scm-conference/pull/27), commit `c338b86e4a8c727ffed67823e03700734e0a3e05`.

- [GitHub Actions run 41230733783](https://github.com/Raazia-Imran/nc4scm-conference/actions/runs/41230733783) completed successfully for that exact commit. Install, typecheck, lint, production build, generated-file consistency, all security checks, vulnerability audit, browser installation and browser tests passed on the hosted runner.
- Vercel reports a successful deployment status. The accessible preview deployment `dpl_Gg65pa1EHZvp6NKfxWyTwirdrtxw` is READY and its Git metadata matches `c338b86e4a8c727ffed67823e03700734e0a3e05` on this branch.
- Preview: https://nc4scm-conference-git-fix-conf-0d9ef9-raazias-projects-142c0b42.vercel.app . An unauthenticated request reaches Vercel's SSO login. This confirms the tested preview is protected, not that application headers or page behavior were checked on that host. Authorized preview-fetch/share tools reported unavailable access; protection was not disabled. Preview application smoke tests remain pending.
- GitHub also reports a successful Vercel context with a dashboard URL under the `nc-4-scm` scope; that scope's production domain mapping has not been independently verified through available account access.
- Production `main` remains unchanged. No merge, DNS edit, live domain move or production deployment was performed. The documentation-only follow-up records these results; check its exact head before merging.

Remaining release gates: confirm the actual custom-domain project, inspect the protected preview, organizer notice/provider review, then merge through the existing process and verify the custom domain. Search Console and origin TLS inventory still require their respective account/normal-network checks.


### Pre-merge security follow-up

The subsequent full check-run review found SonarCloud's Security Rating E on commit d8bf022. The blocking annotation concerned forwarding a raw request query into a Location header in the **local verification harness**, not the deployed application. The harness now uses only the configured static redirect destination. Related quality findings were addressed: linear template matching, parallel independent page writes, readonly props, focus-control indexing and dedicated browser assertions. CI installation disables lifecycle scripts and invokes its lockfile-pinned local Playwright binary directly. The prior statement that GitHub Actions passed remains accurate, but did not establish a passing SonarCloud quality gate. Merge requires fresh full check-run verification.
