import { Link } from "react-router-dom";

export default function PrivacyPolicy() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(165deg, #fafaf9 0%, #f5f0eb 50%, #faf5f0 100%)",
      fontFamily: "'Palatino Linotype', 'Book Antiqua', Palatino, Georgia, serif",
      padding: "32px 16px",
    }}>
      <div style={{ maxWidth: 680, margin: "0 auto" }}>
        {/* Back link */}
        <Link to="/" style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          color: "#b91c1c", textDecoration: "none", fontWeight: 600,
          fontSize: 15, marginBottom: 24,
          fontFamily: "'Trebuchet MS', 'Lucida Sans', sans-serif",
        }}>
          ← Back to Calculator
        </Link>

        {/* Content Card */}
        <div style={{
          background: "#fff", borderRadius: 14, padding: "36px 32px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 8px 24px rgba(0,0,0,0.04)",
          border: "1px solid #e7e5e4",
        }}>
          <h1 style={{
            fontSize: 28, fontWeight: 700, color: "#0f0e0d",
            margin: "0 0 4px 0", lineHeight: 1.2,
          }}>
            Privacy Policy
          </h1>
          <div style={{
            fontSize: 14, color: "#78716c", marginBottom: 8,
            fontFamily: "'Trebuchet MS', 'Lucida Sans', sans-serif",
          }}>
            Box45Calculator | box45calculator.ca
          </div>
          <div style={{
            fontSize: 14, color: "#78716c", marginBottom: 28,
            fontFamily: "'Trebuchet MS', 'Lucida Sans', sans-serif",
          }}>
            Effective Date: February 6, 2026
          </div>

          <div style={{ fontSize: 16, color: "#1c1917", lineHeight: 1.7 }}>

            <Section num="1" title="Introduction">
              <p>Humilitas Group Limited, operating as Justice Stack ("we," "us," or "our"), operates Box45Calculator at box45calculator.ca.</p>
              <p>This Privacy Policy explains how we handle information when you use our Service. We are based in Toronto, Ontario, Canada, and comply with the Personal Information Protection and Electronic Documents Act (PIPEDA).</p>
            </Section>

            <Section num="2" title="Information We Collect">
              <h4 style={subheadingStyle}>Calculator Inputs — We Do Not Collect These</h4>
              <p>Box45Calculator runs entirely in your browser. The answers you enter are processed on your device using JavaScript. They are:</p>
              <ul>
                <li>Not sent to our servers</li>
                <li>Not stored in any database</li>
                <li>Not retained after you close your browser</li>
                <li>Not accessible to us or any third party</li>
              </ul>
              <p>We designed the Service this way to protect your privacy. We cannot see or retrieve what you enter.</p>

              <h4 style={subheadingStyle}>Compliance Memorandum PDF</h4>
              <p>If you generate a PDF, it is created on your device and downloaded directly to you. We do not receive or store its contents.</p>

              <h4 style={subheadingStyle}>Payment Information</h4>
              <p>If you purchase a PDF ($9 CAD), payment is processed by Stripe. We do not collect or store your payment card details.</p>
              <p>Stripe provides us only with a transaction ID and confirmation of payment. See Stripe's Privacy Policy for details.</p>

              <h4 style={subheadingStyle}>Server Logs</h4>
              <p>Our hosting provider, Vercel, may collect standard server logs (IP address, browser type, pages requested, timestamps) as part of normal web hosting. See Vercel's Privacy Policy for details.</p>

              <h4 style={subheadingStyle}>Cookies and Analytics</h4>
              <p>We do not use analytics tools or tracking cookies. Any cookies are strictly necessary for basic functionality (such as Stripe payment processing).</p>
            </Section>

            <Section num="3" title="How We Use Information">
              <p>We do not use your calculator inputs because we do not collect them.</p>
              <p>For payments, we use Stripe's transaction confirmation only to:</p>
              <ul>
                <li>Unlock the PDF generation feature</li>
                <li>Maintain transaction records as required by Canadian tax law</li>
              </ul>
            </Section>

            <Section num="4" title="How We Share Information">
              <p>We do not sell, rent, or trade personal information.</p>
              <p>The only third parties that may receive information are:</p>
              <table style={tableStyle}>
                <thead>
                  <tr>
                    <th style={thStyle}>Provider</th>
                    <th style={thStyle}>Location</th>
                    <th style={thStyle}>Data</th>
                    <th style={thStyle}>Purpose</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={tdStyle}>Vercel</td>
                    <td style={tdStyle}>United States</td>
                    <td style={tdStyle}>Server logs</td>
                    <td style={tdStyle}>Hosting</td>
                  </tr>
                  <tr>
                    <td style={tdStyle}>Stripe</td>
                    <td style={tdStyle}>United States</td>
                    <td style={tdStyle}>Payment details</td>
                    <td style={tdStyle}>Payment processing</td>
                  </tr>
                </tbody>
              </table>
            </Section>

            <Section num="5" title="Cross-Border Transfers">
              <p>Vercel and Stripe are based in the United States. Server logs and payment data may be processed there.</p>
              <p>Your calculator inputs stay on your device and are not transferred anywhere.</p>
              <p>Under PIPEDA, we must inform you that data in the United States may be accessible to U.S. authorities under U.S. law.</p>
            </Section>

            <Section num="6" title="Data Retention">
              <table style={tableStyle}>
                <thead>
                  <tr>
                    <th style={thStyle}>Data</th>
                    <th style={thStyle}>Retention</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td style={tdStyle}>Calculator inputs</td><td style={tdStyle}>Not retained (client-side only)</td></tr>
                  <tr><td style={tdStyle}>PDF contents</td><td style={tdStyle}>Not retained (client-side only)</td></tr>
                  <tr><td style={tdStyle}>Payment records to box45 app producer</td><td style={tdStyle}>7 years (Canadian tax law)</td></tr>
                  <tr><td style={tdStyle}>Server logs</td><td style={tdStyle}>Per Vercel's policies</td></tr>
                </tbody>
              </table>
            </Section>

            <Section num="7" title="Your Rights">
              <p>Under PIPEDA, you may:</p>
              <ul>
                <li>Access personal information we hold about you</li>
                <li>Correct inaccurate information</li>
                <li>Withdraw consent to collection or use</li>
              </ul>
              <p>Because we do not store your calculator inputs, there is nothing to access, correct, or delete from your use of the calculator.</p>
              <p>For questions about payment records, contact us at the address below. We will respond within 30 days.</p>
            </Section>

            <Section num="8" title="Children's Privacy">
              <p>Box45Calculator is a tax-relevant tool for adults learning to comply with tax requirements. We do not knowingly collect information from anyone under 18.</p>
            </Section>

            <Section num="9" title="Security">
              <ul>
                <li>All connections use HTTPS encryption</li>
                <li>Payments are handled by Stripe (PCI-DSS compliant)</li>
                <li>We do not store user data, so there is no data at rest to protect</li>
              </ul>
            </Section>

            <Section num="10" title="Changes to This Policy">
              <p>We may update this Privacy Policy from time to time. Changes will be posted here with an updated effective date. Material changes will be noted prominently on the Service.</p>
            </Section>

            <Section num="11" title="Contact">
              <p>
                Humilitas Group Limited (operating as Justice Stack)<br/>
                Toronto, Ontario, Canada<br/>
                Email: privacy@justack.ai<br/>
                Website: justack.ai
              </p>
            </Section>

            <Section num="12" title="Complaints">
              <p>If you are unsatisfied with our response to a privacy concern, you may contact:</p>
              <p>
                Office of the Privacy Commissioner of Canada<br/>
                30 Victoria Street, Gatineau, Quebec K1A 1H3<br/>
                Toll-free: 1-800-282-1376<br/>
                Website: priv.gc.ca
              </p>
            </Section>

          </div>
        </div>

        {/* Footer */}
        <PageFooter />
      </div>
    </div>
  );
}

