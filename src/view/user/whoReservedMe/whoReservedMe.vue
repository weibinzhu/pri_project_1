<template>
  <div class="whoReservedMeWrapper">
    <v-header title="谁预约我"></v-header>
    <div class="whoReservedMeItem" v-for="(item,index) in tasks" :key="index">
      <div class="whoReservedMeItemInfo">
        <div class="itemName">
          {{item.name}} status：{{statusList[item.status]}}
        </div>
        <div class="itemPrice">
          ￥{{item.price}}<span :class="item.status==0?'hightlight':''">{{typeList[item.status]}}</span>
        </div>
      </div>
      <div class="whoReservedMeItemFooter">
        <div class="companyWrapper">
          <img :src='item.companyLogo'/>
          <div class="companyName">{{item.company}}</div>
          <tag v-if="item.isCertificated"></tag>
        </div>
        <div class="whoReservedMeItemBtn">
          <div @click.stop="toggleModel('.giveUpModel','showGiveUpModel')" class="giveUpBtn" v-if="item.status == 1">放弃</div>
          <router-link tag="div" :to="{name:'reservationDetail', params:{id:item.orderId,status:item.status,type:2}}"
                       class="moreBtn">查看详情</router-link>
        </div>
      </div>
    </div>
    <transition name="giveUpModelFade">
      <div class="giveUpModel" v-show="showGiveUpModel">
        <div class="showText">
          <div class="title">是否确认放弃该服务邀约</div>
          <div class="desc">告知当前状态，信息和解决办法</div>
        </div>
        <div class="actionBtnWrapper">
          <div @click.stop="giveUpItem" class="confirmBtn">是</div>
          <div @click.stop="toggleModel('.giveUpModel','showGiveUpModel')" class="cancelBtn">否</div>
        </div>
      </div>
    </transition>
    <transition name="overlayFade">
      <div class="overlay" v-show="showGiveUpModel"></div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import header from '@/components/v-header/v-header'
  import Tag from '@/components/tag'
  export default {
    data() {
      return {
        typeList: ['未接受', '洽谈中', '服务中', '待评价', '已完成'],
        statusList: ['0-初始', '1-待评价', '2-已成功'],
        tasks: [
          // type解释：'0未接受', '1洽谈中', '2服务中', '3待评价', '4已完成'
          // status解释：'0-初始', '1-待评价', '2-已成功'
          {
            name: '加载中',
            price: '加载中',
            company: '加载中',
            companyLogo: '/static/icon@3x.png',
            isCertificated: false,
            taskId: 1,
            type: 0,
            status: 0,
          },
        ],
        showGiveUpModel: false,
      }
    },
    computed: {
      globalDOMAIN() {
        return this.$store.state.globalDOMAIN
      },
      token() {
        return sessionStorage.getItem('token')
      }
    },
    created(){
      this.getOrderList()
    },
    methods: {
      getOrderList() {
        this.$http.get(`${this.globalDOMAIN}Employ/Service/getOrderList`, {
          emulateJSON: true,
          headers: {'token': this.token},
        }).then(res => {
          if(res.body.status){
            this.processOrderData(res.body.data)
          }else{
            this.$vux.toast.text(res.body.msg)
          }
        })
      },// 获取预约我的列表
      processOrderData(data) {
//        tasks: [
        // type解释：'0未接受', '1洽谈中', '2服务中', '3待评价', '4已完成'
        // status解释：'0-初始', '1-待评价', '2-已成功'
//        {
//          name: '英语主持服务',
//          price: '15000-59500',
//          company: '主题邦科技',
//          companyLogo: '/static/icon@3x.png',
//          isCertificated: true,
//          taskId: 1,
//          type: 0,
//          status: 0,
//        },
//      ],
        this.tasks = []
        if(data){
          for (let item of data) {
            let tempItem = {
              name: item.service.title,
              price: item.service.price,
              company:item.employ.username,
              taskId: item.service_id,
              orderId:item.id,
              // 以下是暂无数据，空着的
              isCertificated: true,
              companyLogo: '/static/icon@3x.png',
              type: 0,
              status: 0,
            }
            this.tasks.push(tempItem)
          }
        }else{
          this.$vux.toast.text('暂无数据')
        }
      },// 处理列表数据


      toggleModel(selector,flag){
        // 弹出或隐藏某个框
        // selector: String, 用于传给querySelector
        // flag: String, 用于确定是哪一个框
        let y = window.scrollY + 200;
        let model = document.querySelector(selector)
        model.style.top = y + 'px'
        this[flag] = !this[flag]
      },
      giveUpItem() {
        // 放弃某项
        console.log('gived up!')
        this.showGiveUpModel = !this.showGiveUpModel
      }
    },
    components: {
      Tag,
      'v-header': header
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../../common/style/fun.styl"
  .whoReservedMeWrapper
    display: flex
    flex-direction: column
    align-items: center
    min-height: 100vh
    font-size: px2-2-rem(32)
    background-color: #f8f8f8
    padding-bottom: 1.1466rem
    .whoReservedMeItem
      display: flex
      flex-direction: column
      font-size: px2-2-rem(32)
      width: px2-2-rem(710)
      height: px2-2-rem(285)
      border-radius: px2-2-rem(8)
      margin: px2-2-rem(20) 0
      background-color: #ffffff
      .whoReservedMeItemInfo
        display: flex
        flex-direction: column
        justify-content: space-around
        height: px2-2-rem(188)
        padding: 0 px2-2-rem(38)
        .itemName
          color: #353535
        .itemPrice
          display: flex
          justify-content: space-between
          font-size: px2-2-rem(26)
          color: #e4790f
          span
            color: #00a0e9
          .hightlight
            color: #f0724f
      .whoReservedMeItemFooter
        display: flex
        flex-wrap: wrap
        flex-direction: row
        justify-content: space-between
        padding: 0 px2-2-rem(38)
        border-top: 1px solid #e5e5e5
        .companyWrapper
          display: flex
          flex-wrap: wrap
          flex-direction: row
          align-items: center
          color: #b3b3b3
          font-size: px2-2-rem(26)
          img
            width: px2-2-rem(50)
            height: px2-2-rem(50)
            margin-right: px2-2-rem(20)

      .whoReservedMeItemBtn
        display: flex
        flex-wrap: wrap
        flex-direction: row
        justify-content: flex-end
        align-items: center
        height: px2-2-rem(94)
        .giveUpBtn, .moreBtn
          font-size: px2-2-rem(26)
          border: 1px solid #cfcfcf
          border-radius: px2-2-rem(8)
          width: px2-2-rem(128)
          margin-left: px2-2-rem(20)
          height: px2-2-rem(50)
          line-height: px2-2-rem(50)
          text-align: center
          color: #888888
    .overlay {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 1000;
      background-color: rgba(0, 0, 0, .8);
    }

  //    【弹框】
  .giveUpModel
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
      .desc
        font-size: 0.42666rem
        color: #d2d3d5
        text-align: center
    .actionBtnWrapper
      display: flex
      flex-direction: row
      align-items: center
      justify-content: center
      width: 100%
      height: 1.3333rem
      border-top: 1px solid #d2d3d5
      .confirmBtn, .cancelBtn
        box-sizing: border-box
        flex: 1
        height: 1.3333rem
        line-height: 1.3333rem
        text-align: center
      .cancelBtn
        color: #00a0e9
        border-left: 1px solid #cccccc

  .giveUpModelFade-leave-active, .giveUpModelFade-enter-active, .overlayFade-leave-active, .overlayFade-enter-active
    transition: all .5s

  .giveUpModelFade-enter, .giveUpModelFade-leave-to, .overlayFade-enter, .overlayFade-leave-to
    opacity: 0
</style>
