---
name: generate-asset
description: STUB — Generate the full 3-format pack (cartoon reel storyboard + carousel + thread copy) from a raw source moment. Use when user says "generate pack", "make asset", "produce content from this", "create the 3 formats". Currently stub-only — full implementation pending LoRA lock.
---

# Skill: generate-asset (STUB)

## Status: PENDING — build after LoRA is trained and validated

## What it will do

Take a raw source (Oren voice memo or 5-sentence brief) → produce:
1. **Cartoon-scene reel** — 5-frame storyboard, prompts written, Replicate Flux+LoRA generation, frames downloaded to `content/drafts/assets/<slug>/`
2. **Illustrated carousel** — 1–2 hero frames + text overlay spec
3. **Long-form written thread** — 10–15 beats in Oren's voice (like the Shower Story template)

## Pre-conditions for build

- LoRA trained + validated (`train-lora` skill complete)
- LoRA weights URL stored in `docs/dads42-visual-style.md`
- `tools/generate_asset.py` working with `--model lora --lora <url>`
- `docs/dads42-brand-voice-bible-v2.md` accessible for voice reference

## Inputs

- Raw source: voice memo transcript or brief paragraph
- Angle: one of [Identity, Dark Humor, Hot Take, Raw, Tactical, Us vs Them]
- Optional: Core Moment alignment (Pause / Witness / Repair)

## Outputs

- `content/drafts/assets/<slug>/frame-{01..05}.png`
- `content/drafts/assets/<slug>/carousel-hero.png`
- `content/drafts/<slug>-thread.md`
- `content/drafts/<slug>-pack.md` (master file: storyboard + caption set + thread + brand voice filter checklist)

## Brand voice filter (non-negotiable check before output)

Every generated asset must pass:
- [ ] Leads with human moment (not framework)
- [ ] Specific (not generic)
- [ ] Skeptical dad recognizes himself in 3 sec
- [ ] Framework emerges underneath
- [ ] Zero LinkedIn cheese
- [ ] Hook in first 3 seconds

## Build trigger

When `train-lora` skill outputs successful LoRA weights URL, immediately scaffold this skill from stub → functional. Track in `docs/dads42-visual-identity-plan.md` Phase 7.
