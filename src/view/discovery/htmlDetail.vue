<template>
  <div class="htmlDetailWrapper">
    <v-header :title="title"></v-header>
    <div v-html="content"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  import header from '@/components/v-header/v-header'

  export default {
    data(){
      return {
      }
    },
    computed:{
      title(){
        return this.$store.state.htmlDetailTitle
      },
      content(){
        return this.$store.state.htmlDetailContent
      }
    },
    components: {
      'v-header': header
    },

  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
