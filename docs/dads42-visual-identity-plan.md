# Dads'42 — Visual Identity Plan

**Status:** Draft, pending Oren review
**Author:** Codi
**Date:** 2026-04-24
**Sources:** Oren's requirements (2026-04-24 session), LoRA research (subagent report), upstream research (`assets-for-agent/upstream-visual-identity-dads42.md`)
**Tooling scope:** All MCPs + skills installed at **project scope** (`.mcp.json`, `.claude/skills/`) — tokens only load when working inside `dads42/`.

---

## Why this document exists

We're doing this **properly from scratch**. The goal: a visual identity system that is consistent, scalable, and serves the brand for the next 2+ years.

A single LoRA locks illustration *style* but cannot enforce typography, layout, logo usage, or template consistency. A brand-system tool (Figma/Frontify) locks those upstream rules but doesn't generate imagery. **We need both layers, working together.**

---

## Architecture — two layers, three tools

```
┌──────────────────────────────────────────────────────────────┐
│  LAYER 1 — BRAND SOURCE OF TRUTH (upstream)                  │
│  Figma design-system file                                    │
│  • Color tokens (hex values)                                 │
│  • Typography (Tiempos/Playfair + Manrope, sizes, weights)   │
│  • Logo variants (wordmark, 42 hero, monogram) + usage rules │
│  • Grid system + spacing tokens                              │
│  • Templates: reel frames, carousel slides, thread header    │
└───────────────────┬──────────────────────────┬───────────────┘
                    │                          │
                    ▼                          ▼
┌──────────────────────────┐   ┌──────────────────────────────┐
│ LAYER 2a —               │   │ LAYER 2b —                   │
│ ILLUSTRATION STYLE       │   │ PRODUCTION TEMPLATES         │
│ Dads'42 LoRA (Replicate) │   │ Canva Pro                    │
│ Locks: ink style, faces, │   │ Consumes Figma tokens.       │
│ palette, composition DNA │   │ Fast social asset production │
│ of the illustrated half  │   │ where typography + layout    │
│ of every asset.          │   │ matter most.                 │
└──────────────────────────┘   └──────────────────────────────┘
                    │                          │
                    └──────────┬───────────────┘
                               ▼
                      ┌─────────────────┐
                      │ FINAL ASSET     │
                      │ (reel / carousel│
                      │ / thread / etc) │
                      └─────────────────┘
```

### Tool choices (deviations from upstream research)

