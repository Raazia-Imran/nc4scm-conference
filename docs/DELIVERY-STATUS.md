# GCGC 2027 · Checkpoint results and delivery

Checkpoint date: 24 November 2026, Asia/Karachi. Application baseline: df08a481753c7236a3025c3923eebd23b727b4f8.

## Scope

VERIFIED FROM CURRENT FILE: README enhanced with existing conference banner, technology badges, real local-preview screenshots, navigation and links to four project-specific guides. Original README saved as README-BEFORE-2026-11-24.md. Added PROJECT-HANDOVER.md, DEVELOPER-GUIDE.md, USER-MANUAL.md, RESUME-HERE.md and screenshot provenance. No application, asset, routing, dependency or CMS content change is intended in the repository patch.

## Checks performed

| Check | Result and evidence scope |
| --- | --- |
| npm ci --ignore-scripts | Passed in fresh Linux and Windows checkouts |
| npm run typecheck | Passed in both environments |
| npm run lint | Passed; Windows reports 0 warnings, 0 errors |
| npm run build | Passed in both environments; generated 14 route documents, sitemap, 404 and CSP hash; public keynote read succeeded |
| npm run check | Passed, 5 tests, both environments |
| npm run test:browser | Passed, 11 tests on installed Windows Chrome, existing local harness; no real enquiry delivered |
| npm audit --audit-level=moderate | Passed, zero reported known vulnerabilities at this checkpoint; not a security guarantee |
| Generated-file consistency | Linux baseline vercel.json, sitemap and keynote snapshot unchanged after build |
| Windows generated files | CRLF checkout changed JSON-LD bytes and derived CSP hash; source text otherwise matched. No semantic snapshot/sitemap diff was observed; the Windows-only generated hash is excluded from this documentation patch; see developer note |
| Preview screenshots | Four actual local captures; desktop 1440 × 1000, mobile 390 × 844 |
| Live website | Not verified; connected PC browser reported ERR_NAME_NOT_RESOLVED; text reader had no readable homepage body and failed interior-page opens |
| PDF | Final rendering review recorded in the delivered pack evidence |

VERIFIED FROM CURRENT FILE: The current Node test suite has 5 tests and browser suite has 11. The historical October audit's 7 browser-test count belongs to its earlier state; do not repeat it as current.

UNRESOLVED: genuine provider delivery/activation, current hosting project/deployment commit, real production headers/404/storage, Search Console and origin certificates. No external message, DNS change, merge or production deployment is part of this documentation checkpoint.

## Repository and folder delivery

Documentation branch: docs/gcgc-2027-continuity-20261124. Repository publication, PR URL and checked Windows-folder delivery are recorded below after those actions complete. Application main baseline remains separate from documentation branch state.

### Publication and delivery follow-up · 25 November 2026

USER-PROVIDED NOTE: Explicit approval was received to publish the README, preview screenshots and guides on a new public branch and open a review PR. Merge and production deployment are outside scope. An earlier automatic publication block is superseded by that approval.

VERIFIED FROM REPOSITORY: The documentation branch was created at application baseline df08a48. The first shell push failed because the local checkout had no GitHub write credential. The authenticated GitHub connector is used for the authorized publication. The final remote commit and PR URL are recorded in the accompanying delivery receipt; no merge is claimed.

VERIFIED FROM CURRENT FILE: D:\PROJECTS DATA\GCGC 2027 contains Source, Documents, Assets and Evidence. Original local source archives were retained. Assets includes an editable Canva PPTX, a poster PDF and PNG exports copied from Downloads. The editable PPTX was inspected on 25 November and still says April 10–11; it is historical, not the current approved poster. See handover for exact size/hash.

VERIFIED FROM CURRENT FILE: The PDF and local source screenshots were rendered/visually reviewed during preparation. Final destination filenames, sizes and hashes are recorded in Evidence/DELIVERY-RECEIPT.json once copied. These local reviews do not verify production.
