<template>
  <div class="myServiceWrapper">
    <v-header title="我的服务"></v-header>
    <loading v-show="isLoading"></loading>
    <router-link tag="div" :to="{name:'serviceDetail2', params:{id:item.taskId}}"
                 class="myServiceItem"
                 v-for="(item,index) in service" :key="index">
      <div class="myServiceItemInfo">
        <div class="itemName">
          {{item.name}}-type:{{typeList[item.type]}}
        </div>
        <div class="itemPrice">
          <div class="priceText">
            ￥{{item.price}}
            <div class="tradeNumber">交易：{{item.num}}笔</div>
          </div>
          <span v-if="item.type==0||item.type==1" :class="item.type==1?'special':''">{{typeList[item.type]}}</span>
        </div>
      </div>
      <div class="myServiceItemBtn">
        <div @click.stop="toggleModel('.reasonModel','showReasonModel')" class="refuseBtn" v-if="item.type == 1 ">拒绝原因
        </div>
        <div @click.stop="toggleModel('.deleteModel','showDeleteModel')" class="deleteBtn"
             v-if="item.type == 1">删除
        </div>
        <div class="modifyBtn" v-if="item.type == 1 || item.type == 2">修改</div>
        <div @click.stop="toggleModel('.removeModel','showRemoveModel')" class="remove" v-if="item.type == 2">下架</div>
        <div class="add" v-if="item.type == 1">上架</div>
      </div>
    </router-link>
    <footer class="myServiceFooter" @click="myServiceRelease">
      <router-link to="/releaseService" tag="div" class="myServiceRelease">发布服务</router-link>
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
    <transition name="reasonModelFade">
      <div class="reasonModel" v-show="showReasonModel">
        <div class="showText">
          <div class="title">拒绝原因</div>
          <div class="desc">告知原因及解决办法</div>
        </div>
        <div class="actionBtnWrapper">
          <div @click.stop="toggleModel('.reasonModel','showReasonModel')" class="cancelBtn">确定</div>
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
      <div class="overlay" v-show="showDeleteModel || showRemoveModel ||showReasonModel"></div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import header from '@/components/v-header/v-header'
  import loading from '@/components/loading'

  export default {
    name:'myService',
    data() {
      return {
        isLoading: false,
        typeList: ['审核中', '审核不通过', '普通'],
        //statusList: ['0-已选择', '1-已放弃', '2-托管资金', '3-已支付', '4-评价', '5-交易成功', '6-未选择', '7-暂无竞标'],
        service: [],
        showDeleteModel: false,
        showRemoveModel: false,
        showReasonModel: false,
      }
    },
    computed: {
      globalDOMAIN() {
        return this.$store.state.globalDOMAIN
      },
      token() {
        return sessionStorage.getItem('token')
      }
    },
    created() {
      this.getServiceList()
    },
    methods: {
      myServiceRelease() {
        return;
      },

      getServiceList() {
        this.$http.get(`${this.globalDOMAIN}Employ/Service/getList`, {
          params: {'user_id': sessionStorage.getItem('userid')},
          emulateJSON: true,
          headers: {'token': this.token}
        }).then((res) => {
          if (res.body.status) {
            this.processServiceData(res.body.data.lists)
          } else {
            this.$vux.toast.text(res.body.msg)
          }
        })
      },// 获取服务列表
      processServiceData(data) {
//        typeList: ['审核中', '审核不通过', '普通'],
//        statusList: ['0-已选择', '1-已放弃', '2-托管资金', '3-已支付', '4-评价', '5-交易成功', '6-未选择', '7-暂无竞标'],
//        service: [
//           type解释：0-审核中，1-审核不通过，2-普通，3-已完成(列表显示时用)
//           status解释：0-已选择，1-已放弃，2-托管资金，3-已支付，4-评价，5-交易成功，6-未选择，7-暂无竞标（进去详情后用）
//          {
//            name: '公众号推广核心商户扶持计划数据全面支持',
//            price: '15000-59500',
//            taskId: 1,
//            num: 2,// 交易笔数
//            type: 0,
//            status: 0,
//          },
//        ],
        if (data) {
          for (let item of data) {
            let tempItem = {
              name: item.title,
              price: item.price,
              taskId: item.id,// 服务id
              num: 6, // 交易量
              type: 0,
              status: 0,
            }
            this.service.push(tempItem)
          }
        }

      },// 处理服务列表数据


      toggleModel(selector, flag) {
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
      loading,
      'v-header': header
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../../../common/style/fun.styl"
  .myServiceWrapper
    display: flex
    flex-direction: column
    align-items: center
    min-height: 100vh
    font-size: px2-2-rem(32)
    background-color: #f8f8f8
    padding-bottom: 1.1466rem
    .myServiceItem
      display: flex
      flex-direction: column
      font-size: px2-2-rem(32)
      width: px2-2-rem(710)
      height: px2-2-rem(285)
      border-radius: px2-2-rem(8)
      margin: px2-2-rem(20) 0
      background-color: #ffffff
      .myServiceItemInfo
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
          .priceText
            flex: 1
            display: flex
          .tradeNumber
            margin-left: px2-2-rem(58)
          span
            color: #00a0e9
          .special
            color: #f0724f
      .myServiceItemBtn
        display: flex
        flex-wrap: wrap
        flex-direction: row
        justify-content: flex-end
        align-items: center
        height: px2-2-rem(94)
        padding: 0 px2-2-rem(38)
        border-top: 1px solid #e5e5e5
        .deleteBtn, .modifyBtn, .add, .remove, .refuseBtn
          font-size: px2-2-rem(26)
          border: 1px solid #cfcfcf
          border-radius: px2-2-rem(8)
          width: px2-2-rem(128)
          margin-left: px2-2-rem(20)
          height: px2-2-rem(50)
          line-height: px2-2-rem(50)
          text-align: center
          color: #888888
        .add
          border: 1px solid #00a0e9
          color: #00a0e9
        .remove
          border: 1px solid #f0724f
          color: #f0724f
    /*footer*/
    .myServiceFooter
      display: flex
      flex-direction: row
      position: fixed
      bottom: 0
      z-index: 100
      height: 1.1466rem
      width: 100%
      .myServiceRelease
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
  .deleteModel, .removeModel, .reasonModel
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

  .reasonModelFade-leave-active, .reasonModelFade-enter-active
    transition: all 0.5s

  .reasonModelFade-enter, .reasonModelFade-leave-to
    opacity: 0
</style>
