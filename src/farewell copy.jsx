import { useState, useEffect, useRef } from "react";

const MESSAGES = [
  { name: "Aarav", role: "Frontend Developer", msg: "Working alongside you has been the highlight of my career so far. You always had the perfect solution — and somehow made it look effortless. I'll miss our late-night debug sessions! 💛", color: "#f59e0b", avatar: "A" },
  { name: "Priya", role: "UI/UX Designer", msg: "You were the only dev who never said 'that's not possible in CSS'. You brought every single design to life with such care. The team won't be the same without you! 🌸", color: "#f472b6", avatar: "P" },
  { name: "Rohan", role: "Backend Developer", msg: "I barely understand what you do but I know it's pure magic. Every screen you touched became a masterpiece. Wishing you the best on your new journey, legend! 🚀", color: "#10b981", avatar: "R" },
  { name: "Sneha", role: "QA Engineer", msg: "You were the one developer who actually loved when I raised bugs — and fixed them faster than I could log them! You set the bar for quality. We'll miss you so much! ⭐", color: "#818cf8", avatar: "S" },
  { name: "Kiran", role: "Team Lead", msg: "You've mentored, inspired and uplifted everyone around you. You didn't just write great code — you built a great team culture. Wherever you go, they're getting the best. 🏆", color: "#fb923c", avatar: "K" },
  { name: "Meera", role: "Full Stack Developer", msg: "From pair programming to coffee chats — every moment working with you was a learning experience. Your passion for clean, accessible UI is something I'll carry forward forever. 💻", color: "#34d399", avatar: "M" },
];

const PHOTOS = [
  { id: 1, url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80", caption: "Team Hackathon 2023 🏆", tag: "Memories" },
  { id: 2, url: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80", caption: "Lunch Squad Forever 🍕", tag: "Fun Times" },
  { id: 3, url: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&q=80", caption: "Sprint Planning Sessions ☕", tag: "Work Hard" },
  { id: 4, url: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80", caption: "Annual Team Outing 🎉", tag: "Play Hard" },
  { id: 5, url: "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=800&q=80", caption: "Office Celebrations 🎂", tag: "Together" },
  { id: 6, url: "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?w=800&q=80", caption: "The Gang's All Here 💛", tag: "Best Days" },
];

// ── Shared background effects ──────────────────────────────────────────────

function FloatingParticles() {
  const particles = Array.from({ length: 28 }, (_, i) => ({
    id: i,
    size: Math.random() * 10 + 4,
    left: Math.random() * 100,
    delay: Math.random() * 8,
    duration: Math.random() * 10 + 10,
    color: ["#fbbf24", "#f472b6", "#818cf8", "#34d399", "#fb923c"][Math.floor(Math.random() * 5)],
  }));
  return (
    <div style={{ position: "fixed", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 }}>
      {particles.map((p) => (
        <div key={p.id} style={{
          position: "absolute", bottom: "-20px", left: `${p.left}%`,
          width: `${p.size}px`, height: `${p.size}px`, borderRadius: "50%",
          background: p.color, opacity: 0.35,
          animation: `floatUp ${p.duration}s ${p.delay}s infinite ease-in`,
        }} />
      ))}
    </div>
  );
}

function ConfettiPiece({ x, color, delay, shape }) {
  const size = Math.random() * 8 + 6;
  return (
    <div style={{
      position: "fixed", top: "-20px", left: `${x}%`,
      width: `${size}px`, height: shape === "square" ? `${size}px` : `${size * 1.6}px`,
      background: color,
      borderRadius: shape === "circle" ? "50%" : shape === "square" ? "2px" : "1px",
      opacity: 0.85,
      animation: `confettiFall ${Math.random() * 3 + 3}s ${delay}s infinite linear`,
      transform: `rotate(${Math.random() * 360}deg)`,
      zIndex: 999, pointerEvents: "none",
    }} />
  );
}

function Confetti({ active }) {
  if (!active) return null;
  const pieces = Array.from({ length: 60 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    color: ["#fbbf24", "#f472b6", "#818cf8", "#34d399", "#fb923c", "#60a5fa", "#f87171"][Math.floor(Math.random() * 7)],
    delay: Math.random() * 2,
    shape: ["circle", "square", "rect"][Math.floor(Math.random() * 3)],
  }));
  return <>{pieces.map((p) => <ConfettiPiece key={p.id} {...p} />)}</>;
}

// ── Back button ────────────────────────────────────────────────────────────

function BackButton({ onBack }) {
  return (
    <button
      onClick={onBack}
      style={{
        position: "fixed", top: "24px", left: "24px", zIndex: 100,
        display: "flex", alignItems: "center", gap: "8px",
        padding: "10px 20px", borderRadius: "999px",
        background: "rgba(255,255,255,0.08)",
        border: "1px solid rgba(255,255,255,0.18)",
        color: "#fff", fontSize: "14px", fontWeight: 600,
        fontFamily: "'Lato', sans-serif", cursor: "pointer",
        backdropFilter: "blur(12px)",
        transition: "background 0.2s, transform 0.2s",
      }}
      onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.15)"; e.currentTarget.style.transform = "translateX(-2px)"; }}
      onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; e.currentTarget.style.transform = "translateX(0)"; }}
    >
      ← Back
    </button>
  );
}

