<template>
  <div class="employerAppointmentWrapper">
    <v-header title="我预约的"></v-header>
    <router-link tag="div" :to="{name:'taskDetail', params:{id:item.taskId,status:item.status,type:2}}" class="employerAppointmentItem"
                 v-for="(item,index) in tasks" :key="index">
      <div class="employerAppointmentItemInfo">
        <div class="itemName">
          {{item.name}} status：{{statusList[item.status]}}
        </div>
        <div class="itemPrice">
          ￥{{item.price}}<span>{{typeList[item.status]}}</span>
        </div>
      </div>
      <div class="employerAppointmentItemBtn">
        <div @click.stop="toggleModel('.deleteModel','showDeleteModel')" class="deleteBtn" v-if="item.status == 0 || item.status == 1">删除</div>
        <div class="modifyBtn">查看详情</div>
        <router-link to="/toRateTask" tag="div" class="rateBtn" v-if="item.status == 4">评价</router-link>
      </div>
    </router-link>
    <transition name="deleteModelFade">
      <div class="deleteModel" v-show="showDeleteModel">
        <div class="showText">
          <div class="title">删除任务</div>
          <div class="desc">删除任务后不可恢复</div>
        </div>
        <div class="actionBtnWrapper">
          <div @click.stop="deleteItem" class="confirmBtn">确定</div>
          <div @click.stop="toggleModel('.deleteModel','showDeleteModel')" class="cancelBtn">取消</div>
        </div>
      </div>
    </transition>
    <transition name="overlayFade">
      <div class="overlay" v-show="showDeleteModel"></div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import header from '@/components/v-header/v-header'

  export default {
    data() {
      return {
        typeList: ['待确认','被回拒','待支付','服务中','待评价','已完成'],
        statusList:['0-已选择','1-被回拒','2-托管资金','3-已支付','4-评价','5-交易成功','6-未选择','7-暂无竞标'],
        tasks: [
          // type解释：0-待确认，1-被回拒，2-待支付，3-服务中，4-待评价，5-已完成
          // status解释：0-已选择，1-已放弃（被回拒），2-托管资金，3-已支付，4-评价，5-交易成功，6-未选择，7-暂无竞标，
          {
            name: '英语主持服务',
            price: '15000-59500',
            taskId: 1,
            type: 0,
            status: 0,
          },
          {
            name: '英语主持务',
            price: '15000-59500',
            taskId: 2,
            type: 1,
            status: 1,
          },
          {
            name: '英语主持服',
            price: '15000-59500',
            taskId: 3,
            type: 3,
            status: 2,
          },
          {
            name: '英语主持持服持服服务',
            price: '15000-59500',
            taskId: 4,
            type: 2,
            status: 3,
          },
          {
            name: '英语服务',
            price: '15000-59500',
            taskId: 5,
            type: 5,
            status: 4,
          },
          {
            name: '英务',
            price: '15000-59500',
            taskId: 6,
            type: 4,
            status: 5,
          },
          {
            name: '英务da',
            price: '15000-59500',
            taskId: 7,
            type: 2,
            status: 5,
          }
        ],
        showDeleteModel:false,
      }
    },
    methods: {
      toggleModel(selector,flag){
        // 弹出或隐藏某个框
        // selector: String, 用于传给querySelector
        // flag: String, 用于确定是哪一个框
        let y = window.scrollY + 200;
        let model = document.querySelector(selector)
        model.style.top = y + 'px'
        this[flag] = !this[flag]
      },
      deleteItem() {
        // 删除某项
        console.log('deleted!')
        this.showDeleteModel = !this.showDeleteModel
      }
    },
    components: {
      'v-header': header
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../../common/style/fun.styl"
  .employerAppointmentWrapper
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center
    min-height: 100vh
    font-size: px2-2-rem(32)
    background-color: #f8f8f8
    padding-bottom: 1.1466rem
    .employerAppointmentItem
      display: flex
      flex-direction: column
      font-size: px2-2-rem(32)
      width: px2-2-rem(710)
      height: px2-2-rem(285)
      border-radius: px2-2-rem(8)
      margin: px2-2-rem(20) 0
      background-color :#ffffff
      .employerAppointmentItemInfo
        display: flex
        flex-direction: column
        justify-content: space-around
        height: px2-2-rem(188)
        padding: 0 px2-2-rem(38)
        .itemName
          color: #353535
        .itemPrice
          display:flex
          justify-content :space-between
          font-size: px2-2-rem(26)
          color: #e4790f
          span
            color:#00a0e9
      .employerAppointmentItemBtn
        display: flex
        flex-wrap: wrap
        flex-direction: row
        justify-content: flex-end
        align-items: center
        height: px2-2-rem(94)
        padding: 0 px2-2-rem(38)
        border-top: 1px solid #e5e5e5
        .deleteBtn, .modifyBtn,.rateBtn
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
  .deleteModel
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

  .deleteModelFade-leave-active, .deleteModelFade-enter-active,.overlayFade-leave-active, .overlayFade-enter-active
    transition: all .5s

  .deleteModelFade-enter,.deleteModelFade-leave-to, .overlayFade-enter, .overlayFade-leave-to
    opacity: 0
</style>
