import { useState, useEffect, useRef } from "react";

const MESSAGES = [
  { name: "Nitin", msg: "Sushmitha has been a valuable part of our team, contributing greatly in Aws, QuickSight and Ul. Coming from Hyderabad, she blended well with the team and even spoke Hindi comfortably. Her kind nature and quick learning ability made working with her a pleasure. Wishing her all the very best for the future.", color: "#fb923c", avatar: "N" },
  { name: "Surya",  msg: "Working alongside you has been the highlight of my career so far. You always had the perfect Explanation — and somehow made it look effortless. ", color: "#f59e0b", avatar: "S" },
  { name: "Gowtham",  msg: "Your ability to quickly understand the backend and connect it seamlessly with the UI is impressive. You communicate clearly and confidently in demos. It’s been great working with someone who is sharp, a great listener, and has a wonderful personality.", color: "#f472b6", avatar: "D" },
  { name: "Ganesh",  msg: "I just wanted to say it was really great working with you. You made frontend look effortless, and I always appreciated how patient and helpful you were whenever we needed something from your side.All the best for your new journey", color: "#10b981", avatar: "G" },
  { name: "Tejaswini",  msg: "Hii Sushmitha, Working with you has been a great learning experience. Your ability to turn ideas into beautiful Ul has inspired me and the team. All the very best for your future endeavors!", color: "#818cf8", avatar: "T" },
  // { name: "manish",  color: "#34d399", avatar: "M" },
];

