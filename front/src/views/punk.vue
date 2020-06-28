<template>
  <div id="punk">
    <el-row>
      <el-col :span="16" :offset="4">
        <el-row>
          <el-col :span="24">
            <el-breadcrumb separator-class="el-icon-arrow-right" class="punk-breadcrumb">
              <el-breadcrumb-item :to="{ path: '/home' }">Harmonypunks</el-breadcrumb-item>
              <el-breadcrumb-item>#{{ this.punkId }}</el-breadcrumb-item>
            </el-breadcrumb>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24" class="banner-owner">
            <el-image
              style="width: 150px; height: 150px"
              :src="punkImage"
              fit="contain"
              >
              </el-image>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20" :offset="1">
            <el-row>
              <el-col :span="24">
                <div class="punk-title">HarmonyPunk #{{ punkId }}</div>
                <div class="punk-desc" v-if="punkDesc">{{ punkDesc }}</div>
                <div class="punk-sex"><b>One of {{ punkSex.count }} <span class="punk-sex-title">{{ punkSex.sex }}</span> punks.</b></div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
              <div class="punk-sub-title">Characteristics</div>
              <el-row>
                <el-col :span="8" v-for="accessory in punkAccessories" :key="accessory.name">
                  <div class="accessory-title">{{ accessory.name }}</div>
                  <div class="accessory-count"><span class="count">{{ accessory.count }}</span> punks have this.</div>
                </el-col>
              </el-row>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
              <div class="punk-sub-title">Current Market Status</div>
              <div class="punk-status-text" v-if="owner == '0x0000000000000000000000000000000000000000'">
                This punk has no owner temporary
              </div>
              <div class="punk-status-text" v-else>
                This punk is currently owned by address <span class="punk-owner-b32">{{ ownerB32Text }}</span>
              </div>
              <div class="punk-status-text" v-if="isForSale">
                This punk is currently for sale by owner for <span class="punk-for-sale-price">{{ forSalePrice }}</span> $ONE
              </div>
              <div class="punk-status-text" v-else>
                This punk has not been listed for sale by its owner.
              </div>
              <div class="punk-status-text" v-if="hasBid">
                There is a bid of <span class="punk-bid-price">{{ bidValue }}</span> $ONE for this punk from <span class="punk-bidder-b32">{{ bidderB32Text }}</span>
              </div>
              <div class="punk-status-text" v-else>
                There are currently no bids on this punk.
              </div>
              </el-col>
            </el-row>
            <el-row class="row-panel" :gutter="20" v-if="isLoadFinish">
              <template v-if="owner == address">
                <el-col :span="6">
                  <el-button type="primary" :loading="isForSaleLoading" icon="el-icon-truck" @click="setPunkForSale">For Sale</el-button>
                </el-col>
                <el-col :span="6">
                  <el-button type="primary" :loading="isAcceptBideLoading" icon="el-icon-document-checked" @click="setPunkForSale">Accept Bid</el-button>
                </el-col>
              </template>
              <template v-else>
                <el-col :span="6">
                  <el-button type="primary" :loading="isBuyLoading" icon="el-icon-shopping-cart-full" @click="buyPunk">Buy</el-button>
                </el-col>
                <el-col :span="6">
                  <el-button type="warning" :loading="isBidLoading" icon="el-icon-chat-dot-round" @click="bidPunk">Bid</el-button>
                </el-col>
              </template>
            </el-row>
            <el-row>
              <el-col :span="24">
                <div class="punk-sub-title">Transaction History</div>

              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    
  </div>
</template>

<script>
import { HarmonyExtension } from '@harmony-js/core'
import { ChainID, ChainType } from '@harmony-js/utils'
import { contractConfig, punksDescConfig, punksAccessoriesConfig } from '../config.js'

