import * as assert from 'assert';
import { generateMulti, createWalletByMnemonicMulti, validateMnemonic, generateMnemonic } from "../src";

const SAMPLE_MNEMONIC = 'ecology bubble escape broken alarm source decorate jewel gadget clean surround version';
describe('Bancor Module', () => {
    it('should generate multi blockchain wallets by the same mnemonic', () => {
        const wallets = generateMulti();

        wallets.forEach((wallet) => {
            assert(wallet.keyPair.privateKey)
        })
    });

    it('should create multi blockchain wallets by provided mnemonic', () => {
        const mnemonic = SAMPLE_MNEMONIC;
        const wallets = createWalletByMnemonicMulti(mnemonic);
        wallets.forEach((wallet) => {
            assert(wallet.keyPair.privateKey)
        })
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
});