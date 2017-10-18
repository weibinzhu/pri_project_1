<template>
  <div class="caseDetailWrapper" v-show="showFlag">
    <!--<v-header :starShow="false" :shareShow="false" :title="'精彩案例'"></v-header>-->
    <!--因为这里‘返回’按钮只是隐藏详情页，不是后退，所以不能用这个组件-->
    <div class="headerWrapper">
      <i class="iconfont icon-left headerArrow" @click="hide"></i>
      <p>案例详情</p>
    </div>
    <img class="headImage" :src="selectedCase.img"/>
    <div class="caseSummary">
      <p class="caseTitle">{{selectedCase.title}}<span>服务周期：{{selectedCase.term}}</span></p>
      <p class="caseDescription">{{selectedCase.description}}</p>
    </div>
    <div class="dividerWrapper">
      <divider>案例介绍</divider>
    </div>
    <div class="detailContentWrapper">
      <p class="detailContent">{{selectedCase.content}}</p>
      <img :src="selectedCase.contentImg" class="detailContentImg" v-if="selectedCase.contentImg"/>
    </div>
    <footer class="footer">联系顾问</footer>
  </div>
</template>

<script type="text/ecmascript-6">
  import header from 'components/v-header/v-header.vue'
  import {Divider} from 'vux'

  export default {
    props: {
      selectedCase: {
        type: Object
      }
    },
    data() {
      return {
        showFlag: false,
      }
    },
    methods: {
      show() {
        // 显示详情页
        this.showFlag = true
      },
      hide() {
        // 隐藏详情页
        this.showFlag = false
      }
    },
    components: {
      Divider,
      'v-header': header
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .caseDetailWrapper
    position: absolute
    top: 0
    left: 0
    z-index: 100
    width: 100%
    min-height: 100vh
    background-color: #fff
    box-sizing: border-box
    padding-bottom :1.1466rem
    .headImage
      height: 4.8rem
      width: 100%
    .caseSummary
      height: 2.1333rem
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
        font-size: 0.42666rem
        color: #353535
        span
          font-size: 0.34666rem
          color: #999
      .caseDescription
        display: flex
        flex-direction: row
        align-items: center
        /*justify-content: space-around*/
        padding-left: 0.4rem
        height: 1.06666rem
        line-height: 1.06666rem
        font-size: 0.32rem
        color: #e4790f

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
      position: absolute
      bottom: 0
      width: 100%
      height: 1.1466rem
      line-height: 1.1466rem
      text-align: center
      font-size: 0.4266rem
      color: #fff
      background-color: #00a0e9

  //    直接套用v-header组件的样式，可不写
  /*.headerWrapper*/
  /*display: flex*/
  /*flex-direction: row*/
  /*align-items: center*/
  /*width: 100%*/
  /*height: 1.2rem*/
  /*font-size: 0.48rem*/
  /*background-color: #fff*/
  /*position relative*/
  /*> p*/
  /*width: 100%*/
  /*height: 1.2rem*/
  /*line-height: 1.2rem*/
  /*text-align: center*/
  /*> i*/
  /*position: absolute*/
  /*.headerArrow*/
  /*left: 0.2rem*/
  /*font-size: 0.7rem*/
</style>
