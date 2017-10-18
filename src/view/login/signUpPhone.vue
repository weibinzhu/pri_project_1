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
        <img @click="toggleBtn" src="./registered_attention_forbid@3x.png" v-if="passwordShow"/>
        <img @click="toggleBtn" src="./mobile@3x.png" v-else/>
      </div>
    </div>
    <!--用户协议-->
    <div class="signUpPhoneAgreement">
      <input id="agreement" name="agreement" type="checkbox"/>
      <label for="agreement" class="agreement">
        <div></div>
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
    name:'signUpPhone',
    data() {
      return {
        type: 1,// 页面类型，1代表是手机注册页，2代表是密码重置页
        passwordShow: true,// 切换密码显隐图标
        phoneNum: '',// 手机号
        code: '',//验证码
        correctCode: 11212,// 正确的验证码（前端应该不知道，应由后端判断验证是否成功
        isCodeCorrect: true,// 验证码是否正确，由后端返回
        psw: '',// 密码
        btnText:'下一步: 选择身份',//按钮提示文字
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
        // 切换密码显隐
        let passwordInput = document.querySelector('.passwordInput')
        let currentStatus = passwordInput.getAttribute('type')
        if (currentStatus == 'password') {
          passwordInput.setAttribute('type', 'text')
          this.passwordShow = true
        } else {
          passwordInput.setAttribute('type', 'password')
          this.passwordShow = false
        }
      },
      onNextStepBtnClick() {
        // 点击【下一步】后的判断
        // 暂时只能用作演示，实际上需要与后端配合，需要进行修改
        if (!this.phoneNum) {
          alert('请输入手机号并获取验证码')
          return false
        } else if (!(this.code == this.correctCode)) { // 只能用双等，输入的是字符串
          alert(`验证码不正确，（验证码是${this.correctCode}，测试用）`)
          return false
        } else if (!this.psw) {
          alert('请设置密码')
          return false
        } else {
          if(this.type==1){
            // 如果当前是【手机注册状态】
            this.$router.push({path: '/selectIdentity'})
          }else if (this.type == 2){
            // 如果当前是【密码重置状态】
            alert('重置成功')
            this.$router.push({path: '/login'})
          }
        }
      }
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
        border: 2px solid #e5e5e5
        margin-right: px2-2-rem(20)
      input[type=checkbox]
        display: none
      input[type=checkbox]:checked + .agreement
        div
          box-sizing: border-box
          width: 0
          height: 0
          border-top: 10px solid red
          border-left: 5px solid transparent
          border-right: 5px solid transparent
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
