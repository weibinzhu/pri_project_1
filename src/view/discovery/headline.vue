<template>
  <div class="headlineWrapper">
    <v-header title="行峡头条"></v-header>
    <!--箭头，用于提示tab bar还可以向右滚动。相对于整个组件定位-->
    <div class="arrowIndicator">
      <img src="/static/arrow-right@2x.png"/>
    </div>
    <!--tab bar-->
    <ul class="tabBar" @click="onTabBarClick">
      <li class="tabBarItem" :data-index=index v-for="(item,index) in typeList">
        <!--这里在判断项的index是否等于当前active index时用了双等，而不是三等-->
        <!--因为项的index是数字，而当前active index是字符串-->
        <div :class="[currentActiveIndex==index?'active':'','tabBarItemText']" :data-index=index>{{item}}</div>
      </li>
    </ul>
    <div class="headlineBlock" v-for="(item,index) in headlineList" v-show="currentActiveIndex===item.type">
      <!--头图-->
      <div class="headImg" :data-large="item.imgUrl">
        <img src="/static/loading.gif"/>
      </div>
      <div class="contentBlock">
        <p class="title">{{item.title}}</p>
        <p class="desc">{{item.desc}}</p>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import header from '../../components/v-header/v-header.vue'

  export default {
    data() {
      return {
        typeList:['分类0','分类1','分类2','分类3','分类4','分类5',],// tab bar所有选择项
        currentActiveIndex: '0',// 当前tab bar选择的项的index
        headlineList: [ // 头条列表，暂时所有分类都放一起，以后可能一个分离一个数组（看后台怎么给数据）
          {
            title: '头条标题-0',
            desc: '简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介',
            imgUrl: '/static/discovery/picture@3x.png',
            type: '0'
          },
          {
            title: '头条标题-1',
            desc: '简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介',
            imgUrl: '/static/discovery/picture@3x.png',
            type: '1'
          },
          {
            title: '头条标题-2',
            desc: '简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介',
            imgUrl: '/static/discovery/picture@3x.png',
            type: '2'
          },
          {
            title: '头条标题-3',
            desc: '简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介',
            imgUrl: '/static/discovery/picture@3x.png',
            type: '3'
          },
          {
            title: '头条标题-3',
            desc: '简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介',
            imgUrl: '/static/discovery/picture@3x.png',
            type: '3'
          },
          {
            title: '头条标题-4',
            desc: '简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介',
            imgUrl: '/static/discovery/picture@3x.png',
            type: '4'
          },
          {
            title: '头条标题-5',
            desc: '简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介',
            imgUrl: '/static/discovery/picture@3x.png',
            type: '5'
          },
        ],
      }
    },
    methods: {
      onTabBarClick(e) {
        let index = e.target.dataset.index
        if (index) {
          this.currentActiveIndex = index
        }
      }
    },
    mounted() {
      let headImg = document.querySelectorAll('.headImg')
      headImg.forEach((item, index) => {
        let largeImg = new Image()
        largeImg.src = item.dataset.large
        largeImg.onload = () => {
          largeImg.classList.add('largeImg')
          item.appendChild(largeImg)
        }
      })
    },
    components: {
      'v-header': header
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/style/fun.styl"
  .headlineWrapper
    position: relative
    display: flex
    flex-direction: column
    align-items: center
    min-height: 100vh
    font-size: px2-2-rem(32)
    color: #353535
    background-color: #f8f8f8
    padding-bottom: px2-2-rem(30)
    .arrowIndicator
      position: absolute
      display: flex
      align-items: center
      top: 1.2rem
      right: 0
      width: px2-2-rem(30)
      height: px2-2-rem(100)
      background-color: #ffffff
      z-index: 100
      img
        width: px2-2-rem(16)
        height: px2-2-rem(24)
    .tabBar
      display: flex
      align-items: center
      width: 100%
      overflow: scroll
      overflow-x: auto
      overflow-y: hidden
      -webkit-overflow-scrolling: touch // 解决ios safari 下，使用overflow:scroll 后滚动不顺畅的问题
      height: px2-2-rem(100)
      background-color: #ffffff
      margin-bottom: px2-2-rem(24)
      .tabBarItem
        display: flex
        align-items: center
        justify-content: center
        flex: 1
        min-width: px2-2-rem(188)
        height: 100%
        .tabBarItemText
          box-sizing: border-box
          line-height: px2-2-rem(100)
          height: px2-2-rem(100)
          &.active
            color: #00a0e9
            border-bottom: px2-2-rem(6) solid #00a0e9
    .tabBar::-webkit-scrollbar // 隐藏webkit浏览器的滚动条
      display: none
    .headlineBlock
      display: flex
      flex-direction: column
      align-items: center
      width: px2-2-rem(710)
      margin-bottom: px2-2-rem(14)
      background-color: #ffffff
      border-radius: px2-2-rem(8)
      .contentBlock
        padding: px2-2-rem(10) px2-2-rem(30)
        .title
          line-height: px2-2-rem(60)
          color: #353535
        .desc
          font-size: px2-2-rem(28)
          color: #b3b3b3
</style>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/style/fun.styl"
  .headlineWrapper
    .headImg
      position: relative
      display: flex
      align-items: center
      justify-content: center
      width: px2-2-rem(710)
      height: px2-2-rem(404)
      .largeImg
        position: absolute
        top: 0
        left: 0
        width: px2-2-rem(710)
        height: px2-2-rem(404)
</style>
