require('babel-polyfill');
var CryptoPunksMarket = artifacts.require("./CryptoPunksMarket.sol");

module.exports = function () {  
  async function displayAllPunkInfo() {
    let instance = await CryptoPunksMarket.deployed();
    let total = await instance.totalSupply();
    console.log("total punks: " + total.toString());
    let onSale = await instance.getOnSalePunk.call();
    console.log("onSale: " + onSale);
  }
  displayAllPunkInfo().then(() => {
    console.log("done!");
    process.exit(0);
  });
};
