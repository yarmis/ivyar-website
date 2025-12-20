Це **не код** — це мої інструкції, які не повинні бути в файлі.

---

## 📋 Виправляємо:

**Крок 1:** Відкрийте:
👉 **https://github.com/yarmis/ivyar-website/edit/main/app/procurement/page.js**

**Крок 2:** Натисніть **Ctrl+A** → **Delete** (видалити ВСЕ)

**Крок 3:** Скопіюйте **ТІЛЬКИ** цей код (без нічого зайвого):
```js
"use client";
import { useState, useEffect, useRef } from 'react';

const SUPPLIERS = [
  { id: 1, name: "Memphis Equipment", flag: "🇺🇸", rating: 4.8, leadTime: 14 },
  { id: 2, name: "Midwest Military", flag: "🇺🇸", rating: 4.5, leadTime: 10 },
  { id: 3, name: "Oshkosh Defense", flag: "🇺🇸", rating: 4.9, leadTime: 21 },
  { id: 4, name: "GovPlanet", flag: "🇺🇸", rating: 4.2, leadTime: 7 },
  { id: 5, name: "GDLS Canada", flag: "🇨🇦", rating: 4.6, leadTime: 25 },
];

const PRODUCTS = [
  { name: "Brake Shoes M939", nameUa: "Гальмівні колодки M939", nsn: "2530-01-XXX", priceMin: 35, priceMax: 65, keys: ["гальм", "brake", "колодк"] },
  { name: "Tire 395/85R20", nameUa: "Шина 395/85R20", nsn: "2610-01-XXX", priceMin: 400, priceMax: 650, keys: ["шин", "tire"] },
  { name: "Oil Filter", nameUa: "Масляний фільтр", nsn: "2940-01-XXX", priceMin: 15, priceMax: 35, keys: ["фільтр", "filter"] },
  { name: "Starter Motor", nameUa: "Стартер 24В", nsn: "2920-01-XXX", priceMin: 180, priceMax: 350, keys: ["стартер", "starter"] },
  { name: "Radiator", nameUa: "Радіатор", nsn: "2930-01-XXX", priceMin: 350, priceMax: 600, keys: ["радіатор", "radiator"] },
];

const LOGISTICS = [
  { name: "Maersk", flag: "🚢", days: "35-45", cost: 1200 },
  { name: "DB Schenker", flag: "🚛", days: "14-21", cost: 1800 },
  { name: "Antonov", flag: "✈️", days: "2-5", cost: 3500 },
];

const T = {
  ua: { title: "AI АСИСТЕНТ ЗАКУПІВЕЛЬ", subtitle: "IVYAR LLC", placeholder: "Опишіть що потрібно...", send: "➤", thinking: "Аналізую...", found: "Знайдено", rec: "✓ РЕКОМЕНДАЦІЯ", price: "Ціна", days: "днів", total: "Разом", logistics: "Логістика", urgQ: "Терміновість?", crit: "🔴 Критично", urg: "🟠 Терміново", std: "🟡 Стандартно", plan: "🟢 Планово", created: "Замовлення створено!", num: "Номер", ai: "AI", ex: "Приклади:", ex1: "Гальма M939, 20шт", ex2: "Шини FMTV", ex3: "Фільтр", noRes: "Не знайдено. Спробуйте: гальма, шини, фільтр, стартер", welcome: "Вітаю! Опишіть яке обладнання потрібно.", why: "Найкраще співвідношення ціна/час", note: "🔒 Для замовлення: Signal", home: "←" },
  en: { title: "AI PROCUREMENT ASSISTANT", subtitle: "IVYAR LLC", placeholder: "Describe what you need...", send: "➤", thinking: "Analyzing...", found: "Found", rec: "✓ RECOMMENDED", price: "Price", days: "days", total: "Total", logistics: "Logistics", urgQ: "Urgency?", crit: "🔴 Critical", urg: "🟠 Urgent", std: "🟡 Standard", plan: "🟢 Planned", created: "Order Created!", num: "Number", ai: "AI", ex: "Examples:", ex1: "Brakes M939, 20pcs", ex2: "Tires FMTV", ex3: "Filter", noRes: "Not found. Try: brakes, tires, filter, starter", welcome: "Hello! Describe what equipment you need.", why: "Best price/time balance", note: "🔒 To order: Signal", home: "←" }
};

export default function Procurement() {
  const [lang, setLang] = useState('ua');
  const [msgs, setMsgs] = useState([]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [showUrg, setShowUrg] = useState(false);
  const ref = useRef(null);
  const t = T[lang];

  useEffect(() => { setMsgs([{ role: 'ai', text: t.welcome }]); }, [lang]);
  useEffect(() => { ref.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs, typing]);

  const search = (q) => PRODUCTS.filter(p => p.keys.some(k => q.toLowerCase().includes(k)));
  const getQty = (q) => { const m = q.match(/(\d+)/); return m ? parseInt(m[1]) : 10; };

  const send = async () => {
    if (!input.trim() || typing) return;
    const q = input.trim();
    setInput('');
    setMsgs(p => [...p, { role: 'user', text: q }]);
    setTyping(true);
    await new Promise(r => setTimeout(r, 1500));
    const products = search(q);
    setTyping(false);
    if (!products.length) { setMsgs(p => [...p, { role: 'ai', text: t.noRes }]); return; }
    const product = products[0];
    const qty = getQty(q);
    const suppliers = SUPPLIERS.map(s => ({ ...s, price: Math.round(product.priceMin + Math.random() * (product.priceMax - product.priceMin)), inStock: Math.random() > 0.3 })).sort((a, b) => b.rating - a.rating);
    setMsgs(p => [...p, { role: 'ai', type: 'results', product, qty, suppliers }]);
    setShowUrg(true);
  };

  const selUrg = () => {
    setShowUrg(false);
    const num = 'IVYAR-' + Date.now().toString(36).toUpperCase();
    setMsgs(p => [...p, { role: 'ai', type: 'order', num }]);
  };

  const renderMsg = (m, i) => {
    if (m.type === 'results') {
      const { product, qty, suppliers } = m;
      const rec = suppliers[0];
      const tot = rec.price * qty + LOGISTICS[0].cost;
      return (
        <div key={i} style={{ marginBottom: '1rem' }}>
          <Hdr t={t} />
          <div style={{ background: '#1e293b', borderRadius: '10px', padding: '0.75rem', marginBottom: '0.5rem', borderLeft: '3px solid #3b82f6' }}>
            <div style={{ color: '#94a3b8', fontSize: '0.7rem' }}>{t.found}:</div>
            <div style={{ fontWeight: '600' }}>{lang === 'ua' ? product.nameUa : product.name}</div>
            <div style={{ color: '#64748b', fontSize: '0.75rem' }}>NSN: {product.nsn} - {qty} шт</div>
          </div>
          <div style={{ background: '#12121a', borderRadius: '8px', padding: '0.5rem', marginBottom: '0.5rem', border: '1px solid #1e293b' }}>
            {suppliers.slice(0, 3).map((s, j) => (
              <div key={j} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.4rem', background: j === 0 ? '#22c55e15' : 'transparent', borderRadius: '6px', marginBottom: '0.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  {j === 0 && <span style={{ background: '#22c55e', color: '#000', padding: '1px 4px', borderRadius: '3px', fontSize: '0.6rem', fontWeight: '700' }}>{t.rec}</span>}
                  <span>{s.flag}</span>
                  <span style={{ fontSize: '0.8rem' }}>{s.name}</span>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: '600', color: '#22c55e', fontSize: '0.85rem' }}>${s.price * qty}</div>
                  <div style={{ color: '#64748b', fontSize: '0.65rem' }}>{s.leadTime}d</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
            {LOGISTICS.map((l, j) => <div key={j} style={{ background: '#1e293b', padding: '0.3rem 0.5rem', borderRadius: '4px', fontSize: '0.7rem' }}>{l.flag} ${l.cost}</div>)}
          </div>
          <div style={{ background: 'linear-gradient(135deg, #1e3a5f, #1e293b)', borderRadius: '8px', padding: '0.6rem', border: '1px solid #3b82f6' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}><span style={{ color: '#94a3b8' }}>{t.total}:</span><span style={{ fontWeight: '700', color: '#22c55e', fontSize: '1.1rem' }}>${tot}</span></div>
            <div style={{ marginTop: '0.4rem', fontSize: '0.7rem', color: '#94a3b8' }}>💡 {t.why}</div>
          </div>
        </div>
      );
    }
    if (m.type === 'order') {
      return (
        <div key={i} style={{ marginBottom: '1rem' }}>
          <Hdr t={t} g />
          <div style={{ background: '#22c55e15', border: '1px solid #22c55e40', borderRadius: '10px', padding: '1rem', textAlign: 'center' }}>
            <div style={{ fontSize: '1.5rem' }}>✅</div>
            <div style={{ fontWeight: '600', color: '#22c55e' }}>{t.created}</div>
            <div style={{ background: '#0a0a0f', padding: '0.4rem 0.8rem', borderRadius: '6px', display: 'inline-block', marginTop: '0.5rem' }}>
              <div style={{ color: '#64748b', fontSize: '0.65rem' }}>{t.num}:</div>
              <div style={{ fontFamily: 'monospace', color: '#3b82f6', fontWeight: '700' }}>{m.num}</div>
            </div>
            <div style={{ marginTop: '0.5rem', fontSize: '0.7rem', color: '#f59e0b' }}>{t.note}</div>
          </div>
        </div>
      );
    }
    const isU = m.role === 'user';
    return (
      <div key={i} style={{ marginBottom: '0.5rem', display: 'flex', flexDirection: 'column', alignItems: isU ? 'flex-end' : 'flex-start' }}>
        {!isU && <Hdr t={t} />}
        <div style={{ background: isU ? '#3b82f6' : '#1e293b', padding: '0.5rem 0.75rem', borderRadius: isU ? '10px 10px 2px 10px' : '10px 10px 10px 2px', maxWidth: '85%', fontSize: '0.85rem' }}>{m.text}</div>
      </div>
    );
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0f', color: '#fff', fontFamily: 'system-ui', display: 'flex', flexDirection: 'column' }}>
      <div style={{ height: '3px', background: 'linear-gradient(90deg, #005bbb 50%, #ffd500 50%)' }} />
      <header style={{ background: '#12121a', padding: '0.6rem 1rem', borderBottom: '1px solid #1e293b' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '34px', height: '34px', background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '0.8rem' }}>IV</div>
            <div><div style={{ fontWeight: '700', fontSize: '0.9rem' }}>{t.title}</div><div style={{ color: '#64748b', fontSize: '0.65rem' }}>{t.subtitle}</div></div>
          </div>
          <div style={{ display: 'flex', gap: '4px' }}>
            <a href="/" style={{ color: '#94a3b8', textDecoration: 'none', padding: '5px 8px', fontSize: '0.8rem' }}>{t.home}</a>
            <button onClick={() => setLang(lang === 'ua' ? 'en' : 'ua')} style={{ background: '#f59e0b', color: '#000', border: 'none', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer', fontWeight: '700', fontSize: '0.75rem' }}>{lang === 'ua' ? 'EN' : 'UA'}</button>
          </div>
        </div>
      </header>
      <div style={{ flex: 1, maxWidth: '600px', width: '100%', margin: '0 auto', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div style={{ flex: 1, overflowY: 'auto', padding: '0.75rem' }}>
          {msgs.map((m, i) => renderMsg(m, i))}
          {typing && <div style={{ marginBottom: '0.5rem' }}><Hdr t={t} /><div style={{ background: '#1e293b', padding: '0.5rem 0.75rem', borderRadius: '10px', display: 'inline-block' }}><span style={{ color: '#94a3b8', fontSize: '0.8rem' }}>{t.thinking}</span></div></div>}
          {showUrg && (
            <div style={{ background: '#12121a', borderRadius: '8px', padding: '0.6rem', border: '1px solid #1e293b', marginBottom: '0.5rem' }}>
              <div style={{ marginBottom: '0.4rem', fontWeight: '500', fontSize: '0.85rem' }}>{t.urgQ}</div>
              {[[t.crit], [t.urg], [t.std], [t.plan]].map(([v], j) => <button key={j} onClick={selUrg} style={{ display: 'block', width: '100%', background: '#1e293b', border: '1px solid #334155', padding: '0.5rem', borderRadius: '5px', color: '#fff', cursor: 'pointer', textAlign: 'left', marginBottom: '0.3rem', fontSize: '0.8rem' }}>{v}</button>)}
            </div>
          )}
          <div ref={ref} />
        </div>
        {msgs.length <= 1 && (
          <div style={{ padding: '0 0.75rem 0.5rem' }}>
            <div style={{ color: '#64748b', fontSize: '0.7rem', marginBottom: '0.3rem' }}>{t.ex}</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
              {[t.ex1, t.ex2, t.ex3].map((e, i) => <button key={i} onClick={() => setInput(e)} style={{ background: '#1e293b', border: '1px solid #334155', padding: '0.3rem 0.6rem', borderRadius: '12px', color: '#94a3b8', cursor: 'pointer', fontSize: '0.75rem' }}>{e}</button>)}
            </div>
          </div>
        )}
        <div style={{ padding: '0.6rem', borderTop: '1px solid #1e293b', background: '#12121a' }}>
          <div style={{ display: 'flex', gap: '0.4rem' }}>
            <input value={input} onChange={e => setInput(e.target.value)} onKeyPress={e => e.key === 'Enter' && send()} placeholder={t.placeholder} style={{ flex: 1, background: '#0a0a0f', border: '1px solid #334155', borderRadius: '8px', padding: '0.6rem 0.8rem', color: '#fff', fontSize: '0.9rem', outline: 'none' }} />
            <button onClick={send} disabled={typing || !input.trim()} style={{ background: typing || !input.trim() ? '#334155' : '#3b82f6', color: '#fff', border: 'none', padding: '0 1rem', borderRadius: '8px', cursor: typing || !input.trim() ? 'not-allowed' : 'pointer', fontWeight: '600', fontSize: '1rem' }}>{t.send}</button>
          </div>
        </div>
      </div>
      <footer style={{ background: '#12121a', borderTop: '1px solid #1e293b', padding: '0.5rem', textAlign: 'center', color: '#64748b', fontSize: '0.65rem' }}>© 2025 IVYAR LLC 🇺🇦</footer>
    </div>
  );
}

function Hdr({ t, g }) {
  return <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '0.3rem' }}><div style={{ width: '22px', height: '22px', background: g ? 'linear-gradient(135deg,#22c55e,#16a34a)' : 'linear-gradient(135deg,#3b82f6,#8b5cf6)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.6rem' }}>{g ? '✓' : '🤖'}</div><span style={{ color: '#94a3b8', fontSize: '0.7rem' }}>{t.ai}</span></div>;
}
```

**Крок 4:** Натисніть **"Commit changes"** → **"Commit changes"**

---

**Напишіть "готово" після commit!** 👇
