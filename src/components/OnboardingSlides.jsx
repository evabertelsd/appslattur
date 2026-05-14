import { useState } from 'react';

const slides = [
  {
    emoji: '🍕',
    decorEmojis: ['🍔', '🥙', '☕', '🥗', '🌮'],
    title: 'Öll matartilboð á einum stað',
    body: 'Pítsa, borgarar, kaffi, salat — allt sem nemendur vilja borða á betra verði.',
  },
  {
    emoji: '💸',
    decorEmojis: ['50%', '2×1', '30%', '25%'],
    title: 'Sparaðu á hverri máltíð',
    body: 'Nemendur í Reykjavík spara að meðaltali 3.200 kr á mánuði með Appsláttur.',
  },
  {
    emoji: '📸',
    decorEmojis: ['❤️', '👍', '✨', '🎬'],
    title: 'Búðu til efni, fáðu meira',
    body: 'Taktu mynd af matnum þínum og fáðu viðbótar afslætti. Vertu efnisskapari.',
  },
];

export default function OnboardingSlides({ onDone }) {
  const [current, setCurrent] = useState(0);
  const slide = slides[current];
  const isLast = current === slides.length - 1;

  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-[-60px] right-[-40px] w-56 h-56 rounded-full blur-3xl opacity-30" style={{ background: '#A8FF3E' }} />
      <div className="absolute bottom-[-40px] left-[-40px] w-40 h-40 rounded-full blur-3xl opacity-20" style={{ background: '#fff' }} />

      {/* Skip */}
      <div className="flex justify-end px-5 pt-12 relative z-10">
        <button
          onClick={onDone}
          className="text-sm font-medium py-1 px-3 rounded-full"
          style={{ color: 'rgba(255,255,255,0.7)', background: 'rgba(255,255,255,0.15)' }}
        >
          Salta yfir
        </button>
      </div>

      {/* Illustration area */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 relative z-10">
        <div className="relative w-56 h-56 mb-8">
          {/* Center big emoji */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="w-32 h-32 rounded-[2rem] flex items-center justify-center"
              style={{ background: 'rgba(255,255,255,0.3)', backdropFilter: 'blur(12px)', border: '2px solid rgba(255,255,255,0.5)', boxShadow: '0 8px 32px rgba(0,0,0,0.1)' }}
            >
              <span className="text-6xl">{slide.emoji}</span>
            </div>
          </div>
          {/* Orbiting mini chips */}
          {slide.decorEmojis.map((e, i) => {
            const angle = (i / slide.decorEmojis.length) * 360;
            const r = 100;
            const x = Math.cos((angle * Math.PI) / 180) * r + 112;
            const y = Math.sin((angle * Math.PI) / 180) * r + 112;
            return (
              <div
                key={i}
                className="absolute w-10 h-10 rounded-2xl flex items-center justify-center text-sm font-bold"
                style={{
                  left: x - 20,
                  top: y - 20,
                  background: 'rgba(255,255,255,0.28)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255,255,255,0.45)',
                  color: '#1a3a00',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                }}
              >
                {e}
              </div>
            );
          })}
        </div>

        {/* Text */}
        <h1 className="text-white font-black text-3xl text-center leading-tight mb-3">
          {slide.title}
        </h1>
        <p className="text-base text-center leading-relaxed max-w-xs" style={{ color: 'rgba(255,255,255,0.75)' }}>
          {slide.body}
        </p>
      </div>

      {/* Bottom controls */}
      <div className="px-6 pb-12 relative z-10">
        {/* Dots */}
        <div className="flex justify-center gap-2 mb-6">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === current ? 24 : 8,
                height: 8,
                background: i === current ? '#A8FF3E' : 'rgba(255,255,255,0.3)',
              }}
            />
          ))}
        </div>

        {isLast ? (
          <button
            onClick={onDone}
            className="w-full py-4 rounded-2xl font-black text-base transition-transform active:scale-[0.98]"
            style={{ background: '#A8FF3E', color: '#1a3a00', boxShadow: '0 4px 20px rgba(0,0,0,0.15)' }}
          >
            Hefjast handa 🚀
          </button>
        ) : (
          <div className="flex gap-3">
            {current > 0 && (
              <button
                onClick={() => setCurrent(current - 1)}
                className="flex-1 py-4 rounded-2xl font-semibold text-sm"
                style={{ background: 'rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.8)', border: '1px solid rgba(255,255,255,0.3)' }}
              >
                Til baka
              </button>
            )}
            <button
              onClick={() => setCurrent(current + 1)}
              className="flex-[2] py-4 rounded-2xl font-black text-base transition-transform active:scale-[0.98]"
              style={{ background: '#A8FF3E', color: '#1a3a00' }}
            >
              Áfram
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
