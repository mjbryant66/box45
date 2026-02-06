# 🌐 Complete Domain Setup Guide
## Box45Calculator.ca - Step by Step

---

## Part 1: Buy the Domain (10 minutes)

### Step 1: Choose a Domain Registrar

**Recommended Options:**
- **Namecheap** (easiest, good prices) - https://www.namecheap.com
- **Google Domains** - https://domains.google.com
- **GoDaddy** - https://www.godaddy.com
- **Cloudflare Registrar** (cheapest, no markup) - https://www.cloudflare.com/products/registrar/

**I recommend Namecheap for simplicity.**

### Step 2: Search for the Domain

1. Go to https://www.namecheap.com
2. In the search bar, type: `box45calculator.ca`
3. Click "Search"

### Step 3: Check Availability

- If **available**: Great! Proceed to Step 4
- If **taken**: Try alternatives:
  - `box45calc.ca`
  - `t4box45.ca`
  - `box45tool.ca`
  - Or use `.com`: `box45calculator.com`

### Step 4: Add to Cart

1. Click "Add to Cart" next to box45calculator.ca
2. **Select domain length**: 1 year minimum (or longer for discount)
3. **Privacy options**:
   - ✅ **Enable** "WhoisGuard" (free privacy protection)
   - This hides your personal info from public WHOIS lookup

### Step 5: Review Add-ons

**Skip these (not needed):**
- ❌ Premium DNS
- ❌ Premium Email
- ❌ SSL Certificate (Vercel provides this free)
- ❌ Website builder
- ❌ SEO tools

**Keep only:**
- ✅ Domain registration
- ✅ WhoisGuard (privacy)

### Step 6: Create Account & Purchase

1. Click "Confirm Order"
2. Create a Namecheap account (email + password)
3. Enter payment information
4. **Review total cost**: Should be ~$15-20 CAD/year for .ca domain
5. Click "Pay Now"

### Step 7: Verify Email

1. Check your email inbox
2. Click verification link from Namecheap
3. Confirm your email address

**✅ Domain purchased! Now let's connect it to Vercel.**

---

## Part 2: Deploy to Vercel First (5 minutes)

**IMPORTANT: Deploy your app to Vercel BEFORE configuring the domain.**

### Step 1: Push Code to GitHub

```bash
cd t4-calculator

# Initialize git (if not done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Box45Calculator.ca"

# Create repo on GitHub first, then:
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/box45calculator.git
git push -u origin main
```

### Step 2: Import to Vercel

1. Go to https://vercel.com/new
2. Click "Import Git Repository"
3. Select your GitHub account
4. Find and select `box45calculator` repo
5. **Project Settings:**
   - Framework Preset: **Vite** (auto-detected ✅)
   - Build Command: `npm run build` ✅
   - Output Directory: `dist` ✅
   - Install Command: `npm install` ✅
6. Click **"Deploy"**

### Step 3: Wait for Deployment

- Watch the build logs (takes ~60 seconds)
- You'll see: "✓ Build Completed"
- Then: "✓ Deployment Ready"

### Step 4: Get Your Vercel URL

- Vercel gives you a URL like: `box45calculator.vercel.app`
- **Click "Visit"** to test your live site
- ✅ Verify the calculator works

**✅ App is live on Vercel! Now let's add your custom domain.**

---

## Part 3: Connect Domain to Vercel (10 minutes)

### Step 1: Open Vercel Project Settings

1. In Vercel dashboard, click your project name
2. Click **"Settings"** tab (top navigation)
3. Click **"Domains"** in left sidebar

### Step 2: Add Custom Domain

1. In the "Domains" section, you'll see an input box
2. Type: `box45calculator.ca`
3. Click **"Add"**

### Step 3: Vercel Shows DNS Instructions

Vercel will show you 2 options:
- **Option A**: Nameservers (recommended)
- **Option B**: A Record / CNAME

**We'll use Option A (Nameservers) - it's simpler.**

Vercel will show something like:
```
Please add the following nameservers to your domain:
- ns1.vercel-dns.com
- ns2.vercel-dns.com
```

**Keep this page open! We need these values.**

---

