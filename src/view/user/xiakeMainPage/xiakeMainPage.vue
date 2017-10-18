<template>
  <div class="xiakeMainPageWrapper">
    <v-header title="峡客主页"></v-header>
    <header class="mainPageXiakeInfo">
      <img class="avatar" :src="xiakeInfo.avatar"/>
      <div class="xiakeName">
        {{xiakeInfo.name}}
        <div class="xiakeStatus">{{xiakeInfo.status}}</div>
      </div>
      <div class="xiakeDetailWrapper">
        <span v-for="(item,index) in xiakeInfo.detail" class="xiakeDetail">{{item}}</span>
      </div>
      <div class="xiakeTag">
        <div v-for="(item,index) in xiakeInfo.tag" class="xiakeTagItem">{{item}}</div>
      </div>
      <div class="xiakePointWrapper">
        <div class="xiakePoint">{{xiakeInfo.gongli}}<span>功力值</span></div>
        <div class="xiakePoint">{{xiakeInfo.trade}}<span>交易量</span></div>
        <div class="xiakePoint">{{xiakeInfo.rate}}<span>好评度</span></div>
      </div>
    </header>
    <div class="mainPageBlock">
      <router-link to="/myService" tag="div" class="blockHeader">
        <div><i class="iconfont icon-comments"></i>我的服务</div>
      </router-link>
      <div class="myServiceItem" v-for="(item,index) in services">
        <div class="serviceDesc">
          <div class="serviceTitle">{{item.title}}</div>
          <div class="serviceInfo">
            <span class="serviceLocation">{{item.location}}</span>
            ￥{{item.price}}<span class="serviceDivider">|</span>交易{{item.trade}}笔
          </div>
        </div>
        <div class="serviceBtn" v-if="entranceType==1">
          预约服务
        </div>
      </div>
    </div>
    <div class="mainPageBlock">
      <div class="blockHeader">
        <div><i class="iconfont icon-comments"></i>评价 {{ratingCount}}</div>
        <div class="rate">好评度 {{rate}}<img src="/static/arrow-right-gray.png"/></div>
      </div>
      <div class="myServiceItem rateItem">
        <div class="rateInfo">
          <div class="rateName">{{ratings[0].name}}<span>{{ratings[0].date}}</span></div>
          <stars :size="24" :score="ratings[0].score"></stars>
        </div>
        <div class="rateContent">{{ratings[0].content}}</div>
      </div>
    </div>
    <div class="mainPageBlock">
      <div class="blockHeader">
        <div><i class="iconfont icon-comments"></i>峡客介绍</div>
      </div>
      <div class="xiakeDesc">
        <div>{{xiakeInfo.description}}</div>
      </div>
      <div class="xiakeDetailInfo">
        <div class="xiakeDetailItem">
          <i class="iconfont icon-comments"></i>所在城市：{{xiakeInfo.location}}
        </div>
        <div class="xiakeDetailItem">
          <i class="iconfont icon-comments"></i>工作年限：{{xiakeInfo.years}}
        </div>
        <div class="xiakeDetailItem">
          <i class="iconfont icon-comments"></i>就职单位：{{xiakeInfo.company}}
        </div>
        <div class="xiakeDetailItem">
          <i class="iconfont icon-comments"></i>单位职务：{{xiakeInfo.position}}
        </div>
        <div class="xiakeDetailItem">
          <i class="iconfont icon-comments"></i>团队规模：{{xiakeInfo.stuffNum}}
        </div>
      </div>
    </div>
    <div class="mainPageBlock">
      <div class="blockHeader">
        <div><i class="iconfont icon-comments"></i>项目案例</div>
      </div>
      <div class="mainPageCaseItem" v-for="(item,index) in cases">
        <div class="caseTitle">
          <span></span>
          <p>{{item.title}}</p><a :href="item.url">作品链接</a>
        </div>
        <div class="caseContent">{{item.content}}</div>
      </div>
    </div>
    <div class="mainPageBlock">
      <div class="blockHeader">
        <div><i class="iconfont icon-comments"></i>邀约竞标说明</div>
      </div>
      <div class="mainPageNotice" v-html="notice">
        <!--此处为富文本。方便后台传进来-->
      </div>
    </div>
    <div class="mainPageBlock">
      <div class="blockHeader">
        <div><i class="iconfont icon-comments"></i>邀标流程</div>
      </div>
      <div class="flowWrapper">
        <div class="dotLineWrapper">
          <div class="dot"></div>
          <div class="dot"></div>
          <div class="dot"></div>
          <div class="dot"></div>
        </div>
        <div class="dotLineDescWrapper">
          <div class="dotLineDescItem">
            <p>发起预约请求</p>
            <p class="dotLineDescDetail">预约审核通过，等待被预约者确认</p>
          </div>
          <div class="dotLineDescItem">
            <p>被预约者已接受预约</p>
            <p class="dotLineDescDetail">请在72小时内托管预约费用到平台，否则订单关闭</p>
          </div>
          <div class="dotLineDescItem">
            <p>预约成功，开始服务</p>
            <p class="dotLineDescDetail">双方直接私聊沟通服务细节</p>
          </div>
          <div class="dotLineDescItem">
            <p>服务完成，评价服务</p>
            <p class="dotLineDescDetail">双方确认服务完成，并且相互评价并结束服务</p>
          </div>
        </div>
      </div>
    </div>
    <footer class="mainPageFooter" v-if="entranceType==0">
      <router-link to="/editXiake" tag="div" class="editXiake">编辑</router-link>
    </footer>
    <footer class="mainPageFooter" v-else>
      <div class="contact">与TA聊聊</div>
      <div class="invitation">邀约竞标</div>
    </footer>
  </div>
