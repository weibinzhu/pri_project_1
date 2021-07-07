<template>
  <div class="myReputationWrapper">
    <v-header title="我的名号"></v-header>
    <img class="headImg" :src="banner"/>
    <div class="reputationNotice">名号须知</div>
    <router-link tag="div" :to="item.link" v-for="(item,index) in reputationList"
                 class="reputationItem" :key="index">
      <div class="reputationTitleWrapper">
        <img class="reputationIcon" :src="item.icon"/>
        <div class="reputationTitle">{{item.title}}</div>
      </div>
      <div class="reputationText">点亮+功力值<img src="/static/arrow-right-gray.png"/></div>
    </router-link>
  </div>
</template>

<script type="text/ecmascript-6">
  import header from "@/components/v-header/v-header"

  export default {
    data() {
      return {
        banner:'/',
        reputationList: [
          {
            icon: '/static/zhuan@3x.png',
            title: '专家徽章',
            link: '/lightUpBadge?type=0'
          },
          {
            icon: '/static/xia@3x.png',
            title: '峡客徽章',
            link: '/lightUpBadge?type=1'
          },
//          {
//            icon: '/static/zhima@3x.png',
//            title: '芝麻信用',
//            link: '/zhima'
//          }
        ]
      }
    },
    computed:{
      globalDOMAIN() {
        return this.$store.state.globalDOMAIN
      },
    },
    mounted(){
      this.getAd()
    },
    methods:{
      getAd(){
        this.$http.get(`${this.globalDOMAIN}Api/Common/getAd`,{params:{type:3}}).then(res => {
          if(res.body.status){
            this.banner = `${this.globalDOMAIN.slice(0, -11)}${res.body.data.lists[0].img}`
          }
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
  .myReputationWrapper
    position: relative
    display: flex
    flex-direction: column
    min-height: 100vh
    font-size: px2-2-rem(32)
    background-color: #f8f8f8
    .headImg
      width :100%
    .reputationNotice
      position: absolute
      color: #00a0e9
      right: px2-2-rem(32)
      top: px2-2-rem(22)
    .reputationItem
      display: flex
      flex-direction: row
      justify-content: space-between
      align-items: center
      height: px2-2-rem(88)
      padding: 0 px2-2-rem(30)
      border-bottom: 1px solid #e5e5e5
      background-color: #ffffff
      .reputationTitleWrapper
        display: flex
        flex-direction: row
        align-items: center
        height: 100%
        .reputationIcon
          height: px2-2-rem(44)
          width: px2-2-rem(44)
          margin-right: px2-2-rem(18)
          border-radius: 50%
      .reputationText
        color: #888888
        img
          height: px2-2-rem(24)
          width: px2-2-rem(16)
          margin-left: px2-2-rem(26)
</style>
