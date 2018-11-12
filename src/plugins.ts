import { plugin as bitcoinPlugin } from './plugins/bitcoin';
import { plugin as ethereumPlugin } from './plugins/ethereum';
import { plugin as eosPlugin } from './plugins/eos';
import { plugin as tronPlugin } from './plugins/tron';
import { IPlugin } from './common/plugin';

const pluginMap: { [key: string]: IPlugin } = {
    bitcoin: bitcoinPlugin,
    ethereum: ethereumPlugin,
    eos: eosPlugin,
    tron: tronPlugin
};

export function getPluginByType(type = 'ethereum'): IPlugin {
    return pluginMap[type];
}