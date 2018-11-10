import { IWallet } from './common/wallet';
import * as bitcoinPlugin from './plugins/bitcoin';
import * as ethereumPlugin from './plugins/ethereum';
import * as eosPlugin from './plugins/eos';

export function generate(type = 'eos'): IWallet {
    if (type == 'bitcoin')
        return bitcoinPlugin.generateWallet();
    if (type == 'ethereum')
        return ethereumPlugin.generateWallet();
    if (type == 'eos')
        return eosPlugin.generateWallet();

    return ethereumPlugin.generateWallet();
}
