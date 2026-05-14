import { useState } from 'react';

const MOCK_STATS = [
  { label: 'Skoðanir', value: '1.240', delta: '+12%', up: true },
  { label: 'Innlausnir', value: '34', delta: '+5', up: true },
  { label: 'Efni búið til', value: '7', delta: '+2', up: true },
  { label: 'Meðaleinkunn', value: '4.6 ★', delta: '—', up: null },
];

const DEAL_TYPE_LABELS = { '2f1': '2 á verði 1', discount: 'Prósentuafsláttur', meal: 'Máltíðarboð' };

function StatCard({ label, value, delta, up }) {
  return (
    <div className="bg-white rounded-2xl p-4 border border-[#F0F0F0]" style={{ boxShadow: '0 1px 6px rgba(0,0,0,0.04)' }}>
      <p className="text-[#888888] text-xs mb-1">{label}</p>
      <p className="text-[#0A1A0A] font-black text-xl leading-none">{value}</p>
      {up !== null && (
        <p className={`text-xs font-bold mt-1 ${up ? 'text-[#65FE08]' : 'text-red-500'}`}
          style={{ color: up ? '#22c55e' : '#ef4444' }}>
          {delta} í þ.v.
        </p>
      )}
    </div>
  );
}

function PostDealSheet({ onClose, onPost }) {
  const [dealDescription, setDealDescription] = useState('');
  const [originalPrice, setOriginalPrice] = useState('');
  const [dealPrice, setDealPrice] = useState('');
  const [dealType, setDealType] = useState('discount');

  const discount =
    originalPrice && dealPrice
      ? Math.round((1 - dealPrice / originalPrice) * 100)
      : null;

  const valid = dealDescription.trim() && originalPrice && dealPrice;

  const inputCls = "w-full bg-[#F8F8F8] rounded-xl px-3 py-2.5 text-sm text-[#0A1A0A] placeholder-[#888888] outline-none focus:ring-2 focus:ring-[#65FE08]/40 font-medium";

  return (
    <div className="fixed inset-0 z-50 flex items-end" style={{ maxWidth: 430, margin: '0 auto', left: 0, right: 0 }}>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full bg-white rounded-t-3xl p-5 max-h-[85vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-[#0A1A0A] font-black text-lg">Nýtt tilboð</h3>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-[#F8F8F8] flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="none" stroke="#888888" strokeWidth={2.5} className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Deal type */}
        <div className="flex gap-2 mb-4">
          {Object.entries(DEAL_TYPE_LABELS).map(([id, label]) => (
            <button
              key={id}
              onClick={() => setDealType(id)}
              className={`flex-1 py-2 rounded-xl text-xs font-bold transition-colors ${
                dealType === id ? 'bg-[#65FE08] text-[#0A1A0A]' : 'bg-[#F8F8F8] text-[#888888]'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Prices */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div>
            <label className="text-[#888888] text-xs font-bold block mb-1.5">Upprunalegt verð (kr)</label>
            <input
              className={inputCls}
              type="number"
              placeholder="2490"
              value={originalPrice}
              onChange={(e) => setOriginalPrice(e.target.value)}
            />
          </div>
          <div>
            <label className="text-[#888888] text-xs font-bold block mb-1.5">Tilboðsverð (kr)</label>
            <input
              className={inputCls}
              type="number"
              placeholder="1245"
              value={dealPrice}
              onChange={(e) => setDealPrice(e.target.value)}
            />
          </div>
        </div>

        {discount !== null && discount > 0 && (
          <div className="bg-[#65FE08]/10 border border-[#65FE08]/30 rounded-xl px-4 py-2 mb-4 flex items-center gap-2">
            <span className="text-[#0A1A0A] font-black text-sm">{discount}% afsláttur</span>
          </div>
        )}

        {/* Description */}
        <div className="mb-5">
          <label className="text-[#888888] text-xs font-bold block mb-1.5">Lýsing *</label>
          <textarea
            className={`${inputCls} resize-none`}
            rows={3}
            placeholder="Hvað fær nemandinn í þessu tilboði?"
            value={dealDescription}
            onChange={(e) => setDealDescription(e.target.value)}
          />
        </div>

        <button
          onClick={() => { if (valid) onPost({ dealType, originalPrice, dealPrice, dealDescription, discount }); }}
          disabled={!valid}
          className="w-full bg-[#0A1A0A] disabled:bg-[#F8F8F8] disabled:text-[#888888] text-white py-4 rounded-2xl font-black text-base"
        >
          Birta tilboð
        </button>
      </div>
    </div>
  );
}

export default function BusinessDashboard({ business, onClose }) {
  const [showPostSheet, setShowPostSheet] = useState(false);
  const [deals, setDeals] = useState([
    {
      id: 1,
      dealType: business?.deal?.dealType || 'discount',
      dealDescription: business?.deal?.dealDescription || 'Fyrsta tilboðið þitt',
      originalPrice: business?.deal?.originalPrice || '2490',
      dealPrice: business?.deal?.dealPrice || '1745',
      discount: business?.deal?.originalPrice
        ? Math.round((1 - business.deal.dealPrice / business.deal.originalPrice) * 100)
        : 30,
      active: true,
      views: 0,
      redemptions: 0,
    },
  ]);
  const [justPosted, setJustPosted] = useState(false);

  const handlePost = (newDeal) => {
    setDeals([
      {
        id: Date.now(),
        ...newDeal,
        active: true,
        views: 0,
        redemptions: 0,
      },
      ...deals,
    ]);
    setShowPostSheet(false);
    setJustPosted(true);
    setTimeout(() => setJustPosted(false), 3000);
  };

  const toggleDeal = (id) => {
    setDeals(deals.map((d) => (d.id === id ? { ...d, active: !d.active } : d)));
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F8F8F8]">
      {/* Header */}
      <div className="bg-white px-5 pt-12 pb-6 border-b border-[#F0F0F0]">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 text-[#888888] text-sm"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Til baka
          </button>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-[#65FE08] animate-pulse" />
            <span className="text-[#0A1A0A] text-xs font-bold">Í loftinu</span>
          </div>
        </div>

        <p className="text-[#888888] text-xs uppercase tracking-wider mb-1 font-bold">Business mælaborð</p>
        <h1 className="text-[#0A1A0A] font-black text-xl">{business?.name || 'Veitingastaðurinn þinn'}</h1>
        <p className="text-[#888888] text-sm mt-0.5">{business?.neighborhood} · {business?.category}</p>
      </div>

      <div className="flex-1 overflow-y-auto pb-24 px-4">
        {/* Success toast */}
        {justPosted && (
          <div className="mt-4 bg-[#65FE08] text-[#0A1A0A] rounded-2xl px-4 py-3 flex items-center gap-2">
            <span>🎉</span>
            <span className="text-sm font-black">Tilboðið þitt er nú í loftinu!</span>
          </div>
        )}

        {/* Stats */}
        <div className="mt-4 grid grid-cols-2 gap-3 mb-5">
          {MOCK_STATS.map((s) => (
            <StatCard key={s.label} {...s} />
          ))}
        </div>

        {/* Content creator inbound */}
        <div className="bg-white rounded-2xl p-4 border border-[#F0F0F0] mb-5" style={{ boxShadow: '0 1px 6px rgba(0,0,0,0.04)' }}>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-[#0A1A0A] font-black text-sm">Efnisbeiðnir 📸</h3>
            <span className="bg-[#0A1A0A] text-white text-xs px-2 py-0.5 rounded-full font-bold">3 nýjar</span>
          </div>
          {[
            { name: 'Sigríður H.', followers: '2.4k', platform: 'Instagram', photo: '👩' },
            { name: 'Gunnar B.', followers: '890', platform: 'TikTok', photo: '👨' },
            { name: 'Katrín M.', followers: '5.1k', platform: 'Instagram', photo: '👩‍🦱' },
          ].map((req) => (
            <div key={req.name} className="flex items-center justify-between py-2.5 border-b border-[#F8F8F8] last:border-0">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#F8F8F8] flex items-center justify-center text-base">{req.photo}</div>
                <div>
                  <p className="text-[#0A1A0A] text-sm font-semibold">{req.name}</p>
                  <p className="text-[#888888] text-xs">{req.followers} fylgjendur · {req.platform}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="bg-[#65FE08] text-[#0A1A0A] text-xs px-3 py-1 rounded-full font-bold">Samþykkja</button>
                <button className="bg-[#F8F8F8] text-[#888888] text-xs px-2 py-1 rounded-full border border-[#F0F0F0]">✕</button>
              </div>
            </div>
          ))}
        </div>

        {/* Active deals */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-[#0A1A0A] font-black text-sm">Tilboðin þín</h3>
            <button
              onClick={() => setShowPostSheet(true)}
              className="flex items-center gap-1 bg-[#65FE08] text-[#0A1A0A] text-xs px-3 py-1.5 rounded-full font-black"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-3 h-3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              Nýtt tilboð
            </button>
          </div>

          <div className="flex flex-col gap-3">
            {deals.map((d) => (
              <div key={d.id} className="bg-white rounded-2xl p-4 border border-[#F0F0F0]" style={{ boxShadow: '0 1px 6px rgba(0,0,0,0.04)' }}>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${d.active ? 'bg-[#65FE08] text-[#0A1A0A]' : 'bg-[#F8F8F8] text-[#888888]'}`}>
                        {d.active ? 'VIRKT' : 'ÓVIRKT'}
                      </span>
                      <span className="text-[#888888] text-xs">{DEAL_TYPE_LABELS[d.dealType]}</span>
                    </div>
                    <p className="text-[#0A1A0A] text-sm leading-relaxed truncate font-medium">{d.dealDescription}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-[#0A1A0A] font-black text-sm">{Number(d.dealPrice).toLocaleString('is-IS')} kr</span>
                      <span className="text-[#888888] text-xs line-through">{Number(d.originalPrice).toLocaleString('is-IS')} kr</span>
                      <span className="text-[#888888] text-xs font-bold">-{d.discount}%</span>
                    </div>
                  </div>
                  {/* Toggle */}
                  <button
                    onClick={() => toggleDeal(d.id)}
                    className="shrink-0 mt-1 relative"
                    style={{ width: 44, height: 24 }}
                  >
                    <div className={`w-full h-full rounded-full transition-colors ${d.active ? 'bg-[#65FE08]' : 'bg-[#F0F0F0]'}`} />
                    <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform shadow-sm ${d.active ? 'translate-x-[26px]' : 'translate-x-1'}`} />
                  </button>
                </div>

                {/* Mini stats */}
                <div className="flex gap-4 mt-3 pt-3 border-t border-[#F8F8F8]">
                  <div className="flex items-center gap-1">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#888888" strokeWidth={1.8} className="w-3.5 h-3.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.641 0-8.573-3.007-9.963-7.178z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-[#888888] text-xs">{d.views} skoðanir</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#888888" strokeWidth={1.8} className="w-3.5 h-3.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-[#888888] text-xs">{d.redemptions} innlausnir</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Add more deals CTA */}
        <button
          onClick={() => setShowPostSheet(true)}
          className="w-full border-2 border-dashed border-[#F0F0F0] rounded-2xl py-5 flex flex-col items-center gap-2 text-[#888888] active:bg-[#F8F8F8]"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          <span className="text-sm font-semibold">Bæta við tilboði</span>
        </button>
      </div>

      {showPostSheet && (
        <PostDealSheet
          onClose={() => setShowPostSheet(false)}
          onPost={handlePost}
        />
      )}
    </div>
  );
}
