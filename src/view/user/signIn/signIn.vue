<template>
  <div class="signInWrapper">
    <v-header title="签到赚功力"></v-header>
    <div class="signInTitle">
      <p>每日签到</p>
      <p>连续签到7天额外赠送5功力</p>
    </div>
    <div class="progressWrapper">
      <div class="notice" style="top:-1.1rem;left:-0.36rem">
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
        signInDays: 3,
      }
    },
    computed:{
      addGongli(){
        if (this.signInDays == 6){
          return 6
        }else{
          return 1
        }
      }
    },
    created() {
      for (let i = 0; i < DAYLENGTH; i++) {
        if (i < this.signInDays) {
          this.days.push(1)
        } else {
          this.days.push(0)
        }
      }
    },
    mounted() {
      let notice = document.querySelector('.notice')
      let currentLeft = notice.style.left
      let newLeft = (currentLeft.substring(0, 5) / 1) + this.signInDays * 1.36
      notice.style.left = newLeft + 'rem'
    },
    methods:{
      toSignIn(){
        this.$http.post('http://xingxia.sz.ztbweb.cn/index.php/Employ/User/sign').then((res)=>{
          console.log(res)
        })
      }
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
    border-radius : px2-2-rem(36) px2-2-rem(40)
</style>
