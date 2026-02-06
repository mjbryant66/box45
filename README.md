# T4 Box 45 Calculator 🍁

A professional CRA compliance tool that helps employers determine the correct dental benefits code (Box 45) for T4 tax forms. Built with React, Vite, and Stripe.

## 🎯 Features

- **Smart Decision Tree**: Guides users through CRA eligibility questions
- **Instant Code Determination**: Calculates the correct code (1-5) based on inputs
- **Professional PDF Export**: Generates timestamped compliance memorandums using jsPDF
- **Stripe Integration**: Ready-to-enable $9 CAD payment system
- **Embed Mode**: Clean embeddable version for Framer sites (`?embed=true`)
- **Responsive Design**: Works beautifully on mobile, tablet, and desktop
- **Zero Dependencies**: Self-contained, no external APIs required (except Stripe when enabled)

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- Vercel account (for deployment)
- Stripe account (optional, for payments)

### Local Development

1. **Clone and install dependencies**:
   ```bash
   cd t4-calculator
   npm install
   ```

2. **Start the dev server**:
   ```bash
   npm run dev
   ```

3. **Open in browser**:
   ```
   http://localhost:5173
   ```

### Build for Production

```bash
npm run build
```

The production build will be in the `dist/` folder.

## 📦 Deployment to Vercel

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: T4 Calculator"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/t4-calculator.git
   git push -u origin main
   ```

2. **Import to Vercel**:
   - Go to [vercel.com/new](https://vercel.com/new)
   - Click "Import Git Repository"
   - Select your GitHub repo
   - Vercel will auto-detect Vite settings
   - Click "Deploy"

3. **Your app is live!** 🎉
   - Vercel will give you a URL like `t4-calculator.vercel.app`

### Option 2: Deploy via Vercel CLI

```bash
npm i -g vercel
vercel login
vercel --prod
```

## 💳 Enabling Stripe Payments

By default, the calculator works in **MVP mode** (free downloads). To enable payments:

### 1. Get Stripe API Keys

1. Log in to [Stripe Dashboard](https://dashboard.stripe.com/apikeys)
2. Copy your **Secret Key** (starts with `sk_test_` for testing)
3. For production, use your **Live Mode** secret key

### 2. Add Environment Variables to Vercel

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add:
   ```
   STRIPE_SECRET_KEY=sk_test_your_test_key_here
   ```
4. For production, add the live key to the "Production" environment

### 3. Enable Payments in Code

1. Open `src/App.jsx`
2. Find this line (around line 76):
   ```javascript
   const PAYMENT_ENABLED = false;
   ```
3. Change it to:
   ```javascript
   const PAYMENT_ENABLED = true;
   ```
4. Commit and push:
   ```bash
   git add .
   git commit -m "Enable Stripe payments"
   git push
   ```

### 4. Test the Payment Flow

1. Use Stripe test card: `4242 4242 4242 4242`
2. Any future expiry date, any CVC
3. Complete the checkout
4. You'll be redirected back with the PDF download enabled

### 5. Go Live

When ready for real payments:
- Replace `sk_test_` key with `sk_live_` key in Vercel
- Stripe will automatically use live mode
- Real cards will be charged $9 CAD

## 🖼️ Embedding in Framer

To embed the calculator in your Framer website:

### 1. Add an Embed Component

In Framer:
1. Add an **Embed** component to your page
2. Paste this code:
   ```html
   <iframe
     src="https://YOUR_VERCEL_URL.vercel.app?embed=true"
     width="100%"
     height="900px"
     frameborder="0"
     style="border-radius: 12px;"
   ></iframe>
   ```

### 2. Embed Mode Features

The `?embed=true` parameter:
- ✅ Hides the header banner
- ✅ Hides the footer
- ✅ Reduces padding for tighter fit
- ✅ Keeps all calculator functionality

### 3. Styling Tips

```css
/* Recommended iframe styling */
iframe {
  width: 100%;
  max-width: 600px;
  height: 900px;
  border: none;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
}
```

## 🗂️ Project Structure

```
t4-calculator/
├── api/                          # Vercel serverless functions
│   ├── create-checkout.js        # Creates Stripe checkout session
│   └── verify-payment.js         # Verifies payment completion
├── src/
│   ├── App.jsx                   # Main calculator component
│   ├── main.jsx                  # React entry point
│   ├── index.css                 # Tailwind imports
│   └── utils/
│       └── generatePDF.js        # jsPDF PDF generation logic
├── public/                       # Static assets
├── index.html                    # HTML template
├── package.json                  # Dependencies
├── vite.config.js                # Vite configuration
├── tailwind.config.js            # Tailwind configuration
├── vercel.json                   # Vercel deployment config
└── .env.example                  # Environment variables template
```

## 🔧 Configuration Files

### Environment Variables

Copy `.env.example` to `.env.local` for local development:

```bash
cp .env.example .env.local
```

Then add your Stripe key:

```env
STRIPE_SECRET_KEY=sk_test_your_test_key_here
```

**⚠️ Never commit `.env.local` to git!** It's already in `.gitignore`.

### Tailwind CSS

Fonts are configured in `tailwind.config.js`:
- **Serif**: Palatino Linotype, Book Antiqua, Georgia
- **Sans**: Trebuchet MS, Lucida Sans

### Vercel Configuration

The `vercel.json` file handles:
- Build command: `npm run build`
- Output directory: `dist`
- SPA routing (redirects to `index.html`)

## 🎨 Customization

### Change the Price

1. Open `src/App.jsx`
2. Update button text (line ~400):
   ```javascript
   "💳 Proceed to Checkout — $9 CAD"
   ```

3. Open `api/create-checkout.js`
4. Update the amount (line ~42):
   ```javascript
   unit_amount: 900, // $9.00 CAD in cents
   ```

### Update Branding

1. **Colors**: Edit the gradient and color values in `App.jsx`
2. **Logo**: Replace the 🍁 emoji (line ~200 in App.jsx)
3. **Footer Links**: Update lines ~433-437 in App.jsx

### Modify PDF Layout

Edit `src/utils/generatePDF.js` to customize:
- Font sizes and styles
- Page layout and margins
- Colors and borders
- Content sections

## 📊 Analytics & Monitoring

### Recommended Tools

1. **Vercel Analytics**: Built-in, free tier available
2. **Google Analytics**: Add to `index.html`
3. **Stripe Dashboard**: Monitor payments and refunds

### Adding Google Analytics

Add to `index.html` in the `<head>`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 🐛 Troubleshooting

### Build Errors

**Problem**: `npm install` fails
**Solution**: Delete `node_modules` and `package-lock.json`, then run `npm install` again

**Problem**: Build fails on Vercel
**Solution**: Check that all dependencies are in `dependencies`, not `devDependencies`

### Payment Issues

**Problem**: Stripe checkout not loading
**Solution**:
1. Check that `STRIPE_SECRET_KEY` is set in Vercel environment variables
2. Verify you're using the correct key format (`sk_test_` or `sk_live_`)
3. Check Vercel function logs for errors

**Problem**: Payment successful but PDF not downloading
**Solution**:
1. Check browser console for errors
2. Verify `verify-payment.js` API route is working
3. Clear sessionStorage and try again

### Embed Mode Issues

**Problem**: Calculator doesn't fit in iframe
**Solution**: Increase iframe height to 900px or more

**Problem**: Scrolling issues in Framer
**Solution**: Add `overflow-y: auto;` to iframe CSS

## 🔒 Security Notes

- ✅ Stripe keys are server-side only (never exposed to browser)
- ✅ Payment verification happens server-side
- ✅ CORS is properly configured for API routes
- ✅ No sensitive data stored in browser localStorage
- ⚠️ Always use HTTPS in production (Vercel does this automatically)

## 📈 Future Enhancements

Ideas for v2:
- [ ] Save calculations to user account
- [ ] Bulk employee processing (CSV upload)
- [ ] Email delivery of PDFs
- [ ] Multi-language support (French)
- [ ] Admin dashboard for purchase history
- [ ] Integration with payroll software APIs

## 📝 License

This project is private and proprietary to Box45Calculator.ca.

## 🤝 Support

For questions or issues:
- Email: support@box45calculator.ca
- Website: https://box45calculator.ca

---

**Built with ❤️ by Box45Calculator.ca** | Powered by React, Vite, Stripe & Vercel
