<template>
  <!--展示loading gif，用于各个有请求的页面-->
  <img src="/static/loading.gif" class="loading"/>
</template>

<script type="text/ecmascript-6">

</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../common/style/fun.styl"
.loading
  position :fixed
  top:px2-2-rem(600)
  left :px2-2-rem(340)
  z-index :10000
</style>
