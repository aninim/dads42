# Dads'42 — Visual Style Guide

**Locked: 2026-04-24** (originated from "Kid at Work" reel test)

## House style: New Yorker editorial minimal

**Reference:** Classic New Yorker single-panel cartoon style — elegant black ink linework, subtle cross-hatching, soft watercolor grey washes, sophisticated observational tone.

## Why this style

- Most distinctive against the gentle-parenting visual lane (pastels, watercolor, cartoon-cute)
- Editorial weight matches brand voice (philosophical depth + adult sensibility)
- Skeptical dads see themselves before the "this is a parenting post" flag goes up
- Pairs with editorial serif typography (Tiempos / Playfair)
- Scales across all 6 angles (Identity, Dark Humor, Hot Take, Raw, Tactical, Us vs Them) without tonal inconsistency

## Core rules

1. **Faces:** Abstract — basic features that *hint* at feeling or thought, never detailed portraits. Think simplified Schulz / Quentin Blake / Tomi Ungerer minimalism. Eyes can be dots or short curves. Mouth lines suggest mood.
2. **Photo of real kids:** Back-of-head or silhouette only (privacy)
3. **Illustrated kids:** Faces visible OK, but kept abstract (universality — readers project their own kids)
4. **Composition:** Vertical 9:16 for reels, square 1:1 for carousel singles. Always leave empty space at top for caption overlay.
5. **Color:** Black ink + grey wash. One muted accent color (ochre, rust, or muted navy) used sparingly.
6. **Avoid:** Bright cheerful pastels, baby blue/pink, sage green, polished 3D, anime, hyper-realism, photo-realism, generic stock-illustration look.

## Master prompt template (Replicate Flux 1.1 Pro)

```
Sophisticated single-panel editorial illustration in the classic New Yorker
magazine cartoon style. [SCENE DESCRIPTION]. Faces minimal and abstract —
basic features hinting at emotion without detailed portraiture. Elegant
black ink linework with subtle cross-hatching, washes of grey, watercolor
grey wash background. [CONTEXTUAL ELEMENTS softly sketched]. Dignified
observational tone, witty yet tender, intimate quiet moment. Vertical 9:16
composition with empty space at top for caption.
```

## Settings

- Model: `black-forest-labs/flux-1.1-pro`
- aspect_ratio: `9:16` (reels) or `1:1` (carousel)
- output_format: `png`
- safety_tolerance: `2`
- Cost: ~$0.04 per generation

## Rate limit note

Replicate throttles to 6 req/min when account has <$5 credit. Keep ~10s between calls or top up credit.

## Locked-in references

- ✅ [kid-at-work-v2-newyorker.png](../content/drafts/assets/kid-at-work-v2-newyorker.png) — original V2, slightly distant
- ✅ [kid-at-work-v2b-faces.png](../content/drafts/assets/kid-at-work-v2b-faces.png) — too detailed (cautionary)
- 🎯 Sweet spot: V2 composition + V2b emotional intimacy + abstract faces

## Rejected styles

- ❌ Peanuts charcoal (too childlike, loses editorial authority)
- ❌ Warm watercolor (too "parenting magazine," competes with gentle-parenting lane)
- ❌ Detailed portraiture (too on-the-nose, breaks abstraction)
