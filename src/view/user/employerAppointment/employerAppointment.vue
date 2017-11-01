<template>
  <div class="employerAppointmentWrapper">
    <v-header title="我预约的"></v-header>
    <div class="employerAppointmentItem" v-for="(item,index) in tasks" :key="index">
      <div class="employerAppointmentItemInfo">
        <div class="itemName">
          {{item.name}}
        </div>
        <div class="itemPrice">
          ￥{{item.price}}<span>{{statusText(item)}}</span>
        </div>
      </div>
      <div class="employerAppointmentItemBtn">
        <div @click.stop="toggleModel('.deleteModel','showDeleteModel',item.orderId)" class="deleteBtn"
             v-if="item.status == 3 || item.order_status == 1">删除
        </div>
        <router-link tag="div" :to="{name:'taskDetail', params:{id:item.orderId,status:item.status,type:2}}"
                     class="modifyBtn">查看详情
        </router-link>
        <router-link :to="{name:'toRateTask',params:{taskId:orderId}}" tag="div" class="rateBtn" v-if="item.order_status == 5">评价</router-link>
      </div>
    </div>
    <transition name="deleteModelFade">
      <div class="deleteModel" v-show="showDeleteModel">
        <div class="showText">
          <div class="title">删除</div>
          <div class="desc">删除后不可恢复</div>
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
        typeList: ['待确认', '被回拒', '待支付', '服务中', '待评价', '已完成'],
        statusList: ['0-已选择', '1-被回拒', '2-托管资金', '3-已支付', '4-评价', '5-交易成功', '6-未选择', '7-暂无竞标'],
        tasks: [
          // type解释：0-待确认，1-被回拒，2-待支付，3-服务中，4-待评价，5-已完成
          // status解释：0-已选择，1-已放弃（被回拒），2-托管资金，3-已支付，4-评价，5-交易成功，6-未选择，7-暂无竞标，
          {
            name: '加载中',
            price: '加载中',
            taskId: 1,
            orderId: 1,
            type: 0,
            status: 7,
          },
        ],
        showDeleteModel: false,
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
    created() {
      this.getBookList()
    },
    methods: {
      statusText(item) {
        switch (item.status) {
          case '2':
            return '已删除'
          case '3':
            return '被回拒'
        }
        switch (item.order_status) {
          case '1':
            return '待确认'
          case '3':
            return '待支付'
          case '4':
            return '服务中'
          case '5':
            return '待评价'
          case '99':
            return '服务已完成'
        }
      },// 状态显示文字
      getBookList() {
        this.$http.get(`${this.globalDOMAIN}Employ/Service/getBookList`, {
          emulateJSON: true,
          headers: {'token': this.token},
        }).then(res => {
          this.processBookData(res.body.data)
        })
      },// 获取预约列表
      processBookData(data) {
//        tasks: [
//          // type解释：0-待确认，1-被回拒，2-待支付，3-服务中，4-待评价，5-已完成
//          // status解释：0-已选择，1-已放弃（被回拒），2-托管资金，3-已支付，4-评价，5-交易成功，6-未选择，7-暂无竞标，
//          {
//            name: '英语主持服务',
//            price: '15000-59500',
//            taskId: 1,
//            orderId:1,
//            type: 0,
//            status: 0,
//          },
//        ],
        this.tasks = []
        if (data) {
          for (let item of data) {
            let tempItem = {
              name: item.service.title,
              price: item.service.price,
              taskId: item.service_id,
              orderId: item.id,
              status: item.status,
              order_status: item.order_status,
//              type: 0,
//              status: 0,
            }
            this.tasks.push(tempItem)
          }
        } else {
          this.$vux.toast.text('暂无数据')
        }
      },// 处理列表数据

      toggleModel(selector, flag, id) {
        // 弹出或隐藏某个框
        // selector: String, 用于传给querySelector
        // flag: String, 用于确定是哪一个框
        let y = window.scrollY + 200;
        let model = document.querySelector(selector)
        model.style.top = y + 'px'
        this[flag] = !this[flag]
        model.dataset.toBeProcessedId = id// 修改特定框的绑定参数
      },
      deleteItem() {
        // 删除某项
        let id = document.querySelector('.deleteModel').dataset.toBeProcessedId
        this.$http.post(`${this.globalDOMAIN}Employ/Service/giveUp`,{
          'order_id':id
        },{
          emulateJSON: true,
          headers: {'token': this.token},
        }).then(res=>{
          if(res.body.msg){
            this.$vux.toast.text(res.body.msg)
          }
        })
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
      background-color: #ffffff
      .employerAppointmentItemInfo
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
      .employerAppointmentItemBtn
        display: flex
        flex-wrap: wrap
        flex-direction: row
        justify-content: flex-end
        align-items: center
        height: px2-2-rem(94)
        padding: 0 px2-2-rem(38)
        border-top: 1px solid #e5e5e5
        .deleteBtn, .modifyBtn, .rateBtn
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

  .deleteModelFade-leave-active, .deleteModelFade-enter-active, .overlayFade-leave-active, .overlayFade-enter-active
    transition: all .5s

  .deleteModelFade-enter, .deleteModelFade-leave-to, .overlayFade-enter, .overlayFade-leave-to
    opacity: 0
</style>
