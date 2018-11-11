import { generateMulti } from "../src";

describe('Bancor Module', () => {
    it('should generate multi blockchain wallets by the same mnemonic', () => {

        const wallets = generateMulti();

        wallets.forEach((wallet) => {
            console.log('');
            console.log(wallet);
            console.log('');
            console.log('--------------------------------------------------------');
        })
    });
});