const PHOTOS = [
  { id: 1, url: "images/nitin_img.jpeg" },
  { id: 2, url: "images/surya_img.jpeg" },
  { id: 3, url: "images/gowtham_img.jpeg" },
  { id: 4, url: "images/ganesh_img.jpeg" },
  { id: 5, url: "images/tejaswini_img.jpeg" },
  // {id:6,url :""},
 
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

// ── COMBINED PAGE: Memories + Messages ────────────────────────────────────

function MessageModal({ msg, onClose }) {
  if (!msg) return null;
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 200, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px", animation: "fadeIn 0.25s ease" }}>
      <div onClick={e => e.stopPropagation()} style={{ background: "#fff", borderRadius: "24px", width: "100%", maxWidth: "460px", boxShadow: "0 32px 80px rgba(0,0,0,0.4)", overflow: "hidden", animation: "popIn 0.35s cubic-bezier(0.34,1.56,0.64,1)" }}>
        <div style={{ height: "5px", background: `linear-gradient(90deg, ${msg.color}, ${msg.color}88)` }} />
        <div style={{ display: "flex", alignItems: "center", gap: "14px", padding: "20px 24px 16px", borderBottom: "1px solid rgba(0,0,0,0.07)" }}>
          <div style={{ width: "52px", height: "52px", borderRadius: "50%", background: `linear-gradient(135deg, ${msg.color}cc, ${msg.color}55)`, border: `2px solid ${msg.color}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", fontWeight: 800, color: "#fff", fontFamily: "'Playfair Display', serif", flexShrink: 0, boxShadow: `0 4px 16px ${msg.color}44` }}>{msg.avatar}</div>
          <div style={{ flex: 1 }}>
            <div style={{ color: "#111", fontWeight: 700, fontSize: "17px", fontFamily: "'Playfair Display', serif" }}>{msg.name}</div>
            <div style={{ color: msg.color, fontSize: "11px", fontWeight: 600, letterSpacing: "1.5px", textTransform: "uppercase", marginTop: "2px" }}>{msg.role}</div>
          </div>
          <button onClick={onClose} style={{ width: "32px", height: "32px", borderRadius: "50%", background: "rgba(0,0,0,0.06)", border: "none", cursor: "pointer", fontSize: "16px", color: "#666", display: "flex", alignItems: "center", justifyContent: "center" }}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(0,0,0,0.12)"}
            onMouseLeave={e => e.currentTarget.style.background = "rgba(0,0,0,0.06)"}>✕</button>
        </div>
        <div style={{ padding: "20px 24px 24px" }}>
          <span style={{ fontSize: "36px", color: msg.color, fontFamily: "Georgia, serif", fontWeight: 900, lineHeight: 1, display: "block", marginBottom: "6px", opacity: 0.7 }}>"</span>
          <div style={{ background: `linear-gradient(135deg, ${msg.color}12, ${msg.color}06)`, border: `1px solid ${msg.color}30`, borderRadius: "4px 18px 18px 18px", padding: "16px 18px" }}>
            <p style={{ color: "#222", fontSize: "15px", lineHeight: 1.8, fontFamily: "'Lato', sans-serif", margin: 0, fontWeight: 500 }}>{msg.msg}</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "14px" }}>
            <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#4ade80" }} />
            <span style={{ fontSize: "11px", color: "#999", fontFamily: "'Lato', sans-serif" }}>Sent with love 💛 · Farewell 2025</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function MemoriesPage({ onBack }) {
  const [current, setCurrent] = useState(0);
  const [animDir, setAnimDir] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [visible, setVisible] = useState(false);
  const [selectedMsg, setSelectedMsg] = useState(null);


  useEffect(() => { setTimeout(() => setVisible(true), 50); }, []);

  const goTo = (idx, dir) => {
    if (isAnimating) return;
    setAnimDir(dir);
    setIsAnimating(true);
    setTimeout(() => { setCurrent(idx); setIsAnimating(false); setAnimDir(null); }, 380);
  };

  const prev = () => goTo((current - 1 + PHOTOS.length) % PHOTOS.length, "left");
  const next = () => goTo((current + 1) % PHOTOS.length, "right");



  const photo = PHOTOS[current];
  const msg = MESSAGES[current % MESSAGES.length];
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
      {selectedMsg && <MessageModal msg={selectedMsg} onClose={() => setSelectedMsg(null)} />}

      <p style={{ fontSize: "11px", letterSpacing: "4px", color: "#60a5fa", textTransform: "uppercase", marginBottom: "8px" }}>📸 Moments & Messages</p>
      <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(22px, 3vw, 34px)", fontWeight: 700, marginBottom: "20px", color: "#fff", textAlign: "center" }}>
        Our <span style={{ color: "#60a5fa", fontStyle: "italic" }}>Memories</span> &{" "}
        <span style={{ background: "linear-gradient(90deg, #f472b6, #818cf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Words</span>
      </h2>

      <div style={{ width: "100%", maxWidth: "1100px" }}>
        {/* Carousel row */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>

          {/* Prev thumb */}
          <div onClick={prev} style={{ width: "52px", flexShrink: 0, cursor: "pointer", opacity: 0.4, transition: "opacity 0.3s, transform 0.3s", transform: "scale(0.92)" }}
            onMouseEnter={e => { e.currentTarget.style.opacity = "0.7"; e.currentTarget.style.transform = "scale(0.97)"; }}
            onMouseLeave={e => { e.currentTarget.style.opacity = "0.4"; e.currentTarget.style.transform = "scale(0.92)"; }}>
            <div style={{ borderRadius: "10px", overflow: "hidden", height: "70px" }}>
              <img src={PHOTOS[prevIdx].url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
          </div>

          {/* Main card — photo left, message right */}
          <div style={{
            flex: 1,
transition: "opacity 0.3s ease",
            opacity: isAnimating ? 0 : 1,
          }}>
            <div style={{
              display: "grid", gridTemplateColumns: "1fr 1fr",
              borderRadius: "20px", overflow: "hidden",
              boxShadow: `0 24px 64px rgba(0,0,0,0.5), 0 0 0 1px ${msg.color}22`,
            }}>

              {/* Photo side */}
              <div style={{ position: "relative", minHeight: "420px" }}>
                <img src={photo.url} alt={photo.caption} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", position: "absolute", inset: 0 }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.1) 50%)" }} />
                <div style={{ position: "absolute", top: "16px", left: "16px", background: "rgba(96,165,250,0.25)", border: "1px solid rgba(96,165,250,0.5)", color: "#60a5fa", padding: "3px 12px", borderRadius: "999px", fontSize: "10px", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", backdropFilter: "blur(8px)" }}>
                  {photo.tag}
                </div>
                <div style={{ position: "absolute", bottom: "20px", left: "20px", right: "20px" }}>
                  <p style={{ color: "#fff", fontSize: "16px", fontWeight: 700, fontFamily: "'Playfair Display', serif", textShadow: "0 2px 8px rgba(0,0,0,0.6)" }}>{photo.caption}</p>
                </div>
              </div>

              {/* Message side */}
              <div style={{
                padding: "32px 28px",
                background: `linear-gradient(160deg, ${msg.color}15, rgba(13,13,26,0.95))`,
                borderLeft: `1px solid ${msg.color}30`,
                display: "flex", flexDirection: "column",
              }}>
                <div style={{ height: "3px", background: `linear-gradient(90deg, ${msg.color}, transparent)`, borderRadius: "2px", marginBottom: "20px" }} />
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
                  <div style={{
                    width: "48px", height: "48px", borderRadius: "50%", flexShrink: 0,
                    background: `linear-gradient(135deg, ${msg.color}cc, ${msg.color}55)`,
                    border: `2px solid ${msg.color}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "18px", fontWeight: 800, color: "#fff",
                    boxShadow: `0 0 16px ${msg.color}44`,
                  }}>{msg.avatar}</div>
                  <div>
                    <div style={{ color: "#fff", fontWeight: 700, fontSize: "18px", fontFamily: "'Playfair Display', serif" }}>{msg.name}</div>
                    <div style={{ color: msg.color, fontSize: "11.5px", fontWeight: 600, letterSpacing: "1.5px", textTransform: "uppercase", marginTop: "2px" }}>{msg.role}</div>
                  </div>
                  <span style={{ marginLeft: "auto", fontSize: "24px", color: msg.color, fontFamily: "Georgia, serif", fontWeight: 900, opacity: 0.5, alignSelf: "flex-start" }}>"</span>
                </div>
                <p style={{
                  color: "rgba(255,255,255,0.88)", fontSize: "15.5px", lineHeight: 1.85,
                  fontFamily: "'Lato', sans-serif", flex: 1,
                  borderLeft: `2px solid ${msg.color}55`, paddingLeft: "14px",
                  marginBottom: "16px",
                }}>{msg.msg}</p>
                <button onClick={() => setSelectedMsg(msg)} style={{
                  alignSelf: "flex-start", padding: "8px 18px", borderRadius: "999px",
                  background: `${msg.color}20`, border: `1px solid ${msg.color}55`,
                  color: msg.color, fontSize: "11px", fontWeight: 700,
                  cursor: "pointer", fontFamily: "'Lato', sans-serif", transition: "background 0.2s",
                }}
                  onMouseEnter={e => e.currentTarget.style.background = `${msg.color}40`}
                  onMouseLeave={e => e.currentTarget.style.background = `${msg.color}20`}
                >💬 Read full message</button>
              </div>
            </div>
          </div>

          {/* Next thumb */}
          <div onClick={next} style={{ width: "52px", flexShrink: 0, cursor: "pointer", opacity: 0.4, transition: "opacity 0.3s, transform 0.3s", transform: "scale(0.92)" }}
            onMouseEnter={e => { e.currentTarget.style.opacity = "0.7"; e.currentTarget.style.transform = "scale(0.97)"; }}
            onMouseLeave={e => { e.currentTarget.style.opacity = "0.4"; e.currentTarget.style.transform = "scale(0.92)"; }}>
            <div style={{ borderRadius: "10px", overflow: "hidden", height: "70px" }}>
              <img src={PHOTOS[nextIdx].url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
          </div>
        </div>

        {/* Controls */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", marginTop: "14px" }}>
          <button onClick={prev} style={{ width: "40px", height: "40px", borderRadius: "50%", background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.15)", color: "#fff", fontSize: "18px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.15)"}
            onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.07)"}>←</button>
          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            {PHOTOS.map((_, i) => (
              <button key={i} onClick={() => goTo(i, i > current ? "right" : "left")} style={{ width: i === current ? "24px" : "8px", height: "8px", borderRadius: "999px", background: i === current ? MESSAGES[i % MESSAGES.length].color : "rgba(255,255,255,0.25)", border: "none", cursor: "pointer", padding: 0, transition: "all 0.3s ease" }} />
            ))}
          </div>
          <button onClick={next} style={{ width: "40px", height: "40px", borderRadius: "50%", background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.15)", color: "#fff", fontSize: "18px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.15)"}
            onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.07)"}>→</button>
        </div>
        <p style={{ marginTop: "8px", color: "rgba(255,255,255,0.3)", fontSize: "12px", letterSpacing: "1px", textAlign: "center" }}>{current + 1} / {PHOTOS.length}</p>

        {/* Thumbnail strip */}
        <div style={{ display: "flex", gap: "8px", marginTop: "14px", flexWrap: "wrap", justifyContent: "center" }}>
          {PHOTOS.map((p, i) => (
            <div key={p.id} onClick={() => goTo(i, i > current ? "right" : "left")} style={{
              width: "68px", height: "46px", borderRadius: "8px", overflow: "hidden", cursor: "pointer",
              border: `2px solid ${i === current ? MESSAGES[i % MESSAGES.length].color : "transparent"}`,
              opacity: i === current ? 1 : 0.5, transition: "all 0.25s ease", flexShrink: 0,
            }}
              onMouseEnter={e => { if (i !== current) e.currentTarget.style.opacity = "0.8"; }}
              onMouseLeave={e => { if (i !== current) e.currentTarget.style.opacity = "0.5"; }}>
              <img src={p.url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Floating Chat Bubbles ──────────────────────────────────────────────────

const CATCHPHRASES = [
  {
    text: "Is the backend running? 🔌",
    bg: "linear-gradient(135deg, #e0e7ff, #eef2ff)",
    border: "rgba(129,140,248,0.35)", textColor: "#1e1b4b", senderColor: "#6366f1",
    shadow: "0 8px 32px rgba(99,102,241,0.2)",
  },
  {
    text: "Is the VM running Surya? 💻",
    bg: "linear-gradient(135deg, #d1fae5, #ecfdf5)",
    border: "rgba(52,211,153,0.35)", textColor: "#064e3b", senderColor: "#059669",
    shadow: "0 8px 32px rgba(52,211,153,0.2)",
  },
  {
    text: "Is my screen visible? 🖥️",
    bg: "linear-gradient(135deg, #fce7f3, #fdf2f8)",
    border: "rgba(244,114,182,0.35)", textColor: "#831843", senderColor: "#db2777",
    shadow: "0 8px 32px rgba(244,114,182,0.2)",
  },
  {
    text: "I am not able to connect the VM 😭",
    bg: "linear-gradient(135deg, #fef3c7, #fffbeb)",
    border: "rgba(251,191,36,0.4)", textColor: "#78350f", senderColor: "#d97706",
    shadow: "0 8px 32px rgba(251,191,36,0.2)",
  },
  {
    text: "Can we connect once? 📞",
    bg: "linear-gradient(135deg, #ffe4e6, #fff1f2)",
    border: "rgba(251,113,133,0.35)", textColor: "#881337", senderColor: "#e11d48",
    shadow: "0 8px 32px rgba(251,113,133,0.2)",
  },
  {
    text: "I am getting 500 error 🚨",
    bg: "linear-gradient(135deg, #ffedd5, #fff7ed)",
    border: "rgba(249,115,22,0.35)", textColor: "#7c2d12", senderColor: "#ea580c",
    shadow: "0 8px 32px rgba(249,115,22,0.2)",
  },
];

// ── PAGE: Final Message ────────────────────────────────────────────────────

const SURROUNDING_IMAGES = [
  // LEFT column
  { url: "images/group_image1.jpeg", top: "2%",  left: "16%", size: 200, rotate: -6 },
  { url: "images/group_image5.jpeg", top: "35%", left: "12%", size: 188, rotate: -4 },
  { url: "images/group_image3.jpeg", top: "68%", left: "16%", size: 188, rotate: -8 },
  // RIGHT column — pushed further right
  { url: "images/group_image2.jpeg", top: "2%",  left: "65%", size: 185, rotate: 5  },
  { url: "images/picatrjp.png",      top: "35%", left: "70%", size: 200, rotate: 6  },
  { url: "images/group_image4.jpeg", top: "68%", left: "66%", size: 186, rotate: 7  },
];

function FinalPage({ onBack }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => { setTimeout(() => setVisible(true), 80); }, []);

  return (
    <div style={{
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      position: "relative", zIndex: 1, overflow: "hidden",
      opacity: visible ? 1 : 0, transition: "opacity 0.7s ease",
    }}>
      <BackButton onBack={onBack} />

      {/* Scattered images */}
      {SURROUNDING_IMAGES.map((img, i) => (
        <div key={i} style={{
          position: "absolute",
          top: img.top, left: img.left,
          width: `${img.size}px`, height: `${img.size}px`,
          borderRadius: "16px", overflow: "hidden",
          boxShadow: "0 8px 32px rgba(0,0,0,0.5), 0 0 0 3px rgba(255,255,255,0.08)",
          animation: `fadeSlideUp 0.6s ${i * 0.1}s both`,
          transform: `rotate(${img.rotate}deg)`,
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          cursor: "default", zIndex: 2,
        }}
          onMouseEnter={e => { e.currentTarget.style.transform = `rotate(0deg) scale(1.1)`; e.currentTarget.style.zIndex = "10"; e.currentTarget.style.boxShadow = "0 16px 48px rgba(0,0,0,0.6), 0 0 0 3px rgba(244,114,182,0.4)"; }}
          onMouseLeave={e => { e.currentTarget.style.transform = `rotate(${img.rotate}deg) scale(1)`; e.currentTarget.style.zIndex = "2"; e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.5), 0 0 0 3px rgba(255,255,255,0.08)"; }}
        >
          <img src={img.url} alt={img.label} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0,
            background: "linear-gradient(to top, rgba(0,0,0,0.75), transparent)",
            padding: "8px 6px 4px",
            fontSize: "9px", color: "rgba(255,255,255,0.9)",
            fontFamily: "'Lato', sans-serif", fontWeight: 700,
            textAlign: "center", letterSpacing: "0.5px", textTransform: "uppercase",
          }}>{img.label}</div>
        </div>
      ))}

      {/* Central message card */}
      <div style={{
        position: "relative", zIndex: 5,
        maxWidth: "340px", textAlign: "center",
        animation: "fadeSlideUp 0.8s 0.3s both",
      }}>
        {/* Glow ring */}
        <div style={{
          position: "absolute", inset: "-40px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(244,114,182,0.15) 0%, rgba(129,140,248,0.1) 50%, transparent 70%)",
          pointerEvents: "none",
        }} />

        <p style={{ fontSize: "11px", letterSpacing: "4px", color: "#f472b6", textTransform: "uppercase", marginBottom: "16px", fontFamily: "'Lato', sans-serif" }}>
          💛 From All of Us
        </p>

        <div style={{
          background: "transparent",
          border: "none",
          padding: "20px 24px",
        }}>
          <div style={{ fontSize: "48px", marginBottom: "16px" }}>👩‍💻</div>

          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(22px, 3.5vw, 36px)", fontWeight: 900,
            color: "#fff", lineHeight: 1.2, marginBottom: "20px",
          }}>
            Goodbye,{" "}
            <span style={{ background: "linear-gradient(90deg, #fbbf24, #f472b6, #818cf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Sushmitha!
            </span>
          </h2>

          <p style={{
            fontSize: "15px", color: "rgba(255,255,255,0.78)",
            fontFamily: "'Playfair Display', serif", fontStyle: "italic",
            lineHeight: 1.8, marginBottom: "24px",
          }}>
           Wishing you  success, happiness, and exciting new adventures ahead..
You will always be a valued part of our team story — we’ll truly miss you.
          </p>

          <div style={{ display: "flex", justifyContent: "center", gap: "6px", flexWrap: "wrap", marginBottom: "20px" }}>
            {["✨ Always", "💛 Missed", "🚀 Legend", "🌸 Forever"].map((tag, i) => (
              <span key={i} style={{
                padding: "4px 14px", borderRadius: "999px",
                background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.15)",
                fontSize: "12px", color: "rgba(255,255,255,0.6)", fontFamily: "'Lato', sans-serif",
              }}>{tag}</span>
            ))}
          </div>

          <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.3)", fontFamily: "'Lato', sans-serif", letterSpacing: "1px" }}>
            Made with ❤️ by your entire team · 2025
          </p>
        </div>
      </div>
    </div>
  );
}

function CatchphrasesPage({ onBack, onNext }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => { setTimeout(() => setVisible(true), 50); }, []);

  return (
    <div style={{
      minHeight: "100vh", display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      padding: "80px 32px 48px", position: "relative", zIndex: 1,
      opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(24px)",
      transition: "opacity 0.5s ease, transform 0.5s ease",
    }}>
      <BackButton onBack={onBack} />

      {/* Heading */}
      <div style={{ textAlign: "center", marginBottom: "48px" }}>
        <p style={{ fontSize: "11px", letterSpacing: "4px", color: "#f472b6", textTransform: "uppercase", marginBottom: "12px", fontFamily: "'Lato', sans-serif" }}>
          💬 Signature Lines
        </p>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(26px, 4vw, 46px)", fontWeight: 900, color: "#fff", lineHeight: 1.15, marginBottom: "12px" }}>
          Quotes We'll Miss{" "}
          <span style={{ background: "linear-gradient(90deg, #fbbf24, #f472b6, #818cf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Hearing</span>
        </h2>
        <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "14px", fontFamily: "'Lato', sans-serif", fontStyle: "italic" }}>
          Things We'll Always Remember You Saying 🌸
        </p>
      </div>

      {/* Cards grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: "20px",
        width: "100%",
        maxWidth: "960px",
      }}>
        {CATCHPHRASES.map((b, i) => (
          <div key={i} style={{
            background: b.bg,
            borderRadius: "20px",
            padding: "24px 26px",
            boxShadow: b.shadow,
            border: `1.5px solid ${b.border}`,
            animation: `fadeSlideUp 0.6s ${i * 0.1}s both`,
            position: "relative",
            overflow: "hidden",
          }}>
            <span style={{
              position: "absolute", top: "-10px", right: "16px",
              fontSize: "80px", color: b.senderColor, opacity: 0.08,
              fontFamily: "Georgia, serif", fontWeight: 900, lineHeight: 1, pointerEvents: "none",
            }}>"</span>
            <span style={{
              fontSize: "22px", color: b.senderColor, fontFamily: "Georgia, serif",
              fontWeight: 900, display: "block", marginBottom: "8px", opacity: 0.7,
            }}>"</span>
            <p style={{
              fontSize: "17px", color: b.textColor, fontFamily: "'Playfair Display', serif",
              lineHeight: 1.6, fontWeight: 700, fontStyle: "italic", margin: "0 0 16px",
            }}>
              {b.text}
            </p>
            <div style={{ height: "1px", background: b.border, marginBottom: "12px" }} />
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: b.senderColor }} />
              <span style={{ fontSize: "11px", color: b.senderColor, fontWeight: 700, fontFamily: "'Lato', sans-serif", letterSpacing: "0.5px" }}>
                Sushmitha
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Next button */}
      <div style={{ marginTop: "44px", animation: "fadeSlideUp 0.6s 0.7s both" }}>
        <button onClick={onNext} style={{
          display: "flex", alignItems: "center", gap: "12px",
          padding: "16px 36px", borderRadius: "999px",
          background: "linear-gradient(135deg, #f472b6, #818cf8)",
          border: "none", color: "#fff", fontWeight: 700, fontSize: "15px",
          cursor: "pointer", fontFamily: "'Lato', sans-serif",
          boxShadow: "0 8px 32px rgba(244,114,182,0.4)",
          transition: "transform 0.25s, box-shadow 0.25s",
        }}
          onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px) scale(1.03)"; e.currentTarget.style.boxShadow = "0 16px 48px rgba(244,114,182,0.5)"; }}
          onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0) scale(1)"; e.currentTarget.style.boxShadow = "0 8px 32px rgba(244,114,182,0.4)"; }}
        >
          <span>💌 See the Final Message</span>
          <span style={{ fontSize: "18px" }}>→</span>
        </button>
      </div>
    </div>
  );
}

// ── PAGE: Home ─────────────────────────────────────────────────────────────

function HomePage({ onNavigate }) {
  const [confetti, setConfetti] = useState(true);
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

        {/* Nav buttons */}
        <div style={{ animation: "fadeSlideUp 0.8s 0.6s both", display: "flex", gap: "14px", flexWrap: "wrap", justifyContent: "center", marginBottom: "20px" }}>
          <button onClick={() => onNavigate("memories")} style={{
            display: "flex", alignItems: "center", gap: "12px",
            padding: "13px 22px", borderRadius: "14px",
            background: "linear-gradient(135deg, #1e3a5f, #1a2a4a)",
            border: "1.5px solid rgba(96,165,250,0.4)",
            color: "#fff", fontWeight: 700, fontSize: "13px",
            cursor: "pointer", fontFamily: "'Lato', sans-serif",
            boxShadow: "0 8px 24px rgba(96,165,250,0.2)",
            transition: "transform 0.25s, box-shadow 0.25s",
            minWidth: "170px",
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 14px 40px rgba(96,165,250,0.4)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(96,165,250,0.2)"; }}>
            <div style={{ fontSize: "22px" }}>📸</div>
            <div>
              <div style={{ fontSize: "13px", fontWeight: 700 }}>Memories & Messages</div>
              <div style={{ fontSize: "10px", color: "#60a5fa", marginTop: "2px", fontWeight: 400 }}>Photos · Words from the heart</div>
            </div>
          </button>

          <button onClick={() => onNavigate("catchphrases")} style={{
            display: "flex", alignItems: "center", gap: "12px",
            padding: "13px 22px", borderRadius: "14px",
            background: "linear-gradient(135deg, #3d1a3a, #2a1230)",
            border: "1.5px solid rgba(244,114,182,0.4)",
            color: "#fff", fontWeight: 700, fontSize: "13px",
            cursor: "pointer", fontFamily: "'Lato', sans-serif",
            boxShadow: "0 8px 24px rgba(244,114,182,0.2)",
            transition: "transform 0.25s, box-shadow 0.25s",
            minWidth: "170px",
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 14px 40px rgba(244,114,182,0.4)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(244,114,182,0.2)"; }}>
            <div style={{ fontSize: "22px" }}>💬</div>
            <div>
              <div style={{ fontSize: "13px", fontWeight: 700 }}>Her Catchphrases</div>
              <div style={{ fontSize: "10px", color: "#f472b6", marginTop: "2px", fontWeight: 400 }}>Quotes we'll miss hearing</div>
            </div>
          </button>
        </div>

        {/* Confetti button */}
        <div style={{ animation: "fadeSlideUp 0.8s 0.8s both" }}>
          {/* <button onClick={fireConfetti} style={{ padding: "10px 24px", borderRadius: "999px", background: "rgba(255,255,255,0.07)", color: "#fff", fontWeight: 600, fontSize: "13px", border: "1px solid rgba(255,255,255,0.15)", cursor: "pointer", fontFamily: "'Lato', sans-serif", transition: "background 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.13)"}
            onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.07)"}>
            🎉 Celebrate Her!
          </button> */}
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
        {page === "home"         && <HomePage         onNavigate={setPage} />}
        {page === "memories"     && <MemoriesPage     onBack={() => setPage("home")} />}
        {page === "catchphrases" && <CatchphrasesPage  onBack={() => setPage("home")} onNext={() => setPage("final")} />}
        {page === "final"        && <FinalPage         onBack={() => setPage("catchphrases")} />}
      </div>
    </>
  );
}