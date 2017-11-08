<template>
  <div class="unionDetailWrapper">
    <v-header :title="title"></v-header>
    <img class="banner" :src="banner"/>
    <img @click="quit" class="delete" src="./delete.png"/>
    <ul class="tabBar" @click="onTabBarClick">
      <li data-index="0" :class="[currentActive==0?'active':'','tabItem']">功力 ↓</li>
      <li data-index="1" :class="[currentActive==1?'active':'','tabItem']">加入时间 ↑↓</li>
    </ul>
    <div class="memberListWrapper">
      <div class="member" v-for="(item,index) in member">
        <img class="memberAvatar" :src="item.avatar"/>
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
        banner: '',
        unionName: '',
        peopleNum: 0,
        currentActive: 0,//当前tab bar active index
        flag:true, // 用于toggle加入时间排序，默认是true，即加入晚的排前面
        member: [ // 成员列表
//          {
//            name: '郑某某',
//            isCertificated: true,
//            avatar: './avatar.png',
//            location: '广州',
//            desc: ['市场推广', '风险投资', '大赛获奖', '3年经验'],
//            gongli: 760, // 功力值
//            times: 6, // 交易量
//          },
        ],
      }
    },
    computed: {
      title() {
        return `${this.unionName} (${this.peopleNum})`
      },
      globalDOMAIN() {
        return this.$store.state.globalDOMAIN
      },
      token() {
        return sessionStorage.getItem('token')
      }
    },
    mounted() {
      this.getAd()
      this.getUnionDetail('point_desc')// 默认功力值高的前面
    },
    methods: {
      getUnionDetail(order) {
        // order: String类型
        // 可选值：
        // join_last:加入晚的排前面
        // join_first:加入早的排前面
        // point_desc: 功力值高的前面
        // point: 功力值低的排前面
        let id = this.$route.query.id
        this.$http.get(`${this.globalDOMAIN}Employ/User/getUnionMembers`, {
          params: {union_id: id,order:order},
          headers: {token: this.token}
        }).then(res => {
          // 处理数据
          if (res.body.status) {
            let data = res.body.data
            this.unionName = data.union.title
            this.peopleNum = data.total
            let tempList = []
            for (let item of data.lists) {
              let tempItem = {
                name: item.user.nickname,
                isCertificated: item.user.is_xiake == 1 ? true : false,
                location: item.user.xiakeInfo.city_name,
                desc:[item.user.xiakeInfo.industry_name],
                gongli:item.user.point,
                times:item.user.xiakeInfo.confirm_sum,
              }
              if(item.user.userpic){
                tempItem.avatar=`${this.globalDOMAIN.slice(0, -11)}${item.user.userpic}`
              }else{
                tempItem.avatar='/static/avatar.png'
              }
              tempList.push(tempItem)
            }
            this.member = tempList
          }
        })
      },
      quit() {
        let result = confirm('真的要退出吗？')
        if (result) {
          // 用户点击了确定
          let id = this.$route.query.id
          this.$http.post(`${this.globalDOMAIN}Employ/User/leaveUnion`, {union_id: id}, {
            headers: {token: this.token},
            emulateJSON: true,
          }).then(res => {
            if (res.body.status) {
              this.$vux.toast.text('退出成功')
              this.$router.go(-1)
            }
          })
        }
      },// 退出联盟
      getAd() {
        this.$http.get(`${this.globalDOMAIN}Api/Common/getAd`, {params: {type: 4}}).then(res => {
          if (res.body.status) {
            this.banner = `${this.globalDOMAIN.slice(0, -11)}${res.body.data.lists[0].img}`
          }
        })
      },// 获取banner广告图
      onTabBarClick(e) {
        if (e.target.dataset.index) {
          this.currentActive = e.target.dataset.index
        }
        if(this.currentActive == 0){
          // 按功力排序
          this.getUnionDetail('point_desc')
        }else if(this.currentActive == 1){
          // 按时间
          if(this.flag){
            // 加入时间晚的排前面
            this.getUnionDetail('join_last')
          }else{
            // 加入时间早的排前面
            this.getUnionDetail('join_first')
          }
          this.flag = !this.flag
        }
      },// 点击排序bar
    },
    components: {
      'v-header': header
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../../common/style/fun.styl"
  .unionDetailWrapper
    position: relative
    display: flex
    flex-direction: column
    min-height: 100%
    font-size: px2-2-rem(32)
    background-color: #f8f8f8
    .delete
      position: absolute
      right: px2-2-rem(30)
      top: px2-2-rem(23)
      width: px2-2-rem(46)
      height: px2-2-rem(46)
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
        margin-bottom: px2-2-rem(20)
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
