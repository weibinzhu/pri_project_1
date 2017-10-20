<template>
  <div class="settingWrapper">
    <v-header title="设置"></v-header>
    <div class="settingBlock">
      <div class="settingItem">
        <div class="settingItemTitle">修改密码</div>
        <img src="/static/arrow-right-gray.png"/>
      </div>
      <div class="settingItem">
        <div class="settingItemTitle">绑定微信</div>
        <div>
          <span>{{bindStatus}}</span>
          <img src="/static/arrow-right-gray.png"/>
        </div>
      </div>
    </div>
    <div class="settingBlock">
      <router-link tag="div" to="/helpPage" class="settingItem">
        <div class="settingItemTitle">使用帮助</div>
        <img src="/static/arrow-right-gray.png"/>
      </router-link>
      <router-link tag="div" to="/feedback" class="settingItem">
        <div class="settingItemTitle">意见反馈</div>
        <img src="/static/arrow-right-gray.png"/>
      </router-link>
      <router-link tag="div" to="/aboutXingxia" class="settingItem">
        <div class="settingItemTitle">关于行峡网</div>
        <img src="/static/arrow-right-gray.png"/>
      </router-link>
    </div>
    <div class="settingLogout" @click="logout">退出登录</div>
  </div>
</template>

<script type="text/ecmascript-6">
  import header from '../../../components/v-header/v-header'

  export default {
    data() {
      return {
        bindStatus: '未绑定'
      }
    },
    computed:{
      globalDOMAIN(){
        return this.$store.state.globalDOMAIN
      }
    },
    methods:{
      logout(){
        let token = sessionStorage.getItem('token')
        this.$http.post(`${this.globalDOMAIN}Employ/User/logout`,{},{headers:{'token':token}}).then((res)=>{
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
  .settingWrapper
    display: flex
    flex-direction: column
    align-items: center
    height: 100vh
    background-color: #f8f8f8

  .settingBlock
    box-sizing: border-box
    display: flex
    flex-direction: column
    width: 100%
    padding-left: px2-2-rem(30)
    margin-bottom: px2-2-rem(20)
    border-top: 1px solid #e5e5e5
    border-bottom: 1px solid #e5e5e5
    background-color: #ffffff
    font-size: px2-2-rem(32)
    .settingItem
      box-sizing: border-box
      display: flex
      flex-direction: row
      justify-content: space-between
      align-items: center
      width: 100%
      height: px2-2-rem(88)
      padding-right: px2-2-rem(30)
      border-bottom: 1px solid #e5e5e5
      span
        color: #888888
      img
        margin-left: px2-2-rem(26)
        width: px2-2-rem(16)
        height: px2-2-rem(24)
    .settingItem:last-child
      border: none

  .settingLogout
    position: fixed
    bottom: px2-2-rem(30)
    width: px2-2-rem(688)
    height: px2-2-rem(86)
    line-height: px2-2-rem(86)
    text-align: center
    border-radius: px2-2-rem(8)
    font-size: px2-2-rem(32)
    color: #ffffff
    background-color: #00a0e9
</style>
