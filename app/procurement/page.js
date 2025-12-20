"use client";
import { useState, useEffect, useRef } from 'react';

const SUPPLIERS = [
  { id: 1, name: "Memphis Equipment", flag: "🇺🇸", rating: 4.8, leadTime: 14, spec: ["M939", "M35", "parts"] },
  { id: 2, name: "Midwest Military", flag: "🇺🇸", rating: 4.5, leadTime: 10, spec: ["parts", "FMTV"] },
  { id: 3, name: "Oshkosh Defense", flag: "🇺🇸", rating: 4.9, leadTime: 21, spec: ["FMTV", "trucks"] },
  { id: 4, name: "GovPlanet", flag: "🇺🇸", rating: 4.2, leadTime: 7, spec: ["surplus"] },
  { id: 5, name: "GDLS Canada", flag: "🇨🇦", rating: 4.6, leadTime: 25, spec: ["LAV", "armor"] },
  { id: 6, name: "Rheinmetall", flag: "🇩🇪", rating: 4.8, leadTime: 30, spec: ["Leopard", "armor"] },
];

const PRODUCTS = [
  { name: "Brake Shoes M939", nameUa: "Гальмівні колодки M939", nsn: "2530-01-XXX", priceMin: 35, priceMax: 65, keys: ["гальм", "brake", "колодк"] },
  { name: "Tire 395/85R20", nameUa: "Шина 395/85R20", nsn: "2610-01-XXX", priceMin: 400, priceMax: 650, keys: ["шин", "tire", "колес"] },
  { name: "Oil Filter", nameUa: "Масляний фільтр", nsn: "2940-01-XXX", priceMin: 15, priceMax: 35, keys: ["фільтр", "filter"] },
  { name: "Starter Motor 24V", nameUa: "Стартер 24В", nsn: "2920-01-XXX", priceMin: 180, priceMax: 350, keys: ["стартер", "starter"] },
  { name: "Radiator Assembly", nameUa: "Радіатор", nsn: "2930-01-XXX", priceMin: 350, priceMax: 600, keys: ["радіатор", "radiator"] },
  { name: "Alternator 28V", nameUa: "Генератор 28В", nsn: "2920-01-XXX", priceMin: 250, priceMax: 450, keys: ["генератор", "alternator"] },
  { name: "Fuel Injector Set", nameUa: "Комплект форсунок", nsn: "2910-01-XXX", priceMin: 120, priceMax: 220, keys: ["форсун", "injector"] },
  { name: "Transmission", nameUa: "Коробка передач", nsn: "2520-01-XXX", priceMin: 2500, priceMax: 4500, keys: ["коробк", "transmission", "кпп"] },
];

const LOGISTICS = [
  { name: "Maersk", flag: "🚢", days: "35-45", cost: 1200 },
  { name: "DB Schenker", flag: "🚛", days: "14-21", cost: 1800 },
  { name: "Antonov Airlines", flag: "✈️", days: "2-5", cost: 3500 },
];

const T = {
  ua: {
    title: "AI АСИСТЕНТ ЗАКУПІВЕЛЬ", subtitle: "IVYAR LLC • Система пошуку",
    placeholder: "Опишіть що вам потрібно...", send: "➤",
    thinking: "Аналізую...", searching: "Пошук постачальників...", calculating: "Розрахунок...", generating: "Рекомендації...",
    found: "Знайдено", recommended: "✓ РЕКОМЕНДАЦІЯ", price: "Ціна", days: "днів", total: "Разом", logistics: "Логістика",
    urgencyQ: "Яка терміновість?", critical: "🔴 Критично", urgent: "🟠 Терміново", standard: "🟡 Стандартно", planned: "🟢 Планово",
    orderCreated: "Замовлення створено!", orderNum: "Номер", assistant: "AI", you: "Ви",
    examples: "Приклади:", ex1: "Гальма для M939, 20 шт", ex2: "Шини для FMTV", ex3: "Запчастини Humvee",
    noResults: "Не знайдено. Спробуйте: гальма, шини, фільтр, стартер, радіатор, генератор",
    welcome: "Вітаю! Я AI-асистент IVYAR. Опишіть, яке обладнання потрібно — знайду найкращі варіанти від перевірених постачальників США, Канади та Європи.",
    available: "✓ Є", comparison: "Порівняння", why: "Рекомендую", whyText: "Оптимальне співвідношення ціна/час/надійність",
    secureNote: "🔒 Для фінального замовлення зв'яжіться через Signal", home: "← Головна"
  },
  en: {
    title: "AI PROCUREMENT ASSISTANT", subtitle: "IVYAR LLC • Search System",
    placeholder: "Describe what you need...", send: "➤",
    thinking: "Analyzing...", searching: "Searching suppliers...", calculating: "Calculating...", generating: "Recommendations...",
    found: "Found", recommended: "✓ RECOMMENDED", price: "Price", days: "days", total: "Total", logistics: "Logistics",
    urgencyQ: "Urgency level?", critical: "🔴 Critical", urgent: "🟠 Urgent", standard: "🟡 Standard", planned: "🟢 Planned",
    orderCreated: "Order Created!", orderNum: "Number", assistant: "AI", you: "You",
    examples: "Examples:", ex1: "Brakes for M939, 20 pcs", ex2: "Tires for FMTV", ex3: "Humvee parts",
    noResults: "Not found. Try: brakes, tires, filter, starter, radiator, alternator",
    welcome: "Hello! I'm IVYAR's AI assistant. Describe what equipment you need — I'll find the best options from verified US, Canadian, and European suppliers.",
    available: "✓ Stock", comparison: "Comparison", why: "Recommended", whyText: "Optimal price/time/reliability balance",
    secureNote: "🔒 For final orders, contact via Signal", home: "← Home"
  }
};

