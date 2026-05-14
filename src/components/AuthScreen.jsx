import { useState } from 'react';

const UNIVERSITIES = [
  { id: 'hi',      name: 'Háskóli Íslands',       short: 'HÍ',  domain: 'hi.is' },
  { id: 'ru',      name: 'Háskólinn í Reykjavík',  short: 'HR',  domain: 'student.ru.is' },
  { id: 'lhi',     name: 'Listaháskóli Íslands',   short: 'LHÍ', domain: 'lhi.is' },
  { id: 'unak',    name: 'Háskólinn á Akureyri',   short: 'HA',  domain: 'unak.is' },
  { id: 'bifrost', name: 'Bifröst',                short: 'BF',  domain: 'bifrost.is' },
  { id: 'lbhi',    name: 'Landbúnaðarháskólinn',   short: 'LBH', domain: 'lbhi.is' },
];

const ALL_DOMAINS = UNIVERSITIES.map((u) => u.domain);

const inputCls =
  'w-full rounded-2xl px-4 py-3.5 text-sm placeholder-[rgba(26,58,0,0.45)] outline-none font-medium glass-input';

function PasswordInput({ value, onChange, placeholder = 'Lykilorð' }) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <input
        className={inputCls}
        type={show ? 'text' : 'password'}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        autoComplete="new-password"
      />
      <button
        type="button"
        onClick={() => setShow(!show)}
        className="absolute right-4 top-1/2 -translate-y-1/2"
        style={{ color: 'rgba(26,58,0,0.5)' }}
      >
        {show ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.641 0-8.573-3.007-9.963-7.178z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        )}
      </button>
    </div>
  );
}

function SocialButton({ icon, label }) {
  return (
    <button
      className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl text-sm font-semibold transition-all active:scale-[0.98]"
      style={{ background: 'rgba(255,255,255,0.25)', color: '#1a3a00', border: '1px solid rgba(255,255,255,0.45)' }}
    >
      <span className="text-lg">{icon}</span>
      {label}
    </button>
  );
}

function StrengthBar({ password }) {
  const score = [/.{8,}/, /[A-Z]/, /[0-9]/, /[^A-Za-z0-9]/].filter((r) => r.test(password)).length;
  const colors = ['#ef4444', '#f97316', '#eab308', '#A8FF3E'];
  const labels = ['Veikt', 'Í lagi', 'Gott', 'Sterkt'];
  if (!password) return null;
  return (
    <div className="flex items-center gap-2 mt-1.5">
      <div className="flex gap-1 flex-1">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-1 flex-1 rounded-full"
            style={{ background: i < score ? colors[score - 1] : 'rgba(255,255,255,0.25)' }}
          />
        ))}
      </div>
      <span className="text-xs font-medium" style={{ color: score > 0 ? colors[score - 1] : 'rgba(255,255,255,0.5)' }}>
        {labels[score - 1] ?? ''}
      </span>
    </div>
  );
}

function LoginForm({ onSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [forgotSent, setForgotSent] = useState(false);

  const valid = email.includes('@') && password.length >= 6;

  const handleLogin = () => {
    if (!valid) return;
    setLoading(true);
    setError('');
    setTimeout(() => {
      setLoading(false);
      if (password === 'wrong') {
        setError('Rangt netfang eða lykilorð. Reyndu aftur.');
      } else {
        const name = email.split('@')[0];
        onSuccess({ name, email });
      }
    }, 1200);
  };

  const handleForgot = () => {
    if (!email.includes('@')) { setError('Sláðu inn netfangið þitt fyrst.'); return; }
    setForgotSent(true);
    setError('');
  };

  return (
    <div className="flex flex-col gap-3">
      {forgotSent && (
        <div className="rounded-2xl px-4 py-3 flex items-center gap-2" style={{ background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.35)' }}>
          <span>✉️</span>
          <p className="text-white text-sm font-medium">Sent! Athugaðu pósthólfið þitt.</p>
        </div>
      )}
      {error && (
        <div className="rounded-2xl px-4 py-3" style={{ background: 'rgba(255,100,100,0.25)', border: '1px solid rgba(255,100,100,0.3)' }}>
          <p className="text-white text-sm">{error}</p>
        </div>
      )}

      <input
        className={inputCls}
        type="email"
        placeholder="Netfang"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoComplete="email"
      />
      <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)} />

      <button
        type="button"
        onClick={handleForgot}
        className="text-right text-xs font-bold underline -mt-1"
        style={{ color: 'rgba(255,255,255,0.8)' }}
      >
        Gleymt lykilorð?
      </button>

      <button
        onClick={handleLogin}
        disabled={!valid || loading}
        className="w-full py-4 rounded-2xl font-black text-base transition-all active:scale-[0.98] mt-1"
        style={
          valid && !loading
            ? { background: '#A8FF3E', color: '#1a3a00' }
            : { background: 'rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.4)' }
        }
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="#1a3a00" strokeWidth="3" />
              <path className="opacity-75" fill="#1a3a00" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
            </svg>
            Innskrái...
          </span>
        ) : 'Innskrá'}
      </button>

      <div className="flex items-center gap-3 my-1">
        <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.25)' }} />
        <span className="text-xs" style={{ color: 'rgba(255,255,255,0.6)' }}>eða</span>
        <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.25)' }} />
      </div>

      <div className="flex gap-3">
        <SocialButton icon="🍎" label="Apple" />
        <SocialButton icon="G" label="Google" />
      </div>
    </div>
  );
}

