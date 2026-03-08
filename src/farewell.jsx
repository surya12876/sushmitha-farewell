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

function PhotoCarousel() {
  const [current, setCurrent] = useState(0);
  const [animDir, setAnimDir] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const timerRef = useRef(null);

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
    <div style={{ padding: "80px 24px", maxWidth: "900px", margin: "0 auto", textAlign: "center" }}>
      <p style={{ fontSize: "12px", letterSpacing: "4px", color: "#60a5fa", textTransform: "uppercase", marginBottom: "16px" }}>
        📸 Moments We'll Cherish
      </p>
      <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 700, marginBottom: "48px", color: "#fff" }}>
        Our <span style={{ color: "#60a5fa", fontStyle: "italic" }}>Memories</span> Together
      </h2>
      <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center", gap: "20px" }}>
        <div onClick={prev} style={{ width: "80px", height: "110px", borderRadius: "12px", overflow: "hidden", cursor: "pointer", flexShrink: 0, opacity: 0.4, transition: "opacity 0.3s, transform 0.3s", transform: "scale(0.92)" }}
          onMouseEnter={e => { e.currentTarget.style.opacity = "0.7"; e.currentTarget.style.transform = "scale(0.96)"; }}
          onMouseLeave={e => { e.currentTarget.style.opacity = "0.4"; e.currentTarget.style.transform = "scale(0.92)"; }}>
          <img src={PHOTOS[prevIdx].url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
        <div style={{ flex: 1, maxWidth: "640px", position: "relative", borderRadius: "24px", overflow: "hidden", boxShadow: "0 30px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.08)" }}>
          <div style={{ transition: "opacity 0.38s ease, transform 0.38s ease", opacity: isAnimating ? 0 : 1, transform: isAnimating ? `translateX(${animDir === "right" ? "-40px" : "40px"})` : "translateX(0)" }}>
            <img src={photo.url} alt={photo.caption} style={{ width: "100%", height: "380px", objectFit: "cover", display: "block" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 55%)" }} />
            <div style={{ position: "absolute", top: "20px", left: "20px", background: "rgba(96,165,250,0.25)", border: "1px solid rgba(96,165,250,0.5)", color: "#60a5fa", padding: "4px 14px", borderRadius: "999px", fontSize: "11px", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", backdropFilter: "blur(8px)" }}>
              {photo.tag}
            </div>
            <div style={{ position: "absolute", bottom: "24px", left: "24px", right: "24px", textAlign: "left" }}>
              <p style={{ color: "#fff", fontSize: "18px", fontWeight: 700, fontFamily: "'Playfair Display', serif", textShadow: "0 2px 8px rgba(0,0,0,0.5)" }}>{photo.caption}</p>
            </div>
          </div>
        </div>
        <div onClick={next} style={{ width: "80px", height: "110px", borderRadius: "12px", overflow: "hidden", cursor: "pointer", flexShrink: 0, opacity: 0.4, transition: "opacity 0.3s, transform 0.3s", transform: "scale(0.92)" }}
          onMouseEnter={e => { e.currentTarget.style.opacity = "0.7"; e.currentTarget.style.transform = "scale(0.96)"; }}
          onMouseLeave={e => { e.currentTarget.style.opacity = "0.4"; e.currentTarget.style.transform = "scale(0.92)"; }}>
          <img src={PHOTOS[nextIdx].url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "16px", marginTop: "28px" }}>
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
      <p style={{ marginTop: "12px", color: "rgba(255,255,255,0.3)", fontSize: "13px", letterSpacing: "1px" }}>{current + 1} / {PHOTOS.length}</p>
    </div>
  );
}

function MessageCard({ msg, active, onClick }) {
  return (
    <div onClick={onClick} style={{ background: active ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.05)", border: `1.5px solid ${active ? msg.color : "rgba(255,255,255,0.1)"}`, borderRadius: "20px", padding: "24px", cursor: "pointer", transition: "all 0.35s cubic-bezier(0.34,1.56,0.64,1)", transform: active ? "scale(1.03) translateY(-4px)" : "scale(1)", boxShadow: active ? `0 20px 60px ${msg.color}33` : "none", backdropFilter: "blur(10px)", position: "relative", overflow: "hidden" }}>
      {active && <div style={{ position: "absolute", inset: 0, background: `radial-gradient(circle at top left, ${msg.color}18, transparent 70%)`, borderRadius: "20px" }} />}
      <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: active ? "16px" : "0" }}>
        <div style={{ width: "48px", height: "48px", borderRadius: "50%", background: `linear-gradient(135deg, ${msg.color}cc, ${msg.color}55)`, border: `2px solid ${msg.color}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", fontWeight: 800, color: "#fff", fontFamily: "'Playfair Display', serif", flexShrink: 0, boxShadow: active ? `0 0 20px ${msg.color}55` : "none", transition: "box-shadow 0.3s ease" }}>
          {msg.avatar}
        </div>
        <div>
          <div style={{ color: "#fff", fontWeight: 700, fontSize: "16px", fontFamily: "'Playfair Display', serif" }}>{msg.name}</div>
          <div style={{ color: msg.color, fontSize: "11px", fontWeight: 600, letterSpacing: "1.5px", textTransform: "uppercase", marginTop: "2px" }}>{msg.role}</div>
        </div>
        <div style={{ marginLeft: "auto", width: "24px", height: "24px", borderRadius: "50%", background: `${msg.color}22`, border: `1px solid ${msg.color}44`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", transition: "transform 0.3s ease", flexShrink: 0, transform: active ? "rotate(180deg)" : "rotate(0deg)" }}>↓</div>
      </div>
      {active && (
        <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "15px", lineHeight: 1.8, fontFamily: "'Lato', sans-serif", position: "relative", paddingLeft: "62px", borderLeft: `2px solid ${msg.color}44` }}>
          {msg.msg}
        </p>
      )}
    </div>
  );
}

export default function FarewellApp() {
  const [activeCard, setActiveCard] = useState(null);
  const [confetti, setConfetti] = useState(false);
  const [typed, setTyped] = useState("");
  const fullText = "Thank you for everything you've built, taught, and inspired. 🌸";

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
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #0d0d1a; }
        ::-webkit-scrollbar-thumb { background: #4f4f7a; border-radius: 3px; }
      `}</style>

      <Confetti active={confetti} />
      <FloatingParticles />

      <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #0d0d1a 0%, #1a0d2e 40%, #0d1a2e 100%)", color: "#fff", fontFamily: "'Lato', sans-serif", position: "relative", zIndex: 1 }}>

        {/* Hero */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh", padding: "60px 24px", textAlign: "center", position: "relative" }}>
          <div style={{ position: "relative", width: "180px", height: "180px", marginBottom: "40px" }}>
            <div style={{ position: "absolute", inset: "-20px", borderRadius: "50%", border: "2px solid #f472b655", animation: "pulseRing 2s ease-out infinite" }} />
            <div style={{ position: "absolute", inset: "-20px", borderRadius: "50%", border: "2px solid #818cf855", animation: "pulseRing 2s 0.7s ease-out infinite" }} />
            <div style={{ width: "180px", height: "180px", borderRadius: "50%", background: "linear-gradient(135deg, #f472b6, #818cf8, #34d399)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "72px", boxShadow: "0 0 60px rgba(244,114,182,0.4), 0 0 120px rgba(129,140,248,0.2)", position: "relative", zIndex: 2 }}>
              👩‍💻
            </div>
            {["⭐", "💛", "🌸"].map((em, i) => (
              <div key={i} style={{ position: "absolute", top: "50%", left: "50%", marginTop: "-14px", marginLeft: "-14px", width: "28px", height: "28px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", animation: `orbit ${4 + i * 1.5}s ${i * 1.2}s linear infinite`, zIndex: 3 }}>
                {em}
              </div>
            ))}
          </div>

          <div style={{ animation: "fadeSlideUp 0.8s 0.2s both" }}>
            <p style={{ fontSize: "13px", letterSpacing: "4px", textTransform: "uppercase", color: "#f472b6", fontWeight: 700, marginBottom: "12px" }}>Farewell to Our</p>
            <h1 style={{ fontSize: "clamp(42px, 8vw, 80px)", fontFamily: "'Playfair Display', serif", fontWeight: 900, lineHeight: 1.1, background: "linear-gradient(90deg, #fbbf24, #f472b6, #818cf8, #34d399)", backgroundSize: "300% auto", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", animation: "shimmer 4s linear infinite", marginBottom: "8px" }}>Frontend</h1>
            <h1 style={{ fontSize: "clamp(42px, 8vw, 80px)", fontFamily: "'Playfair Display', serif", fontWeight: 900, lineHeight: 1.1, color: "#ffffff", marginBottom: "24px" }}>Superstar ✨</h1>
          </div>

          <div style={{ animation: "fadeSlideUp 0.8s 0.4s both", maxWidth: "560px", marginBottom: "40px" }}>
            <p style={{ fontSize: "18px", color: "rgba(255,255,255,0.75)", lineHeight: 1.8, fontStyle: "italic", fontFamily: "'Playfair Display', serif", minHeight: "60px" }}>
              {typed}<span style={{ opacity: typed.length < fullText.length ? 1 : 0 }}>|</span>
            </p>
          </div>

          <div style={{ animation: "fadeSlideUp 0.8s 0.6s both" }}>
            <button onClick={fireConfetti} style={{ padding: "16px 36px", borderRadius: "999px", background: "linear-gradient(135deg, #f472b6, #818cf8)", color: "#fff", fontWeight: 700, fontSize: "16px", border: "none", cursor: "pointer", fontFamily: "'Lato', sans-serif", letterSpacing: "0.5px", boxShadow: "0 8px 32px rgba(244,114,182,0.4)", transition: "transform 0.2s, box-shadow 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.05)"; e.currentTarget.style.boxShadow = "0 12px 48px rgba(244,114,182,0.6)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 8px 32px rgba(244,114,182,0.4)"; }}>
              🎉 Celebrate Her!
            </button>
          </div>

          <div style={{ position: "absolute", bottom: "32px", animation: "fadeSlideUp 1s 1.5s both", display: "flex", flexDirection: "column", alignItems: "center", gap: "6px", opacity: 0.5 }}>
            <p style={{ fontSize: "12px", letterSpacing: "2px", textTransform: "uppercase" }}>Scroll to explore</p>
            <div style={{ width: "1px", height: "40px", background: "linear-gradient(to bottom, white, transparent)" }} />
          </div>
        </div>

        {/* Divider */}
        <div style={{ maxWidth: "600px", margin: "0 auto", height: "1px", background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)" }} />

        {/* Photo Carousel */}
        <PhotoCarousel />

        {/* Divider */}
        <div style={{ maxWidth: "600px", margin: "0 auto", height: "1px", background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)" }} />

        {/* Messages */}
        <div style={{ padding: "80px 24px", maxWidth: "900px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <p style={{ fontSize: "12px", letterSpacing: "4px", color: "#f472b6", textTransform: "uppercase", marginBottom: "16px" }}>Words From Your Team Members</p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 700 }}>
              With Love &{" "}
              <span style={{ background: "linear-gradient(90deg, #f472b6, #818cf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Gratitude</span>
            </h2>
            <p style={{ color: "rgba(255,255,255,0.5)", marginTop: "12px" }}>Click a card to read the message</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
            {MESSAGES.map((msg, i) => (
              <MessageCard key={i} msg={msg} active={activeCard === i} onClick={() => setActiveCard(activeCard === i ? null : i)} />
            ))}
          </div>
        </div>

        {/* Closing */}
        <div style={{ padding: "80px 24px 120px", textAlign: "center", position: "relative" }}>
          <div style={{ maxWidth: "640px", margin: "0 auto", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "32px", padding: "60px 40px", backdropFilter: "blur(20px)", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: "linear-gradient(90deg, #fbbf24, #f472b6, #818cf8, #34d399)" }} />
            <div style={{ fontSize: "56px", animation: "beatHeart 1.5s ease-in-out infinite", display: "inline-block", marginBottom: "24px" }}>💛</div>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(24px, 4vw, 38px)", fontWeight: 700, marginBottom: "20px", lineHeight: 1.3 }}>
              Wishing You the Most <span style={{ color: "#fbbf24", fontStyle: "italic" }}>Beautiful</span> Next Chapter
            </h3>
            <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "16px", lineHeight: 1.8, maxWidth: "460px", margin: "0 auto 32px" }}>
              You didn't just write code — you wrote culture. You shaped how we think, how we build, and how we care about craft. Wherever you go next, they're incredibly lucky to have you. 🌟
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: "8px", flexWrap: "wrap" }}>
              {["🚀 New Adventures", "✨ Big Dreams", "💻 Great Code"].map((tag) => (
                <span key={tag} style={{ padding: "8px 18px", borderRadius: "999px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", fontSize: "13px", color: "rgba(255,255,255,0.7)" }}>{tag}</span>
              ))}
            </div>
          </div>
          <p style={{ marginTop: "60px", color: "rgba(255,255,255,0.25)", fontSize: "13px", letterSpacing: "1px" }}>
            Made with ❤️ by your team · Keep building beautiful things
          </p>
        </div>
      </div>
    </>
  );
}