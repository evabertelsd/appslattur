import { useState, useMemo } from 'react';
import { deals, featuredDeal } from '../data/deals';
import FeaturedDeal from './FeaturedDeal';
import FilterBar from './FilterBar';
import DealCard from './DealCard';
import DealModal from './DealModal';

const defaultFilters = {
  category: 'all',
  timing: null,
  maxPrice: 5000,
  neighborhood: 'Allt',
};

export default function HomeScreen({ savedDeals, onToggleSave }) {
  const [filters, setFilters] = useState(defaultFilters);
  const [selectedDeal, setSelectedDeal] = useState(null);

  const filtered = useMemo(() => {
    return deals.filter((d) => {
      if (filters.category !== 'all' && d.category !== filters.category) return false;
      if (filters.timing && !d.timing.includes(filters.timing)) return false;
      if (d.dealPrice > filters.maxPrice) return false;
      if (filters.neighborhood !== 'Allt' && d.neighborhood !== filters.neighborhood) return false;
      return true;
    });
  }, [filters]);

  const activeFilterCount = [
    filters.category !== 'all',
    !!filters.timing,
    filters.maxPrice < 5000,
    filters.neighborhood !== 'Allt',
  ].filter(Boolean).length;

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="glass-header px-4 pt-12 pb-4 sticky top-0 z-40">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-white font-black text-4xl tracking-tight leading-none">Appsláttur</h1>
            <p className="text-xs mt-1 ml-0.5" style={{ color: 'rgba(255,255,255,0.7)' }}>📍 Reykjavík · Nemendatilboð</p>
          </div>
          <button
            className="relative w-11 h-11 rounded-2xl flex items-center justify-center"
            style={{ background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.35)' }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={1.8} className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
            </svg>
            <div className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full border-2" style={{ background: '#A8FF3E', borderColor: 'rgba(255,255,255,0.5)' }} />
          </button>
        </div>
      </header>

      <FilterBar filters={filters} onFiltersChange={setFilters} />

      <div className="flex-1 overflow-y-auto pb-24">
        {/* Featured */}
        <div className="mt-5">
          <FeaturedDeal
            deal={featuredDeal}
            onClick={() => setSelectedDeal(featuredDeal)}
            isSaved={savedDeals?.has(featuredDeal.id)}
            onToggleSave={onToggleSave}
          />
        </div>

        {/* Deals section */}
        <div className="px-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <h2 className="text-white font-black text-lg">
                {filters.category === 'all' ? 'Öll tilboð' : 'Síuð tilboð'}
              </h2>
              {activeFilterCount > 0 && (
                <span
                  className="text-[10px] font-black px-2 py-0.5 rounded-full"
                  style={{ background: 'rgba(255,255,255,0.3)', color: 'white' }}
                >
                  {activeFilterCount}
                </span>
              )}
            </div>
            <span className="text-xs font-medium" style={{ color: 'rgba(255,255,255,0.7)' }}>{filtered.length} tilboð</span>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-4xl mb-4">🍽️</p>
              <p className="text-sm" style={{ color: 'rgba(255,255,255,0.8)' }}>Engin tilboð passa við síurnar</p>
              <button
                onClick={() => setFilters(defaultFilters)}
                className="mt-3 text-white text-sm font-bold underline"
              >
                Hreinsa síur
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {filtered.map((deal) => (
                <DealCard
                  key={deal.id}
                  deal={deal}
                  onClick={() => setSelectedDeal(deal)}
                  isSaved={savedDeals?.has(deal.id)}
                  onToggleSave={onToggleSave}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {selectedDeal && (
        <DealModal
          deal={selectedDeal}
          onClose={() => setSelectedDeal(null)}
          isSaved={savedDeals?.has(selectedDeal.id)}
          onToggleSave={onToggleSave}
        />
      )}
    </div>
  );
}
