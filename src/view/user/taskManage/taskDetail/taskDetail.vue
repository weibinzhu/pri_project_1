<template>
  <div class="taskDetailWrapper">
    <v-header @share="onShareClick" :title="pageTitle" :shareShow="taskStatus == -1"
              :starShow="taskStatus == -1"></v-header>
    <div class="taskId">任务编号：{{taskId}}
      <span v-if="taskStatus==3">托管赏金</span>
      <span v-else-if="taskStatus==2">增加赏金</span>
    </div>
    <div class="taskBasicInfo">
      <div class="taskBasicInfoLeft">
        <div class="taskTitle">{{title}}</div>
        <div class="taskPrice">￥{{price}}</div>
      </div>
      <div class="taskBasicInfoRight">
        <div class="taskDate">{{date}}</div>
        <div class="knowCompanyBtn">进入主页</div>
      </div>
    </div>
    <div class="taskDetailInfo">
      <div class="detailInfoHeader"><img class="headerImg" src="./location@3x.png"/>招聘城市：{{city}}</div>
      <div class="detailInfoHeader"><img class="headerImg" src="./friend_add@3x.png"/>所需人数：{{peopleNum}}</div>
      <div class="detailInfoHeader"><img class="headerImg" src="./apps@3x.png"/>工作形式：{{taskForm}}</div>
      <div class="detailInfoHeader"><img class="headerImg" src="./countdown@3x.png"/>项目周期：{{period}}</div>
      <div class="detailInfoHeader"><img class="headerImg" src="./choiceness@3x.png"/>所需技能：</div>
      <div class="skillList">
        <div class="skill" v-for="(item,index) in skills">{{item}}</div>
      </div>
      <div class="detailInfoHeader"><img class="headerImg" src="./write@3x.png"/>任务要求：</div>
      <p class="requirement">{{requirement}}</p>
    </div>
    <div class="sectionHeader">投标人：</div>
    <router-link :to="{name:'xiakeMainPage',params:{type:1}}" tag="div" class="bidderListWrapper">
      <div class="noBidder" v-if="bidder.length === 0">
        <img src="./logo@2x.png"/>
      </div>
      <div class="bidder" v-for="(item,index) in bidder" v-if="item.status==2 || taskStatus==6">
        <img class="bidderAvatar" src="./avatar.png"/>
        <div class="bidderInfo">
          <div class="name">
            {{item.name}}
            <div class="tag" v-if="item.isCertificated">已认证</div>
          </div>
          <div class="detail">
            <div class="location">{{item.location}}</div>
            <div class="desc" v-for="(desc,index) in item.desc">
              {{desc}}
            </div>
          </div>
          <div class="score">
            <div class="gongli">功力值：<span>{{item.gongli}}</span></div>
            <div class="times">交易量：<span>{{item.times}}</span></div>
          </div>
        </div>
        <!--加一层判断，只有在任务管理里面点开才需要这些按钮-->
        <div class="btnWrapper" v-if="taskStatus != -1">
          <div class="bidderBtnNormal" v-if="item.status == 0">
            <div class="chooseHim">选Ta</div>
            <div class="eliminate">淘汰</div>
          </div>
          <div class="bidderBtnGiveUp" v-else-if="item.status == 1">
            <div class="chooseHim">选Ta</div>
            <div class="giveUp">已放弃</div>
          </div>
          <div class="bidderBtnChosen" v-else>
            <div class="chosen">中标</div>
          </div>
        </div>
      </div>
    </router-link>
    <!--项目文件柜-->
    <!--<div class="filesBlockWrapper" v-if="taskStatus == 3 || taskStatus == 4 || taskStatus == 5">-->
    <!--<div class="filesBlockHeader">项目文件柜</div>-->
    <!--<div class="filesContent">-->
    <!--<router-link tag="div" :to="item.url" class="file" v-for="(item,index) in files" :key="index">-->
    <!--<div class="fileImg">{{item.extension}}</div>-->
    <!--<div class="fileText">{{item.name}}</div>-->
    <!--</router-link>-->
    <!--</div>-->
    <!--</div>-->
    <!--各种底部功能条-->
    <footer class="taskDetailFooter taskSelected" v-if="taskStatus == 0">
      <div class="contact" @click="toggleWxId"><img src="./service@3x.png"/>联系顾问</div>
      <div class="btnWrapperLeft">
        <div class="giveUp">放弃</div>
        <div class="contactXiake">沟通一下</div>
      </div>
      <router-link to="/contract" tag="div" class="viewContractBtn">发起合同</router-link>
    </footer>
    <footer class="taskDetailFooter taskGiveUp" v-if="taskStatus == 1">已放弃</footer>
    <footer class="taskDetailFooter taskManageMoney" v-if="taskStatus == 2">
      <div class="contact" @click="toggleWxId"><img src="./service@3x.png"/>联系顾问</div>
      <router-link to="/applyCheck" tag="div" class="check">验收</router-link>
      <router-link to="/takeCareMoney" tag="div" class="manageMoneyBtn">托管赏金</router-link>
    </footer>
    <footer class="taskDetailFooter taskHasBeenPaid" v-if="taskStatus == 3">
      <div class="contact" @click="toggleWxId"><img src="./service@3x.png"/>联系顾问</div>
      <router-link to="/contract" tag="div" class="viewContractBtn">查看合同</router-link>
      <router-link to="/applyCheck" tag="div" class="check">验收</router-link>
    </footer>
    <footer class="taskDetailFooter taskComment" v-if="taskStatus == 4">
      <div class="contact" @click="toggleWxId"><img src="./service@3x.png"/>联系顾问</div>
      <router-link to="/contract" tag="div" class="viewContractBtn">查看合同</router-link>
      <router-link to="/toRateTask" tag="div" class="comment">评价</router-link>
    </footer>
    <footer class="taskDetailFooter taskSuccess" v-if="taskStatus == 5">已成功</footer>
    <!--客服-->
    <transition name="getWxFade">
      <div class="getWxModel" v-show="showGetWxModel">
        <div class="showText">
          <div class="title">请添加客服微信联系我们</div>
          <input class="wxId" :value="wxId" readonly/>
        </div>
        <div class="getWxIdBtn" data-clipboard-target=".wxId" @click="checkIphone">
          点击复制微信号
        </div>
      </div>
    </transition>
    <!--广告-->
    <transition name="adFade">
      <div class="adWrapper" v-show="showAd">
        <img class="adImg" src="/static/pic@3x.png"/>
        <img @click="onCloseBtnClick" class="closeBtn" src="./Close@3x.png"/>
        <div class="getAppBtn">
          下载行峡APP
        </div>
      </div>
    </transition>
    <!--遮罩-->
    <transition name="overlayFade">
      <div class="overlay" v-show="showGetWxModel||showAd" @click="hideWxModel"></div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import header from "@/components/v-header/v-header"

  export default {
    name: 'taskDetail',
    data() {
      return {
        files: [
          {
            name: 'V前端..',
            url: '/frontEnd',
            extension: '.doc',
          },
          {
            name: 'V1.6后台..',
            url: '/frontEnd',
            extension: '.doc',
          },
          {
            name: 'V1.6后台..',
            url: '/frontEnd',
            extension: '.doc',
          },
          {
            name: 'V1.6后台..',
            url: '/frontEnd',
            extension: '.doc',
          },
          {
            name: 'V1.6后台..',
            url: '/frontEnd',
            extension: '.doc',
          },
          {
            name: 'V1.6后台..',
            url: '/frontEnd',
            extension: '.doc',
          }
        ], //项目文件柜
        wxId: 'fwfa21', // 客服微信号
        showGetWxModel: false,// 客服微信号弹框显隐
        showAd: false,// 广告（下载行峡APP）显隐
        bidder: [ // 投标人列表
          // status说明： 0-一般，1-对方已放弃（灰色显示），2-中标，3-被我淘汰（某个中标后其他自动变成被淘汰并隐藏起来）
          {
            name: '郑某某',
            isCertificated: true,
            avatar: './avatar.png',
            location: '广州',
            desc: ['市场推广', '风险投资', '大赛获奖', '3年经验'],
            gongli: 760, // 功力值
            times: 6, // 交易量
            status: 0
          },
          {
            name: '卢某某',
            isCertificated: true,
            avatar: './avatar.png',
            desc: ['市场推广', '3年经验'],
            location: '广州',
            desc: ['市场推广', '3年经验'],
            gongli: 760, // 功力值
            times: 6, // 交易量
            status: 1,
          },
          {
            name: '某某某',
            isCertificated: false,
            avatar: './avatar.png',
            desc: ['市场推广', '3年经验'],
            location: '广州',
            desc: ['市场推广', '3年经验'],
            gongli: 760, // 功力值
            times: 6, // 交易量
            status: 2
          },
        ],
        taskId: 0, // 任务id
        taskStatus: 0, // 任务类型，解释：-1-任务页用 0-已选择，1-已放弃，2-托管资金，3-已支付，4-评价，5-交易成功，6-未选择，7-暂无竞标
        title: '公众号推广核心商户扶持计划数据全面支持', // 任务名称
        price: '15000-30000', // 任务价格范围
        date: '2017-08-05', // 任务日期
        city: '广州', // 招聘城市
        peopleNum: 1, // 所需人数
        taskForm: '按需出行（时间相对灵活）', // 工作形式
        period: '1周', // 项目周期
        skills: ['SEM', '市场策划', 'SEO'], // 所需技能
        requirement: '任务要求巴拉巴拉巴拉任务要求巴拉巴拉巴拉任务要求巴拉巴拉巴拉任务要求巴拉巴拉巴拉任务要求巴拉巴拉巴拉任务要求巴拉巴拉巴拉任务要求巴拉巴拉巴拉任务要求巴拉巴拉巴拉'
      }
    },
    computed: {
      pageTitle() {
        // 根据是从哪里进来的来控制导航条文字
        let type = this.$route.params.type
        switch (type) {
          case '0':
          case 0:
            return '任务详情'
          case '1':
          case 1:
            return '任务管理'
          case '2':
          case 2:
            return '我预约的'
        }
      }
    },
    created() {
      this.taskId = this.$route.params.id
      this.taskStatus = this.$route.params.status
    },
    methods: {
      toggleWxId() { // 弹出或隐藏【点击复制客服微信】框
        let y = window.scrollY + 200;
        let model = document.querySelector(".getWxModel")
        model.style.top = y + 'px'
        this.showGetWxModel = !this.showGetWxModel
      },
      checkIphone() { // 优雅降级。（暂时不需要用）
        if (navigator.userAgent.match(/ipad|ipod|iphone/i)) {
          alert('如果复制失败请手动复制')
        }
      },
      onCloseBtnClick() {
        // 点击广告的关闭按钮
        this.showAd = false
      },
      hideWxModel() {
        // 点击遮罩隐藏客服微信号
        if (this.showGetWxModel) {
          this.showGetWxModel = false
        } else {
          return false
        }
      },
      onShareClick() {
        // header组件触发share这个自定义事件之后用到的事件处理函数
        if (!this.showAd) {
          this.showAd = true
        } else {
          return false
        }
      }
    },
    components: {
      'v-header': header
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../../../common/style/fun.styl"
  .taskDetailWrapper
    position: relative
    display: flex
    flex-direction: column
    background-color: #f8f8f8
    font-size: px2-2-rem(32)
    padding-bottom: px2-2-rem(120)
    .taskId
      padding: 0 px2-2-rem(32)
      height: px2-2-rem(66)
      line-height: px2-2-rem(66)
      color: #999
      font-size: px2-2-rem(26)
      border-bottom: 1px solid #e9e9e9
      border-top: 1px solid #e9e9e9
      span
        position: relative
        right: px2-2-rem(-392)
        top: px2-2-rem(-78)
        font-size: px2-2-rem(32)
        color: #00a0e9
    .taskBasicInfo
      display: flex
      flex-direction: row
      align-items: baseline
      box-sizing: border-box
      height: px2-2-rem(232)
      padding: px2-2-rem(26) px2-2-rem(32)
      margin-bottom: px2-2-rem(22)
      background-color: #ffffff
      .taskPrice
        color: #e4790f
      .taskBasicInfoLeft, .taskBasicInfoRight
        display: flex
        flex-direction: column
        justify-content: space-between
        height: 100%
      .taskBasicInfoRight
        align-items: center
        width: px2-2-rem(225)
        .taskDate
          color: #b3b3b3
          font-size: px2-2-rem(26)
        .knowCompanyBtn
          width: px2-2-rem(164)
          height: px2-2-rem(50)
          line-height: px2-2-rem(50)
          font-size: px2-2-rem(26)
          text-align: center
          color: #00a0e9
          border: 1px solid #00a0e9
          border-radius: px2-2-rem(8)
    .taskDetailInfo
      display: flex
      flex-direction: column
      padding: px2-2-rem(26) px2-2-rem(32)
      background-color: #ffffff
      font-size: px2-2-rem(26)
      .detailInfoHeader
        display: flex
        align-items: center
        height: px2-2-rem(64)
        .headerImg
          width: px2-2-rem(30)
          margin-right: px2-2-rem(20)
      .skillList, .requirement
        padding: 0 px2-2-rem(60)
        color: #888888
      .skillList
        display: flex
        flex-direction: row
        .skill
          height: px2-2-rem(50)
          line-height: px2-2-rem(50)
          text-align: center
          margin-right: px2-2-rem(20)
          padding: 0 px2-2-rem(32)
          border: 1px solid #e5e5e5
          border-radius: px2-2-rem(8)
    .sectionHeader
      padding: 0 px2-2-rem(32)
      line-height: px2-2-rem(64)
      height: px2-2-rem(64)
    .bidderListWrapper
      background-color: #ffffff
      .noBidder
        display: flex
        justify-content: center
        align-items: center
        height: px2-2-rem(394)
        img
          height: px2-2-rem(250)
          width: px2-2-rem(250)
      .bidder
        display: flex
        flex-direction: row
        align-items: center
        background-color: #ffffff
        padding: px2-2-rem(38) px2-2-rem(32)
        border-bottom: 1px solid #e7e7e7
        .bidderAvatar
          margin-right: px2-2-rem(32)
        .bidderInfo
          display: flex
          flex-direction: column
          justify-content: space-between
          flex: 1
          font-size: px2-2-rem(26)
          color: #999999
          .name
            display: flex
            flex-direction: row
            align-items: center
            color: #353535
            font-size: px2-2-rem(32)
          .tag
            height: px2-2-rem(26)
            color: #00a0e9
            line-height: px2-2-rem(26)
            font-size: px2-2-rem(26)
            text-align: center
            margin-left: px2-2-rem(20)
            padding: px2-2-rem(5) px2-2-rem(20)
            border: 1px solid #00a0e9
            border-radius: px2-2-rem(8)
          .detail, .score
            display: flex
            flex-direction: row
            flex-wrap: wrap
          .detail
            .location, .desc
              padding-right: px2-2-rem(23)
              margin-right: px2-2-rem(23)
              position: relative
              &:after // 竖线样式
                display: block
                position: absolute
                bottom: px2-2-rem(8)
                /*left: 0*/
                height: 60%
                width: 100%
                border-right: 1px solid #999999
                content: " "
            .desc:last-child:after
              display: none
          .score
            .gongli
              margin-right: px2-2-rem(50)
            span
              color: #e4790f
        .chooseHim, .eliminate, .chosen, .giveUp
          box-sizing: border-box
          width: px2-2-rem(128)
          height: px2-2-rem(50)
          line-height: px2-2-rem(50)
          text-align: center
          font-size: px2-2-rem(26)
          margin-bottom: px2-2-rem(30)
          border-radius: px2-2-rem(8)
          &:last-child
            margin: 0
        .chooseHim, .chosen
          color: #00a0e9
          border: 1px solid #00a0e9
        .eliminate
          color: #f0724f
          border: 1px solid #f0724f
        .bidderBtnGiveUp
          .chooseHim, .giveUp
            color: #dfdfdf
            border: 1px solid #dfdfdf
    .taskDetailFooter
      position: fixed
      bottom: 0
      width: 100%
      height: px2-2-rem(85)
      display: flex
      flex-direction: row
      justify-content: center
      align-items: center
      text-align: center
      color: #ffffff
      font-size: px2-2-rem(36)
      border-top: 1px solid #e5e5e5
    .taskGiveUp
      background-color: #dfdfdf
    .taskSuccess
      color: #ff
      background-color: #00a0e9
    .taskSelected, .taskManageMoney, .taskHasBeenPaid, .taskComment
      .contact
        display: flex
        flex-direction: column
        justify-content: center
        align-items: center
        height: 100%
        width: px2-2-rem(148)
        color: #888888
        font-size: px2-2-rem(26)
        background-color: #ffffff
        border-right: 1px solid #e5e5e5
        img
          width: px2-2-rem(30)
          height: px2-2-rem(30)
      .check, .viewContractBtn, .manageMoneyBtn
        display: flex
        flex: 1
        align-items: center
        justify-content: center
        height: 100%
      .check
        color: #00a0e9
        background-color: #ffffff
      .viewContractBtn, .manageMoneyBtn
        background-color: #00a0e9
    .taskHasBeenPaid, .taskComment
      .check, .viewContractBtn, .comment
        display: flex
        flex: 1
        align-items: center
        justify-content: center
        height: 100%
      .check, .comment
        color: #ffffff
        background-color: #00a0e9
      .viewContractBtn
        color: #00a0e9
        background-color: #ffffff
    .btnWrapperLeft
      flex: 1
      display: flex
      flex-direction: row
      height: 100%
      .giveUp, .contactXiake
        display: flex
        align-items: center
        justify-content: center
        height: 100%
        background-color: #ffffff
      .giveUp
        flex: 1
        font-size: px2-2-rem(26)
        color: #999999
      .contactXiake
        flex: 2
        border-left: 1px solid #cccccc
        color: #00a0e9
    .filesBlockWrapper
      display: flex
      flex-direction: column
      margin-top: px2-2-rem(20)
      padding: 0 px2-2-rem(32)
      border-top: 1px solid #e5e5e5
      .filesBlockHeader
        height: px2-2-rem(88)
        line-height: px2-2-rem(88)
        border-bottom: 1px solid #e5e5e5
      .filesContent
        display: flex
        flex-direction: row
        flex-wrap: wrap
        padding-top: px2-2-rem(30)
        .file
          width: px2-2-rem(144)
          height: px2-2-rem(124)
          margin-right: px2-2-rem(20)
          margin-bottom: px2-2-rem(20)
          .fileImg
            height: px2-2-rem(88)
            line-height: px2-2-rem(88)
            width: px2-2-rem(144)
            color: #ffffff
            text-align: center
            border-radius: px2-2-rem(8)
            background-color: #00a0e9
          .fileText
            font-size: px2-2-rem(26)
            color: #888888
    .overlay
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 1000;
      background-color: rgba(0, 0, 0, .8);

  //    【点击复制客服微信弹框】
  .getWxModel
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
      .wxId
        font-size: 0.42666rem
        color: #d2d3d5
        text-align: center
    .getWxIdBtn
      width: 100%
      height: 1.3333rem
      line-height: 1.3333rem
      text-align: center
      border-top: 1px solid #d2d3d5
      color: #00a0e9

  .adWrapper
    position: absolute
    display: flex
    flex-direction: column
    align-items: center
    top: 12%
    left: 12%
    z-index: 10000
    .adImg
      position: relative
      width: px2-2-rem(586)
    .closeBtn
      position: absolute
      top: px2-2-rem(-40)
      right: px2-2-rem(-40)
      width: px2-2-rem(78)
      height: px2-2-rem(78)
    .getAppBtn
      margin-top: px2-2-rem(50)
      width: px2-2-rem(428)
      height: px2-2-rem(90)
      line-height: px2-2-rem(90)
      text-align: center
      font-size: px2-2-rem(32)
      color: #ffffff
      background-color: #00a0e9
      border-radius: px2-2-rem(42) px2-2-rem(42)

  .getWxFade-leave-active, .getWxFade-enter-active, .overlayFade-leave-active, .overlayFade-enter-active, .adFade-enter-active, .adFade-leave-active
    transition: all .5s

  .getWxFade-enter, .getWxFade-leave-to, .overlayFade-enter, .overlayFade-leave-to, .adFade-enter, .adFade-leave-to
    opacity: 0
</style>
