# Upstream Visual Identity Stack for dads42

## Overview

For the upstream visual identity layer, the best tools are the ones that let Claude Code and related automation reliably **define, store, and enforce** the dads42 brand system across design, content, and publishing. The strongest research-backed stack is Frontify for brand governance, Figma for design-system construction, Canva for fast branded production, and Pipedream/GitHub Actions as glue for automation.[web:80][web:88][web:91][web:83]

## What this layer needs

The upstream layer should solve four jobs: create the brand bible, centralize assets, turn the brand into reusable templates, and expose those assets through APIs or integrations Claude can use.[web:80][web:90][web:88] This is more valuable than a random collection of generators, because it gives every later tool the same color, typography, logo, and layout rules.[web:85][web:90]

## Best tools to use

| Tool | Best role | Why it fits |
|------|-----------|-------------|
| Frontify | Brand system / asset hub | Centralizes brand guidelines, templates, colors, fonts, logos, and digital assets; integrates with Figma in both directions.[web:80][web:90][web:93] |
| Figma | Design system / template builder | Supports design systems, plugin workflows, widgets, variables, and brand-guideline documentation.[web:81][web:89] |
| Canva | Fast social production | Connect API and Apps SDK let you sync assets, designs, and comments into workflows and create integrations off-platform.[web:88][web:91] |
| Pipedream | Workflow glue | Can connect Frontify, Figma, and other tools in automation chains without bespoke code for every integration.[web:83] |
| GitHub Actions + Claude Code | Orchestration | Good for repo-based prompt libraries, template updates, and asset/workflow maintenance.[web:11][web:76] |

## Why these are the right fit

Frontify is the clearest brand-governance layer because its Figma integration lets teams pull colors, typography, media, icons, and logos directly into Figma, while also syncing Figma work back into guideline pages.[web:80][web:90][web:93] Figma is the best place to build the actual visual system because it supports structured design documentation, API-like workflows, and plugin-based asset reuse.[web:81][web:89] Canva is the most practical production layer because its Connect API is explicitly built for syncing assets and designs into third-party workflows, including private or public integrations.[web:88][web:91]

## Recommended architecture

The cleanest stack for dads42 is:

1. **Frontify as the brand source of truth** for logos, colors, fonts, examples, and usage rules.[web:80][web:90]  
2. **Figma for design-system files** and reusable templates for posts, carousels, and web visuals.[web:81][web:89]  
3. **Canva for speed production** when you need quick social assets without deep design work.[web:88][web:91]  
4. **GitHub + Claude Code** for prompt libraries, asset rules, and automation scripts.[web:11][web:76]  
5. **Pipedream or similar middleware** to move approved assets and metadata between systems.[web:83]

## What to avoid

Do not rely on image generators alone as the brand system. Generators can create visuals, but they do not by themselves enforce consistency across typography, spacing, icon treatment, or logo usage.[web:57][web:61] The brand system should live in Frontify or Figma, and the generators should consume that system rather than define it.[web:80][web:90]

## Minimal winning setup

If the goal is a small but high-quality upstream stack, use only these:
- **Frontify** for the brand bible.[web:80][web:93]
- **Figma** for design templates and rules.[web:81][web:89]
- **Canva** for quick content production.[web:88][web:91]
- **Claude Code + GitHub Actions** for orchestration.[web:11][web:76]

This is enough for Claude to reliably generate on-brand content downstream while keeping the dads42 identity coherent across every channel.[web:80][web:88][web:90]