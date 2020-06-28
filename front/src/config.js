export const contractConfig = {
  address: '0xFe24240cf773696B5Beb6c716daaafe06BE1FE71',
  url: 'https://api.s0.t.hmny.io',
  abi: [
      {
        "constant": true,
        "inputs": [],
        "name": "name",
        "outputs": [
          {
            "name": "",
            "type": "string"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "punksOfferedForSale",
        "outputs": [
          {
            "name": "isForSale",
            "type": "bool"
          },
          {
            "name": "punkIndex",
            "type": "uint256"
          },
          {
            "name": "seller",
            "type": "address"
          },
          {
            "name": "minValue",
            "type": "uint256"
          },
          {
            "name": "onlySellTo",
            "type": "address"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "totalSupply",
        "outputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "decimals",
        "outputs": [
          {
            "name": "",
            "type": "uint8"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "imageHash",
        "outputs": [
          {
            "name": "",
            "type": "string"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "nextPunkIndexToAssign",
        "outputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "punkIndexToAddress",
        "outputs": [
          {
            "name": "",
            "type": "address"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "standard",
        "outputs": [
          {
            "name": "",
            "type": "string"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "punkBids",
        "outputs": [
          {
            "name": "hasBid",
            "type": "bool"
          },
          {
            "name": "punkIndex",
            "type": "uint256"
          },
          {
            "name": "bidder",
            "type": "address"
          },
          {
            "name": "value",
            "type": "uint256"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "",
            "type": "address"
          }
        ],
        "name": "balanceOf",
        "outputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "allPunksAssigned",
        "outputs": [
          {
            "name": "",
            "type": "bool"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "symbol",
        "outputs": [
          {
            "name": "",
            "type": "string"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "punksRemainingToAssign",
        "outputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "",
            "type": "address"
          }
        ],
        "name": "pendingWithdrawals",
        "outputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "inputs": [],
        "payable": true,
        "type": "constructor"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "name": "to",
            "type": "address"
          },
          {
            "indexed": false,
            "name": "punkIndex",
            "type": "uint256"
          }
        ],
        "name": "Assign",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "name": "from",
            "type": "address"
          },
          {
            "indexed": true,
            "name": "to",
            "type": "address"
          },
          {
            "indexed": false,
            "name": "value",
            "type": "uint256"
          }
        ],
        "name": "Transfer",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "name": "from",
            "type": "address"
          },
          {
            "indexed": true,
            "name": "to",
            "type": "address"
          },
          {
            "indexed": false,
            "name": "punkIndex",
            "type": "uint256"
          }
        ],
        "name": "PunkTransfer",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "name": "punkIndex",
            "type": "uint256"
          },
          {
            "indexed": false,
            "name": "minValue",
            "type": "uint256"
          },
          {
            "indexed": true,
            "name": "toAddress",
            "type": "address"
          }
        ],
        "name": "PunkOffered",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "name": "punkIndex",
            "type": "uint256"
          },
          {
            "indexed": false,
            "name": "value",
            "type": "uint256"
          },
          {
            "indexed": true,
            "name": "fromAddress",
            "type": "address"
          }
        ],
        "name": "PunkBidEntered",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "name": "punkIndex",
            "type": "uint256"
          },
          {
            "indexed": false,
            "name": "value",
            "type": "uint256"
          },
          {
            "indexed": true,
            "name": "fromAddress",
            "type": "address"
          }
        ],
        "name": "PunkBidWithdrawn",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "name": "punkIndex",
            "type": "uint256"
          },
          {
            "indexed": false,
            "name": "value",
            "type": "uint256"
          },
          {
            "indexed": true,
            "name": "fromAddress",
            "type": "address"
          },
          {
            "indexed": true,
            "name": "toAddress",
            "type": "address"
          }
        ],
        "name": "PunkBought",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "name": "punkIndex",
            "type": "uint256"
          }
        ],
        "name": "PunkNoLongerForSale",
        "type": "event"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "to",
            "type": "address"
          },
          {
            "name": "punkIndex",
            "type": "uint256"
          }
        ],
        "name": "setInitialOwner",
        "outputs": [],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "addresses",
            "type": "address[]"
          },
          {
            "name": "indices",
            "type": "uint256[]"
          }
        ],
        "name": "setInitialOwners",
        "outputs": [],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [],
        "name": "allInitialOwnersAssigned",
        "outputs": [],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "punkIndex",
            "type": "uint256"
          }
        ],
        "name": "getPunk",
        "outputs": [],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "to",
            "type": "address"
          },
          {
            "name": "punkIndex",
            "type": "uint256"
          }
        ],
        "name": "transferPunk",
        "outputs": [],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "punkIndex",
            "type": "uint256"
          }
        ],
        "name": "punkNoLongerForSale",
        "outputs": [],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "punkIndex",
            "type": "uint256"
          },
          {
            "name": "minSalePriceInWei",
            "type": "uint256"
          }
        ],
        "name": "offerPunkForSale",
        "outputs": [],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "punkIndex",
            "type": "uint256"
          },
          {
            "name": "minSalePriceInWei",
            "type": "uint256"
          },
          {
            "name": "toAddress",
            "type": "address"
          }
        ],
        "name": "offerPunkForSaleToAddress",
        "outputs": [],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "punkIndex",
            "type": "uint256"
          }
        ],
        "name": "buyPunk",
        "outputs": [],
        "payable": true,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [],
        "name": "withdraw",
        "outputs": [],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "punkIndex",
            "type": "uint256"
          }
        ],
        "name": "enterBidForPunk",
        "outputs": [],
        "payable": true,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "punkIndex",
            "type": "uint256"
          },
          {
            "name": "minPrice",
            "type": "uint256"
          }
        ],
        "name": "acceptBidForPunk",
        "outputs": [],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "punkIndex",
            "type": "uint256"
          }
        ],
        "name": "withdrawBidForPunk",
        "outputs": [],
        "payable": false,
        "type": "function"
      }
  ],
  defaultGasPrice: '0.005',
  defaultGasLimit: '1000000',
  eventApiDomain: 'https://harmony-explorer-mainnet.firebaseio.com',
}

