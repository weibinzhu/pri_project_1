<template>
  <div class="taskItemWrapper" :data-id="item.id">
    <div class="taskContent">
      <p class="taskTitle">{{item.taskTitle}}</p>
      <p class="taskPrice">￥<span>{{item.taskPrice}}</span></p>
      <p class="taskDetail">
        <span>任务周期：{{item.taskDetail[0]}}</span><span class="dot">·</span><span>协作方式：{{item.taskDetail[1]}}</span>
      </p>
    </div>
    <div class="clientInfo">
      <img :src="item.logo" class="clientLogo"/>
      <span class="clientName">{{item.clientName}}{{item.type}}</span>
      <span class="clientTag" v-if="item.isCertificated">{{item.clientTag}}</span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props:{
      item:{
        type: Object,
      },
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '../../../common/style/fun.styl'
  .taskItemWrapper
    display: flex
    flex-direction: column
    width: 100%
    margin-bottom: 0.2703rem
    background-color: #fff
    .taskContent
      display: flex
      flex-direction: column
      /*height: 2.703rem*/
      padding: 0.2265rem 0 0 px2-2-rem(30)
      border-bottom: 1px solid #e5e5e5
      /*margin-bottom: 0.2265rem*/
      .taskTitle
        font-size: px2-2-rem(32)
        height: 0.94rem
        line-height: 0.94rem
        color: #353535
      .taskPrice
        font-size: px2-2-rem(32)
        height: 0.56rem
        line-height: 0.56rem
        color: #e4790f
        span
          font-size: px2-2-rem(32)
      .taskDetail
        font-size: px2-2-rem(26)
        height: 0.75rem
        line-height: 0.75rem
        color: #888
        .dot
          margin: 0 0.2973rem
    .clientInfo
      display: flex
      flex-direction: row
      align-items: center
      height: 0.8rem
      padding-left: 0.3rem
      .clientLogo
        width: 0.6216rem
        height: 0.6216rem
        margin-right: 0.4054rem
      .clientName
        color: #b3b3b3
        font-size: px2-2-rem(26)
      .clientTag
        height: 0.3514rem
        width: 1.216rem
        line-height: 0.3514rem
        border: 1px solid #00a0e9
        border-radius: 5px
        color: #00a0e9
        font-size: 0.2703rem
        text-align: center
        margin-left: 0.2703rem
</style>
