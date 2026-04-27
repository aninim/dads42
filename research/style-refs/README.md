# style-refs/ — LoRA Training Reference Dataset

**Purpose:** The 25 curated reference images that train the Dads'42 illustration LoRA.

## Files in this folder

| File | Purpose |
|---|---|
| `<01–25>-<artist>-<scene>.jpg` | The actual reference images (filename pattern locked) |
| `captions.json` | One uniform caption per image, keyed by filename |
| `selection-rationale.md` | Why each image made the cut (DNA attribute breakdown) |
| `source-credits.md` | Attribution + license notes per source |

## Filename convention

```
<NN>-<artist-slug>-<scene-slug>.jpg
```

Examples:
- `01-sempe-cafe-boy.jpg`
- `02-sempe-train-platform.jpg`
- `10-steig-father-son.jpg`
- `18-blake-tree-scene.jpg`

Two-digit number keeps sort order. Artist-slug lowercase, hyphenated.

## DNA checklist (each ref must hit ≥ 4/5)

1. **Subject:** 1–3 figures, intimate scale
2. **Faces:** abstract, minimal, expressive
3. **Linework:** hand-drawn, organic, variable weight
4. **Color:** ink + grey wash + ≤1 warm accent
5. **Background:** suggested, not cluttered
6. **Mood:** warm-melancholic-optimistic blend
7. **Composition:** breathing room, clear focal point
8. **Paper:** off-white / cream texture

## Training protocol

Once 25 refs curated + captioned:
1. Zip contents of this folder
2. Upload to `ostris/flux-dev-lora-trainer` on Replicate
3. Trigger word: `DADS42STYLE`
4. 1000 steps, rank 32, ~$2 cost
5. Run 5 stress-tests (see `docs/dads42-visual-identity-plan.md` Phase 5)

## Status

- [ ] Dataset curated (0 / 25)
- [ ] All captions written
- [ ] Rationale documented
- [ ] Credits logged
- [ ] Training run
- [ ] Validation passed (≥ 4/5 stress tests)
