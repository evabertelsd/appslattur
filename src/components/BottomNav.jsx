const tabs = [
  { id: 'home',    label: 'Heim',         icon: HomeIcon },
  { id: 'search',  label: 'Leita',        icon: SearchIcon },
  { id: 'deals',   label: 'Tilboð',       icon: TagIcon },
  { id: 'creator', label: 'Efnisskapari', icon: CreatorIcon },
  { id: 'profile', label: 'Minn',         icon: UserIcon },
];

function HomeIcon({ active }) {
  return (
    <svg viewBox="0 0 24 24" fill={active ? '#1a3a00' : 'none'} stroke={active ? '#1a3a00' : 'rgba(255,255,255,0.75)'} strokeWidth={1.8} className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
    </svg>
  );
}

function SearchIcon({ active }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke={active ? '#1a3a00' : 'rgba(255,255,255,0.75)'} strokeWidth={1.8} className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
    </svg>
  );
}

function TagIcon({ active }) {
  return (
    <svg viewBox="0 0 24 24" fill={active ? '#1a3a00' : 'none'} stroke={active ? '#1a3a00' : 'rgba(255,255,255,0.75)'} strokeWidth={1.8} className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
    </svg>
  );
}

function CreatorIcon({ active }) {
  return (
    <svg viewBox="0 0 24 24" fill={active ? '#1a3a00' : 'none'} stroke={active ? '#1a3a00' : 'rgba(255,255,255,0.75)'} strokeWidth={1.8} className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
    </svg>
  );
}

function UserIcon({ active }) {
  return (
    <svg viewBox="0 0 24 24" fill={active ? '#1a3a00' : 'none'} stroke={active ? '#1a3a00' : 'rgba(255,255,255,0.75)'} strokeWidth={1.8} className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
    </svg>
  );
}

export default function BottomNav({ activeTab, onTabChange }) {
  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] glass-nav z-50 pb-safe">
      <div className="flex items-center justify-around px-1 pt-2 pb-3">
        {tabs.map((tab) => {
          const active = activeTab === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className="flex flex-col items-center gap-0.5 px-2 py-1 rounded-2xl transition-all"
            >
              <div
                className="relative p-1.5 rounded-xl transition-all"
                style={active ? { background: 'rgba(255,255,255,0.9)' } : {}}
              >
                <Icon active={active} />
              </div>
              <span className={`text-[9px] font-semibold transition-colors ${active ? 'text-white font-black' : 'text-white/60'}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
