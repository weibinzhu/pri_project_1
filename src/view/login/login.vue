<template>
  <div class="loginWrapper">
    <img class="loginLogo" src="/static/logo@3x.png"/>
    <loading v-show="isLoading"></loading>
    <div class="inputItem">
      <img src="./mobile@3x.png"/>
      <input name="phoneNum" type="text" placeholder="手机号" v-model="phoneNum" v-validate="'required|mobilePhone'"/>
      <div v-show="errors.has('phoneNum')" class="validateNotice is-danger">{{ errors.first('phoneNum') }}</div>
    </div>
    <div class="inputItem">
      <img src="./lock@3x.png"/>
      <input name="password" v-validate="'required'" type="password" placeholder="密码" v-model="psw"/>
      <div v-show="errors.has('password')" class="validateNotice is-danger">{{ errors.first('password') }}</div>
    </div>
    <div @click="login" class="loginBtn">登录
      <div class="findPsw" @click.stop="findPsw">找回密码</div>
    </div>
    <div @click="wxLogin" class="wxLoginBtn"><img class="wxLogo" src="./wechat@3x.png"/>微信登录</div>
    <footer class="signUpWrapper">
      <p>还没行峡网的账号？</p>
      <router-link to="/signUpPhone" class="signUp">注册账号 ></router-link>
    </footer>
  </div>
</template>

<script type="text/ecmascript-6">
  import {saveResDataToSession} from '@/common/utils/utils.js'
  import {Validator} from 'vee-validate';
  import Loading from '@/components/loading'

  export default {
    components: {Loading},
    name: 'login',
    data() {
      return {
        phoneNum: '',// 电话号码
        psw: '',// 密码
        isLoading: false,
      }
    },
    computed: {
      globalDOMAIN() {
        return this.$store.state.globalDOMAIN
      }
    },
    methods: {
      wxLogin() {
        this.$http.get(`${this.globalDOMAIN}Employ/Wechat/index`).then(res => {
          this.$vux.toast.text(res.body.msg)
          if (res.body.status) {
            // 如果已经绑定过微信
            saveResDataToSession(res.body.data) // 保存用户信息到sessionStorage，方便在其他页面使用
            this.$router.push({path: '/home'})
          } else {
            // 如果还没绑定过
            sessionStorage.setItem('openid', res.body.data.openid)
            this.$router.push({path: '/signUpPhone'})
          }
        },err=>{
          alert(`错误代码：${err.status}`)
        })
      },// 微信登录
      login() {

        let data = {
          'phone': this.phoneNum.toString(),
          'password': this.psw.toString()
        }

        this.$validator.validateAll().then((result) => {
          // 前端校验
          if (result) {
            this.sendLoginRequest(data)
          } else {
            return false
          }
        })

      },// 登录

      findPsw() {
        this.$router.push({path: '/signUpPhone?type=2'})
      },// 找回密码

      getList(type) {
        let url
        switch (type) {
          case 'city':
            url = 'Api/Common/getCity'
            break
          case 'industry':
            url = 'Api/Common/getIndustry'
            break
          case 'skill':
            url = 'Api/Common/getSkillType'
            break
        }
        this.$http.get(`${this.globalDOMAIN}${url}`).then(res => {
          this.$store.commit('saveBaseData', {baseData: res.body.data.lists, type: type})
        })
      },// 获取城市、技能类型或行业列表，并存入vuex

      sendLoginRequest(data) {
        this.$http.post(`${this.globalDOMAIN}Employ/Public/login`, data, {emulateJSON: true}).then((response) => {
          if (!response.body.status) {
            alert(response.body.msg)
            return false
          } else {
            this.getList('skill')

            // 获取全国总客服信息，存入sessionStorage
            this.$http.get(`${this.globalDOMAIN}Api/Common/getCustomerService`).then(res => {
              this.$store.commit('saveBaseData', {baseData: res.body.data, type: 'customerService'})
            })

            // 获取用户信息，存入sessionStorage
            let token = response.body.data.token
            this.$http.get(`${this.globalDOMAIN}Employ/User/getUserInfo`, {headers: {'token': token}}).then((response) => {
              console.log('获取用户信息：', response)
              if (response.body.status) {
                let data = response.body.data
                saveResDataToSession(data) // 保存用户信息到sessionStorage，方便在其他页面使用
                this.$router.push({path: '/home'})
              } else {
                alert('获取用户信息失败')
              }
            })
          }
        })
      },// 发送请求
    },
    component: {
      Loading
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
      margin-top: px2-2-rem(176)
      width: px2-2-rem(144)
      height: px2-2-rem(144)
      border-radius: px2-2-rem(16)
      margin-bottom: px2-2-rem(90)
    .inputItem
      position: relative
      display: flex
      flex-direction: row
      align-items: center
      width: px2-2-rem(688)
      height: px2-2-rem(86)
      background-color: #ffffff
      border-radius: px2-2-rem(16)
      margin-bottom: px2-2-rem(32)
      .validateNotice
        position: absolute
        top: px2-2-rem(20)
        right: px2-2-rem(40)
        color: #f0724f
        font-size: px2-2-rem(26)
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
      position: relative
      box-sizing: border-box
      text-align: center
      width: px2-2-rem(688)
      height: px2-2-rem(86)
      line-height: px2-2-rem(86)
      background-color: #00a0e9
      margin: px2-2-rem(58) 0 px2-2-rem(20) 0
      border-radius: px2-2-rem(16)
      .findPsw
        position: absolute
        top: px2-2-rem(-90)
        right: px2-2-rem(0)
        font-size: px2-2-rem(26)
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
      margin-top: px2-2-rem(160)
      .signUp
        margin-top: px2-2-rem(10)
        color: #00a0e9
</style>
