function polyfill(env) {
    return function (node_url, wallet_provider) {
        if (env.web3 === undefined) {
            var createWeb3 = require('./provider-factory');
            env.web3 = createWeb3(node_url, wallet_provider);
        }
    }
}

module.exports = polyfill;