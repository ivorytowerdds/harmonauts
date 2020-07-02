require('babel-polyfill');
var CryptoPunksMarket = artifacts.require("./CryptoPunksMarket.sol");
const myAddress = '0x4B5E5A9CA71a6cbCFfC3C8B76D5040fc71215Dc5';

module.exports = function () {
  async function allInitialOwnersAssigned() {
    let instance = await CryptoPunksMarket.deployed();
    res = await instance.allInitialOwnersAssigned();
    console.log("txs hash", res.tx);
    var allAssigned = await instance.allPunksAssigned.call();
    console.log("all punks assigned: ", allAssigned);
  }
  allInitialOwnersAssigned().then(() => {
    console.log("done!");
    process.exit(0);
  });
};
