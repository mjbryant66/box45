# 📋 PA Instructions: Box45Calculator.ca Launch
## Complete Step-by-Step Guide

**IMPORTANT:** Follow these instructions in order. Complete each section fully before moving to the next. Don't skip steps.

---

# 🎯 OVERVIEW

You're launching a T4 Box 45 Calculator website called **Box45Calculator.ca**. This is a seasonal business tool (busiest Feb-March) that helps Canadian employers determine the correct dental benefits code for their T4 tax forms.

**What you'll do:**
1. Deploy the website to Vercel (hosting platform)
2. Buy and connect the domain box45calculator.ca
3. Set up payment processing (Stripe)
4. Test everything works

**Time estimate:** 2-3 hours total
**Tech knowledge needed:** Basic (I'll guide you through everything)

---

# ✅ SECTION 1: DEPLOY TO VERCEL (30 minutes)

## Step 1.1: Push Code to GitHub

**What you need:**
- GitHub account (create free at github.com if needed)
- The t4-calculator folder on your computer

**Instructions:**

1. Open Terminal (Mac) or Command Prompt (Windows)

2. Navigate to the project folder:
   ```bash
   cd /path/to/t4-calculator
   ```
   (Replace `/path/to/` with the actual location)

3. Initialize git:
   ```bash
   git init
   ```

4. Add all files:
   ```bash
   git add .
   ```

5. Create first commit:
   ```bash
   git commit -m "Initial commit: Box45Calculator.ca"
   ```

6. Set branch to main:
   ```bash
   git branch -M main
   ```

7. **Now create GitHub repository:**
   - Go to https://github.com/new
   - Repository name: `box45calculator`
   - Set to Private
   - Do NOT initialize with README
   - Click "Create repository"

8. **Connect local code to GitHub:**
   - GitHub will show you commands like this:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/box45calculator.git
   git push -u origin main
   ```
   - Copy those exact commands from GitHub
   - Paste into your terminal
   - Press Enter

9. **Verify it worked:**
   - Refresh your GitHub repository page
   - You should see all the project files

**✅ Checkpoint:** Can you see all the files in GitHub? Yes = Continue. No = Ask for help.

---

## Step 1.2: Deploy to Vercel

**What you need:**
- Vercel account (create free at vercel.com)
- Your GitHub repository (from Step 1.1)

**Instructions:**

1. Go to https://vercel.com/signup
   - Sign up with GitHub (click "Continue with GitHub")
   - Authorize Vercel to access your GitHub

2. After signup, click **"Add New Project"**

3. Click **"Import Git Repository"**

4. Find and select **box45calculator** from your repositories

5. **Project Settings (Vercel auto-fills these - verify they're correct):**
   - Framework Preset: **Vite** ✓
   - Build Command: `npm run build` ✓
   - Output Directory: `dist` ✓
   - Install Command: `npm install` ✓

6. **DO NOT change any settings**

7. Click **"Deploy"**

8. Wait for deployment (takes 1-2 minutes)
   - You'll see a progress screen
   - Green checkmarks = good
   - Wait for "Congratulations!" message

9. **Get your live URL:**
   - Vercel shows something like: `box45calculator.vercel.app`
   - **COPY THIS URL - you'll need it**

10. **Test your live site:**
    - Click "Visit" or go to your `.vercel.app` URL
    - The calculator should load
    - Try filling it out and getting a code

**✅ Checkpoint:** Does the calculator work at your .vercel.app URL? Yes = Continue. No = Check build logs for errors.

**📸 Take a screenshot of the working calculator and save it.**

---

# ✅ SECTION 2: BUY DOMAIN (15 minutes)

## Step 2.1: Purchase box45calculator.ca

**What you need:**
- Credit card
- Email address
- $15-20 CAD

**Instructions:**

1. Go to https://www.namecheap.com

2. In the search bar, type: `box45calculator.ca`

3. Click **"Search"**

4. **If available:**
   - Click "Add to Cart"
   - Proceed to Step 2.2

5. **If NOT available:**
   - **STOP and ask boss:** "box45calculator.ca is taken. What domain should I buy instead?"
   - Wait for instructions before continuing

**✅ Checkpoint:** Domain is in your cart? Yes = Continue.

---

## Step 2.2: Complete Purchase

**Instructions:**

1. Click "View Cart"

2. **Domain registration:**
   - Select: **1 year** (or 2 years if boss approves)

3. **Add-ons to KEEP:**
   - ✅ WhoisGuard (FREE privacy protection) - KEEP THIS

4. **Add-ons to REMOVE:**
   - ❌ Premium DNS - Remove
   - ❌ Email hosting - Remove
   - ❌ Website builder - Remove
   - ❌ SSL Certificate - Remove (Vercel provides free)
   - ❌ SEO tools - Remove

5. **Your cart should show:**
   - Domain: box45calculator.ca (~$15-20)
   - WhoisGuard: FREE
   - **Total: ~$15-20 CAD**

6. Click **"Confirm Order"**

7. **Create Namecheap account:**
   - Use boss's email or company email
   - Create strong password
   - Save password somewhere safe

8. **Payment:**
   - Enter payment information
   - Review total
   - Click "Pay Now"

9. **Verify email:**
   - Check email inbox
   - Click verification link from Namecheap
   - Confirm email address

**✅ Checkpoint:** You received order confirmation email? Yes = Continue.

**📸 Take screenshot of order confirmation and save it.**

---

# ✅ SECTION 3: CONNECT DOMAIN TO VERCEL (20 minutes)

## Step 3.1: Add Domain in Vercel

**Instructions:**

1. Go to https://vercel.com/dashboard

2. Click on your **box45calculator** project

3. Click **"Settings"** tab (top of page)

4. Click **"Domains"** in left sidebar

5. In the input box, type: `box45calculator.ca`

6. Click **"Add"**

7. **Vercel will show nameserver instructions:**
   - You'll see something like:
   ```
   Please add these nameservers to your domain:
   ns1.vercel-dns.com
   ns2.vercel-dns.com
   ```

8. **KEEP THIS PAGE OPEN** - you'll need these values

**✅ Checkpoint:** Can you see the nameserver instructions? Yes = Continue.

---

## Step 3.2: Configure Nameservers in Namecheap

**Instructions:**

1. **Open NEW tab** → Go to https://www.namecheap.com

2. Click **"Sign In"** (top right)

3. After login, click **"Domain List"** (left sidebar)

4. Find `box45calculator.ca` and click **"Manage"**

5. Scroll to **"Nameservers"** section

6. Current setting shows: "Namecheap BasicDNS"

7. Click the dropdown and select **"Custom DNS"**

8. **Enter the nameservers from Vercel:**
   - Nameserver 1: `ns1.vercel-dns.com`
   - Nameserver 2: `ns2.vercel-dns.com`
   - (Copy these exactly from your Vercel page)

9. **If there are extra nameserver fields (3, 4, 5):**
   - Leave them blank

10. Click the **green checkmark** (✓) to save

11. You'll see confirmation: "Nameservers updated successfully"

**✅ Checkpoint:** Nameservers now show vercel-dns.com? Yes = Continue.

---

## Step 3.3: Wait for DNS Propagation

**What's happening:** The internet needs time to learn about your new domain. This is normal.

**Instructions:**

1. **Expected wait time:** 30-60 minutes (sometimes up to 24 hours)

2. **Go back to Vercel** → Settings → Domains

3. You'll see your domain with status:
   - 🟡 "Pending Verification" = Still waiting
   - 🟢 "Valid Configuration" = Ready!

4. **While you wait (good time to):**
   - ✅ Get coffee
   - ✅ Read Section 4 to prepare for next steps
   - ✅ Check status every 15 minutes

5. **Check propagation status (optional):**
   - Go to https://www.whatsmydns.net
   - Enter: `box45calculator.ca`
   - Select: **A** record
   - Click "Search"
   - Green checkmarks = propagating

**⏰ SET A TIMER for 1 hour and continue to Section 4 while waiting.**

---

# ✅ SECTION 4: ADD WWW SUBDOMAIN (5 minutes)

**Do this AFTER domain shows "Valid Configuration" in Vercel**

## Step 4.1: Add www Variant

**Instructions:**

1. Go to Vercel → Settings → Domains

2. In the input box, type: `www.box45calculator.ca`

3. Click **"Add"**

4. Vercel automatically configures it

5. **Set redirect preference:**
   - Vercel asks: "Redirect www to non-www?"
   - Select: **Yes** (cleaner URLs)

**✅ Checkpoint:** Both domains in Vercel now? Yes = Continue.

---

# ✅ SECTION 5: VERIFY DOMAIN WORKS (10 minutes)

## Step 5.1: Test Live Domain

**Instructions:**

1. **Open NEW incognito/private browser window**
   - Chrome: Ctrl+Shift+N (PC) or Cmd+Shift+N (Mac)
   - Safari: File → New Private Window

2. Go to: `https://box45calculator.ca`

3. **✅ Success looks like:**
   - Calculator loads
   - URL shows 🔒 padlock (secure)
   - No errors

4. **Test these URLs too:**
   - `http://box45calculator.ca` → should redirect to https
   - `www.box45calculator.ca` → should redirect to non-www
   - `https://www.box45calculator.ca` → should redirect

**✅ Checkpoint:** All URLs work and redirect properly? Yes = Continue.

---

## Step 5.2: Test Calculator Functionality

**Instructions:**

1. On https://box45calculator.ca, test each code:

   **Code 1:**
   - Dental offered: No
   - Expected result: Code 1
   - Click "Determine Code"
   - ✅ Shows Code 1?

   **Code 2:**
   - Dental offered: Yes
   - Spouse: No
   - Children: No
   - Expected: Code 2
   - ✅ Shows Code 2?

   **Code 3:**
   - Dental offered: Yes
   - Spouse: Yes
   - Children: Yes
   - Expected: Code 3
   - ✅ Shows Code 3?

   **Code 4:**
   - Dental offered: Yes
   - Spouse: Yes
   - Children: No
   - Expected: Code 4
   - ✅ Shows Code 4?

   **Code 5:**
   - Dental offered: Yes
   - Spouse: No
   - Children: Yes
   - Expected: Code 5
   - ✅ Shows Code 5?

2. **Test PDF download:**
   - After determining a code
   - Click "Download Audit Record"
   - ✅ PDF downloads?
   - ✅ Open PDF - looks professional?

3. **Test on mobile:**
   - Visit https://box45calculator.ca on your phone
   - ✅ Looks good?
   - ✅ Works correctly?

**✅ Checkpoint:** Everything works on desktop and mobile? Yes = Continue.

**📸 Take screenshot of successful test and save it.**

---

# ✅ SECTION 6: ENABLE STRIPE PAYMENTS (30 minutes)

**IMPORTANT:** Only do this section when boss says "enable payments now"

## Step 6.1: Get Stripe Test Key

**Instructions:**

1. Ask boss: "Do you have Stripe account credentials?"

2. **If YES:**
   - Get login info from boss
   - Go to https://dashboard.stripe.com
   - Sign in

3. **If NO:**
   - **STOP** - Boss needs to create Stripe account first
   - Wait for boss to complete Stripe signup
   - Then continue

4. Once logged into Stripe:
   - Click "Developers" (top right)
   - Click "API keys"
   - You'll see two types:
     - Publishable key (starts with `pk_`)
     - Secret key (starts with `sk_`)

5. **Get TEST mode key first:**
   - Toggle to "Test mode" (top right switch)
   - Find "Secret key"
   - Click "Reveal test key"
   - Copy the key (starts with `sk_test_`)
   - **Save it somewhere safe temporarily**

**✅ Checkpoint:** You have the test key that starts with `sk_test_`? Yes = Continue.

---

## Step 6.2: Add Stripe Key to Vercel

**Instructions:**

1. Go to Vercel dashboard

2. Click your **box45calculator** project

3. Click **"Settings"** tab

4. Click **"Environment Variables"** (left sidebar)

5. Click **"Add New"**

6. **Fill in:**
   - Name: `STRIPE_SECRET_KEY`
   - Value: [paste your `sk_test_` key from Step 6.1]
   - Environments: Check ✅ Production, ✅ Preview, ✅ Development

7. Click **"Save"**

8. Vercel will ask to redeploy
   - Click **"Redeploy"**
   - Wait for deployment to complete (~1 min)

**✅ Checkpoint:** Environment variable saved and deployed? Yes = Continue.

---

## Step 6.3: Enable Payments in Code

**Instructions:**

1. Go to your GitHub repository
   - Visit https://github.com/YOUR_USERNAME/box45calculator

2. Navigate to: `src/App.jsx`
   - Click "src" folder
   - Click "App.jsx"

3. Click the **pencil icon** (Edit this file)

4. **Find line ~79** (press Ctrl+F or Cmd+F)
   - Search for: `PAYMENT_ENABLED = false`

5. **Change this line:**
   - FROM: `const PAYMENT_ENABLED = false;`
   - TO: `const PAYMENT_ENABLED = true;`

6. Scroll to bottom

7. **Commit changes:**
   - Commit message: "Enable Stripe payments"
   - Click "Commit changes"

8. **Vercel auto-deploys:**
   - Go to Vercel dashboard
   - Watch for deployment to complete
   - Takes ~1-2 minutes

**✅ Checkpoint:** Deployment successful? Yes = Continue.

---

## Step 6.4: Test Payment Flow

**Instructions:**

1. Go to https://box45calculator.ca

2. Complete the calculator (any code)

3. Click **"Proceed to Checkout - $9 CAD"**

4. **You'll be redirected to Stripe:**
   - You should see Stripe checkout page
   - Product: "T4 Box 45 Compliance Memorandum - Code X"
   - Price: $9.00 CAD

5. **Enter test card:**
   - Card number: `4242 4242 4242 4242`
   - Expiry: Any future date (e.g., `12/30`)
   - CVC: Any 3 digits (e.g., `123`)
   - Name: Your name
   - Email: Your email

6. Click **"Pay"**

7. **You'll be redirected back:**
   - Should return to box45calculator.ca
   - Should see success message
   - Download button should turn green

8. Click **"Download"**
   - ✅ PDF downloads?

9. **Verify payment in Stripe:**
   - Go to Stripe dashboard
   - Click "Payments"
   - ✅ See $9.00 test payment?

**✅ Checkpoint:** Test payment worked end-to-end? Yes = Continue.

**📸 Take screenshot of successful payment and save it.**

---

## Step 6.5: Switch to Live Mode (ONLY when ready for real money)

**⚠️ IMPORTANT:** Only do this when boss says "go live with real payments"

**Instructions:**

1. In Stripe dashboard:
   - Toggle from "Test mode" to "Live mode" (top right)

2. Go to Developers → API keys

3. Find "Secret key" in LIVE mode
   - Click "Reveal live key"
   - Copy the key (starts with `sk_live_`)

4. Go to Vercel → Settings → Environment Variables

5. Find `STRIPE_SECRET_KEY`
   - Click the 3 dots (•••)
   - Click "Edit"

6. **Replace the value:**
   - Remove old test key
   - Paste new live key (`sk_live_...`)
   - Click "Save"

7. Redeploy from Vercel dashboard

8. **Test with REAL card** (will charge $9):
   - Go to box45calculator.ca
   - Complete calculator
   - Use REAL credit card
   - Verify money appears in Stripe

**✅ Checkpoint:** Real payments working? Yes = Done!

---

# ✅ SECTION 7: FINAL VERIFICATION (15 minutes)

## Step 7.1: Complete Testing Checklist

**Instructions:**

Go through this list and check each item:

**Domain & Deployment:**
- [ ] https://box45calculator.ca loads
- [ ] Shows 🔒 secure padlock
- [ ] www.box45calculator.ca redirects correctly
- [ ] Works on desktop
- [ ] Works on mobile phone
- [ ] Works on tablet (if available)

**Calculator Functionality:**
- [ ] Code 1 works (no dental)
- [ ] Code 2 works (employee only)
- [ ] Code 3 works (spouse + children)
- [ ] Code 4 works (spouse only)
- [ ] Code 5 works (children only)
- [ ] PDF downloads successfully
- [ ] PDF looks professional when opened

**Payments (if enabled):**
- [ ] "Proceed to Checkout" button shows
- [ ] Redirects to Stripe correctly
- [ ] Test payment works (if test mode)
- [ ] Returns to site after payment
- [ ] PDF downloads after payment
- [ ] Payment shows in Stripe dashboard

**Seasonal Features:**
- [ ] If date is Jan 15 - March 15: Deadline banner shows
- [ ] If date is outside that range: No banner
- [ ] Countdown timer updates

**Browser Testing:**
- [ ] Works in Chrome
- [ ] Works in Safari (Mac) or Edge (PC)
- [ ] Works in mobile browser

**✅ Checkpoint:** All items checked? Yes = Continue to final step.

---

## Step 7.2: Document Everything

**Instructions:**

Create a document (Word, Google Docs, or text file) with:

1. **Login Credentials:**
   ```
   GitHub:
   - URL: github.com/YOUR_USERNAME/box45calculator
   - Username: [YOUR_USERNAME]
   - Password: [SAVED IN PASSWORD MANAGER]

   Vercel:
   - URL: vercel.com/dashboard
   - Logged in via GitHub

   Namecheap:
   - URL: namecheap.com
   - Username: [EMAIL_USED]
   - Password: [SAVED IN PASSWORD MANAGER]

   Stripe:
   - URL: dashboard.stripe.com
   - Username: [EMAIL_USED]
   - Password: [SAVED IN PASSWORD MANAGER]
   ```

2. **Important URLs:**
   ```
   Live Site: https://box45calculator.ca
   Vercel URL: https://box45calculator.vercel.app
   GitHub Repo: https://github.com/YOUR_USERNAME/box45calculator
   ```

3. **Payment Status:**
   ```
   Stripe Mode: [Test / Live]
   Last Test Date: [TODAY'S DATE]
   Test Payment ID: [FROM STRIPE DASHBOARD]
   ```

4. **Domain Info:**
   ```
   Domain: box45calculator.ca
   Registrar: Namecheap
   Renewal Date: [CHECK NAMECHEAP]
   Auto-Renew: [ON/OFF]
   ```

5. **Screenshots Taken:**
   - [ ] Successful deployment
   - [ ] Domain purchase confirmation
   - [ ] Working calculator
   - [ ] Successful payment test

**✅ Send this document to boss.**

---

# ✅ SECTION 8: DELIVERABLES FOR BOSS

## What to Send Boss

**Email Subject:** "Box45Calculator.ca - Launch Complete ✅"

**Email Body:**

```
Hi [Boss Name],

Box45Calculator.ca is now live and ready to accept customers! Here's what was completed:

✅ COMPLETED:
1. Website deployed to Vercel (auto-updates on code changes)
2. Domain box45calculator.ca purchased and connected
3. SSL certificate active (secure HTTPS)
4. Payment processing configured via Stripe
5. All 5 calculator codes tested and working
6. PDF generation tested and working
7. Mobile responsive - works on all devices

🔗 LIVE SITE:
https://box45calculator.ca

📊 ADMIN DASHBOARDS:
- Vercel (hosting): https://vercel.com/dashboard
- Stripe (payments): https://dashboard.stripe.com
- Namecheap (domain): https://namecheap.com/domains

💰 PAYMENT STATUS:
- Current mode: [Test / Live]
- Test payment successful: Yes
- Ready for real customers: [Yes/No]

📅 SEASONAL FEATURES:
- Deadline banner: Will auto-show Jan 15 - March 15
- Countdown timer: Active during filing season
- All conversion features: Enabled

📸 SCREENSHOTS:
[Attach all screenshots you took]

🔐 CREDENTIALS:
[Attach the credentials document you created]

NEXT STEPS:
1. Review the live site
2. Let me know when to switch Stripe from Test to Live mode
3. Ready to help with marketing when filing season starts

Let me know if you need anything else!

[Your Name]
```

---

# 🆘 TROUBLESHOOTING

## Problem: GitHub push failed

**Solution:**
```bash
# If you get authentication error:
# You need to set up a Personal Access Token
# Go to: github.com/settings/tokens
# Generate new token (classic)
# Use token as password when pushing
```

---

## Problem: Vercel deployment failed

**Solutions:**

1. Check Vercel build logs:
   - Vercel dashboard → Deployments
   - Click failed deployment
   - Read error message

2. Common fixes:
   - Missing dependencies: Vercel will auto-install
   - Build errors: Contact developer
   - Timeout: Retry deployment

---

## Problem: Domain not working after 24 hours

**Solution:**

1. Check nameservers in Namecheap:
   - Should show: ns1.vercel-dns.com, ns2.vercel-dns.com
   - If not: Re-enter them correctly

2. Check Vercel domain status:
   - Should show "Valid Configuration"
   - If not: Remove domain and re-add it

3. Clear browser cache:
   - Chrome: Settings → Privacy → Clear browsing data
   - Try different browser or incognito mode

---

## Problem: Payment not working

**Solutions:**

1. Check Stripe key in Vercel:
   - Must start with `sk_test_` or `sk_live_`
   - Must be in Environment Variables
   - Must redeploy after adding

2. Check PAYMENT_ENABLED:
   - In src/App.jsx
   - Must be `true` not `false`
   - Check GitHub to confirm

3. Check Stripe dashboard:
   - Make sure account is activated
   - Check if test mode toggle is correct
   - Look for error logs under Developers → Events

---

## Problem: PDF not downloading

**Solution:**

1. Check browser popup blocker:
   - Allow popups for box45calculator.ca
   - Try different browser

2. Test in incognito mode:
   - Eliminates extension issues

3. Check console for errors:
   - Right-click → Inspect → Console tab
   - Screenshot any errors
   - Send to developer

---

## Need More Help?

**Before contacting developer, collect:**
1. Screenshot of the error
2. What you were trying to do
3. Browser you're using
4. Whether it works on a different device
5. Any error messages (exact text)

**Contact:**
- Send info to boss
- Boss will coordinate with developer if needed

---

# ✅ COMPLETION CHECKLIST

**Before saying "I'm done":**

- [ ] Site is live at box45calculator.ca
- [ ] All 5 codes work correctly
- [ ] PDFs download successfully
- [ ] Domain has SSL (🔒 padlock)
- [ ] Payments work (test mode at minimum)
- [ ] Mobile site works
- [ ] All screenshots taken
- [ ] Credentials documented
- [ ] Email sent to boss with deliverables

**✅ ALL DONE? Congratulations! The site is live! 🎉**

---

**Total Time Spent:** _______ hours

**Any Issues Encountered?**
_________________________________
_________________________________
_________________________________

**Notes for Future Reference:**
_________________________________
_________________________________
_________________________________

---

*End of PA Instructions*
*Created: February 2026*
*For: Box45Calculator.ca Launch*
