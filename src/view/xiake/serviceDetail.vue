<template>
  <div class="serviceDetailWrapper">
    <v-header @share="onShareClick" title="服务详情" :starShow="true" :shareShow="true"></v-header>
    <loading v-show="isLoading"></loading>
    <!--内容区块Wrapper-->
    <div class="serviceInfoWrapper">
      <!--内容块-->
      <div class="serviceInfoBlock">
        <div class="serviceName">{{serviceName}}
          <div class="location">{{serviceLocation}}</div>
        </div>
        <div class="serviceDesc">{{serviceDesc}}</div>
      </div>
      <!--内容块-->
      <div class="serviceInfoBlock">
        <div class="serviceInfoHeader">
          <img class="serviceInfoIcon" src="./reward@3x.png"/>我的成就
        </div>
        <div class="serviceInfoContent">
          {{achievement}}
        </div>
      </div>
      <!--内容块-->
      <div class="serviceInfoBlock">
        <div class="serviceInfoHeader">
          <img class="serviceInfoIcon" src="./reward@3x.png"/>作品图片
        </div>
        <div class="picBlock">
          <div class="pic" v-for="(item,index) in imgList" :style="{backgroundImage: 'url(' + item + ')'}"></div>
        </div>
      </div>
      <!--内容块，峡客信息块-->
      <div class="xiakeInfoBlock">
        <div class="avatarWrapper">
          <img class="avatar" src="./head@3x.png"/>
        </div>
        <div class="xiakeInfo">
          <div class="name">
            {{userName}}
            <tag v-if="isCertificated"></tag>
          </div>
          <div class="tagsWrapper">
            <div class="tag" v-for="(item,index) in tagList">{{item}}</div>
          </div>
          <div class="xiakeStatistic">
            <div class="data">功力值 : <span>{{gongli}}</span></div>
            <div class="data">交易量 : <span>{{times}}</span></div>
          </div>
        </div>
        <!--客服按钮-->
        <img class="kefuBtn" src="/static/kefu@3x.png" @click="toggleWxId"/>
      </div>
    </div>
    <!--底部按钮-->
    <footer class="footerBtn">
      <div class="price">￥{{price}}/次</div>
      <router-link tag="div" :to="{name:'makeReservation',params:{id:id}}" class="reserBtn">立即预约</router-link>
    </footer>
    <!--客服-->
    <transition name="getWxFade">
      <div class="getWxModel" v-show="showGetWxModel">
        <div class="showText">
          <div class="title">请添加客服微信联系我们</div>
          <input class="wxId" :value="wxId" readonly/>
        </div>
        <div class="getWxIdBtn" data-clipboard-target=".wxId" @click="checkIphone">
          点击复制微信号
        </div>
      </div>
    </transition>
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
      <div class="overlay" v-show="showGetWxModel||showAd" @click="hideWxModel"></div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import header from '../../components/v-header/v-header.vue'
  import Tag from '@/components/tag'
  import loading from '@/components/loading'
  export default {
    name: 'serviceDetail',
    data() {
      return {
        isLoading:false,
        showAd: false,// 广告（下载行峡APP）显隐
        showGetWxModel: false,// 客服显隐
        wxId: 'fwfa21', // 客服微信号


        // 服务信息
        id: undefined,
        isCertificated: true, // 峡客是否已认证
        serviceName: '未查询到',
        serviceLocation: '未查询到',
        serviceDesc: '未查询到，根据您的需求，订制h5活动页',
        achievement: '未查询到',
        userName: '未查询到',
        tagList: ['未查询到'],
        gongli: '未查询到',
        times: '未查询到',// 交易量
        price:'未查询到',
        imgList:['/static/pl_image.jpg'],// 作品图片
      }
    },
    computed: {
      globalDOMAIN() {
        return this.$store.state.globalDOMAIN
      },
      token() {
        return sessionStorage.getItem('token')
      },
    },
    created() {
      this.id = this.$route.params.id
      this.getServiceInfo()
    },
    methods: {
      getServiceInfo() {
        this.$http.get(`${this.globalDOMAIN}Employ/Service/getById`, {
          params: {'service_id': this.id},
          emulateJSON: true,
          headers: {'token': this.token}
        }).then((res) => {
          this.processServiceInfoData(res.body.data)
        })
      },
      processServiceInfoData(data) {
        this.isCertificated = true // 峡客是否已认证
        this.serviceName = data.title
        this.serviceLocation = '广州'
        this.serviceDesc = data.desc
        this.achievement = data.achievement
        this.userName = data.user.username
        this.tagList = ['广州', '三年经验', '市场推广']
        this.gongli = data.user.point
        this.times = 6// 交易量
        this.price = data.price
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
      toggleWxId() { // 弹出或隐藏【点击复制客服微信】框
        let y = window.scrollY + 200;
        let model = document.querySelector(".getWxModel")
        model.style.top = y + 'px'
        this.showGetWxModel = !this.showGetWxModel
      },
      hideWxModel() {
        // 点击遮罩隐藏客服微信号
        if (this.showGetWxModel) {
          this.showGetWxModel = false
        } else {
          return false
        }
      },
      checkIphone() { // 优雅降级。（暂时不需要用）
        if (navigator.userAgent.match(/ipad|ipod|iphone/i)) {
          alert('如果复制失败请手动复制')
        }
      },
    },
    components: {
      loading,
      Tag,
      'v-header': header
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/style/fun.styl"
  .serviceDetailWrapper
    font-size: px2-2-rem(32)
    min-height: 100vh
    background-color: #f8f8f8
    padding-bottom: px2-2-rem(130)
    .serviceInfoWrapper
      display: flex
      flex-direction: column
      align-items: center
      padding-top: px2-2-rem(22)
      background-color: #f8f8f8
    .serviceInfoBlock
      display: flex
      flex-direction: column
      width: px2-2-rem(710)
      padding-bottom: px2-2-rem(30)
      margin-bottom: px2-2-rem(30)
      border-radius: px2-2-rem(8)
      background-color: #ffffff
      .serviceName
        display: flex
        align-items: center
        margin-top: px2-2-rem(20)
        padding-left: px2-2-rem(36)
        .location
          margin-left: px2-2-rem(40)
          font-size: px2-2-rem(26)
          color: #999999
      .serviceDesc
        margin-top: px2-2-rem(10)
        padding-left: px2-2-rem(36)
        font-size: px2-2-rem(26)
        color: #999999
      .serviceInfoHeader
        display: flex
        flex-direction: row
        align-items: center
        height: px2-2-rem(82)
        padding-left: px2-2-rem(36)
        border-bottom: 1px solid #e5e5e5
        .serviceInfoIcon
          width: px2-2-rem(30)
          height: px2-2-rem(36)
          margin-right: px2-2-rem(16)
      .serviceInfoContent
        font-size: px2-2-rem(28)
        padding: px2-2-rem(20) px2-2-rem(20) 0 px2-2-rem(36)
      .picBlock
        display: flex
        flex-direction: row
        padding: px2-2-rem(48) px2-2-rem(36) px2-2-rem(40)
        .pic
          width: px2-2-rem(145)
          height: px2-2-rem(145)
          margin-right: px2-2-rem(18)
          background-size :cover
          background-position :center
    .xiakeInfoBlock
      position: relative
      box-sizing: border-box
      display: flex
      flex-direction: row
      align-items: center
      width: px2-2-rem(710)
      margin-bottom: px2-2-rem(30)
      border-radius: px2-2-rem(8)
      background-color: #ffffff
      padding: px2-2-rem(48) px2-2-rem(36) px2-2-rem(40)
      .avatarWrapper
        position: relative
        width: px2-2-rem(154)
        height: px2-2-rem(154)
        margin-right: px2-2-rem(30)
        .avatar
          width: px2-2-rem(154)
          height: px2-2-rem(154)
      .xiakeInfo
        display: flex
        flex-direction: column
        height: px2-2-rem(154)
        justify-content: space-between
        .name, .tagsWrapper, .xiakeStatistic
          display: flex
          flex-direction: row
          align-items: center
          flex-wrap: wrap
        .tagsWrapper
          .tag
            height: px2-2-rem(28)
            line-height: px2-2-rem(28)
            padding-right: px2-2-rem(10)
            margin-left: px2-2-rem(10)
            font-size: px2-2-rem(28)
            border-right: 1px solid #999999
            color: #999999
          .tag:first-child
            margin: 0
          .tag:last-child
            border: none
        .data
          margin-right: px2-2-rem(50)
          font-size: px2-2-rem(28)
          color: #999999
          span
            color: #e4790f
      .kefuBtn
        position: absolute
        right: px2-2-rem(30)
        bottom: px2-2-rem(-30)
        width: px2-2-rem(70)
        height: px2-2-rem(70)
    .footerBtn
      box-sizing: border-box
      position: fixed
      bottom: 0
      display: flex
      height: px2-2-rem(86)
      width: 100%
      border-top: 1px solid #e5e5e5
      .price
        height: px2-2-rem(86)
        line-height: px2-2-rem(86)
        text-align: center
        flex: 1
        color: #00a0e9
        background-color: #ffffff
      .reserBtn
        height: px2-2-rem(86)
        line-height: px2-2-rem(86)
        text-align: center
        flex: 1
        color: #ffffff
        background-color: #00a0e9
    .overlay
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 1000;
      background-color: rgba(0, 0, 0, .8);

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
    .getWxFade-leave-active, .getWxFade-enter-active, .overlayFade-leave-active, .overlayFade-enter-active, .adFade-enter-active, .adFade-leave-active
      transition: all .5s
    .getWxFade-enter, .getWxFade-leave-to, .overlayFade-enter, .overlayFade-leave-to, .adFade-enter, .adFade-leave-to
      opacity: 0
  //    【点击复制客服微信弹框】
    .getWxModel
      position: absolute
      z-index: 10000
      left: calc(50vw - 3.7333rem)
      display: flex
      flex-direction: column
      align-items: center
      justify-content: space-around
      width: 7.46666rem
      height: 3.8933rem
      font-size: 0.48rem
      border-radius: 10px
      background-color: #fff
      .showText
        display: flex
        flex-direction: column
        align-items: center
        justify-content: space-around
        height: 2.1333rem
        box-sizing: border-box
        .title
          color: #000
        .wxId
          font-size: 0.42666rem
          color: #d2d3d5
          text-align: center
      .getWxIdBtn
        width: 100%
        height: 1.3333rem
        line-height: 1.3333rem
        text-align: center
        border-top: 1px solid #d2d3d5
        color: #00a0e9

</style>
