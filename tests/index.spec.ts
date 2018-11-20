import * as assert from 'assert';
import { generateMulti, generateMnemonic, createWalletByMnemonicMulti } from "../src";


describe('Bancor Module', () => {
    it('should generate multi blockchain wallets by the same mnemonic', () => {
        const wallets = generateMulti();
        wallets.forEach((wallet) => {
            assert(wallet.keyPair.privateKey)
        })
    });

    it('should create multi blockchain wallets by provided mnemonic', () => {
        const mnemonic = generateMnemonic();
        const wallets = createWalletByMnemonicMulti(mnemonic);
        wallets.forEach((wallet) => {
            assert(wallet.keyPair.privateKey)
        })
    });
});