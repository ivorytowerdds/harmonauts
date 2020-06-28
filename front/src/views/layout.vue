<template>
  <div id="layout">
    <el-container>
    <el-header>
      <el-row>
        <el-col :span="4" :offset="4">
          <img :src="harmonyLogoSrc" alt="Harmony">
        </el-col>
        <el-col :span="10" class="system-userinfo">
          <div v-if="address != '0x0'">
            <div>Connected to Harmony </div>
            <div class="address">{{ addressText }}</div>
          </div>
        </el-col>
        <el-col :span="2" class="system-button">
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
      harmonyLogoSrc: require('../assets/harmony-logo.svg'),
      address: "0x0"
    }
  },
  mounted: function () {
    let identity = this.webUtil.getCookie("identity_harmony")
    if (identity) {
      identity = JSON.parse(identity)
      this.address = identity.address
    }
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
  .el-container .system-userinfo {
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
</style>
