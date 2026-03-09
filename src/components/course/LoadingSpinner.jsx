import { useEffect, useState } from "react";

export default function LoadingSpinner() {
  const [dot, setDot] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setDot(p => (p + 1) % 4), 400);
    return () => clearInterval(t);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@500;600&display=swap');
        @keyframes bookBounce {
          0%,100% { transform: translateY(0px) rotate(-3deg); }
          50%      { transform: translateY(-6px) rotate(3deg); }
        }
        @keyframes trailFade {
          0%   { opacity: 0; transform: scaleX(0); }
          50%  { opacity: 1; transform: scaleX(1); }
          100% { opacity: 0; transform: scaleX(1); }
        }
        @keyframes glowPulse {
          0%,100% { box-shadow: 0 0 12px rgba(99,102,241,0.4); }
          50%      { box-shadow: 0 0 28px rgba(99,102,241,0.8), 0 0 48px rgba(59,130,246,0.3); }
        }
        @keyframes slideUp {
          from { opacity:0; transform:translateY(4px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .book-anim  { animation: bookBounce 1.2s ease-in-out infinite; }
        .glow-anim  { animation: glowPulse 2s ease-in-out infinite; }
        .slide-up   { animation: slideUp 0.4s ease-out forwards; }
      `}</style>

      <div
        style={{ fontFamily: "'Sora', sans-serif" }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/95 backdrop-blur-sm"
      >
        <div className="flex flex-col items-center gap-5">

          {/* Icon + glow */}
          <div
            className="book-anim glow-anim w-14 h-14 rounded-2xl flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #3b82f6, #6366f1)" }}
          >
            <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
            </svg>
          </div>

          {/* Text + animated dots */}
          <div className="flex items-center gap-1.5">
            <span
              className="slide-up text-sm font-semibold tracking-wide"
              style={{ color: "#94a3b8" }}
            >
              Loading
            </span>
            <div className="flex items-end gap-[3px] pb-[1px]">
              {[0, 1, 2].map(i => (
                <span
                  key={i}
                  className="block rounded-full transition-all duration-300"
                  style={{
                    width: 4,
                    height: dot > i ? 8 : 4,
                    background: dot > i ? "#6366f1" : "#334155",
                    transitionTimingFunction: "cubic-bezier(0.34,1.56,0.64,1)"
                  }}
                />
              ))}
            </div>
          </div>

          {/* Thin shimmer bar */}
          <div
            className="rounded-full overflow-hidden"
            style={{ width: 80, height: 2, background: "rgba(99,102,241,0.15)" }}
          >
            <div
              style={{
                height: "100%",
                borderRadius: 999,
                background: "linear-gradient(90deg, transparent, #6366f1, #3b82f6, transparent)",
                backgroundSize: "200% 100%",
                animation: "trailFade 1.4s ease-in-out infinite",
              }}
            />
          </div>

        </div>
      </div>
    </>
  );
}