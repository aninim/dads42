---
name: train-lora
description: STUB — Run the Dads'42 LoRA training process on Replicate using the curated reference dataset. Use when user says "train lora", "retrain", "run training", "build the style model". Stub-only until reference dataset is curated.
---

# Skill: train-lora (STUB)

## Status: PENDING — needs `curate-refs` to complete first

## What it will do

1. Verify `research/style-refs/` has 25 captioned images + complete metadata
2. Zip the folder into a single training archive
3. Upload to `ostris/flux-dev-lora-trainer` on Replicate
4. Configure: trigger word `DADS42STYLE`, 1000 steps, rank 32
5. Monitor training (~25 min, ~$2)
6. Save resulting LoRA weights URL to `docs/dads42-visual-style.md`
7. Run 5 stress-test prompts against new LoRA (validation)
8. Report results to Oren for go/no-go

## Pre-conditions

- `research/style-refs/` curated and approved (25 images + captions.json + rationale)
- Replicate account funded (≥ $5)
- Oren has reviewed and signed off on dataset

## Stress test prompts (built-in)

| Test | Prompt | Pass criterion |
|---|---|---|
| T1 — Intimacy | Father + small child in quiet bedroom moment | DNA ≥ 4/5 across 8 attributes |
| T2 — Chaos | Dad at messy kitchen with toddler tantrum | Warmth intact despite chaos |
| T3 — Solitude | Dad alone at 5am with coffee | Editorial weight + tenderness |
| T4 — Joy | Kids running through sprinklers, dad watching | Optimism + abstract face joy |
| T5 — Reflection | Single dad figure on hilltop at dusk | All 8 DNA hits |

**Pass: ≥ 4/5 tests succeed.** Fail: adjust captions, add 3-5 references, retrain (~$2 each iteration).

## Outputs

- LoRA weights URL (HuggingFace or Replicate hosted)
- Updated `docs/dads42-visual-style.md` with weights URL + trigger word
- 5 validation test images in `research/style-refs/validation/`
- Pass/fail report

## Cost

- Training: $2 per run
- Validation: $0.20 (5 × $0.04)
- Budget for 2-3 iterations: ~$7

## Build trigger

When `curate-refs` outputs "25/25 dataset locked", immediately scaffold this skill from stub → functional.