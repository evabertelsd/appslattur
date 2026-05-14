function StarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="#F59E0B" className="w-3 h-3">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

const categoryLabels = {
  burgers: 'Borgarar',
  pizza: 'Pítsa',
  sandwiches: 'Samlokur',
  pita: 'Píta',
  salads: 'Salat',
  coffee: 'Kaffi',
};

export default function DealCard({ deal, onClick, isSaved, onToggleSave }) {
  return (
    <div
      onClick={onClick}
      className="glass-card rounded-2xl overflow-hidden cursor-pointer active:scale-[0.98] transition-transform"
    >
      <div className="relative h-36 overflow-hidden">
        <img
          src={deal.image}
          alt={deal.restaurant}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div
          className="absolute top-2 left-2 text-[10px] font-black px-2 py-0.5 rounded-full"
          style={{ background: '#A8FF3E', color: '#1a3a00' }}
        >
          -{deal.discount}%
        </div>
        <button
          onClick={(e) => { e.stopPropagation(); onToggleSave?.(deal.id); }}
          className="absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center"
          style={{ background: 'rgba(255,255,255,0.88)', backdropFilter: 'blur(4px)' }}
        >
          <svg viewBox="0 0 24 24" fill={isSaved ? '#FF3B30' : 'none'} stroke={isSaved ? '#FF3B30' : '#1a3a00'} strokeWidth={2} className="w-3.5 h-3.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
          </svg>
        </button>
      </div>

      <div className="p-3">
        <div className="flex items-center gap-1.5 mb-1">
          <span className="text-[10px] font-medium uppercase tracking-wide" style={{ color: 'rgba(26,58,0,0.6)' }}>
            {categoryLabels[deal.category] || deal.category}
          </span>
          {deal.badge && deal.badgeColor !== '#65FE08' && (
            <span
              className="text-[10px] font-bold px-1.5 py-0.5 rounded-full text-white"
              style={{ backgroundColor: deal.badgeColor }}
            >
              {deal.badge}
            </span>
          )}
        </div>
        <h3 className="font-bold text-sm leading-tight truncate" style={{ color: '#1a3a00' }}>{deal.restaurant}</h3>
        <p className="text-xs mt-0.5 truncate" style={{ color: 'rgba(26,58,0,0.6)' }}>{deal.tagline}</p>

        <div className="flex items-center justify-between mt-2.5">
          <div>
            <span className="font-black text-base" style={{ color: '#1a3a00' }}>
              {deal.dealPrice.toLocaleString('is-IS')} kr
            </span>
            <span className="text-xs line-through ml-1.5" style={{ color: 'rgba(26,58,0,0.4)' }}>
              {deal.originalPrice.toLocaleString('is-IS')} kr
            </span>
          </div>
          <div className="flex items-center gap-1">
            <StarIcon />
            <span className="text-xs font-medium" style={{ color: 'rgba(26,58,0,0.6)' }}>{deal.rating}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