export const punksDescConfig = {
  1: 'Passionate leader who will tell you a lot of stories about Apple! Sometimes forgets he’s the ONE!',
  2: 'Act always calm and easy, until speaking about technical stuff, especially about Harmony chain. Then the 🔥 turns on!',
  3: 'Looks like an American surf dude who likes to BBQ, but actually love to run community and business initiatives!',
  4: 'Sounds like your average Indian support guy, but actually is our DeFi/CrossFi expert!',
  5: 'You would think that he’s always running or hiking, but he’s actually plugged into our harmony matrix and is our uptime human',
  6: 'He can be your favorite professor, a creative entrepreneur, a healthy habit keeper who gets up at 5am everyday to do yoga and now a magician managing all the stuffs in Harmony',
  7: 'She should be in the stage of Sisters Who Make Waves, but now she is our chief writer, journalist, and the most beautiful bridge connecting China and US community!',
  8: 'Pangaea Mother"! She is in charge with our surveys received, keys and others, let\'s say she is the lady in charge with our rules!',
  9: 'Have you ever heard Vitalik Bieberin? If not, check out our creative director in Harmony who can combine FakeAI with blockchain!',
  10: 'Our own Island hopping person, loves to take care of partners and their wallets… Still unclear if is own wallet is also filled by this!',
  11: 'He’s Clark Kent behind a keyboard working on resharding, but breaks out the Superman cape on the soccer pitch!',
  12: 'Did you know that behind the friendly smile that Dennis has fiery energy for hacking together apps, you could say he’s the Won',
  13: 'You can see him working in the sunshine of 7 am, or debugging at the middle of the night. He is the father of autonode, making your staking life easier!',
  14: 'Sleeping behind the keyboard soon because of his newborn keeping him awake…!',
  15: 'A fashion model? A basketball player? She is a person mixed with all the possibilities you even cannot imagine. The energetic star in Harmony!',
  16: 'A child with many question marks is full of desire for knowledge, but actually is a very 👍 partner! can learn a lot every time communicate with her',
  17: 'Looks like your lovely neighbor girl who can make yummy cookies, but she is the one monitoring all the nodes in Harmony. Janet is watching you!',
  18: 'Explorers is what makes him crazy, checks out where your HRC-20 stuff went if it’s lost!',
  19: 'You will see him always wearing a headphone, try to catch him if you can because in fact he immersed himself in Harmony FastSync! (hard to catch!)',
  20: 'Have you ever seen Silicon Valley at 4 am? Niteesh did, inspired by his role model Kobe, he lives his own dream building the validator /delegator community!',
  21: 'Newest addition to the team, loves to dive into grants and read all about those crazy ideas! Of course all are granted! (NOT!!!)',
  22: 'The big boss of our community, he will light up for you when you are walking in the dark and guide you to the bright new world of Harmony!',
  23: 'Groot"! One of the first, the guy in charge with bandwidth usage so you\'ll never exceed the limits and keep your funds in pockets and not waste them !',
  24: 'You’re not so average day community guide, but watch out for him when starting to talk! He will talk your ears of (instead of bite them off)!',
}

