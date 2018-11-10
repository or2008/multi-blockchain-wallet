import { generate } from "../src";

describe('Bancor Module', () => {
    it('should generate multi blockchain wallets', () => {

        const blockchains = ['ethereum', 'eos', 'bitcoin']
        const wallets = blockchains.map(blockchain => generate(blockchain));

        wallets.forEach((wallet) => {
            console.log('');
            console.log(wallet);
            console.log('');
            console.log('--------------------------------------------------------');
        })
    });
});