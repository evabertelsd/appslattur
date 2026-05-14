import { useState } from 'react';

const campaigns = [
  {
    id: 1,
    brand: 'Hamborgarabúllan',
    emoji: '🍔',
    reward: '500 kr afsláttur',
    rewardValue: 500,
    task: 'Instagram mynd af máltíð',
    platform: 'Instagram',
    deadline: '31. maí 2026',
    spotsLeft: 3,
    totalSpots: 10,
    requirements: ['Min. 500 fylgjendur', 'Opinber reikningur', 'Taga @appslattur'],
  },
  {
    id: 2,
    brand: 'Kaffi Mokka',
    emoji: '☕',
    reward: '30% afsláttur',
    rewardValue: null,
    task: 'TikTok myndband (min. 15 sek.)',
    platform: 'TikTok',
    deadline: '15. júní 2026',
    spotsLeft: 8,
    totalSpots: 15,
    requirements: ['Min. 1.000 fylgjendur', 'Sýna vöruna skýrt', 'Nota #Appsláttur'],
  },
  {
    id: 3,
    brand: 'Eldsmiðjan',
    emoji: '🍕',
    reward: '25% afsláttur',
    rewardValue: null,
    task: 'Instagram story + swipe-up tengill',
    platform: 'Instagram',
    deadline: '20. maí 2026',
    spotsLeft: 1,
    totalSpots: 5,
    requirements: ['Min. 2.000 fylgjendur', 'Story með tengil', 'Taga veitingastaðinn'],
  },
  {
    id: 4,
    brand: 'Pítuvagninn',
    emoji: '🥙',
    reward: '20% afsláttur',
    rewardValue: null,
    task: 'Facebook innlegg með mynd',
    platform: 'Facebook',
    deadline: '1. júní 2026',
    spotsLeft: 5,
    totalSpots: 8,
    requirements: ['Min. 300 vinir/fylgjendur', 'Mynd af vörunni', 'Taga Pítuvagninn'],
  },
];

const initialSubmissions = [
  {
    id: 1,
    brand: 'Eldsmiðjan',
    emoji: '🍕',
    task: 'Instagram story',
    status: 'approved',
    reward: '30% afsláttur',
    submittedDate: '10. maí 2026',
    platform: 'Instagram',
  },
  {
    id: 2,
    brand: 'Kaffi Mokka',
    emoji: '☕',
    task: 'TikTok myndband',
    status: 'pending',
    reward: '25% afsláttur',
    submittedDate: '12. maí 2026',
    platform: 'TikTok',
  },
];

const statusConfig = {
  pending:  { label: 'Í bið',       color: '#7a5500', bg: 'rgba(245,158,11,0.25)' },
  approved: { label: 'Samþykkt ✓',  color: '#1a3a00', bg: '#A8FF3E' },
  rejected: { label: 'Hafnað',      color: '#7a0000', bg: 'rgba(239,68,68,0.2)' },
};

const steps = [
  { icon: '🎯', title: 'Veldu herferð',      desc: 'Finndu tilboð sem hentar þér' },
  { icon: '📸', title: 'Búðu til efni',       desc: 'Taktu mynd eða myndband' },
  { icon: '📤', title: 'Sendu okkur tengil',  desc: 'Hleðu upp gögnum hér' },
  { icon: '🎁', title: 'Þiggðu verðlaun',    desc: 'Fáðu afslætti á næstu heimsókn' },
];

