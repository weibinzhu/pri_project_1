<template>
  <div class="lightUpBadgeWrapper">
    <v-header title="点亮徽章"></v-header>
    <img class="headImg" src="/static/banner2@3x.png"/>
    <div class="lightUpBadgeNotice">
      <div class="lightUpBadgeNoticeText">
        <img class="lightUpBadgeIcon" src="./phone@3x.png"/>如有疑问，请咨询：020-34479909(9:00-18:00)
      </div>
      <img class="lightUpBadgeArrow" src="/static/arrow-right-gray.png"/>
    </div>
    <div class="lightUpBadgeIntro">
      <div class="lightUpBadgeIntroTitle">
        徽章介绍
      </div>
      <div class="lightUpBadgeIntroContent">
        徽章介绍徽章介绍，写在前端。徽章介绍徽章介绍，写在前端。徽章介绍徽章介绍，写在前端。徽章介绍徽章介绍，写在前端。徽章介绍徽章介绍，写在前端。
      </div>
    </div>
    <div class="lightUpBadgePrice">
      <img src="./check1@3x.png"/>
      <span>￥80 / 年</span>
    </div>
    <div class="lightUpBadgeAgreement">
      <input id="agreement" name="agreement" type="checkbox" v-model="check"/>
      <label for="agreement" class="agreement">
      </label>
      <router-link to="/userAgreement" >阅读并同意《行峡网平台服务协议》</router-link>
    </div>
    <div @click="toLightUp" class="lightUpBadgeBtn">
      微信支付
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import header from '@/components/v-header/v-header'

  export default {
    name:'lightUpBadge',
    data(){
      return {
        check:false
      }
    },
    computed:{
      globalDOMAIN() {
        return this.$store.state.globalDOMAIN
      },
      token() {
        return sessionStorage.getItem('token')
      },
    },
    methods:{
      toLightUp(){
        if(this.check){
          let url = ''
          if(this.$route.query.type == 0){
            // type == 0 代表是专家徽章
            url = 'Employ/User/expertBadgeCertified'
          }else if(this.$route.query.type == 1){
            // type == 1 代表是峡客徽章
            url = 'Employ/User/xiakeBadgeCertified'
          }
          this.$http.post(`${this.globalDOMAIN}${url}`,{
            pay_code:'wx_pay'
          },{
            headers:{token:this.token},
            emulateJSON:true
          }).then(res=>{
            if(res.body.status){
              this.$vux.toast.text('认证成功')
            }
          })
        }else{
          this.$vux.toast.text('请先阅读并同意协议')
        }
      }
    },
    components: {
      'v-header': header
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../../common/style/fun.styl"
  .lightUpBadgeWrapper
    display: flex
    flex-direction: column
    min-height: 100vh
    font-size: px2-2-rem(32)
    background-color: #f8f8f8
    .headImg
      height: px2-2-rem(380)
    .lightUpBadgeNotice
      display: flex
      justify-content: space-between
      align-items: center
      height: px2-2-rem(88)
      padding: 0 px2-2-rem(30)
      background-color: #ffffff
      margin-bottom: px2-2-rem(24)
      .lightUpBadgeNoticeText
        display: flex
        align-items: center
        font-size: px2-2-rem(26)
        color: #666666
      .lightUpBadgeIcon
        width: px2-2-rem(50)
        margin-right: px2-2-rem(20)
      .lightUpBadgeArrow
        height: px2-2-rem(24)
        width: px2-2-rem(16)
    .lightUpBadgeIntro
      display: flex
      flex-direction: column
      padding: px2-2-rem(20) px2-2-rem(30)
      margin-bottom: px2-2-rem(20)
      background-color: #ffffff
      .lightUpBadgeIntroTitle
        height: px2-2-rem(60)
        line-height: px2-2-rem(60)
        color: #353535
      .lightUpBadgeIntroContent
        color: #999999
    .lightUpBadgePrice
      display: flex
      flex-direction: row
      align-items: center
      padding: 0 px2-2-rem(30)
      height: px2-2-rem(88)
      background-color: #ffffff
      img
        width: px2-2-rem(50)
        margin-right: px2-2-rem(10)
      span
        font-size: px2-2-rem(36)
        color: #f0724f
    .lightUpBadgeAgreement
      display: flex
      flex-direction: row
      align-items: center
      height: px2-2-rem(50)
      padding: 0 px2-2-rem(30)
      a
        color: #999999
        font-size: px2-2-rem(26)
      .agreement
        display: block
        height: px2-2-rem(30)
        width: px2-2-rem(30)
        background-image :url("/static/checkbox.png")
        background-size :px2-2-rem(60) px2-2-rem(30)
        margin-right: px2-2-rem(20)
      input[type=checkbox]
        display: none
      input[type=checkbox]:checked + .agreement
        background-position :px2-2-rem(30) 0
    /*background-color :red*/
    .lightUpBadgeBtn
      position: fixed
      bottom: 0
      width: 100%
      height: px2-2-rem(86)
      line-height: px2-2-rem(86)
      color: #ffffff
      font-size: px2-2-rem(32)
      text-align: center
      background-color: #00a0e9
</style>