export default {
  name: "punk",
  components: {},
  computed: {
    ownerB32Text: function () {
      let raw = this.ownerB32
      return raw.slice(0, 8)+"...."+raw.slice(-5)
    },
    bidderB32Text: function () {
      let raw = this.bidderB32
      return raw.slice(0, 8)+"...."+raw.slice(-5)
    }
  },
  data() {
    return {
      extPunks: null,
      address: '0x0',
      // punk
      punkId: parseInt(this.$route.params.id),
      punkDesc: '',
      punkSex: {
        sex: 'Male',
        count: 0,
      },
      punkImage: '',
      punkAccessories: [],
      // owner
      owner: '0x0',
      ownerB32: '',
      // bid
      hasBid: false,
      bidder: '0x0',
      bidderB32: '',
      bidValue: 0,
      // for sale
      isForSale: false,
      forSalePrice: 0,
      // load state
      isLoadFinish: false,
      isForSaleLoading: false,
      isBuyLoading: false,
      isBidLoading: false,
      isAcceptBideLoading: false,
    }
  },
  methods: {
    waitForInjected() {
      return new Promise((resolve) => {
        const check = () => {
            if (!window.harmony) setTimeout(check, 250)
            else {
              resolve(window.harmony)
            }
        }
        check();
      }) 
    },
    async initContract() {
      await this.waitForInjected()

      let harmonyEx = new HarmonyExtension(window.harmony, {
        chainType: ChainType.Harmony,
        chainId: ChainID.HmyMainnet,
      })
      harmonyEx.setProvider(contractConfig.url)
      this.extPunks = harmonyEx.contracts.createContract(contractConfig.abi, contractConfig.address)
    },
    loadImage(id) {
      let imageIndex = (id < 10) ? '0' + id : '' + id;
      this.punkImage = require('../assets/punks/' + imageIndex + '.png')
    },
    loadAccessories() {
      // get punk sex
      if (punksAccessoriesConfig[0].punks.indexOf(this.punkId) != -1) {
        this.punkSex.sex = 'Male'
        this.punkSex.count = punksAccessoriesConfig[0].punks.length
      } else {
        this.punkSex.sex = 'Female'
        this.punkSex.count = punksAccessoriesConfig[1].punks.length
      }

      // TODO: get accessories
      for (let i = 2; i < 27; i++) {
        if (punksAccessoriesConfig[i].punks.indexOf(this.punkId) != -1) {
          this.punkAccessories.push({
            name: punksAccessoriesConfig[i].name,
            count: punksAccessoriesConfig[i].punks.length
          })
        }
      }
    },
    async getPunkOwner() {
      await this.punkContract.methods.punkIndexToAddress(this.punkId).call({
        gasLimit: '1000000',
        gasPrice: new this.hmy.utils.Unit('10').asGwei().toWei(),
      }).then((data) => {
        this.owner = data
        if (data != '0x0000000000000000000000000000000000000000') {
          this.ownerB32 = this.hmy.crypto.toBech32(data)
        }
      })

      // TODO
      const account = await window.harmony.getAccount();
      const { address } = account;
      this.address = this.hmy.crypto.fromBech32(address)
    },
    async getPunkOfferedForSale() {
      await this.punkContract.methods.punksOfferedForSale(this.punkId).call({
        gasLimit: '1000000',
        gasPrice: new this.hmy.utils.Unit('10').asGwei().toWei(),
      }).then((data) => {
        this.isForSale = data.isForSale
        this.forSalePrice = new this.hmy.utils.Unit(data.minValue).toOne()
      })
    },
    async getPunkBids() {
      await this.punkContract.methods.punkBids(this.punkId).call({
        gasLimit: '1000000',
        gasPrice: new this.hmy.utils.Unit('10').asGwei().toWei(),
      }).then((data) => {
        if (data.hasBid) {
          this.hasBid = true
          this.bidder = data.bidder
          this.bidderB32 = this.hmy.crypto.toBech32(data.bidder)
          this.bidValue = new this.hmy.utils.Unit(data.value).toOne()
        }
        console.log(data)
      })
    },
    setPunkForSale() {
      let priceAsWei = 0
      this.$prompt('set your for sale price', 'notice', {
        confirmButtonText: 'set',
        cancelButtonText: 'cancel',
        inputPattern: /^(([^0][0-9]+|0)\.([0-9]{1,6})$)|^(([^0][0-9]+|0)$)|^(([1-9]+)\.([0-9]{1,6})$)|^(([1-9]+)$)/,
        inputErrorMessage: 'please enter a correct price'
      }).then(({ value }) => {
        if (value > 0) {
          this.isForSaleLoading = true
          priceAsWei = new this.hmy.utils.Unit(value).asOne().toWei()
          this.extPunks.methods.offerPunkForSale(this.punkId, priceAsWei).send({
            gasLimit: '1000000',
            gasPrice: new this.hmy.utils.Unit('10').asGwei().toWei(),
          }).on('transactionHash', (hash) => {
            console.log('hash', hash)
            let hashText = hash.slice(0, 12)+"...."+hash.slice(-8)
            this.$notify({
              title: 'tx created success',
              dangerouslyUseHTMLString: true,
              message: '<a href="https://explorer.harmony.one/#/tx/'+hash+'" target="_blank">'+hashText+'</a>',
              duration: 8000,
              type: 'info'
            });
          }).on('receipt', (receipt) => {
              console.log('receipt', receipt)
          }).on('confirmation', (confirmationNumber, receipt) => {
              console.log('confirmationNumber', confirmationNumber, receipt)
              this.isForSaleLoading = false
              let resSet = confirmationNumber.split(':')
              if (resSet[0] == 'transaction failed') {
                this.$message({
                  message: confirmationNumber,
                  type: 'error'
                });
              } else {
                this.$message({
                  message: 'set for sale price success',
                  type: 'success'
                });
                window.location.reload()
              }
          }).on('error', console.error)
        }
      }).catch((err) => {   
        console.log(err)
      });
    },
    buyPunk() {
      this.isBuyLoading = true
      this.extPunks.methods.buyPunk(this.punkId).send({
        value: new this.hmy.utils.Unit(this.forSalePrice).asOne().toWei(),
        gasLimit: '1000000',
        gasPrice: new this.hmy.utils.Unit('10').asGwei().toWei(),
      }).on('transactionHash', (hash) => {
        console.log('hash', hash)
        let hashText = hash.slice(0, 12)+"...."+hash.slice(-8)
        this.$notify({
          title: 'tx created success',
          dangerouslyUseHTMLString: true,
          message: '<a href="https://explorer.harmony.one/#/tx/'+hash+'" target="_blank">'+hashText+'</a><br>please wait a moment...',
          duration: 8000,
          type: 'info'
        });
      }).on('receipt', (receipt) => {
          console.log('receipt', receipt)
      }).on('confirmation', (confirmationNumber, receipt) => {
          console.log('confirmationNumber', confirmationNumber, receipt)
          this.isBuyLoading = false
          this.$message({
            message: 'buy punk success',
            type: 'success'
          });
      }).on('error', console.error)
    },
    bidPunk() {
      let priceAsWei = 0
      this.$prompt('set your for bid price', 'notice', {
        confirmButtonText: 'set',
        cancelButtonText: 'cancel',
        inputPattern: /^(([^0][0-9]+|0)\.([0-9]{1,6})$)|^(([^0][0-9]+|0)$)|^(([1-9]+)\.([0-9]{1,6})$)|^(([1-9]+)$)/,
        inputErrorMessage: 'please enter a correct price'
      }).then(({ value }) => {
        if (value > 0) {
          if (value <= this.bidValue) {
            this.$message({
              message: 'bid price need above the exist bid',
              type: 'error'
            });
            return false
          }
          this.isBidLoading = true
          priceAsWei = new this.hmy.utils.Unit(value).asOne().toWei()
          this.extPunks.methods.enterBidForPunk(this.punkId).send({
            value: priceAsWei,
            gasLimit: '1000000',
            gasPrice: new this.hmy.utils.Unit('10').asGwei().toWei(),
          }).on('transactionHash', (hash) => {
            console.log('hash', hash)
            let hashText = hash.slice(0, 12)+"...."+hash.slice(-8)
            this.$notify({
              title: 'tx created success',
              dangerouslyUseHTMLString: true,
              message: '<a href="https://explorer.harmony.one/#/tx/'+hash+'" target="_blank">'+hashText+'</a><br>please wait a moment...',
              duration: 8000,
              type: 'info'
            });
          }).on('receipt', (receipt) => {
              console.log('receipt', receipt)
          }).on('confirmation', (confirmationNumber, receipt) => {
              console.log('confirmationNumber', confirmationNumber, receipt)
              this.isBidLoading = false
              let resSet = confirmationNumber.split(':')
              if (resSet[0] == 'transaction failed') {
                this.$message({
                  message: confirmationNumber,
                  type: 'error'
                });
              } else {
                this.$message({
                  message: 'set bid price success',
                  type: 'success'
                });
                window.location.reload()
              }
          }).on('error', console.error)
        }
      }).catch((err) => {   
        console.log(err)
      });
    },
    acceptBid() {
      this.isBuyLoading = true
      this.extPunks.methods.acceptBidForPunk(this.punkId).send({
        value: new this.hmy.utils.Unit(this.forSalePrice).asOne().toWei(),
        gasLimit: '1000000',
        gasPrice: new this.hmy.utils.Unit('10').asGwei().toWei(),
      }).on('transactionHash', (hash) => {
        console.log('hash', hash)
        let hashText = hash.slice(0, 12)+"...."+hash.slice(-8)
        this.$notify({
          title: 'tx created success',
          dangerouslyUseHTMLString: true,
          message: '<a href="https://explorer.harmony.one/#/tx/'+hash+'" target="_blank">'+hashText+'</a><br>please wait a moment...',
          duration: 8000,
          type: 'info'
        });
      }).on('receipt', (receipt) => {
          console.log('receipt', receipt)
      }).on('confirmation', (confirmationNumber, receipt) => {
          console.log('confirmationNumber', confirmationNumber, receipt)
          this.isBuyLoading = false
          this.$message({
            message: 'buy punk success',
            type: 'success'
          });
      }).on('error', console.error)
    },
    getHistoryTransaction() {
      
    },
  },
  mounted: function () {
    this.punkDesc = punksDescConfig[this.punkId]
    this.loadAccessories()

    // to avoid load failed
    setTimeout(() => {
      this.loadImage(this.punkId)
    }, 100)

    this.initContract().then(async () => {
      // get punk owner
      await this.getPunkOwner()

      // check if punk offered for sale
      await this.getPunkOfferedForSale()

      // check if punk has bid
      await this.getPunkBids()

      await this.getHistoryTransaction()

      this.isLoadFinish = true
    })
  }
};
</script>

