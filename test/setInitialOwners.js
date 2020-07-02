require('babel-polyfill');
var CryptoPunksMarket = artifacts.require("./CryptoPunksMarket.sol");
const myAddress = '0x4B5E5A9CA71a6cbCFfC3C8B76D5040fc71215Dc5';

module.exports = function () {
  async function setInitialOwners() {
    let instance = await CryptoPunksMarket.deployed();
    console.log("Start setting initial owners =>", myAddress, "for all punks");
    let total = await instance.totalSupply();
    for(let i=3; i<6; i++) {
      let res = await instance.setInitialOwner(myAddress, i);
      console.log("set initial owner for punk " +  i + ",tx hash: " + res.tx);
    }
    await instance.allInitialOwnersAssigned();
    var allAssigned = await instance.allPunksAssigned.call();
    console.log("all punks assigned: ", allAssigned);
    var remainingAfter = await instance.punksRemainingToAssign.call();
    console.log("after initial assignment, we have", remainingAfter['words'][0], "punks left"); 
    balance = await instance.balanceOf.call(myAddress);
    console.log("after initial assignment, address ", myAddress, "get", balance['words'][0], "punks");
  }
  setInitialOwners().then(() => {
    console.log("done!");
    process.exit(0);
  });
};
