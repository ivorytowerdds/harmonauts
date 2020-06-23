# Harmony-punks
Harmony Punks is a collection game ported to [Harmony](http://harmony.one) blockchain. People can either claim a punk or buy punks from someone else. All characters are unique and collectible with proof of ownership stored on the harmony blockchain.

# Install instructions

## Requirements

* nodejs v12.18.1
* truffle
* solidity v0.4.11

## Commands

* Fetch repo
```
git clone https://github.com/ivorytowerdds/harmony-punks.git
```

* Install dependencies
```
npm install
```
* Add an .env file
```
//MAINNET
//Account: ONE address
MAINNET_PRIVATE_KEY=[PRIVATE KEY]
MAINNET_MNEMONIC=[MNEMONIC]
MAINNET_0_URL='https://api.s0.t.hmny.io'

GAS_LIMIT=9321900
GAS_PRICE=1000000000
```

* Compile harmony punk smart contract
```
truffle compile
```

* Deploy harmony punk smart contract
```
truffle migrate --network mainnet --reset
```
Note: when you run this command, you need to be in the `[PATH]/harmony-punks`

* Running an example that initalize one owner for a punk and check the information of that punk.
```
truffle exec test/test.js --network mainnet
```

## Disclaimer !!
This project is sourced from [cryptopunks](https://github.com/larvalabs/cryptopunks), an open source project. We are building it for technology demonstration, and not for commercial purposes.
