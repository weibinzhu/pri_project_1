<template>
  <div class="projectDetailWrapper">
    <v-header title="项目详情"></v-header>
    <img class="headImage" :src="caseImg"/>
    <div class="caseSummary">
      <p class="caseTitle">{{caseTitle}}</p>
      <div class="caseDescWrapper"><span><img src="./countdown.png"/>服务周期：{{caseTerm}}</span><div>{{status}}</div></div>
    </div>
    <div class="dividerWrapper">
      <divider>案例介绍</divider>
    </div>
    <div class="detailContentWrapper" v-html="caseContent">
    </div>
    <footer class="footer" @click="toggleWxId">联系客服</footer>
    <!--客服-->
    <transition name="getWxFade">
      <div class="getWxModel" v-show="showGetWxModel">
        <div class="showText">
          <div class="title">请添加客服微信联系我们</div>
          <input class="wxId" :value="wxId" readonly/>
        </div>
        <div class="getWxIdBtn" data-clipboard-target=".wxId">
          点击复制微信号
        </div>
      </div>
    </transition>
    <transition name="overlayFade">
      <div class="overlay" v-show="showGetWxModel" @click="toggleWxId"></div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import header from "@/components/v-header/v-header.vue"
  import Divider from 'vux/src/components/divider/index.vue'
  export default {
    name:'projectDetail',
    data() {
      return {
        caseImg:'',
        caseContent:'',
        caseTitle:'',
        caseTerm:'',
        status:'',
        showGetWxModel: false,
      }
    },
    computed:{
      globalDOMAIN(){
        return this.$store.state.globalDOMAIN
      },
      token(){
        return sessionStorage.getItem('token')
      },
      wxId() {
        return this.$store.state.customerService.wechat
      }, // 客服微信号
    },
    methods:{
      toggleWxId(){
        let y = window.scrollY + 200;
        let model = document.querySelector(".getWxModel")
        model.style.top = y + 'px'
        this.showGetWxModel = !this.showGetWxModel
      }
    },
    mounted(){
      let id = this.$route.query.id
      this.$http.get(`${this.globalDOMAIN}Api/Common/getSampleDetail`,{
        params:{sample_id:id},
      }).then(res=>{
        let data = res.body.data
        this.caseImg = `${this.globalDOMAIN.slice(0, -11)}${data.img}`
        this.caseContent = data.content
        this.caseTitle = data.title
        this.caseTerm = data.cycle
        switch (data.type){
          case '1':
            this.status= '招商中'
            break
          case '2':
            this.status = '众筹中'
            break
          case '3':
            this.status = '已完成'
            break
        }
      })
    },
    components: {
      Divider,
      'v-header': header
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '../../common/style/fun.styl'
.projectDetailWrapper
  min-height :100vh
  padding-bottom :1.2rem
  overflow :hidden
  .headImage
    /*height: 4.8rem*/
    width: 100%
  .caseSummary
    height: 2rem
    width: 100%
    display: flex
    flex-direction: column
    border-bottom: 1px solid #e5e5e5
    .caseTitle
      display: flex
      flex-direction: row
      align-items: center
      justify-content: space-between
      padding-left: 0.4rem
      padding-right: 0.4rem
      height: 1.06666rem
      line-height: 1.06666rem
      font-size: px2-2-rem(36)
      color: #353535
    .caseDescWrapper
      display: flex
      flex-direction: row
      align-items: center
      justify-content: space-between
      padding-left: 0.4rem
      padding-right: 0.4rem
      font-size :px2-2-rem(28)
      img
        width :px2-2-rem(36)
        height :px2-2-rem(36)
        margin-right :px2-2-rem(20)
      span
        display: flex
        flex-direction: row
        align-items: center
        color: #999
      div
        color: #00a0e9
  .dividerWrapper
    font-size: 0.34666rem
    padding: 0 0.4rem
    background-color: #f8f8f8
    color: #666
  .detailContentWrapper
    font-size: 0.42666rem
    color: #999
    .detailContent
      padding: 0.88rem 0.88rem 0.8rem 0.5333rem
    .detailContentImg
      width: 100%
  .footer
    position: fixed
    bottom: 0
    width: 100%
    height: 1.1466rem
    line-height: 1.1466rem
    text-align: center
    font-size: 0.4266rem
    color: #fff
    background-color: #00a0e9
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

  .getWxFade-leave-active, .getWxFade-enter-active, .overlayFade-leave-active, .overlayFade-enter-active
    transition: all .5s

  .getWxFade-enter, .getWxFade-leave-to, .overlayFade-enter, .overlayFade-leave-to
    opacity: 0
  .overlay {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1000;
    background-color: rgba(0, 0, 0, .8);
  }
</style>
