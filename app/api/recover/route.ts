import { NextRequest, NextResponse } from 'next/server'
import * as bip39 from 'bip39'
import { HDNodeWallet, Mnemonic } from 'ethers'

export async function POST(request: NextRequest) {
  try {
    const { seedPhrase, targetAddress, mode, minBalance, derivationRange } = await request.json()

    // Validate input
    if (!seedPhrase || seedPhrase.trim() === '') {
      return NextResponse.json(
        { success: false, error: 'Seed phrase is required' },
        { status: 400 }
      )
    }

    // Parse seed phrase and find missing positions
    const words = seedPhrase.trim().split(/\s+/)
    const missingPositions: number[] = []
    const knownWords: (string | null)[] = []
    
    words.forEach((word, index) => {
      if (word === '_' || word === 'UNKNOWN') {
        missingPositions.push(index)
        knownWords.push(null)
      } else {
        knownWords.push(word.toLowerCase())
      }
    })

    const missingCount = missingPositions.length

    if (missingCount === 0) {
      return NextResponse.json(
        { success: false, error: 'No missing words detected. Use _ for missing words.' },
        { status: 400 }
      )
    }

    if (missingCount > 3) {
      return NextResponse.json(
        { success: false, error: 'Too many missing words. Maximum 3 supported for reasonable recovery time.' },
        { status: 400 }
      )
    }

    // Get BIP39 wordlist
    const wordlist = bip39.wordlists.english
    const totalCombinations = Math.pow(2048, missingCount)

    // For demo/testing - limit attempts
    const maxAttempts = missingCount === 1 ? 2048 : missingCount === 2 ? 50000 : 10000
    let attempts = 0
    let found = false
    let result: any = null

    // Generate combinations and test
    const testCombination = async (indices: number[]): Promise<boolean> => {
      // Fill in missing words
      const testPhrase = [...knownWords]
      indices.forEach((wordIndex, pos) => {
        testPhrase[missingPositions[pos]] = wordlist[wordIndex]
      })

      const phraseString = testPhrase.join(' ')

      // Validate BIP39 checksum
      if (!bip39.validateMnemonic(phraseString)) {
        return false
      }

      // Derive wallet
      try {
        const mnemonic = Mnemonic.fromPhrase(phraseString)
        const hdNode = HDNodeWallet.fromMnemonic(mnemonic, "m/44'/60'/0'/0/0")
        const derivedAddress = hdNode.address

        // Check if matches target (case insensitive)
        if (mode === 'target' && targetAddress) {
          if (derivedAddress.toLowerCase() === targetAddress.toLowerCase()) {
            result = {
              success: true,
              recoveredSeed: phraseString,
              walletAddress: derivedAddress,
              derivationPath: "m/44'/60'/0'/0/0",
              missingWords: missingCount,
              attempts: attempts
            }
            return true
          }
        } else if (mode === 'balance') {
          // For balance mode, just return first valid seed
          // In production, you'd check actual blockchain balance here
          result = {
            success: true,
            recoveredSeed: phraseString,
            walletAddress: derivedAddress,
            derivationPath: "m/44'/60'/0'/0/0",
            missingWords: missingCount,
            attempts: attempts
          }
          return true
        }
      } catch (e) {
        // Invalid derivation, continue
      }

      return false
    }

    // Brute force recovery
    const recover = async (): Promise<void> => {
      if (missingCount === 1) {
        for (let i = 0; i < 2048 && attempts < maxAttempts; i++) {
          attempts++
          if (await testCombination([i])) {
            found = true
            break
          }
        }
      } else if (missingCount === 2) {
        for (let i = 0; i < 2048 && attempts < maxAttempts && !found; i++) {
          for (let j = 0; j < 2048 && attempts < maxAttempts; j++) {
            attempts++
            if (await testCombination([i, j])) {
              found = true
              break
            }
          }
        }
      } else if (missingCount === 3) {
        // For 3 missing words, only do limited search
        for (let i = 0; i < 20 && attempts < maxAttempts && !found; i++) {
          for (let j = 0; j < 20 && attempts < maxAttempts && !found; j++) {
            for (let k = 0; k < 20 && attempts < maxAttempts; k++) {
              attempts++
              if (await testCombination([i, j, k])) {
                found = true
                break
              }
            }
          }
        }
      }
    }

    await recover()

    if (found && result) {
      // Calculate fee
      const baseFee = missingCount === 1 ? 3 : missingCount === 2 ? 5 : missingCount === 3 ? 10 : 15
      const discount = mode === 'target' ? 2 : 0
      result.fee = Math.max(baseFee - discount, 1)
      
      return NextResponse.json(result)
    }

    return NextResponse.json({
      success: false,
      error: `No match found after ${attempts} attempts. ${missingCount === 3 ? 'For 3+ missing words, recovery may take hours/days. Consider running offline recovery tool.' : 'Please verify your known words are correct.'}`
    })
    
  } catch (error: any) {
    console.error('Recovery error:', error)
    return NextResponse.json(
      { success: false, error: error.message || 'Recovery failed' },
      { status: 500 }
    )
  }
}
