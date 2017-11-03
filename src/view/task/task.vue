<template>
  <div class="taskWrapper">
    <sticky>
      <header class="header">
        <img class="logo" src="./logo@3x.png"/>
        <div class="searchWrapper">
          <i class="iconfont icon-sousuo"></i>
          <input type="text" :placeholder="searchPh"/>
        </div>
        <div class="helpWrapper">
          <img src="./service@3x.png" @click="toggleWxId"/>
          <img src="./notice@3x.png"/>
        </div>
      </header>
    </sticky>
    <loading v-show="isLoading"></loading>
    <swiper :list="demo01_list" dots-position="center" height="3.335rem" :show-desc-mask="false"></swiper>
    <ul class="selectWrapper">
      <router-link to="/releaseTask" tag="li" class="selectItem">
        <img class="selectItemImgSm" src="./pic_@3x.png"/>
      </router-link>
      <li class="selectItem">
        <img class="selectItemImgSm" src="./pic_right@3x.png"/>
      </li>
    </ul>
    <div class="dividerWrapper">
      <divider>任务大厅</divider>
    </div>
    <div class="customSticky">
      <ul class="filterWrapper">
        <v-filter v-for="(item,index) in filterItems" :item="item" :index="index" :key="index"></v-filter>
        <transition name="fade">
          <ul class="filterPanel" v-if=taskFilterPanelShow @click="selectChoice">
            <li v-for="(choice,index) in choices" class="choices" :data-id="choice.id" :data-index="index"
                :class="[index==currentChoiceIndex?'active':'']">{{choice.title}}
            </li>
            <p v-if="showNotice">更多城市将逐步开放，敬请期待</p>
          </ul>
        </transition>
      </ul>
    </div>
    <div class="tasksItems" @click="onTaskItemClick">
      <!--<taskitem v-for="(item,index) in taskItems" :key="index" :item="item" v-if="item.status==99"-->
      <!--v-show="(item.location==selectedChoiceIndex[0]||selectedChoiceIndex[0]==0||item.location==0)-->
      <!--&&(item.type==selectedChoiceIndex[1]||selectedChoiceIndex[1]==0)"></taskitem>-->
      <taskitem v-for="(item,index) in taskItems" :key="index" :item="item" v-if="item.status==99"></taskitem>
    </div>
    <transition name="getWxFade">
      <div class="getWxModel" v-show="showGetWxModel">
        <div class="showText">
          <div class="title">请添加客服微信联系我们</div>
          <input class="wxId" :value="wxId" readonly/>
        </div>
        <div class="getWxIdBtn" data-clipboard-target=".wxId" @click="checkIphone">
          点击复制微信号
        </div>
      </div>
    </transition>
    <transition name="overlayFade">
      <div class="overlay" v-show="showGetWxModel" @click="toggleWxId"></div>
    </transition>
    <!--下面的overlay是给筛选栏用的，暂时弃用-->
    <!--<transition name="overlayFade">-->
    <!--<div class="overlay" v-show="taskFilterPanelShow"></div>-->
    <!--</transition>-->
  </div>
</template>

