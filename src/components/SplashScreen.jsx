import { useEffect } from 'react';

export default function SplashScreen({ onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2200);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-[-80px] right-[-60px] w-64 h-64 rounded-full opacity-30 blur-3xl" style={{ background: '#A8FF3E' }} />
      <div className="absolute bottom-[-60px] left-[-40px] w-48 h-48 rounded-full opacity-20 blur-3xl" style={{ background: '#fff' }} />

      {/* Logo area */}
      <div className="flex flex-col items-center gap-5 z-10">
        <div
          className="w-24 h-24 rounded-3xl flex items-center justify-center overflow-hidden"
          style={{ background: 'rgba(255,255,255,0.3)', backdropFilter: 'blur(12px)', border: '2px solid rgba(255,255,255,0.5)', boxShadow: '0 8px 32px rgba(0,0,0,0.12)' }}
        >
          <img src="/appslattur.png" alt="Appsláttur" className="w-14 h-14 object-contain" />
        </div>

        <div className="text-center">
          <h1 className="text-white text-5xl font-black tracking-tight leading-none">
            Appsláttur
          </h1>
          <p className="text-xs font-bold mt-2 tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.7)' }}>
            Nemendatilboð
          </p>
        </div>

        <p className="text-sm text-center max-w-[200px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.7)' }}>
          Öll matartilboð á einum stað
        </p>
      </div>

      {/* Loading dots */}
      <div className="absolute bottom-16 flex gap-2 z-10">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-1.5 h-1.5 rounded-full animate-bounce"
            style={{ background: 'rgba(255,255,255,0.8)', animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
    </div>
  );
}
