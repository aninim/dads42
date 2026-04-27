# tools/ — Deterministic content scripts

Python scripts that do deterministic work: API calls, asset generation, catalog management.
**Probabilistic AI handles reasoning. Deterministic code handles execution.**

## Setup (one-time, ~5 minutes)

```bash
cd dads42/tools
python -m venv .venv
# Windows:
.venv\Scripts\activate
# macOS/Linux:
source .venv/bin/activate
pip install -r requirements.txt
```

## What's here now

| File | Purpose |
|---|---|
| `lib/env.py` | Loads `.env` from project root; `require("KEY")` raises if missing |
| `lib/replicate_client.py` | Thin REST client for Replicate (image gen, LoRA inference) |
| `generate_asset.py` | CLI: generate an image via Replicate, download to disk |
| `requirements.txt` | Dependencies: `requests`, `python-dotenv`, `pillow` |

## What's coming (build when needed)

| File | Purpose | Build when |
|---|---|---|
| `stitch_reel.py` | 5 frames → 9:16 MP4 with captions (ffmpeg) | Week 2 |
| `brand_overlay.py` | Apply watermark, paper texture, color grade | Week 2 |
| `transcribe_memo.py` | Voice memo → text via local Whisper | Week 3 |
| `score_asset.py` | CLIP similarity vs brand DNA refs | Week 3 |
| `asset_catalog.py` | SQLite catalog of every generated asset | When volume grows |
| `caption_refs.py` | Batch-caption LoRA training references | During LoRA setup |
| `export_figma.py` | Pull brand tokens from Figma via REST | After Figma brand bible exists |

## Usage examples

```bash
# Generate a base Flux image (no LoRA yet)
python tools/generate_asset.py \
  --prompt "A father and small child on a light rail platform at dawn, New Yorker editorial ink style" \
  --output content/drafts/assets/test.png

# Once LoRA is trained:
python tools/generate_asset.py \
  --prompt "Father and child at breakfast table" \
  --output content/drafts/assets/breakfast.png \
  --model lora \
  --lora "hf-owner/dads42-style-lora"
```

## Design principles

- Every script is CLI-first, so Codi can invoke via bash
- Every script reads secrets from `.env` via `lib/env.py`
- No script exposes secrets to stdout/logs
- Every script is idempotent where possible (re-run safely)
