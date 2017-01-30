var assert = require('assert');
var polyfill = require('../src/index');
var HookedWalletSubprovider = require('web3-provider-engine/subproviders/hooked-wallet.js');

var NODE_URL = 'https://ropsten.infura.io/c1GeHOZ7ipPvjO7nDP7l';

describe('web3-polyfill', function () {
    describe('#polyfill', function () {
        it('should patch the object passed to polyfill function', function () {
            var fakeWindow = {};
            var nodeUrl = NODE_URL;
            var NOP = function (cb) {
                cb()
            };
            assert(!("web3" in fakeWindow));
            polyfill(fakeWindow)(nodeUrl, new HookedWalletSubprovider({
                getAccounts: NOP,
                approveTransaction: NOP,
                signTransaction: NOP
            }));
            assert("web3" in fakeWindow);
        });
        it('should use wallet subprovider function', function (done) {
            var fakeWindow = {};
            var nodeUrl = NODE_URL;
            var accounts = ["0x407d73d8a49eeb85d32cf465507dd71d507100c1"];
            var NOP = function (cb) {};
            polyfill(fakeWindow)(nodeUrl, new HookedWalletSubprovider({
                getAccounts: function(cb){
                    cb(undefined, accounts);
                },
                approveTransaction: NOP,
                signTransaction: NOP
            }));
            fakeWindow.web3.eth.getAccounts(function(error, data){
                assert.equal(data, accounts);
                done();
            });
        });
    });

});