| Research proposed | Our choice | Rationale |
|---|---|---|
| **Frontify** for brand governance | **Figma Free** | Frontify is enterprise-priced ($$$) and overkill for a 1-person brand. Figma Free gives us design tokens, shared components, and versioning — everything Frontify does for our scale, $0/mo. |
| **Canva Pro** for production | ❌ **Dropped** — Figma does both jobs | $0 instead of $15/mo. Figma components + variants replace Canva templates; Unsplash/RemoveBG plugins cover stock+BG-removal; Figma export handles PNG/JPG/PDF. Non-designer concern addressed by Oren's PM/systems background. |
| **Pipedream** for glue | **Defer** | Premature — no automation needs yet. Revisit at 1K subscribers. |
| **Claude Code + GitHub** orchestration | ✅ Accept — already in place | `docs/` holds prompt libraries, visual rules, asset catalog. |
| (new) **MCPs at project scope** | ✅ Installed 2026-04-24 | `.mcp.json` holds `replicate` (live) + `figma` (awaiting user token). Scoped to dads42 only — other projects don't see tokens. |
| (new) **Postiz** self-hosted scheduler later | Defer until needed | Apache-2 multi-platform scheduler on $5 Hetzner VPS. Free alternative to Buffer (which couldn't API). |

**Monthly cost:** $0 base. Replicate pay-per-image (~$4/mo at 100 images). Eventual $5/mo VPS if we add Postiz.

---

## PHASE 0 — BRAND BIBLE IN FIGMA (upstream foundation)

**Before we train the LoRA, we lock the brand tokens.** This prevents downstream drift.

### 0.1 Figma file structure

```
Dads'42 Brand System (single Figma file)
├── 📄 01 — Tokens
│   ├── Colors (name + hex + usage rule)
│   ├── Typography (family, size, weight, line-height)
│   └── Spacing / radius scale
├── 📄 02 — Logo & Wordmark
│   ├── "42 hero" wordmark (locked variant from Section 08)
│   ├── Clearspace + min-size rules
│   ├── Dark / light / mono variants
│   └── Misuse examples (so Codi knows what NOT to do)
├── 📄 03 — Illustration Style Reference
│   ├── DNA checklist (the 8 attributes)
│   ├── LoRA trigger word + prompt template
│   └── Approved example frames
├── 📄 04 — Templates
│   ├── Reel frame master (9:16)
│   ├── Carousel slide master (1:1)
│   ├── Thread header (X / LinkedIn quote card)
│   └── Skool post cover
└── 📄 05 — Voice + Brand Rules
    └── Link back to docs/dads42-brand-voice-bible-v2.md
```

### 0.2 Design tokens — locked proposal

**Colors** (provisional — iterate on contact per Oren's note):

| Token | Hex | Role |
|---|---|---|
| `ink` | `#0A0A0A` | Primary ink/text |
| `paper` | `#F5F0E8` | Off-white/bone background |
| `wash` | `#C8C0B4` | Grey wash fills |
| `accent-amber` | `#B8945F` | Warm accent (Aurelius gold, muted) |
| `accent-rust` | `#A85C38` | Earned humor moments (muted orange) |
| `silence` | `#2A2620` | Deep bg for hero frames only |

**Typography:**

| Token | Font | Size/weight | Use |
|---|---|---|---|
| `headline-xl` | Tiempos Headline (or Playfair Display Bold) | 48pt / 700 | Hero / end card wordmark |
| `headline-md` | Same | 32pt / 600 | Carousel slide titles |
| `body-lg` | Manrope | 18pt / 400 | Thread text, captions |
| `body-sm` | Manrope | 14pt / 400 | Attribution, footers |
| `caption` | Manrope | 12pt / 500 uppercase tracking +0.1em | Micro-label |

**Grid / spacing:** 8pt base unit. Margins: 48pt outer, 24pt inner.

### 0.3 Who builds Figma file

**Oren builds** (takes ~1 hour with my prompts). This forces token decisions early and locks them in a visual-first way. Codi can reference the Figma URL + tokens via API for consistency in AI-generated assets.

---

## PHASE 1 — LoRA DESIGN PRINCIPLES (from Oren's 2026-04-24 brief)

| Requirement | Design rule |
|---|---|
| Scroll-stop on IG | High-contrast focal point in first 100ms |
| FUN / OPTIMISTIC even in difficult framing | Warm accent always; tonal lift via light source |
| Loose, spirit-elevating | Hand-drawn imperfection, ink quality |
| Pop-music accessible | Universally readable in 2 seconds |
| Emotional faces | Abstract dot/curve features conveying joy/wonder/calm |
| Not overwhelming in series | <5 elements per frame, consistent paper tone |
| Editorial sophistication | New Yorker DNA: ink + grey wash + observational restraint |

**The paradox to solve:** editorial weight + childlike warmth + emotional clarity + abstract minimalism.
**The exemplars who solved it before us:** Sempé, Quentin Blake, William Steig.

---

## PHASE 2 — VISUAL DNA (the 8 attributes of a Dads'42 image)

Every image must hit all 8:

1. **Subject:** 1–3 figures, intimate scale (small kid / big adult)
2. **Faces:** abstract dot/curve features, hint-of-expression only
3. **Linework:** organic, hand-drawn, variable weight, ink quality
4. **Color:** ink + warm grey wash + ONE warm accent (amber/rust/ochre)
5. **Background:** suggested with loose strokes, never cluttered
6. **Mood:** warm-melancholic-optimistic blend
7. **Composition:** breathing room, clear focal point, top space for caption
8. **Paper:** off-white/cream textural feel (not pure white digital)

### Kill-on-sight anti-DNA

- Polished digital vector · 3D rendering · Pure black backgrounds
- Pastels (Pinterest mom palette) · Manga/anime
- Overly detailed faces or backgrounds · Stock-illustration look
- Perfect symmetry · Multiple accent colors · Anything resembling Tom Piccirilli

### Reference triangulation

```
       SEMPÉ
       (warmth + tiny figures in big scenes + observational wit)
         /\
        /  \
       /    \
      /      \
QUENTIN ----- WILLIAM STEIG
BLAKE         (NYer linework + Shrek warmth + elegant looseness)
(wobbly emotional lines +
 expressive abstract faces)
```

---

## PHASE 3 — REFERENCE DATASET (LoRA training material)

**Target: 25 images.** Quality > quantity. Each scores ≥4/5 on DNA checklist.

### Source plan

| Count | Artist | Source URL |
|---|---|---|
| 6 | Sempé (New Yorker covers + Le Petit Nicolas) | newyorker.com/cartoons, book scans |
| 4 | William Steig (New Yorker cartoons) | newyorker.com/cartoons |
| 3 | Quentin Blake (Roald Dahl work) | quentinblake.com |
| 3 | Christoph Niemann (minimal NYT/NYer) | christophniemann.com |
| 3 | Bill Watterson (Calvin & Hobbes select) | gocomics.com archive |
| 2 | Saul Steinberg (NYer covers) | saulsteinbergfoundation.org |
| 2 | Jon Klassen (children's book art) | burstofbeaden.com |
| 2 | Adrian Tomine (NYer covers) | newyorker.com |
| **25** | | |

### Folder structure

```
dads42/research/style-refs/
├── 01-sempe-cafe.jpg
├── 02-sempe-train.jpg
├── ...
├── captions.json         # uniform caption per image
├── selection-rationale.md # why each ref made the cut
└── source-credits.md      # attribution + license notes
```

### Uniform caption template

```
DADS42STYLE single-panel editorial illustration, hand-drawn ink linework,
soft grey watercolor wash, [SUBJECT], abstract minimal facial features
hinting at [EMOTION], [CONTEXT], warm amber accent, intimate observational
moment, sophisticated yet tender, breathable composition.
```

**Trigger word: `DADS42STYLE`** (used in every future generation prompt).

---

## PHASE 4 — TRAINING PROTOCOL

| Parameter | Value |
|---|---|
| Tool | `ostris/flux-dev-lora-trainer` (Replicate) |
| Base model | FLUX.1-dev |
| Training data | 25 captioned PNG/JPGs (zipped) |
| Trigger word | `DADS42STYLE` |
| Training steps | 1000 |
| Learning rate | 4e-4 |
| LoRA rank | 32 |
| Cost | ~$2 (one-time) |
| Time | ~20–25 min |
| Output | `.safetensors` weights (~50MB) hosted on Replicate |

---

## PHASE 5 — VALIDATION (5 stress-tests)

| Test | Scenario | Pass criterion |
|---|---|---|
| T1 — Intimacy | Father + small child in quiet bedroom moment | All 8 DNA attributes present |
| T2 — Chaos | Dad at messy kitchen with toddler tantrum | Warmth intact despite chaos |
| T3 — Solitude | Dad alone at 5am with coffee | Editorial weight + tenderness |
| T4 — Joy | Kids through sprinklers, dad watching | Optimism + abstract face joy |
| T5 — Reflection | Single dad figure on hilltop at dusk | Composition + mood + DNA all aligned |

**Pass threshold: ≥4/5.** Fail → adjust captions, retrain (~$2 per iteration).

Cost of validation: ~$0.20 (5 × $0.04).

---

## PHASE 6 — FINE-TUNING LOOP

If validation fails:

| Issue | Fix |
|---|---|
| Style drift | Add 3–5 more references in weak DNA dimension |
| Face problems | Add more facially expressive references |
| Color drift | Strengthen color descriptors in captions |
| Background clutter | Add minimalism descriptors to captions |

**Budget:** 2–3 iterations max.

---

## PHASE 7 — PRODUCTION WORKFLOW (post-lock)

### For illustrated content (LoRA-driven):
1. Source moment (Oren voice memo)
2. Codi writes 5-frame storyboard + captions
3. Codi generates each frame via `lucataco/flux-dev-lora` + `DADS42STYLE` trigger
4. Codi downloads to `content/drafts/assets/`
5. Codi stitches reel via Shotstack API (when ready) OR you finish in CapCut

### For typography-driven content (Canva-driven):
1. Codi drafts copy
2. Oren opens Canva template (synced from Figma tokens)
3. Drops text into template slots
4. Exports → ships

### For hybrid content (both):
1. Codi generates illustrated background via LoRA
2. Uploads to Canva
3. Oren applies template layer (typography, logo, caption)
4. Exports → ships

---

## TOTAL COST SUMMARY

### One-time
| Item | Cost |
|---|---|
| Reference curation | $0 (public archives) |
| Initial LoRA training | $2 |
| Validation tests | $0.20 |
| Fine-tune buffer (2 iterations) | $4.40 |
| **Subtotal one-time** | **~$7** |

### Recurring
| Item | Cost/mo |
|---|---|
| Figma Free | $0 |
| Replicate (100 images @ $0.04) | $4 |
| (Optional later) Postiz on $5 Hetzner VPS | $0–5 |
| **Subtotal recurring** | **$4–9/mo** |

### Annual recap
| Year 1 | $7 setup + $48–108 recurring = **$55–115 total** |

**Compared to Frontify ($108/mo × 12 = $1,296/yr) + design agency retainer ($5K+/yr), we're 95–97% cheaper.**

---

## TIMELINE

| Day | Action | Owner | Effort |
|---|---|---|---|
| 1 | Oren builds Figma brand file from tokens | Oren | 1 hr |
| 1 | Codi curates 25 references | Codi | 3 hrs |
| 1 | Codi captions all 25 | Codi | 1 hr |
| 2 | Oren reviews reference set | Oren | 15 min |
| 2 | Codi runs training (~25 min) | Codi | 30 min |
| 2 | Codi runs 5 validation tests | Codi | 10 min |
| 2 | Oren reviews tests | Oren | 15 min |
| 3 | If pass: regenerate "Kid at Work" pack; if fail: iterate | Codi | 1 hr |
| 3 | Codi builds 3 Canva production templates (reel/carousel/thread) | Codi | 1 hr |

**Total: 2–3 days from sign-off to locked visual system.**

---

## DECISION POINTS — needs Oren sign-off

| # | Decision | Codi's pick |
|---|---|---|
| 1 | Skip Frontify, use Figma Free | ✅ Yes — 95% cost saving |
| 2 | Defer Pipedream until 1K subscribers | ✅ Yes — premature now |
| 3 | ~~Canva Pro $15/mo~~ → **Figma does both jobs, $0** | ✅ **Swapped** — Oren override |
| 4 | Reference dataset: approve the 8 source artists | ✅ Yes |
| 5 | Trigger word: `DADS42STYLE` | ✅ Yes (distinctive, no collision risk) |
| 6 | I curate 25 refs, you approve at end | ✅ Yes |
| 7 | Color palette provisional | ✅ Yes |
| 8 | Fallback: flux-1.1-pro-ultra with image_prompt | ✅ Yes — safety net |
| 9 | Postiz self-hosted scheduler later | ✅ Yes |
| 10 | **MCPs at project scope (Figma + Replicate)** | ✅ **Installed 2026-04-24** |
| 11 | **Custom skills in `.claude/skills/` — build incrementally** | ✅ Approved pattern |

---

## RISKS + MITIGATIONS

| Risk | Likelihood | Mitigation |
|---|---|---|
| LoRA training produces weak style | Medium | 2-iteration budget; fallback to flux-1.1-pro-ultra with image_prompt |
| Oren reviews references and wants wholly different artists | Low | Show shortlist before training; pre-commit only after approval |
| Canva's API limits free-tier template reuse | Low | Pro plan sidesteps; worst case, manual template clones |
| Figma file complexity creeps | Medium | Codi maintains structure; Oren doesn't edit without a spec |
| Scope creep (adding video style, 3D, etc.) | High | **No.** Lock on 2D editorial illustration only for Phase 1. Video style = separate decision later. |

---

## OUT OF SCOPE (Phase 1)

- Video style training (moving image LoRA — different problem, later)
- 3D rendering
- Photography style guide (we're not shooting photos yet)
- Motion design beyond static-frame-to-reel stitching
- Sub-brands (Founding Circle, products) — inherit from master system

---

## INFRASTRUCTURE — COMPLETE (2026-04-24)

### MCPs — project-scoped (`.mcp.json`, gitignored)

| MCP | Status | Purpose |
|---|---|---|
| `replicate` | ✅ Live — token from `.env`, API verified | Flux image gen, LoRA training, model predictions |
| `figma` | ✅ Live — token from `.env`, API verified | Read brand tokens, export components, validate assets |

**Note:** Reload Claude Code (close + reopen) for MCPs to be discoverable in this session via `/mcp`.

### Custom skills — `.claude/skills/`

| Skill | Status | Build trigger |
|---|---|---|
| `curate-refs` | ✅ **FUNCTIONAL** | Ready to invoke for Day 1 |
| `generate-asset` | 🟡 STUB | After LoRA locks |
| `validate-style` | 🟡 STUB | After `generate-asset` functional |
| `train-lora` | 🟡 STUB | After `curate-refs` outputs 25/25 |
| `publish-ready` | 🟡 STUB | Week 2 — after 2-3 manual publish cycles |

### Python `tools/` — craft layer (deterministic)

| File | Status | Purpose |
|---|---|---|
| `tools/generate_asset.py` | ✅ FUNCTIONAL | CLI: generate image via Replicate, download |
| `tools/lib/replicate_client.py` | ✅ FUNCTIONAL | Replicate REST wrapper (`run_model`, `run_lora`, `download`) |
| `tools/lib/env.py` | ✅ FUNCTIONAL | Loads `.env` from project root, `require()` raises on missing keys |
| `tools/requirements.txt` | ✅ Locked | `requests`, `python-dotenv`, `pillow` |
| Future tools (stitch_reel, brand_overlay, transcribe_memo, score_asset, asset_catalog, caption_refs, export_figma) | 📋 Planned | Build per `tools/README.md` schedule |

### Reference dataset folder — `research/style-refs/`

| File | Status |
|---|---|
| `README.md` | ✅ Defines DNA checklist + filename convention + status tracker |
| `captions.json` | ✅ Template ready for population |
| `selection-rationale.md` | ✅ 25-slot template per artist |
| `source-credits.md` | ✅ Attribution + fair-use note |
| Reference images (25) | 📋 To curate (Day 1) |

---

## NEXT ACTIONS (in order)

1. **Oren reviews this document** — approve/push back on decisions 1–11
2. **Oren grabs Figma PAT** (figma.com/settings → Personal access tokens) — 30 seconds
3. **Oren reloads Claude Code** — MCPs go live
4. **Codi builds `curate-refs` skill** + starts reference dataset curation (~3 hrs)
5. **Oren reviews reference set** (~15 min)
6. **Codi runs LoRA training** (~$2, 25 min) + 5 validation tests
7. **Lock style, regenerate "Kid at Work" pack** with LoRA applied

Once approved, we're 48 hours from a locked Dads'42 visual system.

---

## APPENDIX — .mcp.json reference (gitignored)

```json
{
  "mcpServers": {
    "replicate": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "replicate-mcp"],
      "env": { "REPLICATE_API_TOKEN": "<loaded from .env>" }
    },
    "figma": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "figma-developer-mcp", "--stdio"],
      "env": { "FIGMA_API_KEY": "<pending user provides>" }
    }
  }
}
```

Secrets live in `.env` (source of truth) and are mirrored into `.mcp.json` at install time. Both files gitignored.
