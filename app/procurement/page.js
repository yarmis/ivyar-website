"use client";
import { useState } from 'react';

export default function Procurement() {
  const [lang, setLang] = useState('ua');
  const [tab, setTab] = useState('info');
  const [form, setForm] = useState({ unit: '', commander: '', phone: '', email: '', item: '', qty: '', reason: '', urgency: 'standard' });
  const [done, setDone] = useState(false);
  const [tid, setTid] = useState('');

  const tx = {
    ua: { title: 'ПОРТАЛ ЗАКУПІВЕЛЬ', tabs: ['Інфо', 'Запит', 'Трек'], hero: 'ЗАКУПІВЛІ ДЛЯ ЗСУ', btn: 'Подати запит', ok: 'Надіслано!', wait: 'Очікуйте 48г', num: 'Номер', again: 'Ще', track: 'Відстежити', find: 'Знайти', send: 'НАДІСЛАТИ', unit: 'Підрозділ', cmd: 'Командир', ph: 'Телефон', em: 'Email', itm: 'Потрібно', qt: 'К-ть', rsn: 'Причина', urg: 'Терміновість', u1: 'Критично', u2: 'Терміново', u3: 'Планово' },
    en: { title: 'PROCUREMENT', tabs: ['Info', 'Request', 'Track'], hero: 'SECURE PROCUREMENT', btn: 'Submit', ok: 'Submitted!', wait: 'Response 48h', num: 'Number', again: 'New', track: 'Track', find: 'Find', send: 'SUBMIT', unit: 'Unit', cmd: 'Commander', ph: 'Phone', em: 'Email', itm: 'Item', qt: 'Qty', rsn: 'Reason', urg: 'Urgency', u1: 'Critical', u2: 'Urgent', u3: 'Standard' }
  }[lang];

  const send = (e) => { e.preventDefault(); setTid('IVYAR-' + Date.now().toString(36).toUpperCase()); setDone(true); };

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0f', color: '#fff', fontFamily: 'system-ui' }}>
      <div style={{ height: '3px', background: 'linear-gradient(90deg, #005bbb 50%, #ffd500 50%)' }} />
      <header style={{ background: '#12121a', padding: '1rem', borderBottom: '1px solid #1e293b' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '32px', height: '32px', background: 'linear-gradient(135deg,#3b82f6,#8b5cf6)', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '0.8rem' }}>IV</div>
            <span style={{ fontWeight: '700' }}>{tx.title}</span>
          </div>
          <div style={{ display: 'flex', gap: '4px' }}>
            {tx.tabs.map((t, i) => <button key={i} onClick={() => { setTab(['info', 'request', 'track'][i]); setDone(false); }} style={{ background: tab === ['info', 'request', 'track'][i] ? '#3b82f6' : 'transparent', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem' }}>{t}</button>)}
            <button onClick={() => setLang(lang === 'ua' ? 'en' : 'ua')} style={{ background: '#f59e0b', color: '#000', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontWeight: '700', fontSize: '0.8rem' }}>{lang === 'ua' ? 'EN' : 'UA'}</button>
          </div>
        </div>
      </header>
      <main style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem 1rem' }}>
        {tab === 'info' && <div style={{ textAlign: 'center' }}><h1 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{tx.hero}</h1><button onClick={() => setTab('request')} style={{ background: '#3b82f6', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}>{tx.btn}</button></div>}
        {tab === 'request' && <div style={{ maxWidth: '400px', margin: '0 auto' }}>{done ? <div style={{ background: '#12121a', padding: '2rem', borderRadius: '12px', textAlign: 'center', border: '1px solid #1e293b' }}><div style={{ fontSize: '2rem', marginBottom: '1rem' }}>✓</div><h2 style={{ color: '#22c55e', marginBottom: '0.5rem' }}>{tx.ok}</h2><p style={{ color: '#94a3b8', marginBottom: '1rem' }}>{tx.wait}</p><div style={{ background: '#0a0a0f', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}><div style={{ color: '#64748b', fontSize: '0.8rem' }}>{tx.num}</div><div style={{ color: '#3b82f6', fontWeight: '700', fontFamily: 'monospace' }}>{tid}</div></div><button onClick={() => { setDone(false); setForm({ unit: '', commander: '', phone: '', email: '', item: '', qty: '', reason: '', urgency: 'standard' }); }} style={{ background: '#3b82f6', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer' }}>{tx.again}</button></div> : <form onSubmit={send} style={{ background: '#12121a', padding: '1.5rem', borderRadius: '12px', border: '1px solid #1e293b' }}>{[[tx.unit, 'unit', 'text'], [tx.cmd, 'commander', 'text'], [tx.ph, 'phone', 'text'], [tx.em, 'email', 'email'], [tx.itm, 'item', 'text'], [tx.qt, 'qty', 'number']].map(([l, k, t]) => <div key={k} style={{ marginBottom: '0.8rem' }}><label style={{ display: 'block', color: '#94a3b8', fontSize: '0.8rem', marginBottom: '4px' }}>{l}</label><input type={t} required value={form[k]} onChange={e => setForm({ ...form, [k]: e.target.value })} style={{ width: '100%', padding: '8px', background: '#0a0a0f', border: '1px solid #1e293b', borderRadius: '6px', color: '#fff', boxSizing: 'border-box' }} /></div>)}<div style={{ marginBottom: '0.8rem' }}><label style={{ display: 'block', color: '#94a3b8', fontSize: '0.8rem', marginBottom: '4px' }}>{tx.rsn}</label><textarea required rows={2} value={form.reason} onChange={e => setForm({ ...form, reason: e.target.value })} style={{ width: '100%', padding: '8px', background: '#0a0a0f', border: '1px solid #1e293b', borderRadius: '6px', color: '#fff', boxSizing: 'border-box' }} /></div><div style={{ marginBottom: '1rem' }}><label style={{ display: 'block', color: '#94a3b8', fontSize: '0.8rem', marginBottom: '4px' }}>{tx.urg}</label><select value={form.urgency} onChange={e => setForm({ ...form, urgency: e.target.value })} style={{ width: '100%', padding: '8px', background: '#0a0a0f', border: '1px solid #1e293b', borderRadius: '6px', color: '#fff' }}><option value="critical">{tx.u1}</option><option value="urgent">{tx.u2}</option><option value="standard">{tx.u3}</option></select></div><button type="submit" style={{ width: '100%', background: '#3b82f6', color: '#fff', border: 'none', padding: '10px', borderRadius: '6px', cursor: 'pointer', fontWeight: '700' }}>{tx.send}</button></form>}</div>}
        {tab === 'track' && <div style={{ maxWidth: '400px', margin: '0 auto', background: '#12121a', padding: '1.5rem', borderRadius: '12px', textAlign: 'center', border: '1px solid #1e293b' }}><h2 style={{ marginBottom: '1rem' }}>{tx.track}</h2><div style={{ display: 'flex', gap: '8px' }}><input placeholder="IVYAR-..." style={{ flex: 1, padding: '8px', background: '#0a0a0f', border: '1px solid #1e293b', borderRadius: '6px', color: '#fff' }} /><button style={{ background: '#3b82f6', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer' }}>{tx.find}</button></div></div>}
      </main>
      <footer style={{ background: '#12121a', borderTop: '1px solid #1e293b', padding: '1rem', textAlign: 'center', color: '#64748b', fontSize: '0.8rem' }}>© 2025 IVYAR LLC</footer>
    </div>
  );
}
