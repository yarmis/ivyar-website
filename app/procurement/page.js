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
  { name: "Maersk", flag: "🚢", type: "sea", days: "35-45", cost: 1200 },
  { name: "DB Schenker", flag: "🚛", type: "land", days: "14-21", cost: 1800 },
  { name: "Antonov", flag: "✈️", type: "air", days: "2-5", cost: 3500 },
];

const FEES = { broker: 0.12, insurance: 0.02, bank: 0.03, logisticsMargin: 0.05 };

const TEAM = {
  usa: { name: "Ігор Ярмосюк", nameEn: "Igor Yarmosiuk", role: "Власник / Брокер-координатор", roleEn: "Owner / Broker-Coordinator", location: "Seattle, WA", flag: "🇺🇸" },
  ua: { name: "Віталій Літвіненко", nameEn: "Vitalii Litvinenko", role: "Офіційний представник в Україні", roleEn: "Official Representative in Ukraine", location: "Україна", flag: "🇺🇦" }
};

const T = {
  ua: { 
    title: "AI АСИСТЕНТ ЗАКУПІВЕЛЬ", subtitle: "IVYAR LLC", placeholder: "Опишіть що потрібно...", send: "➤", thinking: "Аналізую...", found: "Знайдено", rec: "✓ РЕКОМЕНДАЦІЯ", days: "днів", urgQ: "Терміновість?", crit: "🔴 Критично", urg: "🟠 Терміново", std: "🟡 Стандартно", plan: "🟢 Планово", created: "Замовлення створено!", num: "Номер", ai: "AI", ex: "Приклади:", ex1: "Гальма, 20шт", ex2: "Шини, 10шт", ex3: "Фільтр, 5шт", noRes: "Не знайдено. Спробуйте: гальма, шини, фільтр, стартер", welcome: "Вітаю! Опишіть яке обладнання потрібно.", note: "🔒 Для підтвердження: Signal", home: "←", cancel: "✕ Скасувати", restart: "🔄 Новий пошук",
    cost: "РОЗРАХУНОК ВАРТОСТІ", goods: "Товар", broker: "Комісія IVYAR (12%)", logistics: "Логістика", logMargin: "Обробка логістики (5%)", insurance: "Страхування вантажу (2%)", bank: "Банк/переказ (3%)", total: "РАЗОМ ДО СПЛАТИ", selectLog: "Оберіть доставку:", insNote: "✓ Страховка покриває 100% вартості вантажу",
    about: "Про нас", usaOffice: "Офіс США", uaOffice: "Представництво Україна", partner: "Партнерська мережа"
  },
  en: { 
    title: "AI PROCUREMENT ASSISTANT", subtitle: "IVYAR LLC", placeholder: "Describe what you need...", send: "➤", thinking: "Analyzing...", found: "Found", rec: "✓ RECOMMENDED", days: "days", urgQ: "Urgency?", crit: "🔴 Critical", urg: "🟠 Urgent", std: "🟡 Standard", plan: "🟢 Planned", created: "Order Created!", num: "Number", ai: "AI", ex: "Examples:", ex1: "Brakes, 20pcs", ex2: "Tires, 10pcs", ex3: "Filter, 5pcs", noRes: "Not found. Try: brakes, tires, filter, starter", welcome: "Hello! Describe what equipment you need.", note: "🔒 To confirm: Signal", home: "←", cancel: "✕ Cancel", restart: "🔄 New Search",
    cost: "COST BREAKDOWN", goods: "Goods", broker: "IVYAR Fee (12%)", logistics: "Logistics", logMargin: "Logistics handling (5%)", insurance: "Cargo Insurance (2%)", bank: "Bank/transfer (3%)", total: "TOTAL DUE", selectLog: "Select delivery:", insNote: "✓ Insurance covers 100% cargo value",
    about: "About Us", usaOffice: "USA Office", uaOffice: "Ukraine Representative", partner: "Partner Network"
  }
};

