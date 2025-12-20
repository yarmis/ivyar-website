"use client";
import { useState } from 'react';

export default function ProcurementPortal() {
  const [lang, setLang] = useState('ua');
  const [activeTab, setActiveTab] = useState('info');
  const [formData, setFormData] = useState({
    unit: '', commander: '', phone: '', email: '',
    item: '', quantity: '', reason: '', urgency: 'standard'
  });
  const [submitted, setSubmitted] = useState(false);
  const [trackingId, setTrackingId] = useState('');

  const t = {
    ua: {
      title: 'ПОРТАЛ ЗАКУПІВЕЛЬ',
      subtitle: 'IVYAR LLC • ЗАХИЩЕНА СИСТЕМА',
      tabs: ['Як це працює', 'Подати запит', 'Відстежити'],
      heroTitle: 'ЗАХИЩЕНІ ЗАКУПІВЛІ ДЛЯ ЗСУ',
      heroText: 'Прозора система, яка захищає командирів від фінансових ризиків',
      btn: 'Подати запит',
      steps: [
        { n: '1', t: 'Командир подає запит', d: 'Проста форма - 5 хвилин' },
        { n: '2', t: 'IVYAR знаходить постачальника', d: 'Перевірка цін та якості' },
        { n: '3', t: 'Фінансовий контроль', d: 'Незалежна перевірка' },
        { n: '4', t: 'Доставка', d: 'Командир лише підписує акт' }
      ],
      formTitle: 'Запит на закупівлю',
      unit: 'Підрозділ',
      commander: 'ПІБ командира',
      phone: 'Телефон (Signal)',
      email: 'Email',
      item: 'Що потрібно',
      quantity: 'Кількість',
      reason: 'Обґрунтування',
      urgency: 'Терміновість',
      urgencies: { critical: 'Критично (24г)', urgent: 'Терміново (3-5 днів)', standard: 'Планово (2 тижні)' },
      submit: 'НАДІСЛАТИ ЗАПИТ',
      successTitle: 'Запит надіслано!',
      successText: 'Очікуйте відповідь протягом 48 годин',
      trackingNum: 'Номер відстеження',
      newRequest: 'Новий запит',
      trackTitle: 'Відстеження запиту',
      trackPlaceholder: 'Введіть номер',
      search: 'Знайти',
      footer: '© 2025 IVYAR LLC. ITAR Compliant.'
    },
    en: {
      title: 'PROCUREMENT PORTAL',
      subtitle: 'IVYAR LLC • SECURE SYSTEM',
      tabs: ['How It Works', 'Submit Request', 'Track Order'],
      heroTitle: 'SECURE PROCUREMENT FOR ALLIED FORCES',
      heroText: 'Transparent system that protects commanders from financial risks',
      btn: 'Submit Request',
      steps: [
        { n: '1', t: 'Commander submits request', d: 'Simple form - 5 minutes' },
        { n: '2', t: 'IVYAR finds supplier', d: 'Price and quality check' },
        { n: '3', t: 'Financial control', d: 'Independent verification' },
        { n: '4', t: 'Delivery', d: 'Commander only signs receipt' }
      ],
      formTitle: 'Procurement Request',
      unit: 'Unit',
      commander: 'Commander Name',
      phone: 'Phone (Signal)',
      email: 'Email',
      item: 'What you need',
      quantity: 'Quantity',
      reason: 'Justification',
      urgency: 'Urgency',
      urgencies: { critical: 'Critical (24h)', urgent: 'Urgent (3-5 days)', standard: 'Standard (2 weeks)' },
      submit: 'SUBMIT REQUEST',
      successTitle: 'Request Submitted!',
      successText: 'Expect response within 48 hours',
      trackingNum: 'Tracking Number',
      newRequest: 'New Request',
      trackTitle: 'Track Your Request',
      trackPlaceholder: 'Enter number',
      search: 'Search',
      footer: '© 2025 IVYAR LLC. ITAR Compliant.'
    }
  }[lang];

  const handleSubmit = (e) => {
    e.preventDefault();
    setTrackingId('IVYAR-' + Date.now().toString(36).toUpperCase());
    setSubmitted(true);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0f', color: 'white', fontFamily: 'system-ui, sans-serif' }}>
      <header style={{ background: '#12121a', borderBottom: '1px solid #1e293b', padding: '1rem 2rem' }}>
        <div style={{ height: '3px', background: 'linear-gradient(90deg, #005bbb 50%, #ffd500 50%)', margin: '-1rem -2rem 1rem' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '40px', height: '40px', background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800' }}>IV</div>
            <div>
              <div style={{ fontWeight: '700' }}>{t.title}</div>
              <div style={{ fontSize: '0.7rem', color: '#64748b' }}>{t.subtitle}</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {t.tabs.map((tab, i) => (
              <button key={i} onClick={() => { setActiveTab(['info', 'request', 'track'][i]); setSubmitted(false); }}
                style={{ background: activeTab === ['info', 'request', 'track'][i] ? 'linear-gradient(135deg, #3b82f6, #8b5cf6)' : 'transparent', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem' }}>
                {tab}
              </button>
            ))}
            <button onClick={() => setLang(lang === 'ua' ? 'en' : 'ua')}
              style={{ background: 'linear-gradient(135deg, #f59e0b, #fbbf24)', color: '#000', border: 'none', padding: '0.5rem 1rem', borderRadius: '6px', cursor: 'pointer', fontWeight: '700', fontSize: '0.85rem' }}>
              {lang === 'ua' ? 'EN' : 'UA'}
            </button>
          </div>
        </div>
      </header>

      <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '2rem' }}>
        {activeTab === 'info' && (
          <div>
            <div style={{ textAlign: 'center', padding: '3rem 0' }}>
              <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>{t.heroTitle}</h1>
              <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>{t.heroText}</p>
              <button onClick={() => setActiveTab('request')} style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', color: 'white', border: 'none', padding: '1rem 2rem', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', fontSize: '1rem' }}>{t.btn}</button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginTop: '2rem' }}>
              {t.steps.map((s, i) => (
                <div key={i} style={{ background: '#12121a', border: '1px solid #1e293b', borderRadius: '12px', padding: '1.5rem', borderTop: '3px solid ' + ['#3b82f6', '#8b5cf6', '#22c55e', '#fbbf24'][i] }}>
                  <div style={{ width: '28px', height: '28px', background: ['#3b82f6', '#8b5cf6', '#22c55e', '#fbbf24'][i], borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem', fontWeight: '700' }}>{s.n}</div>
                  <h3 style={{ marginBottom: '0.5rem', fontSize: '1rem' }}>{s.t}</h3>
                  <p style={{ color: '#64748b', fontSize: '0.85rem', margin: 0 }}>{s.d}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'request' && (
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            {submitted ? (
              <div style={{ background: '#12121a', border: '1px solid #1e293b', borderRadius: '16px', padding: '3rem 2rem', textAlign: 'center' }}>
                <div style={{ width: '60px', height: '60px', background: '#22c55e', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', fontSize: '2rem' }}>✓</div>
                <h2 style={{ color: '#22c55e', marginBottom: '0.5rem' }}>{t.successTitle}</h2>
                <p style={{ color: '#94a3b8', marginBottom: '1.5rem' }}>{t.successText}</p>
                <div style={{ background: '#0a0a0f', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem' }}>
                  <div style={{ color: '#64748b', fontSize: '0.8rem' }}>{t.trackingNum}</div>
                  <div style={{ color: '#3b82f6', fontSize: '1.3rem', fontWeight: '700', fontFamily: 'monospace' }}>{trackingId}</div>
                </div>
                <button onClick={() => { setSubmitted(false); setFormData({ unit: '', commander: '', phone: '', email: '', item: '', quantity: '', reason: '', urgency: 'standard' }); }}
                  style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', color: 'white', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>{t.newRequest}</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ background: '#12121a', border: '1px solid #1e293b', borderRadius: '16px', padding: '2rem' }}>
                <h2 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>{t.formTitle}</h2>
                {[
                  { key: 'unit', label: t.unit, type: 'text' },
                  { key: 'commander', label: t.commander, type: 'text' },
                  { key: 'phone', label: t.phone, type: 'text' },
                  { key: 'email', label: t.email, type: 'email' },
                  { key: 'item', label: t.item, type: 'text' },
                  { key: 'quantity', label: t.quantity, type: 'number' }
                ].map(f => (
                  <div key={f.key} style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.4rem', color: '#94a3b8', fontSize: '0.85rem' }}>{f.label} *</label>
                    <input type={f.type} required value={formData[f.key]} onChange={(e) => setFormData({ ...formData, [f.key]: e.target.value })}
                      style={{ width: '100%', padding: '0.75rem', background: '#0a0a0f', border: '1px solid #1e293b', borderRadius: '8px', color: 'white', fontSize: '0.95rem', boxSizing: 'border-box' }} />
                  </div>
                ))}
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.4rem', color: '#94a3b8', fontSize: '0.85rem' }}>{t.reason} *</label>
                  <textarea required rows={3} value={formData.reason} onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                    style={{ width: '100%', padding: '0.75rem', background: '#0a0a0f', border: '1px solid #1e293b', borderRadius: '8px', color: 'white', fontSize: '0.95rem', boxSizing: 'border-box', resize: 'vertical' }} />
                </div>
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.4rem', color: '#94a3b8', fontSize: '0.85rem' }}>{t.urgency}</label>
                  <select value={formData.urgency} onChange={(e) => setFormData({ ...formData, urgency: e.target.value })}
                    style={{ width: '100%', padding: '0.75rem', background: '#0a0a0f', border: '1px solid #1e293b', borderRadius: '8px', color: 'white', fontSize: '0.95rem' }}>
                    <option value="critical">{t.urgencies.critical}</option>
                    <option value="urgent">{t.urgencies.urgent}</option>
                    <option value="standard">{t.urgencies.standard}</option>
                  </select>
                </div>
                <button type="submit" style={{ width: '100%', background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', color: 'white', border: 'none', padding: '1rem', borderRadius: '8px', cursor: 'pointer', fontWeight: '700', fontSize: '1rem' }}>{t.submit}</button>
              </form>
            )}
          </div>
        )}

        {activeTab === 'track' && (
          <div style={{ maxWidth: '500px', margin: '0 auto', background: '#12121a', border: '1px solid #1e293b', borderRadius: '16px', padding: '2rem', textAlign: 'center' }}>
            <h2 style={{ marginBottom: '1.5rem' }}>{t.trackTitle}</h2>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input type="text" placeholder={t.trackPlaceholder} style={{ flex: 1, padding: '0.75rem', background: '#0a0a0f', border: '1px solid #1e293b', borderRadius: '8px', color: 'white', fontSize: '1rem' }} />
              <button style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', color: 'white', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>{t.search}</button>
            </div>
          </div>
        )}
      </main>

      <footer style={{ background: '#12121a', borderTop: '1px solid #1e293b', padding: '1.5rem', textAlign: 'center', color: '#64748b', fontSize: '0.85rem', marginTop: '3rem' }}>
        {t.footer}
      </footer>
    </div>
  );
}
