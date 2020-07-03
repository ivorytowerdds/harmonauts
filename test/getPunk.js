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
var accounts = ["0x3aea49553Ce2E478f1c0c5ACC304a84F5F4d1f98", "0x4B5E5A9CA71a6cbCFfC3C8B76D5040fc71215Dc5"];

module.exports = function () {
  async function getPunk(index) {
    var contract = await CryptoPunksMarket.deployed();
    await contract.allInitialOwnersAssigned();
    var allAssigned = await contract.allPunksAssigned.call();
    console.log("All assigned: " + allAssigned);
    var owner = await contract.punkIndexToAddress.call(index);
    console.log("Pre owner of punk " + index + ":" + owner);
    let msg_sender = accounts[0];
    console.log("message sender is " + msg_sender);
    var balance = await contract.balanceOf.call(msg_sender);
    console.log("Pre amount of punks owned by msg_sender ", msg_sender, balance['words'][0]);
    console.log("======= Start getting punk for message sender =======");
    let res = await contract.getPunk(index);
    console.log("tx hash:" + res.tx);
    var balance = await contract.balanceOf.call(msg_sender);
    console.log("Curr amount of punks owned by msg_sender ", msg_sender,  balance['words'][0]);
    var owner = await contract.punkIndexToAddress.call(index);
    console.log("Curr owner of punk " + index + ":" + owner);
  }
  getPunk(3).then(() => {
    console.log("done!!!");
    process.exit(0);
  });
};
