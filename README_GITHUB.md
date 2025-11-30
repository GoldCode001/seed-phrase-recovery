# 🔐 BIP39 Seed Phrase Recovery Tool

Professional cryptocurrency wallet seed phrase recovery service with a beautiful, secure, client-side interface.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-16.0-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)

## 🌟 Features

- ✅ **Client-Side Recovery** - All processing happens in your browser
- ✅ **Zero Data Storage** - Nothing stored, logged, or transmitted
- ✅ **Universal** - Works on Windows, Mac, Linux, mobile browsers
- ✅ **Open Source** - Verify the code yourself
- ✅ **Professional UI** - Clean, modern, glassmorphism design
- ✅ **Dual Recovery Modes** - Target address (fast) or balance discovery
- ✅ **Fair Pricing** - Success-only fee model (3-15%)
- ✅ **BIP39 Compliant** - Standard derivation paths

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/GoldCode001/seed-phrase-recovery.git
cd seed-phrase-recovery

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔒 Security First

### This tool is designed with security in mind:

- **Client-side only** - Recovery happens entirely in your browser
- **No backend storage** - Your seed phrase never touches any server
- **No logging** - Nothing is recorded or transmitted
- **Open source** - You can audit every line of code
- **Offline capable** - Download and run without internet

### ⚠️ CRITICAL SECURITY WARNING

**After successful recovery, IMMEDIATELY:**
1. Transfer ALL funds to a NEW wallet
2. Create a FRESH seed phrase
3. NEVER reuse the recovered seed phrase

A recovered seed phrase should be considered compromised.

## 🎯 How It Works

### Target Address Mode (Fast)
1. Enter your partial seed phrase (use `_` for missing words)
2. Enter your known wallet address
3. Click "Start Recovery"
4. System brute-forces missing words cryptographically
5. Matches against your target address

### Balance Discovery Mode
1. Enter your partial seed phrase
2. System searches for wallets with balance
3. Checks multiple derivation paths
4. Returns active wallets found

## 💎 Pricing

| Missing Words | Base Fee | Target Mode | Balance Mode |
|--------------|----------|-------------|--------------|
| 1 word       | 3%       | 1%          | 3%           |
| 2 words      | 5%       | 3%          | 5%           |
| 3 words      | 10%      | 8%          | 10%          |
| 4+ words     | 15%      | 13%         | 15%          |

**No recovery, no fee** - You only pay when we successfully recover your wallet.

## 🛠️ Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **Crypto:** bip39, ethers.js
- **UI:** Glassmorphism, gradient effects

## 📦 Project Structure

```
seed-phrase-recovery/
├── app/
│   ├── api/
│   │   └── recover/
│   │       └── route.ts          # Recovery API endpoint
│   ├── page.tsx                   # Main UI
│   ├── layout.tsx                 # App layout
│   └── globals.css                # Styles
├── public/                        # Static assets
├── package.json                   # Dependencies
└── README.md                      # This file
```

## 🚢 Deployment

### Vercel (Recommended)

```bash
npm install -g vercel
vercel login
vercel deploy
```

### Other Platforms

Works on any platform that supports Next.js:
- Netlify
- Railway
- AWS Amplify
- DigitalOcean App Platform
- Any VPS with Node.js

### Build for Production

```bash
npm run build
npm start
```

## 🧪 Testing

Test with the BIP39 standard test vector:

- **Seed:** `abandon abandon abandon abandon abandon _ abandon abandon abandon abandon abandon about`
- **Target:** `0x9858EfFD232B4033E47d90003D41EC34EcaEda94`
- **Missing word:** `abandon` (position 6)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ⚠️ Disclaimer

This tool is provided as-is for educational and recovery purposes. Users are responsible for:
- Verifying the security of their environment
- Safely handling recovered seed phrases
- Moving funds immediately after recovery
- Never reusing recovered seeds

The developer is not responsible for:
- Lost funds due to misuse
- Compromised security from improper use
- Any damages arising from use of this tool

## 💝 Support

If this tool helped you recover your funds, consider supporting development:

**ETH/BSC/Polygon/Arbitrum:** `0x47fb8de65435c89fc6252a35dc82e7cb5a391b79`

## 📞 Contact

Built by Goldman - Web3 Recovery Specialist

For support or inquiries, please open an issue on GitHub.

---

**Remember:** Always transfer recovered funds to a NEW wallet immediately. Never reuse a recovered seed phrase!
