import { useState } from "react";

const PLATFORMS = [
  { id: "instagram", label: "Instagram", color: "#E1306C", icon: "📸", maxChars: 2200 },
  { id: "facebook", label: "Facebook", color: "#1877F2", icon: "👥", maxChars: 63206 },
  { id: "tiktok", label: "TikTok", color: "#010101", icon: "🎵", maxChars: 2200 },
  { id: "x", label: "X / Twitter", color: "#000000", icon: "𝕏", maxChars: 280 },
];

const CONTENT_TYPES = [
  { id: "hook", label: "Hook Post", desc: "Grab attention, drive curiosity" },
  { id: "value", label: "Value Drop", desc: "Tips, insights, lessons" },
  { id: "story", label: "Story / Vulnerability", desc: "Personal journey moment" },
  { id: "cta", label: "CTA to Skool", desc: "Drive community join" },
  { id: "poll", label: "Poll / Engagement", desc: "Boost reach & replies" },
  { id: "testimonial", label: "Win / Testimonial", desc: "Social proof post" },
];

const WEEK_TEMPLATE = [
  { day: "Monday", type: "hook", platform: ["instagram", "facebook"], note: "Start the week strong — open a loop" },
  { day: "Tuesday", type: "value", platform: ["tiktok", "x"], note: "Quick tip dads can use TODAY" },
  { day: "Wednesday", type: "story", platform: ["instagram", "facebook"], note: "Mid-week vulnerability = trust builder" },
  { day: "Thursday", type: "cta", platform: ["instagram", "facebook", "x"], note: "Best day to drive Skool signups" },
  { day: "Friday", type: "poll", platform: ["instagram", "x"], note: "Weekend run-up, high engagement" },
  { day: "Saturday", type: "testimonial", platform: ["facebook", "instagram"], note: "Weekend scroll = social proof moment" },
  { day: "Sunday", type: "value", platform: ["tiktok"], note: "Quiet reflection content performs well" },
];

const CAPTION_FRAMEWORKS = {
  hook: {
    title: "Hook Framework",
    template: `Nobody told me being a self-guided dad would feel like this...

[Relatable struggle or surprising observation]

Most dads I know are [common pain point].

But here's what changed everything for me 👇

[Tease the insight — don't give it yet]

Drop a 🙋 if this hits home.

──────────────────
🔗 Join 500+ dads in our free Skool community — link in bio`,
  },
  value: {
    title: "Value Drop Framework",
    template: `5 things no one teaches dads about [topic]:

1️⃣ [Insight 1]
2️⃣ [Insight 2]
3️⃣ [Insight 3]
4️⃣ [Insight 4]
5️⃣ [Insight 5 — most powerful, save for last]

Save this. Share it with a dad who needs it.

──────────────────
🎓 Go deeper → Self-Guided Dads on Skool (link in bio)`,
  },
  story: {
    title: "Story / Vulnerability Framework",
    template: `I was a terrible dad.

Not because I didn't care.
Because I didn't know HOW.

[Short story: the moment you realized something had to change]

That was [timeframe] ago.

Here's what I learned:

[The lesson, simply stated]

If you're in that place right now — you're not alone.

──────────────────
💬 Come talk about it → Self-Guided Dads community (link in bio)`,
  },
  cta: {
    title: "Skool CTA Framework",
    template: `I built the community I wish existed when I became a dad.

Inside Self-Guided Dads on Skool:

✅ [Benefit 1 — specific]
✅ [Benefit 2 — specific]
✅ [Benefit 3 — specific]
✅ Weekly live calls
✅ A tribe of dads who GET IT

It