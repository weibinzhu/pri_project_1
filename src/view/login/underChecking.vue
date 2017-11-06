<template>
  <div class="underCheckingWrapper">
    <v-header title="审核中"></v-header>
    <div class="contentWrapper">
      <img src="./check@3x.png"/>
      <p>您的资料正在审核中...</p>
      <p class="notice">审核通过后，方可发布<span>服务技能</span>，获得额外收入</p>
    </div>
    <div class="underCheckingBtn" @click="checkIphone" :data-clipboard-text="wxId">
      点击复制关注官方微信号，查收最新审核进度
    </div>
    <router-link to="/home" tag="div" class="goBackBtn">
      返回主页
    </router-link>
  </div>
</template>

<script type="text/ecmascript-6">
  import header from '@/components/v-header/v-header'
  import Clipboard from 'clipboard'
  // 放在这里是为了避免多次绑定事件
  let underCheckingclipboard = new Clipboard('.underCheckingBtn') // 绑定到【点击复制客服微信号】按钮
  underCheckingclipboard.on('success', (e) => {
    alert('复制成功!')
  })
  underCheckingclipboard.on('error', (e) => {
    alert('请选择“拷贝”进行复制!')
  })
  export default {
    data(){
      return {
        wxId:'d121'
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

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/style/fun.styl"
  .underCheckingWrapper
    display: flex
    flex-direction: column
    align-items: center
    background-color: #ffffff
    .contentWrapper
      display: flex
      flex-direction: column
      align-items: center
      margin-top :px2-2-rem(110)
      font-size :px2-2-rem(36)
      color: #666666
      img
        width: px2-2-rem(290)
        height: px2-2-rem(300)
        margin-bottom :px2-2-rem(10)
      .notice
        margin-top :px2-2-rem(20)
        font-size :px2-2-rem(30)
        color: #999999
        span
          color: #00a0e9
    .underCheckingBtn,.goBackBtn
      box-sizing :border-box
      width :px2-2-rem(688)
      height :px2-2-rem(86)
      line-height :px2-2-rem(86)
      text-align :center
      font-size :px2-2-rem(30)
      border-radius :px2-2-rem(8)
    .underCheckingBtn
      margin-top :px2-2-rem(226)
      margin-bottom :px2-2-rem(30)
      border: 1px solid #55abf4
      color:#00a0e9
      background-color :#f2f9ff
    .goBackBtn
      color: #ffffff
      background-color :#00a0e9
</style>
