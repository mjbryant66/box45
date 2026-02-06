import { useState, useEffect } from "react";
import { generateCompliancePDF } from "./utils/generatePDF";

const CODES = {
  1: { label: "Code 1", desc: "No dental benefits offered", color: "#64748b" },
  2: { label: "Code 2", desc: "Employee only coverage", color: "#0369a1" },
  3: { label: "Code 3", desc: "Spouse & children eligible", color: "#059669" },
  4: { label: "Code 4", desc: "Spouse only eligible", color: "#7c3aed" },
  5: { label: "Code 5", desc: "Children only eligible", color: "#d97706" },
};

function RadioGroup({ label, value, onChange, options }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{
        fontSize: 13, fontWeight: 600, color: "#475569",
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
                fontWeight: selected ? 700 : 500, fontSize: 15,
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
        <span style={{ fontSize: 20 }}>⏰</span>
        <div style={{ textAlign: "center", flex: 1, minWidth: 200 }}>
          {isPastDeadline ? (
            <>
              <div style={{ fontSize: 14, fontWeight: 700, fontFamily: "'Trebuchet MS', sans-serif", marginBottom: 4 }}>
                T4 DEADLINE PASSED — LATE FILINGS ACCEPTED
              </div>
              <div style={{ fontSize: 12, opacity: 0.95 }}>
                File now to minimize penalties • Instant compliance memo
              </div>
            </>
          ) : (
            <>
              <div style={{ fontSize: 14, fontWeight: 700, fontFamily: "'Trebuchet MS', sans-serif", marginBottom: 4 }}>
                T4 FILING DEADLINE: FEBRUARY {now.getFullYear() % 4 === 0 ? '29' : '28'}, {now.getFullYear()}
              </div>
              <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: "0.5px" }}>
                {timeLeft.days > 0 && `${timeLeft.days} day${timeLeft.days !== 1 ? 's' : ''}`}
                {timeLeft.days > 0 && timeLeft.hours > 0 && ', '}
                {timeLeft.hours > 0 && `${timeLeft.hours} hour${timeLeft.hours !== 1 ? 's' : ''}`}
                {timeLeft.days === 0 && timeLeft.hours === 0 && `${timeLeft.minutes} minute${timeLeft.minutes !== 1 ? 's' : ''}`}
                {' remaining'}
              </div>
              {isUrgent && (
                <div style={{ fontSize: 11, marginTop: 6, opacity: 0.95 }}>
                  🚨 Last minute? Get your code instantly + audit-ready documentation
                </div>
              )}
            </>
          )}
        </div>
        <span style={{ fontSize: 20 }}>🍁</span>
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
  const [employerName, setEmployerName] = useState("");
  const [offeredDental, setOfferedDental] = useState(null);
  const [spouseEligible, setSpouseEligible] = useState(null);
  const [childrenEligible, setChildrenEligible] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [downloadReady, setDownloadReady] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  // Check for embed mode and payment status
  const urlParams = new URLSearchParams(window.location.search);
  const isEmbedMode = urlParams.get('embed') === 'true';
  const paymentSuccess = urlParams.get('payment') === 'success';
  const sessionId = urlParams.get('session_id');

  // Payment feature flag - set to true to enable Stripe payments
  const PAYMENT_ENABLED = true; // Stripe test mode enabled

  // Verify payment on return from Stripe
  useEffect(() => {
    if (paymentSuccess && sessionId && !downloadReady) {
      verifyPayment(sessionId);
    }
  }, [paymentSuccess, sessionId]);

  const verifyPayment = async (sessionId) => {
    try {
      const response = await fetch('/api/verify-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId }),
      });

      const data = await response.json();

      if (data.paid) {
        setDownloadReady(true);
        // You can restore state from sessionStorage if needed
        alert('Payment successful! You can now download your compliance memorandum.');
      }
    } catch (error) {
      console.error('Payment verification error:', error);
      alert('There was an error verifying your payment. Please contact support.');
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

  const handleDownloadPDF = async () => {
    const inputs = { employerName, offeredDental, spouseEligible, childrenEligible };

    if (PAYMENT_ENABLED && !downloadReady) {
      // Payment flow - redirect to Stripe Checkout
      setIsProcessingPayment(true);

      try {
        // Save state to sessionStorage so we can restore after payment
        sessionStorage.setItem('t4-calculator-state', JSON.stringify({
          employerName,
          offeredDental,
          spouseEligible,
          childrenEligible,
          code,
        }));

        const response = await fetch('/api/create-checkout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ code, employerName }),
        });

        const data = await response.json();

        if (data.url) {
          // Redirect to Stripe Checkout
          window.location.href = data.url;
        } else {
          throw new Error('No checkout URL received');
        }
      } catch (error) {
        console.error('Checkout error:', error);
        alert('There was an error processing your payment. Please try again.');
        setIsProcessingPayment(false);
      }
    } else {
      // Free download (MVP mode) or post-payment download
      generateCompliancePDF(inputs, code);
      setDownloadReady(true);
    }
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
              display: "inline-flex", alignItems: "center", gap: 10,
              background: "#b91c1c", color: "#fff", padding: "6px 16px",
              borderRadius: 6, fontSize: 12, fontWeight: 700,
              letterSpacing: "0.1em", textTransform: "uppercase",
              fontFamily: "'Trebuchet MS', 'Lucida Sans', sans-serif",
              marginBottom: 16,
            }}>
              <span>🍁</span> CRA Compliance Tool
            </div>
            <h1 style={{
              fontSize: 28, fontWeight: 700, color: "#1c1917",
              margin: "0 0 8px 0", lineHeight: 1.2,
            }}>
              T4 Box 45 Calculator
            </h1>
            <p style={{ fontSize: 15, color: "#78716c", margin: 0, lineHeight: 1.5 }}>
              Determine the correct dental benefits code for your T4 filings
            </p>
          </div>
        )}

        {/* Deadline Banner - Seasonal */}
        <DeadlineBanner />

        {/* Warning Banner */}
        <div style={{
          background: "#fffbeb", border: "1px solid #f59e0b",
          borderRadius: 10, padding: "14px 18px", marginBottom: 24,
          display: "flex", gap: 12, alignItems: "flex-start",
        }}>
          <span style={{ fontSize: 20, lineHeight: 1, flexShrink: 0 }}>⚠️</span>
          <div>
            <div style={{ fontWeight: 700, fontSize: 13, color: "#92400e", marginBottom: 2,
              fontFamily: "'Trebuchet MS', 'Lucida Sans', sans-serif",
            }}>
              Critical Rule
            </div>
            <div style={{ fontSize: 13, color: "#78350f", lineHeight: 1.5 }}>
              Report based on <strong>eligibility</strong> as of December 31, 2025 — not whether benefits were actually used.
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
                  fontSize: 13, fontWeight: 600, color: "#475569",
                  textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 8,
                  fontFamily: "'Trebuchet MS', 'Lucida Sans', sans-serif",
                }}>
                  Employer / Business Name
                </div>
                <input
                  type="text"
                  value={employerName}
                  onChange={(e) => setEmployerName(e.target.value)}
                  placeholder="e.g. Acme Construction Ltd."
                  style={{
                    width: "100%", padding: "12px 14px", borderRadius: 8,
                    border: "2px solid #e2e8f0", fontSize: 15,
                    fontFamily: "inherit", color: "#1c1917",
                    outline: "none", boxSizing: "border-box",
                    transition: "border-color 0.15s",
                  }}
                  onFocus={(e) => e.target.style.borderColor = "#b91c1c"}
                  onBlur={(e) => e.target.style.borderColor = "#e2e8f0"}
                />
              </div>

              {/* Question 1 */}
              <RadioGroup
                label="Did you offer dental benefits to this employee?"
                value={offeredDental}
                onChange={(v) => {
                  setOfferedDental(v);
                  if (v === false) { setSpouseEligible(null); setChildrenEligible(null); }
                }}
                options={[
                  { label: "Yes, we offered dental", value: true },
                  { label: "No dental offered", value: false },
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
                  fontSize: 16, fontWeight: 700, cursor: canCalculate ? "pointer" : "not-allowed",
                  fontFamily: "'Trebuchet MS', 'Lucida Sans', sans-serif",
                  letterSpacing: "0.02em",
                  transition: "all 0.2s ease",
                  boxShadow: canCalculate ? "0 4px 12px rgba(185,28,28,0.25)" : "none",
                }}
              >
                Determine Code →
              </button>
            </>
          ) : (
            /* Result View */
            <FadeIn>
              <div style={{ textAlign: "center" }}>
                <div style={{
                  fontSize: 13, color: "#78716c", textTransform: "uppercase",
                  letterSpacing: "0.1em", marginBottom: 8,
                  fontFamily: "'Trebuchet MS', 'Lucida Sans', sans-serif",
                }}>
                  Your T4 Box 45 Code
                </div>
                <div style={{
                  display: "inline-flex", alignItems: "center", justifyContent: "center",
                  width: 96, height: 96, borderRadius: "50%",
                  background: `${CODES[code]?.color}12`,
                  border: `3px solid ${CODES[code]?.color}`,
                  marginBottom: 12,
                }}>
                  <span style={{
                    fontSize: 48, fontWeight: 800, color: CODES[code]?.color,
                    fontFamily: "'Trebuchet MS', 'Lucida Sans', sans-serif",
                  }}>
                    {code}
                  </span>
                </div>
                <div style={{ fontSize: 18, fontWeight: 600, color: "#1c1917", marginBottom: 4 }}>
                  {CODES[code]?.label}
                </div>
                <div style={{ fontSize: 14, color: "#78716c", marginBottom: 24 }}>
                  {CODES[code]?.desc}
                </div>

                {/* Upsell Box */}
                <div style={{
                  background: "linear-gradient(135deg, #fafaf9, #f5f0eb)",
                  border: "1px solid #d6d3d1",
                  borderRadius: 12, padding: "22px 20px", marginBottom: 20,
                  textAlign: "left",
                }}>
                  <div style={{
                    display: "flex", alignItems: "center", gap: 8, marginBottom: 10,
                  }}>
                    <span style={{ fontSize: 18 }}>📋</span>
                    <span style={{
                      fontSize: 14, fontWeight: 700, color: "#1c1917",
                      fontFamily: "'Trebuchet MS', 'Lucida Sans', sans-serif",
                    }}>
                      Compliance Memorandum
                    </span>
                  </div>
                  <p style={{
                    fontSize: 13, color: "#57534e", lineHeight: 1.6, margin: "0 0 12px 0",
                  }}>
                    <strong>CRA audits can happen up to 6 years after filing.</strong> Protect yourself with a
                    timestamped compliance record showing your determination logic, inputs, and legal basis.
                  </p>
                  <div style={{
                    fontSize: 12, color: "#78716c", marginBottom: 16,
                    paddingLeft: 12, borderLeft: "2px solid #d6d3d1",
                  }}>
                    ✓ Instant download (PDF)<br/>
                    ✓ Audit-ready documentation<br/>
                    ✓ Unique record ID & timestamp<br/>
                    ✓ Legal disclaimer included
                  </div>
                  <button
                    onClick={handleDownloadPDF}
                    disabled={isProcessingPayment}
                    style={{
                      width: "100%", padding: "14px", borderRadius: 8, border: "none",
                      background: downloadReady
                        ? "#059669"
                        : isProcessingPayment
                        ? "#6b7280"
                        : "linear-gradient(135deg, #1c1917, #292524)",
                      color: "#fff", fontSize: 14, fontWeight: 700,
                      cursor: isProcessingPayment ? "not-allowed" : "pointer",
                      fontFamily: "'Trebuchet MS', 'Lucida Sans', sans-serif",
                      letterSpacing: "0.02em",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                      transition: "all 0.2s",
                    }}
                  >
                    {isProcessingPayment
                      ? "⏳ Redirecting to checkout..."
                      : downloadReady
                      ? "✓ Downloaded — Generate Another?"
                      : PAYMENT_ENABLED
                      ? "💳 Proceed to Checkout — $9 CAD"
                      : "📄 Download Audit Record — $9"}
                  </button>
                  <div style={{
                    fontSize: 11, color: "#a8a29e", textAlign: "center", marginTop: 8,
                  }}>
                    {PAYMENT_ENABLED
                      ? "🔒 Secure payment via Stripe • No account required"
                      : "⚡ Instant download • No signup required"}
                  </div>
                </div>

                {/* Reset */}
                <button
                  onClick={handleReset}
                  style={{
                    background: "none", border: "none", color: "#b91c1c",
                    fontSize: 14, fontWeight: 600, cursor: "pointer",
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

        {/* Footer - Hide in embed mode */}
        {!isEmbedMode && (
          <div style={{
            textAlign: "center", marginTop: 24, fontSize: 12, color: "#a8a29e",
          }}>
            <a href="https://box45calculator.ca" style={{ color: "#78716c", textDecoration: "none", fontWeight: 600 }}>
              Box45Calculator.ca
            </a>
            <span style={{ margin: "0 8px" }}>·</span>
            <a href="https://buymeacoffee.com/" style={{ color: "#78716c", textDecoration: "none" }}>
              ☕ Buy me a coffee
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
