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
var accounts = ["0x3aea49553Ce2E478f1c0c5ACC304a84F5F4d1f98", "0xE0987e8Deb66E3AA1De62A957Bb0B83361Df0826", "0xBaf83909d816892cCeb829Fc8c72bbf43F1B0874"]

module.exports = function () {
  harmony.blockchain
    .getBalance({
      address: accounts[0],
    })
    .then((res) => {
      console.log(accounts[0], "curr balance: ", new harmony.utils.Unit(res.result).asWei().toEther());
    })
    .catch((err) => {
      console.log(err);
    });
};
