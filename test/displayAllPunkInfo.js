require('babel-polyfill');
var CryptoPunksMarket = artifacts.require("./CryptoPunksMarket.sol");

module.exports = function () {  
  async function displayAllPunkInfo() {
    let instance = await CryptoPunksMarket.deployed();
    let total = await instance.totalSupply();
    console.log("total punks: " + total.toString());
    for (i = 0; i < total; i++){
      let res = await instance.getPunkInfo(i);
      console.log("====== Punk info (index: " + i + ") =======");
      console.log("owner", res.owner);
      console.log("hasBid", res.hasBid);
      console.log("bidValue", res.bidValue['words'][0]);
      console.log("isForSale", res.isForSale);
      console.log("minValue", res.minValue['words'][0]);
      console.log("onlySellTo", res.onlySellTo);
    }
  }
  displayAllPunkInfo().then(() => {
    console.log("done!");
    process.exit(0);
  });
};
