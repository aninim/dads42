---
name: validate-style
description: STUB — Score any image against the 8 Dads'42 DNA attributes and return a pass/fail with reasoning. Use when user says "validate this image", "check style", "is this on brand", "score this asset". Currently stub-only — full implementation pending LoRA lock.
---

# Skill: validate-style (STUB)

## Status: PENDING — build after LoRA is trained

## What it will do

Take any image (file path or URL) → return:
1. Score per DNA attribute (1–5 scale, 8 attributes)
2. Total: PASS (≥ 32/40) / FAIL (< 32/40)
3. Specific failure modes ("face too detailed", "background cluttered", "wrong color palette")
4. Recommendation: ship / regen with adjusted prompt / kill

## Build approach (when ready)

Two paths:
1. **Heuristic** — Read image → call Claude/Vision with the DNA checklist → score
2. **CLIP-based** — Use `tools/score_asset.py` with brand reference embeddings (more reliable, requires Phase 3 Python tool)

Start with heuristic, upgrade to CLIP once `score_asset.py` exists.

## Inputs

- Image file path (relative to project) or URL

## Outputs

- Markdown scorecard:
  ```
  ## Validation: <filename>
  | Attribute | Score | Note |
  | Subject | 5 | Father + child intimate scale |
  | Faces | 3 | Slightly too detailed |
  | ... |
  **Total: 32/40 — PASS (marginal)**
  **Recommend:** Ship, but tighten face prompt next time.
  ```

## Build trigger

After `generate-asset` skill is functional. Validates outputs from that skill.