import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { generateCompliancePDF } from "./utils/generatePDF";
import CreditBalance from "./components/CreditBalance";
import CreditPackSelector from "./components/CreditPackSelector";
import ResendLinkForm from "./components/ResendLinkForm";

const CODES = {
  1: { label: "Code 1", desc: "No dental benefits offered", color: "#64748b" },
  2: { label: "Code 2", desc: "Employee only coverage", color: "#0369a1" },
  3: { label: "Code 3", desc: "Spouse & children eligible", color: "#059669" },
  4: { label: "Code 4", desc: "Spouse only eligible", color: "#7c3aed" },
  5: { label: "Code 5", desc: "Children only eligible", color: "#d97706" },
};

function RadioGroup({ label, value, onChange, options }) {
  return (
    <div style={{ marginBottom: 22 }}>
      <div style={{
        fontSize: 14, fontWeight: 600, color: "#475569",
        textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 10,
      }}>
        {label}
      </div>
      <div style={{ display: "flex", gap: 10 }}>
        {options.map((opt) => {
          const selected = value === opt.value;
          return (
            <button
              key={opt.value}
              onClick={() => onChange(opt.value)}
              style={{
                flex: 1, padding: "14px 20px", borderRadius: 10,
                border: selected ? "2px solid #b91c1c" : "2px solid #e2e8f0",
                background: selected ? "#fef2f2" : "#fff",
                color: selected ? "#b91c1c" : "#64748b",
                fontWeight: selected ? 700 : 500, fontSize: 17,
                cursor: "pointer", transition: "all 0.15s ease",
                fontFamily: "inherit",
              }}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function FadeIn({ children, delay = 0 }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);
  return (
    <div style={{
      opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(12px)",
      transition: "opacity 0.4s ease, transform 0.4s ease",
    }}>
      {children}
    </div>
  );
}

function MapleLeaf({ size = 20, color = "#b91c1c" }) {
  return (
    <svg width={size} height={size} viewBox="-2015 -2000 4030 4030" style={{ display: "inline-block", verticalAlign: "middle" }}>
      <path fill={color} d="m-90 2030 45-863a95 95 0 0 0-111-98l-859 151 116-320a65 65 0 0 0-20-73l-941-762 212-99a65 65 0 0 0 34-79l-186-572 542 115a65 65 0 0 0 73-38l105-247 423 454a65 65 0 0 0 111-57l-204-1052 327 189a65 65 0 0 0 91-27l332-652 332 652a65 65 0 0 0 91 27l327-189-204 1052a65 65 0 0 0 111 57l423-454 105 247a65 65 0 0 0 73 38l542-115-186 572a65 65 0 0 0 34 79l212 99-941 762a65 65 0 0 0-20 73l116 320-859-151a95 95 0 0 0-111 98l45 863z"/>
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width={22} height={22} viewBox="0 0 24 24" fill="none" style={{ display: "inline-block", verticalAlign: "middle" }}>
      <circle cx="12" cy="12" r="10" stroke="#ffffff" strokeWidth="2"/>
      <polyline points="12,6 12,12 16,14" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function DeadlineBanner() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const currentYear = now.getFullYear();

      // T4 deadline is February 28 (or 29 in leap year)
      const isLeapYear = currentYear % 4 === 0 && (currentYear % 100 !== 0 || currentYear % 400 === 0);
      const deadlineDay = isLeapYear ? 29 : 28;
      const deadline = new Date(currentYear, 1, deadlineDay, 23, 59, 59); // Month is 0-indexed

      // If we're past this year's deadline, show next year's
      if (now > deadline) {
        deadline.setFullYear(currentYear + 1);
      }

      const difference = deadline - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 60000); // Update every minute
    return () => clearInterval(timer);
  }, []);

  // Show banner from Jan 15 to March 15
  const now = new Date();
  const month = now.getMonth(); // 0-indexed
  const day = now.getDate();
  const showBanner = (month === 0 && day >= 15) || month === 1 || (month === 2 && day <= 15);

  if (!showBanner) return null;

  const isUrgent = timeLeft.days <= 7;
  const isPastDeadline = month === 2 && day > (now.getFullYear() % 4 === 0 ? 29 : 28);

  return (
    <div style={{
      background: isPastDeadline
        ? "linear-gradient(135deg, #dc2626, #991b1b)"
        : isUrgent
        ? "linear-gradient(135deg, #ea580c, #c2410c)"
        : "linear-gradient(135deg, #b91c1c, #991b1b)",
      color: "#fff",
      padding: "16px 20px",
      borderRadius: 12,
      marginBottom: 24,
      boxShadow: "0 4px 12px rgba(185, 28, 28, 0.3)",
      animation: isUrgent ? "pulse 2s ease-in-out infinite" : "none",
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
        <ClockIcon />
        <div style={{ textAlign: "center", flex: 1, minWidth: 200 }}>
          {isPastDeadline ? (
            <>
              <div style={{ fontSize: 15, fontWeight: 700, fontFamily: "'Trebuchet MS', sans-serif", marginBottom: 4 }}>
                T4 DEADLINE PASSED — LATE FILINGS ACCEPTED
              </div>
              <div style={{ fontSize: 13, opacity: 0.95 }}>
                File now to minimize penalties • Instant compliance memo
              </div>
            </>
          ) : (
            <>
              <div style={{ fontSize: 15, fontWeight: 700, fontFamily: "'Trebuchet MS', sans-serif", marginBottom: 4 }}>
                T4 FILING DEADLINE: FEBRUARY {now.getFullYear() % 4 === 0 ? '29' : '28'}, {now.getFullYear()}
              </div>
              <div style={{ fontSize: 14, fontWeight: 600, letterSpacing: "0.5px" }}>
                {timeLeft.days > 0 && `${timeLeft.days} day${timeLeft.days !== 1 ? 's' : ''}`}
                {timeLeft.days > 0 && timeLeft.hours > 0 && ', '}
                {timeLeft.hours > 0 && `${timeLeft.hours} hour${timeLeft.hours !== 1 ? 's' : ''}`}
                {timeLeft.days === 0 && timeLeft.hours === 0 && `${timeLeft.minutes} minute${timeLeft.minutes !== 1 ? 's' : ''}`}
                {' remaining'}
              </div>
              {isUrgent && (
                <div style={{ fontSize: 12, marginTop: 6, opacity: 0.95 }}>
                  Last minute? Get your code instantly + audit-ready documentation
                </div>
              )}
            </>
          )}
        </div>
        <MapleLeaf size={22} color="#ffffff" />
      </div>
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.95; transform: scale(1.01); }
        }
      `}</style>
    </div>
  );
}

export default function T4Calculator() {
  // Check for embed mode and URL params
  const urlParams = new URLSearchParams(window.location.search);
  const isEmbedMode = urlParams.get('embed') === 'true';
  const paymentSuccess = urlParams.get('payment') === 'success';
  const magicToken = urlParams.get('magic');

  // Calculator state
  const [employerName, setEmployerName] = useState("");
  const [offeredDental, setOfferedDental] = useState(null);
  const [spouseEligible, setSpouseEligible] = useState(null);
  const [childrenEligible, setChildrenEligible] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [downloadReady, setDownloadReady] = useState(false);

  // Credit system state
  const [walletEmail, setWalletEmail] = useState(() =>
    localStorage.getItem('walletEmail') || ''
  );
  const [creditBalance, setCreditBalance] = useState(0);
  const [isLoadingCredits, setIsLoadingCredits] = useState(false);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [showResendForm, setShowResendForm] = useState(false);
  const [creditMessage, setCreditMessage] = useState('');

  // Handle magic link on page load
  useEffect(() => {
    if (magicToken) {
      restoreFromMagicLink(magicToken);
    }
  }, [magicToken]);

  // Handle payment return — fetch updated balance
  useEffect(() => {
    if (paymentSuccess && walletEmail) {
      // Fire Google Ads conversion event BEFORE clearing URL params
      // Google Ads Purchase conversion — ID: 980021396, Label: pRYnCPqw5PkbEJThp9MD
      if (typeof gtag === 'function') {
        const convValue = parseFloat(urlParams.get('amt')) || 9.00;
        gtag('event', 'conversion', {
          'send_to': 'AW-980021396/pRYnCPqw5PkbEJThp9MD',
          'value': convValue,
          'currency': 'CAD',
        });
      }
      setCreditMessage('Payment received. We\u2019re attaching your credits now \u2014 this usually takes a few seconds.');
      fetchBalance(walletEmail);
      window.history.replaceState({}, '', window.location.pathname);
      setTimeout(() => setCreditMessage(''), 8000);
    }
    if (urlParams.get('payment') === 'canceled') {
      setCreditMessage('Checkout wasn\u2019t completed. Your code result is still available. You can try again anytime.');
      window.history.replaceState({}, '', window.location.pathname);
      setTimeout(() => setCreditMessage(''), 8000);
    }
  }, [paymentSuccess]);

  // Fetch balance when email is known
  useEffect(() => {
    if (walletEmail) {
      fetchBalance(walletEmail);
    }
  }, [walletEmail]);

  const restoreFromMagicLink = async (token) => {
    try {
      const res = await fetch(`/api/restore-credits?token=${encodeURIComponent(token)}`);
      const data = await res.json();

      if (data.success) {
        setWalletEmail(data.email);
        setCreditBalance(data.credits);
        localStorage.setItem('walletEmail', data.email);
        setCreditMessage(`Welcome back! ${data.credits} credit${data.credits !== 1 ? 's' : ''} available.`);
        setTimeout(() => setCreditMessage(''), 5000);
      }
    } catch (err) {
      console.error('Magic link restore error:', err);
    }
    // Clean up URL
    window.history.replaceState({}, '', window.location.pathname);
  };

  const fetchBalance = async (email) => {
    try {
      const res = await fetch(`/api/wallet?email=${encodeURIComponent(email)}`);
      const data = await res.json();
      setCreditBalance(data.credits || 0);
    } catch (err) {
      console.error('Balance fetch error:', err);
    }
  };

  const handlePurchasePack = async (packId, email) => {
    setIsPurchasing(true);

    try {
      // Save state for after payment return
      sessionStorage.setItem('t4-calculator-state', JSON.stringify({
        employerName, offeredDental, spouseEligible, childrenEligible,
        code: determineCode(),
      }));

      // Remember email
      setWalletEmail(email);
      localStorage.setItem('walletEmail', email);

      const res = await fetch('/api/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ packId, email }),
      });

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL received');
      }
    } catch (err) {
      console.error('Checkout error:', err);
      alert('There was an error processing your payment. Please try again.');
      setIsPurchasing(false);
    }
  };

  const handleDownloadPDF = async () => {
    const inputs = { employerName, offeredDental, spouseEligible, childrenEligible };

    if (creditBalance > 0 && walletEmail) {
      // Has credits — deduct and download
      setIsLoadingCredits(true);
      try {
        const res = await fetch('/api/use-credit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: walletEmail }),
        });

        const data = await res.json();

        if (data.success) {
          setCreditBalance(data.credits);
          generateCompliancePDF(inputs, code);
          setDownloadReady(true);
        } else {
          setCreditBalance(data.credits || 0);
          alert('Insufficient credits. Please purchase more.');
        }
      } catch (err) {
        console.error('Use credit error:', err);
        alert('We couldn\u2019t generate the PDF right now. Please try again. If this keeps happening, contact support.');
      }
      setIsLoadingCredits(false);
    }
    // If no credits, the UI shows CreditPackSelector instead of this button
  };

  const handleResendLink = async () => {
    if (!walletEmail) {
      setShowResendForm(true);
      return;
    }

    try {
      await fetch('/api/resend-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: walletEmail }),
      });
      setCreditMessage('Access link sent to your email!');
      setTimeout(() => setCreditMessage(''), 5000);
    } catch (err) {
      console.error('Resend link error:', err);
    }
  };

  const determineCode = () => {
    if (offeredDental === false) return 1;
    if (offeredDental === true) {
      if (spouseEligible && childrenEligible) return 3;
      if (spouseEligible && !childrenEligible) return 4;
      if (!spouseEligible && childrenEligible) return 5;
      return 2;
    }
    return null;
  };

  const code = determineCode();
  const canCalculate = offeredDental !== null && (offeredDental === false || (spouseEligible !== null && childrenEligible !== null));

  const handleCalculate = () => setShowResult(true);

  const handleReset = () => {
    setOfferedDental(null);
    setSpouseEligible(null);
    setChildrenEligible(null);
    setShowResult(false);
    setDownloadReady(false);
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(165deg, #fafaf9 0%, #f5f0eb 50%, #faf5f0 100%)",
      fontFamily: "'Palatino Linotype', 'Book Antiqua', Palatino, Georgia, serif",
      padding: isEmbedMode ? "16px" : "32px 16px",
    }}>
      <div style={{ maxWidth: 540, margin: "0 auto" }}>
        {/* Header - Hide in embed mode */}
        {!isEmbedMode && (
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              gap: 10, marginBottom: 16,
            }}>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 10,
                background: "#b91c1c", color: "#fff", padding: "6px 16px",
                borderRadius: 6, fontSize: 13, fontWeight: 700,
                letterSpacing: "0.1em", textTransform: "uppercase",
                fontFamily: "'Trebuchet MS', 'Lucida Sans', sans-serif",
              }}>
                <MapleLeaf size={16} color="#ffffff" /> CRA compliance helper (not affiliated with CRA)
              </div>
              {walletEmail && (
                <CreditBalance
                  credits={creditBalance}
                  email={walletEmail}
                  onResendLink={handleResendLink}
                />
              )}
            </div>
            <h1 style={{
              fontSize: 32, fontWeight: 700, color: "#0f0e0d",
              margin: "0 0 8px 0", lineHeight: 1.2,
            }}>
              T4 Box 45 Dental Benefits Code — Get the right code fast
            </h1>
            <p style={{ fontSize: 17, color: "#57534e", margin: 0, lineHeight: 1.5 }}>
              Answer a few questions and we'll return the correct Box 45 code for your T4 slip, based on eligibility as of December 31, 2025.
            </p>
            <p style={{ fontSize: 13, color: "#78716c", margin: "8px 0 0 0", lineHeight: 1.5 }}>
              No SINs. No CRA login. Not affiliated with CRA. Your data is never used to train AI.
            </p>
          </div>
        )}

        {/* Credit restored message */}
        {creditMessage && (
          <FadeIn>
            <div style={{
              background: '#f0fdf4', border: '1px solid #bbf7d0',
              borderRadius: 10, padding: '12px 18px', marginBottom: 16,
              fontSize: 14, color: '#166534', textAlign: 'center', fontWeight: 600,
            }}>
              {creditMessage}
            </div>
          </FadeIn>
        )}

        {/* Deadline Banner - Seasonal */}
        <DeadlineBanner />

        {/* Info Banner */}
        <div style={{
          background: "#eff6ff", border: "1px solid #93c5fd",
          borderRadius: 10, padding: "14px 18px", marginBottom: 24,
          display: "flex", gap: 12, alignItems: "flex-start",
        }}>
          <span style={{ fontSize: 20, lineHeight: 1.2, flexShrink: 0 }}>ℹ️</span>
          <div>
            <div style={{ fontWeight: 700, fontSize: 14, color: "#1e3a5f", marginBottom: 2,
              fontFamily: "'Trebuchet MS', 'Lucida Sans', sans-serif",
            }}>
              Important (CRA rule)
            </div>
            <div style={{ fontSize: 14, color: "#1e40af", lineHeight: 1.5 }}>
              Report Box 45 based on <strong>eligibility</strong> as of December 31, 2025 — not whether dental benefits were actually used.
            </div>
          </div>
        </div>

        {/* Main Card */}
        <div style={{
          background: "#fff", borderRadius: 14, padding: "28px 24px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 8px 24px rgba(0,0,0,0.04)",
          border: "1px solid #e7e5e4",
        }}>
          {!showResult ? (
            <>
              {/* Employer Name */}
              <div style={{ marginBottom: 22 }}>
                <div style={{
                  fontSize: 14, fontWeight: 600, color: "#475569",
                  textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 8,
                  fontFamily: "'Trebuchet MS', 'Lucida Sans', sans-serif",
                }}>
                  Employer / business name
                </div>
                <input
                  type="text"
                  value={employerName}
                  onChange={(e) => setEmployerName(e.target.value)}
                  placeholder="e.g., Acme Construction Ltd."
                  style={{
                    width: "100%", padding: "12px 14px", borderRadius: 8,
                    border: "2px solid #e2e8f0", fontSize: 17,
                    fontFamily: "inherit", color: "#1c1917",
                    outline: "none", boxSizing: "border-box",
                    transition: "border-color 0.15s",
                  }}
                  onFocus={(e) => e.target.style.borderColor = "#b91c1c"}
                  onBlur={(e) => e.target.style.borderColor = "#e2e8f0"}
                />
                <div style={{ fontSize: 12, color: "#a8a29e", marginTop: 6, lineHeight: 1.4 }}>
                  Used to label your workpaper record. We don't ask for SINs or CRA login details.
                </div>
              </div>

              {/* Question 1 */}
              <RadioGroup
                label="Did this employee have access to dental coverage at any point in 2025?"
                value={offeredDental}
                onChange={(v) => {
                  setOfferedDental(v);
                  if (v === false) { setSpouseEligible(null); setChildrenEligible(null); }
                }}
                options={[
                  { label: "Yes — dental coverage was offered", value: true },
                  { label: "No — no dental coverage was offered", value: false },
                ]}
              />

              {/* Conditional Questions */}
              {offeredDental === true && (
                <FadeIn delay={50}>
                  <div style={{
                    borderLeft: "3px solid #b91c1c", paddingLeft: 20,
                    marginLeft: 4, marginTop: 8,
                  }}>
                    <RadioGroup
                      label="Was the employee's spouse eligible for coverage?"
                      value={spouseEligible}
                      onChange={setSpouseEligible}
                      options={[
                        { label: "Yes", value: true },
                        { label: "No", value: false },
                      ]}
                    />
                    <RadioGroup
                      label="Were the employee's children eligible for coverage?"
                      value={childrenEligible}
                      onChange={setChildrenEligible}
                      options={[
                        { label: "Yes", value: true },
                        { label: "No", value: false },
                      ]}
                    />
                  </div>
                </FadeIn>
              )}

              {/* Calculate Button */}
              <button
                onClick={handleCalculate}
                disabled={!canCalculate}
                style={{
                  width: "100%", padding: "16px", marginTop: 12,
                  borderRadius: 10, border: "none",
                  background: canCalculate
                    ? "linear-gradient(135deg, #b91c1c, #991b1b)"
                    : "#e2e8f0",
                  color: canCalculate ? "#fff" : "#94a3b8",
                  fontSize: 18, fontWeight: 700, cursor: canCalculate ? "pointer" : "not-allowed",
                  fontFamily: "'Trebuchet MS', 'Lucida Sans', sans-serif",
                  letterSpacing: "0.02em",
                  transition: "all 0.2s ease",
                  boxShadow: canCalculate ? "0 4px 12px rgba(185,28,28,0.25)" : "none",
                }}
              >
                Get my Box 45 code →
              </button>
              <div style={{
                fontSize: 12, color: "#a8a29e", textAlign: "center", marginTop: 10, lineHeight: 1.4,
              }}>
                You'll get the code result free. PDF workpaper records are optional.
              </div>
            </>
          ) : (
            /* Result View */
            <FadeIn>
              <div style={{ textAlign: "center" }}>
                <div style={{
                  fontSize: 14, color: "#78716c", textTransform: "uppercase",
                  letterSpacing: "0.1em", marginBottom: 8,
                  fontFamily: "'Trebuchet MS', 'Lucida Sans', sans-serif",
                }}>
                  Your T4 Box 45 code
                </div>
                <div style={{
                  display: "inline-flex", alignItems: "center", justifyContent: "center",
                  width: 100, height: 100, borderRadius: "50%",
                  background: `${CODES[code]?.color}12`,
                  border: `3px solid ${CODES[code]?.color}`,
                  marginBottom: 12,
                }}>
                  <span style={{
                    fontSize: 52, fontWeight: 800, color: CODES[code]?.color,
                    fontFamily: "'Trebuchet MS', 'Lucida Sans', sans-serif",
                  }}>
                    {code}
                  </span>
                </div>
                <div style={{ fontSize: 20, fontWeight: 600, color: "#1c1917", marginBottom: 4 }}>
                  {CODES[code]?.label}
                </div>
                <div style={{ fontSize: 15, color: "#78716c", marginBottom: 8 }}>
                  {CODES[code]?.desc}
                </div>
                <div style={{ fontSize: 13, color: "#a8a29e", marginBottom: 24 }}>
                  Based on eligibility as of December 31, 2025.
                </div>

                {/* Upsell / Download Box */}
                <div style={{
                  background: "linear-gradient(135deg, #fafaf9, #f5f0eb)",
                  border: "1px solid #d6d3d1",
                  borderRadius: 12, padding: "22px 20px", marginBottom: 20,
                  textAlign: "left",
                }}>
                  <div style={{
                    display: "flex", alignItems: "center", gap: 8, marginBottom: 10,
                  }}>
                    <span style={{ fontSize: 20 }}>📋</span>
                    <span style={{
                      fontSize: 16, fontWeight: 700, color: "#1c1917",
                      fontFamily: "'Trebuchet MS', 'Lucida Sans', sans-serif",
                    }}>
                      Need a workpaper record for your files?
                    </span>
                  </div>
                  <p style={{
                    fontSize: 15, color: "#57534e", lineHeight: 1.6, margin: "0 0 12px 0",
                  }}>
                    Download a timestamped PDF showing your selections and the returned code.
                  </p>
                  <div style={{
                    fontSize: 14, color: "#78716c", marginBottom: 16,
                    paddingLeft: 12, borderLeft: "2px solid #d6d3d1",
                  }}>
                    ✓ Employer/business name<br/>
                    ✓ Your selections (inputs) and returned Box 45 code<br/>
                    ✓ Timestamp and unique record ID<br/>
                    ✓ Reference note: eligibility as of December 31, 2025
                  </div>

                  {/* Credit-based download or pack selector */}
                  {creditBalance > 0 && walletEmail ? (
                    <>
                      <button
                        onClick={handleDownloadPDF}
                        disabled={isLoadingCredits}
                        style={{
                          width: "100%", padding: "15px", borderRadius: 8, border: "none",
                          background: downloadReady
                            ? "#059669"
                            : isLoadingCredits
                            ? "#6b7280"
                            : "linear-gradient(135deg, #1c1917, #292524)",
                          color: "#fff", fontSize: 16, fontWeight: 700,
                          cursor: isLoadingCredits ? "not-allowed" : "pointer",
                          fontFamily: "'Trebuchet MS', 'Lucida Sans', sans-serif",
                          letterSpacing: "0.02em",
                          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                          transition: "all 0.2s",
                        }}
                      >
                        {isLoadingCredits
                          ? "⏳ Processing..."
                          : downloadReady
                          ? "✓ Downloaded — Generate Another?"
                          : "📄 Download workpaper PDF (uses 1 credit)"
                        }
                      </button>
                      <div style={{
                        fontSize: 12, color: "#a8a29e", textAlign: "center", marginTop: 8,
                      }}>
                        Each PDF download uses 1 credit.
                      </div>
                    </>
                  ) : (
                    <CreditPackSelector
                      onSelectPack={handlePurchasePack}
                      loading={isPurchasing}
                      email={walletEmail}
                    />
                  )}
                </div>

                {/* Reset */}
                <button
                  onClick={handleReset}
                  style={{
                    background: "none", border: "none", color: "#b91c1c",
                    fontSize: 15, fontWeight: 600, cursor: "pointer",
                    fontFamily: "'Trebuchet MS', 'Lucida Sans', sans-serif",
                    padding: "8px 16px",
                  }}
                >
                  ← Calculate Another Employee
                </button>
              </div>
            </FadeIn>
          )}
        </div>

        {/* Resend Link Form */}
        {showResendForm && !walletEmail && (
          <ResendLinkForm onClose={() => setShowResendForm(false)} />
        )}

        {/* Already have credits? Link */}
        {!walletEmail && !showResendForm && (
          <div style={{ textAlign: "center", marginTop: 16 }}>
            <button
              onClick={() => setShowResendForm(true)}
              style={{
                background: "none", border: "none", color: "#78716c",
                fontSize: 14, cursor: "pointer", textDecoration: "underline",
                fontFamily: "'Trebuchet MS', sans-serif",
              }}
            >
              Already purchased credits? Access them here
            </button>
          </div>
        )}

        {/* Footer - Hide in embed mode */}
        {!isEmbedMode && (
          <>
            <div style={{
              textAlign: "center", marginTop: 24, fontSize: 13, color: "#78716c",
              lineHeight: 1.6, fontWeight: 500,
            }}>
              This tool is not a Government of Canada or CRA website and is not affiliated with CRA. Owned and operated by Humilitas Group Limited.
            </div>
            <div style={{
              textAlign: "center", marginTop: 10, fontSize: 15, color: "#78716c",
              display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 4,
            }}>
              <Link to="/terms" style={{ color: "#57534e", textDecoration: "none" }}>Terms</Link>
              <span>·</span>
              <Link to="/privacy" style={{ color: "#57534e", textDecoration: "none" }}>Privacy</Link>
              <span>·</span>
              <a href="mailto:support@box45calculator.ca" style={{ color: "#57534e", textDecoration: "none" }}>Contact</a>
            </div>
            <div style={{
              textAlign: "center", marginTop: 8, fontSize: 12, color: "#a8a29e",
              lineHeight: 1.5,
            }}>
              We do not collect SINs or CRA login details. Your data is never used to train AI.
            </div>
          </>
        )}
      </div>
    </div>
  );
}
