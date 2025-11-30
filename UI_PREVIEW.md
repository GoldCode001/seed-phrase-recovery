# 🎨 UI PREVIEW

## What The App Looks Like

### Color Scheme
- **Background:** Deep dark blue/purple gradient (#060913 → #0a0e1a)
- **Cards:** Glassmorphism effect (frosted glass with blur)
- **Accents:** Purple (#8b5cf6) and Blue (#3b82f6) gradients
- **Text:** White with various opacities for hierarchy

### Main Components

#### 1. Header
```
╔═══════════════════════════════════════════╗
║                                           ║
║      🔐 Seed Phrase Recovery              ║
║   Professional wallet recovery service    ║
║        • No recovery, no fee •            ║
║                                           ║
╚═══════════════════════════════════════════╝
```

#### 2. Mode Toggle (Center)
```
╔════════════════════════════════════════╗
║  [ 🎯 Target Address Mode ]            ║
║  [💰 Balance Discovery Mode ]           ║
╚════════════════════════════════════════╝
```
*Glassmorphic card with active mode highlighted in gradient*

#### 3. Main Recovery Card
```
╔═══════════════════════════════════════════════════╗
║  ⚡ Fast Recovery                                  ║
║  Know your wallet address? This mode is blazing   ║
║  fast and doesn't require blockchain queries.     ║
║                                                   ║
║  Seed Phrase (use _ for missing words)           ║
║  ┌─────────────────────────────────────────────┐ ║
║  │ word1 word2 _ word4 _ word6 word7 word8 .. │ ║
║  └─────────────────────────────────────────────┘ ║
║  Missing words: 2  |  Success fee: 3%            ║
║                                                   ║
║  Target Wallet Address                           ║
║  ┌─────────────────────────────────────────────┐ ║
║  │ 0x742d35Cc6...                              │ ║
║  └─────────────────────────────────────────────┘ ║
║                                                   ║
║  [ ━━━━━━━━━━━━━━━━━━━━━━━━ ] 45%              ║
║                                                   ║
║  ┌─────────────────────────────────────────────┐ ║
║  │         🚀 Start Recovery                   │ ║
║  └─────────────────────────────────────────────┘ ║
║                                                   ║
║  🔒 Security: All computations run locally       ║
╚═══════════════════════════════════════════════════╝
```

#### 4. Pricing Display
```
╔═══════════════════════════════════════════╗
║          💎 Fair Pricing                  ║
║                                           ║
║  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐     ║
║  │  3%  │ │  5%  │ │ 10%  │ │ 15%  │     ║
║  │1 word│ │2 words│ │3 words│ │4+ words│  ║
║  └──────┘ └──────┘ └──────┘ └──────┘     ║
║                                           ║
║  🎯 Target Address: -2% discount          ║
╚═══════════════════════════════════════════╝
```

#### 5. Support Section
```
╔═══════════════════════════════════════════╗
║       💝 Support This Project             ║
║   This tool saved your funds? Consider    ║
║       supporting development              ║
║                                           ║
║  ┌─────────────┐  ┌─────────────┐        ║
║  │     ETH     │  │     BTC     │        ║
║  │ 0x742d35... │  │  bc1q...    │        ║
║  └─────────────┘  └─────────────┘        ║
╚═══════════════════════════════════════════╝
```

### Visual Effects

#### Glassmorphism
- Semi-transparent white backgrounds (white/5)
- Backdrop blur for frosted glass effect
- Subtle borders (white/10)
- Rounded corners (rounded-2xl)

#### Gradients
- Purple to purple gradient for buttons
- Radial gradient orbs in background (animated pulse)
- Text gradient for headlines

#### Animations
- Smooth transitions on all interactions
- Pulsing gradient orbs in background
- Progress bar fills with gradient
- Buttons scale on hover (1.05x)
- Shadow intensifies on hover

#### Interactive States
- **Hover:** Buttons scale up, shadow glows
- **Active:** Mode toggle highlights with gradient
- **Processing:** Progress bar animates
- **Disabled:** Opacity 50%, cursor not-allowed

### Typography
- **Headers:** Bold, 5xl size, gradient text
- **Body:** Regular, gray-400 for secondary text
- **Monospace:** For seed phrases and addresses (JetBrains Mono)
- **Sans:** For everything else (Inter)

### Responsive Design
- Mobile: Single column, full width cards
- Tablet: Same layout, better spacing
- Desktop: Centered with max-width constraint

### Dark Mode Only
- Designed exclusively for dark mode
- High contrast for readability
- Purple/blue accents pop against dark background

---

## Key Design Principles

1. **Professional:** Clean, modern, trustworthy
2. **Crypto-native:** Dark theme, gradients, tech aesthetic
3. **Minimal:** No clutter, clear hierarchy
4. **Smooth:** Buttery animations, polished interactions
5. **Secure:** Visual cues reinforce security (locks, warnings)

---

This is a **production-ready, premium UI** that looks like a professional SaaS product! 🚀
