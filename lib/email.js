// Email sending via Resend
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL = 'Box45 Calculator <noreply@box45calculator.ca>';
const SITE_URL = process.env.SITE_URL || 'https://box45calculator.ca';

export async function sendMagicLinkEmail(toEmail, token) {
  const magicUrl = `${SITE_URL}?magic=${encodeURIComponent(token)}`;

  const { data, error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: toEmail,
    subject: 'Your Box45 Calculator Access Link',
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; padding: 20px 0; border-bottom: 2px solid #b91c1c;">
          <h1 style="color: #b91c1c; margin: 0; font-size: 24px;">Box45 Calculator</h1>
          <p style="color: #666; margin: 8px 0 0;">Your T4 Box 45 Compliance Tool</p>
        </div>

        <div style="padding: 30px 0;">
          <p style="color: #333; font-size: 16px; line-height: 1.6;">
            Click the link below to access your credits on this device. This link is valid for 24 hours and can only be used once.
          </p>

          <div style="text-align: center; margin: 30px 0;">
            <a href="${magicUrl}" style="display: inline-block; background: #b91c1c; color: white; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-size: 16px; font-weight: 600;">
              Access My Credits
            </a>
          </div>

          <p style="color: #999; font-size: 13px; line-height: 1.5;">
            If you didn't request this link, you can safely ignore this email. Your credits are secure.
          </p>
        </div>

        <div style="border-top: 1px solid #eee; padding-top: 20px; text-align: center;">
          <p style="color: #999; font-size: 12px; margin: 0;">
            Box45 Calculator &mdash; box45calculator.ca
          </p>
        </div>
      </div>
    `,
  });

  if (error) {
    console.error('Resend email error:', error);
    throw new Error(`Failed to send email: ${error.message}`);
  }

  return data;
}

export async function sendPurchaseConfirmationEmail(toEmail, credits, token) {
  const magicUrl = `${SITE_URL}?magic=${encodeURIComponent(token)}`;

  const { data, error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: toEmail,
    subject: `${credits} credit${credits > 1 ? 's' : ''} added to your Box45 account`,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; padding: 20px 0; border-bottom: 2px solid #b91c1c;">
          <h1 style="color: #b91c1c; margin: 0; font-size: 24px;">Box45 Calculator</h1>
          <p style="color: #666; margin: 8px 0 0;">Purchase Confirmation</p>
        </div>

        <div style="padding: 30px 0;">
          <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 20px; text-align: center; margin-bottom: 24px;">
            <p style="color: #166534; font-size: 24px; font-weight: 700; margin: 0;">+${credits} Credit${credits > 1 ? 's' : ''}</p>
            <p style="color: #15803d; margin: 8px 0 0;">Successfully added to your account</p>
          </div>

          <p style="color: #333; font-size: 16px; line-height: 1.6;">
            Your credits are ready to use. Each credit lets you download one T4 Box 45 Compliance Memorandum PDF.
          </p>

          <p style="color: #333; font-size: 16px; line-height: 1.6;">
            <strong>Need to access your credits on another device?</strong> Use the link below:
          </p>

          <div style="text-align: center; margin: 30px 0;">
            <a href="${magicUrl}" style="display: inline-block; background: #b91c1c; color: white; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-size: 16px; font-weight: 600;">
              Access My Credits
            </a>
          </div>

          <p style="color: #999; font-size: 13px; line-height: 1.5;">
            This access link is valid for 24 hours. You can always request a new one at box45calculator.ca.
          </p>
        </div>

        <div style="border-top: 1px solid #eee; padding-top: 20px; text-align: center;">
          <p style="color: #999; font-size: 12px; margin: 0;">
            Box45 Calculator &mdash; box45calculator.ca
          </p>
        </div>
      </div>
    `,
  });

  if (error) {
    console.error('Resend email error:', error);
    throw new Error(`Failed to send email: ${error.message}`);
  }

  return data;
}
