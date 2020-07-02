require('babel-polyfill');
var CryptoPunksMarket = artifacts.require("./CryptoPunksMarket.sol");

module.exports = function () {
  async function contractInfo() {
  let instance = await CryptoPunksMarket.deployed();
  let symbol = await instance.symbol();
  let name = await instance.name();
  let total = await instance.totalSupply();
  console.log("HarmonyPunksToken is deployed at address " + instance.address);
  console.log("HarmonyPunksToken Symbol: " + symbol);
  console.log("HarmonyPunksToken Name: " + name);
  console.log("Total number of punks: " + total.toString());
  }
  contractInfo().then(() => {
    process.exit(0);
  });
};
