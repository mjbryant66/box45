# ⚡ Quick Start - T4 Calculator

## 🏃‍♂️ 5-Minute Launch

### Local Testing (1 min)
```bash
cd t4-calculator
npm install
npm run dev
```
Open http://localhost:5173

### Deploy to Vercel (3 min)
```bash
git init
git add .
git commit -m "T4 Calculator"
git push origin main  # After creating GitHub repo
```
Then: https://vercel.com/new → Import repo → Deploy

### Enable Payments (1 min - Optional)
1. Get Stripe key: https://dashboard.stripe.com/apikeys
2. Vercel → Settings → Environment Variables
3. Add: `STRIPE_SECRET_KEY` = `sk_test_...`
4. Edit `src/App.jsx` line 76: `PAYMENT_ENABLED = true`
5. Push to GitHub (auto-deploys)

## 🎯 Test Card
```
4242 4242 4242 4242
Any future date, any CVC
```

## 📋 File Checklist
- ✅ React app with calculator logic
- ✅ jsPDF for professional PDFs
- ✅ Stripe payment integration
- ✅ Vercel deployment config
- ✅ Embed mode (`?embed=true`)
- ✅ Full documentation

## 🔗 Key URLs After Deploy
- **Live site**: `your-app.vercel.app`
- **Embed mode**: `your-app.vercel.app?embed=true`
- **Vercel dashboard**: https://vercel.com/dashboard
- **Stripe dashboard**: https://dashboard.stripe.com

## 📝 Current Status
- ✅ Built and tested locally
- ✅ Production bundle created
- 🎯 Ready to deploy to Vercel
- 🎯 Ready to embed in Framer

## 🚀 You're Ready to Ship!

Everything works. Just deploy and you're live! 🎉
