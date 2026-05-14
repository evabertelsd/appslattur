import { useState, useMemo } from 'react';
import { deals } from '../data/deals';
import DealCard from './DealCard';
import DealModal from './DealModal';

const recentSearches = ['Hamborgarar', 'Pítsa hádegi', 'Kaffi og kaka', 'Salat'];
const trending = ['2 á verði 1', 'Grænmetisréttir', 'Morgunmatur', 'Hádegismál', 'Sushi'];

export default function SearchScreen({ savedDeals, onToggleSave }) {
  const [query, setQuery] = useState('');
  const [selectedDeal, setSelectedDeal] = useState(null);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return deals.filter(
      (d) =>
        d.restaurant.toLowerCase().includes(q) ||
        d.description.toLowerCase().includes(q) ||
        d.category.toLowerCase().includes(q) ||
        d.tagline.toLowerCase().includes(q) ||
        d.neighborhood.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <div className="glass-header px-4 pt-12 pb-4 sticky top-0 z-40">
        <h1 className="text-white font-black text-3xl mb-4">Leita</h1>
        <div className="relative">
          <svg viewBox="0 0 24 24" fill="none" stroke="rgba(26,58,0,0.6)" strokeWidth={2} className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Leitaðu að veitingastöðum, mat..."
            className="glass-input w-full rounded-2xl pl-11 pr-10 py-3.5 text-sm font-medium outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full flex items-center justify-center"
              style={{ background: 'rgba(26,58,0,0.3)' }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2.5} className="w-3 h-3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-24 px-4 pt-5">
        {!query ? (
          <>
            {/* Recent searches */}
            <div className="mb-6">
              <h2 className="text-white font-bold text-base mb-3">Nýlegar leitir</h2>
              <div className="glass-card rounded-2xl overflow-hidden">
                {recentSearches.map((s, i) => (
                  <button
                    key={s}
                    onClick={() => setQuery(s)}
                    className="flex items-center gap-3 py-3 px-4 w-full text-left"
                    style={i < recentSearches.length - 1 ? { borderBottom: '1px solid rgba(255,255,255,0.2)' } : {}}
                  >
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: 'rgba(255,255,255,0.25)' }}
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="rgba(26,58,0,0.7)" strokeWidth={1.8} className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <span className="text-sm font-medium" style={{ color: '#1a3a00' }}>{s}</span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="rgba(26,58,0,0.4)" strokeWidth={2} className="w-4 h-4 ml-auto">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                    </svg>
                  </button>
                ))}
              </div>
            </div>

            {/* Trending */}
            <div className="mb-6">
              <h2 className="text-white font-bold text-base mb-3">Vinsælt núna 🔥</h2>
              <div className="flex flex-wrap gap-2">
                {trending.map((t) => (
                  <button
                    key={t}
                    onClick={() => setQuery(t)}
                    className="px-4 py-2 rounded-full text-sm font-semibold transition-all"
                    style={{ background: 'rgba(255,255,255,0.22)', color: 'white', border: '1px solid rgba(255,255,255,0.35)' }}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* All deals preview */}
            <div>
              <h2 className="text-white font-bold text-base mb-3">Öll tilboð</h2>
              <div className="grid grid-cols-2 gap-3">
                {deals.slice(0, 4).map((deal) => (
                  <DealCard
                    key={deal.id}
                    deal={deal}
                    onClick={() => setSelectedDeal(deal)}
                    isSaved={savedDeals?.has(deal.id)}
                    onToggleSave={onToggleSave}
                  />
                ))}
              </div>
            </div>
          </>
        ) : results.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-5xl mb-4">🔍</p>
            <p className="text-white font-bold text-lg mb-1">Ekkert fannst</p>
            <p className="text-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>Engar niðurstöður fyrir „{query}"</p>
            <button
              onClick={() => setQuery('')}
              className="mt-4 px-6 py-2.5 rounded-full font-bold text-sm"
              style={{ background: '#A8FF3E', color: '#1a3a00' }}
            >
              Hreinsa leit
            </button>
          </div>
        ) : (
          <div>
            <p className="text-sm font-medium mb-3" style={{ color: 'rgba(255,255,255,0.7)' }}>{results.length} niðurstöður</p>
            <div className="grid grid-cols-2 gap-3">
              {results.map((deal) => (
                <DealCard
                  key={deal.id}
                  deal={deal}
                  onClick={() => setSelectedDeal(deal)}
                  isSaved={savedDeals?.has(deal.id)}
                  onToggleSave={onToggleSave}
                />
              ))}
            </div>
          </div>
        )}
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
