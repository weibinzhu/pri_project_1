import Vue from 'vue'
import Vuex from 'vuex'

// 使用 vuex
Vue.use(Vuex)

// 创建一个对象来保存应用启动时的初始状态
const  state = {
  globalDOMAIN :'http://xingxia.sz.ztbweb.cn/index.php/', // 接口域名
  userId:'', // 用户ID
  taskFilterActiveIndex: -1,
  taskFilterPanelShow:false,
  taskFilterActiveIndex_xiake: -1,
  taskFilterPanelShow_xiake:false,
}

// 创建一个对象存储一系列我们接下来要写的 mutation 函数
const  mutations = {
  setUserId(state,payload) {
    state.userId = payload.userId
  },
  changeTaskFilterActiveIndex (state,payload) {
    state.taskFilterActiveIndex = payload.index
    state.taskFilterPanelShow = payload.show
  },
  changeTaskFilterActiveIndex_xiake (state,payload) {
    state.taskFilterActiveIndex_xiake = payload.index
    state.taskFilterPanelShow_xiake = payload.show
  },
}

// 整合初始状态和变更函数，我们就得到了我们所需的 store
// 至此，这个 store 就可以链接到我们的应用中
export default new Vuex.Store({
  state, mutations
})
