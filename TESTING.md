# 🧪 Testing Guide

## Manual Testing Checklist

### ✅ Calculator Logic

Test all 5 code scenarios:

**Code 1: No dental benefits**
- [ ] Select "No dental offered"
- [ ] Click "Determine Code"
- [ ] Verify result shows **Code 1**
- [ ] PDF downloads with "No dental benefits offered"

**Code 2: Employee only**
- [ ] Select "Yes, we offered dental"
- [ ] Spouse eligible: **No**
- [ ] Children eligible: **No**
- [ ] Verify result shows **Code 2**
- [ ] PDF shows "Employee only coverage"

**Code 3: Spouse & children**
- [ ] Select "Yes, we offered dental"
- [ ] Spouse eligible: **Yes**
- [ ] Children eligible: **Yes**
- [ ] Verify result shows **Code 3**
- [ ] PDF shows "Spouse & children eligible"

**Code 4: Spouse only**
- [ ] Select "Yes, we offered dental"
- [ ] Spouse eligible: **Yes**
- [ ] Children eligible: **No**
- [ ] Verify result shows **Code 4**
- [ ] PDF shows "Spouse only eligible"

**Code 5: Children only**
- [ ] Select "Yes, we offered dental"
- [ ] Spouse eligible: **No**
- [ ] Children eligible: **Yes**
- [ ] Verify result shows **Code 5**
- [ ] PDF shows "Children only eligible"

### ✅ PDF Generation

For each code:
- [ ] PDF downloads successfully
- [ ] Employer name appears correctly
- [ ] All inputs are recorded
- [ ] Code and description are correct
- [ ] Timestamp is present
- [ ] Record ID is unique
- [ ] Legal disclaimer is included
- [ ] PDF is properly formatted

### ✅ UI/UX Testing

**Form Behavior**
- [ ] Employer name field accepts input
- [ ] Radio buttons work correctly
- [ ] Conditional questions appear when "Yes" is selected
- [ ] Conditional questions hide when switching to "No"
- [ ] Calculate button is disabled until all questions answered
- [ ] Calculate button is enabled when ready
- [ ] Result view displays correctly
- [ ] Reset button clears all fields and returns to form

**Visual Polish**
- [ ] Fade-in animations work smoothly
- [ ] Button hover states work
- [ ] Focus states on input field work
- [ ] Warning banner displays correctly
- [ ] Result badge has correct color per code
- [ ] Footer links work

**Responsive Design**
- [ ] Test on mobile (320px width)
- [ ] Test on tablet (768px width)
- [ ] Test on desktop (1920px width)
- [ ] All elements are readable
- [ ] No horizontal scrolling

### ✅ Embed Mode

- [ ] Add `?embed=true` to URL
- [ ] Header is hidden
- [ ] Footer is hidden
- [ ] Padding is reduced
- [ ] Calculator still functions correctly
- [ ] PDF download still works

### ✅ Stripe Payment Flow (When Enabled)

**Test Mode Setup**
1. Set `PAYMENT_ENABLED = true` in App.jsx
2. Add Stripe test key to environment variables
3. Restart dev server

**Payment Testing**
- [ ] Click download button
- [ ] Redirects to Stripe Checkout
- [ ] Product name shows correct code
- [ ] Price shows $9.00 CAD
- [ ] Enter test card: `4242 4242 4242 4242`
- [ ] Any future expiry, any CVC
- [ ] Click "Pay"
- [ ] Redirects back to calculator
- [ ] Shows payment success message
- [ ] PDF download button changes to green
- [ ] Click download button
- [ ] PDF downloads successfully

**Test Cards**

| Card Number | Scenario |
|-------------|----------|
| `4242 4242 4242 4242` | Success |
| `4000 0000 0000 9995` | Declined |
| `4000 0025 0000 3155` | Requires authentication |

**Payment Cancellation**
- [ ] Start checkout
- [ ] Click "Back" or close tab
- [ ] Calculator still works
- [ ] Can try payment again

### ✅ Error Handling

**Browser Console**
- [ ] No JavaScript errors
- [ ] No React warnings
- [ ] No 404s for assets

**Network**
- [ ] All API calls succeed (if payments enabled)
- [ ] Proper error messages if API fails
- [ ] Graceful degradation if network is slow

**Edge Cases**
- [ ] Very long employer names (100+ chars)
- [ ] Empty employer name
- [ ] Special characters in employer name
- [ ] Multiple rapid clicks on buttons
- [ ] Browser back/forward buttons
- [ ] Page refresh during calculation

### ✅ Cross-Browser Testing

Test in:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Mobile Chrome (Android)

### ✅ Performance

- [ ] Page loads in < 2 seconds
- [ ] PDF generates in < 1 second
- [ ] No layout shift on load
- [ ] Smooth animations (60fps)
- [ ] Small bundle size (check Vercel analytics)

### ✅ Accessibility

- [ ] All buttons have clear labels
- [ ] Form inputs are keyboard accessible
- [ ] Tab order makes sense
- [ ] Color contrast passes WCAG AA
- [ ] Screen reader friendly (test with VoiceOver/NVDA)

## 🤖 Automated Testing (Future)

Consider adding:
```bash
npm install -D vitest @testing-library/react
```

Example test structure:
```javascript
// src/__tests__/App.test.jsx
describe('T4 Calculator', () => {
  test('determines Code 1 for no dental', () => {
    // Test implementation
  });

  test('generates PDF with correct data', () => {
    // Test implementation
  });
});
```

## 🐛 Bug Reporting

If you find issues:
1. Note the browser and OS
2. Take a screenshot
3. Check browser console for errors
4. Note steps to reproduce
5. Create an issue or email support@justicestack.ca

---

**Testing is shipping!** ✨
