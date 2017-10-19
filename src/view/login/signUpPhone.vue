<template>
  <div class="signUpPhoneWrapper">
    <v-header :title="type==1?'手机注册':'重置密码'"></v-header>
    <div class="content">
      <div class="inputWrapper">
        <img src="./mobile@3x.png"/>
        <input v-model="phoneNum" type="text" placeholder="请输入注册手机号"/>
      </div>
      <div class="inputWrapper">
        <img src="./registered_keyboard@3x.png"/>
        <input v-model="code" type="text" placeholder="请输入验证码"/>
        <div class="getCodeBtn">获取验证码</div>
      </div>
      <div class="inputWrapper">
        <img src="./lock@3x.png"/>
        <input v-model="psw" class="passwordInput" type="text" placeholder="请设置密码"/>
        <div @click="toggleBtn" :class="[passwordShow?'pswEye':'pswEyeClose']"></div>
      </div>
    </div>
    <!--用户协议-->
    <div class="signUpPhoneAgreement">
      <input id="agreement" name="agreement" type="checkbox" v-model="checked"/>
      <label for="agreement" class="agreement">
      </label>
      <a href="http://www.baidu.com">阅读并同意《行峡网平台服务协议》</a>
    </div>
    <!--【下一步】按钮-->
    <div class="nextStepBtn" @click="onNextStepBtnClick">
      {{btnText}}
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import header from '../../components/v-header/v-header.vue'

  export default {
    name: 'signUpPhone',
    data() {
      return {
        type: 1,// 页面类型，1代表是手机注册页，2代表是密码重置页
        passwordShow: true,// 切换密码显隐图标
        phoneNum: '',// 手机号
        code: '',//验证码
        correctCode: 11212,// 正确的验证码（前端应该不知道，应由后端判断验证是否成功
        isCodeCorrect: true,// 验证码是否正确，由后端返回
        psw: '',// 密码
        btnText: '下一步: 选择身份',//按钮提示文字
        checked: false,// checkbox
      }
    },
    computed: {
      globalDOMAIN() {
        return this.$store.state.globalDOMAIN
      }
    },
    mounted() {
      // 根据query值修改当前页面类型，重置密码还是注册手机
      if (this.$route.query.type) {
        this.type = this.$route.query.type
        this.btnText = '提交'
      } else {
        this.type = 1
      }
    },
    methods: {
      toggleBtn() {
        let passwordInput = document.querySelector('.passwordInput')
        let currentStatus = passwordInput.getAttribute('type')
        if (currentStatus == 'password') {
          passwordInput.setAttribute('type', 'text')
          this.passwordShow = true
        } else {
          passwordInput.setAttribute('type', 'password')
          this.passwordShow = false
        }
      },// 切换密码显隐
      onNextStepBtnClick() {
        let that = this
        if (!this.checked) {
          alert('若不同意用户协议则不能注册')
          return false
        }
        if (this.type == 1) {
          // 如果当前是【手机注册状态】

          // data
          let phone, psw, code
          phone = this.phoneNum.toString()
          psw = this.psw.toString()
          code = this.code.toString()
          let data = {
            'phone': phone,
            'password': psw,
            'smsCode': code
          }

          // 发送请求
          this.$http.post(`${this.globalDOMAIN}Employ/Public/register`, data, {emulateJSON: true}).then((response) => {
            if (!response.body.status) {
              // 失败的话
              alert(response.body.msg)
            } else {
              // 成功的话给出提示并跳转
              alert(response.body.msg)
              this.$router.push({path: '/selectIdentity'})
            }
          })
        } else if (this.type == 2) {
          // 如果当前是【密码重置状态】
          alert('重置成功')
          this.$router.push({path: '/login'})
        }
      }// 点击【下一步】后的判断
    },
    components: {
      'v-header': header
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/style/fun.styl"
  .signUpPhoneWrapper
    display: flex
    flex-direction: column
    align-items: center
    background-color: #ffffff
    font-size: px2-2-rem(32)
    .content
      display: flex
      flex-direction: column
      align-items: center
      background-color: #ffffff
    .inputWrapper
      box-sizing: border-box
      display: flex
      flex-direction: row
      align-items: center
      width: px2-2-rem(688)
      height: px2-2-rem(86)
      margin-bottom: px2-2-rem(12)
      padding-right: px2-2-rem(30)
      border: 1px solid #e5e5e5
      border-radius: px2-2-rem(8)
      img
        width: px2-2-rem(38)
        height: px2-2-rem(38)
        margin: 0 px2-2-rem(30)
      .pswEyeClose, .pswEye
        width: px2-2-rem(38)
        height: px2-2-rem(38)
        margin: 0 px2-2-rem(30)
        background-size: px2-2-rem(72) px2-2-rem(38)
        background-image: url("./psw_eye.png")
      .pswEyeClose
        background-position: 0 0
      .pswEye
        background-position: px2-2-rem(38) 0
      input
        flex: 1
      .getCodeBtn
        color: #00a0e9
    .inputWrapper:first-child
      margin-top: px2-2-rem(50)
    .signUpPhoneAgreement
      display: flex
      flex-direction: row
      align-items: center
      height: px2-2-rem(50)
      width: px2-2-rem(688)
      margin-top: px2-2-rem(20)
      a
        color: #999999
        font-size: px2-2-rem(26)
      .agreement
        display: block
        height: px2-2-rem(30)
        width: px2-2-rem(30)
        background-image: url("/static/checkbox.png")
        background-size: px2-2-rem(60) px2-2-rem(30)
        margin-right: px2-2-rem(20)
      input[type=checkbox]
        display: none
      input[type=checkbox]:checked + .agreement
        background-position: px2-2-rem(30) 0
    .nextStepBtn
      width: px2-2-rem(688)
      height: px2-2-rem(86)
      line-height: px2-2-rem(86)
      text-align: center
      margin-top: px2-2-rem(50)
      background-color: #00a0e9
      color: #ffffff
      border-radius: px2-2-rem(8)
</style>
