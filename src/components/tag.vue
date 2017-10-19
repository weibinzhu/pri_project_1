<template>
  <div :class="[tagClass,'tag']">{{tagName}}</div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      tagName: {
        type: String,
        default: '已认证'
      },
      tagClass: {
        type: String,
        default: 'tagBlue'
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../common/style/fun.styl"
  .tag
    width: px2-2-rem(88)
    height: px2-2-rem(26)
    line-height: px2-2-rem(26)
    text-align: center
    font-size: px2-2-rem(22)
    margin-left: px2-2-rem(20)
    border-radius: px2-2-rem(8)
    &.tagBlue
      border: 1px solid #00a0e9
      color: #00a0e9
    &.tagWhite
      border: 1px solid #ffffff
      color: #ffffff
    &.tagBlueWhite
      color: #00a0e9
      background-color: #ffffff
</style>
