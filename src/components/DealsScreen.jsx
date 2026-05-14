import { useState } from 'react';
import { deals } from '../data/deals';
import DealCard from './DealCard';
import DealModal from './DealModal';

const mockClaimedDeals = [
  {
    id: 'c1',
    dealId: 1,
    restaurant: 'Hamborgarabúllan',
    dealLabel: '2 á verði 1',
    dealPrice: 1245,
    originalPrice: 2490,
    discount: 50,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop',
    code: 'HB-2X1-4821',
    expiresAt: '31. maí 2026',
    claimedAt: '13. maí 2026',
  },
  {
    id: 'c2',
    dealId: 6,
    restaurant: 'Grænn Kostur',
    dealLabel: 'Máltíðarboð',
    dealPrice: 1950,
    originalPrice: 2800,
    discount: 30,
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop',
    code: 'GK-MLT-7743',
    expiresAt: '28. maí 2026',
    claimedAt: '12. maí 2026',
  },
];

const mockUsedDeals = [
  { id: 'u1', restaurant: 'Eldsmiðjan', dealLabel: '30% afsláttur', savedAmount: 960, usedAt: '5. maí 2026', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop' },
  { id: 'u2', restaurant: 'Kaffi Mokka', dealLabel: 'Máltíðarboð', savedAmount: 710, usedAt: '2. maí 2026', image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop' },
  { id: 'u3', restaurant: 'C is for Cookie', dealLabel: 'Kaffi + kaka', savedAmount: 350, usedAt: '28. apríl 2026', image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&h=300&fit=crop' },
  { id: 'u4', restaurant: 'Hamborgarabúllan', dealLabel: '2 á verði 1', savedAmount: 1245, usedAt: '20. apríl 2026', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop' },
];

const tabs = [
  { id: 'virkir',   label: 'Virkir' },
  { id: 'vistadh',  label: 'Vistað' },
  { id: 'notadhir', label: 'Notaðir' },
];

function ClaimedCard({ deal }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="glass-card rounded-2xl overflow-hidden">
      <div className="relative h-28 overflow-hidden">
        <img src={deal.image} alt={deal.restaurant} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a3a00]/70 to-transparent" />
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
          <div>
            <p className="text-white font-black text-base leading-tight">{deal.restaurant}</p>
            <p className="text-white/70 text-xs">{deal.dealLabel}</p>
          </div>
          <div className="rounded-xl px-2.5 py-1" style={{ background: '#A8FF3E' }}>
            <span className="font-black text-sm" style={{ color: '#1a3a00' }}>-{deal.discount}%</span>
          </div>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <div
            className="flex-1 rounded-xl px-3 py-2.5 font-mono text-sm font-bold tracking-widest"
            style={{ background: 'rgba(255,255,255,0.35)', color: '#1a3a00' }}
          >
            {deal.code}
          </div>
          <button
            onClick={handleCopy}
            className="px-4 py-2.5 rounded-xl text-sm font-bold transition-all"
            style={copied ? { background: '#A8FF3E', color: '#1a3a00' } : { background: '#1a3a00', color: 'white' }}
          >
            {copied ? '✓ Afritað' : 'Afrita'}
          </button>
        </div>
        <div className="flex items-center justify-between text-xs" style={{ color: 'rgba(26,58,0,0.6)' }}>
          <span>Virkjað: {deal.claimedAt}</span>
          <span className="font-semibold" style={{ color: '#c45000' }}>Rennur út: {deal.expiresAt}</span>
        </div>
      </div>
    </div>
  );
}

function UsedCard({ deal }) {
  return (
    <div className="glass-card flex items-center gap-3 rounded-2xl p-3">
      <img src={deal.image} alt={deal.restaurant} className="w-14 h-14 rounded-xl object-cover shrink-0" />
      <div className="flex-1 min-w-0">
        <p className="font-bold text-sm" style={{ color: '#1a3a00' }}>{deal.restaurant}</p>
        <p className="text-xs" style={{ color: 'rgba(26,58,0,0.6)' }}>{deal.dealLabel}</p>
        <p className="text-xs mt-0.5" style={{ color: 'rgba(26,58,0,0.5)' }}>{deal.usedAt}</p>
      </div>
      <div className="text-right shrink-0">
        <p className="text-[10px] font-medium" style={{ color: 'rgba(26,58,0,0.5)' }}>Sparaðir</p>
        <p className="font-black text-base" style={{ color: '#1a3a00' }}>{deal.savedAmount.toLocaleString('is-IS')} kr</p>
      </div>
    </div>
  );
}

export default function DealsScreen({ savedDeals, onToggleSave }) {
  const [activeTab, setActiveTab] = useState('virkir');
  const [selectedDeal, setSelectedDeal] = useState(null);

  const savedDealObjects = deals.filter((d) => savedDeals?.has(d.id));
  const totalSavedByUsed = mockUsedDeals.reduce((sum, d) => sum + d.savedAmount, 0);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <div className="glass-header px-4 pt-12 pb-4 sticky top-0 z-40">
        <h1 className="text-white font-black text-3xl mb-4">Tilboðin mín</h1>

        {/* Tabs */}
        <div className="flex rounded-2xl p-1 gap-1" style={{ background: 'rgba(255,255,255,0.15)' }}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="flex-1 py-2 rounded-xl text-sm font-bold transition-all"
              style={
                activeTab === tab.id
                  ? { background: 'rgba(255,255,255,0.9)', color: '#1a3a00', boxShadow: '0 1px 4px rgba(0,0,0,0.1)' }
                  : { color: 'rgba(255,255,255,0.7)' }
              }
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-24 px-4 pt-4">
        {/* VIRKIR tab */}
        {activeTab === 'virkir' && (
          <>
            {mockClaimedDeals.length > 0 ? (
              <div className="flex flex-col gap-3">
                <div className="rounded-2xl p-4 flex items-center gap-3 mb-1" style={{ background: '#A8FF3E' }}>
                  <div className="text-2xl">🎫</div>
                  <div>
                    <p className="font-black text-base" style={{ color: '#1a3a00' }}>{mockClaimedDeals.length} virk tilboð</p>
                    <p className="text-xs" style={{ color: 'rgba(26,58,0,0.6)' }}>Sýndu kóðann á staðnum</p>
                  </div>
                </div>
                {mockClaimedDeals.map((d) => <ClaimedCard key={d.id} deal={d} />)}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-5xl mb-4">🎫</p>
                <p className="text-white font-bold text-lg mb-1">Engin virk tilboð</p>
                <p className="text-sm max-w-xs mx-auto" style={{ color: 'rgba(255,255,255,0.7)' }}>Veldu tilboð á heimasíðunni og ýttu á „Nota tilboðið"</p>
              </div>
            )}
          </>
        )}

        {/* VISTAÐ tab */}
        {activeTab === 'vistadh' && (
          <>
            {savedDealObjects.length > 0 ? (
              <div>
                <p className="text-sm font-medium mb-3" style={{ color: 'rgba(255,255,255,0.7)' }}>{savedDealObjects.length} vistuð tilboð</p>
                <div className="grid grid-cols-2 gap-3">
                  {savedDealObjects.map((deal) => (
                    <DealCard
                      key={deal.id}
                      deal={deal}
                      onClick={() => setSelectedDeal(deal)}
                      isSaved={true}
                      onToggleSave={onToggleSave}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-5xl mb-4">❤️</p>
                <p className="text-white font-bold text-lg mb-1">Engin vistuð tilboð</p>
                <p className="text-sm max-w-xs mx-auto" style={{ color: 'rgba(255,255,255,0.7)' }}>Ýttu á hjartað á tilboðskortum til að vista þau hér</p>
              </div>
            )}
          </>
        )}

        {/* NOTAÐIR tab */}
        {activeTab === 'notadhir' && (
          <>
            <div className="glass-card rounded-2xl p-4 mb-4 flex items-center justify-between">
              <div>
                <p className="text-xs font-medium" style={{ color: 'rgba(26,58,0,0.6)' }}>Heildarsparnað</p>
                <p className="font-black text-2xl" style={{ color: '#1a3a00' }}>{totalSavedByUsed.toLocaleString('is-IS')} kr</p>
              </div>
              <div className="text-right">
                <p className="text-xs font-medium" style={{ color: 'rgba(26,58,0,0.6)' }}>Tilboð notuð</p>
                <p className="font-black text-2xl" style={{ color: '#1a3a00' }}>{mockUsedDeals.length}</p>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              {mockUsedDeals.map((d) => <UsedCard key={d.id} deal={d} />)}
            </div>
          </>
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
