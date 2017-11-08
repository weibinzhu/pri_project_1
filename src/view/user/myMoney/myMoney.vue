<template>
  <div class="myMoneyWrapper">
    <v-header title="账户余额"></v-header>
    <div class="overallInfo">
      <div class="moneyHeader">当前余额</div>
      <div class="notice">*已扣除5%佣金</div>
      <div class="money">￥ {{money}}
        <router-link to="/withdraw" tag="div" class="withdrawBtn">提现</router-link>
      </div>
    </div>
    <div class="detailNotice">余额收支明细</div>
    <div class="detailWrapper">
      <div class="detailItem" v-for="(item,index) in detailList">
        <div class="nameAndMoney">
          {{item.name}}
          <span :class="[item.type==0?'out':'','in']">
            <div v-if="item.type==0">-</div>
            <div v-else>+</div>
            ￥{{item.money}}
          </span>
        </div>
        <div class="date">
          {{item.date}}
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import header from '@/components/v-header/v-header'
  import {formatDate} from '@/common/utils/utils.js'
  export default {
    data() {
      return {
        money: '40.00',// 账户余额
        detailList: [
          {
            name: '提现现金',
            date: '2016-11-01',
            money: '16.00',
            type: 0,// 0-支出，1-收入
          },
        ],// 余额明细
      }
    },
    computed:{
      globalDOMAIN() {
        return this.$store.state.globalDOMAIN
      },
      token() {
        return sessionStorage.getItem('token')
      },
    },
    mounted(){
      this.getCapital()
    },
    methods:{
      getCapital(){
        this.$http.post(`${this.globalDOMAIN}Employ/User/capital`,{},{
          headers:{token:this.token}
        }).then(res=>{
          if(res.body.status){
            let data = res.body.data
            let tempList=[]
            this.money = data.balance
            for (let item of data.lists){
              let tempItem = {
                name:item.detail,
                date: formatDate(new Date(item.create_time*1000),'yyyy-MM-dd'),
                money: Math.abs(item.income - item.pay),
                type: item.income>=item.pay?1:0
              }
              tempList.push(tempItem)
            }
            this.detailList = tempList
            console.log(this.detailList)
          }
        })
      }
    },
    components: {
      'v-header': header
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../../common/style/fun.styl"
  .myMoneyWrapper
    display: flex
    flex-direction: column
    font-size: px2-2-rem(32)
    min-height: 100vh
    background-color: #f8f8f8
    .overallInfo
      display: flex
      flex-direction: column
      color: #ffffff
      height: px2-2-rem(256)
      padding: px2-2-rem(40) px2-2-rem(30) px2-2-rem(40) px2-2-rem(70)
      margin-bottom: px2-2-rem(20)
      background-size: cover
      background-position: 0 px2-2-rem(-80)
      background-image: url('/static/user/xiake/bg@2x.png')
      .moneyHeader
        font-size: px2-2-rem(40)
      .notice
        margin-bottom: px2-2-rem(20)
      .money
        display: flex
        justify-content: space-between
        align-items: center
        font-size: px2-2-rem(60)
        .withdrawBtn
          font-size: px2-2-rem(40)
          right: px2-2-rem(30)
          height: px2-2-rem(74)
          width: px2-2-rem(220)
          line-height: px2-2-rem(74)
          text-align: center
          color: #00a0e9
          border-radius: px2-2-rem(37)
          box-shadow: 0px 2px 10px 0px rgba(204,204,204,1)
          background-color: #ffffff
    .detailNotice
      height: px2-2-rem(60)
      line-height: px2-2-rem(60)
      padding-left: px2-2-rem(30)
      color: #999999
    .detailWrapper
      display: flex
      flex-direction: column
      padding-left: px2-2-rem(30)
      background-color: #ffffff
      border-top: 1px solid #e5e5e5
      border-bottom: 1px solid #e5e5e5
      .detailItem
        display: flex
        flex-direction: column
        justify-content :space-between
        height: px2-2-rem(110)
        padding: px2-2-rem(32) px2-2-rem(38) px2-2-rem(32) 0
        border-bottom: 1px solid #e5e5e5
      .nameAndMoney
        display: flex
        justify-content: space-between
        .in
          display: flex
          align-items: center
        .out
          color: #e4790f
      .date
        color: #999999
      .detailItem:last-child
        border:none
</style>
