const Web3 = require('web3');
const ProviderEngine = require('web3-provider-engine');
const CacheSubprovider = require('web3-provider-engine/subproviders/cache.js');
const FixtureSubprovider = require('web3-provider-engine/subproviders/fixture.js');
const FilterSubprovider = require('web3-provider-engine/subproviders/filters.js');
const VmSubprovider = require('web3-provider-engine/subproviders/vm.js');
const NonceSubprovider = require('web3-provider-engine/subproviders/nonce-tracker.js');
const RpcSubprovider = require('web3-provider-engine/subproviders/rpc.js');

function createWeb3(node_url, wallet_provider) {
    var engine = new ProviderEngine();
    var web3 = new Web3(engine);

    // static results
    engine.addProvider(new FixtureSubprovider({
        web3_clientVersion: 'ProviderEngine/v0.0.0/javascript',
        net_listening: true,
        eth_hashrate: '0x00',
        eth_mining: false,
        eth_syncing: true,
    }));

    // cache layer
    engine.addProvider(new CacheSubprovider());

    // filters
    engine.addProvider(new FilterSubprovider());

    // pending nonce
    engine.addProvider(new NonceSubprovider());

    // vm
    engine.addProvider(new VmSubprovider());

    // id mgmt
    engine.addProvider(wallet_provider);

    // data source
    engine.addProvider(new RpcSubprovider({
        rpcUrl: node_url,
    }));

    engine.start();

    return web3;
}

module.exports = createWeb3;
