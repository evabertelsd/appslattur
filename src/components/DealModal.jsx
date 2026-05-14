import { useState } from 'react';

const timingLabels = {
  now:     '🟢 Opið núna',
  lunch:   '☀️ Hádegi',
  evening: '🌙 Kvöld',
  today:   '📅 Í dag',
  weekend: '📆 Helgi',
};

export default function DealModal({ deal, onClose, isSaved, onToggleSave }) {
  const [claimed, setClaimed] = useState(false);
  if (!deal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center" style={{ maxWidth: 430, margin: '0 auto', left: 0, right: 0 }}>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full bg-white rounded-t-3xl overflow-hidden max-h-[92vh] overflow-y-auto">
        {/* Image */}
        <div className="relative h-60">
          <img src={deal.image} alt={deal.restaurant} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white flex items-center justify-center"
            style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="#1a3a00" strokeWidth={2.5} className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <button
            onClick={() => onToggleSave?.(deal.id)}
            className="absolute top-4 left-4 w-9 h-9 rounded-full bg-white flex items-center justify-center"
            style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}
          >
            <svg viewBox="0 0 24 24" fill={isSaved ? '#FF3B30' : 'none'} stroke={isSaved ? '#FF3B30' : '#1a3a00'} strokeWidth={2} className="w-4.5 h-4.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>
          </button>

          <div className="absolute bottom-4 left-4 right-16">
            <p className="text-white/70 text-xs mb-0.5">{deal.tagline}</p>
            <h2 className="text-white font-black text-2xl leading-tight">{deal.restaurant}</h2>
          </div>

          <div className="absolute bottom-4 right-4 rounded-xl px-3 py-1.5" style={{ background: '#A8FF3E' }}>
            <span className="font-black text-sm" style={{ color: '#1a3a00' }}>-{deal.discount}%</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Price block */}
          <div className="flex items-center justify-between bg-[#f5f5f5] rounded-2xl p-4 mb-5">
            <div>
              <p className="text-xs mb-0.5" style={{ color: '#888' }}>Nemendaverð</p>
              <p className="font-black text-3xl leading-none" style={{ color: '#1a3a00' }}>
                {deal.dealPrice.toLocaleString('is-IS')} kr
              </p>
              <p className="text-sm line-through mt-0.5" style={{ color: '#aaa' }}>
                {deal.originalPrice.toLocaleString('is-IS')} kr
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs mb-1" style={{ color: '#888' }}>Þú sparar</p>
              <div className="rounded-xl px-3 py-2" style={{ background: '#1a3a00' }}>
                <span className="text-white font-black text-lg">
                  {(deal.originalPrice - deal.dealPrice).toLocaleString('is-IS')} kr
                </span>
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm leading-relaxed mb-4" style={{ color: '#333' }}>{deal.description}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-5">
            {deal.timing.map((t) => (
              <span key={t} className="bg-[#f0f0f0] text-xs px-3 py-1.5 rounded-full font-medium" style={{ color: '#555' }}>
                {timingLabels[t]}
              </span>
            ))}
            <span className="bg-[#f0f0f0] text-xs px-3 py-1.5 rounded-full font-medium" style={{ color: '#555' }}>
              📍 {deal.neighborhood}
            </span>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-3 mb-5 pb-5 border-b border-[#F0F0F0]">
            <div className="flex gap-0.5">
              {[1,2,3,4,5].map((s) => (
                <svg key={s} viewBox="0 0 24 24" fill={s <= Math.round(deal.rating) ? '#F59E0B' : '#E5E7EB'} className="w-4 h-4">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
            </div>
            <span className="font-bold text-sm" style={{ color: '#1a3a00' }}>{deal.rating}</span>
            <span className="text-sm" style={{ color: '#888' }}>({deal.reviews} umsagnir)</span>
          </div>

          {/* Creator CTA */}
          <div className="rounded-2xl p-4 mb-5 flex items-center gap-3" style={{ background: '#1a3a00' }}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0" style={{ background: '#A8FF3E' }}>📸</div>
            <div className="flex-1">
              <p className="text-white font-bold text-sm">Birtu efni, fáðu meira</p>
              <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.55)' }}>Taktu mynd og fáðu viðbótar afslætti</p>
            </div>
          </div>

          {/* CTA */}
          {claimed ? (
            <div className="w-full rounded-2xl py-4 text-center" style={{ background: '#A8FF3E' }}>
              <p className="font-black text-base" style={{ color: '#1a3a00' }}>✓ Tilboð virkjað!</p>
              <p className="text-xs mt-0.5" style={{ color: 'rgba(26,58,0,0.6)' }}>Sýndu stúdentkort á staðnum</p>
            </div>
          ) : (
            <button
              onClick={() => setClaimed(true)}
              className="w-full py-4 rounded-2xl font-black text-base active:scale-[0.98] transition-transform"
              style={{ background: '#A8FF3E', color: '#1a3a00' }}
            >
              Nota tilboðið
            </button>
          )}
          <p className="text-center text-xs mt-2" style={{ color: '#aaa' }}>Sýndu stúdentkort við greiðslu</p>
        </div>
      </div>
    </div>
  );
}