export default function CreatorScreen() {
  const [submissions, setSubmissions] = useState(initialSubmissions);
  const [showUpload, setShowUpload] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [uploadUrl, setUploadUrl] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleApply = (campaign) => {
    setSelectedCampaign(campaign);
    setShowUpload(true);
    setSubmitted(false);
    setUploadUrl('');
  };

  const handleSubmit = () => {
    if (!uploadUrl.trim()) return;
    setSubmissions([
      {
        id: Date.now(),
        brand: selectedCampaign.brand,
        emoji: selectedCampaign.emoji,
        task: selectedCampaign.task,
        status: 'pending',
        reward: selectedCampaign.reward,
        submittedDate: '13. maí 2026',
        platform: selectedCampaign.platform,
      },
      ...submissions,
    ]);
    setSubmitted(true);
    setTimeout(() => { setShowUpload(false); setSelectedCampaign(null); }, 2000);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <div className="glass-header px-4 pt-12 pb-5">
        <div className="flex items-center gap-3 mb-1">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
            style={{ background: '#A8FF3E' }}
          >
            📸
          </div>
          <div>
            <h1 className="text-white font-black text-3xl leading-tight">Efnisskapari</h1>
            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.7)' }}>Vinna afslætti með efni á samfélagsmiðlum</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-24">
        {/* How it works */}
        <div className="px-4 py-5">
          <h2 className="text-white font-black text-lg mb-4">Hvernig virkar þetta?</h2>
          <div className="grid grid-cols-2 gap-3">
            {steps.map((step, i) => (
              <div key={i} className="glass-card rounded-2xl p-3">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-base mb-2"
                  style={{ background: '#A8FF3E' }}
                >
                  {step.icon}
                </div>
                <p className="text-[10px] font-bold uppercase tracking-wider mb-0.5" style={{ color: 'rgba(26,58,0,0.5)' }}>Skref {i + 1}</p>
                <p className="font-bold text-sm" style={{ color: '#1a3a00' }}>{step.title}</p>
                <p className="text-xs mt-0.5 leading-relaxed" style={{ color: 'rgba(26,58,0,0.6)' }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* My submissions */}
        {submissions.length > 0 && (
          <div className="px-4 pb-5">
            <h2 className="text-white font-black text-lg mb-3">Mín efni</h2>
            <div className="flex flex-col gap-2">
              {submissions.map((s) => {
                const cfg = statusConfig[s.status];
                return (
                  <div key={s.id} className="glass-card rounded-2xl p-4 flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0"
                      style={{ background: 'rgba(255,255,255,0.3)' }}
                    >
                      {s.emoji}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-sm" style={{ color: '#1a3a00' }}>{s.brand}</p>
                      <p className="text-xs truncate" style={{ color: 'rgba(26,58,0,0.6)' }}>{s.task} · {s.platform}</p>
                      <p className="text-xs" style={{ color: 'rgba(26,58,0,0.5)' }}>{s.submittedDate}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <span
                        className="text-[10px] font-black px-2.5 py-1 rounded-full block mb-1"
                        style={{ backgroundColor: cfg.bg, color: cfg.color }}
                      >
                        {cfg.label}
                      </span>
                      <p className="text-[10px]" style={{ color: 'rgba(26,58,0,0.5)' }}>{s.reward}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Available campaigns */}
        <div className="px-4 pb-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-white font-black text-lg">Tiltækar herferðir</h2>
            <span className="text-xs font-medium" style={{ color: 'rgba(255,255,255,0.7)' }}>{campaigns.length} tiltækar</span>
          </div>
          <div className="flex flex-col gap-3">
            {campaigns.map((c) => (
              <div key={c.id} className="glass-card rounded-2xl overflow-hidden">
                <div className="p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0"
                      style={{ background: 'rgba(255,255,255,0.35)' }}
                    >
                      {c.emoji}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-black text-base" style={{ color: '#1a3a00' }}>{c.brand}</p>
                        <span
                          className="text-[10px] font-black px-2 py-0.5 rounded-full"
                          style={{ background: '#A8FF3E', color: '#1a3a00' }}
                        >
                          {c.reward}
                        </span>
                      </div>
                      <p className="text-xs mt-0.5" style={{ color: 'rgba(26,58,0,0.6)' }}>{c.task} · {c.platform}</p>
                    </div>
                  </div>

                  {/* Spots progress */}
                  <div className="mb-3">
                    <div className="flex justify-between text-xs mb-1">
                      <span style={{ color: 'rgba(26,58,0,0.6)' }} className="font-medium">{c.spotsLeft} af {c.totalSpots} pláss eftir</span>
                      <span style={{ color: 'rgba(26,58,0,0.5)' }}>Til: {c.deadline}</span>
                    </div>
                    <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(26,58,0,0.12)' }}>
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${(c.spotsLeft / c.totalSpots) * 100}%`, background: '#A8FF3E' }}
                      />
                    </div>
                  </div>

                  {/* Requirements */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {c.requirements.map((r, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-medium px-2.5 py-1 rounded-full"
                        style={{ background: 'rgba(255,255,255,0.3)', color: '#1a3a00' }}
                      >
                        {r}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => handleApply(c)}
                    disabled={c.spotsLeft === 0}
                    className="w-full py-2.5 rounded-xl font-bold text-sm transition-all active:scale-[0.98]"
                    style={
                      c.spotsLeft === 0
                        ? { background: 'rgba(255,255,255,0.2)', color: 'rgba(26,58,0,0.4)', cursor: 'not-allowed' }
                        : { background: '#1a3a00', color: '#A8FF3E' }
                    }
                  >
                    {c.spotsLeft === 0 ? 'Fullbókaðar' : 'Sækja um'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Upload sheet */}
      {showUpload && (
        <div className="fixed inset-0 z-50 flex items-end" style={{ maxWidth: 430, margin: '0 auto', left: 0, right: 0 }}>
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowUpload(false)} />
          <div className="relative w-full bg-white rounded-t-3xl p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-black text-lg" style={{ color: '#1a3a00' }}>{selectedCampaign?.brand}</h3>
                <p className="text-xs" style={{ color: 'rgba(26,58,0,0.6)' }}>{selectedCampaign?.task}</p>
              </div>
              <button
                onClick={() => setShowUpload(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ background: '#f0f0f0' }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="#888888" strokeWidth={2.5} className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {submitted ? (
              <div className="text-center py-6">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-3" style={{ background: '#A8FF3E' }}>✓</div>
                <p className="font-black text-lg" style={{ color: '#1a3a00' }}>Sent inn!</p>
                <p className="text-sm mt-1" style={{ color: 'rgba(26,58,0,0.6)' }}>Við skoðum efnið þitt og svörum innan 24 klst.</p>
              </div>
            ) : (
              <>
                <div className="mb-4">
                  <label className="text-sm font-bold block mb-2" style={{ color: '#1a3a00' }}>Tengill að birtingu *</label>
                  <input
                    type="url"
                    value={uploadUrl}
                    onChange={(e) => setUploadUrl(e.target.value)}
                    placeholder="https://instagram.com/p/..."
                    className="w-full bg-[#F8F8F8] rounded-xl px-4 py-3 text-sm placeholder-[#888888] outline-none font-medium"
                    style={{ color: '#1a3a00' }}
                  />
                  <p className="text-xs mt-1.5" style={{ color: '#888888' }}>Límdu inn tengil að Instagram-mynd, TikTok-myndbandi o.fl.</p>
                </div>

                <div className="bg-[#F8F8F8] rounded-xl p-3 mb-4">
                  <p className="text-xs font-bold mb-1.5" style={{ color: '#1a3a00' }}>Kröfur:</p>
                  {selectedCampaign?.requirements.map((r, i) => (
                    <p key={i} className="text-xs flex items-center gap-1.5" style={{ color: '#555' }}>
                      <span className="font-bold" style={{ color: '#4DC900' }}>✓</span> {r}
                    </p>
                  ))}
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={!uploadUrl.trim()}
                  className="w-full py-4 rounded-2xl font-black text-base transition-all"
                  style={
                    uploadUrl.trim()
                      ? { background: '#A8FF3E', color: '#1a3a00' }
                      : { background: '#F8F8F8', color: '#888888' }
                  }
                >
                  Senda inn til yfirferðar
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
