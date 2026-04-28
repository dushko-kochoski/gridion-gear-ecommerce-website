export default function BrandTicker() {
  const row1 = 'GRIP // SPEED // POWER // PRECISION // DOMINATE // ';
  const row2 = 'EVERY PLAY COUNTS // NO EXCUSES // ALL OUT // ';

  return (
    <section className="bg-pitch py-5 overflow-hidden border-y border-[rgba(255,255,255,0.06)]">
      {/* Row 1 - left to right */}
      <div className="relative flex overflow-hidden">
        <div className="animate-marquee-left flex whitespace-nowrap">
          {[...Array(4)].map((_, i) => (
            <span
              key={i}
              className="font-archivo-black text-[clamp(40px,6vw,72px)] mx-0 tracking-tight"
              style={{ WebkitTextStroke: '1px rgba(255,255,255,0.2)', color: 'transparent' }}
            >
              {row1.split(' // ').map((word, wi) => (
                <span key={wi}>
                  {wi > 0 && <span className="text-neon mx-2" style={{ WebkitTextStroke: 'none', color: '#39FF14' }}>//</span>}
                  {word}
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* Row 2 - right to left */}
      <div className="relative flex overflow-hidden mt-2">
        <div className="animate-marquee-right flex whitespace-nowrap">
          {[...Array(4)].map((_, i) => (
            <span
              key={i}
              className="font-archivo-black text-[clamp(40px,6vw,72px)] text-white/15 mx-0 tracking-tight"
            >
              {row2}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
