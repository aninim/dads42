---
name: curate-refs
description: Walk Oren through curating, captioning, and approving the 25 LoRA training reference images for the Dads'42 visual identity. Use when the user says "curate refs", "pick references", "build the dataset", "start LoRA training data", or anything similar related to the visual identity reference dataset.
---

# Skill: curate-refs

## Purpose
Drive the end-to-end curation of the 25-image LoRA training reference set. From source identification → image acquisition → DNA scoring → caption writing → Oren approval.

## Pre-conditions

- `docs/dads42-visual-identity-plan.md` exists (defines DNA, sources, captions)
- `research/style-refs/` folder exists with templates
- `.mcp.json` has Replicate + Figma MCPs configured

## Inputs

- Approved artist list: Sempé (6), Steig (4), Q.Blake (3), Niemann (3), Watterson (3), Steinberg (2), Klassen (2), Tomine (2)
- Total target: 25 images
- DNA checklist (8 attributes — see `docs/dads42-visual-identity-plan.md`)

## Workflow

### Step 1 — Image acquisition (Codi)
For each artist, find candidate images from public sources (newyorker.com cartoons archive, official artist sites, gocomics.com, foundation archives). For each candidate:
- Save to `research/style-refs/<NN>-<artist>-<scene>.jpg`
- Width ≥ 1024px preferred
- Vertical or square format if possible (croppable to 9:16)

### Step 2 — DNA scoring (Codi)
For each image, score against the 8 DNA attributes (1=fail, 5=excellent):
1. Subject — figures + intimate scale
2. Faces — abstract, expressive
3. Linework — hand-drawn, organic
4. Color — ink + grey wash + warm accent
5. Background — suggested not cluttered
6. Mood — warm-melancholic-optimistic
7. Composition — breathing room
8. Paper — off-white texture

**Pass threshold:** ≥ 4/5 average. Sub-4 candidates rejected and replaced.

### Step 3 — Caption writing (Codi)
Apply uniform caption template per `captions.json`:
```
DADS42STYLE single-panel editorial illustration, hand-drawn ink linework,
soft grey watercolor wash, [SUBJECT], abstract minimal facial features
hinting at [EMOTION], [CONTEXT], warm amber accent, intimate observational
moment, sophisticated yet tender, breathable composition.
```
Fill `<SUBJECT>`, `<EMOTION>`, `<CONTEXT>` per image. Update `captions.json`.

### Step 4 — Document rationale (Codi)
For each accepted image, fill the line in `selection-rationale.md`:
```
- [x] `01-sempe-cafe-boy.jpg` — DNA 4.5/5: nails subject (boy + adult), abstract faces, single warm accent. Strong observational mood.
```

### Step 5 — Present batch for Oren approval
After full 25 curated, present to Oren as one review batch:
- Thumbnail grid (or list with view links)
- Each shows: filename, DNA score, caption, rationale
- Oren's options per image: ✅ accept / ❌ reject (Codi finds replacement)

### Step 6 — Lock dataset
Once Oren approves all 25:
- Mark `[x] Dataset curated (25/25)` in `research/style-refs/README.md`
- Zip the folder
- Hand off to `train-lora` skill

## Outputs

- 25 reference images in `research/style-refs/`
- Complete `captions.json`
- Complete `selection-rationale.md`
- Updated `source-credits.md`
- Status flag flipped in `research/style-refs/README.md`

## Failure modes

| Issue | Action |
|---|---|
| Can't find good ref for an artist | Pull from adjacent artist (e.g. extra Sempé to replace missing Tomine) |
| All candidates score < 4/5 | Reframe DNA expectation for that artist or drop them |
| Oren rejects > 5 images in review | Pause, reconvene on DNA criteria, restart batch |

## Time + cost

- Codi: ~3 hours image acquisition + scoring + captioning
- Oren: ~15 min review
- Cost: $0 (no API calls)

## Next skill in chain

`train-lora` — once dataset is locked.