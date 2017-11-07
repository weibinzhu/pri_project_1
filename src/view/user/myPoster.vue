<template>
  <div class="myPosterWrapper">
    <v-header title="我的海报"></v-header>
    <div class="imgWrapper">
      <img :src="poster"/>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import header from '@/components/v-header/v-header'

  export default {
    data(){
      return {
        poster:''
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
      this.getPoster()
    },
    methods:{
      getPoster(){
        this.$http.post(`${this.globalDOMAIN}Employ/User/getPoster`,{},{
          headers:{token:this.token},
          emulateJSON:true
        }).then(res=>{
          this.poster = res.body.data.data.qrcode_url
        })
      },
    },
    components: {
      'v-header': header
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .myPosterWrapper
    min-height: 100vh
    .imgWrapper
      width :100%
      height :100%
      img
        width :100%
</style>