function SignupStep1({ data, onChange, onNext }) {
  const valid =
    data.name.trim().length >= 2 &&
    data.email.includes('@') &&
    data.password.length >= 8 &&
    data.password === data.confirm;

  const mismatch = data.confirm && data.password !== data.confirm;

  return (
    <div className="flex flex-col gap-3">
      <input
        className={inputCls}
        placeholder="Fullt nafn"
        value={data.name}
        onChange={(e) => onChange({ ...data, name: e.target.value })}
        autoComplete="name"
      />
      <input
        className={inputCls}
        type="email"
        placeholder="Netfang"
        value={data.email}
        onChange={(e) => onChange({ ...data, email: e.target.value })}
        autoComplete="email"
      />
      <div>
        <PasswordInput
          value={data.password}
          onChange={(e) => onChange({ ...data, password: e.target.value })}
          placeholder="Lykilorð (min. 8 stafir)"
        />
        <StrengthBar password={data.password} />
      </div>
      <div>
        <PasswordInput
          value={data.confirm}
          onChange={(e) => onChange({ ...data, confirm: e.target.value })}
          placeholder="Staðfesta lykilorð"
        />
        {mismatch && (
          <p className="text-xs mt-1 ml-1" style={{ color: '#ffaaaa' }}>Lykilorð stemma ekki saman</p>
        )}
      </div>

      <button
        onClick={onNext}
        disabled={!valid}
        className="w-full py-4 rounded-2xl font-black text-base transition-all active:scale-[0.98] mt-1"
        style={
          valid
            ? { background: '#A8FF3E', color: '#1a3a00' }
            : { background: 'rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.4)' }
        }
      >
        Áfram
      </button>

      <div className="flex items-center gap-3 my-1">
        <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.25)' }} />
        <span className="text-xs" style={{ color: 'rgba(255,255,255,0.6)' }}>eða</span>
        <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.25)' }} />
      </div>
      <div className="flex gap-3">
        <SocialButton icon="🍎" label="Apple" />
        <SocialButton icon="G" label="Google" />
      </div>
    </div>
  );
}

