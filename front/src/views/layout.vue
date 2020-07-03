<template>
  <div id="layout">
    <el-container>
    <el-header>
      <el-row>
        <el-col :lg="3" :xl="4" class="system-placeholder"></el-col>
        <el-col :span="4">
          <img :src="harmonyLogoSrc" alt="Harmony">
        </el-col>
        <el-col :lg="9" :xl="7" class="system-userinfo">
          <div v-if="address != '0x0'">
            <div>Connected to Harmony </div>
            <div class="address">{{ addressText }}</div>
          </div>
        </el-col>
        <el-col :span="5" class="system-button">
            <el-button
              type="success"
              class="button-withdraw"
              @click="withdraw"
              :loading="isWithdrawLoading"
              :disabled="!initDone"
              v-if="address != '0x0'"
            >Withdraw</el-button>
            <el-button
              type="primary"
              class="button-sign-in"
              @click="signIn"
              v-if="address == '0x0'"
            >Sign In</el-button>
            <el-button
              type="danger"
              class="button-sign-out"
              @click="signOut"
              v-else
            >Sign Out</el-button>
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
  </div>
</template>

<script>
import { HarmonyExtension } from '@harmony-js/core'
import { ChainID, ChainType } from '@harmony-js/utils'
import { contractConfig} from '../config.js'

export default {
  name: "layout",
  components: {},
  computed: {
    addressText: function () {
      return this.webUtil.shorterB32Address(this.address)
    }
  },
  data() {
    return {
      extPunks: null,
      gasConfig: {
        gasLimit: contractConfig.defaultGasLimit,
        gasPrice: new this.hmy.utils.Unit(contractConfig.defaultGasPrice).asGwei().toWei(),
      },
      harmonyLogoSrc: require('../assets/harmony-logo.svg'),
      address: "0x0",
      isWithdrawLoading: false,
      initDone: false,
    }
  },
  mounted: function () {
    let identity = this.webUtil.getCookie("identity_harmony")
    if (identity) {
      identity = JSON.parse(identity)
      this.address = identity.address
    }

    this.initContract()
  },
  methods: {
    signIn() {
      if (!window.harmony){
        this.$confirm('wallet not found, go to install?', 'Notice', {
          confirmButtonText: 'Yeah',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          window.open("https://chrome.google.com/webstore/detail/math-wallet/afbcbjpbpfadlkmhmclhkeeodmamcflc");
        }).catch(() => {     
        });
      }else{
        window.harmony.getAccount().then(res=>{
          this.$message({
            message: 'wallet sign in success',
            type: 'success'
          });
          this.address = res.address
          this.webUtil.setCookie("identity_harmony", JSON.stringify(res),{
            expires: 30,
            path: '/'
          });
          window.location.reload()       
        }).catch(err=>{
          this.$message({
            message: 'wallet sign in failed: ' + err,
            type: 'error'
          });
        })
      }
    },
    async signOut() {
      await window.harmony.forgetIdentity()
      this.address = "0x0"
      this.webUtil.setCookie("identity_harmony", null);

      this.$message({
        message: 'wallet sign out success',
        type: 'success'
      });
    },
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
      this.initDone = true
    },
    withdraw() {
      this.isWithdrawLoading = true
      this.extPunks.methods.withdraw().send(this.gasConfig).on('transactionHash', (hash) => {
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
          this.isWithdrawLoading = false
          let resSet = confirmationNumber.split(':')
          if (resSet[0] == 'transaction failed') {
            this.$message({
              message: confirmationNumber,
              type: 'error'
            });
          } else {
            this.$message({
              message: 'withdraw success',
              type: 'success'
            });
          }
      }).on('error', (error) => {
          console.log('error', error)
      })
    }
  }
};
</script>

<style>
  body {
    margin: 0px;
    font-family: Montserrat,sans-serif;
  }
  .el-container {
    padding: 40px 40px 0px 40px;
  }
  .el-container .el-header {
    margin-bottom: 20px;
  }
  .el-container .system-userinfo, .system-placeholder {
    text-align: right;
    border: 1px solid transparent;
  }
  .el-container .system-userinfo .address {
    color: #409EFF;
    font-weight: bold;
  }
  .el-container .system-button {
    text-align: right;
  }
  .button-withdraw, .button-sign-out, .button-sign-in {
    width: 45%;
  }
</style>
