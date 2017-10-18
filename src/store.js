import Vue from 'vue'
import Vuex from 'vuex'

// 使用 vuex
Vue.use(Vuex)

// 创建一个对象来保存应用启动时的初始状态
const  state = {
  count: 0,
  taskFilterActiveIndex: -1,
  taskFilterPanelShow:false,
  taskFilterActiveIndex_xiake: -1,
  taskFilterPanelShow_xiake:false,
}

// 创建一个对象存储一系列我们接下来要写的 mutation 函数
const  mutations = {
  increment (state) {
  state.count++
},
  changeTaskFilterActiveIndex (state,playload) {
    state.taskFilterActiveIndex = playload.index
    state.taskFilterPanelShow = playload.show
  },
  changeTaskFilterActiveIndex_xiake (state,playload) {
    state.taskFilterActiveIndex_xiake = playload.index
    state.taskFilterPanelShow_xiake = playload.show
  },
}

// 整合初始状态和变更函数，我们就得到了我们所需的 store
// 至此，这个 store 就可以链接到我们的应用中
export default new Vuex.Store({
  state, mutations
})
