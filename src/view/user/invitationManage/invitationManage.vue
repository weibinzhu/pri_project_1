<template>
  <div class="invitationManageWrapper">
    <v-header title="邀请管理"></v-header>
    <div class="userInfo">
      <div class="invitationNotice">邀请须知</div>
      <div class="userBasicInfo">
        <img :src="avatar"/>
        <div class="userName">
          <div>{{name}}<span v-if="isCertificated">{{status}}</span></div>
          <div class="userId">ID:{{id}}</div>
        </div>
      </div>
      <router-link to="/toInvite" tag="div" class="userQRCode">
        <img :src="QRCode"/>
      </router-link>
      <div class="userStatistic">
        <div class="statisticItem">
          <p>{{invitationNum}}</p>
          <div>邀请数</div>
        </div>
        <div class="statisticItem">
          <p>{{gongli}}</p>
          <div>功力值</div>
        </div>
      </div>
    </div>
    <div class="noInvitationNotice" v-if="noInvitation">
      <img src="/static/noBid@3x.png"/>
      <p>暂无邀请</p>
    </div>
    <div class="invitationContentBlock" v-else>
      <ul class="invitationTabBar" @click="onTabBarClick">
        <li :class="['invitationTabItem', currentActiveIndex==0?'active':'']" data-id="0">
          直接邀请 ({{currentInviAll[0]}})
        </li>
        <li :class="['invitationTabItem', currentActiveIndex==1?'active':'']" data-id="1">
          一级邀请 ({{currentInviAll[1]}})
        </li>
        <li :class="['invitationTabItem', currentActiveIndex==2?'active':'']" data-id="2">
          二级邀请 ({{currentInviAll[2]}})
        </li>
      </ul>
      <!--直接邀请-->
      <ul class="invitationList" v-show="currentActiveIndex == 0">
        <li class="invitationListItem" v-for="(item,index) in directInvitationList">
          <img :src="item.avatar"/>
          <div class="inviterInfo">
            <div class="inviterName">
              <div>
                {{item.name}}<span class="tag" v-if="item.isCertificated">已认证</span>
              </div>
              <span class="date">
                {{item.date}}
              </span>
            </div>
            <div class="inviterStatistic">
              邀请数量<span>{{item.invitationNum}}</span>增加功力值<span>{{item.addedGongli}}</span>
            </div>
          </div>
        </li>
      </ul>
      <!--一级邀请-->
      <ul class="invitationList" v-show="currentActiveIndex == 1">
        <li class="invitationListItem" v-for="(item,index) in firstInvitationList">
          <img :src="item.avatar"/>
          <div class="inviterInfo">
            <div class="inviterName">
              <div>
                {{item.name}}<span class="tag" v-if="item.isCertificated">已认证</span>
              </div>
              <span class="date">
                {{item.date}}
              </span>
            </div>
            <div class="inviterStatistic">
              邀请数量<span>{{item.invitationNum}}</span>增加功力值<span>{{item.addedGongli}}</span>
            </div>
          </div>
        </li>
      </ul>
      <!--二级邀请-->
      <ul class="invitationList" v-show="currentActiveIndex == 2">
        <li class="invitationListItem" v-for="(item,index) in secondInvitationList">
          <img :src="item.avatar"/>
          <div class="inviterInfo">
            <div class="inviterName">
              <div>
                {{item.name}}<span class="tag" v-if="item.isCertificated">已认证</span>
              </div>
              <span class="date">
                {{item.date}}
              </span>
            </div>
            <div class="inviterStatistic">
              邀请数量<span>{{item.invitationNum}}</span>增加功力值<span>{{item.addedGongli}}</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import header from '../../../components/v-header/v-header'

  export default {
    data() {
      return {
        avatar: '/static/avatar.png',
        QRCode: '/static/QR.png',
        name: '',
        id: -1,
        status: '已认证',
        isCertificated:false,
        invitationNum: 0,
        gongli: 0,
        currentInviAll: [5, 3, 5],// 目前的各个级别邀请数
        currentActiveIndex: 0,
        directInvitationList: [
//          {
//            name: '郑某某',
//            isCertificated: true,
//            avatar: '/static/avatar.png',
//            date: '2016-09-10',
//            invitationNum: 5,
//            addedGongli: 500
//          },
        ], // 直接邀请
        firstInvitationList: [
//          {
//            name: 'mou某某',
//            isCertificated: true,
//            avatar: '/static/avatar.png',
//            date: '2016-09-10',
//            invitationNum: 5,
//            addedGongli: 500
//          },
        ], // 一级邀请
        secondInvitationList: [
//          {
//            name: '记某某',
//            isCertificated: false,
//            avatar: '/static/avatar.png',
//            date: '2016-09-30',
//            invitationNum: 5,
//            addedGongli: 500
//          },
        ], // 二级邀请
      }
    },
    computed: {
      noInvitation() {
        return this.directInvitationList.length === 0 || this.firstInvitationList.length === 0 || this.secondInvitationList.length === 0
      },
      globalDOMAIN() {
        return this.$store.state.globalDOMAIN
      },
    },
    created(){
      this.initUserInfo()
    },
    methods: {
      initUserInfo(){
        this.name = sessionStorage.getItem('nickname')
        this.id = sessionStorage.getItem('userid')
        this.isCertificated = sessionStorage.getItem('is_xiake')==1?true:false
        this.gongli = sessionStorage.getItem('point')
        let userpic = sessionStorage.getItem('userpic')
        if(userpic){
          this.avatar = `${this.globalDOMAIN}${userpic}`
        }
      },// 初始化用户信息
      onTabBarClick(e) {
        if (e.target.dataset.id) {
          this.currentActiveIndex = e.target.dataset.id
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
  .invitationManageWrapper
    display: flex
    flex-direction: column
    align-items: center
    min-height: 100vh
    font-size: px2-2-rem(32)
    background-color: #f8f8f8
    .noInvitationNotice
      display :flex
      flex-direction :column
      align-items:center
      img
        width :px2-2-rem(300)
        margin-top :px2-2-rem(100)
      p
        font-size :px2-2-rem(36)
        margin-top :px2-2-rem(50)
    .userInfo
      box-sizing: border-box
      position: relative
      display: flex
      flex-direction: row
      justify-content: space-between
      width: 100%
      height: px2-2-rem(312)
      padding: px2-2-rem(45) px2-2-rem(36) 0
      margin-bottom: px2-2-rem(110)
      background-image: url('/static/user/xiake/bg@2x.png')
      background-repeat: no-repeat
      background-position: 0 0
      background-size: 100% px2-2-rem(312)
      .invitationNotice
        position: absolute
        color: #00a0e9
        top: px2-2-rem(-68)
        right: px2-2-rem(50)
      .userBasicInfo
        display: flex
        flex-direction: row
        height: px2-2-rem(134)
        font-size: px2-2-rem(32)
        color: #ffffff
        img
          width: px2-2-rem(134)
          height: px2-2-rem(134)
          border-radius: 50%
          margin-right: px2-2-rem(36)
        .userName
          display: flex
          flex-direction: column
          justify-content: space-between
          flex: 1
          div
            display: flex
            flex-direction: row
            align-items: center
          span
            margin-left: px2-2-rem(20)
            font-size: px2-2-rem(24)
            padding: 0 px2-2-rem(16)
            height: px2-2-rem(30)
            line-height: px2-2-rem(30)
            border: 1px solid #ffffff
            border-radius: px2-2-rem(8)
          .userId
            font-size: px2-2-rem(28)
      .userQRCode
        display: flex
        flex-direction: row
        align-items: center
        justify-content: center
        width: px2-2-rem(134)
        height: px2-2-rem(134)
        img
          width: px2-2-rem(70)
          height: px2-2-rem(70)
      .userStatistic
        position: absolute
        display: flex
        flex-direction: row
        align-items: center
        bottom: px2-2-rem(-80)
        left: px2-2-rem(20)
        width: px2-2-rem(710)
        height: px2-2-rem(160)
        background-color: #ffffff
        border-radius: px2-2-rem(8)
        box-shadow: 0px 2px 5px 0px rgba(229, 229, 229, 1);
        .statisticItem
          flex: 1
          height: px2-2-rem(82)
          text-align: center
          font-size: px2-2-rem(32)
          color: #353535
          border-right: 1px solid #f2f2f2
          div
            font-size: px2-2-rem(26)
            color: #999999
        .statisticItem:last-child
          border: none
    .invitationContentBlock
      width: px2-2-rem(710)
      background-color: #ffffff
      border-radius: px2-2-rem(8)
      box-shadow: 0px 2px 5px 0px rgba(229, 229, 229, 1)
      .invitationTabBar
        position: sticky
        top:0
        height: px2-2-rem(82)
        display: flex
        flex-direction: row
        align-items: center
        justify-content: space-between
        padding: 0 px2-2-rem(32)
        background-color :#ffffff
        .invitationTabItem
          box-sizing: border-box
          height: px2-2-rem(82)
          line-height: px2-2-rem(82)
          &.active
            color: #00a0e9
            border-bottom: px2-2-rem(8) solid #00a0ea
      .invitationList
        display: flex
        flex-direction: column
        align-items: center
        .invitationListItem
          box-sizing: border-box
          display: flex
          flex-direction: row
          align-items: center
          width: 100%
          height: px2-2-rem(166)
          font-size: px2-2-rem(32)
          color: #353535
          padding: 0 px2-2-rem(32)
          border-top: 1px solid #e5e5e5
          img
            width: px2-2-rem(100)
            height: px2-2-rem(100)
            margin-right: px2-2-rem(26)
          .inviterInfo
            flex: 1
            display: flex
            flex-direction: column
            height: px2-2-rem(100)
            justify-content: space-between
            .inviterName
              display: flex
              flex-direction: row
              justify-content: space-between
              div
                display: flex
                align-items: center
              .tag
                display: block
                font-size: px2-2-rem(20)
                color: #00a0ea
                width: px2-2-rem(90)
                height: px2-2-rem(26)
                line-height: px2-2-rem(26)
                text-align: center
                margin-left: px2-2-rem(20)
                border-radius: px2-2-rem(8)
                border: 1px solid #00a0ea
              .date
                color: #999999
                font-size: px2-2-rem(26)
            .inviterStatistic
              color: #999999
              font-size: px2-2-rem(26)
              span
                margin: 0 px2-2-rem(20)
                color: #e4790f
</style>
