import * as bip39 from 'bip39';
import * as hdkey from 'ethereumjs-wallet/hdkey';
import { IWallet } from '../common/wallet';
import { IPlugin } from '../common/plugin';

export const plugin: IPlugin = {
    createWalletByMnemonic(mnemonic) {
        const seed = bip39.mnemonicToSeed(mnemonic);
        const hdKey = hdkey.fromMasterSeed(seed);
        const derivedHdKey = hdKey.derivePath("m/44'/60'/0'/0").deriveChild(0);
        const wallet = derivedHdKey.getWallet();

        return {
            type: 'ethereum',
            mnemonic: mnemonic,
            address: wallet.getAddressString(),
            keyPair: {
                publicKey: wallet.getPublicKeyString(),
                privateKey: wallet.getPrivateKeyString(),
            }
        };
    },

    generateWallet(): IWallet {
        const mnemonic = bip39.generateMnemonic()
        return plugin.createWalletByMnemonic(mnemonic);
    }
};