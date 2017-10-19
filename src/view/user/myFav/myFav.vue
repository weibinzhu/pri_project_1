<template>
  <div class="myFavWrapper">
    <v-header title="我的收藏"></v-header>
    <div class="myFavTabBar" @click="onTabBar">
      <div class="tabItemWrapper" v-for="(tab,index) in tabList" :data-index="index">
        <div :class="[activeTab==index?'active':'','tabItem']" :data-index="index">{{tab.name}}</div>
      </div>
    </div>
    <div class="myFavContentWrapper">
      <div class="myFavTask" v-for="(task,index) in myFavTask" v-show="activeTab == 0"><!--tab bar上第0个是任务，所以此处为0-->
        <div class="taskTitle">{{task.title}}</div>
        <div class="taskDetail">
          <div class="taskCompany">{{task.company}}</div>
          <div class="taskPrice">预算：<span>￥ {{task.price}}</span></div>
        </div>
      </div>
      <div class="myFavService" v-for="(service,index) in myFavService" v-show="activeTab == 1">
        <img class="avatar" :src="service.avatar"/>
        <div class="serviceInfo">
          <div class="serviceName">{{service.serviceName}}</div>

          <div class="name">{{service.name}} <tag v-if="service.isCertificated"></tag></div>
          <div class="descWrapper">
            <span class="desc" v-for="(desc,index) in service.serviceDesc">{{desc}}</span>
          </div>
        </div>
      </div>
      <div class="myFavCompany" v-for="(company,index) in myFavCompany" v-show="activeTab == 2">
        <img class="companyImg" :src="company.avatar"/>
        <div class="companyInfo">
          <div class="companyName">{{company.name}}
            <tag v-if="company.isCertificated"></tag></div>
          <div class="companyIndustry">{{company.industry}}</div>
        </div>
      </div>
      <div class="myFavXiake" v-for="(xiake,index) in myFavXiake" v-show="activeTab == 3">
        <img class="xiakeImg" :src="xiake.avatar"/>
        <div class="xiakeInfo">
          <div class="xiakeName">{{xiake.name}}<tag v-if="xiake.isCertificated"></tag></div>
          <div class="descWrapper">
            <span class="desc" v-for="(desc,index) in xiake.desc">{{desc}}</span>
          </div>
        </div>
      </div>
      <div class="myFavNews" v-for="(news,index) in myFavNews" v-show="activeTab == 4">
        <img class="newsImg" :src="news.image"/>
        <div class="newsInfo">
          <div class="newsTitle">{{news.title}}</div>
          <div class="newsDate">{{news.date}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import header from '@/components/v-header/v-header'
  import Tag from '@/components/tag'
  export default {
    data() {
      return {
        tabList: [
          {
            name: '任务',
            typeId: 0,
          },
          {
            name: '服务',
            typeId: 1,
          },
          {
            name: '公司',
            typeId: 2,
          },
          {
            name: '峡客',
            typeId: 3,
          },
          {
            name: '咨讯',
            typeId: 4,
          }
        ],
        activeTab: 0, // 当前选中的tab,
        myFavTask: [
          {
            title: '广东省XXX课题众包政府课题需要招募人员需求巴拉巴拉巴拉巴拉',
            price: '13000',
            url: 'http://www.baidu.com',
            company: '广州市闻喜信息科技有限公司'
          },
          {
            title: '广东省XXX课题众包政府课题需要招募人员需求巴拉巴拉巴拉巴拉',
            price: '15980',
            url: 'http://www.baidu.com',
            company: '主题邦'
          }
        ],
        myFavXiake: [
          {
            name: '郑某某',
            isCertificated: true,
            avatar: '/static/avatar.png',
            desc: ['市场推广', '3年经验']
          },
          {
            name: '卢某某',
            isCertificated: true,
            avatar: '/static/avatar.png',
            desc: ['市场推广', '3年经验']
          },
          {
            name: '某某某',
            isCertificated: false,
            avatar: '/static/avatar.png',
            desc: ['市场推广', '3年经验']
          },
        ],
        myFavNews: [
          {
            image: '/static/image1.png',
            title: '广东省XXX课题众包政府课题需要招募人员需求巴拉巴拉巴拉',
            date: '2017-02-01'
          }
        ],
        myFavService: [
          {
            name: '郑某某',
            avatar: 'static/avatar.png',
            isCertificated: true,
            serviceName: 'UI设计',
            serviceDesc: ['UI设计', '3年经验']
          }
        ],
        myFavCompany: [
          {
            name: '某公司',
            avatar: '/static/avatar.png',
            isCertificated: true,
            industry: '互联网行业'
          }
        ]
      }
    },
    components: {
      Tag,
      'v-header': header
    },
    methods: {
      onTabBar(e) {
//        console.log(e.target.dataset.index)
        this.activeTab = e.target.dataset.index
      },
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .myFavTabBar
    display: flex
    flex-direction: row
    justify-content: center
    align-items: center
    height: 1.173rem
    font-size: 0.4rem
    color: #353535
    border-bottom: 1px solid #d9d9d9
    .tabItemWrapper
      flex-grow: 1
      padding: 0 0.46rem
      .tabItem
        box-sizing: border-box
        height: 1.173rem
        line-height: 1.173rem
        text-align: center
      .active
        color: #00a0e9
        border-bottom: 0.0534rem solid #00a0e9

  .myFavContentWrapper
    display: flex
    flex-direction: column
    align-items: center
    min-height: 100vh
    background-color: #f8f8f8
    padding-top: 0.4rem

  .myFavTask, .myFavNews, .myFavService,.myFavCompany,.myFavXiake
    box-sizing: border-box
    width: 9.4666rem
    height: 3.4666rem
    font-size: 0.4rem
    background-color: #ffffff
    border-radius: 0.16rem
    padding: 0.5866rem 0.4rem
    margin-bottom: 0.4rem

  .myFavTask
    display: flex
    flex-direction: column
    justify-content: space-between
    .taskTitle
      width: 6.9866rem
    .taskDetail
      display: flex
      flex-direction: row
      justify-content: space-between
    .taskCompany
      font-size: 0.32rem
      color: #888888
    .taskPrice
      font-size: 0.32rem
      span
        color: #e4790f

  .myFavNews, .myFavService,.myFavCompany,.myFavXiake
    display: flex
    flex-direction: row
    align-items: center
    .newsImg
      width: 2.2933rem
      height: 2.2933rem
      margin-right: 0.4rem
    .newsInfo
      display: flex
      flex-direction: column
      justify-content: space-between
      height: 2.2933rem
    .newsDate
      font-size: 0.2666rem
      color: #b6b6b6

  .myFavService
    .avatar
      width: 2.053rem
      height: 2.053rem
      border-radius: 50%
      margin-right: 0.4rem
    .serviceInfo
      line-height: 0.7rem
    .name, .descWrapper
      display: flex
      align-items: center
      color: #999999
    .desc
      display :flex
      flex-direction :row
      align-items :center
      padding-right: 0.3rem
    .desc:after
      content: '|'
      font-size: 0.3rem
      margin-left: 0.3rem
    .desc:last-child:after
      content: ''
  .myFavCompany,.myFavXiake
    .companyImg,.xiakeImg
      width: 2.053rem
      height: 2.053rem
      margin-right: 0.4rem
    .companyInfo,.xiakeInfo
      display :flex
      flex-direction :column
      justify-content :space-between
      height :1.5rem
    .companyName,.xiakeName
      display :flex
      align-items :center
    .companyIndustry
      font-size :0.293rem
      color: #999999
  .myFavXiake
    .descWrapper
      display: flex
      align-items: center
      color: #999999
    .desc
      display :flex
      flex-direction :row
      align-items :center
      padding-right: 0.3rem
    .desc:after
      content: '|'
      font-size: 0.3rem
      margin-left: 0.3rem
    .desc:last-child:after
      content: ''
</style>
