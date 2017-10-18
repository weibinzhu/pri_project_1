<template>
  <div class="employerMainPageWrapper">
    <v-header title="雇主主页" :starShow="true" :shareShow="true"></v-header>
    <!--主页头-->
    <header class="employerHeader">
      <img class="avatar" src="./avatar@3x.png"/>
      <div class="name">{{employerName}}
        <div class="certification" v-if="isCertificated">已认证</div>
      </div>
      <div class="tagWrapper">
        <div class="tag" v-for="(item,index) in tags">
          {{item}}
        </div>
      </div>
    </header>
    <!--内容区块-->
    <div class="contentBlock">
      <div class="contentHead">
        <div class="contentTitle"><img class="contentHeadIcon" src="./profile@3x.png"/>雇主介绍</div>
      </div>
      <p class="desc">{{employerDesc}}</p>
    </div>
    <div class="contentBlock">
      <div class="contentHead">
        <div class="contentTitle"><img class="contentHeadIconRate" src="./community@3x.png"/>评价 {{rateNum}}</div>
        <div class="rate">好评度 {{rate}}<img src="/static/arrow-right-gray.png"/></div>
      </div>
      <div class="contentRate">
        <div class="rateInfo">
          <div class="rateName">{{ratings[0].name}}<span>{{ratings[0].date}}</span></div>
          <stars :size="24" :score="ratings[0].score"></stars>
        </div>
        <div class="rateContent">
          {{ratings[0].content}}
        </div>
      </div>
    </div>
    <div class="contentBlock" v-for="(item,index) in taskItems">
      <!--这里引用了task页面下用过的组件，注意传入数据的结构-->
      <taskitem :item="item"></taskitem>
      <div class="status">{{item.status}}</div>
    </div>
    <router-link to="/editEmployerMainPage" tag="div" class="editEmployerMainPage">
      编辑
    </router-link>
  </div>
</template>

<script type="text/ecmascript-6">
  import header from '../../../components/v-header/v-header'
  import stars from '@/components/stars/stars'
  import taskItem from '@/view/task/taskItem/taskItem'

  export default {
    data() {
      return {
        employerName: '闻喜科技',
        isCertificated: true,
        tags: ['广州', '互联网科技', '15-50人'],
        employerDesc: '市场推广市场推广市场推广市场推广市场推广市场推广市场推广市场推广市场推广市场推广市场推广市场推广市场推广市场推广市场推广市场推广',
        rateNum: 452,// 评价数
        rate: 4.9,// 好评度
        ratings: [ // 评价列表
          {
            name: '毛毛的雨',
            date: '2017-10-10',
            score: 4.2,
            content: '不枉费我等那么久，产品质量不错',
          }
        ],
        taskItems: [ // 任务列表，可能有多个
          {
            taskTitle: '社区活动营销方案-北京-设计',
            taskPrice: '15000-30000',
            taskDetail: ['一个月内', '按需出勤'],
            clientName: '主题邦科技',
            clientTag: '已认证',
            logo: 'static/icon@3x.png',
            isCertificated: true,
            location: 1,
            type: 1,
            status: '交易成功',// 项目当前状态
          },
          {
            taskTitle: '社区活动营销方案-北京-设计',
            taskPrice: '15000-30000',
            taskDetail: ['一个月内', '按需出勤'],
            clientName: '主题邦科技',
            clientTag: '已认证',
            logo: 'static/icon@3x.png',
            isCertificated: true,
            location: 1,
            type: 1,
            status: '交易取消',// 项目当前状态
          },
        ]
      }
    },
    components: {
      stars,
      "taskitem": taskItem,
      'v-header': header
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../../common/style/fun.styl"
  .employerMainPageWrapper
    display: flex
    flex-direction: column
    align-items: center
    min-height: 100vh
    padding-bottom :px2-2-rem(100)
    background-color: #f8f8f8
    .employerHeader
      display: flex
      flex-direction: column
      align-items: center
      width: 100%
      height: px2-2-rem(340)
      color: #ffffff
      background-image: url("/static/user/xiake/bg@2x.png")
      background-size: 100% px2-2-rem(340)
      .avatar
        width: px2-2-rem(150)
        height: px2-2-rem(150)
        margin-top: px2-2-rem(50)
        margin-bottom: px2-2-rem(10)
      .name
        position: relative
        font-size: px2-2-rem(32)
        margin-bottom: px2-2-rem(28)
        .certification
          position: absolute
          bottom: px2-2-rem(8)
          right: px2-2-rem(-130)
          width: px2-2-rem(90)
          height: px2-2-rem(30)
          line-height: px2-2-rem(30)
          font-size: px2-2-rem(26)
          text-align: center
          padding: 0 px2-2-rem(10)
          color: #00a0e9
          background-color: #ffffff
          border-radius: px2-2-rem(8)
      .tagWrapper
        display: flex
        flex-direction: row
        align-items: center
        font-size: px2-2-rem(28)
        .tag
          height: px2-2-rem(28)
          line-height: px2-2-rem(28)
          border-right: 1px solid #ffffff
          padding-right: px2-2-rem(12)
          margin-left: px2-2-rem(12)
        .tag:last-child
          border: none
          padding: 0
        .tag:first-child
          margin: 0
    .contentBlock
      position: relative
      width: px2-2-rem(710)
      margin-top: px2-2-rem(30)
      font-size: px2-2-rem(32)
      border-radius: px2-2-rem(8)
      color: #353535
      background-color: #ffffff
      .contentHead
        display: flex
        flex-direction: row
        align-items: center
        justify-content: space-between
        height: px2-2-rem(82)
        border-bottom: 1px solid #e5e5e5
        .contentTitle
          display: flex
          flex-direction: row
          align-items: center
          height: px2-2-rem(50)
          margin-left: px2-2-rem(32)
          .contentHeadIcon
            width: px2-2-rem(34)
            height: px2-2-rem(34)
            margin-right: px2-2-rem(12)
          .contentHeadIconRate
            width: px2-2-rem(36)
            height: px2-2-rem(30)
            margin-right: px2-2-rem(12)
        .rate
          display: flex
          align-items: center
          margin-right: px2-2-rem(30)
          color: #999999
          img
            width: px2-2-rem(16)
            margin-left: px2-2-rem(16)
      .desc
        font-size: px2-2-rem(26)
        padding: px2-2-rem(30)
      .contentRate
        padding: px2-2-rem(30)
        .rateInfo
          display: flex
          justify-content: space-between
          align-items: center
          color: #000000
          .rateName
            display: flex
            align-items: center
            span
              margin-left: px2-2-rem(20)
              font-size: px2-2-rem(26)
              color: #999999
        .rateContent
          margin-top: px2-2-rem(24)
          color: #353535
          font-size: px2-2-rem(26)

      .status
        position :absolute
        right :px2-2-rem(30)
        top:px2-2-rem(30)
        font-size: px2-2-rem(26)
        color: #00a0e9
    .editEmployerMainPage
      position: fixed
      bottom :0
      width :100%
      height :px2-2-rem(86)
      line-height :px2-2-rem(86)
      text-align :center
      font-size :px2-2-rem(32)
      color :#ffffff
      background-color :#00a0e9
</style>
