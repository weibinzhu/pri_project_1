<template>
  <div class="taskDetailWrapper">
    <!--loading 图标-->
    <loading v-show="isLoading"></loading>
    <v-header @share="onShareClick" :title="pageTitle" :shareShow="type == 0"
              :starShow="type == 0" :id="taskId"></v-header>
    <div class="taskId">任务编号：{{taskId}}
      <span v-if="taskInfo.status == 99 && taskInfo.on == 1 && taskInfo.order_status == 3">托管赏金</span>
      <span v-else-if="taskInfo.status == 99 && taskInfo.on == 1 && taskInfo.order_status == 4">增加赏金</span>
    </div>
    <div class="taskBasicInfo">
      <div class="taskBasicInfoLeft">
        <div class="taskTitle">{{taskInfo.title}}</div>
        <div class="taskPrice" v-if="type != 2">￥{{taskInfo.price_min}}-{{taskInfo.price_max}}</div>
        <div class="taskPrice" v-if="type == 2">￥{{taskInfo.price}}</div>
      </div>
      <div class="taskBasicInfoRight">
        <div class="taskDate">{{taskInfo.inputtime | formatDate}}</div>
        <div class="knowCompanyBtn">进入主页</div>
      </div>
    </div>
    <div class="taskDetailInfo">
      <div class="detailInfoHeader"><img class="headerImg" src="./location@3x.png"/>招聘城市：{{taskInfo.city}}</div>
      <!--<div class="detailInfoHeader"><img class="headerImg" src="./friend_add@3x.png"/>所需人数：{{peopleNum}}</div>-->
      <div class="detailInfoHeader"><img class="headerImg" src="./apps@3x.png"/>工作形式：{{taskInfo.work_type}}</div>
      <div class="detailInfoHeader"><img class="headerImg" src="./countdown@3x.png"/>项目周期：{{period}}</div>
      <div class="detailInfoHeader"><img class="headerImg" src="./choiceness@3x.png"/>所需技能：</div>
      <div class="skillList">
        <div class="skill" v-for="(item,index) in skills">{{item}}</div>
      </div>
      <div class="detailInfoHeader"><img class="headerImg" src="./write@3x.png"/>任务要求：</div>
      <p class="requirement">{{taskInfo.desc}}</p>
      <div class="detailInfoHeader" v-if="type == 0">
        <img class="headerImg" src="./people.png"/>
        投标人数：<span class="bidNum">{{bidNum}}</span>人
      </div>
    </div>

    <!--投标人-->
    <div class="sectionHeader" v-if="type!=0">投标人：</div>
    <router-link v-if="type!=0" :to="{name:'xiakeMainPage',params:{type:1}}" tag="div" class="bidderListWrapper">
      <div class="noBidder" v-if="!hasValidBidder">
        <img src="./noBid@3x.png"/>
        暂无投标记录
      </div>
      <div class="bidder" v-for="(item,index) in taskInfo.bids"
           v-if="(item.status==99 || (taskInfo.status==99&&taskInfo.on==1&&taskInfo.order_status==1))&&item.status!=0">
        <img class="bidderAvatar" src="./avatar.png"/>
        <div class="bidderInfo">
          <div class="name">
            {{item.user.username}}
            <tag v-if="item.isCertificated"></tag>
          </div>
          <div class="detail">
            <div class="location">{{item.location}}</div>
            <div class="desc" v-for="(desc,index) in item.desc">
              {{desc}}
            </div>
          </div>
          <div class="score">
            <div class="gongli">功力值：<span>{{item.user.point}}</span></div>
            <div class="times">交易量：<span>{{item.times}}</span></div>
          </div>
        </div>
        <!--加一层判断，只有在任务管理里面点开才需要这些按钮-->
        <div class="btnWrapper" v-if="taskStatus != -1">
          <div class="bidderBtnNormal" v-if="item.status == 1">
            <div @click.stop="chooseHim(item.id)" class="chooseHim">选Ta</div>
            <div @click.stop="eliminate(item.id)" class="eliminate">淘汰</div>
          </div>
          <div class="bidderBtnGiveUp" v-else-if="item.status == 2">
            <div class="chooseHim">选Ta</div>
            <div class="giveUp">已放弃</div>
          </div>
          <div class="bidderBtnChosen" v-else-if="item.status == 99">
            <div class="chosen">中标</div>
          </div>
        </div>
      </div>
    </router-link>
    <!--各种底部功能条-->
    <footer class="taskDetailFooter taskToBid" v-if="type == 0">
      <div class="contactEmployer">沟通一下</div>
      <div @click="toBid" class="toBid">竞标</div>
    </footer>

    <!--任务管理里面的详情用-->
    <div v-if="type != 0">
      <footer class="taskDetailFooter taskSelected"
              v-if="taskInfo.order_status == 2 && taskInfo.status == 99 && taskInfo.on == 1">
        <div class="contact" @click="toggleWxId"><img src="./service@3x.png"/>联系顾问</div>
        <div class="btnWrapperLeft">
          <div @click="toggleGiveUpModel" class="giveUp">放弃</div>
          <div class="contactXiake">沟通一下</div>
        </div>
        <div @click="goToContract" class="viewContractBtn">发起合同</div>
      </footer>
      <footer class="taskDetailFooter taskGiveUp" v-if="taskInfo.status == 3">已放弃</footer>
      <footer class="taskDetailFooter taskManageMoney"
              v-if="taskInfo.order_status == 3 && taskInfo.status == 99 && taskInfo.on == 1">
        <div class="contact" @click="toggleWxId"><img src="./service@3x.png"/>联系顾问</div>
        <router-link to="/applyCheck" tag="div" class="check">验收</router-link>
        <router-link to="/takeCareMoney" tag="div" class="manageMoneyBtn">托管赏金</router-link>
      </footer>
      <footer class="taskDetailFooter taskHasBeenPaid"
              v-if="taskInfo.order_status == 4 && taskInfo.status == 99 && taskInfo.on == 1">
        <div class="contact" @click="toggleWxId"><img src="./service@3x.png"/>联系顾问</div>
        <router-link :to="{name:'contract',params:{taskId:taskId}}" tag="div" class="viewContractBtn">查看合同</router-link>
        <router-link to="/applyCheck" tag="div" class="check">验收</router-link>
      </footer>
      <footer class="taskDetailFooter taskComment"
              v-if="taskInfo.order_status == 5 && taskInfo.status == 99 && taskInfo.on == 1">
        <div class="contact" @click="toggleWxId"><img src="./service@3x.png"/>联系顾问</div>
        <router-link :to="{name:'contract',params:{taskId:taskId}}" tag="div" class="viewContractBtn">查看合同
        </router-link>
        <router-link :to="{name:'toRateTask',params:{taskId:taskId,bidId:bidId}}" tag="div" class="comment">评价
        </router-link>
      </footer>
      <footer class="taskDetailFooter taskSuccess"
              v-if="taskInfo.order_status == 99 && taskInfo.status == 99 && taskInfo.on == 1">已成功
      </footer>
    </div>
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
    <!--放弃-->
    <transition name="giveUpModelFade">
      <div class="giveUpModel" v-show="showGiveUpModel">
        <div class="showText">
          <div class="title">是否确认放弃</div>
          <div class="desc">告知当前状态，信息和解决办法</div>
        </div>
        <div class="actionBtnWrapper">
          <div @click.stop="giveUpItem" class="confirmBtn">是</div>
          <div @click.stop="toggleGiveUpModel" class="cancelBtn">否</div>
        </div>
      </div>
    </transition>
    <!--遮罩-->
    <transition name="overlayFade">
      <div class="overlay" v-show="showGetWxModel||showAd||showGiveUpModel" @click="hideWxModel"></div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import header from "@/components/v-header/v-header"
  import Tag from '@/components/tag'
  import Loading from '@/components/loading'
  import {formatDate} from '@/common/utils/utils.js'

  export default {
    name: 'taskDetail',
    data() {
      return {
        isLoading: false,
        taskInfo: {},// 传回来的任务数据
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
        showGetWxModel: false,// 客服微信号弹框显隐
        showGiveUpModel: false,// 放弃提示框
        showAd: false,// 广告（下载行峡APP）显隐
        bidder: [
          // 投标人列表// status说明： 0-一般，1-对方已放弃（灰色显示），2-中标，3-被我淘汰（某个中标后其他自动变成被淘汰并隐藏起来）
          {
            name: '郑某某',
            isCertificated: true,
            avatar: './avatar.png',
            location: '广州',
            desc: ['市场推广', '风险投资', '大赛获奖', '3年经验'],
            gongli: 760, // 功力值
            times: 6, // 交易量
            status: 0,
            id: 11,
          },
        ],
        // bidId: 10,// 投标者id，如果已经选择的话就只有一个bidId，否则应该为空
        taskId: 0, // 任务id
        orderId: 0, // 预约服务的时候的订单id
        taskStatus: 0, // 任务类型，解释：-1-任务页用 0-已选择，1-已放弃，2-托管资金，3-已支付，4-评价，5-交易成功，6-未选择，7-暂无竞标
        type: -1,
        date: '2017-08-05', // 任务日期
        period: '1周', // 项目周期
        skills: ['SEM', '市场策划', 'SEO'], // 所需技能
        bidNum: 16,// 投标人数
        hasValidBidder: true,
        bidId: -2,
      }
    },
    computed: {
      pageTitle() {
        // 根据是从哪里进来的来控制导航条文字
        let type = this.type
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
      },
      globalDOMAIN() {
        return this.$store.state.globalDOMAIN
      },
      token() {
        return sessionStorage.getItem('token')
      },
      wxId(){
        return this.$store.state.customerService.wechat
      }, // 客服微信号
  },
    created() {
      this.type = this.$route.params.type
      this.type == 2 ? this.orderId = this.$route.params.id : this.taskId = this.$route.params.id
      this.getTaskDetail()
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

      eliminate(bidId) {
        this.sentBiderRelatedRequest('weedOut', bidId)
      },// 淘汰某投标者

      chooseHim(bidId) {
        this.sentBiderRelatedRequest('win', bidId)
      },// 选择某投标者

      sentBiderRelatedRequest(action, id) {
        this.$http.post(`${this.globalDOMAIN}Employ/Task/${action}`, {'bid_id': id}, {
          emulateJSON: true,
          headers: {'token': this.token}
        }).then((res) => {
          if (res.body.status) {
            this.$vux.toast.text(`${res.body.msg}`)
          } else {
            this.$vux.toast.text(`${res.body.msg}`)
          }
        })
      },

      getTaskDetail() {
        if (this.type == 2) {
          let id = this.orderId
          this.$http.get(`${this.globalDOMAIN}Employ/Service/getBookInfo`, {
            params: {'order_id': id},
            emulateJSON: true,
            headers: {'token': this.token}
          }).then(res => {
            if (res.body.status) {
              let data = res.body.data
              this.taskId = data.service.id
              this.period = '查询不到'
              this.taskInfo = {
                title: data.service.title,
                price: data.service.price,
                inputtime: data.service.inputtime,
                city: data.service.city || '查询不到',
                work_type: '查询不到',
                desc: data.remark,
                bids: [
                  {
                    status: 99,
                    user: {
                      username: data.employ.username,
                      point: data.employ.point,
                    },
                    isCertificated: true,// 假数据
                    location: '广州', // 假数据
                    desc: ['市场推广', '广告行业'], // 假数据
                    times: 6, // 假数据
                  }
                ]
              }
              // this.hasValidBidderMethod()
              // this.bidIdMethod()
            } else {
              this.$vux.toast.text(response.body.msg)
            }
          })
        } else {
          let id = this.taskId
          this.$http.get(`${this.globalDOMAIN}Employ/Task/getById`, {
            params: {'task_id': id},
            emulateJSON: true,
            headers: {'token': this.token}
          }).then((response) => {
            if (response.body.status) {
              let data = response.body.data
              this.taskInfo = data
              this.hasValidBidderMethod()
              this.bidIdMethod()
              console.log(this.taskInfo)
            } else {
              this.$vux.toast.text(response.body.msg)
            }
          })
        }
      },// 发送请求获取数据
      goToContract() {
        if (this.type == 2) { // 服务
          this.$router.push({name: 'serviceContract', params: {orderId: this.orderId}})
        } else { // 任务
          this.$router.push({name: 'contract', params: {taskId: this.taskId}})
        }
      },// 点击发起合同
      giveUpItem() {
        let url, data
        if (this.type == 2) { // 服务
          url = `${this.globalDOMAIN}Employ/Service/giveUp`
          data = {
            'order_id': this.orderId
          }
        } else { // 任务
          url = `${this.globalDOMAIN}Employ/Task/giveUp`
          data = {
            'bid_id': this.bidId
          }
        }
        this.$http.post(url, data, {
          emulateJSON: true,
          headers: {'token': this.token}
        }).then(res => {
          this.$vux.toast.text(res.body.msg)
        })
        this.showGiveUpModel = !this.showGiveUpModel
      },// 放弃某项

      onCloseBtnClick() {
        // 点击广告的关闭按钮
        this.showAd = false
      },
      toggleGiveUpModel() { // 弹出或隐藏【删除】框
        let y = window.scrollY + 200;
        let model = document.querySelector(".giveUpModel")
        model.style.top = y + 'px'
        this.showGiveUpModel = !this.showGiveUpModel
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
      },
      toBid() {
        this.$http.post(`${this.globalDOMAIN}Employ/Task/bid`, {'task_id': this.taskId}, {
          emulateJSON: true,
          headers: {'token': this.token}
        }).then((res) => {
          let body = res.body
          if (body.status) {
            this.$vux.toast.text(body.msg)
          } else {
            this.$vux.toast.text(body.msg)
          }
        })
      },// 投标、竞标
      hasValidBidderMethod() {
        if (this.taskInfo.bids) {
          let valid = 0
          for (let bid of this.taskInfo.bids) {
            if (bid.status != '0') {
              this.hasValidBidder = true
              return false
            }
          }
        }
        this.hasValidBidder = false
      },// 是否有未被雇主淘汰的投标者
      bidIdMethod() {
        if (this.taskInfo.bids) {
          for (let bid of this.taskInfo.bids) {
            if (bid.status == 99) {
              this.bidId = bid.id
            }
          }
        }
      },// 中标的投标者的bid id，
    },
    filters: {
      formatDate(time) {
        let date = new Date(time * 1000)// Unix时间戳是1970年一来的【秒】，js中的时间戳的【毫秒】
        return formatDate(date, 'yyyy-MM-dd')
      }
    },
    components: {
      Tag,
      Loading,
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
      .taskBasicInfoLeft
        flex: 1
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
        .bidNum
          color: #00a0e9
          font-size: px2-2-rem(36)
          margin-right: px2-2-rem(8)
        .headerImg
          width: px2-2-rem(30)
          margin-right: px2-2-rem(20)
      .detailInfoHeader:last-child
        margin-top: px2-2-rem(40)
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
        flex-direction: column
        justify-content: center
        align-items: center
        font-size: px2-2-rem(26)
        height: px2-2-rem(394)
        img
          width: px2-2-rem(227)
          margin-bottom: px2-2-rem(30)
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
      color: #fff
      background-color: #00a0e9
    .contactEmployer, .toBid
      display: flex
      flex: 1
      align-items: center
      justify-content: center
      height: 100%
    .contactEmployer
      background-color: #ffffff
      color: #00a0e9
    .toBid
      background-color: #00a0e9
      color: #ffffff
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
  .getWxModel, .giveUpModel
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
      .desc
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