export const punksAccessoriesConfig = {
  0: {name: 'Male', punks: [1,2,3,4,5,6,9,10,11,12,13,14,18,19,20,21,22,23,24]},
  1: {name: 'Female', punks: [7,8,15,16,17]},
  2: {name: 'conversation turn taking', punks: [2,3,4,5,6,8,10,14,23,24]},
  3: {name: 'disconfirm own beliefs', punks: [2,3,4,8,9,10,11,12,13,15,20,22]},
  4: {name: 'self-aware & articulate', punks: [1,2,3,4,5,6,8,9,22]},
  5: {name: 'share a drink', punks: [1,3,4,7,8,10,11,12,20,21,23]},
  6: {name: 'spend 10 hours daily together', punks: [6,10,11,12,13,16,17,20,22,24]},
  7: {name: 'nurture & mentor', punks: [2,4,5,6,9,11,13,14,24]},
  8: {name: 'make everyone shine', punks: [1,3,4,6,8,13,20,21]},
  9: {name: 'people over process', punks: [1,2,3,4,5,10,15,24]},
  10: {name: 'dare to disagree', punks: [3,4,5,8,12,23]},
  11: {name: 'long-time craftsmanship', punks: [2,7,8,16]},
  12: {name: 'obsess over details', punks: [1,5,9,10,12,16,17]},
  13: {name: 'hungry & foolish', punks: [1,3,4,5,10,11,15,16,19,20]},
  14: {name: 'share the mission', punks: [2,4,5,6,8,10,14,15,22]},
  15: {name: 'optimistic about flying off a cliff', punks: [1,3,5,7,8,10,15,19,20,23]},
  16: {name: 'your 50-year dream', punks: [1,2,3,4,5,21]},
  17: {name: 'consistent with own actions', punks: [2,3,5,6,7,13,16,17,23,24]},
  18: {name: 'make tough decisions', punks: [1,2,3,4,6,8,15,17]},
  19: {name: 'admit mistakes', punks: [1,3,5,6,10,11,12,15,16,22]},
  20: {name: 'top 1% superstar', punks: [2,4,5,8,11,13,15,24]},
  21: {name: 'effective tooling', punks: [12,13,17]},
  22: {name: 'relevant to our needs', punks: [2,11,12,13,17,18,20,21,22,23]},
  23: {name: '10x growth', punks: [1,4,8,10,13,15,16,19,20]},
  24: {name: 'voracious learner', punks: [6,13,17,19,20,24]},
  25: {name: 'contrarian thinker', punks: [3,4,5,7,8,10,17,22]},
  26: {name: 'accomplish important work', punks: [1,2,5,8,9,11,15,22,24]},
  27: {name: 'activity < productivity', punks: [2,8,9,10,12,17,23]},
  28: {name: 'thrive in chaos', punks: [1,4,5,6,16,17,22]},
}
