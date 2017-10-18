<template>
    <li class="filterItem" @click="arrowMove(index,$event,page)">
      {{item}}
      <transition name="arrowMove">
        <span class="arrow" :class="isCurrent"></span>
      </transition>
    </li>
</template>

<script type="text/ecmascript-6">
  export default {
    props:['item','index','page'],
    methods:{
      // 将store里面的index更新为当前点击的项的index，如果本来就是自己的index，就将store的值设置为-1（全部取消active）
      arrowMove(index,event,page){
        if (page){
          // 由于一开始设计错误，各种参数强耦合在一起，不能应用在不同页面（会导致点击a页面的城市时，b页面的城市也会被改成点击后的状态）
          // 由于应用这个组件的页面一共有两个，因此采用简单的解决方法
          // 增加一个page的参数，并且这个参数只在峡客页下传入，在首页里是空的
          // 在store中给峡客页增加一组功能一样的参数，命名基本一致，添加_xiake后缀
          if (this.$store.state.taskFilterActiveIndex_xiake === index) {
            this.$store.commit({
              type: 'changeTaskFilterActiveIndex_xiake',
              index: -1,
              show: false,
            })
          }else{
            this.$store.commit({
              type: 'changeTaskFilterActiveIndex_xiake',
              index: index,
              show: true, // 控制下拉选择的显隐
            })
          }
        }else{
          if (this.$store.state.taskFilterActiveIndex === index) {
            this.$store.commit({
              type: 'changeTaskFilterActiveIndex',
              index: -1,
              show: false,
            })
          }else{
            this.$store.commit({
              type: 'changeTaskFilterActiveIndex',
              index: index,
              show: true, // 控制下拉选择的显隐
            })
          }
        }
      }
    },
    computed: {
      isCurrent(){ // 如果这里的index与store中存下的但前active的index相同，则给自己加上active的class，否则不加
        if(this.page){
          return this.index===this.taskFilterActiveIndex_xiake?'active':''
        }else{
          return this.index===this.taskFilterActiveIndex?'active':''
        }
      },
      taskFilterActiveIndex() {
        return this.$store.state.taskFilterActiveIndex
      },
      taskFilterActiveIndex_xiake(){
        return this.$store.state.taskFilterActiveIndex_xiake
      },
//      taskFilterPanelShow() {
//        return this.$store.state.taskFilterPanelShow
//      }
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .filterItem
      display : flex
      align-items :center
      justify-content : center
      flex-grow :1
      height : 1.081rem
    .arrow
      display : inline-block
      background-image : url("../../assets/arrow.png")
      background-size : 0.5405rem  1.081rem
      width : 0.5405rem
      height: 0.5405rem
      margin-left : 0.2703rem
      transition : background 0.1s
      &.active
        background-position-y :0.5405rem
        transition : background 0.1s
</style>
