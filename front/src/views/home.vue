<template>
  <div class="home">
    <el-row>
      <el-col :span="16" :offset="4">
        <el-row>
          <el-col :span="24">
            <div class="row-logo">
              <el-image :src="logoSrc" fit="contain"></el-image>
            </div>
          </el-col>
        </el-row>
        <el-row class="row-intro">
          <el-col :span="24">
            <h1 class="intro-title">HarmonyPunks</h1>
            <div class="intro-content">
              Currently 22 unique collectible characters with proof of ownership stored on the Harmony blockchain. Inspired by Harmony's culture "what you do is who you are", with the Harmony ERC-721 standard, we not only power the digital art and collectibles, also deliver our core values in Harmony through the "Non-Fungible Token".
            </div>
          </el-col>
        </el-row>
        <el-row class="row-punks">
          <el-col :span="24">
            <el-row>
              <el-col :span="4" v-for="punk in punkImages" :key="punk.id" class="punks-item">
                <router-link :to="'/punk/'+punk.id">
                  <el-image
                    style="width: 100px; height: 100px"
                    :src="punk.image"
                    fit="contain"></el-image>
                </router-link>
              </el-col>
            </el-row>
            <div class="punks-harmony-more">
              <el-link type="primary" href="https://www.harmony.one/team" target="_blank">See 25 Harmonauts and Team Culture 👉</el-link>
            </div>
          </el-col>
        </el-row>
        <el-row class="row-rule">
          <el-col :span="24">
            <div class="rule-content">
              The HarmonyPunks are 22 uniquely generated characters. No two are exactly alike, and each one of them can be officially owned by a single person on the Harmony blockchain. Originally, they could be claimed for free by anybody with an Harmony wallet, but all 18 were quickly claimed. Now they must be purchased from someone via the marketplace that's also embedded in the blockchain. Via this market you can buy, bid on, and offer punks for sale. The Harmonauts figure above is connected to the Harmony network and has been colored to show you the status of every Punk in the market. Punks with a blue background have been claimed. Punks with a red background are available for sale by their owner. Finally, punks with a purple background have an active bid on them. You can click to zoom in on a Punk and reveal its details.
            </div>
          </el-col>
        </el-row>
        <el-row class="row-stat">
          <el-col :span="24">
            <h2>Overall Stats</h2>
            <div class="stat-set">
              <el-row>
                <el-col :span="8">
                  <div>Estimated Market Cap</div>
                  <div class="stat-value">17K $ONE</div>
                </el-col>
                <el-col :span="8">
                  <div>Total Value of All Sales</div>
                  <div class="stat-value">11.2K $ONE</div>
                </el-col>
                <el-col :span="8">
                  <div>Average Sale Price</div>
                  <div class="stat-value">271 $ONE</div>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>
        <el-row class="row-news">
          <el-col :span="24">
            <h2>News</h2>
            <div class="news-title">
              <el-link type="primary">May Updates: Open Staking, BUSD Launch & ONE Anniversary</el-link>
            </div>
            <div class="news-date">Jun 2, 2020</div>
            <div class="news-title">
              <el-link type="primary">CEO’s Keynote: Scaling Privacy, Secure Staking, Radical Fairness</el-link>
            </div>
            <div class="news-date">Sep 29, 2019</div>
            <div class="news-title">
              <el-link type="primary">Team 2020 Plan: CrossFi, Open Dev, Auditable Privacy</el-link>
            </div>
            <div class="news-date">Jan 11, 2020</div>
          </el-col>
        </el-row>
        <!-- <el-row class="row-news">
          <el-col :span="24">
            <h2>Recent Transactions</h2>
          </el-col>
        </el-row> -->
        <!-- <el-row class="row-for-sale">
          <el-col :span="24">
            <h2>For Sale</h2>
          </el-col>
        </el-row> -->
        <el-row class="row-what">
          <el-col :span="24">
            <h2>What is a HarmonyPunks?</h2>
            <div class="what-content">
              The HarmonyPunks are 24x24 pixel art images, generated algorithmically. Most are punky-looking guys and girls, but there are a few rarer types mixed in: Apes, Zombies and even the odd Alien. Every punk has their own profile page that shows their attributes as well as their ownership/for-sale status (here's an example).
            </div>
          </el-col>
        </el-row>
        <el-row class="row-how">
          <el-col :span="24">
            <h2>How do I get a Punk?</h2>
            <div class="how-content">
              <p>1.Download and install a Chrome browser plugin called MathWallet. This will allow websites (that you authorize) access to your Harmony account.</p>
              <p>2.If you made a new account, buy some $ONE. You can buy $ONE from <el-link type="primary" :underline="false" href="https://docs.harmony.one/home/partners/ecosystem#exchanges">these</el-link> exchanges.</p>
              <p>3.Once you have the plugin installed, this website will recognize it and add buttons that allow you to bid on, buy and sell punks directly in the interface.</p>
              <p>4.For example, you can buy Punk <router-link :to="'/punk/1'"><el-link type="primary" :underline="false">#1</el-link></router-link> for 300,319 $ONE.</p>
            </div>
          </el-col>
        </el-row>
        <el-row class="row-search-punks">
          <el-col :span="24">
            <h2>Search Punks</h2>
            <el-row class="search-content">
              <el-col :span="20">
                <el-input v-model="searchPunkId" placeholder="input punkId you want to get"></el-input>
              </el-col>
              <el-col :span="4">
                <el-button type="success" icon="el-icon-search" @click="getPunk">Search!</el-button>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { Harmony, HarmonyExtension } from '@harmony-js/core'
import { ChainID, ChainType } from '@harmony-js/utils'
import { contractConfig } from '../config.js'

export default {
  name: 'home',
  data () {
    return {
      punkImages: [],
      logoSrc: require('../assets/punks-logo.png'),
      extPunks: null,
      searchPunkId: ''
    }
  },
  methods: {
    waitForInjected() {
      return new Promise((resolve) => {
        const check = () => {
            if (!window.harmony) setTimeout(check, 250)
            else resolve(window.harmony)
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

      // this.state.players = await this.extPunks.methods.punkIndexToAddress(0).call({
      //   gasLimit: '1000000',
      //   gasPrice: new this.hmy.utils.Unit('10').asGwei().toWei(),
      // }).then(function (data) {
      //   console.log(data)
      // })
      // this.state.balance = await this.hmy.blockchain.getBalance({address: this.extPunks.address})
    },
    async setPunkInitOwner() {
      let newOwner = 'one1sj98rxxp4edltlc7wvjv6kt5tthaaw94xc98s6'//'one1sj98rxxp4edltlc7wvjv6kt5tthaaw94xc98s6' or 'one1es026ry3gze2auq6tg55e594cl5ghnsjf4gjde'
      await this.extPunks.methods.setInitialOwner(this.hmy.crypto.fromBech32(newOwner), 16).send({
        gasLimit: '1000000',
        gasPrice: new this.hmy.utils.Unit('0.005').asGwei().toWei(),
      }).on('transactionHash', function (hash) {
        console.log('hash', hash)
      }).on('receipt', function (receipt) {
          console.log('receipt', receipt)
      }).on('confirmation', async (confirmationNumber, receipt) => {
          console.log('confirmationNumber', confirmationNumber, receipt)
      }).on('error', console.error)
    },
    async setAllInitialOwnersAssigned() {
      await this.extPunks.methods.allInitialOwnersAssigned().send({
        gasLimit: '1000000',
        gasPrice: new this.hmy.utils.Unit('0.005').asGwei().toWei(),
      }).on('transactionHash', function (hash) {
        console.log('hash', hash)
      }).on('receipt', function (receipt) {
          console.log('receipt', receipt)
      }).on('confirmation', async (confirmationNumber, receipt) => {
          console.log('confirmationNumber', confirmationNumber, receipt)
      }).on('error', console.error)
    },
    async getPunk() {
      await this.extPunks.methods.getPunk(16).send({
        gasLimit: '1000000',
        gasPrice: new this.hmy.utils.Unit('0.005').asGwei().toWei(),
      }).on('transactionHash', function (hash) {
        console.log('hash', hash)
      }).on('receipt', function (receipt) {
          console.log('receipt', receipt)
      }).on('confirmation', async (confirmationNumber, receipt) => {
          console.log('confirmationNumber', confirmationNumber, receipt)
      }).on('error', console.error)
    },
    loadImage() {
      for (let index = 1; index < 23; index++) {
        let imageIndex = (index < 10) ? '0' + index : '' + index;
        this.punkImages.push({
          id: index,
          image: require('../assets/punks/' + imageIndex + '.png')
        })
      }
    },
    searchPunk() {
      this.$router.push('/punk/'+this.searchPunkId)
    }
  },
  created: function () {
    this.hmy = new Harmony(this.url, {
      chainType: ChainType.Harmony,
      chainId: ChainID.HmyMainnet
    })

    // load punks image
    this.loadImage()
  },
  mounted: function () {
    this.initContract()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.row-logo,.row-punks {
  text-align: center;
}
.row-intro .intro-title {
  font-size: 40px;
}
.row-intro .intro-content, .row-rule .rule-content, .row-what .what-content, .row-how .how-content {
  font-size: 18px;
  line-height: 30px;
  margin-bottom: 20px;
}
.row-punks .punks-item {
  padding: 10px 0;
  background: #638596;
}
.row-punks .punks-harmony-more {
  margin: 10px 50px 20px 0;
  text-align: right;
}
.row-punks .punks-harmony-more .el-link {
  font-weight: 700;
}
.row-stat .stat-set {
  font-size: 18px;
  margin-bottom: 20px;
}
.row-stat .stat-set .stat-value{
  font-weight: 700;
}
.row-news .news-title .el-link {
  font-size: 17px;
  font-weight: 700;
}
.row-news .news-date {
  font-size: 17px;
  font-weight: 700;
  margin-bottom: 30px;
}
.row-how .how-content .el-link {
  font-size: 18px;
  font-weight: 700;
}
.row-search-punks .search-content {
  margin-bottom: 40px;
  text-align: center;
}
a {
  text-decoration: none;
  color: #409EFF;
}
</style>
