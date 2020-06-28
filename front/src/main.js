import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App.vue'
import router from './router/index.js'
import webUtil from './util.js'
import { contractConfig } from './config.js'
import { Harmony } from '@harmony-js/core'
import { ChainID, ChainType } from '@harmony-js/utils'

Vue.config.productionTip = false

// create a harmony instance
const hmy = new Harmony(
  contractConfig.url,
  {
    chainType: ChainType.Harmony,
    chainId: ChainID.HmyMainnet,
  }
)

// get a contract instance
const contract = hmy.contracts.createContract(contractConfig.abi, contractConfig.address);

Vue.prototype.hmy = hmy;
Vue.prototype.punkContract = contract;
Vue.prototype.webUtil = webUtil;

// load element UI
Vue.use(ElementUI);
Vue.use(VueAxios, axios)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