## Part 4: Configure DNS in Namecheap (5 minutes)

### Step 1: Log into Namecheap

1. Go to https://www.namecheap.com
2. Click "Sign In" (top right)
3. Enter your credentials
4. Click "Domain List" in left sidebar

### Step 2: Manage Domain

1. Find `box45calculator.ca` in your list
2. Click **"Manage"** button next to it

### Step 3: Change Nameservers

1. Scroll down to **"Nameservers"** section
2. Current setting: "Namecheap BasicDNS"
3. Click the dropdown and select **"Custom DNS"**

### Step 4: Add Vercel Nameservers

1. You'll see input fields for nameservers
2. **Enter these values** (from Vercel):
   ```
   ns1.vercel-dns.com
   ns2.vercel-dns.com
   ```
3. If there are extra empty fields, leave them blank
4. Click the **green checkmark** (✓) to save

### Step 5: Confirm Changes

- You'll see: "Nameservers updated successfully"
- Current nameservers now show: `ns1.vercel-dns.com`, `ns2.vercel-dns.com`

**✅ DNS configured! Now we wait for propagation.**

---

## Part 5: Wait for DNS Propagation (30-60 minutes)

### What's Happening?

DNS changes take time to spread across the internet. This is normal.

### Step 1: Check Vercel Status

1. Go back to Vercel → Settings → Domains
2. You'll see your domain with a status:
   - 🟡 **"Pending Verification"** - Still waiting
   - 🟢 **"Valid Configuration"** - Ready! ✅

### Step 2: While You Wait

**Do this:**
- ✅ Test your Vercel URL: `box45calculator.vercel.app`
- ✅ Test the calculator functionality
- ✅ Download a test PDF
- ✅ Try embed mode: `?embed=true`

