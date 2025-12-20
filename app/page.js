"use client";

export default function Home() {
  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0f', color: 'white', fontFamily: 'system-ui, sans-serif' }}>
      <header style={{ background: '#12121a', borderBottom: '1px solid #1e293b', padding: '1rem 2rem' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '45px', height: '45px', background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '1.1rem' }}>IV</div>
            <div>
              <div style={{ fontWeight: '700', fontSize: '1.2rem' }}>IVYAR LLC</div>
              <div style={{ fontSize: '0.7rem', color: '#64748b' }}>DEFENSE EQUIPMENT SUPPLIER</div>
            </div>
          </div>
          <a href="/procurement" style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', color: 'white', textDecoration: 'none', padding: '0.5rem 1rem', borderRadius: '6px', fontSize: '0.9rem', fontWeight: '600' }}>Procurement Portal</a>
        </div>
      </header>
      <section style={{ padding: '5rem 2rem', textAlign: 'center', maxWidth: '900px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '1.5rem' }}>Professional Defense Equipment Supplier</h1>
        <p style={{ color: '#94a3b8', fontSize: '1.1rem', marginBottom: '2rem' }}>Supporting allied nations with tactical vehicles, artillery systems, and aircraft components.</p>
        <a href="/procurement" style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', color: 'white', textDecoration: 'none', padding: '1rem 2rem', borderRadius: '8px', fontWeight: '600' }}>Open Procurement Portal →</a>
      </section>
      <footer style={{ background: '#12121a', borderTop: '1px solid #1e293b', padding: '2rem', textAlign: 'center' }}>
        <p style={{ color: '#64748b', fontSize: '0.85rem' }}>© 2025 IVYAR LLC. DDTC Registered | ITAR Compliant</p>
        <p style={{ color: '#64748b', fontSize: '0.85rem' }}>Contact: ivyarllc@yahoo.com</p>
      </footer>
    </div>
  );
}
