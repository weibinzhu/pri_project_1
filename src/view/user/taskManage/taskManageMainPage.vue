<template>
  <div class="taskManageWrapper">
    <v-header title="任务管理"></v-header>
    <router-link tag="div" :to="{name:'taskDetail', params:{id:item.taskId,status:item.status,type:1}}"
                 class="taskManageItem"
                 v-for="(item,index) in tasks" :key="index">
      <div class="taskManageItemInfo">
        <div class="itemName">
          {{item.name}} status：{{statusList[item.status]}}
        </div>
        <div class="itemPrice">
          ￥{{item.price}}<span>{{typeList[item.type]}}</span>
        </div>
      </div>
      <div class="taskManageItemBtn">
        <router-link to="/toRateTask" tag="div" class="toBeRate" v-if="item.type == 5 ">评价</router-link>
        <div @click.stop="toggleModel('.deleteModel','showDeleteModel')" class="deleteBtn"
             v-if="item.type == 1 || item.type == 2 || item.type == 3 || item.type == 6">删除
        </div>
        <div class="modifyBtn" v-if="item.type == 0 || item.type == 1 || item.type == 3 || item.type == 3">修改</div>
        <div @click.stop="toggleModel('.removeModel','showRemoveModel')" class="remove" v-if="item.type == 0 || item.type == 2">下架</div>
        <div class="add" v-if="item.type == 3">上架</div>
      </div>
    </router-link>
    <footer class="taskManageFooter" @click="taskManageRelease">
      <router-link to="/taskRelease2" tag="div" class="taskManageRelease">发布任务</router-link>
    </footer>
    <transition name="deleteModelFade">
      <div class="deleteModel" v-show="showDeleteModel">
        <div class="showText">
          <div class="title">删除任务</div>
          <div class="desc">删除任务后不可恢复</div>
        </div>
        <div class="actionBtnWrapper">
          <div @click.stop="deleteItem" class="confirmBtn">确定</div>
          <div @click.stop="toggleModel('.deleteModel','showDeleteModel')" class="cancelBtn">取消</div>
        </div>
      </div>
    </transition>
    <transition name="removeModelFade">
      <div class="removeModel" v-show="showRemoveModel">
        <div class="showText">
          <div class="title">下架任务</div>
          <div class="desc">下架任务后可重新上架</div>
        </div>
        <div class="actionBtnWrapper">
          <div @click.stop="removeItem" class="confirmBtn">确定</div>
          <div @click.stop="toggleModel('.removeModel','showRemoveModel')" class="cancelBtn">取消</div>
        </div>
      </div>
    </transition>
    <transition name="overlayFade">
      <div class="overlay" v-show="showDeleteModel || showRemoveModel"></div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import header from '@/components/v-header/v-header'

  export default {
    data() {
      return {
        typeList: ['审核中', '审核不通过', '竞标中', '已下架', '服务中', '待评价', '已完成'],
        statusList: ['0-已选择', '1-已放弃', '2-托管资金', '3-已支付', '4-评价', '5-交易成功', '6-未选择', '7-暂无竞标'],
        tasks: [
          // type解释：0-审核中，1-审核不通过，2-竞标中，3-已下架，4-服务中，5-待评价，6-已完成
          // status解释：0-已选择，1-已放弃，2-托管资金，3-已支付，4-评价，5-交易成功，6-未选择，7-暂无竞标
          {
            name: '英语主持服务',
            price: '15000-59500',
            taskId: 1,
            type: 0,
            status: 0,
          },
          {
            name: '英语主持务',
            price: '15000-59500',
            taskId: 2,
            type: 1,
            status: 1,
          },
          {
            name: '英语主持服',
            price: '15000-59500',
            taskId: 3,
            type: 3,
            status: 2,
          },
          {
            name: '英语主持持服持服服务',
            price: '15000-59500',
            taskId: 4,
            type: 2,
            status: 3,
          },
          {
            name: '英语服务',
            price: '15000-59500',
            taskId: 5,
            type: 5,
            status: 4,
          },
          {
            name: '英务',
            price: '15000-59500',
            taskId: 6,
            type: 4,
            status: 5,
          },
          {
            name: '英务da',
            price: '15000-59500',
            taskId: 7,
            type: 6,
            status: 6,
          },
          {
            name: '英务da',
            price: '15000-59500',
            taskId: 7,
            type: 6,
            status: 7,
          }
        ],
        showDeleteModel: false,
        showRemoveModel: false,
      }
    },
    methods: {
      taskManageRelease() {
        return;
      },
      toggleModel(selector,flag){
        // 弹出或隐藏某个框
        // selector: String, 用于传给querySelector
        // flag: String, 用于确定是哪一个框
        let y = window.scrollY + 200;
        let model = document.querySelector(selector)
        model.style.top = y + 'px'
        this[flag] = !this[flag]
      },
      deleteItem() {
        // 删除某项
        console.log('deleted!')
        this.showDeleteModel = !this.showDeleteModel
      },
      removeItem() {
        // 下架某项
        console.log('removed!')
        this.showRemoveModel = !this.showRemoveModel
      }
    },
    components: {
      'v-header': header
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../../common/style/fun.styl"
  .taskManageWrapper
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center
    min-height: 100vh
    font-size: px2-2-rem(32)
    background-color: #f8f8f8
    padding-bottom: 1.1466rem
    .taskManageItem
      display: flex
      flex-direction: column
      font-size: px2-2-rem(32)
      width: px2-2-rem(710)
      height: px2-2-rem(285)
      border-radius: px2-2-rem(8)
      margin: px2-2-rem(20) 0
      background-color: #ffffff
      .taskManageItemInfo
        display: flex
        flex-direction: column
        justify-content: space-around
        height: px2-2-rem(188)
        padding: 0 px2-2-rem(38)
        .itemName
          color: #353535
        .itemPrice
          display: flex
          justify-content: space-between
          font-size: px2-2-rem(26)
          color: #e4790f
          span
            color: #00a0e9
      .taskManageItemBtn
        display: flex
        flex-wrap: wrap
        flex-direction: row
        justify-content: flex-end
        align-items: center
        height: px2-2-rem(94)
        padding: 0 px2-2-rem(38)
        border-top: 1px solid #e5e5e5
        .toBeRate, .deleteBtn, .modifyBtn, .add, .remove
          font-size: px2-2-rem(26)
          border: 1px solid #cfcfcf
          border-radius: px2-2-rem(8)
          width: px2-2-rem(128)
          margin-left: px2-2-rem(20)
          height: px2-2-rem(50)
          line-height: px2-2-rem(50)
          text-align: center
          color: #888888
        .add, .toBeRate
          border: 1px solid #00a0e9
          color: #00a0e9
        .remove
          border: 1px solid #f0724f
          color: #f0724f
    /*footer*/
    .taskManageFooter
      display: flex
      flex-direction: row
      position: fixed
      bottom: 0
      z-index: 100
      height: 1.1466rem
      width: 100%
      .taskManageRelease
        height: 1.1466rem
        line-height: 1.1466rem
        flex: 1
        text-align: center
        background-color: #00a0e9
        color: #fff

  .overlay {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1000;
    background-color: rgba(0, 0, 0, .8);
  }

  //    【弹框】
  .deleteModel, .removeModel
    position: absolute
    z-index: 10000
    left: calc(50vw - 3.7333rem)
    display: flex
    flex-direction: column
    align-items: center
    justify-content: space-around
    width: 7.46666rem
    height: 3.8933rem
    font-size: 0.48rem
    border-radius: 10px
    background-color: #fff
    .showText
      display: flex
      flex-direction: column
      align-items: center
      justify-content: space-around
      height: 2.1333rem
      box-sizing: border-box
      .title
        color: #000
      .desc
        font-size: 0.42666rem
        color: #d2d3d5
        text-align: center
    .actionBtnWrapper
      display: flex
      flex-direction: row
      align-items: center
      justify-content: center
      width: 100%
      height: 1.3333rem
      border-top: 1px solid #d2d3d5
      .confirmBtn, .cancelBtn
        box-sizing: border-box
        flex: 1
        height: 1.3333rem
        line-height: 1.3333rem
        text-align: center
      .cancelBtn
        color: #00a0e9
        border-left: 1px solid #cccccc

  .deleteModelFade-leave-active, removeModelFade-leave-active, .deleteModelFade-enter-active, .removeModelFade-enter-active, .overlayFade-leave-active, .overlayFade-enter-active
    transition: all .5s

  .deleteModelFade-enter, .removeModelFade-enter, .removeModelFade-leave-to, .deleteModelFade-leave-to, .overlayFade-enter, .overlayFade-leave-to
    opacity: 0
</style>
