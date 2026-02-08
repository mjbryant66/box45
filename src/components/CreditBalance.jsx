import { useState } from 'react';

export default function CreditBalance({ credits, email, onResendLink }) {
  const [showMenu, setShowMenu] = useState(false);

  if (!email) return null;

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <button
        onClick={() => setShowMenu(!showMenu)}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: credits > 0 ? '#f0fdf4' : '#fef2f2',
          border: credits > 0 ? '1.5px solid #bbf7d0' : '1.5px solid #fecaca',
          borderRadius: 20, padding: '6px 14px',
          cursor: 'pointer', fontSize: 13, fontWeight: 600,
          color: credits > 0 ? '#166534' : '#991b1b',
          fontFamily: "'Trebuchet MS', 'Lucida Sans', sans-serif",
          transition: 'all 0.15s',
        }}
      >
        <span style={{
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          width: 22, height: 22, borderRadius: '50%',
          background: credits > 0 ? '#166534' : '#991b1b',
          color: '#fff', fontSize: 12, fontWeight: 700,
        }}>
          {credits}
        </span>
        {credits === 1 ? 'credit' : 'credits'}
      </button>

      {showMenu && (
        <>
          <div
            onClick={() => setShowMenu(false)}
            style={{
              position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
              zIndex: 99,
            }}
          />
          <div style={{
            position: 'absolute', top: '100%', right: 0, marginTop: 8,
            background: '#fff', borderRadius: 10, padding: '14px 16px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.12)', border: '1px solid #e7e5e4',
            zIndex: 100, minWidth: 220,
          }}>
            <div style={{ fontSize: 12, color: '#78716c', marginBottom: 6 }}>
              Signed in as
            </div>
            <div style={{
              fontSize: 14, fontWeight: 600, color: '#1c1917',
              marginBottom: 12, wordBreak: 'break-all',
            }}>
              {email}
            </div>
            <div style={{
              fontSize: 13, color: '#57534e', marginBottom: 12,
              paddingBottom: 12, borderBottom: '1px solid #f5f5f4',
            }}>
              {credits} credit{credits !== 1 ? 's' : ''} remaining
            </div>
            <button
              onClick={() => { onResendLink(); setShowMenu(false); }}
              style={{
                width: '100%', padding: '8px 12px', borderRadius: 6,
                border: '1px solid #e2e8f0', background: '#fafaf9',
                color: '#57534e', fontSize: 13, cursor: 'pointer',
                fontFamily: "'Trebuchet MS', sans-serif",
                textAlign: 'left',
              }}
            >
              Send access link to email
            </button>
          </div>
        </>
      )}
    </div>
  );
}
