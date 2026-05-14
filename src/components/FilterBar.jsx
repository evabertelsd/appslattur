import { useState } from 'react';
import { categories, timings, neighborhoods } from '../data/deals';

export default function FilterBar({ filters, onFiltersChange }) {
  const [showMore, setShowMore] = useState(false);

  const setCategory = (id) => onFiltersChange({ ...filters, category: id });
  const setTiming = (id) => onFiltersChange({ ...filters, timing: filters.timing === id ? null : id });
  const setNeighborhood = (n) => { onFiltersChange({ ...filters, neighborhood: n }); setShowMore(false); };

  const activePill = { background: 'rgba(255,255,255,0.95)', color: '#1a3a00' };
  const inactivePill = { background: 'rgba(255,255,255,0.18)', color: 'rgba(255,255,255,0.9)', border: '1px solid rgba(255,255,255,0.25)' };
  const activeTimingPill = { background: '#1a3a00', color: '#A8FF3E' };

  return (
    <div className="glass-header">
      {/* Category pills */}
      <div className="overflow-x-auto">
        <div className="flex gap-2 px-4 py-3" style={{ width: 'max-content' }}>
          {categories.map((cat) => {
            const active = filters.category === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setCategory(cat.id)}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-full text-sm font-semibold transition-all whitespace-nowrap"
                style={active ? activePill : inactivePill}
              >
                <span>{cat.emoji}</span>
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Timing + filters */}
      <div className="flex items-center gap-2 px-4 pb-3 overflow-x-auto">
        {timings.map((t) => {
          const active = filters.timing === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setTiming(t.id)}
              className="px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all"
              style={active ? activeTimingPill : inactivePill}
            >
              {t.label}
            </button>
          );
        })}

        <div className="w-px h-4 mx-1 shrink-0" style={{ background: 'rgba(255,255,255,0.3)' }} />

        {/* Price */}
        <button
          onClick={() => onFiltersChange({ ...filters, maxPrice: filters.maxPrice < 5000 ? 5000 : 2000 })}
          className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all"
          style={filters.maxPrice < 5000 ? activePill : inactivePill}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3 h-3">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
          </svg>
          {filters.maxPrice < 5000 ? 'Undir 2.000 kr' : 'Verð'}
        </button>

        {/* Location */}
        <button
          onClick={() => setShowMore(!showMore)}
          className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all"
          style={filters.neighborhood !== 'Allt' ? activePill : inactivePill}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3 h-3">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
          </svg>
          {filters.neighborhood === 'Allt' ? 'Hverfi' : filters.neighborhood}
        </button>
      </div>

      {showMore && (
        <div className="px-4 pb-3 flex flex-wrap gap-2 pt-2" style={{ borderTop: '1px solid rgba(255,255,255,0.2)' }}>
          {neighborhoods.map((n) => (
            <button
              key={n}
              onClick={() => setNeighborhood(n)}
              className="px-3 py-1.5 rounded-full text-xs font-semibold transition-all"
              style={filters.neighborhood === n ? activePill : inactivePill}
            >
              {n}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
