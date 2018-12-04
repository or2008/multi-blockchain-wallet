/* globals it, describe, expect */

import * as assert from 'assert';
import { generateMulti, createWalletByMnemonicMulti, validateMnemonic, generateMnemonic, createWalletByMnemonic, signTransaction } from '../src';

const SAMPLE_MNEMONIC = 'robot leisure pipe wave drop quote lift vicious vacuum tattoo consider town';

describe('Bancor Module', () => {
    it('should generate multi blockchain wallets by the same mnemonic', () => {
        const wallets = generateMulti();

        wallets.forEach(wallet => {
            assert(wallet.keyPair.privateKey);
        });
    });

    it('should create multi blockchain wallets by provided mnemonic', () => {
        const mnemonic = SAMPLE_MNEMONIC;
        const wallets = createWalletByMnemonicMulti(mnemonic);

        wallets.forEach(wallet => {
            assert(wallet.keyPair.privateKey);
            assert(wallet.keyPair.publicKey);
        });
    });

    it('validate mnemonic', () => {
        const mnemonicValid = SAMPLE_MNEMONIC;
        assert(validateMnemonic(mnemonicValid));

        const mnemonicInvalid = 'ecolo## escape broken alarm source decorate jewel gadget clean surround version';
        assert(!validateMnemonic(mnemonicInvalid));
    });

    it('should generate a valid mnemonic', () => {
        const mnemonic = generateMnemonic();
        assert(validateMnemonic(mnemonic));
    });

    it('should sign a sample EOS transaciton as Unit8Array', async () => {
        const wallet = createWalletByMnemonic(SAMPLE_MNEMONIC, 'eos');

        const privateKey = wallet.keyPair.privateKey;
        const transaciton = {
            chainId: '12345',
            transaction: new Uint8Array([0, 16, 32, 128, 255])
        };
        const signedTransaction = await signTransaction('eos', transaciton, privateKey);
        assert(signedTransaction[0].includes('SIG'));
    });

    it('should sign a sample EOS transaciton as Object', async () => {
        const wallet = createWalletByMnemonic(SAMPLE_MNEMONIC, 'eos');

        const privateKey = wallet.keyPair.privateKey;
        const transaciton = {
            chainId: '12345',
            transaction: { 0: 197, 1: 121, 2: 6, 3: 92, 4: 113, 5: 84, 6: 100, 7: 84, 8: 144, 9: 203, 10: 0, 11: 0, 12: 0, 13: 0, 14: 1, 15: 0, 16: 0, 17: 0, 18: 0, 19: 0, 20: 0, 21: 128, 22: 117, 23: 0, 24: 0, 25: 0, 26: 87, 27: 45, 28: 60, 29: 205, 30: 205, 31: 1, 32: 64, 33: 194, 34: 40, 35: 67, 36: 16, 37: 50, 38: 238, 39: 60, 40: 0, 41: 0, 42: 0, 43: 0, 44: 168, 45: 237, 46: 50, 47: 50, 48: 33, 49: 64, 50: 194, 51: 40, 52: 67, 53: 16, 54: 50, 55: 238, 56: 60, 57: 64, 58: 200, 59: 40, 60: 162, 61: 148, 62: 32, 63: 238, 64: 60, 65: 0, 66: 225, 67: 245, 68: 5, 69: 0, 70: 0, 71: 0, 72: 0, 73: 8, 74: 73, 75: 81, 76: 0, 77: 0, 78: 0, 79: 0, 80: 0, 81: 0, 82: 0 }
        };
        const signedTransaction = await signTransaction('eos', transaciton, privateKey);
        assert(signedTransaction[0].includes('SIG'));
    });

    it('should sign a sample Ethereum transaciton', () => {
        const wallet = createWalletByMnemonic(SAMPLE_MNEMONIC, 'ethereum');
        const privateKey = wallet.keyPair.privateKey;
        const rawTransaction = { from: '0x26ac3cd6ffc1d006a56fb9cbe7bbafdff4a2efb9', value: '0x2386f26fc10000', to: '0xa56d14a49c9a81fffaef02649f007593aa33cede', gasPrice: '0x3b9aca00', nonce: '0x1', gasLimit: '0x5208' };
        const signedTransaction = signTransaction('ethereum', rawTransaction, privateKey);

        assert(signedTransaction.length == 218);
    });
});