**Don't do this:**
- ❌ Keep refreshing DNS (it won't help)
- ❌ Change nameservers again (this resets the timer)
- ❌ Panic (24-48 hours is normal, but usually takes 30-60 min)

### Step 3: Check Propagation Status (Optional)

Use this free tool to see if DNS has propagated globally:
1. Go to https://www.whatsmydns.net
2. Enter: `box45calculator.ca`
3. Select: **A** record type
4. Click "Search"
5. Green checkmarks = propagated in that location

---

## Part 6: Verify Domain is Working (2 minutes)

### Step 1: Test Your Domain

Once Vercel shows "Valid Configuration":

1. Open a new incognito/private browser window
2. Go to: https://box45calculator.ca
3. You should see your calculator! 🎉

### Step 2: Test HTTPS

1. Check the URL bar - you should see 🔒 (padlock icon)
2. Click the padlock
3. Verify: "Connection is secure"
4. Certificate by: Vercel

**Vercel automatically provides free SSL certificate!**

### Step 3: Test All Variations

Make sure these all work:
- ✅ `https://box45calculator.ca`
- ✅ `https://www.box45calculator.ca` (auto-redirects to non-www)
- ✅ `http://box45calculator.ca` (auto-upgrades to https)

---

## Part 7: Add WWW Subdomain (Optional - 2 minutes)

Some people might type `www.box45calculator.ca`. Let's handle that.

### Step 1: Add WWW to Vercel

1. Vercel → Settings → Domains
2. In the input box, type: `www.box45calculator.ca`
3. Click "Add"

### Step 2: Vercel Auto-Configures

Vercel will:
- ✅ Automatically redirect `www` → non-www
- ✅ Or you can choose to make `www` the primary

**Recommendation**: Redirect www to non-www (cleaner URLs)

---

## Part 8: Final Verification Checklist

### Test Everything:

- [ ] Visit https://box45calculator.ca
- [ ] Calculator loads and looks correct
- [ ] Fill out calculator (test all 5 codes)
- [ ] Download PDF (works correctly)
- [ ] Test embed mode: `https://box45calculator.ca?embed=true`
- [ ] Test on mobile phone
- [ ] SSL certificate shows (🔒 padlock)
- [ ] Old Vercel URL redirects to custom domain (optional)

### Optional: Set Primary Domain

If you want `box45calculator.vercel.app` to redirect to your custom domain:

1. Vercel → Settings → Domains
2. Find `box45calculator.ca`
3. Click the 3 dots (•••) menu
4. Select **"Set as Primary Domain"**
5. Now all traffic goes to your custom domain

---

## Troubleshooting

### "Domain is not verified" after 24 hours

**Cause**: Nameservers not updated correctly

**Fix**:
1. Go to Namecheap → Domain List → Manage
2. Check nameservers section
3. Make sure it says:
   - `ns1.vercel-dns.com`
   - `ns2.vercel-dns.com`
4. If not, update them again
5. Wait another hour

### "This site can't be reached"

**Cause**: DNS hasn't propagated yet

**Fix**:
1. Wait longer (up to 48 hours max)
2. Try on different network (mobile data vs wifi)
3. Clear browser cache
4. Try different browser

### SSL Certificate Error

**Cause**: Certificate still being issued

**Fix**:
1. Wait 15 minutes after domain verification
2. Hard refresh: Ctrl+Shift+R (PC) or Cmd+Shift+R (Mac)
3. Clear browser cache
4. Vercel auto-renews certificates, don't worry

### Domain shows old content

**Cause**: Browser cache

**Fix**:
1. Hard refresh: Ctrl+F5 or Cmd+Shift+R
2. Clear browser cache
3. Try incognito/private window
4. Try different device

---

## Domain Renewal Reminder

### Annual Renewal

.ca domains renew every year. Set a reminder!

**6 weeks before expiry:**
1. Check renewal price
2. Enable auto-renewal (recommended)
3. Or manually renew

**If domain expires:**
- Site goes offline immediately
- 30-day grace period to renew
- After 30 days: domain available for others to buy

**Recommendation**: Enable auto-renewal in Namecheap settings

---

## Cost Summary

### One-time Costs:
- Domain: ~$15-20/year (.ca domain)
- Vercel: $0 (free tier perfect for this)
- SSL: $0 (included with Vercel)
- **Total Year 1**: ~$15-20 CAD

### Ongoing Costs:
- Domain renewal: ~$15-20/year
- Vercel hosting: $0 (unless you exceed free limits)*
- Stripe fees: 2.9% + $0.30 per transaction (only when payments enabled)

*Vercel free tier includes:
- 100GB bandwidth/month
- Unlimited sites
- Automatic SSL
- Global CDN
- (Your calculator will stay well under these limits)

---

## Next Steps After Domain Setup

### 1. Update Links
- Update "Buy me a coffee" link if desired
- Update any social media bios with new URL

### 2. Add Google Analytics (Optional)
Track your visitors:
1. Create Google Analytics property
2. Add tracking code to `index.html`
3. Monitor traffic in GA dashboard

### 3. Submit to Google
Help Google index your site:
1. Go to https://search.google.com/search-console
2. Add property: `box45calculator.ca`
3. Verify ownership (Vercel method)
4. Submit sitemap (if you create one)

### 4. Test Payments
If you want to enable Stripe:
1. Add `STRIPE_SECRET_KEY` to Vercel env vars
2. Set `PAYMENT_ENABLED = true` in `src/App.jsx`
3. Test with test card: 4242 4242 4242 4242

### 5. Promote Your Tool
- Share on LinkedIn
- Post in CRA/tax professional groups
- Email your network
- List on product directories

---

## 🎉 Congratulations!

Your T4 Box 45 Calculator is now live at:
**https://box45calculator.ca**

You have:
- ✅ Professional custom domain
- ✅ Free SSL certificate (HTTPS)
- ✅ Global CDN (fast worldwide)
- ✅ Auto-deploy on git push
- ✅ Production-ready SaaS tool

**Time to celebrate!** ☕🎊

---

## Quick Reference

**Domain Registrar**: Namecheap
**DNS**: Vercel Nameservers
**Hosting**: Vercel
**Deployment**: Auto (on git push)
**SSL**: Auto-renewed by Vercel
**Cost**: ~$15-20/year

**Support:**
- Vercel Docs: https://vercel.com/docs
- Namecheap Support: https://www.namecheap.com/support/
- Your project docs: See README.md

---

Built for Box45Calculator.ca 🍁