function SignupStep2({ data, onChange, onNext, onBack, loading }) {
  const selectedUni = UNIVERSITIES.find((u) => u.id === data.university);
  const emailDomain = data.studentEmail.includes('@') ? data.studentEmail.split('@')[1] : '';
  const domainMatches = selectedUni && emailDomain === selectedUni.domain;
  const domainKnown = ALL_DOMAINS.includes(emailDomain);

  let emailHint = null;
  if (data.studentEmail && data.university) {
    if (domainMatches) {
      emailHint = { ok: true, msg: `✓ ${selectedUni.name} netfang staðfest` };
    } else if (emailDomain && !domainMatches) {
      emailHint = { ok: false, msg: `Netfangið á að enda á @${selectedUni.domain}` };
    }
  } else if (data.studentEmail && emailDomain && !domainKnown && emailDomain.length > 2) {
    emailHint = { ok: false, msg: 'Þetta virðist ekki vera skráð háskólanetfang' };
  }

  const valid = data.university && domainMatches;

  return (
    <div className="flex flex-col gap-4">
      <div>
        <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: 'rgba(255,255,255,0.7)' }}>Veldu háskóla</p>
        <div className="grid grid-cols-2 gap-2">
          {UNIVERSITIES.map((u) => (
            <button
              key={u.id}
              type="button"
              onClick={() => onChange({ ...data, university: u.id, studentEmail: '' })}
              className="flex items-center gap-2.5 p-3 rounded-2xl text-left transition-all"
              style={
                data.university === u.id
                  ? { background: 'rgba(255,255,255,0.4)', border: '2px solid rgba(255,255,255,0.7)' }
                  : { background: 'rgba(255,255,255,0.15)', border: '2px solid rgba(255,255,255,0.2)' }
              }
            >
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center text-xs font-black shrink-0"
                style={
                  data.university === u.id
                    ? { background: '#A8FF3E', color: '#1a3a00' }
                    : { background: 'rgba(255,255,255,0.25)', color: 'rgba(26,58,0,0.7)' }
                }
              >
                {u.short}
              </div>
              <span className="text-xs font-medium leading-tight" style={{ color: data.university === u.id ? '#1a3a00' : 'rgba(255,255,255,0.85)' }}>{u.name}</span>
            </button>
          ))}
        </div>
      </div>

      {data.university && (
        <div>
          <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: 'rgba(255,255,255,0.7)' }}>
            Netfang háskólans
          </p>
          <input
            className={inputCls}
            type="email"
            placeholder={`nafn@${selectedUni?.domain ?? 'haskoli.is'}`}
            value={data.studentEmail}
            onChange={(e) => onChange({ ...data, studentEmail: e.target.value })}
            autoComplete="email"
          />
          {emailHint && (
            <p className="text-xs mt-1.5 ml-1 font-medium" style={{ color: emailHint.ok ? '#A8FF3E' : '#ffaaaa' }}>
              {emailHint.msg}
            </p>
          )}
          <p className="text-xs mt-1 ml-1" style={{ color: 'rgba(255,255,255,0.55)' }}>
            Við sendum staðfestingarlink á þetta netfang
          </p>
        </div>
      )}

      <div className="flex gap-3 mt-1">
        <button
          onClick={onBack}
          className="flex-1 py-4 rounded-2xl font-semibold text-sm"
          style={{ background: 'rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.8)', border: '1px solid rgba(255,255,255,0.3)' }}
        >
          Til baka
        </button>
        <button
          onClick={onNext}
          disabled={!valid || loading}
          className="flex-[2] py-4 rounded-2xl font-black text-base transition-all active:scale-[0.98]"
          style={
            valid && !loading
              ? { background: '#1a3a00', color: '#A8FF3E' }
              : { background: 'rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.4)' }
          }
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="3" />
                <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
              </svg>
              Staðfesti...
            </span>
          ) : 'Staðfesta og skrá'}
        </button>
      </div>
    </div>
  );
}

function SignupSuccess({ name, onDone }) {
  return (
    <div className="flex flex-col items-center text-center py-4">
      <div
        className="w-20 h-20 rounded-3xl flex items-center justify-center mb-5"
        style={{ background: '#A8FF3E', boxShadow: '0 8px 24px rgba(0,0,0,0.15)' }}
      >
        <span className="text-4xl">🎉</span>
      </div>
      <h2 className="text-white font-black text-2xl mb-2">
        Velkomin(n), {name.split(' ')[0]}!
      </h2>
      <p className="text-sm leading-relaxed mb-2 max-w-xs" style={{ color: 'rgba(255,255,255,0.7)' }}>
        Reikningurinn þinn er kominn. Staðfestingarlink hefur verið sendur á netfangið þitt.
      </p>
      <div className="rounded-2xl px-4 py-3 mb-6 w-full" style={{ background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.3)' }}>
        <p className="text-white text-sm font-bold">🎁 Velkomnargjöf!</p>
        <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.7)' }}>Þú færð 500 kr kredít á fyrstu innlausnina</p>
      </div>
      <button
        onClick={onDone}
        className="w-full py-4 rounded-2xl font-black text-base"
        style={{ background: '#A8FF3E', color: '#1a3a00' }}
      >
        Byrja að nota Appsláttur
      </button>
    </div>
  );
}

