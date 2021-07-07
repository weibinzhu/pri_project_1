<template>
  <div class="discoveryWrapper">
    <!--<div class="discoverHeadImgWrapper" data-large="/static/discovery/banner@3x.png">-->
    <img class="discoverHeadImg" :src="banner"/>
    <!--<img class="discoverHeadImgLoading" src="/static/loading.gif"/>-->
    <!--</div>-->
    <ul class="discoveryNav">
      <router-link to="/findProject" tag="li" class="discoveryNavBtn">
        <img src="/static/discovery/icon_xianmu@3x.png"/>
        <div>项目推荐</div>
      </router-link>
      <router-link to="/findExpert" tag="li" class="discoveryNavBtn">
        <img src="/static/discovery/icon_ziyuan@3x.png"/>
        <div>旅创智库</div>
      </router-link>
      <router-link tag="li" to="/myUnion" class="discoveryNavBtn">
        <img src="/static/discovery/icon_tongye@3x.png"/>
        <div>旅业联盟</div>
      </router-link>
      <router-link tag="li" to="/applyZhongChuang" class="discoveryNavBtn">
        <img src="/static/discovery/icon_pingtai@3x.png"/>
        <div>众创空间</div>
      </router-link>
    </ul>
    <router-link to="/headline" tag="div" class="headlineSlogan">
      <img src="/static/discovery/title_picture@3x.png"/>
      <div>关于全域旅游的那些事</div>
    </router-link>
    <divider>成为平台合伙人</divider>
    <div class="headlineWrapper">
      <router-link tag="div" :to="item.href" class="headlineItem" v-for="(item,index) in headlineList" :data-large="item.src">
          <img class="headlineLoading" src="/static/loading.gif"/>
      </router-link>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Divider from 'vux/src/components/divider/index.vue'

  export default {
    data() {
      return {
        banner: '',// 头图
        headlineList: [
          {
            src: '/static/discovery/picture_01@3x.png',
            href: '/applyBaicheng'
          },
          {
            src: '/static/discovery/picture_02@3x.png',
            href: '#'
          }
        ]
      }
    },
    computed: {
      globalDOMAIN() {
        return this.$store.state.globalDOMAIN
      },
    },
    mounted() {
      // 头图加载
//      let discoveryHead = document.querySelector('.discoverHeadImgWrapper')
//      let headImg = new Image()
//      headImg.src = discoveryHead.dataset.large
//      headImg.onload = function (){
//        headImg.classList.add('discoverHeadImg')
//        discoveryHead.appendChild(headImg)
//      }
      this.$http.get(`${this.globalDOMAIN}Api/Common/getAd`, {params: {type: 2}}).then(res => {
        if (res.body.status) {
          this.banner = `${this.globalDOMAIN.slice(0, -11)}${res.body.data.lists[0].img}`
        }
      })// 获取头图

      // 文章列表图片加载
      let headlineItem = document.querySelectorAll('.headlineItem')
      for (let i = 0; i < headlineItem.length; i++) {
        let headlineImg = new Image()
        headlineImg.src = headlineItem[i].dataset.large
        headlineImg.onload = function () {
          headlineImg.classList.add('headlineImg')
          headlineItem[i].appendChild(headlineImg);
        }
      }
    },
    components: {
      Divider,
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/style/fun.styl"
  .discoveryWrapper
    display: flex
    flex-direction: column
    min-height: 100vh
    background-color: #f8f8f8
    font-size: px2-2-rem(32)
    color: #353535
    padding-bottom: 1.9rem; /*防止底部内容被tap bar挡住*/
    .discoverHeadImg
      width: 100%
    /*.discoverHeadImgWrapper
      position: relative
      display: flex
      flex-direction: column
      align-items: center
      justify-content: center
      height: px2-2-rem(328)
      width: 100%
      .discoverHeadImg
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: px2-2-rem(328)*/
    .discoveryNav
      display: flex
      flex-direction: row
      align-items: center
      height: px2-2-rem(184)
      background-color: #ffffff
      text-align: center
      .discoveryNavBtn
        flex: 1
        img
          width: px2-2-rem(88)
    .headlineSlogan
      display: flex
      flex-direction: row
      align-items: center
      height: px2-2-rem(94)
      background-color: #ffffff
      img
        height: px2-2-rem(94)
      div
        height: px2-2-rem(52)
        line-height: px2-2-rem(52)
        font-size: px2-2-rem(26)
        padding-left: px2-2-rem(18)
        border-left: 1px solid #e5e5e5
    .headlineWrapper
      display: flex
      flex-direction: column
      align-items: center
      padding-top: px2-2-rem(20)
      padding-bottom: px2-2-rem(20)
      background-color: #ffffff
      .headlineItem
        position: relative
        display: flex
        flex-direction: column
        align-items: center
        justify-content: center
        width: px2-2-rem(712)
        height: px2-2-rem(360)
        margin-bottom: px2-2-rem(16)
        .headlineImg
          position: absolute
          top: 0
          left: 0
          width: px2-2-rem(712)
</style>
