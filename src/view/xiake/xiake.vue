<template>
  <div class="xiakeWrapper">
    <!--搜索头-->
    <header class="header">
      <img class="logo" src="./logo@3x.png"/>
      <div class="searchWrapper">
        <i class="iconfont icon-sousuo"></i>
        <input type="text" placeholder="搜索旅游峡客发布的服务"/>
      </div>
      <router-link tag="div" to="/releaseService" class="releaseService">
        发布服务
      </router-link>
    </header>
    <loading v-show="isLoading"></loading>
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
          <!--<img class="discoverHeadImgLoading" src="/static/loading.gif"/>-->
          <img :src=item.img class="proImg"/>
          <div class="proTagWrapper">
            <img class="proTag" v-if="item.tags[0]" src="/static/zhuan@3x.png">
            <img class="proTag" v-if="item.tags[1]" src="/static/xia@3x.png">
            <img class="proTag" v-if="item.tags[2]" src="/static/zhima@3x.png">
          </div>
        </div>
        <p class="proSkill">
          {{item.job}}
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
            <li v-for="(choice,index) in choices" class="choices" :data-index="index" :data-id="choice.id"
                :class="[index==currentChoiceIndex?'active':'']">{{choice.title}}
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
  import loading from '@/components/loading'

  export default {
    data() {
      return {
        isLoading: false,
        proList: [
//          {
//            img: '/static/xiake/pro.png',
//            tags: [true, true, true], // 按顺序分别是专家、峡客、芝麻
//            job: '海报设计、平面设计、美女写手',
//            name: 'Michel Lee',
//            isCertificated: true
//          },
        ],
        serviceList: [],
        filterItems: ['城市', '类别', '级别', '排序'],
        cityList: [{id: -1, title: '全部'}],
        typeList: [{id: -1, title: '全部'}], // 暂时接行业列表进去
        sortList: [
          {id: -1, title: '全部'},
          {id: 0, title: '创建时间', name: 'inputtime'},
          {id: 1, title: '价格↑', name: 'price_min'},
          {id: 2, title: '价格↓', name: 'price_max'}
        ],
        levelList: [
          {id: -1, title: '全部'},
          {id: 0, title: '专家认证', name:'zhuanjia'},
          {id: 1, title: '峡客认证', name:'xiake'},
          {id: 2, title: '芝麻认证', name:'zima'}
        ],
        selectedChoiceIndex: [0, 0, 0, 0], // 保存各个下拉框的选择值的index
        selectedChoiceId: [-1, -1, -1, -1],// 保存各个下拉框的选择值的id
        currentChoiceIndex: 0, // 当前的选择的index
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
      },
      globalDOMAIN() {
        return this.$store.state.globalDOMAIN
      },
      token() {
        return sessionStorage.getItem('token')
      },
    },
    mounted() {
      this.getList('city')
      this.getList('industry')
      this.getExpertList()
      // 推荐的专家的图片加载
//      let proImg = document.querySelectorAll('.proImgWrapper')
//      for (let i = 0; i < proImg.length; i++) {
//        let img = new Image()
//        img.src = proImg[i].dataset.large
//        img.onload = function () {
//          img.classList.add('proImg')
//          proImg[i].appendChild(img);
//        }
//      }
      this.getServiceList()
    },
    methods: {
      getList(type) {
        let url
        switch (type) {
          case 'city':
            url = 'Api/Common/getCity'
            break
          case 'industry':
            url = 'Api/Common/getIndustry'
            break
        }
        this.$http.get(`${this.globalDOMAIN}${url}`).then(res => {
          this.$store.commit('saveBaseData', {baseData: res.body.data.lists, type: type})
          if (type == 'city') {
            this.cityList = this.cityList.concat(this.$store.state.cityList)
          } else {
            this.typeList = this.typeList.concat(this.$store.state.industryList)
          }
        })
      },// 获取城市、行业列表，并存入vuex
      getExpertList(){
        this.$http.get(`${this.globalDOMAIN}Api/Common/getRecommandXiake`).then(res=>{
//          console.log(res)
//          {
//            img: '/static/xiake/pro.png',
//              tags: [true, true, true], // 按顺序分别是专家、峡客、芝麻
//            job: '海报设计、平面设计、美女写手',
//            name: 'Michel Lee',
//            isCertificated: true
//          },
          let tempList = []
          for (let item of res.body.data.lists){
            let tempItem = {
              img: `${this.globalDOMAIN.slice(0, -11)}${item.userpic}`,
              tags:[],
              job: item.xiakeInfo.job,
              name:item.nickname,
              isCertificated:false,
            }
            if(item.expert_badge){
              tempItem.tags.push(true)
            }
            if(item.xiake_badge){
              tempItem.tags.push(true)
              tempItem.isCertificated = true
            }
            tempList.push(tempItem)
          }
          this.proList = tempList

        })
      },// 获取推荐专家列表
      selectChoice(event) {
        if (event.target.dataset.id != undefined) {
          this.selectedChoiceId[this.$store.state.taskFilterActiveIndex_xiake] = event.target.dataset.id
          this.selectedChoiceIndex[this.$store.state.taskFilterActiveIndex_xiake] = event.target.dataset.index
          this.currentChoiceIndex = event.target.dataset.index
          this.getServiceList()
        }
      },
      getServiceList() {
        let city,service_type,grade,order

        if (this.selectedChoiceId[0] == -1) {
          city = ''
        } else {
          city = this.cityList.find(function (item) {
            return item.id == this.selectedChoiceId[0]
          }, this).title
        }

        if (this.selectedChoiceId[1] == -1){
          service_type: ''
        } else {
          service_type = this.typeList.find(function (item) {
            return item.id == this.selectedChoiceId[1]
          }, this).title
        }

        if (this.selectedChoiceId[2] == -1) {
          grade = ''
        }  else {
          grade = this.levelList.find(function(item){
            return item.id == this.selectedChoiceId[2]
          },this).name
        }

        if (this.selectedChoiceId[3] == -1) {
          order = ''
        }  else {
          order = this.sortList.find(function(item){
            return item.id == this.selectedChoiceId[3]
          },this).name
        }

        this.$http.get(`${this.globalDOMAIN}Employ/Service/getList`, {
          params:{
            'city':city,
            'service_type':service_type,
            'grade':grade,
            'order':order,
          },
          emulateJSON: true,
          headers: {'token': this.token}
        }).then((res) => {
          if (res.body.status) {
            this.serviceList = this.processServiceData(res.body.data.lists)
          } else {
            this.$vux.toast.text(res.body.msg)
          }
        })
      },// 获取服务列表
      processServiceData(data) {
//        serviceList: [
//          {
//            avatar: '/static/xiake/head@2x.png',
//            serviceName: '微信开发',
//            name: '郑某某',
//            tags: [true, true, true], // 按顺序分别是专家、峡客、芝麻
//            descList: ['市场推广', '3年经验'],
//            gongli: 780, // 功力值
//            times: 6, // 交易量
//            rate: 4.6,// 好评度
//            isCertificated: true,
//            id: 1213312,// 服务id
//          },
//        ],
        let tempList = []
        if (data) {
          for (let item of data) {
            let tempItem = {
              avatar: '/static/xiake/head@2x.png',
              serviceName: item.title,
              name: item.user.nickname,
              tags: [true, true, true], // 按顺序分别是专家、峡客、芝麻
              descList: ['市场推广', '3年经验'],
              gongli: 780, // 功力值
              times: 6, // 交易量
              rate: 4.6,// 好评度
              isCertificated: true,
              id: item.id,// 服务id
            }
            tempList.push(tempItem)
          }
        }
        return tempList
      },// 处理服务列表数据
    },
    components: {
      loading,
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

  .customSticky {
    position: sticky
    top: 1.2rem
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
    .recommendedPro::-webkit-scrollbar // 隐藏webkit浏览器的滚动条
      display: none
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
        .descWrapper
        // 字太大的话会分两行
          font-size: 0.3rem
        .name
          height: px2-2-rem(28)
          line-height: px2-2-rem(28)
        .desc
          height: px2-2-rem(28)
          line-height: px2-2-rem(28)
          padding-right: px2-2-rem(10)
          margin-left: px2-2-rem(10)
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
