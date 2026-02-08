import { useState } from 'react';

export default function ResendLinkForm({ onClose }) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus('sending');
    setErrorMsg('');

    try {
      const res = await fetch('/api/resend-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      });

      if (!res.ok) throw new Error('Failed to send');

      setStatus('sent');
    } catch (err) {
      setStatus('error');
      setErrorMsg('Something went wrong. Please try again.');
    }
  };

  return (
    <div style={{
      background: '#fff', borderRadius: 12, padding: '24px 20px',
      border: '1px solid #e7e5e4', boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
      marginTop: 16,
    }}>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        marginBottom: 12,
      }}>
        <div style={{
          fontSize: 15, fontWeight: 700, color: '#1c1917',
          fontFamily: "'Trebuchet MS', 'Lucida Sans', sans-serif",
        }}>
          Access Your Credits
        </div>
        {onClose && (
          <button
            onClick={onClose}
            style={{
              background: 'none', border: 'none', color: '#a8a29e',
              fontSize: 18, cursor: 'pointer', padding: '0 4px',
            }}
          >
            ×
          </button>
        )}
      </div>

      <p style={{ fontSize: 14, color: '#57534e', lineHeight: 1.5, margin: '0 0 14px' }}>
        Enter the email you used to purchase credits. We'll send you a link to access them on this device.
      </p>

      {status === 'sent' ? (
        <div style={{
          background: '#f0fdf4', border: '1px solid #bbf7d0',
          borderRadius: 8, padding: '14px 16px',
          fontSize: 14, color: '#166534', textAlign: 'center',
        }}>
          ✓ Access link sent! Check your email.
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'flex', gap: 8 }}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              style={{
                flex: 1, padding: '11px 14px', borderRadius: 8,
                border: '2px solid #e2e8f0', fontSize: 15,
                fontFamily: 'inherit', color: '#1c1917',
                outline: 'none', boxSizing: 'border-box',
              }}
              onFocus={(e) => e.target.style.borderColor = '#b91c1c'}
              onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
            />
            <button
              type="submit"
              disabled={status === 'sending' || !email.trim()}
              style={{
                padding: '11px 18px', borderRadius: 8, border: 'none',
                background: status === 'sending' || !email.trim()
                  ? '#e2e8f0' : '#b91c1c',
                color: status === 'sending' || !email.trim()
                  ? '#94a3b8' : '#fff',
                fontSize: 14, fontWeight: 600, cursor: 'pointer',
                fontFamily: "'Trebuchet MS', sans-serif",
                whiteSpace: 'nowrap',
              }}
            >
              {status === 'sending' ? '...' : 'Send Link'}
            </button>
          </div>
          {errorMsg && (
            <div style={{ fontSize: 13, color: '#dc2626', marginTop: 8 }}>
              {errorMsg}
            </div>
          )}
        </form>
      )}
    </div>
  );
}
