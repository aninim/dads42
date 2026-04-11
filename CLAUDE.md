# CLAUDE.md — Dads'42

> Project-specific instructions for Codi.
> Global rules in `~/.claude/CLAUDE.md` still apply.

## Project

**Name:** Dads'42  
**Owner:** Oren Elimelech  
**Platform:** dads42.com (Squarespace) + Skool (skool.com/dads42-3659)  
**GitHub:** github.com/aninim — labs.dads42.com via GitHub Pages

See PLANNING.md for product strategy, brand voice, content system, and backlog.

---

## Sub-Projects Under dads42.com

| Subdomain | Project | Repo |
|-----------|---------|------|
| labs.dads42.com | GitHub Pages hub | dads42 repo |
| digest.dads42.com | AI Digest | ai-digest repo |
| dashboard.dads42.com | Life Dashboard | life-dashboard repo |
| homeassistant.dads42.com | Home Assistant | HA Green (local) |
| modelhub.dads42.com | ModelHub | modelhub (planned) |

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

## Rules

- Commit style: `feat:`, `fix:`, `docs:` prefix. Small commits, one thing at a time.
- Don't build content without Oren's direction on which gap to tackle next (see PLANNING.md backlog).
- `dads42-landing.html` is the main deploy deliverable — deploy before building anything else.
- Brand voice rules live in PLANNING.md — check before writing any copy.

---

*Last updated: April 2026*
