<template>
  <div class="makeReservationSuccessWrapper">
    <v-header title="提交预约成功"></v-header>
    <img class="successIcon" src="/static/success.png"/>
    <div class="noticeText">
      预约提交成功
      <div class="noticeOther">
        您的预约已提交，等待峡客确认
      </div>
    </div>
    <router-link to="/home/xiake" tag="div" class="otherServiceBtn">查看其它服务</router-link>
    <router-link to="/employerAppointment" tag="div" class="toMyReservationListBtn">查看预约列表</router-link>
    <div class="wxIdBtn" @click="checkIphone" :data-clipboard-text="wxId">点击复制，关注官方微信号，查收最新审核进度</div>
  </div>
</template>

<script type="text/ecmascript-6">
  import header from '@/components/v-header/v-header'
  import Clipboard from 'clipboard'
  // 放在这里是为了避免多次绑定事件
  let reservationClipboard = new Clipboard('.wxIdBtn') // 绑定到【点击复制客服微信号】按钮
  reservationClipboard.on('success', (e) => {
    alert('复制成功!')
  })
  reservationClipboard.on('error', (e) => {
    alert('请选择“拷贝”进行复制!')
  })
  export default {
    data(){
      return {
        wxId:'sq1121',// 客服微信号
      }
    },
    methods:{
      checkIphone() { // 优雅降级。（暂时不需要用）
        if (navigator.userAgent.match(/ipad|ipod|iphone/i)) {
          alert(`如果失败，请手动输入微信号：${this.wxId}`)
        }
      },
    },
    components: {
      'v-header': header
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/style/fun.styl"
  .makeReservationSuccessWrapper
    display: flex
    flex-direction: column
    align-items: center
    font-size: px2-2-rem(32)
    background-color: #ffffff
    .successIcon
      width: px2-2-rem(158)
      height: px2-2-rem(158)
      margin-top: px2-2-rem(104)
    .noticeText
      display: flex
      flex-direction: column
      align-items: center
      margin-top: px2-2-rem(38)
      margin-bottom: px2-2-rem(80)
      .noticeOther
        font-size :px2-2-rem(28)
        margin-top: px2-2-rem(20)
        color: #00a0e9
    .otherServiceBtn, .toMyReservationListBtn, .wxIdBtn
      width: px2-2-rem(688)
      height: px2-2-rem(86)
      line-height: px2-2-rem(86)
      text-align: center
      font-size :px2-2-rem(28)
      margin-bottom: px2-2-rem(20)
      border-radius: px2-2-rem(8)
    .otherServiceBtn
      background-color: #00a0e9
      color: #ffffff
    .toMyReservationListBtn, .wxIdBtn
      color: #00a0e9
      border: 1px solid #00a0e9
      background-color: #f2f9ff
</style>
