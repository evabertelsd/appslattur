export default function FeaturedDeal({ deal, onClick, isSaved, onToggleSave }) {
  return (
    <div className="mx-4 mb-6">
      <div
        onClick={onClick}
        className="relative rounded-3xl overflow-hidden h-56 cursor-pointer active:scale-[0.99] transition-transform"
        style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.18)' }}
      >
        <img src={deal.image} alt={deal.restaurant} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a3a00]/90 via-[#1a3a00]/20 to-transparent" />

        {/* Top row */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
          <div className="px-3 py-1 rounded-full" style={{ background: '#A8FF3E' }}>
            <span className="text-[11px] font-black tracking-wide" style={{ color: '#1a3a00' }}>TILBOÐ DAGSINS</span>
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); onToggleSave?.(deal.id); }}
            className="w-9 h-9 rounded-full flex items-center justify-center"
            style={{ background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(4px)' }}
          >
            <svg viewBox="0 0 24 24" fill={isSaved ? '#FF3B30' : 'none'} stroke={isSaved ? '#FF3B30' : '#1a3a00'} strokeWidth={2} className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>
          </button>
        </div>

        {/* Bottom content */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <p className="text-white/60 text-xs font-medium mb-0.5">{deal.tagline}</p>
          <h3 className="text-white font-black text-xl leading-tight">{deal.restaurant}</h3>
          <div className="flex items-end justify-between mt-2.5">
            <div>
              <span className="text-white/70 text-sm">{deal.dealLabel}</span>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-white/40 text-sm line-through">
                  {deal.originalPrice.toLocaleString('is-IS')} kr
                </span>
                <div className="flex items-center gap-1.5 rounded-full px-2 py-0.5" style={{ background: 'rgba(255,255,255,0.12)' }}>
                  <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#A8FF3E' }} />
                  <span className="text-white/70 text-[10px] font-semibold">LIVE</span>
                </div>
              </div>
            </div>
            <div className="rounded-2xl px-4 py-2 text-right" style={{ background: '#A8FF3E' }}>
              <span className="font-black text-xl leading-none" style={{ color: '#1a3a00' }}>
                {deal.dealPrice.toLocaleString('is-IS')} kr
              </span>
            </div>
          </div>

          {/* Progress */}
          <div className="mt-3">
            <div className="flex justify-between text-[10px] text-white/50 mb-1">
              <span>23 eftir</span>
              <span>Takmarkað magn</span>
            </div>
            <div className="h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.2)' }}>
              <div className="h-full rounded-full" style={{ width: '52%', background: '#A8FF3E' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
