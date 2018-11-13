import * as assert from 'assert';
import { generateMulti, generateMnemonic, createWalletByMnemonicMulti } from "../src";

const TYPES = ['bitcoin', 'ethereum', 'eos', 'tron'];

describe('Bancor Module', () => {
    it('should generate multi blockchain wallets by the same mnemonic', () => {
        const wallets = generateMulti(TYPES);
        wallets.forEach((wallet) => {
            assert(wallet.keyPair.privateKey)
        })
    });

    it('should create multi blockchain wallets by provided mnemonic', () => {
        const mnemonic = generateMnemonic();
        const wallets = createWalletByMnemonicMulti(TYPES, mnemonic);
        wallets.forEach((wallet) => {
            assert(wallet.keyPair.privateKey)
        })
    });
});