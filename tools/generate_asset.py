"""Generate a Dads'42 asset via Replicate.

Usage:
    python tools/generate_asset.py --prompt "..." --output content/drafts/assets/name.png
    python tools/generate_asset.py --prompt "..." --lora <weights_url>   # once LoRA is trained
    python tools/generate_asset.py --prompt "..." --model base           # no LoRA, base Flux

Model shortcuts:
    base       → black-forest-labs/flux-1.1-pro  (default before LoRA is trained)
    lora       → lucataco/flux-dev-lora          (once we have LoRA weights)
"""
import argparse
import sys
from pathlib import Path

# Allow running as: python tools/generate_asset.py
sys.path.insert(0, str(Path(__file__).resolve().parent))

from lib.replicate_client import run_model, run_lora, download, get_output_url


def main():
    p = argparse.ArgumentParser()
    p.add_argument("--prompt", required=True, help="The image prompt")
    p.add_argument("--output", required=True, help="Destination PNG path (relative to project root OK)")
    p.add_argument("--model", default="base", choices=["base", "lora"], help="Model shortcut")
    p.add_argument("--lora", default=None, help="LoRA weights URL (HuggingFace or Replicate) — required if --model lora")
    p.add_argument("--trigger", default="DADS42STYLE", help="LoRA trigger word")
    p.add_argument("--aspect", default="9:16", help="9:16 | 1:1 | 16:9 | etc.")
    args = p.parse_args()

    if args.model == "lora":
        if not args.lora:
            sys.exit("--lora weights URL required when --model lora")
        prediction = run_lora(args.lora, args.prompt, args.trigger, args.aspect)
    else:
        prediction = run_model(
            "black-forest-labs/flux-1.1-pro",
            {
                "prompt": args.prompt,
                "aspect_ratio": args.aspect,
                "output_format": "png",
                "safety_tolerance": 2,
            },
        )

    url = get_output_url(prediction)
    dest = Path(args.output)
    download(url, dest)
    print(f"OK {dest}  (prediction {prediction.get('id')})")


if __name__ == "__main__":
    main()