function Section({ num, title, children }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <h3 style={{
        fontSize: 18, fontWeight: 700, color: "#1c1917",
        margin: "0 0 10px 0",
        fontFamily: "'Trebuchet MS', 'Lucida Sans', sans-serif",
      }}>
        {num}. {title}
      </h3>
      <div>{children}</div>
      <style>{`
        div p { margin: 0 0 10px 0; }
        div ul { margin: 8px 0 12px 0; padding-left: 24px; }
        div li { margin-bottom: 4px; }
      `}</style>
    </div>
  );
}

function PageFooter() {
  return (
    <>
      <div style={{
        textAlign: "center", marginTop: 24, fontSize: 13, color: "#78716c",
        lineHeight: 1.6, fontWeight: 500,
      }}>
        This is not a government or CRA website.{' '}
        Owned and operated by Humilitas Group Limited.
      </div>
      <div style={{
        textAlign: "center", marginTop: 10, fontSize: 15, color: "#78716c",
        display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 4,
      }}>
        <Link to="/" style={{ color: "#57534e", textDecoration: "none", fontWeight: 600 }}>
          Box45Calculator.ca
        </Link>
        <span>·</span>
        <Link to="/terms" style={{ color: "#57534e", textDecoration: "none" }}>Terms</Link>
        <span>·</span>
        <Link to="/privacy" style={{ color: "#57534e", textDecoration: "none" }}>Privacy</Link>
        <span>·</span>
        <a href="https://buymeacoffee.com/mjbryant66b" style={{ color: "#57534e", textDecoration: "none" }}>
          Buy me a coffee
        </a>
      </div>
    </>
  );
}

const subheadingStyle = {
  fontSize: 16, fontWeight: 700, color: "#44403c",
  margin: "16px 0 8px 0",
  fontFamily: "'Trebuchet MS', 'Lucida Sans', sans-serif",
};

const tableStyle = {
  width: "100%", borderCollapse: "collapse", marginTop: 12, marginBottom: 12,
  fontSize: 15,
};

const thStyle = {
  textAlign: "left", padding: "10px 14px",
  background: "#fafaf9", borderBottom: "2px solid #e7e5e4",
  fontFamily: "'Trebuchet MS', 'Lucida Sans', sans-serif",
  fontWeight: 700, fontSize: 14, color: "#1c1917",
};

const tdStyle = {
  padding: "8px 14px", borderBottom: "1px solid #f5f5f4",
  verticalAlign: "top",
};
