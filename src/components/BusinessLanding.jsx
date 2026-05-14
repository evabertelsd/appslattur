const perks = [
  {
    icon: '🎯',
    title: 'Náðu í nemendur',
    body: 'Yfir 15.000 nemendur nota Appsláttur. Birttu tilboðið þitt og fáðu fleiri gesti.',
  },
  {
    icon: '📸',
    title: 'Ókeypis markaðssetning',
    body: 'Nemendur búa til efni fyrir þig í skiptum fyrir afslátt. Þú færð myndir og myndbönd.',
  },
  {
    icon: '💸',
    title: 'Ódýrasta auglýsingin',
    body: 'Byrjaðu frítt. Greiddu aðeins þegar þú nærð viðskiptum — engin föst mánaðargjöld.',
  },
  {
    icon: '📊',
    title: 'Fylgstu með árangri',
    body: 'Sjáðu hvernig tilboðið þitt gengur: skoðanir, innlausnir og sparnaður gesta.',
  },
];

export default function BusinessLanding({ onSignup, onClose }) {
  return (
    <div className="flex flex-col min-h-screen overflow-y-auto bg-[#F8F8F8]">
      {/* Hero */}
      <div className="bg-[#0A1A0A] px-5 pt-12 pb-10 relative overflow-hidden">
        <div className="absolute top-[-60px] right-[-40px] w-48 h-48 rounded-full bg-[#65FE08]/20 blur-2xl" />

        {/* Back */}
        <button
          onClick={onClose}
          className="flex items-center gap-1.5 text-white/60 text-sm mb-8 relative"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Til baka
        </button>

        {/* Wordmark */}
        <div className="flex items-center gap-2 mb-6 relative">
          <div className="w-8 h-8 bg-[#65FE08] rounded-xl flex items-center justify-center">
            <img src="/appslattur.png" alt="Appsláttur" className="w-5 h-5 object-contain" />
          </div>
          <div>
            <span className="text-white font-black text-lg">Appsláttur</span>
            <span className="text-[#65FE08] text-xs font-bold uppercase tracking-widest ml-2">Business</span>
          </div>
        </div>

        <h1 className="text-white font-black text-3xl leading-tight relative mb-3">
          Fáðu fleiri<br />
          <span className="text-[#65FE08]">viðskiptavini</span> í dag
        </h1>
        <p className="text-white/60 text-sm leading-relaxed relative">
          Birtu tilboðið þitt á Appsláttur og náðu í þúsundir nemenda í Reykjavík á hádegi og kvöldin.
        </p>

        {/* Social proof */}
        <div className="flex items-center gap-4 mt-5 relative">
          <div className="flex -space-x-2">
            {['🧑‍🍳', '👨‍🍳', '👩‍🍳', '🧑‍🍳'].map((e, i) => (
              <div key={i} className="w-7 h-7 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-sm">
                {e}
              </div>
            ))}
          </div>
          <p className="text-white/60 text-xs">
            <span className="text-white font-bold">32 veitingastaðir</span> eru nú þegar á pallinum
          </p>
        </div>
      </div>

      {/* Perks */}
      <div className="px-5 py-6 flex-1">
        <div className="grid grid-cols-1 gap-3 mb-6">
          {perks.map((p) => (
            <div key={p.title} className="flex items-start gap-4 p-4 bg-white border border-[#F0F0F0] rounded-2xl" style={{ boxShadow: '0 1px 6px rgba(0,0,0,0.04)' }}>
              <div className="w-10 h-10 rounded-xl bg-[#65FE08] flex items-center justify-center text-xl shrink-0">
                {p.icon}
              </div>
              <div>
                <h3 className="text-[#0A1A0A] font-bold text-sm">{p.title}</h3>
                <p className="text-[#888888] text-xs mt-0.5 leading-relaxed">{p.body}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Pricing callout */}
        <div className="bg-[#65FE08]/10 border border-[#65FE08]/30 rounded-2xl p-4 mb-6">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg">✅</span>
            <span className="text-[#0A1A0A] font-black text-sm">Frítt til að byrja</span>
          </div>
          <p className="text-[#888888] text-xs leading-relaxed">
            Engin uppsetningargjöld. Engin mánaðargjöld. Þú greiðir aðeins lítinn hlutfall þegar tilboð eru innleyst — ekkert ef ekkert selst.
          </p>
        </div>
      </div>

      {/* CTA */}
      <div className="px-5 pb-10 pt-2 bg-white border-t border-[#F0F0F0]">
        <button
          onClick={onSignup}
          className="w-full bg-[#65FE08] text-[#0A1A0A] py-4 rounded-2xl font-black text-base active:opacity-90 transition-opacity"
        >
          Skrá veitingastaðinn minn
        </button>
        <p className="text-center text-[#888888] text-xs mt-2">
          Frítt · Engin kreditkort þörf
        </p>
      </div>
    </div>
  );
}
