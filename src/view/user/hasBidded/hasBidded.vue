<template>
  <div class="hasBiddedWrapper">
    <v-header title="我竞标的"></v-header>
    <!--tab bar-->
    <ul class="tabBar" @click="onTabClick">
      <li class="tabItem" data-tab-id="0">
        <div :class="[currentTabItem == 0? 'active':'','tabItemText']" data-tab-id="0">已竞标</div>
      </li>
      <li class="tabItem" data-tab-id="1">
        <div :class="[currentTabItem == 1? 'active':'','tabItemText']" data-tab-id="1">已中标</div>
      </li>
    </ul>
    <div class="listWrapper">
      <router-link :to="{name:'hasBiddedItemDetail',params:{id:item.id,status:item.status}}" tag="div" class="listItem"
                   v-for="(item,index) in list" v-show="isThisItemShow(index)">
        <div class="itemInfo">
          <div class="title">{{item.name}}-{{statusList[item.status]}}</div>
          <div class="company"><img src="./store.png"/>{{item.company}}</div>
          <img class="delete" src="./delete.png"/>
        </div>
        <div class="priceWrapper">
          <div class="price">
            金额：<span>￥{{item.price}}</span>
          </div>
          <div :class="[item.type==1?'lose':'','status']">
            {{typeList[item.type]}}
          </div>
        </div>
      </router-link>
      <!--没有竞标记录的时候显示-->
      <img v-if="list.length==0" class="noBid" src="./noBid@3x.png"/>
      <p v-if="list.length==0" class="noBidText">暂无投标记录</p>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import header from '@/components/v-header/v-header'

  export default {
    data() {
      return {
        currentTabItem: 0,// 当前active tab bar item
        typeList: ['竞标中', '被淘汰', '待确认', '发起合同', '待支付', '待评价', '服务中'],
        statusList: ['0-已中标', '1-待评价', '2-交易成功'],
        list: [
          {
            id: 1123,
            name: '广东省XXX课题众包政府课题需要招募人员需求标题标题标题标题',
            company: '主题邦',
            price: 13999,
            type: 0,
            status:0,
          },
          {
            id: 1123,
            name: '广东省XXX课题众包政府课题需要招募人员需求标题标题标题标题',
            company: '主题邦',
            price: 13999,
            type: 1,
            status:0,
          },
          {
            id: 1123,
            name: '广东省XXX课题众包政府课题需要招募人员需求标题标题标题标题',
            company: '主题邦',
            price: 13999,
            type: 2,
            status:1,
          },
          {
            id: 1123,
            name: '广东省XXX课题众包政府课题需要招募人员需求标题标题标题标题',
            company: '主题邦',
            price: 13999,
            type: 3,
            status:2,
          },
          {
            id: 1123,
            name: '广东省XXX课题众包政府课题需要招募人员需求标题标题标题标题',
            company: '主题邦',
            price: 13999,
            type: 4,
            status:1,
          },
          {
            id: 1123,
            name: '广东省XXX课题众包政府课题需要招募人员需求标题标题标题标题',
            company: '主题邦',
            price: 13999,
            type: 5,
            status:1,
          },
          {
            id: 1123,
            name: '广东省XXX课题众包政府课题需要招募人员需求标题标题标题标题',
            company: '主题邦',
            price: 13999,
            type: 6,
            status:0,
          },
          {
            id: 1123,
            name: '广东省XXX课题众包政府课题需要招募人员需求标题标题标题标题',
            company: '主题邦',
            price: 13999,
            type: 4,
            status:0,
          },
        ],// 我竞标的列表
      }
    },
    methods: {
      onTabClick(e) {
        // 点击tab bar
        if (e.target.dataset.tabId) {
          this.currentTabItem = e.target.dataset.tabId
        }
      },
      isThisItemShow(index) {
        // 判断哪些需要被显示
        let current = this.currentTabItem
        if (index < 2) {
          return current == 0
        } else {
          return current == 1
        }
      }
    },
    components: {
      'v-header': header
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../../common/style/fun.styl"
  .hasBiddedWrapper
    display: flex
    flex-direction: column
    min-height: 100vh
    font-size: px2-2-rem(32)
    padding-bottom: px2-2-rem(100)
    background-color: #f8f8f8
    .tabBar
      box-sizing: border-box
      display: flex
      flex-direction: row
      align-items: center
      width: 100%
      height: px2-2-rem(84)
      font-size: px2-2-rem(32)
      color: #666666
      background-color: #ffffff
      border-top: 1px solid #e5e5e5
      border-bottom: 1px solid #e5e5e5
      .tabItem
        flex: 1
        display: flex
        flex-direction: row
        justify-content: center
        align-items: center
      .tabItemText
        box-sizing: border-box
        width: px2-2-rem(170)
        height: px2-2-rem(84)
        line-height: px2-2-rem(84)
        text-align: center
        padding: 0 px2-2-rem(30)
      .active
        color: #00a0e9
        border-bottom: px2-2-rem(8) solid #00a0e9
    .listWrapper
      display: flex
      flex-direction: column
      align-items: center
      min-height: 80vh
    .noBid
      margin-top: px2-2-rem(240)
      width: px2-2-rem(366)
      height: px2-2-rem(300)
    .noBidText
      margin-top: px2-2-rem(20)
      font-size: px2-2-rem(28)
      color: #989898
    .listItem
      display: flex
      flex-direction: column
      width: px2-2-rem(710)
      margin-top: px2-2-rem(30)
      border-radius: px2-2-rem(8)
      background-color: #ffffff
      .itemInfo
        position: relative
        display: flex
        flex-direction: column
      .delete
        position: absolute
        right: px2-2-rem(30)
        top: px2-2-rem(46)
        width: px2-2-rem(46)
        height: px2-2-rem(46)
      .title
        padding: px2-2-rem(45) px2-2-rem(118) 0 px2-2-rem(38)
      .company
        display: flex
        align-items: center
        font-size: px2-2-rem(26)
        color: #888888
        margin-top: px2-2-rem(10)
        margin-bottom: px2-2-rem(16)
        padding-left: px2-2-rem(38)
        img
          margin-right: px2-2-rem(14)
          width: px2-2-rem(32)
      .priceWrapper
        display: flex
        align-items: center
        justify-content: space-between
        height: px2-2-rem(94)
        padding: 0 px2-2-rem(38)
        border-top: 1px solid #e5e5e5
        font-size: px2-2-rem(26)
        .status
          color: #00a0e9
          &.lose
            color: #f0724f
        .price
          span
            color: #e4790f
</style>