<style>
  .punk-breadcrumb {
    padding: 8px 15px;
    background-color: #f5f5f5;
    font-size: 18px;
  }
  .punk-breadcrumb .is-link {
    font-weight: normal;
    color: #409EFF;
  }
  .banner-owner {
    background-color: #638596;
    min-height: 200px;
    text-align: center;
    padding-top: 25px;
  }
  .punk-title {
    margin-top: 40px;
    font-size: 40px;
    font-weight: 700;
  }
  .punk-sub-title {
    margin-top: 50px;
    margin-bottom: 10px;
    font-size: 28px;
    font-weight: 700;
  }
  .punk-status-text {
    font-size: 18px;
  }
  .punk-owner-b32, .punk-for-sale-price, .punk-bid-price, .punk-bidder-b32 {
    color: #409EFF;
    font-weight: 700;
  }
  .row-panel {
    margin-top: 20px;
  }
  .row-panel .el-button {
    width: 100%;
  }
  .punk-desc {
    font-size: 20px;
    margin-bottom: 10px;
  }
  .punk-sex .punk-sex-title {
    color: #409EFF;
  }
  .accessory-title {
    font-weight: 700;
    color: #409EFF;
    margin-bottom: 5px;
    font-size: 18px;
  }
  .accessory-count {
    margin-bottom: 20px;
    font-size: 16px;
  }
  .accessory-count .count {
    font-weight: 700;
    font-size: 18px;
  }
</style>
