import * as assert from 'assert';
import { generateMulti } from "../src";

describe('Bancor Module', () => {
    it('should generate multi blockchain wallets by the same mnemonic', () => {

        const wallets = generateMulti();
        wallets.forEach((wallet) => {
            assert(wallet.keyPair.privateKey)
        })
    });
});