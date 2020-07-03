# Harmonauts
[Harmonauts](https://punks.hmy.cc.ink/#/home) is an NFT collectible game ported from CryptoPunks and built on the [Harmony Blockchain](https://www.harmony.one/). The Harmonauts are 24 pixelated images of Harmony personnel. These are the guys and girls that make Harmony work! The value of Harmonaut depends on the characteristics (which is our Harmony culture) it has. Rarer characteristic the Harmonaut has, higher price it will be in the market.
There are currently three ways to get the valuable Harmonauts. 
- Initially you can claim it for free based on the "first come first serve" rule.
- Once all the Harmonauts are claimed, you can only buy those are actively on sale from others.
- Another way is to bid on the Harmonauts you want no matter it's on sale or not, the owner will decide which bid to accept. The first bidder can provide any price he wants, however new bidder needs to offer a price higher than the exiting bidding price.
If you want to withdraw the token you have in the smart contract to your ONE wallet, click the withdraw button.

# Install instructions

## Requirements

* nodejs v12.18.1
* truffle
* solidity v0.4.11

## Commands

* Fetch repo
```
git clone https://github.com/ivorytowerdds/harmonauts.git
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
truffle exec test/[TEST SCRIPT].js --network mainnet
```

## Disclaimer !!
This project is sourced from [cryptopunks](https://github.com/larvalabs/cryptopunks), an open source project. We are building it for technology demonstration, and not for commercial purposes.

## Acknowledgements
Haodi Jiang
Jurgen Bravenboer
