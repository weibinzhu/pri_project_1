<template>
  <div class="xiakeWrapper">
    <!--搜索头-->
    <header class="header">
      <img class="logo" src="./logo@3x.png"/>
      <div class="searchWrapper">
        <i class="iconfont icon-sousuo"></i>
        <input type="text" placeholder="搜索旅游峡客发布的服务"/>
      </div>
      <div class="releaseService">
        发布服务
      </div>
    </header>
    <!--分割线-->
    <div class="headDividerWrapper">
      <divider>
        <div class="headDividerContent"><img src="/static/zhuan@3x.png"/>推荐专家</div>
      </divider>
    </div>
    <!--水平滑动的专家推荐-->
    <div class="recommendedPro">
      <!--<div class="proItemWrapper">-->
      <div class="proItem" v-for="(item,index) in proList">
        <div class="proImgWrapper" :data-large="item.img">
          <img class="discoverHeadImgLoading" src="/static/loading.gif"/>
          <!--<img :src=item.img class="proImg"/>-->
          <div class="proTagWrapper">
            <img class="proTag" v-if="item.tags[0]" src="/static/zhuan@3x.png">
            <img class="proTag" v-if="item.tags[1]" src="/static/xia@3x.png">
            <img class="proTag" v-if="item.tags[2]" src="/static/zhima@3x.png">
          </div>
        </div>
        <p class="proSkill">
          {{item.skill}}
        </p>
        <div class="proNameWrapper">
          <div class="proName">{{item.name}}</div>
          <tag v-if="item.isCertificated"></tag>
          <!--<div class="proCertificated" v-if="item.isCertificated">已认证</div>-->
        </div>
      </div>
      <!--</div>-->
    </div>
    <!--普通分割线-->
    <div class="dividerWrapper">
      <divider>服务市场</divider>
    </div>
    <!--筛选组件-->
    <div class="customSticky">
      <div class="filterWrapper">
        <v-filter v-for="(item,index) in filterItems" :item="item" :index="index" :key="index" :page=1></v-filter>
        <transition name="fade2">
          <ul class="filterPanel" v-if=taskFilterPanelShow_xiake @click="selectChoice">
            <li v-for="(choice,index) in choices" class="choices" :id="index"
                :class="[index==currentChoiceIndex?'active':'']">{{choice}}
            </li>
            <p v-if="showNotice">更多城市将逐步开放，敬请期待</p>
          </ul>
        </transition>
      </div>
    </div>
    <!--服务列表-->
    <router-link :to="{ name: 'serviceDetail', params: { id: item.id }}" tag="div"
                 class="serviceItem" v-for="(item,index) in serviceList" :key="index">
      <div class="avatarWrapper">
        <img class="avatar" :src="item.avatar"/>
        <div class="avatarTagWrapper">
          <img class="avatarTag" v-if="item.tags[0]" src="/static/zhuan@3x.png">
          <img class="avatarTag" v-if="item.tags[1]" src="/static/xia@3x.png">
          <img class="avatarTag" v-if="item.tags[2]" src="/static/zhima@3x.png">
        </div>
      </div>
      <div class="serviceInfo">
        <p class="serviceName">{{item.serviceName}}</p>
        <div class="serviceDetail">
          <div class="nameWrapper">
            <div class="name">{{item.name}}</div>
            <tag v-if="item.isCertificated"></tag>
            <!--<div class="certificated">已认证</div>-->
          </div>
          <div class="descWrapper">
            <div class="desc" v-for="(desc,index) in item.descList">{{desc}}</div>
          </div>
        </div>
        <div class="serviceData">
          <div class="dataItem">功力值：<span>{{item.gongli}}</span></div>
          <div class="dataItem">交易量：<span>{{item.times}}</span></div>
          <div class="dataItem">好评度：<span>{{item.rate}}</span></div>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script type="text/ecmascript-6">
  import Divider from 'vux/src/components/divider/index.vue'
  import Filter from '@/components/filter/filter.vue';
  import Tag from '@/components/tag'
  export default {
    data() {
      return {
        proList: [
          {
            img: '/static/xiake/pro.png',
            tags: [true, true, true], // 按顺序分别是专家、峡客、芝麻
            skill: '海报设计、平面设计、美女写手',
            name: 'Michel Lee',
            isCertificated: true
          },
          {
            img: '/static/xiake/pro.png',
            tags: [true, false, true],
            skill: '海报设计、平面设计、美女写手',
            name: 'Michel Lee',
            isCertificated: false
          },
          {
            img: '/static/xiake/pro.png',
            tags: [true, false, false],
            skill: '海报设计、平面设计、美女写手',
            name: 'Michel Lee',
            isCertificated: true
          },
          {
            img: '/static/xiake/pro.png',
            tags: [true, true, false],
            skill: '海报设计、平面设计、美女写手',
            name: 'Michel Lee',
            isCertificated: true
          },
        ],
        serviceList: [
          {
            avatar: '/static/xiake/head@2x.png',
            serviceName: '微信开发',
            name: '郑某某',
            tags: [true, true, true], // 按顺序分别是专家、峡客、芝麻
            descList: ['市场推广', '3年经验'],
            gongli: 780, // 功力值
            times: 6, // 交易量
            rate: 4.6,// 好评度
            isCertificated: true,
            id: 1213312,// 服务id
          },
          {
            avatar: '/static/xiake/head@2x.png',
            serviceName: '微信开发',
            name: '郑某某',
            tags: [true, false, true], // 按顺序分别是专家、峡客、芝麻
            descList: ['市场推广', '3年经验'],
            gongli: 780, // 功力值
            times: 6, // 交易量
            rate: 4.6,// 好评度
            isCertificated: true,
            id: 12,// 服务id
          },
          {
            avatar: '/static/xiake/head@2x.png',
            serviceName: '微信开发',
            name: '郑某某',
            tags: [true, false, false], // 按顺序分别是专家、峡客、芝麻
            descList: ['市场推广', '3年经验'],
            gongli: 780, // 功力值
            times: 6, // 交易量
            rate: 4.6,// 好评度
            isCertificated: true,
            id: 1212353312,// 服务id
          },
          {
            avatar: '/static/xiake/head@2x.png',
            serviceName: '微信开发',
            name: '郑某某',
            tags: [true, true, false], // 按顺序分别是专家、峡客、芝麻
            descList: ['市场推广', '3年经验'],
            gongli: 780, // 功力值
            times: 6, // 交易量
            rate: 4.6,// 好评度
            isCertificated: false,
            id: 12597812,// 服务id
          },
          {
            avatar: '/static/xiake/head@2x.png',
            serviceName: '微信开发',
            name: '郑某某',
            tags: [true, false, false], // 按顺序分别是专家、峡客、芝麻
            descList: ['市场推广', '3年经验'],
            gongli: 780, // 功力值
            times: 6, // 交易量
            rate: 4.6,// 好评度
            isCertificated: true,
            id: 78912,// 服务id
          },
        ],
        filterItems: ['城市', '类别', '级别', '排序'],
        cityList: ['全部', '北京', '上海', '广州', '深圳'],
        typeList: ['全部', '设计', '技术', '运营', '市场', '产品'],
        levelList: ['全部', '专家认证', '创客认证', '芝麻认证'],
        sortList: ['全部', '最新', '最热', '价格↓', '价格↑'],
        selectedChoiceIndex: [0, 0, 0, 0], // 保存各个下拉框的选择值
        currentChoiceIndex: 0, // 当前的选择
      }
    },
    computed: {
      choices() {
        var activeIndex = this.$store.state.taskFilterActiveIndex_xiake
        switch (activeIndex) {
          case 0:
            this.currentChoiceIndex = this.selectedChoiceIndex[0] // 将当前选择修改为当前下拉框的值
            return this.cityList
            break
          case 1:
            this.currentChoiceIndex = this.selectedChoiceIndex[1]
            return this.typeList
            break
          case 2:
            this.currentChoiceIndex = this.selectedChoiceIndex[2]
            return this.levelList
            break
          case 3:
            this.currentChoiceIndex = this.selectedChoiceIndex[3]
            return this.sortList
            break
          default:
            return []
        }
      },
      taskFilterPanelShow_xiake() {
        return this.$store.state.taskFilterPanelShow_xiake
      },
      showNotice() {
        return this.$store.state.taskFilterActiveIndex_xiake == 0 ? true : false
      }
    },
    mounted() {
      // 推荐的专家的图片加载
      let proImg = document.querySelectorAll('.proImgWrapper')
      for (let i = 0; i < proImg.length; i++) {
        let img = new Image()
        img.src = proImg[i].dataset.large
        img.onload = function () {
          img.classList.add('proImg')
          proImg[i].appendChild(img);
        }
      }
    },
    methods: {
      selectChoice(event) {
        if (event.target.id != '') {
          this.selectedChoiceIndex[this.$store.state.taskFilterActiveIndex_xiake] = event.target.id
          this.currentChoiceIndex = event.target.id
          //if (this.$store.state.taskFilterActiveIndex == 2) { // 如果当前在【排序】下拉框下
          //this.sortTaskList(this.selectedChoiceIndex[2]) // 把选择的排序类型传递到排序函数中
          //}
        }
      },
    },
    components: {
      Tag,
      Divider,
      'v-filter': Filter
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/style/fun.styl"

  // 跟任务首页用的一套样式，直接复制过来
  .filterWrapper {
    display: flex;
    flex-direction: row;
    position: relative;
    height: px2-2-rem(80);
    width: 100%;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    color: #666;
    border-bottom: 1px solid #e5e5e5
  }

  .filterPanel {
    position: absolute;
    top: 1.11rem;
    left: 0;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-content: center;
    background-color: #fff;
    padding: 0.32rem 0 0.32rem 0.32rem;
    z-index: 100;
  }

  .filterPanel p {
    width: 100%
    color: #999
    text-align: center
    font-size: px2-2-rem(32)
    margin-top: 0.4rem
  }

  .choices {
    line-height: 1.006rem;
    height: 1.066rem;
    width: 2.827rem;
    text-align: center;
    color: #b7b7b7;
    border: 1px solid #e5e5e5;
    border-radius 5px;
    margin-right: 0.32rem;
    margin-top: 0.32rem;
  }

  .filterPanel .active {
    color: #00a0e9;
    border: 1px solid #00a0e9;
  }
  // 动画设置
  .fade2-enter-active, .fade2-leave-active {
    top: 1.11rem;
    opacity: 1;
    transition: all .2s;
  }

  .fade2-enter, .fade2-leave-to /* .fade-leave-active in below version 2.1.8 */
  {
    opacity: 0;
    top: 0;
  }


  .xiakeWrapper
    min-height: 100vh
    background-color: #f8f8f8
    padding-bottom: 1.9rem /*防止底部内容被tap bar挡住*/
    font-size: px2-2-rem(32)
    .header
      position: sticky // css3新属性
      top: 0
      width: 100%
      height: 1.2rem
      display: flex
      flex-direction: row
      align-items: center
      background-color: #fff
      font-size: 0.426666rem
      z-index: 100
      .logo
        width: px2-2-rem(70)
        height: px2-2-rem(32)
        margin: 0 px2-2-rem(32)
      .searchWrapper
        display: flex
        flex-grow: 1
        flex-direction: row
        align-items: center
        width: 6.63rem
        height: 0.73rem
        border-radius: 5px
        background-color: #f1f1f3
        color: #999
        padding-left: 0.4rem
      .searchWrapper input
        background-color: #f1f1f3
        height: 0.73rem
      .searchWrapper i
        margin-right: 0.213rem
      .releaseService
        width: px2-2-rem(208)
        height: px2-2-rem(32)
        color: #00a0e9
        font-size: px2-2-rem(30)
        text-align: center
        line-height: px2-2-rem(32)
    .headDividerWrapper
      display: flex
      align-items: center
      height: px2-2-rem(124)
      background-color: #ffffff
      padding: 0 px2-2-rem(114)
      .headDividerContent
        display: flex
        align-items: center
        img
          width: px2-2-rem(40)
          height: px2-2-rem(40)
          margin-right: px2-2-rem(18)
    .recommendedPro
      display: flex // 使用flex布局可以减少一个container，还可以做到宽度自适应
      flex-direction: row
      height: px2-2-rem(502)
      overflow-x: auto
      overflow-y: hidden
      padding: 0 px2-2-rem(14)
      -webkit-overflow-scrolling: touch // 解决ios safari 下，使用overflow:scroll 后滚动不顺畅的问题
      background-color: #ffffff
      .proItem
        margin-right: px2-2-rem(16)

        .proSkill
          margin-top: px2-2-rem(20)
          margin-bottom: px2-2-rem(20)
          font-size: px2-2-rem(30)
        .proNameWrapper
          display: flex
          align-items: center
          font-size: px2-2-rem(26)
    .dividerWrapper
      display: flex
      align-items: center
      height: px2-2-rem(80)
      padding: 0 px2-2-rem(30)
    .serviceItem
      display: flex
      align-items: center
      height: px2-2-rem(198)
      background-color: #ffffff
      margin-bottom: px2-2-rem(20)
      .avatarWrapper
      //position: relative
        margin: 0 px2-2-rem(30)
        width: px2-2-rem(126)
        height: px2-2-rem(126)
        .avatar
          width: px2-2-rem(126)
          height: px2-2-rem(126)
          border-radius: 50%
        .avatarTagWrapper
        //position :absolute
        //bottom: px2-2-rem(-8)
        //right: px2-2-rem(10)
          margin-top: px2-2-rem(-30)
          display: flex
          flex-direction: row
          justify-content: center
          height: px2-2-rem(30)
          .avatarTag
            margin-right: px2-2-rem(4)
            width: px2-2-rem(30)
            height: px2-2-rem(30)
      .serviceInfo
        display: flex
        flex: 1
        flex-direction: column
        justify-content: space-around
        color: #999999
        padding-right: px2-2-rem(60)
        .serviceName
          font-size: px2-2-rem(34)
          color: #353535
        .serviceDetail, .serviceData
          font-size: px2-2-rem(28)
          display: flex
          flex-direction: row
          flex-wrap: wrap
          justify-content: space-between
          margin-top: px2-2-rem(8)
        .nameWrapper, .descWrapper
          display: flex
          flex-direction: row
          flex-wrap: wrap
          align-items: center
        .name
          height: px2-2-rem(28)
          line-height: px2-2-rem(28)
        .desc
          height: px2-2-rem(28)
          line-height: px2-2-rem(28)
          padding-right: px2-2-rem(20)
          margin-left: px2-2-rem(20)
          border-right: 1px solid #999999
        .desc:last-child
          border: none
          padding: 0
        .dataItem
          span
            color: #e4790f

</style>
<style lang="stylus" rel="stylesheet/stylus">
  /*由于我们操作dom添加的html的class跟实际经过scoped的class不一样，为了解决这个问题，专门为这部分添加一个不带scoped的style*/
  @import "../../common/style/fun.styl"
  .xiakeWrapper
    .proImgWrapper
      position: relative
      display: flex
      align-items: center
      justify-content: center
      height: px2-2-rem(298)
      width: px2-2-rem(298)
      .proImg
        position: absolute
        top: 0
        left: 0
        height: px2-2-rem(298)
        width: px2-2-rem(298)
      .proTagWrapper
        position: absolute
        display: flex // 使用flex布局可以减少一个container，还可以做到宽度自适应
        flex-direction: row
        bottom: px2-2-rem(14)
        right: px2-2-rem(10)
        height: px2-2-rem(40)
        z-index: 10
        .proTag
          margin-right: px2-2-rem(10)
          width: px2-2-rem(40)
          height: px2-2-rem(40)
</style>
