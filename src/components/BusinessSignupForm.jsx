import { useState } from 'react';

const CATEGORIES = ['Borgarar', 'Pítsa', 'Samlokur', 'Píta', 'Salat', 'Kaffi', 'Íslenski matur', 'Asíuskinn', 'Annað'];
const NEIGHBORHOODS = ['Miðborg', 'Hlíðar', 'Laugardalur', 'Breiðholt', 'Grafarholt', 'Kópavogur', 'Garðabær'];
const DEAL_TYPES = [
  { id: '2f1', label: '2 á verði 1', desc: 'Tveir réttir á verði eins' },
  { id: 'discount', label: 'Prósentuafsláttur', desc: 'T.d. 20%, 30% eða 50% afsláttur' },
  { id: 'meal', label: 'Máltíðarboð', desc: 'Sett máltíð á sérstöku verði' },
];
const TIMINGS = [
  { id: 'now', label: '🟢 Opið núna' },
  { id: 'lunch', label: '☀️ Hádegi (11–14)' },
  { id: 'evening', label: '🌙 Kvöld (17–22)' },
  { id: 'today', label: '📅 Allt í dag' },
  { id: 'weekend', label: '📆 Helgar' },
];

const STEPS = ['Upplýsingar', 'Staðsetning', 'Fyrsta tilboð'];

