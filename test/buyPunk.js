require('dotenv').config()
require('babel-polyfill');
//Testnet
const testnet_mnemonic = process.env.TESTNET_MNEMONIC
const testnet_private_key = process.env.TESTNET_PRIVATE_KEY
const testnet_url = process.env.TESTNET_0_URL

const { Harmony } = require('@harmony-js/core');
const { ChainID, ChainType } = require('@harmony-js/utils');
const url = testnet_url
const harmony = new Harmony(url, {
  chainType: ChainType.Harmony,
  chainId: ChainID.HmyTestnet,
});

var CryptoPunksMarket = artifacts.require("./CryptoPunksMarket.sol");
var address = 'one18t4yj4fuutj83uwqckkvxp9gfa0568uc48ggj7';

module.exports = function () {
  async function getBalance(addr) {
    var balance = await harmony.blockchain.getBalance({address: addr});
    console.log(addr, "curr balance: ", new harmony.utils.Unit(balance.result).asWei().toEther());
  }
  async function buyPunk(index,val) {
    var contract = await CryptoPunksMarket.deployed();
    await contract.allInitialOwnersAssigned();
    var allAssigned = await contract.allPunksAssigned.call();
    console.log("All assigned: " + allAssigned);
    var offer = await contract.punksOfferedForSale.call(index);
    console.log("punk index: " + offer[1]);
    console.log("is For Sale: " + offer[0]);
    console.log("seller: " + offer[2]);
    console.log("min value for sale: " + offer[3]);
    console.log("only sell to: " + offer[4]);
    console.log("======= Start buying punk", index, "from", offer[2], "  =======") 
    var res = await contract.buyPunk(index, {value: val});
    console.log("txs hash: " + res.tx);
  }
  getBalance(address).then(() => {
    buyPunk(0,10e18).then(() => {
      getBalance(address).then(() => {
        console.log("done!!!");
        process.exit(0);
      });
    });
  });
}
