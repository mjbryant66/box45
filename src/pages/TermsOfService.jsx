import { Link } from "react-router-dom";

export default function TermsOfService() {
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
            Terms of Service
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

            <Section num="1" title="Acceptance of Terms">
              <p>By using Box45Calculator, you agree to these Terms of Service. If you do not agree, do not use the Service.</p>
              <p>These Terms are a binding agreement between you and Humilitas Group Limited, operating as Justice Stack ("Justice Stack," "we," or "us").</p>
            </Section>

            <Section num="2" title="Description of Service">
              <p>Box45Calculator is a free tool that helps Canadian employers determine the correct CRA dental benefits code for Box 45 of T4 slips.</p>
              <p>The Service:</p>
              <ul>
                <li>Asks three yes/no questions about dental benefits eligibility</li>
                <li>Displays the appropriate Box 45 code (1-5)</li>
                <li>Optionally generates a Compliance Memorandum PDF ($9 CAD)</li>
              </ul>
              <p>The Service is informational only. It does not provide tax or professional advice.</p>
            </Section>

            <Section num="3" title="Eligibility">
              <p>You must be at least 18 years old and have the legal capacity to agree to these Terms.</p>
              <p>The Service is designed for Canadian employers and payroll professionals. Results are based on CRA guidance applicable in Canada.</p>
            </Section>

            <Section num="4" title="Fees and Payment">
              <p>The calculator is free. The optional Compliance Memorandum PDF costs $9 CAD (plus applicable taxes).</p>
              <p>Payments are processed by Stripe. We do not collect or store your payment card information.</p>
              <p><strong>Refunds:</strong> Because the PDF is delivered instantly, all sales are final. If a technical issue prevents delivery, contact support@justack.ai within 7 days.</p>
            </Section>

            <Section num="5" title="Acceptable Use">
              <p>You agree not to:</p>
              <ul>
                <li>Use the Service for any unlawful purpose</li>
                <li>Attempt to gain unauthorized access to the Service</li>
                <li>Reverse engineer or copy the Service</li>
                <li>Resell or commercially redistribute the Service or its outputs</li>
              </ul>
              <p>We may block access if you violate these Terms.</p>
            </Section>

            <Section num="6" title="Intellectual Property">
              <p>The Service, including its design and code, is owned by Justice Stack and protected by intellectual property laws.</p>
              <p>You may use the calculator results and any purchased PDF for your T4 preparation and internal records. You may not resell or redistribute them commercially.</p>
            </Section>

            <Section num="7" title="Disclaimer — Please Read Carefully">
              <h4 style={subheadingStyle}>7.1 Not Professional Advice</h4>
              <p>Box45Calculator does not provide tax, accounting, or professional advice. Results are for informational purposes only. No output should be interpreted as telling you what to report on your T4s or what action to take.</p>

              <h4 style={subheadingStyle}>7.2 No Professional Relationship</h4>
              <p>Using this Service does not create an accountant-client, tax preparer-client, or any professional relationship with Justice Stack.</p>

              <h4 style={subheadingStyle}>7.3 Verify Your Results</h4>
              <p>You are responsible for verifying results against current CRA guidance. We recommend consulting CRA directly or a qualified tax professional if you have questions.</p>
              <p>CRA Business Inquiries: 1-800-959-5525<br/>CRA Website: canada.ca</p>

              <h4 style={subheadingStyle}>7.4 Calculator Limitations</h4>
              <ul>
                <li>CRA guidance may change; we cannot guarantee real-time accuracy</li>
                <li>Your benefits structure may have complexities the three questions do not capture</li>
                <li>This is not an official CRA tool</li>
              </ul>

              <h4 style={subheadingStyle}>7.5 The Compliance Memorandum</h4>
              <p>The optional PDF is a record of your calculation. It is not a legal document, professional opinion, or guarantee of CRA compliance. It does not protect you from reassessment or penalties.</p>

              <h4 style={subheadingStyle}>7.6 No Warranties</h4>
              <p>The Service is provided "as is" without warranties of any kind. We do not guarantee accuracy, completeness, or fitness for any purpose.</p>

              <h4 style={subheadingStyle}>7.7 Summary</h4>
              <table style={tableStyle}>
                <thead>
                  <tr>
                    <th style={thStyle}>Box45Calculator IS</th>
                    <th style={thStyle}>Box45Calculator IS NOT</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td style={tdStyle}>An informational tool</td><td style={tdStyle}>Tax advice</td></tr>
                  <tr><td style={tdStyle}>A code lookup based on CRA guidance</td><td style={tdStyle}>A professional opinion</td></tr>
                  <tr><td style={tdStyle}>A starting point</td><td style={tdStyle}>A guarantee of compliance</td></tr>
                  <tr><td style={tdStyle}>A convenience tool</td><td style={tdStyle}>An official CRA tool</td></tr>
                </tbody>
              </table>
            </Section>

            <Section num="8" title="Limitation of Liability">
              <p>To the maximum extent permitted by law, Justice Stack is not liable for:</p>
              <ul>
                <li>CRA penalties, interest, or reassessments</li>
                <li>Losses from reliance on the Service's results</li>
                <li>Decisions made based on Service outputs</li>
                <li>Indirect, incidental, or consequential damages</li>
              </ul>
              <p><strong>Liability Cap:</strong> Our total liability shall not exceed the greater of (a) amounts you paid us in the prior 12 months, or (b) $50 CAD.</p>
            </Section>

            <Section num="9" title="Indemnification">
              <p>You agree to indemnify Justice Stack from any claims or expenses arising from your use of the Service, your violation of these Terms, or your T4 filings based on the Service's outputs.</p>
            </Section>

            <Section num="10" title="Privacy">
              <p>We do not collect the information you enter into the calculator — it is processed entirely in your browser. Payment processing is handled by Stripe.</p>
              <p>See our full <Link to="/privacy" style={{ color: "#b91c1c", fontWeight: 600 }}>Privacy Policy</Link> at box45calculator.ca/privacy.</p>
            </Section>

            <Section num="11" title="Changes">
              <p>We may modify the Service or these Terms at any time. Continued use after changes constitutes acceptance.</p>
            </Section>

            <Section num="12" title="Termination">
              <p>You may stop using the Service at any time. We may block access at our discretion if you violate these Terms.</p>
            </Section>

            <Section num="13" title="Contact">
              <p>
                Humilitas Group Limited (operating as Justice Stack)<br/>
                Toronto, Ontario, Canada<br/>
                Email: support@justack.ai<br/>
                Website: justack.ai
              </p>
            </Section>

            <Section num="14" title="General">
              <ul>
                <li>These Terms are the entire agreement between you and Justice Stack regarding the Service.</li>
                <li>If any provision is unenforceable, the remainder continues in effect.</li>
                <li>Our failure to enforce a provision is not a waiver.</li>
                <li>You may not assign these Terms; we may assign without restriction.</li>
                <li>The English version of these Terms prevails over any translation.</li>
              </ul>
            </Section>

            <div style={{
              borderTop: "1px solid #e7e5e4", marginTop: 32, paddingTop: 20,
              fontSize: 14, color: "#78716c", textAlign: "center",
            }}>
              <p>Last updated: February 6, 2026</p>
              <p style={{ fontStyle: "italic" }}>Box45Calculator is an informational tool and does not provide tax or professional advice.</p>
            </div>
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
      <div style={{ paddingLeft: 0 }}>{children}</div>
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