</template>

<script type="text/ecmascript-6">
  import stars from '@/components/stars/stars';
  import header from '@/components/v-header/v-header'
  export default {
    name:'xiakeMainPage',
    data() {
      return {
//        xiakeView: true,// 是否为峡客自己打开自己的主页
        xiakeInfo: {
          name: '郑设计',
          location: '广州',
          years: 3,
          company: '广州闻喜信息科技有限公司',
          position: 'CTO',
          stuffNum: '15-50',
          description: '市场推广市场推广市场推广市场推广市场推广市场推广市场推广市场推广市场推广市场推广市场推广市场推广市场推广市场推广市场推广市场推广市场推广市场推广市场推广市场推广市场推广市场推广市场推广市场推广',
          avatar: "/static/avatar.png",
          status: '已认证',
          detail: ['广州', '市场推广', '3年经验'],
          tag: ['SEM', '市场策划', 'SEO'],
          gongli: 750,// 功力值
          trade: 6, // 交易量
          rate: 4.9, // 好评度
        },
        services: [
          {
            title: '平面设计',
            location: '广州',
            price: 15000,
            trade: 3
          },
          {
            title: '平面设计',
            location: '广州',
            price: 15220,
            trade: 5
          }
        ],
        ratingCount: 485,
        rate: 4.9,
        ratings: [
          {
            score: 4.1,
            name: '毛毛的雨',
            date: '2017.08.01',
            content: '不枉费我等了那么久，产品质量不错。'
          },
          {
            score: 2.5,
            name: '毛雨',
            date: '2017.06.01',
            content: '等了太久了，不太靠谱。不过质量还行。'
          },
          {
            score: 2.6,
            name: '当外人',
            date: '2017.05.22',
            content: '5星好评。'
          },
          {
            score: 2.4,
            name: '二十个',
            date: '2017.03.08',
            content: '还不错。'
          }
        ],
        cases: [
          {
            title: '城市人家装修',
            content: '本方案是围绕现代简约为主题，适合于30岁左右的三口之家居住，再加上中式的元素在里面',
            url: 'http://www.baidu.com'
          },
          {
            title: '现代简约风格',
            content: '本方案是围绕现代简约为主题，适合于30岁左右的三口之家居住，再加上中式的元素在里面',
            url: 'http://www.baidu.com'
          }
        ],
        notice: '<p>dwdwdwd</p><p>dwdwdwd</p><p>dwdwd</p><p>dwdwdwd</p>',
        entranceType:0,// 从哪里进入的，从峡客个人中心（type==0）还是从其他地方（type==1）
      }
    },
    created(){
      this.entranceType = this.$route.params.type
    },
    components: {
      stars,
      'v-header':header
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../../common/style/fun.styl"
  .xiakeMainPageWrapper
    background-color: #f8f8f8
    font-size: 0.4rem
    min-height: 100vh
    padding-bottom: 1.1466rem

  .mainPageXiakeInfo
    position: relative
    display: flex
    flex-direction: column
    align-items: center
    height: 6.6666rem
    color: #fff
    background-image: url("/static/user/xiake/bg@2x.png")
    background-size: cover
    margin-bottom: 1.3333rem
    .avatar
      border: 0.1066rem solid #6fc8ff
      border-radius: 50%
      height: 1.7066rem
      width: 1.7066rem
      margin-top: 0.66666rem
    .xiakeName
      position: relative
      .xiakeStatus
        position: absolute
        right: -1.4rem
        top: 0.15rem
        width: 1.2rem
        height: 0.3466rem
        line-height: 0.3466rem
        text-align: center
        font-size: 0.3rem
        border-radius: 0.10666rem
        background-color: #fdfefd
        color: #00a0e9
    .xiakeDetailWrapper
      display: flex
      flex-direction: row
      justify-content: center
      align-items: center
      font-size: 0.3466rem
      margin-top: 0.34666rem
      line-height: 1em
      .xiakeDetail
        padding: 0 0.16rem
        border-right: 1px solid #ffffff
      .xiakeDetail:last-child
        border: none
    .xiakeTag
      display: flex
      flex-direction: row
      justify-content: center
      align-items: center
      margin-top: 0.4rem
      font-size: 0.3466rem
      .xiakeTagItem
        box-sizing: border-box
        border: 1px solid #ffffff
        border-radius: 4px
        margin-right: 0.266666rem
        padding: 0 0.186rem
    .xiakePointWrapper
      display: flex
      flex-direction: row
      justify-content: center
      align-items: center
      position: absolute
      bottom: -1rem
      width: 9.4666rem
      height: 2.1333rem
      border-radius: 0.2133rem
      color: #353535
      background-color: #ffffff
      .xiakePoint
        flex-grow: 1
        display: flex
        flex-direction: column
        justify-content: center
        align-items: center
        span
          color: #999999
      .xiakePoint:nth-child(2)
        border-left: 1px solid #9a9a9a
        border-right: 1px solid #9a9a9a

  .mainPageBlock
    display: flex
    flex-direction: column
    margin: 0 auto 0.4rem
    width: 9.466666rem
    background-color: #ffffff
    border-radius: 0.2133rem
    .blockHeader
      display: flex
      align-items: center
      justify-content: space-between
      height: 1.0666rem
      /*border-bottom:1px solid #e5e5e5*/
      i
        margin: 0 0.1866rem
        color: #00a0e9
      .rate
        display: flex
        align-items: center
        color: #999999
        img
          width: px2-2-rem(16)
          margin-left: px2-2-rem(16)
    .flowWrapper
      display: flex
      flex-direction: row
      padding-top: px2-2-rem(40)
      .dotLineWrapper
        width: px2-2-rem(74)
        margin-right: px2-2-rem(14)
        .dot
          margin: 0 auto
          width: px2-2-rem(12)
          height: px2-2-rem(12)
          margin-bottom: px2-2-rem(96)
          background-color: #00a0e9
          border-radius: 50%
          border: px2-2-rem(8) solid #ccecfb
        .dot:after
          content: ''
          display: block
          position: relative
          top: px2-2-rem(18)
          left: px2-2-rem(4)
          width: px2-2-rem(4)
          height: px2-2-rem(90)
          background-color: #7fcff4
        .dot:last-child:after
          display: none
      .dotLineDescWrapper
        position :relative
        top: px2-2-rem(-20)
        display: flex
        flex-direction: column
        justify-content: space-between
        height: px2-2-rem(470)
        .dotLineDescItem
          font-size: px2-2-rem(32)
          color: #353535
          //margin-bottom: px2-2-rem(30)
          .dotLineDescDetail
            font-size: px2-2-rem(26)
            color: #999999
    .myServiceItem
      display: flex
      align-items: center
      height: 2.2133rem
      padding: 0 0.1866rem
      border-top: 1px solid #e5e5e5
    .serviceDesc
      flex: 1
    .serviceTitle
      margin-bottom: 0.3rem
    .serviceInfo
      font-size: 0.32rem
      color: #e4790f
      .serviceLocation
        color: #999999
        margin-right: 0.3rem
      .serviceDivider
        margin: 0 0.3rem
    .serviceBtn
      width: 2rem
      height: 0.8rem
      text-align: center
      line-height: 0.8rem
      color: #00a0e9
      font-size: 0.3466rem
      border-radius: 0.2133rem
      border: 1px solid #00a0e9

    .rateItem // 评论模块特殊样式
      display: flex
      flex-direction: column
      justify-content: center;
      align-items: flex-start
    .rateInfo
      display: flex
      flex-direction: row
      justify-content: space-between
      width: 100%
    .rateName
      font-size: 0.4rem
      span
        margin-left: 0.2666rem
        color: #999999
        font-size: 0.266rem
    .rateContent
      margin-top: 0.4rem
      font-size: 0.32rem
      color: #353535

  .star
    display: inline-block
    vertical-align: top
    margin: 0 12px

  .xiakeDesc
    padding: 0.1866rem 0.1866rem
    border-top: 1px solid #e5e5e5

  .xiakeDetailInfo
    display: flex
    flex-direction: column
    box-sizing: border-box
    height: 5.066rem
    padding: 0.1866rem 0.1866rem
    border-top: 1px solid #e5e5e5
    font-size: 0.4rem
    color: #353535

  .xiakeDetailItem
    flex: 1
    i
      margin-right: 0.26666rem

  .mainPageCaseItem
    padding: 0.1866rem 0.1866rem
    color: #b6b6b6
    .caseTitle
      display: flex
      /*position :relative*/
      flex-direction: row
      align-items: center
      color: #353535
      span
        display: inline-block
        width: 0.1866rem
        height: 0.1866rem
        margin-right: 0.1866rem
        background-color: #00a0e9
        border-radius: 50%
      p
        flex: 1
      a
        color: #00a0e9
        font-size: 0.32rem
        align-self: right

  .mainPageNotice
    padding: 0.1866rem 0.1866rem
    border-top: 1px solid #e5e5e5

  .mainPageFooter
    display: flex
    flex-direction: row
    position: fixed
    bottom: 0
    z-index: 100
    height: 1.1466rem
    width: 100%
    .contact, .invitation, .editXiake
      height: 1.1466rem
      line-height: 1.1466rem
      flex: 1
      text-align: center
      background-color: #00a0e9
      color: #fff
    .contact
      color: #00a0e9
      background-color: #FFF

</style>
