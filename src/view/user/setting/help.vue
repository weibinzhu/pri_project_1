<template>
  <div class="helpPageWrapper">
    <v-header title="使用帮助"></v-header>
    <div class="helpBlock" v-for="(item,index) in helpList">
      <div class="helpTitle">{{item.title}}</div>
      <p class="helpContent">{{item.content}}</p>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import header from '../../../components/v-header/v-header'

  export default {
    data() {
      return {
        helpList: [
          {
            title: '帮助标题1',
            content: '巴拉巴拉这里是帮助内容巴拉巴拉这里是帮助内容巴拉巴拉这里是帮助内容巴拉巴拉这里是帮助内容巴拉巴拉这里是帮助内容'
          },
          {
            title: '帮助标题2',
            content: '巴拉巴拉这里是帮助这里是帮助这里是帮助内容巴拉巴拉这里是帮助内容巴拉巴拉这里是帮助内容巴拉巴拉这里是帮助内容巴拉巴拉这里是帮助内容'
          }
        ]
      }
    },
    components: {
      'v-header': header
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../../common/style/fun.styl"
  .helpPageWrapper
    display: flex
    flex-direction: column
    align-items: center
    background-color: #f8f8f8
    .helpBlock
      box-sizing: border-box
      width: px2-2-rem(710)
      padding: px2-2-rem(40) px2-2-rem(42) px2-2-rem(60)
      font-size: px2-2-rem(32)
      margin-top :px2-2-rem(30)
      box-shadow: 0px 2px 3px 0px rgba(153,153,153,1);
      background-color: #ffffff
      .helpTitle
        height: px2-2-rem(70)
        line-height: px2-2-rem(70)
        color: #353535
      .helpContent
        color: #999
</style>