<script type="text/ecmascript-6">
  import Swiper from 'vux/src/components/swiper/swiper.vue';
  import Divider from 'vux/src/components/divider/index.vue'
  import Sticky from 'vux/src/components/sticky/index.vue';
  import Filter from '@/components/filter/filter.vue';
  import TaskItem from '@/view/task/taskItem/taskItem.vue';
  import Clipboard from 'clipboard'
  import loading from '@/components/loading'
  // 放在这里是为了避免多次绑定事件
  var clipboard = new Clipboard('.getWxIdBtn') // 绑定到【点击复制客服微信号】按钮
  clipboard.on('success', (e) => {
    console.log(e)
    alert('复制成功!')
    //clipboard = {} // 清除实例，避免多次生成（似乎没用）
  })
  clipboard.on('error', (e) => {
    console.log(e)
    alert('请选择“拷贝”进行复制!')
  })
  export default {
    data() {
      return {
        isLoading: false,
        demo01_list: [
          {
            url: 'javascript:',
            img: '/static/banner_@3x.png',
          },
          {
            url: 'javascript:',
            img: '/static/banner_@3x.png',
          },
          {
            url: 'javascript:',
            img: '/static/banner_@3x.png',
          }
        ],
        filterItems: ['城市', '类别', '排序'],
        taskItems: [
          // location: 1-北京，2-上海，3-广州，4-深圳。
          // type: 1-设计，2-技术，3-运营，4-市场，5-产品
//          {
//            taskTitle: '社区活动营销方案-北京-设计',
//            taskPrice: '15000-30000',
//            taskDetail: ['一个月内', '按需出勤'],
//            clientName: '主题邦科技',
//            clientTag: '已认证',
//            logo: 'static/icon@3x.png',
//            isCertificated: true,
//            location: 1,
//            id: 1211,// 任务id
//            type: 1,
//          },
        ],
        cityList: [{id: -1, title: '全部'}],
        typeList: [{id: -1, title: '全部'}], // 暂时接行业列表进去
        sortList: [
          {id: -1, title: '全部'},
          {id: 0, title: '创建时间', name: 'inputtime'},
          {id: 1, title: '价格↑', name: 'price_min'},
          {id: 2, title: '价格↓', name: 'price_max'}
        ],
        selectedChoiceIndex: [0, 0, 0], // 保存各个下拉框的选择值的index
        selectedChoiceId: [-1, -1, -1],// 保存各个下拉框的选择值的id
        currentChoiceIndex: 0, // 当前的选择的index
        showGetWxModel: false,
        searchPh: '搜索旅游业者发布的任务', // 搜索框placeholder
      }
    },
    mounted() {
      this.getTaskList()
      // 获取城市、行业列表，并存入vuex
      this.getList('city')
      this.getList('industry')
    },
    computed: {
      globalDOMAIN() {
        return this.$store.state.globalDOMAIN
      },
      token() {
        return sessionStorage.getItem('token')
      },
      taskFilterPanelShow() {
        return this.$store.state.taskFilterPanelShow
      },
      choices() {
        var activeIndex = this.$store.state.taskFilterActiveIndex
        switch (activeIndex) {
          case 0:
            this.currentChoiceIndex = this.selectedChoiceIndex[0] // 将当前选择修改为当前下拉框的值
            return this.cityList
            break
          case 1:
            this.currentChoiceIndex = this.selectedChoiceIndex[1]
            return this.typeList
            break
          case 2:
            this.currentChoiceIndex = this.selectedChoiceIndex[2]
            return this.sortList
            break
          default:
            return []
        }
      },
      showNotice() {
        if (this.$store.state.taskFilterActiveIndex == 0) {
          return true
        }
        return false
      },
      wxId(){
        return this.$store.state.customerService.wechat
      }, // 客服微信号
    },
    methods: {
      getList(type) {
        let url
        switch (type) {
          case 'city':
            url = 'Api/Common/getCity'
            break
          case 'industry':
            url = 'Api/Common/getIndustry'
            break
        }
        this.$http.get(`${this.globalDOMAIN}${url}`).then(res => {
          this.$store.commit('saveBaseData', {baseData: res.body.data.lists, type: type})
          if (type == 'city') {
            this.cityList = this.cityList.concat(this.$store.state.cityList)
          } else {
            this.typeList = this.typeList.concat(this.$store.state.industryList)
          }
        })
      },// 获取城市、行业列表，并存入vuex
      selectChoice(event) {
        if (event.target.dataset.index != undefined) {
          // id用于发送请求，index用于显示当前选中的项的蓝色框
          this.selectedChoiceId[this.$store.state.taskFilterActiveIndex] = event.target.dataset.id
          this.selectedChoiceIndex[this.$store.state.taskFilterActiveIndex] = event.target.dataset.index
          this.currentChoiceIndex = event.target.dataset.index
          this.getTaskList()
        }
      },
      onTaskItemClick(e) {

        let that = this

        // id只绑定在最外层，如果点击到内层元素则不断向外层寻找，直到寻找到最外层为止
        function _getId(node) {
          if (node.className == 'taskItemWrapper') {
            that.$router.push({name: 'taskDetail', params: {id: node.dataset.id, type: 0}})
            return
          } else {
            _getId(node.parentElement)
          }
        }

        _getId(e.target)
      },// 点击任务项，编程式导航到任务详情页
      toggleWxId() {
        let y = window.scrollY + 200;
        let model = document.querySelector(".getWxModel")
        model.style.top = y + 'px'
        this.showGetWxModel = !this.showGetWxModel
      },// 弹出或隐藏【点击复制客服微信】框
      checkIphone() {
        if (navigator.userAgent.match(/ipad|ipod|iphone/i)) {
          alert('如果复制失败请手动复制')
        }
      },// 优雅降级。（暂时不需要用）
      getTaskList() {
        let city, task_type, order, token

        if (this.selectedChoiceId[0] == -1) {
          city = ''
        } else {
          city = this.cityList.find(function (item) {
            return item.id == this.selectedChoiceId[0]
          }, this).title
        }

        if (this.selectedChoiceId[1] == -1){
          task_type:''
        } else {
          task_type = this.typeList.find(function (item) {
            return item.id == this.selectedChoiceId[1]
          }, this).title
        }

        if (this.selectedChoiceId[2] == -1) {
          order = ''
        }  else {
          order = this.sortList.find(function(item){
            return item.id == this.selectedChoiceId[2]
          },this).name
        }

        token = sessionStorage.getItem('token')
        this.$http.get(`${this.globalDOMAIN}Employ/Task/getList`, {
          params: {
            'city': city,
            'task_type':task_type,
            'order': order
          },
          emulateJSON: true,
          headers: {'token': token}
        }).then((response) => {
          if (response.body.status) {
            let data = response.body.data
            // console.log(data.lists)
            // 处理传回来的数组并赋值
            this.taskItems = this.dataProcess(data.lists)
            // this.deepCopy(this.taskItems, this.original) // 将数组保存（复制一份）到this.original
          } else {
            this.$vux.toast.text('获取任务列表失败')
          }
        })
      },// 发送请求获取数据
      dataProcess(taskList) {
        let tempList = []
        if(taskList){
          for (let task of taskList) {
            // 构造数据
            let tempItem = {
              taskTitle: task.title,
              minPrice: task.price_min,
              maxPrice: task.price_max,
              taskId: task.id,
              cycle: task.cycle,
              workType: task.work_type.split('（')[0],// 必须用中文括号
              clientName: '主题邦科技',
              logo: 'static/icon@3x.png',
              isCertificated: Math.random() > 0.5 ? true : false,
              location: this.cityList.indexOf(task.city),
              type: Math.floor(Math.random() * 4) + 1,
              status: task.status,
              on: task.on,
              order_status: task.order_status
            }
            tempList.push(tempItem)
          }
        }
        return tempList
      },// 处理数据并返回
    },
    components: {
      loading,
      Swiper,
      Divider,
      Sticky,
      "v-filter": Filter,
      "taskitem": TaskItem,
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus"> // 在使用了vux的页面下尽量不要用scoped。也会导致错误
@import "../../common/style/fun.styl"

.taskWrapper {
  font-size: px2-2-rem(32);
  background-color: #f8f8f8;
  min-height: 100vh;
  box-sizing: border-box;
  padding-bottom: 1.9rem; /*防止底部内容被tap bar挡住*/
}

.header {
  width: 100%;
  height: px2-2-rem(90);
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #fff;
}

.taskWrapper .header .logo {

  display: flex;
  flex-grow: 1;
  justify-content center;
  align-items center;
  width: px2-2-rem(70);
  height: px2-2-rem(32);
  margin: 0 px2-2-rem(32);
}

.searchWrapper {
  display: flex;
  flex-grow: 1;
  flex-direction: row;
  align-items: center;
  width: 6.63rem;
  height: 0.73rem;
  border-radius: 5px;
  background-color: #f1f1f3;
  color: #999
  padding-left: 0.4rem;
}

.searchWrapper input {
  background-color: #f1f1f3;
  height: 0.73rem;
}

.searchWrapper i {
  margin-right: 0.213rem;
}

.helpWrapper {
  box-sizing: border-box
  width: px2-2-rem(160)
  display: flex;
  align-items: center;
  padding: 0 px2-2-rem(16);

}

.helpWrapper img {
  margin-right: px2-2-rem(20)
  height: px2-2-rem(46)
  width: px2-2-rem(46)
}

.helpWrapper img:last-child {
  margin: 0;
}

.selectWrapper {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: px2-2-rem(163);
  border-bottom: 1px solid #ccc;
  background: #fff;
}

.selectItem {
  display: flex;
  flex-grow: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 2.13rem;
  /*padding: 0 0.4rem*/
}

.selectItem:last-child {
  border: none
}

.selectItem img {
  width: px2-2-rem(375)
  height: px2-2-rem(163)
}

/*
  .itemImg {
	width: 1.333rem;
	height: 1.333rem;
	margin-left: 0.133rem;
  }

  .itemText {
	font-size: 0.2666rem;
	color: #59514f;
  }

  .itemTextTitle {
	font-size: 0.426rem;
	color: #231815;
	font-weight: 700;
  }
*/
.dividerWrapper {
  padding: 0 0.4rem;
  background-color: #f8f8f8;
  color: #666;
}

.customSticky {
  position: sticky;
  top: 1.2rem;
  z-index: 1000;
}

.filterWrapper {
  display: flex;
  flex-direction: row;
  position: relative;
  height: px2-2-rem(80);
  width: 100%;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  color: #666;
  border-bottom: 1px solid #e5e5e5
}

.filterPanel {
  position: absolute;
  top: 1.11rem;
  left: 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: center;
  background-color: #fff;
  padding: 0.32rem 0 0.32rem 0.32rem;
  z-index: 100;
}

.filterPanel p {
  width: 100%
  color: #999
  text-align: center
  font-size: px2-2-rem(32)
  margin-top: 0.4rem
}

.choices {
  line-height: 1.006rem;
  height: 1.066rem;
  width: 2.827rem;
  text-align: center;
  color: #b7b7b7;
  border: 1px solid #e5e5e5;
  border-radius 5px;
  margin-right: 0.32rem;
  margin-top: 0.32rem;
}

.filterPanel .active {
  color: #00a0e9;
  border: 1px solid #00a0e9;
}

// 动画设置
.fade-enter-active, .fade-leave-active {
  top: 1.11rem
  opacity: 1
  transition: .2s
}

.fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */
{
  opacity: 0;
  top: 0rem
}

/*修改插件样式*/
a .active {
  background-color: #fff !important;
}

.vux-divider {
  font-size: 0.333rem;
  /*height: 1.067rem;*/
}

.overlay {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  background-color: rgba(0, 0, 0, .8);
}

//    【点击复制客服微信弹框】
.getWxModel
  position: absolute
  z-index: 10000
  left: calc(50vw - 3.7333rem)
  display: flex
  flex-direction: column
  align-items: center
  justify-content: space-around
  width: 7.46666rem
  height: 3.8933rem
  font-size: 0.48rem
  border-radius: 10px
  background-color: #fff
  .showText
    display: flex
    flex-direction: column
    align-items: center
    justify-content: space-around
    height: 2.1333rem
    box-sizing: border-box
    .title
      color: #000
    .wxId
      font-size: 0.42666rem
      color: #d2d3d5
      text-align: center
  .getWxIdBtn
    width: 100%
    height: 1.3333rem
    line-height: 1.3333rem
    text-align: center
    border-top: 1px solid #d2d3d5
    color: #00a0e9

.getWxFade-leave-active, .getWxFade-enter-active, .overlayFade-leave-active, .overlayFade-enter-active
  transition: all .5s

.getWxFade-enter, .getWxFade-leave-to, .overlayFade-enter, .overlayFade-leave-to
  opacity: 0

</style>

