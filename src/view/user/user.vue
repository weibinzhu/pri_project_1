<template>
  <div class="userWrapper">
    <div class="userHeaderWrapper" :style="{'background-image': `url(${userHeaderBgUrl})`}">
      <div class="userInfoWrapper">
        <!--<img src="/static/user/bg@2x.png" class="userInfoWrapperImg"/>-->
        <img src="/static/avatar.png" class="userAvatar"/>
        <div class="userInfo">
          <div class="userName">{{nickName}}
            <tag :tagClass="'tagWhite'" :tagName="'审核中'"></tag>
          </div>
          <div class="userId">ID: {{userId}}</div>
        </div>
        <div class="userPoint" :style="{'background-image': `url(${userPointUrl})`}">
          <span>功力值 {{gongli}}</span>
        </div>
      </div>
      <nav class="userNavWrapper">
        <!--发布服务与切换雇主版、峡客版-->
        <div class="userTools">
          <div class="userPost" @click="release">
            <img src="./post@2x.png">{{currentUserType === 0?'发布任务':'发布服务'}}
          </div>
          <div class="userChange" @click="userChange">
            <img src="./paixu@2x.png">{{currentUserType === 0?'切换到峡客版':'切换到雇主版'}}
          </div>
        </div>
        <!--子页面导航：任务管理、主页、谁预约我等-->
        <transition name="userNavFadeEmployer">
          <!--雇主主页用-->
          <div class="userNavBar" v-if="currentUserType == 0">
            <router-link to="/employerMainPage" tag="li" class="userNavItem">
              <img src="./shop@3x.png"/>
            </router-link>
            <router-link to="/taskManageMainPage" tag="li" class="userNavItem">
              <img src="./qr_code@3x.png"/>
            </router-link>
            <router-link to="/employerAppointment" tag="li" class="userNavItem">
              <img src="./employerFriend@3x.png"/>
            </router-link>
          </div>
        </transition>
        <transition name="userNavFadeXiake">
          <!--峡客主页用-->
          <div class="userNavBar" v-if="currentUserType == 1">
            <router-link :to="{name:'xiakeMainPage',params:{type:0}}" tag="li" class="userNavItem">
              <img src="./home@2x.png"/>
            </router-link>
            <li class="userNavItem">
              <img src="./skill@2x.png"/>
            </li>
            <router-link to="/hasBidded" tag="li" class="userNavItem">
              <img src="./tag@2x.png"/>
            </router-link>
            <router-link to="/whoReservedMe" tag="li" class="userNavItem">
              <img src="./friend@3x.png"/>
            </router-link>
          </div>
        </transition>
      </nav>
    </div>

    <!--<router-link to="/home/myFav">to myFav</router-link>-->
    <div v-for="(sublist,key) in linklist" :key="key" class="linklistBlock" :class="key" @click="onLinkListItemClick">
      <!--<router-link :to="item.link" tag="div" v-for="(item,index) in sublist" :key="index" class="linklistItem">-->
      <!--&lt;!&ndash;<i :class="['iconfont', item.icon]"></i>&ndash;&gt;-->
      <!--<img :src="item.icon"/>-->
      <!--<div class="linklistItemText">-->
      <!--{{item.text}}-->
      <!--<img src="/static/arrow-right@2x.png"/>-->
      <!--</div>-->
      <!--</router-link>-->
      <div :data-url="item.link" v-for="(item,index) in sublist" :key="index" class="linklistItem">
        <!--<i :class="['iconfont', item.icon]"></i>-->
        <img :src="item.icon"/>
        <div class="linklistItemText">
          {{item.text}}
          <img src="/static/arrow-right@2x.png"/>
        </div>
      </div>
    </div>
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
    <transition name="overlayFade">
      <div class="overlay" v-show="showGetWxModel" @click="toggleModel('.getWxModel','showGetWxModel')"></div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import Tag from '@/components/tag'
  import {saveResDataToSession} from '@/common/utils/utils.js'

  export default {
    data() {
      return {
        // 用户信息：
        gongli: 0,// 功力值
        nickName: '',// 用户昵称

        // 当前状态、样式相关
        currentUserType: 0,// 当且版本，0为雇主版，1为创客版
        userHeaderBgUrl: '/static/user/bg@3x.png',// 头图地址
        userPointUrl: '/static/user/hot_fill@3x.png',// 功力值背景
        showGetWxModel: false,// 客服弹框显隐

        // 固定数据
        linklist: {
          sublist_1: [
            {
              icon: '/static/user/location.png',
              text: '签到',
              link: '/signIn'
            },
            {
              icon: '/static/user/star.png',
              text: '我的收藏',
              link: '/myFav'
            },
            {
              icon: '/static/user/money.png',
              text: '我的钱包',
              link: '/myMoney'
            }
          ],
          sublist_2: [
            {
              icon: '/static/user/diamon@2x.png',
              text: '我的名号',
              link: '/myReputation'
            },
            {
              icon: '/static/user/pic.png',
              text: '我的海报',
              link: '/myPoster'
            },
            {
              icon: '/static/user/group@2x.png',
              text: '我的联盟',
              link: '/myUnion'
            },
            {
              icon: '/static/user/addPeople.png',
              text: '邀请管理',
              link: '/invitationManage'
            },
          ],
          sublist_3: [

            {
              icon: '/static/user/kefu@2x.png',
              text: '联系顾问',
              link: ''
            },
            {
              icon: '/static/user/link@2x.png',
              text: '绑定官方微信',
              link: ''
            },
            {
              icon: '/static/user/settings@2x.png',
              text: '设置',
              link: '/setting'
            },
          ]
        },// 所有菜单项
      }
    },
    computed: {
      userId() {
        return sessionStorage.getItem('userid')
      },// 用户ID
      globalDOMAIN() {
        return this.$store.state.globalDOMAIN
      },// 请求域名
      wxId(){
        return this.$store.state.customerService.wechat
      }, // 客服微信号
    },
    mounted() {
      this.gongli = sessionStorage.getItem('point')
      this.nickName = sessionStorage.getItem('nickname')
    },
    watch: {
      // 监听用户类型变化，改变菜单选项
      currentUserType(newVal, oldVal) {
        if (newVal == 0 && oldVal == 1) {
          // this.linklist.sublist_2.splice(2,0,this.myUnion)
          return true
        } else if (newVal == 1 && oldVal == 0) {
          // this.linklist.sublist_2.splice(2,1)
          return true
        }
      }
    },
    methods: {
      userChange() {
        // 切换用户

        // 切换显示文字与样式
        if (this.currentUserType === 0) {
          this.userHeaderBgUrl = '/static/user/xiake/bg@2x.png'
          this.userPointUrl = '/static/user/xiake/hot_fill@2x.png'
          this.currentUserType = 1
        } else if (this.currentUserType === 1) {
          this.userHeaderBgUrl = '/static/user/bg@3x.png'
          this.userPointUrl = '/static/user/hot_fill@3x.png'
          this.currentUserType = 0
        } else {
          return false
        }

      },
      release() {
        // 发布任务或服务
        if (this.currentUserType === 0) {
          // 发布任务
          this.$router.push({path: '/taskRelease2'})
        } else if (this.currentUserType === 1) {
          // 发布服务
          this.$router.push({path: '/releaseService'})
        } else {
          return false
        }
      },
      getDataSet(node, dataName) {
        // 点击内层元素也能获取绑定在外层元素的data
        // node: Element，节点
        // dataName: String，绑定的data值名称
        if (!node.dataset[dataName]) {
          if (node.nodeName === 'HTML') {
            // 如果到根节点还没找到
            return false
          }
          return this.getDataSet(node.parentElement, dataName)
        } else {
          return node.dataset[dataName]
        }
      },
      onLinkListItemClick(e) {
        let target = e.target, link
        link = this.getDataSet(target, 'url')
        if (link) {
          this.$router.push({path: link})
        } else {
          // 如果并没有绑定link
          this.toggleModel('.getWxModel', 'showGetWxModel')
        }
      },
      toggleModel(selector, flag) {
        // 弹出或隐藏某个框
        // selector: String, 用于传给querySelector
        // flag: String, 用于确定是哪一个框
        let y = window.scrollY + 200;
        let model = document.querySelector(selector)
        model.style.top = y + 'px'
        this[flag] = !this[flag]
      },
      checkIphone() { // 优雅降级。（暂时不需要用）
        if (navigator.userAgent.match(/ipad|ipod|iphone/i)) {
          alert('如果复制失败请手动复制')
        }
      },
    },
    components: {
      Tag
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/style/fun.styl"
  .userWrapper
    font-size: 0.427rem
    background-color: #f7f7f7
    padding-bottom: 1.9rem;

  /*防止底部内容被tap bar挡住*/
  .userHeaderWrapper
    background-size: cover
    transition: all 1s

  /*background-image: url("./bg@3x.png")*/
  /*为了方便修改url，将这部分写成内联*/

  .userInfoWrapper
    position: relative
    display: flex
    flex-direction: row
    align-items: center
    height: 3.12rem
    .userAvatar
      margin-left: 0.5333rem
      margin-right: 0.48rem
      border-radius: 50%
      height: 1.7066rem
      width: 1.7066rem
    .userInfo
      display: flex
      justify-content: space-around
      flex-direction: column
      font-size: 0.42666rem
      height: px2-2-rem(150)
      color: #fff
      .userName
        display: flex
        flex-direction: row
        justify-content: space-between
        align-items: center
      .userId
        font-size: 0.36rem
    .userPoint
      position: absolute
      right: 0rem
      top: 1.2rem
      box-sizing: border-box
      display: flex
      flex-direction: row
      align-items: center
      height: 0.8rem
      width: 3.2rem
      transition: all 1s
      /*background-image: url("/static/user/hot_fill@3x.png")*/
      /*为了方便修改url，将这部分写成内联*/
      background-size: 3.2rem 0.8rem;
      color: #ffffff
      span
        margin-left: px2-2-rem(90)

  .userNavWrapper
    position: relative
    height: 2.4rem
    font-size: 0.4rem
    margin-bottom: 0.9333rem
    .userNavBar
    // 为了动画，不然在消失前会被挤出
      position: absolute
      top: 0
      display: flex
      flex-direction: row
      width: 100%
      height: 100%
    .userNavFadeEmployer-enter, .userNavFadeEmployer-leave-to, .userNavFadeXiake-enter, .userNavFadeXiake-leave-to
      opacity: 0
    .userNavFadeEmployer-enter-active, .userNavFadeEmployer-leave-active, .userNavFadeXiake-enter-active, .userNavFadeXiake-leave-active
      transition: opacity 1s
    .userNavItem
      position: relative
      display: flex
      flex-direction: column
      align-items: center
      flex-grow: 1
      margin-top: 0.4rem
      img
        height: px2-2-rem(122 * 0.8)
        width: px2-2-rem(144 * 0.8)
    /*用于分割线    */
    .userNavItem:after
      content: ''
      position: absolute
      right: 0
      top: 10px
      width: 1px
      height 35px
      box-sizing: border-box
      border-right: 1px solid #ffffff
    /*去除最后一条分割线    */
    .userNavItem:last-child:after
      display: none
    .userTools
      display: flex
      flex-direction: row
      align-items: center
      position: absolute
      bottom: -0.53335rem
      left: 1.30666rem
      width: 7.6rem
      z-index: 10
      height: 1.0667rem
      background-color: #ffffff
      border-radius: 0.48rem
      color: #0fa4ff
      box-shadow: 0px 8px 15px -6px rgba(0, 0, 0, 0.75);
      .userPost, .userChange
        /*flex-grow: 1*/
        display: flex
        align-items: center
        justify-content: center
        box-sizing: border-box
        height: 100%
        width: 50%
        :first-child
          margin-right: 0.32rem
        img
          width: px2-2-rem(26)
      .userChange
        flex-grow: 1
        border-left: 1px solid #e5e5e5

  .linklistBlock
    background-color: #ffffff
    font-size: 0.4rem
    margin-bottom: 0.2666666rem
    border-bottom: 1px solid #e5e5e5
    .linklistItem
      display: flex
      flex-direction: row
      align-items: center
      height: 1.1466rem
      padding-left: 0.48rem
      padding-right: 0.48rem
      img
        width: px2-2-rem(40)
      .linklistItemText
        flex-grow: 1
        display: flex
        align-items: center
        justify-content: space-between
        margin-left: 0.373333rem
        border-bottom: 1px solid #e5e5e5
        height: 100%
        img
          width: px2-2-rem(15)
          height: px2-2-rem(24)
  //        去掉最后一个元素的下边框
    .linklistItem:last-child
      .linklistItemText
        border: none

  //   修改不同列表块的icon的颜色
  .sublist_1
    .linklistItem
      > i
        color: #3abaef

  .sublist_2
    .linklistItem
      > i
        color: #f7a351

  .sublist_3
    .linklistItem
      > i
        color: #4acb81

  .overlay {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1000;
    background-color: rgba(0, 0, 0, .8);
  }

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

  .getWxFade-leave-active, .getWxFade-enter-active, .overlayFade-leave-active, .overlayFade-enter-active
    transition: all .5s

  .getWxFade-enter, .getWxFade-leave-to, .overlayFade-enter, .overlayFade-leave-to
    opacity: 0

</style>