export default function Procurement() {
  const [lang, setLang] = useState('ua');
  const [msgs, setMsgs] = useState([]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [showUrg, setShowUrg] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [selectedLog, setSelectedLog] = useState(0);
  const [showAbout, setShowAbout] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const fileInputRef = useRef(null);
  const folderInputRef = useRef(null);
  const ref = useRef(null);
  const t = T[lang];

  useEffect(() => { setMsgs([{ role: 'ai', text: t.welcome }]); }, [lang]);
  useEffect(() => { ref.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs, typing]);

  const search = (q) => PRODUCTS.filter(p => p.keys.some(k => q.toLowerCase().includes(k)));
  const getQty = (q) => { 
    const nums = q.match(/\d+/g);
    if (!nums) return 10;
    const filtered = nums.filter(n => parseInt(n) < 500);
    return filtered.length > 0 ? parseInt(filtered[filtered.length - 1]) : 10;
  };

  const calcTotal = (goodsPrice, logIndex) => {
    const log = LOGISTICS[logIndex];
    const brokerFee = goodsPrice * FEES.broker;
    const logCost = log.cost;
    const logMargin = logCost * FEES.logisticsMargin;
    const subtotal = goodsPrice + brokerFee + logCost + logMargin;
    const insurance = subtotal * FEES.insurance;
    const bank = subtotal * FEES.bank;
    const total = subtotal + insurance + bank;
    return { goodsPrice, brokerFee, logCost, logMargin, insurance, bank, total, logName: log.name, logDays: log.days };
  };

  const restart = () => { setMsgs([{ role: 'ai', text: t.welcome }]); setShowUrg(false); setCurrentOrder(null); setSelectedLog(0); setInput(''); setUploadedFiles([]); };
  
  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files || []);
    setUploadedFiles(prev => [...prev, ...files]);
    const fileNames = files.map(f => f.name).join(', ');
    setMsgs(p => [...p, { role: 'ai', text: `📎 ${lang === 'ua' ? 'Завантажено файлів' : 'Files uploaded'}: ${files.length} (${fileNames})` }]);
  };
  
  const openFileSelector = () => fileInputRef.current?.click();
  const openFolderSelector = () => folderInputRef.current?.click();
  const cancelOrder = () => { setShowUrg(false); setCurrentOrder(null); setMsgs(p => [...p, { role: 'ai', text: lang === 'ua' ? '❌ Скасовано. Введіть новий запит.' : '❌ Cancelled. Enter new request.' }]); };

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
    const order = { product, qty, suppliers, goodsPrice: suppliers[0].price * qty };
    setCurrentOrder(order);
    setMsgs(p => [...p, { role: 'ai', type: 'results', ...order }]);
    setShowUrg(true);
  };

  const selUrg = (level) => {
    setShowUrg(false);
    const num = 'IVYAR-' + Date.now().toString(36).toUpperCase();
    const calc = calcTotal(currentOrder.goodsPrice, selectedLog);
    setMsgs(p => [...p, { role: 'ai', type: 'order', num, level, calc }]);
    setCurrentOrder(null);
  };

  const renderMsg = (m, i) => {
    if (m.type === 'results') {
      const { product, qty, suppliers, goodsPrice } = m;
      const calc = calcTotal(goodsPrice, selectedLog);
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
          <div style={{ background: '#12121a', borderRadius: '8px', padding: '0.6rem', marginBottom: '0.5rem', border: '1px solid #1e293b' }}>
            <div style={{ color: '#94a3b8', fontSize: '0.7rem', marginBottom: '0.4rem' }}>{t.selectLog}</div>
            <div style={{ display: 'flex', gap: '0.3rem' }}>
              {LOGISTICS.map((l, j) => (
                <button key={j} onClick={() => setSelectedLog(j)} style={{ flex: 1, background: selectedLog === j ? '#3b82f620' : '#1e293b', border: selectedLog === j ? '1px solid #3b82f6' : '1px solid #334155', padding: '0.4rem', borderRadius: '6px', color: '#fff', cursor: 'pointer', fontSize: '0.7rem', textAlign: 'center' }}>
                  <div>{l.flag}</div>
                  <div style={{ color: '#3b82f6', fontWeight: '600' }}>${l.cost}</div>
                  <div style={{ color: '#64748b', fontSize: '0.6rem' }}>{l.days}d</div>
                </button>
              ))}
            </div>
          </div>
          <div style={{ background: 'linear-gradient(135deg, #1e3a5f, #1e293b)', borderRadius: '8px', padding: '0.75rem', border: '1px solid #3b82f6' }}>
            <div style={{ color: '#94a3b8', fontSize: '0.75rem', fontWeight: '600', marginBottom: '0.5rem', borderBottom: '1px solid #334155', paddingBottom: '0.4rem' }}>{t.cost}</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '0.3rem' }}><span style={{ color: '#94a3b8' }}>{t.goods}:</span><span>${calc.goodsPrice.toFixed(0)}</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '0.3rem' }}><span style={{ color: '#94a3b8' }}>{t.broker}:</span><span>${calc.brokerFee.toFixed(0)}</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '0.3rem' }}><span style={{ color: '#94a3b8' }}>{t.logistics} ({calc.logName}):</span><span>${calc.logCost.toFixed(0)}</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '0.3rem' }}><span style={{ color: '#94a3b8' }}>{t.logMargin}:</span><span>${calc.logMargin.toFixed(0)}</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '0.3rem' }}><span style={{ color: '#f59e0b' }}>🛡️ {t.insurance}:</span><span style={{ color: '#f59e0b' }}>${calc.insurance.toFixed(0)}</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '0.5rem' }}><span style={{ color: '#94a3b8' }}>{t.bank}:</span><span>${calc.bank.toFixed(0)}</span></div>
            <div style={{ borderTop: '1px solid #3b82f6', paddingTop: '0.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: '700', fontSize: '0.85rem' }}>{t.total}:</span>
              <span style={{ fontWeight: '700', fontSize: '1.2rem', color: '#22c55e' }}>${calc.total.toFixed(0)}</span>
            </div>
            <div style={{ marginTop: '0.5rem', padding: '0.4rem', background: '#f59e0b15', borderRadius: '4px', fontSize: '0.65rem', color: '#f59e0b' }}>{t.insNote}</div>
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
            <div style={{ background: '#0a0a0f', padding: '0.5rem 0.8rem', borderRadius: '6px', display: 'inline-block', marginTop: '0.5rem' }}>
              <div style={{ color: '#64748b', fontSize: '0.65rem' }}>{t.num}:</div>
              <div style={{ fontFamily: 'monospace', color: '#3b82f6', fontWeight: '700', fontSize: '1.1rem' }}>{m.num}</div>
            </div>
            <div style={{ background: '#1e293b', borderRadius: '6px', padding: '0.5rem', marginTop: '0.75rem', textAlign: 'left' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '0.2rem' }}><span style={{ color: '#94a3b8' }}>{t.goods}:</span><span>${m.calc.goodsPrice.toFixed(0)}</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '0.2rem' }}><span style={{ color: '#94a3b8' }}>{t.broker}:</span><span>${m.calc.brokerFee.toFixed(0)}</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '0.2rem' }}><span style={{ color: '#94a3b8' }}>{t.logistics}:</span><span>${m.calc.logCost.toFixed(0)}</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '0.2rem' }}><span style={{ color: '#f59e0b' }}>🛡️ {t.insurance}:</span><span style={{ color: '#f59e0b' }}>${m.calc.insurance.toFixed(0)}</span></div>
              <div style={{ borderTop: '1px solid #334155', paddingTop: '0.3rem', marginTop: '0.3rem', display: 'flex', justifyContent: 'space-between', fontWeight: '700' }}><span>{t.total}:</span><span style={{ color: '#22c55e' }}>${m.calc.total.toFixed(0)}</span></div>
            </div>
            <div style={{ marginTop: '0.5rem', fontSize: '0.7rem', color: '#f59e0b' }}>{t.note}</div>
            <button onClick={restart} style={{ marginTop: '0.75rem', background: '#3b82f6', color: '#fff', border: 'none', padding: '0.5rem 1rem', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem' }}>{t.restart}</button>
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

  const AboutModal = () => (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '1rem' }}>
      <div style={{ background: '#12121a', borderRadius: '12px', maxWidth: '400px', width: '100%', border: '1px solid #1e293b', overflow: 'hidden' }}>
        <div style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', padding: '1rem', textAlign: 'center' }}>
          <div style={{ fontSize: '1.5rem', fontWeight: '800' }}>IVYAR LLC</div>
          <div style={{ fontSize: '0.75rem', opacity: 0.9 }}>{t.partner}</div>
        </div>
        
        <div style={{ padding: '1rem' }}>
          <div style={{ background: '#1e293b', borderRadius: '8px', padding: '0.75rem', marginBottom: '0.75rem', borderLeft: '3px solid #3b82f6' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '1.2rem' }}>🇺🇸</span>
              <span style={{ color: '#3b82f6', fontSize: '0.7rem', fontWeight: '600' }}>{t.usaOffice}</span>
            </div>
            <div style={{ fontWeight: '600', fontSize: '0.9rem' }}>{lang === 'ua' ? TEAM.usa.name : TEAM.usa.nameEn}</div>
            <div style={{ color: '#94a3b8', fontSize: '0.75rem' }}>{lang === 'ua' ? TEAM.usa.role : TEAM.usa.roleEn}</div>
            <div style={{ color: '#64748b', fontSize: '0.7rem', marginTop: '0.3rem' }}>📍 {TEAM.usa.location}</div>
            <div style={{ marginTop: '0.5rem', padding: '0.4rem', background: '#0a0a0f', borderRadius: '4px', fontSize: '0.65rem', color: '#94a3b8' }}>
              • Контракти з постачальниками США<br/>
              • Закупівля обладнання<br/>
              • Організація логістики<br/>
              • Банк: Mercury (USA)
            </div>
          </div>

          <div style={{ background: '#1e293b', borderRadius: '8px', padding: '0.75rem', borderLeft: '3px solid #ffd500' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '1.2rem' }}>🇺🇦</span>
              <span style={{ color: '#ffd500', fontSize: '0.7rem', fontWeight: '600' }}>{t.uaOffice}</span>
            </div>
            <div style={{ fontWeight: '600', fontSize: '0.9rem' }}>{lang === 'ua' ? TEAM.ua.name : TEAM.ua.nameEn}</div>
            <div style={{ color: '#94a3b8', fontSize: '0.75rem' }}>{lang === 'ua' ? TEAM.ua.role : TEAM.ua.roleEn}</div>
            <div style={{ color: '#64748b', fontSize: '0.7rem', marginTop: '0.3rem' }}>📍 {TEAM.ua.location}</div>
            <div style={{ marginTop: '0.5rem', padding: '0.4rem', background: '#0a0a0f', borderRadius: '4px', fontSize: '0.65rem', color: '#94a3b8' }}>
              • Комунікація з Міноборони<br/>
              • Участь у зустрічах<br/>
              • Підписання документів<br/>
              • Координація з підрозділами
            </div>
          </div>

          <div style={{ textAlign: 'center', padding: '0.5rem', color: '#64748b', fontSize: '0.7rem' }}>
            ↕️ Партнерська угода / Довіреність
          </div>
        </div>

        <div style={{ padding: '0 1rem 1rem' }}>
          <button onClick={() => setShowAbout(false)} style={{ width: '100%', background: '#3b82f6', color: '#fff', border: 'none', padding: '0.6rem', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}>✕ {lang === 'ua' ? 'Закрити' : 'Close'}</button>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0f', color: '#fff', fontFamily: 'system-ui', display: 'flex', flexDirection: 'column' }}>
      {showAbout && <AboutModal />}
      <div style={{ height: '3px', background: 'linear-gradient(90deg, #005bbb 50%, #ffd500 50%)' }} />
      <header style={{ background: '#12121a', padding: '0.6rem 1rem', borderBottom: '1px solid #1e293b' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '34px', height: '34px', background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '0.8rem' }}>IV</div>
            <div><div style={{ fontWeight: '700', fontSize: '0.9rem' }}>{t.title}</div><div style={{ color: '#64748b', fontSize: '0.65rem' }}>{t.subtitle}</div></div>
          </div>
          <div style={{ display: 'flex', gap: '4px' }}>
            <button onClick={() => setShowAbout(true)} style={{ background: 'transparent', border: '1px solid #334155', color: '#94a3b8', padding: '5px 8px', borderRadius: '5px', cursor: 'pointer', fontSize: '0.7rem' }}>ℹ️</button>
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
              {[[t.crit, 'critical'], [t.urg, 'urgent'], [t.std, 'standard'], [t.plan, 'planned']].map(([v, k], j) => <button key={j} onClick={() => selUrg(k)} style={{ display: 'block', width: '100%', background: '#1e293b', border: '1px solid #334155', padding: '0.5rem', borderRadius: '5px', color: '#fff', cursor: 'pointer', textAlign: 'left', marginBottom: '0.3rem', fontSize: '0.8rem' }}>{v}</button>)}
              <button onClick={cancelOrder} style={{ display: 'block', width: '100%', background: '#dc262615', border: '1px solid #dc262640', padding: '0.5rem', borderRadius: '5px', color: '#dc2626', cursor: 'pointer', textAlign: 'center', marginTop: '0.5rem', fontSize: '0.8rem' }}>{t.cancel}</button>
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
          <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '0.4rem' }}>
            <input 
              ref={fileInputRef}
              type="file" 
              multiple 
              onChange={handleFileSelect}
              style={{ display: 'none' }}
            />
            <input 
              ref={folderInputRef}
              type="file" 
              webkitdirectory="true"
              directory="true"
              onChange={handleFileSelect}
              style={{ display: 'none' }}
            />
            <button 
              onClick={openFileSelector}
              style={{ 
                background: '#1e293b', 
                color: '#94a3b8', 
                border: '1px solid #334155', 
                padding: '0.4rem 0.6rem', 
                borderRadius: '6px', 
                cursor: 'pointer', 
                fontSize: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem'
              }}
            >
              📎 {lang === 'ua' ? 'Файли' : 'Files'}
            </button>
            <button 
              onClick={openFolderSelector}
              style={{ 
                background: '#1e293b', 
                color: '#94a3b8', 
                border: '1px solid #334155', 
                padding: '0.4rem 0.6rem', 
                borderRadius: '6px', 
                cursor: 'pointer', 
                fontSize: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem'
              }}
            >
              📁 {lang === 'ua' ? 'Папка' : 'Folder'}
            </button>
            {uploadedFiles.length > 0 && (
              <span style={{ fontSize: '0.7rem', color: '#22c55e', display: 'flex', alignItems: 'center', paddingLeft: '0.3rem' }}>
                ✓ {uploadedFiles.length}
              </span>
            )}
          </div>
          <div style={{ display: 'flex', gap: '0.4rem' }}>
            <input value={input} onChange={e => setInput(e.target.value)} onKeyPress={e => e.key === 'Enter' && send()} placeholder={t.placeholder} style={{ flex: 1, background: '#0a0a0f', border: '1px solid #334155', borderRadius: '8px', padding: '0.6rem 0.8rem', color: '#fff', fontSize: '0.9rem', outline: 'none' }} />
            <button onClick={send} disabled={typing || !input.trim()} style={{ background: typing || !input.trim() ? '#334155' : '#3b82f6', color: '#fff', border: 'none', padding: '0 1rem', borderRadius: '8px', cursor: typing || !input.trim() ? 'not-allowed' : 'pointer', fontWeight: '600', fontSize: '1rem' }}>{t.send}</button>
          </div>
        </div>
      </div>
      <footer style={{ background: '#12121a', borderTop: '1px solid #1e293b', padding: '0.6rem', textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', fontSize: '0.65rem', color: '#64748b' }}>
          <span>🇺🇸 IVYAR LLC, Seattle</span>
          <span>|</span>
          <span>🇺🇦 {lang === 'ua' ? 'Представництво Україна' : 'Ukraine Office'}</span>
        </div>
        <div style={{ fontSize: '0.6rem', color: '#475569', marginTop: '0.3rem' }}>© 2025 IVYAR LLC</div>
      </footer>
    </div>
  );
}

function Hdr({ t, g }) {
  return <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '0.3rem' }}><div style={{ width: '22px', height: '22px', background: g ? 'linear-gradient(135deg,#22c55e,#16a34a)' : 'linear-gradient(135deg,#3b82f6,#8b5cf6)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.6rem' }}>{g ? '✓' : '🤖'}</div><span style={{ color: '#94a3b8', fontSize: '0.7rem' }}>{t.ai}</span></div>;
}
