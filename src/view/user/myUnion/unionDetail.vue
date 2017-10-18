<template>
  <div class="unionDetailWrapper">
    <v-header :title="title"></v-header>
    <img class="banner" src="/static/banner_@3x.png"/>
    <ul class="tabBar" @click="onTabBarClick">
      <li data-index="0" :class="[currentActive==0?'active':'','tabItem']">功力 ↑</li>
      <li data-index="1" :class="[currentActive==1?'active':'','tabItem']">加入时间 ↑↓</li>
    </ul>
    <div class="memberListWrapper">
      <div class="member" v-for="(item,index) in member">
        <img class="memberAvatar" src="./avatar.png"/>
        <div class="memberInfo">
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
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import header from '@/components/v-header/v-header'

  export default {
    data() {
      return {
        unionName: '移动办公',
        peopleNum: 50,
        currentActive: 0,//当前tab bar active index
        member: [ // 成员列表
          // status说明： 0-一般，1-对方已放弃（灰色显示），2-中标，3-被我淘汰（某个中标后其他自动变成被淘汰并隐藏起来）
          {
            name: '郑某某',
            isCertificated: true,
            avatar: './avatar.png',
            location: '广州',
            desc: ['市场推广', '风险投资', '大赛获奖', '3年经验'],
            gongli: 760, // 功力值
            times: 6, // 交易量
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
          },
        ],
      }
    },
    computed: {
      title() {
        return `${this.unionName} (${this.peopleNum})`
      }
    },
    methods: {
      onTabBarClick(e) {
        if (e.target.dataset.index) {
          this.currentActive = e.target.dataset.index
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
  .unionDetailWrapper
    display: flex
    flex-direction: column
    min-height: 100%
    font-size: px2-2-rem(32)
    background-color: #f8f8f8
    .banner
      height: px2-2-rem(250)
      margin-bottom: px2-2-rem(30)
    .tabBar
      display: flex
      align-items: center
      height: px2-2-rem(80)
      border-bottom: 1px solid #e5e5e5
      border-top: 1px solid #e5e5e5
      .tabItem
        flex: 1
        text-align: center
      .active
        color: #00a0e9
    .memberListWrapper
      background-color: #ffffff
      .member
        display: flex
        flex-direction: row
        align-items: center
        background-color: #ffffff
        padding: px2-2-rem(38) px2-2-rem(32)
        margin-bottom :px2-2-rem(20)
        .memberAvatar
          margin-right: px2-2-rem(32)
        .memberInfo
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
</style>