export default function Procurement() {
  const [lang, setLang] = useState('ua');
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [stage, setStage] = useState('');
  const [showUrgency, setShowUrgency] = useState(false);
  const ref = useRef(null);
  const t = T[lang];

  useEffect(() => { setMessages([{ role: 'ai', text: t.welcome }]); }, [lang]);
  useEffect(() => { ref.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, isTyping]);

  const search = (q) => PRODUCTS.filter(p => p.keys.some(k => q.toLowerCase().includes(k)));
  const getQty = (q) => { const m = q.match(/(\d+)/); return m ? parseInt(m[1]) : 10; };

  const send = async () => {
    if (!input.trim() || isTyping) return;
    const q = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: q }]);
    setIsTyping(true);
    
    for (const s of [t.thinking, t.searching, t.calculating, t.generating]) {
      setStage(s);
      await new Promise(r => setTimeout(r, 600));
    }
    
    const products = search(q);
    if (!products.length) {
      setIsTyping(false);
      setMessages(prev => [...prev, { role: 'ai', text: t.noResults }]);
      return;
    }
    
    const product = products[0];
    const qty = getQty(q);
    const suppliers = SUPPLIERS.map(s => ({
      ...s, price: Math.round(product.priceMin + Math.random() * (product.priceMax - product.priceMin)), inStock: Math.random() > 0.3
    })).sort((a, b) => b.rating - a.rating);
    
    setIsTyping(false);
    setMessages(prev => [...prev, { role: 'ai', type: 'results', product, qty, suppliers }]);
    setShowUrgency(true);
  };

  const selectUrgency = (u) => {
    setShowUrgency(false);
    const num = 'IVYAR-' + Date.now().toString(36).toUpperCase();
    setMessages(prev => [...prev, { role: 'ai', type: 'order', num }]);
  };

  const renderMsg = (m, i) => {
    if (m.type === 'results') {
      const { product, qty, suppliers } = m;
      const rec = suppliers[0];
      const total = rec.price * qty + LOGISTICS[0].cost;
      return (
        <div key={i} style={{ marginBottom: '1rem' }}>
          <MsgHeader t={t} />
          <div style={{ background: '#1e293b', borderRadius: '12px', padding: '1rem', marginBottom: '0.75rem', borderLeft: '4px solid #3b82f6' }}>
            <div style={{ color: '#94a3b8', fontSize: '0.75rem' }}>{t.found}:</div>
            <div style={{ fontWeight: '600', marginTop: '0.25rem' }}>{lang === 'ua' ? product.nameUa : product.name}</div>
            <div style={{ color: '#64748b', fontSize: '0.8rem' }}>NSN: {product.nsn} • {qty} шт</div>
          </div>
          <div style={{ background: '#12121a', borderRadius: '10px', padding: '0.75rem', marginBottom: '0.75rem', border: '1px solid #1e293b' }}>
            <div style={{ color: '#94a3b8', fontSize: '0.75rem', marginBottom: '0.5rem' }}>{t.comparison}:</div>
            {suppliers.slice(0, 4).map((s, j) => (
              <div key={j} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem', background: j === 0 ? '#22c55e15' : 'transparent', borderRadius: '6px', marginBottom: '0.25rem', border: j === 0 ? '1px solid #22c55e40' : 'none' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {j === 0 && <span style={{ background: '#22c55e', color: '#000', padding: '1px 6px', borderRadius: '4px', fontSize: '0.65rem', fontWeight: '700' }}>{t.recommended}</span>}
                  <span>{s.flag}</span>
                  <div>
                    <div style={{ fontSize: '0.85rem', fontWeight: '500' }}>{s.name}</div>
                    <div style={{ color: '#64748b', fontSize: '0.7rem' }}>⭐{s.rating} {s.inStock && t.available}</div>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: '600', color: '#22c55e' }}>${s.price * qty}</div>
                  <div style={{ color: '#64748b', fontSize: '0.7rem' }}>{s.leadTime} {t.days}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
            {LOGISTICS.map((l, j) => (
              <div key={j} style={{ background: '#1e293b', padding: '0.4rem 0.6rem', borderRadius: '6px', fontSize: '0.75rem' }}>
                {l.flag} {l.name}: <span style={{ color: '#3b82f6' }}>${l.cost}</span> • {l.days}d
              </div>
            ))}
          </div>
          <div style={{ background: 'linear-gradient(135deg, #1e3a5f, #1e293b)', borderRadius: '10px', padding: '0.75rem', border: '1px solid #3b82f6' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}><span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>{t.price}:</span><span>${rec.price * qty}</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', margin
