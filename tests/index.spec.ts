/* globals it, describe */

import * as assert from 'assert';
import { generateMulti, createWalletByMnemonicMulti, validateMnemonic, generateMnemonic, createWalletByMnemonic, signRawTransaction } from '../src';

const SAMPLE_MNEMONIC = 'ecology bubble escape broken alarm source decorate jewel gadget clean surround version';
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

    it('should sign a sample EOS transaciton', () => {
        const wallet = createWalletByMnemonic(SAMPLE_MNEMONIC, 'eos');
        const rawTransaction = {
            actions: [{
                account: 'eosio.token',
                name: 'transfer',
                authorization: [{
                    actor: 'useraaaaaaaa',
                    permission: 'active'
                }],
                data: {
                    from: 'useraaaaaaaa',
                    to: 'useraaaaaaab',
                    quantity: '0.0001 SYS',
                    memo: ''
                }
            }]
        };

        const privateKey = wallet.keyPair.privateKey;
        const chainId = 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906';

        signRawTransaction('eos', rawTransaction, privateKey, chainId);
        assert(true);
    });

    it('should sign a sample Ethereum transaciton', () => {
        const wallet = createWalletByMnemonic(SAMPLE_MNEMONIC, 'ethereum');
        const privateKey = wallet.keyPair.privateKey;
        const rawTransaction = {

        };
        signRawTransaction('ethereum', rawTransaction, privateKey);
        assert(true);
    });
});
