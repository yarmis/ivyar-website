"use client";
import { useState } from 'react';

export default function Procurement() {
  const [lang, setLang] = useState('ua');

  const t = {
    ua: {
      title: 'СИСТЕМА ЗАКУПІВЕЛЬ',
      subtitle: 'IVYAR LLC • ПРЕЗЕНТАЦІЯ',
      hero: 'ЗАХИЩЕНА СИСТЕМА ЗАКУПІВЕЛЬ',
      heroText: 'Прозора система для постачання оборонного обладнання союзним силам',
      howTitle: 'ЯК ЦЕ ПРАЦЮЄ',
      steps: [
        { n: '1', t: 'Запит через захищений канал', d: 'Signal, ProtonMail або особиста зустріч' },
        { n: '2', t: 'IVYAR знаходить постачальника', d: 'Перевірка цін, якості та відповідності' },
        { n: '3', t: 'Фінансовий контроль', d: 'Незалежна верифікація всіх транзакцій' },
        { n: '4', t: 'Доставка', d: 'Командир лише підписує акт прийому' }
      ],
      secTitle: 'БЕЗПЕКА ТА КОНФІДЕНЦІЙНІСТЬ',
      secPoints: [
        '🔒 Жодних даних не зберігається онлайн',
        '🛡️ Комунікація тільки через шифровані канали',
        '📋 ITAR Compliant • DDTC Registered',
        '🤝 Особисті зустрічі за потреби'
      ],
      contactTitle: 'ЗАХИЩЕНІ КАНАЛИ ЗВ\'ЯЗКУ',
      signal: 'Signal (рекомендовано)',
      email: 'Захищена пошта',
      meet: 'Особиста зустріч',
      meetText: 'За попередньою домовленістю',
      note: '⚠️ Для максимальної безпеки використовуйте Signal',
      footer: '© 2025 IVYAR LLC. Вся комунікація конфіденційна.'
    },
    en: {
      title: 'PROCUREMENT SYSTEM',
      subtitle: 'IVYAR LLC • PRESENTATION',
      hero: 'SECURE PROCUREMENT SYSTEM',
      heroText: 'Transparent system for supplying defense equipment to allied forces',
      howTitle: 'HOW IT WORKS',
      steps: [
        { n: '1', t: 'Request via secure channel', d: 'Signal, ProtonMail or in-person meeting' },
        { n: '2', t: 'IVYAR finds supplier', d: 'Price, quality and compliance verification' },
        { n: '3', t: 'Financial control', d: 'Independent verification of all transactions' },
        { n: '4', t: 'Delivery', d: 'Commander only signs receipt document' }
      ],
      secTitle: 'SECURITY & CONFIDENTIALITY',
      secPoints: [
        '🔒 No data stored online',
        '🛡️ Communication only via encrypted channels',
        '📋 ITAR Compliant • DDTC Registered',
        '🤝 In-person meetings available'
      ],
      contactTitle: 'SECURE COMMUNICATION CHANNELS',
      signal: 'Signal (recommended)',
      email: 'Secure email',
      meet: 'In-person meeting',
      meetText: 'By appointment',
      note: '⚠️ For maximum security, use Signal',
      footer: '© 2025 IVYAR LLC. All communications are confidential.'
    }
  }[lang];

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0f', color: '#fff', fontFamily: 'system-ui' }}>
      <div style={{ height: '4px', background: 'linear-gradient(90deg, #005bbb 50%, #ffd500 50%)' }} />
      
      <header style={{ background: '#12121a', padding: '1rem', borderBottom: '1px solid #1e293b' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '40px', height: '40px', background: 'linear-gradient(135deg,#3b82f6,#8b5cf6)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800' }}>IV</div>
            <div>
              <div style={{ fontWeight: '700' }}>{t.title}</div>
              <div style={{ fontSize: '0.7rem', color: '#64748b' }}>{t.subtitle}</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <a href="/" style={{ color: '#94a3b8', textDecoration: 'none', padding: '8px 12px', fontSize: '0.85rem' }}>← {lang === 'ua' ? 'Головна' : 'Home'}</a>
            <button onClick={() => setLang(lang === 'ua' ? 'en' : 'ua')} style={{ background: '#f59e0b', color: '#000', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: '700', fontSize: '0.85rem' }}>{lang === 'ua' ? 'EN' : 'UA'}</button>
          </div>
        </div>
      </header>

      <main style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem 1rem' }}>
        
        {/* Hero */}
        <div style={{ textAlign: 'center', padding: '2rem 0 3rem' }}>
          <div style={{ display: 'inline-block', background: '#22c55e20', color: '#22c55e', padding: '6px 16px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '600', marginBottom: '1rem' }}>🔒 {lang === 'ua' ? 'КОНФІДЕНЦІЙНО' : 'CONFIDENTIAL'}</div>
          <h1 style={{ fontSize: '2rem', marginBottom: '1rem', background: 'linear-gradient(135deg, #fff, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{t.hero}</h1>
          <p style={{ color: '#94a3b8', maxWidth: '600px', margin: '0 auto' }}>{t.heroText}</p>
        </div>

        {/* How it works */}
        <div style={{ marginBottom: '3rem' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', fontSize: '1.2rem', color: '#94a3b8' }}>{t.howTitle}</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            {t.steps.map((s, i) => (
              <div key={i} style={{ background: '#12121a', border: '1px solid #1e293b', borderRadius: '12px', padding: '1.5rem', borderTop: '3px solid ' + ['#3b82f6', '#8b5cf6', '#22c55e', '#fbbf24'][i] }}>
                <div style={{ width: '28px', height: '28px', background: ['#3b82f6', '#8b5cf6', '#22c55e', '#fbbf24'][i], borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem', fontWeight: '700', fontSize: '0.85rem' }}>{s.n}</div>
                <h3 style={{ marginBottom: '0.5rem', fontSize: '0.95rem' }}>{s.t}</h3>
                <p style={{ color: '#64748b', fontSize: '0.8rem', margin: 0 }}>{s.d}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Security */}
        <div style={{ background: '#12121a', border: '1px solid #1e293b', borderRadius: '16px', padding: '2rem', marginBottom: '2rem' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', fontSize: '1.1rem' }}>{t.secTitle}</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
            {t.secPoints.map((p, i) => (
              <div key={i} style={{ background: '#0a0a0f', padding: '1rem', borderRadius: '8px', fontSize: '0.9rem' }}>{p}</div>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div style={{ background: 'linear-gradient(135deg, #1e3a5f, #1e293b)', border: '1px solid #3b82f6', borderRadius: '16px', padding: '2rem' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', fontSize: '1.2rem' }}>{t.contactTitle}</h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
            
            {/* Signal */}
            <div style={{ background: '#0a0a0f', padding: '1.5rem', borderRadius: '12px', textAlign: 'center', border: '2px solid #22c55e' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📱</div>
              <div style={{ fontWeight: '700', marginBottom: '0.5rem', color: '#22c55e' }}>{t.signal}</div>
              <div style={{ fontFamily: 'monospace', fontSize: '1.1rem' }}>+1 (XXX) XXX-XXXX</div>
            </div>

            {/* Email */}
            <div style={{ background: '#0a0a0f', padding: '1.5rem', borderRadius: '12px', textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📧</div>
              <div style={{ fontWeight: '700', marginBottom: '0.5rem' }}>{t.email}</div>
              <div style={{ fontFamily: 'monospace', fontSize: '0.95rem', color: '#3b82f6' }}>ivyarllc@yahoo.com</div>
            </div>

            {/* Meeting */}
            <div style={{ background: '#0a0a0f', padding: '1.5rem', borderRadius: '12px', textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🤝</div>
              <div style={{ fontWeight: '700', marginBottom: '0.5rem' }}>{t.meet}</div>
              <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>{t.meetText}</div>
            </div>

          </div>

          <div style={{ textAlign: 'center', background: '#f59e0b20', color: '#f59e0b', padding: '0.75rem', borderRadius: '8px', fontSize: '0.85rem' }}>{t.n
