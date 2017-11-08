<template>
  <div class="headerWrapper">
    <div class="headerInnerWrapper">
      <i class="iconfont icon-left headerArrow" @click="goBack"></i>
      <p>{{title}}</p>
      <div class="toolsWrapper">
        <div @click="collect" :class="['headerCollect',favId!=-1?'isFav':'']" v-if="starShow"></div>
        <!--<img @click="collect" class="headerCollect" src="./favor@3x.png" v-if="starShow"/>-->
        <img @click="onShareClick" class="headerShare" src="./share_light@3x.png" v-if="shareShow"/>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
//        isFav: false
      }
    },
    props: {
      starShow: {
        type: Boolean,
        default: false
      },
      shareShow: {
        type: Boolean,
        default: false
      },
      title: {
        type: String
      },
//      favId: {
//        type: String,
//      },
      id: {
        type: String
      }// 任务id或服务id
    },
    computed: {
      globalDOMAIN() {
        return this.$store.state.globalDOMAIN
      },
      token() {
        return sessionStorage.getItem('token')
      },
      favId(){
        return this.$store.state.favId
      }
    },
//    watch: {
//      favId(val) {
//        if (val != -1) {
//          this.isFav = true
//        }
//      },
//    },
    methods: {
      goBack() {
        this.$router.go(-1) // vue-router编程式路由。返回上一个页面
      },
      onShareClick() {
        this.$emit('share') // emit一个叫share的自定义事件，父组件会捕获这个事件
      },
      collect() {
        if (this.title == '任务详情') {
          if (this.favId == -1) {
            this.$http.post(`${this.globalDOMAIN}Employ/Task/favorite`, {task_id: this.id}, {
              headers: {token: this.token},
              emulateJSON: true
            }).then(res => {
//              this.$vux.toast.text(res.body.msg)
              if (res.body.status) {
                this.$store.commit('changeFavId',{id:res.body.data.favorite_id})
              }
            })
          } else {
            this.$http.post(`${this.globalDOMAIN}Employ/Favorite/del`, {favorite_id: this.favId}, {
              headers: {token: this.token},
              emulateJSON: true
            }).then(res => {
              if (res.body.status) {
//                this.$vux.toast.text(res.body.msg)
                this.$store.commit('changeFavId',{id:-1})
              } else {
                this.$vux.toast.text('已取消收藏')
              }
            })
          }
        } else if (this.title == '服务详情') {
          if (this.favId == -1) {
            this.$http.post(`${this.globalDOMAIN}Employ/Service/favorite`, {service_id: this.id}, {
              headers: {token: this.token},
              emulateJSON: true
            }).then(res => {
//              this.$vux.toast.text(res.body.msg)
              if (res.body.status) {
                this.$store.commit('changeFavId',{id:res.body.data.favorite_id})
              }
            })
          } else {
            this.$http.post(`${this.globalDOMAIN}Employ/Favorite/del`, {favorite_id: this.favId}, {
              headers: {token: this.token},
              emulateJSON: true
            }).then(res => {
              if (res.body.status) {
//                this.$vux.toast.text(res.body.msg)
                this.$store.commit('changeFavId',{id:-1})
              } else {
                this.$vux.toast.text('已取消收藏')
              }
            })
          }
        }
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
    width: 100%
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
      position: absolute
      right: 0
      height: 100%
      display: flex
      flex-direction: row
      align-items: center
    .headerCollect
      width: px2-2-rem(42)
      height: px2-2-rem(42)
      margin-right: px2-2-rem(40)
      background-size: px2-2-rem(84) px2-2-rem(42)
      background-position: 0 0
      background-image: url("/static/collect.png")
    .isFav
      background-position: px2-2-rem(42) 0
    .headerShare
      width: px2-2-rem(38)
      height: px2-2-rem(40)
      margin-right: px2-2-rem(34)
</style>
