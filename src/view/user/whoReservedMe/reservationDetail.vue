<template>
  <div class="reservationDetailWrapper">
    <v-header title="预约订单详情"></v-header>
    <loading v-show="isLoading"></loading>
    <div class="taskId">任务编号：{{id}}</div>
    <div class="taskBasicInfo">
      <div class="taskBasicInfoLeft">
        <div class="taskTitle">{{title}}</div>
        <div class="taskPrice">￥{{price}}</div>
      </div>
      <div class="taskBasicInfoRight">
        <div class="taskDate">{{date}}</div>
        <!--<div class="knowCompanyBtn">进入主页</div>-->
      </div>
    </div>
    <div class="taskDetailInfo">
      <div class="detailInfoHeader"><img class="headerImg" src="./choiceness@3x.png"/>服务要求：</div>
      <p class="requirement">{{requirement}}</p>
    </div>
    <!--各种底部功能条-->
    <footer class="taskDetailFooter taskSelected" v-if="serviceStatus == 0">
      <div class="contact" @click="toggleWxId"><img src="./service@3x.png"/>联系顾问</div>
      <div class="btnWrapperLeft">
        <div class="giveUp">放弃</div>
        <div class="contactXiake">沟通一下</div>
      </div>
      <router-link :to="{name:'serviceContract',params:{orderId:id}}" tag="div" class="viewContractBtn">发起合同
      </router-link>
    </footer>
    <footer class="taskDetailFooter taskComment" v-if="serviceStatus == 1">
      <div class="contact" @click="toggleWxId"><img src="./service@3x.png"/>联系顾问</div>
      <router-link to="/contract" tag="div" class="viewContractBtn">查看合同</router-link>
      <router-link :to="{name:'toRateTask', params:{taskId:id,bidId:-2}}" tag="div" class="comment">评价</router-link>
      <!--taskId这个名字就不改了，bid_id==-2表明这是一个服务发起的评价-->
    </footer>
    <footer class="taskDetailFooter taskSuccess" v-if="serviceStatus == 2">已成功</footer>

    <!--客服-->
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
    <!--遮罩-->
    <transition name="overlayFade">
      <div class="overlay" v-show="showGetWxModel" @click="hideWxModel"></div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import header from "@/components/v-header/v-header"
  import loading from '@/components/loading'
  import {formatDate} from '@/common/utils/utils.js'

  export default {
    name: 'taskDetail',
    data() {
      return {
        isLoading: false,
        wxId: 'fwfa21', // 客服微信号
        showGetWxModel: false,// 客服微信号弹框显隐


        // 预约服务、订单信息
        id: 0, // 订单id
        serviceStatus: 0, // 任务类型，解释：'0-初始', '1-待评价', '2-已成功'
        title: '未查询到', // 服务名称
        price: '未查询到', // 任务价格范围
        date: '未查询到', // 任务日期
        requirement: "未查询到",

      }
    },
    computed: {
      globalDOMAIN() {
        return this.$store.state.globalDOMAIN
      },
      token() {
        return sessionStorage.getItem('token')
      },
    },
    created() {
      this.id = this.$route.params.id
      this.serviceStatus = this.$route.params.status
      this.getBookInfo()// 错了，这里应该是根据
    },
    methods: {
      getBookInfo() {
        this.$http.get(`${this.globalDOMAIN}Employ/Service/getBookInfo`, {
          params: {'order_id': this.id},
          emulateJSON: true,
          headers: {'token': this.token}
        }).then((res) => {
          this.processBookInfoData(res.body.data)
        })
      },
      processBookInfoData(data) {
        let date = new Date(data.inputtime * 1000)
        this.title = data.service.title
        this.price = data.service.price
        this.requirement = data.remark
        this.date = formatDate(date, 'yyyy-MM-dd')
      },
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
      hideWxModel() {
        if (this.showGetWxModel) {
          this.showGetWxModel = false
        } else {
          return false
        }
      },// 点击遮罩隐藏客服微信号
    },
    components: {
      loading,
      'v-header': header
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../../common/style/fun.styl"
  .reservationDetailWrapper
    position: relative
    display: flex
    flex-direction: column
    background-color: #f8f8f8
    font-size: px2-2-rem(32)
    padding-bottom: px2-2-rem(120)
    .taskId
      padding: 0 px2-2-rem(32)
      height: px2-2-rem(66)
      line-height: px2-2-rem(66)
      color: #999
      font-size: px2-2-rem(26)
      border-bottom: 1px solid #e9e9e9
      border-top: 1px solid #e9e9e9
      span
        position: relative
        right: px2-2-rem(-392)
        top: px2-2-rem(-78)
        font-size: px2-2-rem(32)
        color: #00a0e9
    .taskBasicInfo
      display: flex
      flex-direction: row
      align-items: baseline
      box-sizing: border-box
      height: px2-2-rem(232)
      padding: px2-2-rem(26) px2-2-rem(32)
      margin-bottom: px2-2-rem(22)
      background-color: #ffffff
      border-bottom: 1px solid #e5e5e5
      .taskPrice
        color: #e4790f
      .taskBasicInfoLeft, .taskBasicInfoRight
        display: flex
        flex-direction: column
        justify-content: space-between
        height: 100%
      .taskBasicInfoRight
        align-items: center
        width: px2-2-rem(225)
        .taskDate
          color: #b3b3b3
          font-size: px2-2-rem(26)
        .knowCompanyBtn
          width: px2-2-rem(164)
          height: px2-2-rem(50)
          line-height: px2-2-rem(50)
          font-size: px2-2-rem(26)
          text-align: center
          color: #00a0e9
          border: 1px solid #00a0e9
          border-radius: px2-2-rem(8)
    .taskDetailInfo
      display: flex
      flex-direction: column
      padding: px2-2-rem(26) px2-2-rem(32)
      background-color: #ffffff
      font-size: px2-2-rem(26)
      .detailInfoHeader
        display: flex
        align-items: center
        height: px2-2-rem(64)
        .headerImg
          width: px2-2-rem(30)
          margin-right: px2-2-rem(20)
      .skillList, .requirement
        padding: 0 px2-2-rem(48)
        color: #888888
    .taskDetailFooter
      position: fixed
      bottom: 0
      width: 100%
      height: px2-2-rem(85)
      display: flex
      flex-direction: row
      justify-content: center
      align-items: center
      text-align: center
      color: #ffffff
      font-size: px2-2-rem(36)
      border-top: 1px solid #e5e5e5
    .taskGiveUp
      background-color: #dfdfdf
    .taskSuccess
      color: #ff
      background-color: #00a0e9
    .taskSelected, .taskManageMoney, .taskHasBeenPaid, .taskComment
      .contact
        display: flex
        flex-direction: column
        justify-content: center
        align-items: center
        height: 100%
        width: px2-2-rem(148)
        color: #888888
        font-size: px2-2-rem(26)
        background-color: #ffffff
        border-right: 1px solid #e5e5e5
        img
          width: px2-2-rem(30)
          height: px2-2-rem(30)
      .check, .viewContractBtn, .manageMoneyBtn
        display: flex
        flex: 1
        align-items: center
        justify-content: center
        height: 100%
      .check
        color: #00a0e9
        background-color: #ffffff
      .viewContractBtn, .manageMoneyBtn
        background-color: #00a0e9
    .taskHasBeenPaid, .taskComment
      .check, .viewContractBtn, .comment
        display: flex
        flex: 1
        align-items: center
        justify-content: center
        height: 100%
      .check, .comment
        color: #ffffff
        background-color: #00a0e9
      .viewContractBtn
        color: #00a0e9
        background-color: #ffffff
    .btnWrapperLeft
      flex: 1
      display: flex
      flex-direction: row
      height: 100%
      .giveUp, .contactXiake
        display: flex
        align-items: center
        justify-content: center
        height: 100%
        background-color: #ffffff
      .giveUp
        flex: 1
        font-size: px2-2-rem(26)
        color: #999999
      .contactXiake
        flex: 2
        border-left: 1px solid #cccccc
        color: #00a0e9
    .overlay
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 1000;
      background-color: rgba(0, 0, 0, .8);

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
