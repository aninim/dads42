# CLAUDE.md — Dads'42

> Project-specific instructions for Codi.
> Global rules in `~/.claude/CLAUDE.md` still apply.

## Project

**Name:** Dads'42  
**Owner:** Oren Elimelech  
**Platform:** dads42.com (Firebase Hosting) + Skool (skool.com/dads42-3659)  
**GitHub:** github.com/aninim — source repo (deploys via Firebase CLI)

See PLANNING.md for product strategy, brand voice, content system, and backlog.

---

## Sub-Projects Under dads42.com

| Subdomain | Project | Hosting |
|-----------|---------|---------|
| labs.dads42.com | Main hub (future) | Firebase Hosting |
| digest.dads42.com | AI Digest | Cloud Run |
| dashboard.dads42.com | Life Dashboard | Cloud Run |
| homeassistant.dads42.com | Home Assistant | HA Green (local) |
| modelhub.dads42.com | ModelHub | Firebase Hosting (planned) |

> One-off pages unrelated to the dads42 brand (e.g., personal/family/utility pages riding on the domain) live in the sibling project [`dads42-extras/`](../dads42-extras/) — subdomain per page (e.g., `trip.dads42.com`). Don't add them here.

---

## Asset Inventory

**`docs/`** — Strategy & reference
| File | Status | Notes |
|------|--------|-------|
| `The Dads42 launch playbook - zero to 100 members in 2026.md` | ✅ Complete | 12-week execution sequence: Skool seeding → infiltration → warm launch → TikTok/IG/ManyChat → email → paid |
| `dads42-brand-voice-bible-v2.md` | ✅ Complete | v2: gain-focused philosophy, 3 core moments, illustration direction (Peanuts warmth), expanded copy bank |
| `moment-01-the-pause.md` | ✅ Complete | Core moment 1: dad stops for child, kid gains worth + confidence |
| `moment-02-the-witness.md` | ✅ Complete | Core moment 2: dad witnesses kid, kid gains autonomy + being known |
| `moment-03-the-repair.md` | ✅ Complete | Core moment 3: dad repairs after mess-up, kid gains resilience + accountability |
| `dads42-brand-bible.md` | ✅ Complete | v1 — superseded by v2, keep for archive |
| `dads42-content-machine.md` | ✅ Complete | Weekly engine, 20 hooks, repurpose map, pain bank, freeze breakers |
| `dads42-master-asset-map.md` | ✅ Complete | All assets + critical path (now mapped to 12-week playbook) |
| `dads42-pricing-strategy.md` | ✅ Complete | Full product ladder + sales page formula |
| `dads42-context-checklist.md` | ⬜ Unfilled | **BLOCKER** — Oren must fill in before content creation starts (raw material for authenticity) |

**`src/`** — Deployable deliverables
| File | Status | Notes |
|------|--------|-------|
| `dads42-landing.html` | ✅ Ready | Full dark editorial landing page — deploy to dads42.com |
| `dads42-carrd-blocks.txt` | ✅ Ready | Same page as Carrd embed blocks |
| `self-guided-dads.html` | 📦 Archive | Older brand version (cream/warm aesthetic) |

**`tools/`** — Content tools
| File | Status | Notes |
|------|--------|-------|
| `self-guided-dads-scheduler.jsx` | ✅ Ready | Weekly content scheduler React component |
| `sgd-content-engine.jsx` | ✅ Ready | Post ideation tool — topic + angle → content brief |

---

## Infrastructure

**Firebase Project:** dads42  
**Hosting:** Firebase Hosting (dads42.web.app → dads42.com via custom domain). Single-site — only the dads42 brand lives here. One-off pages riding on the domain go in [`dads42-extras/`](../dads42-extras/) as separate sites with subdomains.  
**Cloud Functions:** captureEmail (Node.js 20, us-central1)

**Required APIs (GCP Console):**

- ✅ Cloud Functions API
- ✅ Cloud Build API
- ✅ Artifact Registry API
- ✅ Cloud Logging API
- ⚠️ Cloud Firestore API (must be enabled for email capture to work)

**Environment Variables:**

- `RESEND_API_KEY` — Email service API key (set via `firebase functions:config:set` or .env.local for local testing)

**Local Testing:**

```bash
cd functions
echo 'RESEND_API_KEY=re_...' > .env.local
firebase emulators:start --only functions
```

---

## Rules

- Commit style: `feat:`, `fix:`, `docs:` prefix. Small commits, one thing at a time.
- Don't build content without Oren's direction on which gap to tackle next (see PLANNING.md backlog).
- `dads42-landing.html` is the main deploy deliverable — deploy before building anything else.
- Brand voice rules live in PLANNING.md — check before writing any copy.

---

*Last updated: 2026-04-26*
