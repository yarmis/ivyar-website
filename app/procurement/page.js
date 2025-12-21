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

const FEES = {
  broker: 0.12,
  insurance: 0.02,
  bank: 0.03,
  logisticsMargin: 0.05
};

const T = {
  ua: { 
    title: "AI АСИСТЕНТ ЗАКУПІВЕЛЬ", subtitle: "IVYAR LLC", placeholder: "Опишіть що потрібно...", send: "➤", thinking: "Аналізую...", found: "Знайдено", rec: "✓ РЕКОМЕНДАЦІЯ", days: "днів", urgQ: "Терміновість?", crit: "🔴 Критично", urg: "🟠 Терміново", std: "🟡 Стандартно", plan: "🟢 Планово", created: "Замовлення створено!", num: "Номер", ai: "AI", ex: "Приклади:", ex1: "Гальма, 20шт", ex2: "Шини, 10шт", ex3: "Фільтр, 5шт", noRes: "Не знайдено. Спробуйте: гальма, шини, фільтр, стартер", welcome: "Вітаю! Опишіть яке обладнання потрібно.", note: "🔒 Для замовлення: Signal", home: "←", cancel: "✕ Скасувати", restart: "🔄 Новий пошук",
    cost: "РОЗРАХУНОК ВАРТОСТІ",
    goods: "Товар",
    broker: "Комісія IVYAR (12%)",
    logistics: "Логістика",
    logMargin: "Обробка логістики (5%)",
    insurance: "Страхування вантажу (2%)",
    bank: "Банк/переказ (3%)",
    subtotal: "Підсумок",
    total: "РАЗОМ ДО СПЛАТИ",
    selectLog: "Оберіть доставку:",
    sea: "🚢 Морська (економ)",
    land: "🚛 Авто (стандарт)",
    air: "✈️ Авіа (терміново)",
    insNote: "✓ Страховка покриває 100% вартості вантажу",
    priceNote: "Ціни включають всі комісії та збори"
  },
  en: { 
    title: "AI PROCUREMENT ASSISTANT", subtitle: "IVYAR LLC", placeholder: "Describe what you need...", send: "➤", thinking: "Analyzing...", found: "Found", rec: "✓ RECOMMENDED", days: "days", urgQ: "Urgency?", crit: "🔴 Critical", urg: "🟠 Urgent", std: "🟡 Standard", plan: "🟢 Planned", created: "Order Created!", num: "Number", ai: "AI", ex: "Examples:", ex1: "Brakes, 20pcs", ex2: "Tires, 10pcs", ex3: "Filter, 5pcs", noRes: "Not found. Try: brakes, tires, filter, starter", welcome: "Hello! Describe what equipment you need.", note: "🔒 To order: Signal", home: "←", cancel: "✕ Cancel", restart: "🔄 New Search",
    cost: "COST BREAKDOWN",
    goods: "Goods",
    broker: "IVYAR Fee (12%)",
    logistics: "Logistics",
    logMargin: "Logistics handling (5%)",
    insurance: "Cargo Insurance (2%)",
    bank: "Bank/transfer (3%)",
    subtotal: "Subtotal",
    total: "TOTAL DUE",
    selectLog: "Select delivery:",
    sea: "🚢 Sea (economy)",
    land: "🚛 Land (standard)",
    air: "✈️ Air (express)",
    insNote: "✓ Insurance covers 100% cargo value",
    priceNote: "Prices include all fees and charges"
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

  const restart = () => {
    setMsgs([{ role: 'ai', text: t.welcome }]);
    setShowUrg(false);
    setCurrentOrder(null);
    setSelectedLog(0);
    setInput('');
  };

  const cancelOrder = () => {
    setShowUrg(false);
    setCurrentOrder(null);
    setMsgs(p => [...p, { role: 'ai', text: lang === 'ua' ? '❌ Скасовано. Введіть новий запит.' : '❌ Cancelled. Enter new request.' }]);
  };

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
            
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '0.3rem' }}>
              <span style={{ color: '#94a3b8' }}>{t.goods}:</span>
              <span>${calc.goodsPrice.toFixed(0)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '0.3rem' }}>
              <span style={{
