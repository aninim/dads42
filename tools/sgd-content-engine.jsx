import { useState, useCallback } from "react";

const PLATFORMS = [
  { id: "instagram", label: "Instagram Reels", icon: "📸" },
  { id: "tiktok", label: "TikTok", icon: "🎵" },
  { id: "facebook", label: "Facebook", icon: "👥" },
  { id: "x", label: "X / Twitter", icon: "𝕏" },
  { id: "youtube", label: "YouTube Shorts", icon: "▶️" },
];

const CONTENT_ANGLES = [
  { id: "identity", label: "Identity / Ego", emoji: "🔥", desc: "Makes dads feel SEEN & respected" },
  { id: "humor", label: "Dark Humor", emoji: "😂", desc: "Relatable chaos that goes viral" },
  { id: "contrast", label: "Hot Take / Contrast", emoji: "⚡", desc: "Challenges mainstream dad advice" },
  { id: "raw", label: "Raw / Confessional", emoji: "💔", desc: "Vulnerability that builds deep trust" },
  { id: "practical", label: "Tactical / Wins", emoji: "🛠️", desc: "Actionable stuff dads can use NOW" },
  { id: "tribe", label: "Us vs. Them", emoji: "🐺", desc: "In-group energy, builds community feel" },
];

const TOPICS = [
  "screen time guilt",
  "losing your temper",
  "not knowing how to talk to your kids",
  "feeling invisible in your own house",
  "being a better dad than your own father",
  "the loneliness nobody talks about",
  "work-life balance being a myth",
  "your kid preferring mom",
  "feeling like you're failing financially",
  "not knowing how to show affection",
  "raising boys in 2024",
  "co-parenting struggles",
  "being a stepdad",
  "never having a role model",
  "putting yourself last",
  "the mental load of fatherhood",
  "masculine identity vs. gentle parenting",
  "feeling like you missed the manual",
];