function SignupForm({ onSuccess }) {
  const [step, setStep] = useState(0);
  const [info, setInfo] = useState({ name: '', email: '', password: '', confirm: '' });
  const [verify, setVerify] = useState({ university: '', studentEmail: '' });
  const [loading, setLoading] = useState(false);

  const handleVerify = () => {
    setLoading(true);
    setTimeout(() => { setLoading(false); setStep(2); }, 1500);
  };

  if (step === 2) {
    return <SignupSuccess name={info.name} onDone={() => onSuccess({ name: info.name, email: info.email })} />;
  }

  return (
    <>
      <div className="flex justify-center gap-1.5 mb-5">
        {[0, 1].map((i) => (
          <div
            key={i}
            className="rounded-full transition-all duration-300"
            style={{
              width: i === step ? 20 : 8,
              height: 8,
              background: i === step ? '#A8FF3E' : i < step ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.25)',
            }}
          />
        ))}
      </div>
      <p className="text-xs text-center mb-5" style={{ color: 'rgba(255,255,255,0.6)' }}>
        {step === 0 ? 'Grunnupplýsingar' : 'Staðfesta nemendastöðu'}
      </p>

      {step === 0 ? (
        <SignupStep1 data={info} onChange={setInfo} onNext={() => setStep(1)} />
      ) : (
        <SignupStep2 data={verify} onChange={setVerify} onNext={handleVerify} onBack={() => setStep(0)} loading={loading} />
      )}
    </>
  );
}

export default function AuthScreen({ onAuth }) {
  const [tab, setTab] = useState('login');

  return (
    <div className="flex flex-col min-h-screen">
      {/* Branded header */}
      <div className="px-6 pt-16 pb-8 relative overflow-hidden" style={{ background: 'rgba(0,0,0,0.15)', backdropFilter: 'blur(8px)', borderBottom: '1px solid rgba(255,255,255,0.2)' }}>
        <div className="absolute top-[-50px] right-[-30px] w-40 h-40 rounded-full blur-2xl opacity-30" style={{ background: '#A8FF3E' }} />
        <div className="flex items-center gap-3 mb-3 relative">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center"
            style={{ background: '#A8FF3E' }}
          >
            <img src="/appslattur.png" alt="Appsláttur" className="w-7 h-7 object-contain" />
          </div>
          <div>
            <h1 className="text-white font-black text-3xl tracking-tight leading-none">Appsláttur</h1>
            <p className="text-xs font-bold tracking-widest uppercase mt-0.5" style={{ color: 'rgba(255,255,255,0.7)' }}>
              Nemendatilboð
            </p>
          </div>
        </div>
        <p className="text-sm relative" style={{ color: 'rgba(255,255,255,0.65)' }}>
          {tab === 'login' ? 'Skráðu þig inn og finndu tilboðin.' : 'Búðu til reikning og byrjaðu að spara.'}
        </p>
      </div>

      {/* Tab switcher */}
      <div className="flex mx-5 mt-5 rounded-2xl p-1" style={{ background: 'rgba(255,255,255,0.15)' }}>
        {[
          { id: 'login', label: 'Innskrá' },
          { id: 'signup', label: 'Nýskrá' },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className="flex-1 py-2.5 rounded-xl text-sm font-bold transition-all"
            style={
              tab === t.id
                ? { background: 'rgba(255,255,255,0.9)', color: '#1a3a00', boxShadow: '0 1px 4px rgba(0,0,0,0.1)' }
                : { color: 'rgba(255,255,255,0.7)' }
            }
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Form area */}
      <div className="flex-1 overflow-y-auto px-5 pt-5 pb-10">
        {tab === 'login' ? (
          <LoginForm onSuccess={onAuth} />
        ) : (
          <SignupForm onSuccess={onAuth} />
        )}
      </div>

      {/* Footer */}
      <p className="text-center text-xs pb-8 px-6" style={{ color: 'rgba(255,255,255,0.5)' }}>
        Með því að halda áfram samþykkir þú{' '}
        <span className="text-white font-bold">skilmála</span> og{' '}
        <span className="text-white font-bold">persónuverndarstefnu</span> Appsláttur.
      </p>
    </div>
  );
}
