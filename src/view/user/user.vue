<template>
  <div class="userWrapper">
    <div class="userHeaderWrapper" :style="{'background-image': `url(${userHeaderBgUrl})`}">
      <div class="userInfoWrapper">
        <!--<img src="/static/user/bg@2x.png" class="userInfoWrapperImg"/>-->
        <img src="/static/avatar.png" class="userAvatar"/>
        <div class="userInfo">
          <div class="userName">郑某某
            <div class="userStatus">审核中</div>
          </div>
          <div class="userId">ID: 45895</div>
        </div>
        <div class="userPoint" :style="{'background-image': `url(${userPointUrl})`}">
          <span>功力值 {{gongli}}</span>
        </div>
      </div>
      <nav class="userNavWrapper">
        <!--发布服务与切换雇主版、峡客版-->
        <div class="userTools">
          <div class="userPost" @click="release">
            <img src="./post@2x.png">发布服务
          </div>
          <div class="userChange" @click="userChange">
            <img src="./paixu@2x.png">{{userChangeText}}
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
    <div v-for="(sublist,key) in linklist" :key="key" class="linklistBlock" :class="key">
      <router-link :to="item.link" tag="div" v-for="(item,index) in sublist" :key="index" class="linklistItem">
        <!--<i :class="['iconfont', item.icon]"></i>-->
        <img :src="item.icon"/>
        <div class="linklistItemText">
          {{item.text}}
          <img src="/static/arrow-right@2x.png"/>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
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
              link: '/home/signIn'
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
              link: '/home/signIn'
            },
            {
              icon: '/static/user/link@2x.png',
              text: '绑定官方微信',
              link: '/home/signIn'
            },
            {
              icon: '/static/user/settings@2x.png',
              text: '设置',
              link: '/setting'
            },
          ]
        },// 所有菜单项
        gongli: 0,// 功力值
        userChangeText: '切换到创客版',// 用户切换提示
        currentUserType: 0,// 当且版本，0为雇主版，1为创客版
        userHeaderBgUrl: '/static/user/bg@3x.png',// 头图地址
        userPointUrl: '/static/user/hot_fill@3x.png',// 功力值背景
        myUnion:{
          icon: '/static/user/group@2x.png',
          text: '我的联盟',
          link: '/myUnion'
        },// 【我的联盟】菜单项，只有雇主主页有
      }
    },
    created(){
      // 一开始如果就是雇主
      // 后来发现雇主和峡客都需要这个菜单项
      // 不过还是大致保留这个逻辑，以便以后需要的时候可以用
      if (this.currentUserType == 0){
        this.linklist.sublist_2.splice(2,0,this.myUnion)
      }
    },
    watch:{
      // 监听用户类型变化，改变菜单选项
      currentUserType(newVal,oldVal){
        if (newVal == 0 && oldVal == 1){
          // this.linklist.sublist_2.splice(2,0,this.myUnion)
          return true
        }else if(newVal == 1 && oldVal == 0){
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
          this.userChangeText = '切换到雇主版'
          this.userHeaderBgUrl = '/static/user/xiake/bg@2x.png'
          this.userPointUrl = '/static/user/xiake/hot_fill@2x.png'
          this.currentUserType = 1
        } else if (this.currentUserType === 1) {
          this.userChangeText = '切换到创客版'
          this.userHeaderBgUrl = '/static/user/bg@3x.png'
          this.userPointUrl = '/static/user/hot_fill@3x.png'
          this.currentUserType = 0
        } else {
          return false
        }

      },
      release(){
        // 发布任务或服务
        if (this.currentUserType === 0) {
          // 发布任务
          this.$router.push({path:'/taskRelease2'})
        } else if (this.currentUserType === 1) {
          // 发布服务
          this.$router.push({path:'/taskRelease2'})
        } else {
          return false
        }
      }
    },
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
        width: 2.8rem
        .userStatus
          border: 1px solid #ffffff
          border-radius: 4px
          width: 1.2rem
          height: 0.35rem
          line-height: 0.35rem
          font-size: 0.266666rem
          text-align: center
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
      transition :all 1s
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
      position :absolute
      top:0
      display: flex
      flex-direction: row
      width: 100%
      height: 100%
    .userNavFadeEmployer-enter, .userNavFadeEmployer-leave-to,.userNavFadeXiake-enter, .userNavFadeXiake-leave-to
      opacity: 0
    .userNavFadeEmployer-enter-active,.userNavFadeEmployer-leave-active,.userNavFadeXiake-enter-active,.userNavFadeXiake-leave-active
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
</style>

