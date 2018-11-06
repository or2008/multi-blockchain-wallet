import { generate } from "../src";

describe('Bancor Module', () => {
    it('should generate multi blockchain wallets', () => {
        const wallets = generate();
        console.log(wallets);
    });
});