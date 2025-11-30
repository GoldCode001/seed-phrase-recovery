# 🔥 HOW TO ADD YOUR PYTHON RECOVERY CODE

## Current Status

✅ **UI is 100% functional**  
✅ **API endpoint is set up**  
✅ **Success/error handling works**  
⚠️ **Recovery logic is FAKE (returns mock data)**

---

## Where To Add Your Code

Open: `app/api/recover/route.ts`

Look for this section (around line 26):

```typescript
// ============================================================
// YOUR CODE GOES HERE
// ============================================================
```

---

## Option 1: Call Your Python Script Directly

Replace the mock code with this:

```typescript
const { exec } = require('child_process')
const { promisify } = require('util')
const execAsync = promisify(exec)

// For Target Address Mode
if (mode === 'target') {
  const command = `python3 your_target_recovery.py "${seedPhrase}" "${targetAddress}" "${derivationRange}"`
  const { stdout } = await execAsync(command)
  const result = JSON.parse(stdout)
  
  return NextResponse.json(result)
}

// For Balance Discovery Mode
else {
  const command = `python3 your_balance_recovery.py "${seedPhrase}" "${minBalance}"`
  const { stdout } = await execAsync(command)
  const result = JSON.parse(stdout)
  
  return NextResponse.json(result)
}
```

### Your Python Script Should Output JSON:

```python
import json
import sys

# Your recovery logic here
recovered_seed = "word1 word2 found3 word4 found5..."
wallet_address = "0x742d35..."
derivation_path = "m/44'/60'/0'/0/0"

# Output result as JSON
result = {
    "success": True,
    "recoveredSeed": recovered_seed,
    "walletAddress": wallet_address,
    "derivationPath": derivation_path,
    "missingWords": 2,
    "fee": 5
}

print(json.dumps(result))
```

---

## Option 2: Use Flask API (Separate Service)

### Step 1: Create Flask API (`flask_api.py`):

```python
from flask import Flask, request, jsonify
from flask_cors import CORS
import your_recovery_module  # Your existing recovery code

app = Flask(__name__)
CORS(app)

@app.route('/recover', methods=['POST'])
def recover():
    data = request.json
    
    seed_phrase = data['seedPhrase']
    target_address = data.get('targetAddress')
    mode = data['mode']
    
    # Call your recovery function
    if mode == 'target':
        result = your_recovery_module.recover_target(seed_phrase, target_address)
    else:
        result = your_recovery_module.recover_balance(seed_phrase, data.get('minBalance'))
    
    return jsonify(result)

if __name__ == '__main__':
    app.run(port=5000)
```

### Step 2: Update `app/api/recover/route.ts`:

```typescript
// Replace the mock code section with:
const response = await fetch('http://localhost:5000/recover', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    seedPhrase,
    targetAddress,
    mode,
    minBalance,
    derivationRange
  })
})

const result = await response.json()
return NextResponse.json(result)
```

### Step 3: Run Flask:

```bash
# Terminal 1: Run Flask
python flask_api.py

# Terminal 2: Run Next.js
npm run dev
```

---

## What The App Does Now (With Mock Data)

1. ✅ User enters seed with missing words
2. ✅ User clicks "Start Recovery"
3. ✅ Progress bar animates
4. ✅ Shows success message with:
   - Wallet address
   - Derivation path
   - Fee amount
   - Payment instructions
5. ✅ Shows error if something fails

**All you need to do is replace the mock recovery with YOUR real Python code!**

---

## Testing

### Test with mock data first:
1. Open http://localhost:3000
2. Enter: `word1 word2 _ word4 _ word6 word7 word8 word9 word10 word11 word12`
3. Enter target address (any address)
4. Click "Start Recovery"
5. You should see success message with mock data

### Then add your real code:
1. Replace mock section in `app/api/recover/route.ts`
2. Test with real seed phrases
3. Verify recovery works
4. Deploy!

---

## Questions?

- **Where's my Python code?** → Put it in the project root or create a `/scripts` folder
- **How do I test?** → Use the mock data first, then swap in real code
- **What if it breaks?** → Check terminal for errors, verify Python outputs valid JSON

---

**Bottom Line:** The app is READY. Just plug in your Python recovery logic and it's live! 🚀
