const mockWallet = [
  { code: 'HB-2X1-4821', brand: 'Hamborgarabúllan', discount: '2 á verði 1', expires: '31. maí', accentColor: '#FF6B35' },
  { code: 'GK-MLT-7743', brand: 'Grænn Kostur', discount: '30% afsláttur', expires: '28. maí', accentColor: '#A8FF3E' },
];

const menuItems = [
  { icon: '🎓', label: 'Nemendastaðfesting', badge: '✓ Staðfest', badgeLime: true },
  { icon: '🔔', label: 'Tilkynningar', badge: '3', badgeLime: false },
  { icon: '💳', label: 'Greiðslumátar', badge: null, badgeLime: false },
  { icon: '🌐', label: 'Tungumál', badge: 'Íslenska', badgeLime: false },
  { icon: '🔒', label: 'Öryggi og lykilorð', badge: null, badgeLime: false },
  { icon: '❓', label: 'Hjálp og stuðningur', badge: null, badgeLime: false },
  { icon: '📄', label: 'Skilmálar og persónuvernd', badge: null, badgeLime: false },
];

export default function ProfileScreen({ onOpenBusiness, onLogout, user, savedDeals }) {
  const displayName = user?.name || 'Stúdent';
  const initials = displayName.trim().split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase();
  const savedCount = savedDeals?.size ?? 0;

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <div className="glass-header px-4 pt-12 pb-5">
        <div className="flex items-center justify-between mb-5">
          <h1 className="text-white font-black text-3xl">Minn reikningur</h1>
          <button
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.3)' }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={1.8} className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        </div>

        {/* Avatar */}
        <div className="flex items-center gap-4">
          <div
            className="rounded-2xl flex items-center justify-center text-2xl font-black"
            style={{ width: 72, height: 72, background: '#A8FF3E', color: '#1a3a00' }}
          >
            {initials}
          </div>
          <div>
            <h2 className="text-white font-black text-xl">{displayName}</h2>
            <p className="text-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>{user?.email || 'nemandi@hi.is'}</p>
            <div className="flex items-center gap-1.5 mt-1.5">
              <div className="rounded-full px-2.5 py-0.5 flex items-center gap-1" style={{ background: '#A8FF3E' }}>
                <span className="text-[10px] font-black" style={{ color: '#1a3a00' }}>🎓 STAÐFEST NEMANDI</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="flex gap-3 mt-5">
          {[
            { label: 'Heildarsparnað', value: '8.240 kr' },
            { label: 'Tilboð notuð', value: '12' },
            { label: 'Vistað', value: String(savedCount) },
          ].map((stat) => (
            <div key={stat.label} className="flex-1 glass-card rounded-xl p-3 text-center">
              <p className="font-black text-base" style={{ color: '#1a3a00' }}>{stat.value}</p>
              <p className="text-[10px] font-medium mt-0.5" style={{ color: 'rgba(26,58,0,0.6)' }}>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-24 px-4 pt-4">
        {/* Discount wallet */}
        <div className="mb-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-white font-black text-lg">Afsláttarmiðaveski</h2>
            <span className="text-xs font-medium" style={{ color: 'rgba(255,255,255,0.7)' }}>{mockWallet.length} virkir</span>
          </div>
          <div className="flex flex-col gap-2">
            {mockWallet.map((w) => (
              <div key={w.code} className="glass-card rounded-2xl p-4 flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: w.accentColor + '30' }}
                >
                  <span className="text-lg">🎫</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm" style={{ color: '#1a3a00' }}>{w.brand}</p>
                  <p className="text-xs" style={{ color: 'rgba(26,58,0,0.6)' }}>{w.discount}</p>
                  <p className="font-mono text-xs font-bold tracking-widest mt-0.5" style={{ color: 'rgba(26,58,0,0.5)' }}>{w.code}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-[10px]" style={{ color: 'rgba(26,58,0,0.5)' }}>Rennur út</p>
                  <p className="text-xs font-bold" style={{ color: '#1a3a00' }}>{w.expires}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Menu */}
        <div className="glass-card rounded-2xl mb-4 overflow-hidden">
          {menuItems.map((item, i) => (
            <div
              key={item.label}
              className="flex items-center justify-between px-4 py-3.5 cursor-pointer"
              style={i < menuItems.length - 1 ? { borderBottom: '1px solid rgba(255,255,255,0.2)' } : {}}
            >
              <div className="flex items-center gap-3">
                <span className="text-lg">{item.icon}</span>
                <span className="text-sm font-semibold" style={{ color: '#1a3a00' }}>{item.label}</span>
              </div>
              <div className="flex items-center gap-2">
                {item.badge && (
                  <span
                    className="text-xs font-bold px-2.5 py-0.5 rounded-full"
                    style={
                      item.badgeLime
                        ? { background: '#A8FF3E', color: '#1a3a00' }
                        : { background: 'rgba(255,255,255,0.3)', color: 'rgba(26,58,0,0.7)' }
                    }
                  >
                    {item.badge}
                  </span>
                )}
                <svg viewBox="0 0 24 24" fill="none" stroke="rgba(26,58,0,0.3)" strokeWidth={2} className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </div>
            </div>
          ))}
        </div>

        {/* Business CTA */}
        <button
          onClick={onOpenBusiness}
          className="w-full mb-4 rounded-2xl p-4 flex items-center gap-3 text-left"
          style={{ background: '#1a3a00' }}
        >
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0"
            style={{ background: '#A8FF3E' }}
          >
            🏪
          </div>
          <div className="flex-1">
            <p className="text-white font-bold text-sm">Ertu með veitingastað?</p>
            <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.55)' }}>Skráðu þig og birtu tilboð á Appsláttur</p>
          </div>
          <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2} className="w-4 h-4 opacity-40 shrink-0">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>

        <button
          onClick={onLogout}
          className="w-full py-3.5 rounded-2xl text-sm font-semibold"
          style={{ background: 'rgba(255,255,255,0.2)', color: 'white', border: '1px solid rgba(255,255,255,0.3)' }}
        >
          Skrá út
        </button>
      </div>
    </div>
  );
}
