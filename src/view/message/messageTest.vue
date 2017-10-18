<template>
  <div class="messageTestWrapper">
    <v-header title="Michel Lee"></v-header>
  </div>
</template>

<script type="text/ecmascript-6">
import header from '@/components/v-header/v-header'
  export default {
  components:{
    'v-header':header
  }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
.messageTestWrapper
  height :100vh
  background-size :100vw 100vh
  background-position :0 0
  background-image :url("./chat.png")
</style>
