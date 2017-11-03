<template>
  <div class="findProjectWrapper">
    <v-header title="项目推荐"></v-header>
    <!--筛选-->
    <sticky>
      <div class="projectFilterWrapper" @click="onFilterBarClick">
        <div class="filterItem" data-filter-item-id='0'>区域<span :class="[currentIndex===0?'active':'','arrow']"></span>
        </div>
        <transition name="fade">
          <ul class="filterPanel" v-show="currentIndex === 0" @click="onChoiceClick">
            <li v-for="(item,index) in cityList" :class="[currentSelectedChoice===index?'active':'']"
                :data-index="index" :data-id="item.id">{{item.title}}
            </li>
          </ul>
        </transition>
        <div class="filterItem" data-filter-item-id='1'>类型<span :class="[currentIndex===1?'active':'','arrow']"></span>
        </div>
        <transition name="fade">
          <ul class="filterPanel" v-show="currentIndex === 1" @click="onChoiceClick">
            <li v-for="(item,index) in typeList" :class="[currentSelectedChoice===index?'active':'']"
                :data-index="index" :data-id="item.id">{{item.title}}
            </li>
          </ul>
        </transition>
      </div>
    </sticky>
    <!--内容块-->
    <div class="projectBlock" v-for="(item,index) in projectList">
      <!--头图-->
      <div class="headImg" :data-large="item.imgUrl">
        <img src="/static/loading.gif"/>
      </div>
      <div class="contentBlock">
        <p class="title">{{item.title}}</p>
        <p class="desc">{{item.desc}}</p>
        <!--价格与项目类型-->
        <div class="miscellaneous">
          <div class="price">{{item.price}}</div>
          <div class="type">{{item.type}}</div>
        </div>
      </div>
      <div class="status">{{item.status}}</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import header from "../../components/v-header/v-header.vue"
  import {Sticky} from 'vux';

  export default {
    data() {
      return {
        cityList: [{id: -1, title: '全部'}],
        typeList: [{id: -1, title: '全部'}], // 暂时接行业列表进去
        choiceSelected: [0, 0],// 选择的过滤项
        currentSelectedChoice: 0,// 当前应该高亮显示的过滤项
        currentIndex: -1, // 当前选择的过滤类型
        projectList: [
          {
            title: '案例标题-北京-商务合作',
            desc: '简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介',
            price: '面议',
            status: '已完成',
            type: '商务合作',
            location: '北京',
            imgUrl: '/static/discovery/picture@3x.png'
          },
          {
            title: '案例标题-上海-移动开发',
            desc: '简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介',
            price: '面议',
            status: '已完成',
            location: '上海',
            type: '移动开发',
            imgUrl: '/static/discovery/picture@3x.png'
          },
          {
            title: '案例标题-北京-移动开发',
            desc: '简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介',
            price: '面议',
            status: '已完成',
            location: '北京',
            type: '移动开发',
            imgUrl: '/static/discovery/picture@3x.png'
          },
          {
            title: '案例标题-上海-商务合作',
            desc: '简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介',
            price: '面议',
            status: '已完成',
            location: '上海',
            type: '商务合作',
            imgUrl: '/static/discovery/picture@3x.png'
          },
        ],// 项目列表
      }
    },
    computed:{
      globalDOMAIN(){
        return this.$store.state.globalDOMAIN
      },
      token(){
        return sessionStorage.getItem('token')
      }
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
      onFilterBarClick(e) { // 点击筛选栏
        let id = e.target.dataset.filterItemId
        switch (id) {
          case '0' :
            if (this.currentIndex === 0) {
              this.currentIndex = -1
            } else {
              this.currentIndex = 0
              this.currentSelectedChoice = this.choiceSelected[0]
            }
            break
          case '1':
            if (this.currentIndex === 1) {
              this.currentIndex = -1
            } else {
              this.currentIndex = 1
              this.currentSelectedChoice = this.choiceSelected[1]
            }
            break
          default:
            return false
        }
      },
      onChoiceClick(e) { // 点击下拉的筛选项列表
        let index = e.target.dataset.index
        if (index != undefined) {
          index = Number(index)
          this.currentSelectedChoice = index
          if (this.currentIndex === 0) {
            this.choiceSelected[0] = index
          } else if (this.currentIndex === 1) {
            this.choiceSelected[1] = index
          } else {
            return false
          }
        }
      },
    },
    mounted(){
      // 图片加载过程优化，先显示一个loading的gif，图片加载完再显示实际图片
      // 因此图片这部分不能用scoped，另外给他一个<style>
      let headImgContainer = document.querySelectorAll('.headImg')
      headImgContainer.forEach((item,index) => {
        let largeImg = new Image()
        largeImg.src = item.dataset.large
        largeImg.onload = () => {
          largeImg.classList.add('largeImg')
          item.appendChild(largeImg)
        }
      })

      this.getList('city')
      this.getList('industry')
    },
    components: {
      Sticky,
      'v-header': header
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/style/fun.styl"
  .findProjectWrapper
    display: flex
    flex-direction: column
    align-items: center
    min-height: 100vh
    font-size: px2-2-rem(32)
    padding-bottom :px2-2-rem(30)
    color: #353535
    background-color: #f8f8f8
    .projectFilterWrapper
      position: relative
      display: flex
      flex-direction: row
      align-items: center
      height: px2-2-rem(100)
      background-color: #ffffff
      .filterItem
        flex-grow: 1
        text-align: center
        .arrow
          display: inline-block
          vertical-align: middle
          background-image: url("../../assets/arrow.png")
          background-size: 0.5405rem 1.081rem
          width: 0.5405rem
          height: 0.5405rem
          margin-left: 0.2703rem
          transition: background 0.1s
          &.active
            background-position-y: 0.5405rem
      .filterPanel
        position: absolute
        top: px2-2-rem(100)
        display: flex
        flex-wrap: wrap
        align-content: center
        background-color: #fff
        padding: 0.32rem 0 0.32rem 0.32rem
        z-index: 100
        li
          line-height: 1.006rem
          height: 1.066rem
          width: 2.827rem
          text-align: center
          color: #b7b7b7
          border: 1px solid #e5e5e5
          border-radius 5px
          margin-right: 0.32rem
          margin-top: 0.32rem
          &.active
            color: #00a0e9
            border: 1px solid #00a0e9
      .fade-enter-active,.fade-leave-active
        top:  px2-2-rem(100)
        opacity: 1
        transition: .2s
      .fade-enter, .fade-leave-to
        opacity: 0
        top: 0rem
    .projectBlock
      position: relative
      display: flex
      flex-direction: column
      align-items: center
      width: px2-2-rem(710)
      margin-bottom: px2-2-rem(14)
      background-color: #ffffff
      border-radius: px2-2-rem(8)
      .contentBlock
        padding: px2-2-rem(10) px2-2-rem(30)
        .title
          line-height: px2-2-rem(60)
          color: #353535
        .desc
          font-size: px2-2-rem(28)
          color: #b3b3b3
        .miscellaneous
          display: flex
          justify-content: space-between
          width: 100%
          font-size: px2-2-rem(28)
          margin-top: px2-2-rem(20)
          color: #999999
          .price
            color: #ee7b6e
      .status
        position: absolute
        top: px2-2-rem(20)
        left: px2-2-rem(20)
        height: px2-2-rem(44)
        width: px2-2-rem(112)
        line-height: px2-2-rem(44)
        text-align: center
        font-size: px2-2-rem(26)
        color: #f8f8f8
        background-color: rgba(204, 204, 204, 0.3)
        border-radius: px2-2-rem(8)
</style>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/style/fun.styl"
  .findProjectWrapper
    .headImg
      position :relative
      display :flex
      align-items :center
      justify-content :center
      width: px2-2-rem(710)
      height: px2-2-rem(404)
      .largeImg
        position :absolute
        top: 0
        left :0
        width: px2-2-rem(710)
        height: px2-2-rem(404)
</style>
