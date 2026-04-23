# CLAUDE.md — Dads'42

> Project-specific instructions for Codi.
> Global rules in `~/.claude/CLAUDE.md` still apply.

---

## Routing Table

**Load only the room you need. Don't pull the full tree.**

| Working on... | Load |
|---|---|
| Copy, posts, scripts, hooks, carousels | [content/CLAUDE.md](content/CLAUDE.md) |
| PDFs, extracted insights, external research | [research/CLAUDE.md](research/CLAUDE.md) |
| Skool posts, email sequences, IG/ManyChat | [community/CLAUDE.md](community/CLAUDE.md) |
| Email captures, lead tracking, conversations | [inbound/CLAUDE.md](inbound/CLAUDE.md) |
| Brand strategy, launch playbook, pricing | `docs/` (read by filename — no CLAUDE.md) |
| Website code, Firebase function | `src/`, `functions/`, `index.html` |
| Content automation scripts | `tools/` |

**Always check first:** [PLANNING.md](PLANNING.md) — current phase, active task, blockers.

---

## Project

**Name:** Dads'42
**Owner:** Oren Elimelech
**Platform:** dads42.com (Firebase Hosting) + Skool (skool.com/dads42-3659)
**GitHub:** github.com/aninim — source repo, deploys via Firebase CLI
**Firebase project:** `dads42`

## Sub-Projects Under dads42.com

| Subdomain | Project | Hosting |
|---|---|---|
| dads42.com (root) | Main landing + community hub | Firebase Hosting |
| digest.dads42.com | AI Digest | Cloud Run |
| dashboard.dads42.com | Life Dashboard | Cloud Run |
| homeassistant.dads42.com | Home Assistant | HA Green (local) |
| modelhub.dads42.com | ModelHub | Firebase Hosting (planned) |

---

## Folder Map

```
dads42/
├── content/       Writing room — drafts, published, inbox
├── research/      Library — books, insights, external
├── community/     Social engine — skool, email, instagram
├── inbound/       Incoming — leads, conversations
├── docs/          Strategy & reference (brand bible, playbook, pricing)
├── src/           Archived landing page variants
├── tools/         Content automation (React schedulers, engines)
├── functions/     Firebase Cloud Functions (email capture)
├── index.html     Live landing page (deployed to dads42.com)
├── firebase.json  Deploy config
└── PLANNING.md    Product + status + backlog
```

**Personal & growing** (Oren's brain — Codi assists on request): `content/`, `research/`, `inbound/`
**Technical & design** (Codi's domain): `src/`, `functions/`, `tools/`, `index.html`
**Hybrid**: `community/` (Oren writes, Codi structures), `docs/` (strategy)

---

## Rules

- Commit style: `feat:`, `fix:`, `docs:`, `chore:` prefix. Small commits, one thing at a time.
- Don't build content without Oren's direction on which gap/angle — see PLANNING.md execution sequence.
- `index.html` at root is the live deployed landing page. Legacy variants archived in `src/`.
- Brand voice rules live in `docs/dads42-brand-voice-bible-v2.md` — check before writing any copy.
- Per-room CLAUDE.md overrides this file when working in that room.

---

*Last updated: 2026-04-23*
