<template>
  <div class="signInWrapper">
    <v-header title="签到赚功力"></v-header>
    <div class="signInTitle">
      <p>每日签到</p>
      <p>连续签到7天额外赠送5功力</p>
    </div>
    <div class="progressWrapper">
      <div class="notice" style="top:-1.1rem;">
        <p>+{{addGongli}}</p>
        <p>功力值</p>
      </div>
      <div v-for="(item,index) in days" :class="['dot', item == 1?'active':'']"></div>
    </div>
    <div class="progressDesc">
      <div v-for="(item,index) in days" class="progressText">{{index + 1}}</div>
    </div>
    <div @click="toSignIn" class="signInBtn">
      签到
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import header from '../../../components/v-header/v-header'

  const DAYLENGTH = 7
  export default {
    data() {
      return {
        days: [],
        signInDays: 0,
        initLeft: -0.36,
        normalPoint: 1,
        bonusPoint: 6,
      }
    },
    computed: {
      addGongli() {
        if (this.signInDays == 6) {
          return this.bonusPoint
        } else {
          return this.normalPoint
        }
      },
      globalDOMAIN() {
        return this.$store.state.globalDOMAIN
      }
    },
    watch: {
      signInDays() {
        this.setDayBar()
      }// 响应signInDays发生的变化
    },
    mounted() {
      this.signInDays = sessionStorage.getItem('sign_num')
      this.setDayBar()
    },
    methods: {
      toSignIn() {
        let token = sessionStorage.getItem('token')
        this.$http.post(`${this.globalDOMAIN}Employ/User/sign`, {}, {headers: {'token': token}}).then((res) => {
          if (res.body.status) {
            let num = res.body.data.num, point = res.body.data.point
            this.signInDays = num
            sessionStorage.setItem('sign_num',this.signInDays)
            this.$vux.toast.text(`成功签到，积分已加${point}`)
          } else {
            if (res.body.msg){
              this.$vux.toast.text(res.body.msg)
            }else{
              this.$vux.toast.text('请登录')
            }
          }
        })
      },// 签到
      setDayBar() {
        this.days = []
        for (let i = 0; i < DAYLENGTH; i++) {
          if (i < this.signInDays) {
            this.days.push(1)
          } else {
            this.days.push(0)
          }
        }
        let notice = document.querySelector('.notice')
        let newLeft = this.initLeft + this.signInDays * 1.36
        notice.style.left = newLeft + 'rem'
      },// 设置当前显示条的样子
    },
    components: {
      'v-header': header
    }

  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../../common/style/fun.styl"
  .signInWrapper
    display: flex
    flex-direction: column
    align-items: center
    height: 100vh
    font-size: px2-2-rem(32)
    background-image: url("/static/user/xiake/bg@2x.png")
    background-size: cover
    .signInTitle
      box-sizing: border-box
      width: 100%
      padding: px2-2-rem(30) px2-2-rem(52)
      color: #ffffff
      margin-bottom: px2-2-rem(128)
      p:last-child
        margin-top: px2-2-rem(10)
        font-size: px2-2-rem(26)

  .progressWrapper
    position: relative
    display: flex
    flex-direction: row
    align-items: center
    .dot
      width: px2-2-rem(28)
      height: px2-2-rem(28)
      margin-right: px2-2-rem(75)
      background-color: #ffffff
      border-radius: 50%
    .dot:after
      content: ''
      position: relative
      top: px2-2-rem(-20)
      left: px2-2-rem(28)
      display: inline-block
      width: px2-2-rem(72)
      height: px2-2-rem(4)
      background-color: #ffffff
    .dot:last-child
      margin: 0
    .dot:last-child:after
      display: none
    .active
      background-color: #fffc30
    .active:after
      background-color: #fffc30
    .notice
      position: absolute
      display: flex
      flex-direction: column
      align-items: center
      justify-content: center
      height: px2-2-rem(64)
      width: px2-2-rem(80)
      border-radius: px2-2-rem(8)
      background-color: #ffffff
      font-size: px2-2-rem(24)
      color: #00a0e9
      transition: all 0.2s linear
      p
        line-height: px2-2-rem(26)
      p:last-child
        font-size: px2-2-rem(22)
    .notice:after
      position: absolute
      bottom: -0.21rem
      content: ''
      border-left: 5px solid transparent
      border-right: 5px solid transparent
      border-top: 8px solid #ffffff

  .progressDesc
    display: flex
    flex-direction: row
    justify-content: center
    align-items: center
    width: px2-2-rem(646)
    .progressText
      color: #ffffff
      margin-right: px2-2-rem(84)
    .progressText:last-child
      margin: 0

  .signInBtn
    width: px2-2-rem(570)
    height: px2-2-rem(80)
    line-height: px2-2-rem(80)
    text-align: center
    margin-top: px2-2-rem(108)
    background-color: #ffffff
    color: #00a0e9
    border-radius: px2-2-rem(36) px2-2-rem(40)
</style>
