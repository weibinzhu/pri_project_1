<template>
  <div class="serviceDetailWrapper">
    <v-header @share="onShareClick" title="服务详情" :shareShow="true"></v-header>
    <loading v-show="isLoading"></loading>
    <!--内容区块Wrapper-->
    <div class="serviceInfoWrapper">
      <!--内容块-->
      <div class="serviceInfoBlock">
        <div class="subBlock">
          <div class="serviceInfoHeader">{{title}}</div>
          <div class="serviceInfoContent">
            {{content}}
          </div>
        </div>
        <div class="price">
          价格<span>{{price}}元/次</span>
        </div>
      </div>
      <!--内容块-->
      <div class="serviceInfoBlock">
        <div class="serviceInfoHeader">
          我的成就
        </div>
        <div class="serviceInfoContent">
          {{achievement}}
        </div>
      </div>
      <!--内容块-->
      <div class="serviceInfoBlock">
        <div class="serviceInfoHeader">
          作品图片
        </div>
        <div class="picBlock">
          <div class="pic" v-for="(item,index) in imgList" :style="{backgroundImage: 'url(' + item + ')'}"></div>
        </div>
      </div>
    </div>
    <!--底部按钮-->
    这里的type表明是从哪里来的，-1表明是峡客主页的我的服务的编辑进去的
    <router-link :to="{path:'/releaseService' , query: { type: '-1' }}" tag="footer" class="toEdit">编辑</router-link>
    <!--广告-->
    <transition name="adFade">
      <div class="adWrapper" v-show="showAd">
        <img class="adImg" src="/static/pic@3x.png"/>
        <img @click="onCloseBtnClick" class="closeBtn" src="./Close@3x.png"/>
        <div class="getAppBtn">
          下载行峡APP
        </div>
      </div>
    </transition>
    <!--遮罩-->
    <transition name="overlayFade">
      <div class="overlay" v-show="showAd"></div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import header from '../../../../components/v-header/v-header.vue'
  import loading from '@/components/loading'

  export default {
    name: 'serviceDetail',
    data() {
      return {
        isLoading: false,
        id: undefined,
        title: '未查询到', // 服务标题
        price: '未查询到', //价格
        content: '未查询到', // 服务内容
        achievement: '未查询到', // 我的成就
        imgList: ['/static/pl_image.jpg'],// 作品图片
        showAd: false,// 广告（下载行峡APP）显隐
      }
    },
    created() {
      this.id = this.$route.params.id
      this.getServiceInfoById()
    },
    computed: {
      globalDOMAIN() {
        return this.$store.state.globalDOMAIN
      },
      token() {
        return sessionStorage.getItem('token')
      }
    },
    methods: {
      getServiceInfoById() {
        this.$http.get(`${this.globalDOMAIN}Employ/Service/getById`, {
          params: {'service_id': this.id},
          emulateJSON: true,
          headers: {'token': this.token},
        }).then(res => {
          let body = res.body
          this.$vux.toast.text(body.msg)
          this.processServiceInfoData(body.data)
        })
      },
      processServiceInfoData(data) {
        console.log(data)
        this.title = data.title
        this.price = data.price
        this.content = data.desc
        this.achievement = data.achievement
        if(data.imgs){
          this.imgList = []
          for (let img of data.imgs){
            let url = `${this.globalDOMAIN.slice(0,-11)}${img}`
            this.imgList.push(url)
          }
        }
      },
      onCloseBtnClick() {
        if (this.showAd) {
          this.showAd = false
        }
      },
      onShareClick() {
        if (!this.showAd) {
          this.showAd = true
        }
      },
    },

    components: {
      loading,
      'v-header': header
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../../../common/style/fun.styl"
  .serviceDetailWrapper
    font-size: px2-2-rem(32)
    min-height: 100vh
    background-color: #f8f8f8
    padding-bottom: px2-2-rem(130)
    .serviceInfoWrapper
      display: flex
      flex-direction: column
      align-items: center
      background-color: #f8f8f8
    .serviceInfoBlock
      box-sizing: border-box
      display: flex
      flex-direction: column
      width: 100%
      padding: 0 px2-2-rem(20) px2-2-rem(30) px2-2-rem(36)
      margin-bottom: px2-2-rem(30)
      border-radius: px2-2-rem(8)
      border-top: 1px solid #e5e5e5
      background-color: #ffffff
      .price
        display: flex
        align-items: center
        justify-content: space-between
        height: px2-2-rem(88)
        border-top: 1px solid #e5e5e5
        span
          color: #888888
      .serviceName
        display: flex
        align-items: center
        margin-top: px2-2-rem(20)
        padding-left: px2-2-rem(36)
      .serviceDesc
        margin-top: px2-2-rem(10)
        padding-left: px2-2-rem(36)
        font-size: px2-2-rem(28)
        color: #999999
      .serviceInfoHeader
        display: flex
        flex-direction: row
        align-items: center
        height: px2-2-rem(82)
      .serviceInfoContent
        padding: px2-2-rem(20) 0
        font-size: px2-2-rem(28)
        color: #999999
      .picBlock
        display: flex
        flex-direction: row
        padding: px2-2-rem(10) 0 px2-2-rem(40)
        .pic
          width: px2-2-rem(145)
          height: px2-2-rem(145)
          margin-right: px2-2-rem(18)
          background-size :cover
          background-position :center
    .overlay
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 1000;
      background-color: rgba(0, 0, 0, .8);
    .toEdit
      position: fixed
      bottom: 0
      width: 100%
      height: px2-2-rem(86)
      line-height: px2-2-rem(86)
      text-align: center
      color: #ffffff
      background-color: #00a0e9
    .adWrapper
      position: absolute
      display: flex
      flex-direction: column
      align-items: center
      top: 12%
      left: 12%
      z-index: 10000
    .adImg
      position: relative
      width: px2-2-rem(586)
    .closeBtn
      position: absolute
      top: px2-2-rem(-40)
      right: px2-2-rem(-40)
      width: px2-2-rem(78)
      height: px2-2-rem(78)
    .getAppBtn
      margin-top: px2-2-rem(50)
      width: px2-2-rem(428)
      height: px2-2-rem(90)
      line-height: px2-2-rem(90)
      text-align: center
      font-size: px2-2-rem(32)
      color: #ffffff
      background-color: #00a0e9
      border-radius: px2-2-rem(42) px2-2-rem(42)
    .overlayFade-leave-active, .overlayFade-enter-active, .adFade-enter-active, .adFade-leave-active
      transition: all .5s
    .overlayFade-enter, .overlayFade-leave-to, .adFade-enter, .adFade-leave-to
      opacity: 0
</style>
