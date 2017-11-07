<template>
<div class="helpDetailWrapper">
  <v-header :title="title"></v-header>
  <div class="contentWrapper" v-html="content">

  </div>
</div>
</template>

<script type="text/ecmascript-6">
import header from '@/components/v-header/v-header'
  export default {
    data(){
      return {
        title:'帮助详情',
        content:''
      }
    },
    computed:{
      globalDOMAIN(){
        return this.$store.state.globalDOMAIN
      },
      token(){
        return sessionStorage.getItem('token')
      }
    },
    mounted(){
      let id = this.$route.query.id
      this.$http.get(`${this.globalDOMAIN}Api/Common/getHelpDetail`,{
        params:{'help_id':id}
      }).then(res=>{
        let data = res.body.data
        this.title = data.title
        this.content = data.content
      })
    },
    components:{
      'v-header':header
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
