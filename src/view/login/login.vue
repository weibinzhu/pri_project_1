<template>
  <div class="loginWrapper">
    <img class="loginLogo" src="/static/logo@3x.png"/>
    <div class="inputItem">
      <img src="./mobile@3x.png"/>
      <input type="text" placeholder="手机号" v-model="phoneNum"/>
    </div>
    <div class="inputItem">
      <img src="./lock@3x.png"/>
      <input type="password" placeholder="密码" v-model="psw"/>
    </div>
    <div @click="login" class="loginBtn">登录<div class="findPsw" @click.stop="findPsw">找回密码</div></div>
    <div class="wxLoginBtn"><img class="wxLogo" src="./wechat@3x.png"/>微信登录</div>
    <footer class="signUpWrapper">
      <p>还没行峡网的账号？</p>
      <router-link to="/signUpPhone" class="signUp">注册账号 ></router-link>
    </footer>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name:'login',
    data(){
      return{
        phoneNum:'',// 电话号码
        psw:'',// 密码
      }
    },
    methods:{
      login(){
        // 登录
        let data = {
          'phone': this.phoneNum.toString(),
          'password':this.psw.toString()
        }
        this.$http.post(`${this.globalDOMAIN}Employ/Public/login`,data,{emulateJSON: true}).then((response)=>{
          if (!response.body.status){
            alert(response.body.msg)
            return false
          }else{
            // alert('登录成功')
            this.$store.commit('setUserId',{userId:response.body.data.userid})
            console.log(this.$store.state.userId)
            this.$router.push({path:'/home'})
          }
        })
      },
      findPsw(){
        // 找回密码
        this.$router.push({path:'/signUpPhone?type=2'})
      }
    },
    computed:{
      globalDOMAIN(){
        return this.$store.state.globalDOMAIN
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/style/fun.styl"
  .loginWrapper
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center
    width: 100%
    min-height: 100vh
    font-size: px2-2-rem(32)
    color: #fff
    background: url("./bg@3x.png")
    background-size: px2-2-rem(750)
    background-repeat: no-repeat
    .loginLogo
      margin-top :px2-2-rem(176)
      width: px2-2-rem(144)
      height: px2-2-rem(144)
      border-radius: px2-2-rem(16)
      margin-bottom: px2-2-rem(90)
    .inputItem
      display: flex
      flex-direction: row
      align-items: center
      width: px2-2-rem(688)
      height: px2-2-rem(86)
      background-color: #ffffff
      border-radius: px2-2-rem(16)
      margin-bottom: px2-2-rem(32)
      img
        width: px2-2-rem(40)
        height: px2-2-rem(40)
        margin: 0 px2-2-rem(25)
      input
        box-sizing: border-box
        width: 100%
        height: 100%
        background-color: rgba(255, 255, 255, 0)
      ::-webkit-input-placeholder /* WebKit, Blink, Edge */
        color: #c9c9c9
    .loginBtn
      position :relative
      box-sizing: border-box
      text-align: center
      width: px2-2-rem(688)
      height: px2-2-rem(86)
      line-height: px2-2-rem(86)
      background-color: #00a0e9
      margin: px2-2-rem(58) 0 px2-2-rem(20) 0
      border-radius: px2-2-rem(16)
      .findPsw
        position :absolute
        top:px2-2-rem(-90)
        right :px2-2-rem(0)
        font-size :px2-2-rem(26)
        color: #ffffff
    .wxLoginBtn
      display: flex
      flex-direction: row
      justify-content: center
      align-items: center
      width: px2-2-rem(688)
      height: px2-2-rem(86)
      line-height: px2-2-rem(86)
      color: #2bad37
      background-color: #f2f9ff
      border-radius: px2-2-rem(16)
      .wxLogo
        width: px2-2-rem(47)
        height: px2-2-rem(38)
        margin-right: px2-2-rem(20)
    .signUpWrapper
      display: flex
      flex-direction: column
      justify-content: center
      align-items: center
      margin-top : px2-2-rem(160)
      .signUp
        margin-top : px2-2-rem(10)
        color :#00a0e9
</style>
