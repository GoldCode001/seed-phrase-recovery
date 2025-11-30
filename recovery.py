#!/usr/bin/env python3
"""
BIP39 Seed Phrase Recovery Script
Recovers missing words from a seed phrase
"""

import sys
import json
from mnemonic import Mnemonic
from web3 import Web3
from eth_account import Account
from itertools import product

# Enable unaudited HD wallet features
Account.enable_unaudited_hdwallet_features()

def recover_seed_phrase(known_phrase, target_address=None, mode="target"):
    """
    Recover missing words from a BIP39 seed phrase
    
    Args:
        known_phrase: List of words where None represents missing words
        target_address: Optional target wallet address to match
        mode: "target" or "balance" recovery mode
    
    Returns:
        dict with recovery result
    """
    mnemo = Mnemonic("english")
    wordlist = mnemo.wordlist
    
    # Find missing positions
    missing_positions = [i for i, word in enumerate(known_phrase) if word is None]
    missing_count = len(missing_positions)
    
    if missing_count == 0:
        return {
            "success": False,
            "error": "No missing words detected"
        }
    
    # Calculate total attempts
    total_attempts = len(wordlist) ** missing_count
    
    # Generate all combinations for missing words
    attempts = 0
    for combination in product(wordlist, repeat=missing_count):
        # Fill in missing words
        test_phrase = known_phrase.copy()
        for i, pos in enumerate(missing_positions):
            test_phrase[pos] = combination[i]
        
        phrase_str = " ".join(test_phrase)
        
        # Validate BIP39 checksum
        if not mnemo.check(phrase_str):
            attempts += 1
            continue
        
        # Derive wallet address
        try:
            account = Account.from_mnemonic(phrase_str, account_path="m/44'/60'/0'/0/0")
            derived_address = account.address
            
            # If target mode, check if it matches
            if mode == "target" and target_address:
                if derived_address.lower() == target_address.lower():
                    return {
                        "success": True,
                        "recoveredSeed": phrase_str,
                        "walletAddress": derived_address,
                        "derivationPath": "m/44'/60'/0'/0/0",
                        "missingWords": missing_count,
                        "attempts": attempts
                    }
            
            # If balance mode, check if wallet has activity (simplified)
            elif mode == "balance":
                # In real implementation, check blockchain balance here
                # For now, return first valid seed
                return {
                    "success": True,
                    "recoveredSeed": phrase_str,
                    "walletAddress": derived_address,
                    "derivationPath": "m/44'/60'/0'/0/0",
                    "missingWords": missing_count,
                    "attempts": attempts
                }
            
            attempts += 1
            
        except Exception as e:
            attempts += 1
            continue
    
    return {
        "success": False,
        "error": f"No matching wallet found after {attempts} attempts"
    }


if __name__ == "__main__":
    # Read input from command line args
    if len(sys.argv) < 3:
        print(json.dumps({
            "success": False,
            "error": "Usage: python recovery.py <seed_phrase> <target_address> <mode>"
        }))
        sys.exit(1)
    
    seed_input = sys.argv[1]
    target_addr = sys.argv[2] if len(sys.argv) > 2 else None
    mode = sys.argv[3] if len(sys.argv) > 3 else "target"
    
    # Parse seed phrase (use _ for missing words)
    known_phrase = []
    for word in seed_input.split():
        if word == "_":
            known_phrase.append(None)
        else:
            known_phrase.append(word)
    
    # Run recovery
    result = recover_seed_phrase(known_phrase, target_addr, mode)
    
    # Output JSON result
    print(json.dumps(result))
