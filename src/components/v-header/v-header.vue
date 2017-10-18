<template>
  <div class="headerWrapper">
    <div class="headerInnerWrapper">
      <i class="iconfont icon-left headerArrow" @click="goBack"></i>
      <p>{{title}}</p>
      <div class="toolsWrapper">
        <img class="headerCollect" src="./favor@3x.png" v-if="starShow"/>
        <img @click="onShareClick" class="headerShare" src="./share_light@3x.png" v-if="shareShow"/>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      starShow: {
        type: Boolean,
        default:false
      },
      shareShow: {
        type: Boolean,
        default:false
      },
      title: {
        type: String
      }
    },
    methods: {
      goBack() {
        this.$router.go(-1) // vue-router编程式路由。返回上一个页面
      },
      onShareClick() {
        this.$emit('share') // emit一个叫share的自定义事件，父组件会捕获这个事件
      }
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/style/fun.styl"
  .headerWrapper
    /*为将来也许要做到固定导航条做准备*/
    /*position :fixed*/
    /*top:0*/
    width :100%
    /*z-index :100000*/
    .headerInnerWrapper
      position relative
      display: flex
      flex-direction: row
      align-items: center
      /*justify-content: space-around*/
      width: 100%
      height: 1.2rem
      font-size: 0.48rem
      background-color: #fff
      > p
        width: 100%
        height: 1.2rem
        line-height: 1.2rem
        text-align: center
      > i
        position: absolute

    .headerArrow
      left: 0.2rem
      font-size: 0.7rem
    .toolsWrapper
      position :absolute
      right :0
      height :100%
      display :flex
      flex-direction :row
      align-items :center
    .headerCollect
      width :px2-2-rem(42)
      height :px2-2-rem(42)
      margin-right :px2-2-rem(40)
    .headerShare
      width :px2-2-rem(38)
      height :px2-2-rem(40)
      margin-right :px2-2-rem(34)
</style>
