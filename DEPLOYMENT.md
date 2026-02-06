# 🚀 Deployment Guide

## Step-by-Step: Zero to Live in 10 Minutes

### Step 1: Test Locally (2 min)

```bash
cd t4-calculator
npm install
npm run dev
```

Open http://localhost:5173 and test the calculator.

### Step 2: Push to GitHub (3 min)

```bash
# Initialize git (if not already done)
git init
git add .
git commit -m "Initial commit: T4 Box 45 Calculator"

# Create new repo on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/t4-calculator.git
git branch -M main
git push -u origin main
```

### Step 3: Deploy to Vercel (3 min)

1. Go to https://vercel.com/new
2. Click **"Import Git Repository"**
3. Select your `t4-calculator` repo
4. Vercel auto-detects settings ✅
5. Click **"Deploy"**
6. Wait ~1 minute for build
7. **Done!** You get a live URL

### Step 4: Test Your Live Site (1 min)

Visit your Vercel URL (e.g., `t4-calculator.vercel.app`):
- ✅ Fill out the calculator
- ✅ Generate a code
- ✅ Download the PDF
- ✅ Test embed mode: `?embed=true`

### Step 5: Enable Payments (Optional - 1 min)

1. Get Stripe API key from https://dashboard.stripe.com/apikeys
2. In Vercel project: **Settings** → **Environment Variables**
3. Add: `STRIPE_SECRET_KEY` = `sk_test_...`
4. In `src/App.jsx`, change `PAYMENT_ENABLED = false` to `true`
5. Commit and push:
   ```bash
   git add src/App.jsx
   git commit -m "Enable Stripe payments"
   git push
   ```

### Step 6: Embed in Framer (Optional - 2 min)

1. In Framer, add an **Embed** component
2. Paste this HTML:
   ```html
   <iframe
     src="https://YOUR_VERCEL_URL.vercel.app?embed=true"
     width="100%"
     height="900px"
     frameborder="0"
   ></iframe>
   ```
3. Publish your Framer site

---

## 🎉 You're Live!

Your calculator is now:
- ✅ Deployed on Vercel (with SSL/HTTPS)
- ✅ Auto-rebuilds on every git push
- ✅ Globally distributed on CDN
- ✅ Ready to embed anywhere

## 🔄 Making Updates

To update your live site:

```bash
# Make your changes
# Then:
git add .
git commit -m "Description of changes"
git push
```

Vercel automatically rebuilds and deploys in ~1 minute.

## 📊 Monitoring

- **Vercel Dashboard**: https://vercel.com/dashboard
  - See deployments, analytics, logs
- **Stripe Dashboard**: https://dashboard.stripe.com
  - Monitor payments, refunds, customers

## 🆘 Need Help?

**Build failing?**
- Check Vercel build logs in the dashboard
- Verify all dependencies are installed
- Make sure Node version is 18+

**Payments not working?**
- Verify `STRIPE_SECRET_KEY` is set in Vercel
- Check that `PAYMENT_ENABLED = true` in App.jsx
- Look at Vercel function logs

**PDF not generating?**
- Check browser console for errors
- Verify jsPDF is installed: `npm list jspdf`
- Test in different browsers

## 🎯 Next Steps

1. **Custom Domain**: Add your own domain in Vercel settings
2. **Analytics**: Enable Vercel Analytics or add Google Analytics
3. **SEO**: Update `index.html` meta tags
4. **Go Live**: Switch Stripe from test mode to live mode

---

**Happy Shipping! 🚢**
