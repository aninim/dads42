"""Thin Replicate REST client. No dependencies beyond requests."""
import time
import requests
from pathlib import Path
from .env import require

REPLICATE_API = "https://api.replicate.com/v1"


def _headers():
    return {
        "Authorization": f"Bearer {require('REPLICATE_API_TOKEN')}",
        "Content-Type": "application/json",
        "Prefer": "wait",
    }


def run_model(owner_slug: str, inputs: dict, max_retries: int = 3) -> dict:
    """Run a Replicate model and return the parsed JSON response.

    owner_slug: e.g. 'black-forest-labs/flux-1.1-pro'
    inputs: dict matching the model's input schema
    """
    url = f"{REPLICATE_API}/models/{owner_slug}/predictions"
    for attempt in range(max_retries):
        resp = requests.post(url, headers=_headers(), json={"input": inputs}, timeout=120)
        if resp.status_code == 429:
            retry_after = int(resp.headers.get("retry-after", 12))
            time.sleep(retry_after)
            continue
        resp.raise_for_status()
        return resp.json()
    raise RuntimeError(f"Replicate retry exhausted for {owner_slug}")


def run_lora(lora_weights: str, prompt: str, trigger: str = "DADS42STYLE",
             aspect_ratio: str = "9:16") -> dict:
    """Generate an image via a trained Flux LoRA."""
    return run_model(
        "lucataco/flux-dev-lora",
        {
            "prompt": f"{trigger} {prompt}",
            "hf_lora": lora_weights,
            "lora_scale": 0.8,
            "aspect_ratio": aspect_ratio,
            "output_format": "png",
            "num_inference_steps": 28,
        },
    )


def download(url: str, dest: Path) -> Path:
    dest.parent.mkdir(parents=True, exist_ok=True)
    resp = requests.get(url, timeout=60)
    resp.raise_for_status()
    dest.write_bytes(resp.content)
    return dest


def get_output_url(prediction: dict) -> str:
    """Extract the first output URL from a prediction response."""
    out = prediction.get("output")
    if isinstance(out, list) and out:
        return out[0]
    if isinstance(out, str):
        return out
    raise ValueError(f"No output in prediction: {prediction.get('id')}")
