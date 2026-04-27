---
name: publish-ready
description: STUB — Take a draft asset pack, run brand voice + visual filter, format for ship to each platform (X, IG, LinkedIn, Skool), move file from drafts/ to published/ with proper naming. Use when user says "publish", "ship it", "finalize this", "ready to post". Stub-only until production cadence starts.
---

# Skill: publish-ready (STUB)

## Status: PENDING — build in Week 2 once production cadence starts

## What it will do

1. Take a `<slug>-pack.md` from `content/drafts/`
2. Run brand voice filter (6-point check from `docs/dads42-brand-voice-bible-v2.md`)
3. Run visual filter via `validate-style` skill on attached images
4. Generate platform-optimized variants:
   - **X thread:** numbered, 280-char limit per post, hashtags
   - **LinkedIn essay:** prose form, no numbering, broken paragraphs
   - **IG carousel:** 3–10 slides with captions, paste-ready
   - **IG reel caption:** hook + 3 lines + CTA + hashtags
   - **Skool post:** intro + body + question prompt for community
5. Rename files with date prefix: `YYYY-MM-DD-<platform>-<slug>.md`
6. Move from `content/drafts/` → `content/published/`
7. Log entry in asset catalog
8. Output: copy-paste-ready text per platform + file paths to attached media

## Pre-conditions

- `generate-asset` skill produced a complete `<slug>-pack.md`
- All assets pass brand voice + visual filter
- Asset catalog (`tools/asset_catalog.py`) exists OR is initialized

## Build trigger

After 2–3 successful manual publish cycles, automate the pattern. Don't build prematurely.