function StepIndicator({ current }) {
  return (
    <div className="flex items-center justify-center gap-2 mb-6">
      {STEPS.map((label, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <div key={label} className="flex items-center gap-2">
            <div className={`flex items-center justify-center w-7 h-7 rounded-full text-xs font-black transition-colors ${
              done ? 'bg-[#65FE08] text-[#0A1A0A]' : active ? 'bg-[#0A1A0A] text-white' : 'bg-[#F0F0F0] text-[#888888]'
            }`}>
              {done ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-3.5 h-3.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              ) : i + 1}
            </div>
            <span className={`text-xs font-medium hidden sm:inline ${active ? 'text-[#0A1A0A]' : 'text-[#888888]'}`}>
              {label}
            </span>
            {i < STEPS.length - 1 && (
              <div className={`w-6 h-0.5 mx-1 rounded ${done ? 'bg-[#65FE08]' : 'bg-[#F0F0F0]'}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

function Field({ label, children, hint }) {
  return (
    <div className="mb-4">
      <label className="text-[#0A1A0A] text-sm font-bold block mb-1.5">{label}</label>
      {children}
      {hint && <p className="text-[#888888] text-xs mt-1">{hint}</p>}
    </div>
  );
}

const inputCls = "w-full bg-[#F8F8F8] rounded-xl px-4 py-3 text-sm text-[#0A1A0A] placeholder-[#888888] outline-none focus:ring-2 focus:ring-[#65FE08]/40 transition-colors font-medium";
const textareaCls = `${inputCls} resize-none`;

function Step1({ data, onChange, onNext }) {
  const valid = data.name.trim() && data.category && data.description.trim();
  return (
    <div>
      <h2 className="text-[#0A1A0A] font-black text-xl mb-1">Um veitingastaðinn</h2>
      <p className="text-[#888888] text-sm mb-6">Grunnupplýsingar um staðinn þinn</p>

      <Field label="Nafn veitingastaðar *">
        <input
          className={inputCls}
          placeholder="T.d. Hamborgarabúllan Vegamót"
          value={data.name}
          onChange={(e) => onChange({ ...data, name: e.target.value })}
        />
      </Field>

      <Field label="Tegund matar *">
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => onChange({ ...data, category: c })}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-colors ${
                data.category === c
                  ? 'bg-[#65FE08] text-[#0A1A0A]'
                  : 'bg-[#F8F8F8] text-[#888888] border border-[#F0F0F0]'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </Field>

      <Field label="Stutt lýsing *" hint="Birtist undir nafni á tilboðskorti (max 60 stafir)">
        <textarea
          className={textareaCls}
          rows={2}
          maxLength={60}
          placeholder="T.d. Handgerðar borgararar frá 1981"
          value={data.description}
          onChange={(e) => onChange({ ...data, description: e.target.value })}
        />
        <p className="text-right text-[#888888] text-xs mt-1">{data.description.length}/60</p>
      </Field>

      <Field label="Mynd af staðnum" hint="Tengill á mynd (JPG eða PNG). Við getum hjálpað þér síðar.">
        <input
          className={inputCls}
          placeholder="https://..."
          value={data.imageUrl}
          onChange={(e) => onChange({ ...data, imageUrl: e.target.value })}
        />
      </Field>

      <button
        onClick={onNext}
        disabled={!valid}
        className="w-full bg-[#65FE08] disabled:bg-[#F8F8F8] disabled:text-[#888888] text-[#0A1A0A] py-4 rounded-2xl font-black text-base transition-colors mt-2"
      >
        Áfram
      </button>
    </div>
  );
}

function Step2({ data, onChange, onNext, onBack }) {
  const valid = data.neighborhood && data.address.trim() && data.email.trim();
  return (
    <div>
      <h2 className="text-[#0A1A0A] font-black text-xl mb-1">Staðsetning & samband</h2>
      <p className="text-[#888888] text-sm mb-6">Hvar er staðurinn og hvernig náum við í þig?</p>

      <Field label="Hverfi *">
        <div className="flex flex-wrap gap-2">
          {NEIGHBORHOODS.map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => onChange({ ...data, neighborhood: n })}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-colors ${
                data.neighborhood === n
                  ? 'bg-[#65FE08] text-[#0A1A0A]'
                  : 'bg-[#F8F8F8] text-[#888888] border border-[#F0F0F0]'
              }`}
            >
              {n}
            </button>
          ))}
        </div>
      </Field>

      <Field label="Heimilisfang *">
        <input
          className={inputCls}
          placeholder="T.d. Vegamótastígur 1, 101 Reykjavík"
          value={data.address}
          onChange={(e) => onChange({ ...data, address: e.target.value })}
        />
      </Field>

      <Field label="Netfang *" hint="Við sendum þér staðfestingu og reikninga hér">
        <input
          className={inputCls}
          type="email"
          placeholder="matur@veitingastadur.is"
          value={data.email}
          onChange={(e) => onChange({ ...data, email: e.target.value })}
        />
      </Field>

      <Field label="Símanúmer">
        <input
          className={inputCls}
          type="tel"
          placeholder="555-1234"
          value={data.phone}
          onChange={(e) => onChange({ ...data, phone: e.target.value })}
        />
      </Field>

      <Field label="Vefsíða">
        <input
          className={inputCls}
          placeholder="https://veitingastadurinn.is"
          value={data.website}
          onChange={(e) => onChange({ ...data, website: e.target.value })}
        />
      </Field>

      <div className="flex gap-3 mt-2">
        <button
          onClick={onBack}
          className="flex-1 border border-[#F0F0F0] text-[#888888] py-4 rounded-2xl font-semibold text-sm bg-white"
        >
          Til baka
        </button>
        <button
          onClick={onNext}
          disabled={!valid}
          className="flex-[2] bg-[#65FE08] disabled:bg-[#F8F8F8] disabled:text-[#888888] text-[#0A1A0A] py-4 rounded-2xl font-black text-base transition-colors"
        >
          Áfram
        </button>
      </div>
    </div>
  );
}

function Step3({ data, onChange, onSubmit, onBack, loading }) {
  const valid =
    data.dealType &&
    data.originalPrice &&
    data.dealPrice &&
    data.dealDescription.trim() &&
    data.timing.length > 0;

  const toggleTiming = (id) => {
    const next = data.timing.includes(id)
      ? data.timing.filter((x) => x !== id)
      : [...data.timing, id];
    onChange({ ...data, timing: next });
  };

  const discountPct =
    data.originalPrice && data.dealPrice
      ? Math.round((1 - data.dealPrice / data.originalPrice) * 100)
      : null;

  return (
    <div>
      <h2 className="text-[#0A1A0A] font-black text-xl mb-1">Fyrsta tilboðið</h2>
      <p className="text-[#888888] text-sm mb-6">Þetta birtist strax þegar þú staðfestir skráninguna</p>

      <Field label="Tegund tilboðs *">
        <div className="flex flex-col gap-2">
          {DEAL_TYPES.map((dt) => (
            <button
              key={dt.id}
              type="button"
              onClick={() => onChange({ ...data, dealType: dt.id })}
              className={`flex items-center gap-3 p-3 rounded-xl border-2 text-left transition-colors ${
                data.dealType === dt.id
                  ? 'border-[#65FE08] bg-[#65FE08]/10'
                  : 'border-[#F0F0F0] bg-[#F8F8F8]'
              }`}
            >
              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                data.dealType === dt.id ? 'border-[#65FE08]' : 'border-[#D0D0D0]'
              }`}>
                {data.dealType === dt.id && (
                  <div className="w-2 h-2 rounded-full bg-[#65FE08]" />
                )}
              </div>
              <div>
                <p className="text-[#0A1A0A] font-bold text-sm">{dt.label}</p>
                <p className="text-[#888888] text-xs">{dt.desc}</p>
              </div>
            </button>
          ))}
        </div>
      </Field>

      <div className="grid grid-cols-2 gap-3">
        <Field label="Upprunalegt verð (kr) *">
          <input
            className={inputCls}
            type="number"
            placeholder="2490"
            value={data.originalPrice}
            onChange={(e) => onChange({ ...data, originalPrice: e.target.value })}
          />
        </Field>
        <Field label="Tilboðsverð (kr) *">
          <input
            className={inputCls}
            type="number"
            placeholder="1245"
            value={data.dealPrice}
            onChange={(e) => onChange({ ...data, dealPrice: e.target.value })}
          />
        </Field>
      </div>

      {discountPct !== null && discountPct > 0 && (
        <div className="bg-[#65FE08]/10 border border-[#65FE08]/30 rounded-xl px-4 py-2.5 mb-4 flex items-center gap-2">
          <span className="text-xl">🎉</span>
          <p className="text-[#0A1A0A] text-sm font-black">
            {discountPct}% afsláttur — frábært tilboð!
          </p>
        </div>
      )}

      <Field label="Lýsing á tilboðinu *" hint="Hvað fær nemandinn? Hvaða skilyrði eru til staðar?">
        <textarea
          className={textareaCls}
          rows={3}
          placeholder="T.d. Tveir klassísk borgarar á verði eins. Gildir þegar stúdentkort er sýnt."
          value={data.dealDescription}
          onChange={(e) => onChange({ ...data, dealDescription: e.target.value })}
        />
      </Field>

      <Field label="Hvenær gildir tilboðið? *">
        <div className="flex flex-wrap gap-2">
          {TIMINGS.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => toggleTiming(t.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-colors ${
                data.timing.includes(t.id)
                  ? 'bg-[#65FE08] text-[#0A1A0A]'
                  : 'bg-[#F8F8F8] text-[#888888] border border-[#F0F0F0]'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </Field>

      <div className="flex gap-3 mt-2">
        <button
          onClick={onBack}
          className="flex-1 border border-[#F0F0F0] text-[#888888] py-4 rounded-2xl font-semibold text-sm bg-white"
        >
          Til baka
        </button>
        <button
          onClick={onSubmit}
          disabled={!valid || loading}
          className="flex-[2] bg-[#0A1A0A] disabled:bg-[#F8F8F8] disabled:text-[#888888] text-white py-4 rounded-2xl font-black text-base transition-colors"
        >
          {loading ? 'Hleður...' : 'Birta tilboðið 🚀'}
        </button>
      </div>
    </div>
  );
}

const emptyRestaurant = { name: '', category: '', description: '', imageUrl: '' };
const emptyContact = { neighborhood: '', address: '', email: '', phone: '', website: '' };
const emptyDeal = { dealType: '', originalPrice: '', dealPrice: '', dealDescription: '', timing: [] };

export default function BusinessSignupForm({ onBack, onDone }) {
  const [step, setStep] = useState(0);
  const [restaurant, setRestaurant] = useState(emptyRestaurant);
  const [contact, setContact] = useState(emptyContact);
  const [deal, setDeal] = useState(emptyDeal);
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onDone({ ...restaurant, ...contact, deal });
    }, 1400);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F8F8F8]">
      {/* Header */}
      <div className="bg-white px-5 pt-12 pb-4 border-b border-[#F0F0F0] sticky top-0 z-10">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={step === 0 ? onBack : () => setStep(step - 1)} className="w-8 h-8 rounded-full bg-[#F8F8F8] flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="none" stroke="#0A1A0A" strokeWidth={2.5} className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          <span className="text-[#888888] text-sm font-medium">Skrá veitingastað</span>
        </div>
        <StepIndicator current={step} />
      </div>

      {/* Form body */}
      <div className="flex-1 overflow-y-auto px-5 py-5 pb-10">
        {step === 0 && (
          <Step1 data={restaurant} onChange={setRestaurant} onNext={() => setStep(1)} />
        )}
        {step === 1 && (
          <Step2 data={contact} onChange={setContact} onNext={() => setStep(2)} onBack={() => setStep(0)} />
        )}
        {step === 2 && (
          <Step3
            data={deal}
            onChange={setDeal}
            onSubmit={handleSubmit}
            onBack={() => setStep(1)}
            loading={loading}
          />
        )}
      </div>
    </div>
  );
}
