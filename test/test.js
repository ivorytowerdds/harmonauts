//require('babel-polyfill');
var CryptoPunksMarket = artifacts.require("./CryptoPunksMarket.sol");

const myAddress = '0xE0987e8Deb66E3AA1De62A957Bb0B83361Df0826'
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
  async function setInitialOwner(addr, index) {
    let instance = await CryptoPunksMarket.deployed();
    console.log("Set initial owner => addr:", addr,  "punk-idex:", index);
    res = await instance.setInitialOwner(addr, index);
    console.log("tx hash: ", res.tx);
    balance = await instance.balanceOf.call(addr);
    console.log("after assignment, address ", addr, "balance become", balance);

  }
  async function getPunkInfo(index) {
    let instance = await CryptoPunksMarket.deployed();
    owner = await instance.punkIndexToAddress.call(index);
    console.log("after first assignment, punk ",index, "owner is", owner);
    remaining = await instance.punksRemainingToAssign.call();
    console.log("after first assignment, we still have ",remaining, "punks to assign");
    process.exit(0);
  }
  contractInfo().then(() => {
    setInitialOwner(myAddress, 0).then(() => {
      getPunkInfo(0);
    });
  });
};