export default function App() {
  const [platform, setPlatform] = useState("tiktok");
  const [angle, setAngle] = useState("identity");
  const [topic, setTopic] = useState(TOPICS[0]);
  const [customTopic, setCustomTopic] = useState("");
  const [ideas, setIdeas] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState([]);
  const [activeTab, setActiveTab] = useState("generate");
  const [expandedIdea, setExpandedIdea] = useState(null);

  const selectedPlatform = PLATFORMS.find((p) => p.id === platform);
  const selectedAngle = CONTENT_ANGLES.find((a) => a.id === angle);
  const finalTopic = customTopic.trim() || topic;

  const generate = useCallback(async () => {
    setLoading(true);
    setIdeas(null);
    setExpandedIdea(null);

    const systemPrompt = `You are a viral content strategist for "Self-Guided Dads" — a Skool community for real dads who are figuring it out without a playbook. 
Your job is to create scroll-stopping social content ideas that feel authentic, not preachy or soft.
The target audience: dads 28–45, doom-scrolling late at night, feel something but can't name it. They don't want a therapy circle — they want to feel understood, respected, and less alone.
The goal of each post is to stop the scroll, create emotion, and funnel viewers toward the Self-Guided Dads Skool community.
You must respond ONLY with valid JSON. No markdown, no explanation outside the JSON.`;

    const userPrompt = `Generate 3 unique viral content ideas for:
- Platform: ${selectedPlatform?.label}
- Content angle: ${selectedAngle?.label} (${selectedAngle?.desc})
- Topic: "${finalTopic}"

For each idea return:
{
  "ideas": [
    {
      "hook": "The first line/visual hook (make this jaw-dropping, scroll-stopping)",
      "title": "Short punchy content title (5 words max)",
      "format": "Exact content format (e.g. 'POV voiceover reel', 'Text-on-screen list', 'Talking head', 'Photo carousel', 'Single tweet thread starter')",
      "caption_opener": "First 2-3 lines of the caption — this is what shows before 'more'",
      "viral_reason": "One sentence: WHY this will stop the scroll or get shared",
      "skool_bridge": "How this naturally transitions to the Skool community CTA",
      "trending_audio_vibe": "Describe the audio/music vibe if video (e.g. 'Slow emotional piano', 'Punchy hip hop', 'Silence then drop')"
    }
  ]
}`;

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: systemPrompt,
          messages: [{ role: "user", content: userPrompt }],
        }),
      });
      const data = await response.json();
      const text = data.content?.map((b) => b.text || "").join("") || "";
      const clean = text.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(clean);
      setIdeas(parsed.ideas || []);
    } catch (e) {
      setIdeas([{ hook: "Error generating ideas. Please try again.", title: "Error", format: "", caption_opener: "", viral_reason: "", skool_bridge: "", trending_audio_vibe: "" }]);
    }
    setLoading(false);
  }, [platform, angle, finalTopic, selectedAngle, selectedPlatform]);

  const saveIdea = (idea) => {
    setSaved((prev) => [...prev, { ...idea, platform, angle, topic: finalTopic, savedAt: new Date().toLocaleDateString() }]);
  };

  const isAlreadySaved = (idea) => saved.some((s) => s.hook === idea.hook);

  return (
    <div style={{ minHeight: "100vh", background: "#0D0D0D", color: "#F0EBE0", fontFamily: "'Georgia', serif", padding: "0" }}>
      {/* Header */}
      <div style={{ background: "#0D0D0D", borderBottom: "1px solid #1E1E1E", padding: "20px 28px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 100 }}>
        <div>
          <div style={{ fontSize: "11px", letterSpacing: "4px", textTransform: "uppercase", color: "#B8860B", marginBottom: "4px", fontFamily: "sans-serif" }}>Self-Guided Dads</div>
          <div style={{ fontSize: "20px", fontWeight: "bold", color: "#F0EBE0" }}>Content Engine</div>
        </div>
        <div style={{ display: "flex", gap: "8px" }}>
          {["generate", "saved"].map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{ padding: "8px 20px", borderRadius: "4px", border: "none", cursor: "pointer", fontFamily: "sans-serif", fontSize: "13px", fontWeight: "500", background: activeTab === tab ? "#B8860B" : "#1A1A1A", color: activeTab === tab ? "#0D0D0D" : "#888", transition: "all 0.2s" }}>
              {tab === "generate" ? "⚡ Generate" : `📌 Saved (${saved.length})`}
            </button>
          ))}
        </div>
      </div>

      {activeTab === "generate" && (
        <div style={{ maxWidth: "900px", margin: "0 auto", padding: "40px 24px" }}>

          {/* STEP 1: Platform */}
          <Section label="01 — Platform">
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              {PLATFORMS.map((p) => (
                <Chip key={p.id} active={platform === p.id} onClick={() => setPlatform(p.id)}>
                  {p.icon} {p.label}
                </Chip>
              ))}
            </div>
          </Section>

          {/* STEP 2: Angle */}
          <Section label="02 — Content Angle">
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "10px" }}>
              {CONTENT_ANGLES.map((a) => (
                <AngleCard key={a.id} data={a} active={angle === a.id} onClick={() => setAngle(a.id)} />
              ))}
            </div>
          </Section>

          {/* STEP 3: Topic */}
          <Section label="03 — Topic">
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "16px" }}>
              {TOPICS.map((t) => (
                <Chip key={t} active={topic === t && !customTopic} onClick={() => { setTopic(t); setCustomTopic(""); }}>
                  {t}
                </Chip>
              ))}
            </div>
            <input
              placeholder="Or type your own topic..."
              value={customTopic}
              onChange={(e) => setCustomTopic(e.target.value)}
              style={{ width: "100%", background: "#1A1A1A", border: "1px solid #2A2A2A", borderRadius: "6px", padding: "12px 16px", color: "#F0EBE0", fontSize: "14px", fontFamily: "sans-serif", outline: "none" }}
            />
          </Section>

          {/* Generate Button */}
          <div style={{ textAlign: "center", margin: "36px 0" }}>
            <button
              onClick={generate}
              disabled={loading}
              style={{ background: loading ? "#2A2A2A" : "linear-gradient(135deg, #B8860B, #D4A017)", color: loading ? "#555" : "#0D0D0D", border: "none", borderRadius: "6px", padding: "18px 56px", fontSize: "16px", fontWeight: "bold", fontFamily: "sans-serif", cursor: loading ? "not-allowed" : "pointer", letterSpacing: "1px", transition: "all 0.2s", boxShadow: loading ? "none" : "0 4px 24px rgba(184,134,11,0.35)" }}
            >
              {loading ? "Generating ideas..." : "⚡ Generate Viral Ideas"}
            </button>
            <div style={{ marginTop: "12px", fontSize: "12px", color: "#444", fontFamily: "sans-serif" }}>
              {selectedPlatform?.icon} {selectedPlatform?.label} · {selectedAngle?.emoji} {selectedAngle?.label} · "{finalTopic}"
            </div>
          </div>

          {/* Results */}
          {ideas && (
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {ideas.map((idea, i) => (
                <IdeaCard key={i} idea={idea} index={i} expanded={expandedIdea === i} onExpand={() => setExpandedIdea(expandedIdea === i ? null : i)} onSave={() => saveIdea(idea)} saved={isAlreadySaved(idea)} />
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === "saved" && (
        <div style={{ maxWidth: "900px", margin: "0 auto", padding: "40px 24px" }}>
          {saved.length === 0 ? (
            <div style={{ textAlign: "center", padding: "80px 0", color: "#444" }}>
              <div style={{ fontSize: "48px", marginBottom: "16px" }}>📌</div>
              <div style={{ fontFamily: "sans-serif", fontSize: "16px" }}>No saved ideas yet.</div>
              <div style={{ fontFamily: "sans-serif", fontSize: "13px", marginTop: "8px", color: "#333" }}>Generate ideas and hit Save to collect them here.</div>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {saved.map((idea, i) => (
                <div key={i} style={{ background: "#111", border: "1px solid #1E1E1E", borderRadius: "10px", padding: "24px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                    <div>
                      <div style={{ fontSize: "11px", letterSpacing: "3px", color: "#B8860B", fontFamily: "sans-serif", textTransform: "uppercase", marginBottom: "6px" }}>{idea.platform} · {idea.angle} · {idea.topic}</div>
                      <div style={{ fontSize: "18px", fontWeight: "bold" }}>{idea.title}</div>
                    </div>
                    <div style={{ fontSize: "11px", color: "#333", fontFamily: "sans-serif" }}>{idea.savedAt}</div>
                  </div>
                  <div style={{ fontStyle: "italic", color: "#B8860B", fontSize: "15px", lineHeight: "1.5", marginBottom: "12px" }}>"{idea.hook}"</div>
                  <div style={{ fontSize: "13px", color: "#888", fontFamily: "sans-serif", lineHeight: "1.6" }}>{idea.caption_opener}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function Section({ label, children }) {
  return (
    <div style={{ marginBottom: "36px" }}>
      <div style={{ fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", color: "#B8860B", fontFamily: "sans-serif", marginBottom: "16px" }}>{label}</div>
      {children}
    </div>
  );
}

function Chip({ active, onClick, children }) {
  return (
    <button onClick={onClick} style={{ padding: "8px 16px", borderRadius: "100px", border: active ? "1px solid #B8860B" : "1px solid #222", background: active ? "rgba(184,134,11,0.15)" : "#111", color: active ? "#D4A017" : "#666", cursor: "pointer", fontSize: "13px", fontFamily: "sans-serif", transition: "all 0.15s", whiteSpace: "nowrap" }}>
      {children}
    </button>
  );
}

function AngleCard({ data, active, onClick }) {
  return (
    <button onClick={onClick} style={{ padding: "16px", borderRadius: "8px", border: active ? "1px solid #B8860B" : "1px solid #1E1E1E", background: active ? "rgba(184,134,11,0.1)" : "#111", cursor: "pointer", textAlign: "left", transition: "all 0.15s" }}>
      <div style={{ fontSize: "22px", marginBottom: "6px" }}>{data.emoji}</div>
      <div style={{ fontSize: "14px", fontWeight: "bold", color: active ? "#D4A017" : "#F0EBE0", marginBottom: "4px", fontFamily: "sans-serif" }}>{data.label}</div>
      <div style={{ fontSize: "12px", color: "#555", fontFamily: "sans-serif", lineHeight: "1.4" }}>{data.desc}</div>
    </button>
  );
}

function IdeaCard({ idea, index, expanded, onExpand, onSave, saved }) {
  const colors = ["#B8860B", "#C0392B", "#1A6B4A"];
  const accent = colors[index % colors.length];

  return (
    <div style={{ background: "#111", border: `1px solid ${expanded ? accent : "#1E1E1E"}`, borderRadius: "10px", overflow: "hidden", transition: "border-color 0.2s" }}>
      <div style={{ padding: "24px", cursor: "pointer" }} onClick={onExpand}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "16px" }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: "11px", letterSpacing: "3px", color: accent, fontFamily: "sans-serif", textTransform: "uppercase", marginBottom: "8px" }}>
              Idea {index + 1} · {idea.format}
            </div>
            <div style={{ fontSize: "20px", fontWeight: "bold", lineHeight: "1.3", marginBottom: "10px" }}>{idea.title}</div>
            <div style={{ fontSize: "15px", fontStyle: "italic", color: "#C8B8A0", lineHeight: "1.5" }}>"{idea.hook}"</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px", flexShrink: 0 }}>
            <button
              onClick={(e) => { e.stopPropagation(); onSave(); }}
              style={{ padding: "8px 16px", borderRadius: "4px", border: "none", background: saved ? "#1A3A2A" : "#1A1A1A", color: saved ? "#4CAF50" : "#888", cursor: saved ? "default" : "pointer", fontSize: "12px", fontFamily: "sans-serif" }}
            >
              {saved ? "✓ Saved" : "📌 Save"}
            </button>
            <button style={{ padding: "8px 16px", borderRadius: "4px", border: "none", background: "#1A1A1A", color: "#888", cursor: "pointer", fontSize: "12px", fontFamily: "sans-serif" }} onClick={onExpand}>
              {expanded ? "▲ Less" : "▼ More"}
            </button>
          </div>
        </div>

        {/* Viral reason pill */}
        <div style={{ marginTop: "14px", display: "inline-block", background: "rgba(184,134,11,0.1)", border: "1px solid rgba(184,134,11,0.2)", borderRadius: "4px", padding: "6px 12px", fontSize: "12px", color: "#B8860B", fontFamily: "sans-serif" }}>
          🔥 {idea.viral_reason}
        </div>
      </div>

      {expanded && (
        <div style={{ borderTop: "1px solid #1E1E1E", padding: "24px", display: "flex", flexDirection: "column", gap: "20px" }}>
          <DetailBlock label="Caption Opener" icon="✍️">
            <div style={{ whiteSpace: "pre-line", fontSize: "14px", lineHeight: "1.8", color: "#D0C8BC", fontFamily: "sans-serif" }}>{idea.caption_opener}</div>
          </DetailBlock>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <DetailBlock label="Skool Bridge 🎓" icon="">
              <div style={{ fontSize: "13px", color: "#888", fontFamily: "sans-serif", lineHeight: "1.6" }}>{idea.skool_bridge}</div>
            </DetailBlock>
            <DetailBlock label="Audio Vibe 🎧" icon="">
              <div style={{ fontSize: "13px", color: "#888", fontFamily: "sans-serif", lineHeight: "1.6" }}>{idea.trending_audio_vibe}</div>
            </DetailBlock>
          </div>
        </div>
      )}
    </div>
  );
}

function DetailBlock({ label, children }) {
  return (
    <div>
      <div style={{ fontSize: "10px", letterSpacing: "3px", textTransform: "uppercase", color: "#444", fontFamily: "sans-serif", marginBottom: "10px" }}>{label}</div>
      {children}
    </div>
  );
}