// ── PAGE: Memories ─────────────────────────────────────────────────────────

function MemoriesPage({ onBack }) {
  const [current, setCurrent] = useState(0);
  const [animDir, setAnimDir] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [visible, setVisible] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => { setTimeout(() => setVisible(true), 50); }, []);

  const goTo = (idx, dir) => {
    if (isAnimating) return;
    setAnimDir(dir);
    setIsAnimating(true);
    setTimeout(() => { setCurrent(idx); setIsAnimating(false); setAnimDir(null); }, 380);
  };

  const prev = () => goTo((current - 1 + PHOTOS.length) % PHOTOS.length, "left");
  const next = () => goTo((current + 1) % PHOTOS.length, "right");

  useEffect(() => {
    timerRef.current = setTimeout(next, 4000);
    return () => clearTimeout(timerRef.current);
  }, [current]);

  const photo = PHOTOS[current];
  const prevIdx = (current - 1 + PHOTOS.length) % PHOTOS.length;
  const nextIdx = (current + 1) % PHOTOS.length;

  return (
    <div style={{
      minHeight: "100vh", display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      padding: "60px 24px 24px", position: "relative", zIndex: 1,
      opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(24px)",
      transition: "opacity 0.5s ease, transform 0.5s ease",
    }}>
      <BackButton onBack={onBack} />

      <p style={{ fontSize: "11px", letterSpacing: "4px", color: "#60a5fa", textTransform: "uppercase", marginBottom: "8px" }}>
        📸 Moments We'll Cherish
      </p>
      <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(24px, 3.5vw, 38px)", fontWeight: 700, marginBottom: "20px", color: "#fff", textAlign: "center" }}>
        Our <span style={{ color: "#60a5fa", fontStyle: "italic" }}>Memories</span> Together
      </h2>

      <div style={{ width: "100%", maxWidth: "860px" }}>
        <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center", gap: "14px" }}>
          {/* Prev thumbnail */}
          <div onClick={prev} style={{ width: "60px", height: "80px", borderRadius: "10px", overflow: "hidden", cursor: "pointer", flexShrink: 0, opacity: 0.4, transition: "opacity 0.3s, transform 0.3s", transform: "scale(0.92)" }}
            onMouseEnter={e => { e.currentTarget.style.opacity = "0.7"; e.currentTarget.style.transform = "scale(0.96)"; }}
            onMouseLeave={e => { e.currentTarget.style.opacity = "0.4"; e.currentTarget.style.transform = "scale(0.92)"; }}>
            <img src={PHOTOS[prevIdx].url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>

          {/* Main slide */}
          <div style={{ flex: 1, maxWidth: "640px", position: "relative", borderRadius: "18px", overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.08)" }}>
            <div style={{ transition: "opacity 0.38s ease, transform 0.38s ease", opacity: isAnimating ? 0 : 1, transform: isAnimating ? `translateX(${animDir === "right" ? "-40px" : "40px"})` : "translateX(0)" }}>
              <img src={photo.url} alt={photo.caption} style={{ width: "100%", height: "300px", objectFit: "cover", display: "block" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 55%)" }} />
              <div style={{ position: "absolute", top: "20px", left: "20px", background: "rgba(96,165,250,0.25)", border: "1px solid rgba(96,165,250,0.5)", color: "#60a5fa", padding: "4px 14px", borderRadius: "999px", fontSize: "11px", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", backdropFilter: "blur(8px)" }}>
                {photo.tag}
              </div>
              <div style={{ position: "absolute", bottom: "24px", left: "24px", right: "24px", textAlign: "left" }}>
                <p style={{ color: "#fff", fontSize: "20px", fontWeight: 700, fontFamily: "'Playfair Display', serif", textShadow: "0 2px 8px rgba(0,0,0,0.5)" }}>{photo.caption}</p>
              </div>
            </div>
          </div>

          {/* Next thumbnail */}
          <div onClick={next} style={{ width: "60px", height: "80px", borderRadius: "10px", overflow: "hidden", cursor: "pointer", flexShrink: 0, opacity: 0.4, transition: "opacity 0.3s, transform 0.3s", transform: "scale(0.92)" }}
            onMouseEnter={e => { e.currentTarget.style.opacity = "0.7"; e.currentTarget.style.transform = "scale(0.96)"; }}
            onMouseLeave={e => { e.currentTarget.style.opacity = "0.4"; e.currentTarget.style.transform = "scale(0.92)"; }}>
            <img src={PHOTOS[nextIdx].url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        </div>

        {/* Controls */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", marginTop: "14px" }}>
          <button onClick={prev} style={{ width: "44px", height: "44px", borderRadius: "50%", background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.15)", color: "#fff", fontSize: "18px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.15)"}
            onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.07)"}>←</button>
          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            {PHOTOS.map((_, i) => (
              <button key={i} onClick={() => goTo(i, i > current ? "right" : "left")} style={{ width: i === current ? "24px" : "8px", height: "8px", borderRadius: "999px", background: i === current ? "#60a5fa" : "rgba(255,255,255,0.25)", border: "none", cursor: "pointer", padding: 0, transition: "all 0.3s ease" }} />
            ))}
          </div>
          <button onClick={next} style={{ width: "44px", height: "44px", borderRadius: "50%", background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.15)", color: "#fff", fontSize: "18px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.15)"}
            onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.07)"}>→</button>
        </div>
        <p style={{ marginTop: "8px", color: "rgba(255,255,255,0.3)", fontSize: "12px", letterSpacing: "1px", textAlign: "center" }}>{current + 1} / {PHOTOS.length}</p>
      </div>

      {/* Thumbnail strip */}
      <div style={{ display: "flex", gap: "8px", marginTop: "16px", flexWrap: "wrap", justifyContent: "center", maxWidth: "680px" }}>
        {PHOTOS.map((p, i) => (
          <div key={p.id} onClick={() => goTo(i, i > current ? "right" : "left")} style={{
            width: "72px", height: "50px", borderRadius: "8px", overflow: "hidden", cursor: "pointer",
            border: `2px solid ${i === current ? "#60a5fa" : "transparent"}`,
            opacity: i === current ? 1 : 0.5, transition: "all 0.25s ease",
            flexShrink: 0,
          }}
            onMouseEnter={e => { if (i !== current) e.currentTarget.style.opacity = "0.8"; }}
            onMouseLeave={e => { if (i !== current) e.currentTarget.style.opacity = "0.5"; }}>
            <img src={p.url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        ))}
      </div>
    </div>
  );
}

// ── PAGE: Messages ─────────────────────────────────────────────────────────

function MessageModal({ msg, onClose }) {
  if (!msg) return null;
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 200,
        background: "rgba(0,0,0,0.6)", backdropFilter: "blur(6px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "24px",
        animation: "fadeIn 0.25s ease",
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: "#fff", borderRadius: "24px",
          width: "100%", maxWidth: "460px",
          boxShadow: "0 32px 80px rgba(0,0,0,0.4)",
          overflow: "hidden",
          animation: "popIn 0.35s cubic-bezier(0.34,1.56,0.64,1)",
          position: "relative",
        }}
      >
        {/* Colored top bar */}
        <div style={{ height: "5px", background: `linear-gradient(90deg, ${msg.color}, ${msg.color}88)` }} />

        {/* Header */}
        <div style={{
          display: "flex", alignItems: "center", gap: "14px",
          padding: "20px 24px 16px",
          borderBottom: "1px solid rgba(0,0,0,0.07)",
        }}>
          <div style={{
            width: "52px", height: "52px", borderRadius: "50%",
            background: `linear-gradient(135deg, ${msg.color}cc, ${msg.color}55)`,
            border: `2px solid ${msg.color}`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "20px", fontWeight: 800, color: "#fff",
            fontFamily: "'Playfair Display', serif", flexShrink: 0,
            boxShadow: `0 4px 16px ${msg.color}44`,
          }}>
            {msg.avatar}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ color: "#111", fontWeight: 700, fontSize: "17px", fontFamily: "'Playfair Display', serif" }}>{msg.name}</div>
            <div style={{ color: msg.color, fontSize: "11px", fontWeight: 600, letterSpacing: "1.5px", textTransform: "uppercase", marginTop: "2px" }}>{msg.role}</div>
          </div>
          {/* Close button */}
          <button
            onClick={onClose}
            style={{
              width: "32px", height: "32px", borderRadius: "50%",
              background: "rgba(0,0,0,0.06)", border: "none",
              cursor: "pointer", fontSize: "16px", color: "#666",
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "background 0.2s",
            }}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(0,0,0,0.12)"}
            onMouseLeave={e => e.currentTarget.style.background = "rgba(0,0,0,0.06)"}
          >✕</button>
        </div>

        {/* Chat bubble message */}
        <div style={{ padding: "20px 24px 24px" }}>
          {/* Quote icon */}
          <span style={{ fontSize: "36px", color: msg.color, fontFamily: "Georgia, serif", fontWeight: 900, lineHeight: 1, display: "block", marginBottom: "6px", opacity: 0.7 }}>"</span>

          {/* Message bubble */}
          <div style={{
            background: `linear-gradient(135deg, ${msg.color}12, ${msg.color}06)`,
            border: `1px solid ${msg.color}30`,
            borderRadius: "4px 18px 18px 18px",
            padding: "16px 18px",
            position: "relative",
          }}>
            <p style={{
              color: "#222", fontSize: "15px", lineHeight: 1.8,
              fontFamily: "'Lato', sans-serif", margin: 0, fontWeight: 500,
            }}>
              {msg.msg}
            </p>
          </div>

          {/* Timestamp row */}
          <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "14px", paddingLeft: "4px" }}>
            <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#4ade80" }} />
            <span style={{ fontSize: "11px", color: "#999", fontFamily: "'Lato', sans-serif" }}>Sent with love 💛 · Farewell 2025</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function MessageCard({ msg, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        background: "rgba(255,255,255,0.05)",
        border: "1.5px solid rgba(255,255,255,0.1)",
        borderRadius: "20px", padding: "20px", cursor: "pointer",
        transition: "all 0.3s cubic-bezier(0.34,1.56,0.64,1)",
        backdropFilter: "blur(10px)", position: "relative", overflow: "hidden",
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background = "rgba(255,255,255,0.1)";
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = `0 16px 48px ${msg.color}33`;
        e.currentTarget.style.borderColor = msg.color + "88";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = "rgba(255,255,255,0.05)";
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
      }}
    >
      <div style={{ position: "absolute", inset: 0, background: `radial-gradient(circle at top left, ${msg.color}10, transparent 65%)` }} />
      <div style={{ display: "flex", alignItems: "center", gap: "14px", position: "relative" }}>
        <div style={{
          width: "48px", height: "48px", borderRadius: "50%",
          background: `linear-gradient(135deg, ${msg.color}cc, ${msg.color}55)`,
          border: `2px solid ${msg.color}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "18px", fontWeight: 800, color: "#fff",
          fontFamily: "'Playfair Display', serif", flexShrink: 0,
        }}>
          {msg.avatar}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ color: "#fff", fontWeight: 700, fontSize: "16px", fontFamily: "'Playfair Display', serif" }}>{msg.name}</div>
          <div style={{ color: msg.color, fontSize: "11px", fontWeight: 600, letterSpacing: "1.5px", textTransform: "uppercase", marginTop: "2px" }}>{msg.role}</div>
        </div>
        {/* Message preview icon */}
        <div style={{
          width: "32px", height: "32px", borderRadius: "50%",
          background: `${msg.color}22`, border: `1px solid ${msg.color}55`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "14px", flexShrink: 0,
        }}>💬</div>
      </div>
      <p style={{
        color: "rgba(255,255,255,0.4)", fontSize: "12px", fontFamily: "'Lato', sans-serif",
        marginTop: "12px", lineHeight: 1.5, position: "relative",
        overflow: "hidden", display: "-webkit-box",
        WebkitLineClamp: 2, WebkitBoxOrient: "vertical",
      }}>
        {msg.msg}
      </p>
      <div style={{ marginTop: "10px", position: "relative" }}>
        <span style={{ fontSize: "11px", color: msg.color, fontWeight: 600, fontFamily: "'Lato', sans-serif" }}>
          Tap to read full message →
        </span>
      </div>
    </div>
  );
}

function MessagesPage({ onBack }) {
  const [selectedMsg, setSelectedMsg] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => { setTimeout(() => setVisible(true), 50); }, []);

  return (
    <div style={{
      minHeight: "100vh", padding: "100px 24px 80px",
      position: "relative", zIndex: 1,
      opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(24px)",
      transition: "opacity 0.5s ease, transform 0.5s ease",
    }}>
      <BackButton onBack={onBack} />
      {selectedMsg && <MessageModal msg={selectedMsg} onClose={() => setSelectedMsg(null)} />}

      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <p style={{ fontSize: "12px", letterSpacing: "4px", color: "#f472b6", textTransform: "uppercase", marginBottom: "16px" }}>
            💌 Words From Your Team Members
          </p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 700, color: "#fff" }}>
            With Love &{" "}
            <span style={{ background: "linear-gradient(90deg, #f472b6, #818cf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Gratitude</span>
          </h2>
          <p style={{ color: "rgba(255,255,255,0.4)", marginTop: "12px", fontSize: "14px" }}>Click a card to read the message</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "20px" }}>
          {MESSAGES.map((msg, i) => (
            <MessageCard key={i} msg={msg} onClick={() => setSelectedMsg(msg)} />
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Floating Chat Bubbles ──────────────────────────────────────────────────

const SCATTERED_BUBBLES = [
  // top-left
  {
    text: "Is the backend running? 🔌",
    sender: "Sushmitha",
    bg: "linear-gradient(135deg, #e0e7ff, #eef2ff)",
    border: "rgba(129,140,248,0.35)",
    accentColor: "#4f46e5",
    textColor: "#1e1b4b",
    senderColor: "#6366f1",
    shadow: "0 8px 32px rgba(99,102,241,0.2)",
    style: { top: "8%", left: "3%", animation: "floatBobLeft 3.2s ease-in-out infinite" },
    delay: 400,
  },
  // mid-left
  {
    text: "Is the VM running Surya? 💻",
    sender: "Sushmitha",
    bg: "linear-gradient(135deg, #d1fae5, #ecfdf5)",
    border: "rgba(52,211,153,0.35)",
    accentColor: "#065f46",
    textColor: "#064e3b",
    senderColor: "#059669",
    shadow: "0 8px 32px rgba(52,211,153,0.2)",
    style: { top: "44%", left: "1%", animation: "floatBobLeft 2.8s 0.4s ease-in-out infinite" },
    delay: 900,
  },
  // top-right
  {
    text: "Is my screen visible? 🖥️",
    sender: "Sushmitha",
    bg: "linear-gradient(135deg, #fce7f3, #fdf2f8)",
    border: "rgba(244,114,182,0.35)",
    accentColor: "#9d174d",
    textColor: "#831843",
    senderColor: "#db2777",
    shadow: "0 8px 32px rgba(244,114,182,0.2)",
    style: { top: "8%", right: "3%", animation: "floatBobRight 3.5s ease-in-out infinite" },
    delay: 700,
  },
  // mid-right
  {
    text: "I am not able to connect the VM 😭",
    sender: "Sushmitha",
    bg: "linear-gradient(135deg, #fef3c7, #fffbeb)",
    border: "rgba(251,191,36,0.4)",
    accentColor: "#92400e",
    textColor: "#78350f",
    senderColor: "#d97706",
    shadow: "0 8px 32px rgba(251,191,36,0.2)",
    style: { top: "44%", right: "1%", animation: "floatBobRight 3s 0.6s ease-in-out infinite" },
    delay: 1200,
  },
];

function ScatteredBubble({ bubble, visible }) {
  return (
    <div style={{
      position: "absolute",
      ...bubble.style,
      zIndex: 2,
      width: "220px",
      opacity: visible ? 1 : 0,
      transform: visible ? "scale(1) translateY(0)" : "scale(0.9) translateY(12px)",
      transition: "opacity 0.6s ease, transform 0.6s cubic-bezier(0.34,1.56,0.64,1)",
    }}>
      <div style={{
        background: bubble.bg,
        borderRadius: "16px",
        padding: "16px 18px",
        boxShadow: bubble.shadow,
        border: `1.5px solid ${bubble.border}`,
      }}>
        {/* Phrase text */}
        <p style={{
          fontSize: "14px", color: bubble.textColor, fontFamily: "'Playfair Display', serif",
          lineHeight: 1.55, margin: "0 0 12px", fontWeight: 700, fontStyle: "italic",
        }}>
          "{bubble.text}"
        </p>
        {/* Divider */}
        <div style={{ height: "1px", background: bubble.border, marginBottom: "10px" }} />
        {/* Sender */}
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <div style={{
            width: "6px", height: "6px", borderRadius: "50%",
            background: bubble.senderColor, flexShrink: 0,
          }} />
          <span style={{
            fontSize: "11px", color: bubble.senderColor,
            fontWeight: 700, fontFamily: "'Lato', sans-serif", letterSpacing: "0.5px",
          }}>
            {bubble.sender}
          </span>
        </div>
      </div>
    </div>
  );
}

function ScatteredChat() {
  const [visibleSet, setVisibleSet] = useState(new Set());
  useEffect(() => {
    const timers = SCATTERED_BUBBLES.map((b, i) =>
      setTimeout(() => setVisibleSet(prev => new Set([...prev, i])), b.delay)
    );
    return () => timers.forEach(clearTimeout);
  }, []);
  return (
    <>
      {SCATTERED_BUBBLES.map((b, i) => (
        <ScatteredBubble key={i} bubble={b} visible={visibleSet.has(i)} />
      ))}
    </>
  );
}

// ── PAGE: Home ─────────────────────────────────────────────────────────────

function HomePage({ onNavigate }) {
  const [confetti, setConfetti] = useState(false);
  const [typed, setTyped] = useState("");
  const [visible, setVisible] = useState(false);
  const fullText = "Thank you for everything you've built, taught, and inspired. 🌸";

  useEffect(() => { setTimeout(() => setVisible(true), 50); }, []);

  useEffect(() => {
    let i = 0;
    const t = setTimeout(() => {
      const interval = setInterval(() => {
        i++;
        setTyped(fullText.slice(0, i));
        if (i >= fullText.length) clearInterval(interval);
      }, 40);
    }, 800);
    return () => clearTimeout(t);
  }, []);

  const fireConfetti = () => {
    setConfetti(true);
    setTimeout(() => setConfetti(false), 5000);
  };

  return (
    <>
      <Confetti active={confetti} />
      <div style={{
        display: "flex", flexDirection: "column", alignItems: "center",
        justifyContent: "center", minHeight: "100vh",
        padding: "24px 24px", textAlign: "center", position: "relative", zIndex: 1,
        opacity: visible ? 1 : 0, transition: "opacity 0.6s ease", gap: "0px",
      }}>

        {/* Scattered speech bubbles */}
        <ScatteredChat />
        {/* Avatar — smaller */}
        <div style={{ position: "relative", width: "110px", height: "110px", marginBottom: "20px" }}>
          <div style={{ position: "absolute", inset: "-12px", borderRadius: "50%", border: "2px solid #f472b655", animation: "pulseRing 2s ease-out infinite" }} />
          <div style={{ position: "absolute", inset: "-12px", borderRadius: "50%", border: "2px solid #818cf855", animation: "pulseRing 2s 0.7s ease-out infinite" }} />
          <div style={{ width: "110px", height: "110px", borderRadius: "50%", background: "linear-gradient(135deg, #f472b6, #818cf8, #34d399)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "46px", boxShadow: "0 0 40px rgba(244,114,182,0.4), 0 0 80px rgba(129,140,248,0.2)", position: "relative", zIndex: 2 }}>
            👩‍💻
          </div>
          {["⭐", "💛", "🌸"].map((em, i) => (
            <div key={i} style={{ position: "absolute", top: "50%", left: "50%", marginTop: "-10px", marginLeft: "-10px", width: "20px", height: "20px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", animation: `orbit ${4 + i * 1.5}s ${i * 1.2}s linear infinite`, zIndex: 3 }}>
              {em}
            </div>
          ))}
        </div>

        {/* Title — tighter */}
        <div style={{ animation: "fadeSlideUp 0.8s 0.2s both", marginBottom: "10px" }}>
          <p style={{ fontSize: "11px", letterSpacing: "4px", textTransform: "uppercase", color: "#f472b6", fontWeight: 700, marginBottom: "6px" }}>Farewell to Our</p>
          <h1 style={{ fontSize: "clamp(36px, 6vw, 60px)", fontFamily: "'Playfair Display', serif", fontWeight: 900, lineHeight: 1.05, background: "linear-gradient(90deg, #fbbf24, #f472b6, #818cf8, #34d399)", backgroundSize: "300% auto", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", animation: "shimmer 4s linear infinite", marginBottom: "4px" }}>Frontend</h1>
          <h1 style={{ fontSize: "clamp(36px, 6vw, 60px)", fontFamily: "'Playfair Display', serif", fontWeight: 900, lineHeight: 1.05, color: "#ffffff", marginBottom: "0" }}>Superstar ✨</h1>
        </div>

        {/* Typewriter — compact */}
        <div style={{ animation: "fadeSlideUp 0.8s 0.4s both", maxWidth: "500px", marginBottom: "24px" }}>
          <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.7)", lineHeight: 1.6, fontStyle: "italic", fontFamily: "'Playfair Display', serif", minHeight: "28px" }}>
            {typed}<span style={{ opacity: typed.length < fullText.length ? 1 : 0 }}>|</span>
          </p>
        </div>

        {/* Nav buttons — side by side, compact */}
        <div style={{ animation: "fadeSlideUp 0.8s 0.6s both", display: "flex", gap: "16px", flexWrap: "wrap", justifyContent: "center", marginBottom: "20px" }}>
          {/* Memories button */}
          <button onClick={() => onNavigate("memories")} style={{
            display: "flex", alignItems: "center", gap: "14px",
            padding: "14px 28px", borderRadius: "14px",
            background: "linear-gradient(135deg, #1e3a5f, #1a2a4a)",
            border: "1.5px solid rgba(96,165,250,0.4)",
            color: "#fff", fontWeight: 700, fontSize: "14px",
            cursor: "pointer", fontFamily: "'Lato', sans-serif",
            boxShadow: "0 8px 24px rgba(96,165,250,0.2)",
            transition: "transform 0.25s, box-shadow 0.25s, border-color 0.25s",
            minWidth: "190px", textAlign: "left",
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 14px 40px rgba(96,165,250,0.35)"; e.currentTarget.style.borderColor = "rgba(96,165,250,0.8)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(96,165,250,0.2)"; e.currentTarget.style.borderColor = "rgba(96,165,250,0.4)"; }}>
            <div style={{ fontSize: "26px", flexShrink: 0 }}>📸</div>
            <div>
              <div style={{ fontSize: "14px", fontWeight: 700 }}>Our Memories</div>
              <div style={{ fontSize: "11px", color: "#60a5fa", marginTop: "2px", fontWeight: 400 }}>Photos & moments</div>
            </div>
          </button>

          {/* Messages button */}
          <button onClick={() => onNavigate("messages")} style={{
            display: "flex", alignItems: "center", gap: "14px",
            padding: "14px 28px", borderRadius: "14px",
            background: "linear-gradient(135deg, #3d1a3a, #2a1230)",
            border: "1.5px solid rgba(244,114,182,0.4)",
            color: "#fff", fontWeight: 700, fontSize: "14px",
            cursor: "pointer", fontFamily: "'Lato', sans-serif",
            boxShadow: "0 8px 24px rgba(244,114,182,0.2)",
            transition: "transform 0.25s, box-shadow 0.25s, border-color 0.25s",
            minWidth: "190px", textAlign: "left",
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 14px 40px rgba(244,114,182,0.35)"; e.currentTarget.style.borderColor = "rgba(244,114,182,0.8)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(244,114,182,0.2)"; e.currentTarget.style.borderColor = "rgba(244,114,182,0.4)"; }}>
            <div style={{ fontSize: "26px", flexShrink: 0 }}>💌</div>
            <div>
              <div style={{ fontSize: "14px", fontWeight: 700 }}>Team Messages</div>
              <div style={{ fontSize: "11px", color: "#f472b6", marginTop: "2px", fontWeight: 400 }}>Words from the heart</div>
            </div>
          </button>
        </div>

        {/* Confetti button */}
        <div style={{ animation: "fadeSlideUp 0.8s 0.8s both" }}>
          <button onClick={fireConfetti} style={{ padding: "10px 24px", borderRadius: "999px", background: "rgba(255,255,255,0.07)", color: "#fff", fontWeight: 600, fontSize: "13px", border: "1px solid rgba(255,255,255,0.15)", cursor: "pointer", fontFamily: "'Lato', sans-serif", transition: "background 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.13)"}
            onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.07)"}>
            🎉 Celebrate Her!
          </button>
        </div>

        {/* Footer */}
        <p style={{ marginTop: "14px", color: "rgba(255,255,255,0.2)", fontSize: "11px", letterSpacing: "1px" }}>
          Made with ❤️ by your team · Keep building beautiful things
        </p>
      </div>
    </>
  );
}

// ── Root App ───────────────────────────────────────────────────────────────

export default function FarewellApp() {
  const [page, setPage] = useState("home");

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=Lato:wght@300;400;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { overflow-x: hidden; }
        @keyframes floatUp {
          0% { transform: translateY(0) scale(1); opacity: 0.35; }
          80% { opacity: 0.2; }
          100% { transform: translateY(-110vh) scale(0.6); opacity: 0; }
        }
        @keyframes confettiFall {
          0% { transform: translateY(-20px) rotate(0deg); opacity: 1; }
          100% { transform: translateY(110vh) rotate(720deg); opacity: 0; }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulseRing {
          0% { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(1.6); opacity: 0; }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes orbit {
          from { transform: rotate(0deg) translateX(90px) rotate(0deg); }
          to { transform: rotate(360deg) translateX(90px) rotate(-360deg); }
        }
        @keyframes beatHeart {
          0%, 100% { transform: scale(1); }
          25% { transform: scale(1.15); }
          50% { transform: scale(1); }
          75% { transform: scale(1.08); }
        }
        @keyframes floatBobLeft {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-7px); }
        }
        @keyframes floatBobRight {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-9px); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes popIn {
          from { opacity: 0; transform: scale(0.88) translateY(16px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #0d0d1a; }
        ::-webkit-scrollbar-thumb { background: #4f4f7a; border-radius: 3px; }
      `}</style>

      <FloatingParticles />

      <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #0d0d1a 0%, #1a0d2e 40%, #0d1a2e 100%)", color: "#fff", fontFamily: "'Lato', sans-serif", position: "relative" }}>
        {page === "home"      && <HomePage      onNavigate={setPage} />}
        {page === "memories"  && <MemoriesPage  onBack={() => setPage("home")} />}
        {page === "messages"  && <MessagesPage  onBack={() => setPage("home")} />}
      </div>
    </>
  );
}