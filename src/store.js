import Vue from 'vue'
import Vuex from 'vuex'

// 使用 vuex
Vue.use(Vuex)

// 创建一个对象来保存应用启动时的初始状态
const  state = {
  globalDOMAIN :'http://xingxia.sz.ztbweb.cn/index.php/', // 接口域名
  cityList:[],// 数组，用于存放城市列表
  industryList:[], // 存放行业列表
  skillTypeList:[],// 存放技能列表
  customerService:{},// 存放全国总客服的信息


  // 筛选相关，暂时保留
  taskFilterActiveIndex: -1,
  taskFilterPanelShow:false,
  taskFilterActiveIndex_xiake: -1,
  taskFilterPanelShow_xiake:false,
}

// 创建一个对象存储一系列我们接下来要写的 mutation 函数
const  mutations = {
  changeTaskFilterActiveIndex(state, payload) {
    state.taskFilterActiveIndex = payload.index
    state.taskFilterPanelShow = payload.show
  },
  changeTaskFilterActiveIndex_xiake(state, payload) {
    state.taskFilterActiveIndex_xiake = payload.index
    state.taskFilterPanelShow_xiake = payload.show
  },
  saveBaseData(state, payload) {
    switch (payload.type) {
      case 'city':
        state.cityList = payload.baseData
        break
      case 'industry':
        state.industryList = payload.baseData
        break
      case 'skill':
        state.skillTypeList = payload.baseData
        break
      case 'customerService':
        state.customerService = payload.baseData
    }

  },// 保存城市、行业、技能表、全国总客服等信息
}
// 整合初始状态和变更函数，我们就得到了我们所需的 store
// 至此，这个 store 就可以链接到我们的应用中
export default new Vuex.Store({
  state, mutations
})
