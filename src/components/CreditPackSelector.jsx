import { useState } from 'react';

const PACKS = [
  {
    id: 'single',
    credits: 1,
    price: '$9',
    priceNum: 9,
    label: '1 Credit',
    desc: 'Single PDF download',
    badge: null,
  },
  {
    id: 'ten',
    credits: 10,
    price: '$29',
    priceNum: 29,
    label: '10 Credits',
    desc: '$2.90 each — save 68%',
    badge: 'POPULAR',
  },
  {
    id: 'twentyfive',
    credits: 25,
    price: '$59',
    priceNum: 59,
    label: '25 Credits',
    desc: '$2.36 each — save 74%',
    badge: 'BEST VALUE',
  },
];

export default function CreditPackSelector({ onSelectPack, loading, email }) {
  const [selectedPack, setSelectedPack] = useState('single');
  const [inputEmail, setInputEmail] = useState(email || '');

  const handlePurchase = () => {
    if (!inputEmail.trim()) return;
    onSelectPack(selectedPack, inputEmail.trim());
  };

  return (
    <div>
      <div style={{
        fontSize: 15, fontWeight: 700, color: '#1c1917', marginBottom: 14,
        fontFamily: "'Trebuchet MS', 'Lucida Sans', sans-serif",
      }}>
        Choose a Credit Pack
      </div>

      <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
        {PACKS.map((pack) => {
          const selected = selectedPack === pack.id;
          return (
            <button
              key={pack.id}
              onClick={() => setSelectedPack(pack.id)}
              style={{
                flex: 1, padding: '14px 10px', borderRadius: 10,
                border: selected ? '2px solid #b91c1c' : '2px solid #e2e8f0',
                background: selected ? '#fef2f2' : '#fff',
                cursor: 'pointer', textAlign: 'center',
                transition: 'all 0.15s', position: 'relative',
              }}
            >
              {pack.badge && (
                <div style={{
                  position: 'absolute', top: -8, left: '50%', transform: 'translateX(-50%)',
                  background: pack.id === 'twentyfive' ? '#059669' : '#b91c1c',
                  color: '#fff', fontSize: 9, fontWeight: 700,
                  padding: '2px 8px', borderRadius: 10,
                  fontFamily: "'Trebuchet MS', sans-serif",
                  letterSpacing: '0.05em', whiteSpace: 'nowrap',
                }}>
                  {pack.badge}
                </div>
              )}
              <div style={{
                fontSize: 22, fontWeight: 800, color: selected ? '#b91c1c' : '#1c1917',
                fontFamily: "'Trebuchet MS', sans-serif",
              }}>
                {pack.price}
              </div>
              <div style={{
                fontSize: 13, fontWeight: 600,
                color: selected ? '#b91c1c' : '#57534e',
                marginTop: 2,
              }}>
                {pack.label}
              </div>
              <div style={{
                fontSize: 11, color: '#78716c', marginTop: 4,
              }}>
                {pack.desc}
              </div>
            </button>
          );
        })}
      </div>

      {/* Email input */}
      {!email && (
        <div style={{ marginBottom: 12 }}>
          <input
            type="email"
            value={inputEmail}
            onChange={(e) => setInputEmail(e.target.value)}
            placeholder="your@email.com — for credit delivery"
            style={{
              width: '100%', padding: '11px 14px', borderRadius: 8,
              border: '2px solid #e2e8f0', fontSize: 15,
              fontFamily: 'inherit', color: '#1c1917',
              outline: 'none', boxSizing: 'border-box',
              transition: 'border-color 0.15s',
            }}
            onFocus={(e) => e.target.style.borderColor = '#b91c1c'}
            onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
          />
          <div style={{ fontSize: 11, color: '#a8a29e', marginTop: 4 }}>
            We'll email you an access link to use your credits on any device
          </div>
        </div>
      )}

      <button
        onClick={handlePurchase}
        disabled={loading || !inputEmail.trim()}
        style={{
          width: '100%', padding: '14px', borderRadius: 8, border: 'none',
          background: loading || !inputEmail.trim()
            ? '#e2e8f0'
            : 'linear-gradient(135deg, #1c1917, #292524)',
          color: loading || !inputEmail.trim() ? '#94a3b8' : '#fff',
          fontSize: 16, fontWeight: 700,
          cursor: loading || !inputEmail.trim() ? 'not-allowed' : 'pointer',
          fontFamily: "'Trebuchet MS', 'Lucida Sans', sans-serif",
          boxShadow: loading || !inputEmail.trim() ? 'none' : '0 2px 8px rgba(0,0,0,0.15)',
          transition: 'all 0.2s',
        }}
      >
        {loading
          ? '⏳ Redirecting to checkout...'
          : `💳 Purchase — ${PACKS.find(p => p.id === selectedPack)?.price} CAD`
        }
      </button>
      <div style={{
        fontSize: 12, color: '#a8a29e', textAlign: 'center', marginTop: 8,
      }}>
        🔒 Secure payment via Stripe • Credits never expire
      </div>
    </div>
  );
}
