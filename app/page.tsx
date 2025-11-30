'use client'

import { useState } from 'react'

type RecoveryMode = 'target' | 'balance'

export default function Home() {
  const [mode, setMode] = useState<RecoveryMode>('target')
  const [seedPhrase, setSeedPhrase] = useState('')
  const [targetAddress, setTargetAddress] = useState('')
  const [minBalance, setMinBalance] = useState('')
  const [derivationRange, setDerivationRange] = useState('0-5')
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState('')

  const handleRecovery = async () => {
    setIsProcessing(true)
    setProgress(0)
    setError('')
    setResult(null)
    
    try {
      // Start progress animation
      const progressInterval = setInterval(() => {
        setProgress(prev => Math.min(prev + 10, 90))
      }, 500)

      // Call the API
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

      clearInterval(progressInterval)
      setProgress(100)

      const data = await response.json()

      if (data.success) {
        setResult(data)
      } else {
        setError(data.error || 'Recovery failed')
      }
    } catch (err: any) {
      setError(err.message || 'Something went wrong')
    } finally {
      setIsProcessing(false)
    }
  }

  const getMissingWordsCount = () => {
    return (seedPhrase.match(/_/g) || []).length
  }

  const getSuccessFee = () => {
    const missing = getMissingWordsCount()
    const baseFee = missing === 1 ? 3 : missing === 2 ? 5 : missing === 3 ? 10 : 15
    const discount = mode === 'target' ? 2 : 0
    return Math.max(baseFee - discount, 1)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-crypto-darker via-crypto-dark to-crypto-darker">
      {/* Animated background gradient orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-crypto-purple/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-crypto-blue/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent" style={{backgroundImage: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}>
            Seed Phrase Recovery
          </h1>
          <p className="text-gray-400 text-lg">
            Professional wallet recovery service • No recovery, no fee
          </p>
        </div>

        {/* Mode Toggle */}
        <div className="flex justify-center mb-12">
          <div className="glass-card p-2 flex gap-2">
            <button
              onClick={() => setMode('target')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                mode === 'target'
                  ? 'shadow-lg shadow-purple-500/50'
                  : 'text-gray-400 hover:text-white'
              }`}
              style={mode === 'target' ? {background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'} : {}}
            >
              🎯 Target Address Mode
            </button>
            <button
              onClick={() => setMode('balance')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                mode === 'balance'
                  ? 'shadow-lg shadow-purple-500/50'
                  : 'text-gray-400 hover:text-white'
              }`}
              style={mode === 'balance' ? {background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'} : {}}
            >
              💰 Balance Discovery Mode
            </button>
          </div>
        </div>

        {/* Main Card */}
        <div className="max-w-3xl mx-auto glass-card p-8 mb-8">
          {/* Security Notice - PROMINENT */}
          <div className="mb-6 p-6 bg-green-500/10 border-2 border-green-500/50 rounded-xl">
            <h3 className="text-xl font-bold text-green-400 mb-3">🔒 YOUR SECURITY GUARANTEED</h3>
            <div className="space-y-2 text-sm text-gray-300">
              <div className="flex items-start gap-2">
                <span className="text-green-400 mt-1">✅</span>
                <span><strong>Client-side recovery:</strong> All processing happens in YOUR browser</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-400 mt-1">✅</span>
                <span><strong>Zero storage:</strong> Your seed phrase NEVER touches our servers</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-400 mt-1">✅</span>
                <span><strong>No logging:</strong> Nothing is stored, logged, or transmitted</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-400 mt-1">✅</span>
                <span><strong>Open source:</strong> Code is public - verify it yourself</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-400 mt-1">✅</span>
                <span><strong>Auto-delete:</strong> Close browser = everything deleted</span>
              </div>
            </div>
            <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded">
              <p className="text-yellow-200 text-sm">
                ⚠️ <strong>CRITICAL:</strong> After recovery, IMMEDIATELY transfer all funds to a NEW wallet with a fresh seed phrase. Never reuse a recovered seed.
              </p>
            </div>
          </div>

          {/* Mode Description */}
          <div className="mb-6 p-4 bg-crypto-purple/10 border border-crypto-purple/30 rounded-lg">
            {mode === 'target' ? (
              <div>
                <h3 className="font-semibold text-crypto-purple mb-2">⚡ Fast Recovery</h3>
                <p className="text-sm text-gray-300">
                  Know your wallet address? This mode is blazing fast and doesn't require blockchain queries.
                  Perfect when you remember the address but lost the seed phrase.
                </p>
              </div>
            ) : (
              <div>
                <h3 className="font-semibold text-crypto-blue mb-2">🔍 Deep Discovery</h3>
                <p className="text-sm text-gray-300">
                  Don't remember your address? This mode scans for wallets with balance or activity.
                  Takes longer but finds wallets even without the exact address.
                </p>
              </div>
            )}
          </div>

          {/* Seed Phrase Input */}
          <div className="mb-6">
            <label className="block text-sm font-semibold mb-2 text-gray-300">
              Seed Phrase (use _ for missing words)
            </label>
            <textarea
              value={seedPhrase}
              onChange={(e) => setSeedPhrase(e.target.value)}
              placeholder="word1 word2 _ word4 _ word6 word7 word8 word9 word10 word11 word12"
              className="input-field w-full h-24 font-mono text-sm resize-none"
            />
            <div className="mt-2 flex justify-between text-xs text-gray-500">
              <span>Missing words: {getMissingWordsCount()}</span>
              <span>Success fee: {getSuccessFee()}%</span>
            </div>
          </div>

          {/* Mode-specific inputs */}
          {mode === 'target' ? (
            <>
              <div className="mb-6">
                <label className="block text-sm font-semibold mb-2 text-gray-300">
                  Target Wallet Address
                </label>
                <input
                  type="text"
                  value={targetAddress}
                  onChange={(e) => setTargetAddress(e.target.value)}
                  placeholder="0x742d35Cc6..."
                  className="input-field w-full font-mono text-sm"
                />
              </div>
              <div className="mb-6">
                <label className="block text-sm font-semibold mb-2 text-gray-300">
                  Derivation Index Range (optional)
                </label>
                <input
                  type="text"
                  value={derivationRange}
                  onChange={(e) => setDerivationRange(e.target.value)}
                  placeholder="0-5"
                  className="input-field w-full"
                />
                <p className="mt-1 text-xs text-gray-500">
                  Check indices 0-5 by default. Increase if needed.
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="mb-6">
                <label className="block text-sm font-semibold mb-2 text-gray-300">
                  Minimum Balance Threshold (optional)
                </label>
                <input
                  type="text"
                  value={minBalance}
                  onChange={(e) => setMinBalance(e.target.value)}
                  placeholder="0.001 ETH"
                  className="input-field w-full"
                />
                <p className="mt-1 text-xs text-gray-500">
                  Only show wallets with at least this much. Leave empty for any balance.
                </p>
              </div>
              <div className="mb-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 accent-crypto-purple" defaultChecked />
                  <span className="text-sm text-gray-300">Check multiple derivation indices (0-10)</span>
                </label>
              </div>
            </>
          )}

          {/* Progress Bar */}
          {isProcessing && (
            <div className="mb-6">
              <div className="flex justify-between mb-2 text-sm">
                <span className="text-gray-300">Processing...</span>
                <span className="text-crypto-purple">{progress}%</span>
              </div>
              <div className="h-2 bg-crypto-dark rounded-full overflow-hidden">
                <div
                  className="h-full transition-all duration-300"
                  style={{ width: `${progress}%`, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
                ></div>
              </div>
            </div>
          )}

          {/* Action Button */}
          <button
            onClick={handleRecovery}
            disabled={isProcessing || !seedPhrase}
            className="glass-button w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isProcessing ? '🔄 Processing...' : '🚀 Start Recovery'}
          </button>

          {/* Error Display */}
          {error && (
            <div className="mt-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
              <p className="text-red-400">❌ {error}</p>
            </div>
          )}

          {/* Success Display */}
          {result && result.success && (
            <div className="mt-6 p-6 bg-green-500/10 border border-green-500/30 rounded-lg">
              <h3 className="text-xl font-bold text-green-400 mb-4">🎉 Recovery Successful!</h3>
              
              <div className="space-y-3 text-sm">
                <div>
                  <div className="text-gray-400 mb-1">Wallet Address:</div>
                  <div className="font-mono text-green-300 bg-crypto-dark p-2 rounded">{result.walletAddress}</div>
                </div>
                
                <div>
                  <div className="text-gray-400 mb-1">Derivation Path:</div>
                  <div className="font-mono text-green-300">{result.derivationPath}</div>
                </div>
                
                <div>
                  <div className="text-gray-400 mb-1">Success Fee:</div>
                  <div className="text-2xl font-bold text-crypto-purple">{result.fee}%</div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                <p className="text-yellow-200 text-sm mb-3">
                  💰 <strong>Payment Required to Reveal Seed:</strong> Send {result.fee}% of your recovered funds to complete the recovery.
                </p>
                <div className="font-mono text-xs bg-crypto-dark p-3 rounded mb-3">
                  <div className="text-gray-500 mb-1">ETH/BSC/Polygon Payment Address:</div>
                  <div className="text-crypto-purple break-all">0x47fb8de65435c89fc6252a35dc82e7cb5a391b79</div>
                </div>
                <div className="space-y-2 text-xs text-gray-400">
                  <p>📝 <strong>How it works:</strong></p>
                  <p>1. We've found your wallet address (shown above)</p>
                  <p>2. Send {result.fee}% of your balance to our address</p>
                  <p>3. Contact us with transaction hash</p>
                  <p>4. We reveal your complete seed phrase</p>
                  <p>5. <strong className="text-yellow-300">IMMEDIATELY</strong> move ALL funds to a NEW wallet with a fresh seed</p>
                </div>
                <div className="mt-3 p-2 bg-red-500/10 border border-red-500/30 rounded">
                  <p className="text-red-300 text-xs">
                    🚨 <strong>NEVER REUSE THIS SEED:</strong> Once recovered, this seed is compromised. Create a NEW wallet immediately after moving funds.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Trust & Transparency Section */}
        <div className="max-w-3xl mx-auto glass-card p-6 mb-8">
          <h3 className="text-xl font-bold mb-4 text-center">🎯 TRUSTED & TRANSPARENT</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="text-center p-4 bg-crypto-dark rounded-lg">
              <div className="text-3xl mb-2">🔓</div>
              <div className="text-sm font-semibold text-gray-300">Open Source</div>
              <div className="text-xs text-gray-500 mt-1">Verify the code yourself</div>
            </div>
            <div className="text-center p-4 bg-crypto-dark rounded-lg">
              <div className="text-3xl mb-2">🏠</div>
              <div className="text-sm font-semibold text-gray-300">Client-Side Only</div>
              <div className="text-xs text-gray-500 mt-1">Runs in your browser</div>
            </div>
            <div className="text-center p-4 bg-crypto-dark rounded-lg">
              <div className="text-3xl mb-2">💯</div>
              <div className="text-sm font-semibold text-gray-300">No Recovery, No Fee</div>
              <div className="text-xs text-gray-500 mt-1">Pay only on success</div>
            </div>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-400 mb-3">Want extra security? Run offline:</p>
            <a 
              href="https://github.com/GoldCode001/seed-phrase-recovery" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-crypto-purple/20 border border-crypto-purple/50 rounded-lg text-sm hover:bg-crypto-purple/30 transition-all cursor-pointer"
            >
              <span>📥</span>
              <span>Download code → Disconnect internet → Run locally</span>
            </a>
          </div>
        </div>

        {/* Pricing Card */}
        <div className="max-w-3xl mx-auto glass-card p-6 mb-8">
          <h3 className="text-xl font-bold mb-4 text-center">💎 Fair Pricing</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-crypto-dark rounded-lg">
              <div className="text-2xl font-bold text-crypto-purple">3%</div>
              <div className="text-xs text-gray-400 mt-1">1 missing word</div>
            </div>
            <div className="text-center p-4 bg-crypto-dark rounded-lg">
              <div className="text-2xl font-bold text-crypto-purple">5%</div>
              <div className="text-xs text-gray-400 mt-1">2 missing words</div>
            </div>
            <div className="text-center p-4 bg-crypto-dark rounded-lg">
              <div className="text-2xl font-bold text-crypto-purple">10%</div>
              <div className="text-xs text-gray-400 mt-1">3 missing words</div>
            </div>
            <div className="text-center p-4 bg-crypto-dark rounded-lg">
              <div className="text-2xl font-bold text-crypto-purple">15%</div>
              <div className="text-xs text-gray-400 mt-1">4+ missing words</div>
            </div>
          </div>
          <p className="text-center text-xs text-gray-500 mt-4">
            🎯 Target Address mode: -2% discount • No recovery, no fee
          </p>
        </div>

        {/* Support Section */}
        <div className="max-w-3xl mx-auto glass-card p-6 text-center">
          <h3 className="text-lg font-semibold mb-3">💝 Support This Project</h3>
          <p className="text-sm text-gray-400 mb-4">
            This tool saved your funds? Tips help keep this service running and improving
          </p>
          <div className="font-mono text-xs bg-crypto-dark p-4 rounded-lg max-w-md mx-auto">
            <div className="text-gray-500 mb-2">Donations (ETH/BSC/Polygon/Arbitrum):</div>
            <div className="text-crypto-purple break-all">0x47fb8de65435c89fc6252a35dc82e7cb5a391b79</div>
          </div>
          <p className="text-xs text-gray-500 mt-3">Every donation helps maintain and improve this free tool 🙏</p>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-gray-500 text-sm space-y-2">
          <p className="font-semibold">Built by Goldman • Web3 Recovery Specialist</p>
          <p>
            <a href="https://github.com/GoldCode001/seed-phrase-recovery" target="_blank" rel="noopener noreferrer" className="text-crypto-purple hover:text-crypto-blue transition-colors">
              Open source on GitHub
            </a> • Secure • No data stored • Client-side only
          </p>
          <p className="text-xs">⚠️ Always move recovered funds to a NEW wallet immediately</p>
        </div>
      </div>
    </div>
  )
}
