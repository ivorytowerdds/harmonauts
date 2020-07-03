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

module.exports = function () {
  async function offerPunkForSale(index, minValue) {
    var contract = await CryptoPunksMarket.deployed();
    await contract.allInitialOwnersAssigned();
    var allAssigned = await contract.allPunksAssigned.call();
    console.log("All assigned: " + allAssigned);
    var owner = await contract.punkIndexToAddress.call(index);
    console.log("owner of punk " + index + ":" + owner);
    console.log("======= Setting punk", index, "for sale", "  =======");
    let res = await contract.offerPunkForSale(index, minValue);
    console.log("tx hash:" + res.tx);
    var offer = await contract.punksOfferedForSale.call(index);
    console.log("punk index: " + offer[1]);
    console.log("is For Sale: " + offer[0]);
    console.log("seller: " + offer[2]);
    console.log("min value for sale: " + offer[3]);
    console.log("only sell to: " + offer[4]);
  }
  offerPunkForSale(2, 10).then(() => {
    console.log("done!!!");
    process.exit(0);
  });
};
