<template>
  <div class="findExpertWrapper">
    <v-header title="专家智库"></v-header>
    <!--tab bar-->
    <ul class="tabBarWrapper" @click="onTabBarClick">
      <li class="tabItem" data-index="0">
        <div :class="[currentActiveIndex==='0'?'active':'','tabItemText']" data-index="0" >合作单位</div>
      </li>
      <li class="tabItem" data-index="1">
        <div :class="[currentActiveIndex==='1'?'active':'','tabItemText']" data-index="1">合作专家</div>
      </li>
    </ul>
    <!--内容块: 合作单位-->
    <div @click="goToDetail(item)" class="expertBlock" v-for="(item,index) in companyList" v-show="currentActiveIndex==='0'">
      <!--头图-->
      <!--<div class="headImg" :data-large="item.imgUrl">-->
        <!--<img src="/static/loading.gif"/>-->
      <!--</div>-->
      <img class="headImg" :src="item.imgUrl"/>
      <div class="contentBlock">
        <p class="name">{{item.name}}</p>
        <p class="desc">{{item.desc}}</p>
      </div>
      <div class="group">{{item.group}}</div>
    </div>
    <!--内容块: 合作专家-->
    <div @click="goToDetail(item)" class="expertBlock" v-for="(item,index) in expertList" v-show="currentActiveIndex==='1'">
      <!--头图-->
      <!--<div class="headImg" :data-large="item.imgUrl">-->
        <!--<img src="/static/loading.gif"/>-->
      <!--</div>-->
      <img class="headImg" :src="item.imgUrl"/>
      <div class="contentBlock">
        <p class="name">{{item.name}}</p>
        <p class="desc">{{item.desc}}</p>
      </div>
      <div class="group">{{item.group}}</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import header from "../../components/v-header/v-header.vue"

  export default {
    data(){
      return {
        currentActiveIndex : '0',// 当前点击的tab栏项的索引
        companyList:[ // 合作单位列表
//          {
//            name:'加载中',
//            desc:'加载中',
//            imgUrl:'/static/discovery/picture@3x.png',
//            group:'加载中'
//          },
        ],
        expertList:[ // 合作专家列表
//          {
//            name:'加载中',
//            desc:'加载中',
//            imgUrl:'/static/discovery/picture@3x.png',
//            group:'加载中'
//          },
        ]
      }
    },
    computed:{
      globalDOMAIN(){
        return this.$store.state.globalDOMAIN
      }
    },
    methods:{
      getExpertList(){
        this.$http.get(`${this.globalDOMAIN}Api/Common/getExpert`).then(res=>{
          let tempList = []
          for(let item of res.body.data.lists){
            let tempItem = {
              name:item.title,
              desc:item.desc,
              imgUrl:`${this.globalDOMAIN.slice(0, -11)}${item.img}`,
              group:'旅游协会', // 有？
              content:item.content,
              id:item.id,
            }
            tempList.push(tempItem)
          }
          this.expertList = tempList
        })
      },

      getUnitList(){
        this.$http.get(`${this.globalDOMAIN}Api/Common/getUnit`).then(res=>{
          let tempList = []
          for(let item of res.body.data.lists){
            let tempItem = {
              name:item.title,
              desc:item.desc,
              imgUrl:`${this.globalDOMAIN.slice(0, -11)}${item.img}`,
              group:'旅游协会', // 有？
              content:item.content,
              id:item.id,
            }
            tempList.push(tempItem)
          }
          this.companyList = tempList
        })
      },

      onTabBarClick(e){
        let index = e.target.dataset.index
        if(index){
          this.currentActiveIndex = index
        }
      },
      goToDetail(item){
        this.$store.commit('changeHtmlDetail',{
          title:item.name,
          content:item.content
        })
        this.$router.push({path:'/htmlDetail'})
      }
    },
    mounted(){
      this.getUnitList()
      this.getExpertList()
      // 优化图片加载过程
//      let headImgContainer = document.querySelectorAll('.headImg')
//      headImgContainer.forEach((item,index)=>{
//        let largeImg = new Image()
//        largeImg.src = item.dataset.large
//        largeImg.onload = () => {
//          largeImg.classList.add('largeImg')
//          item.appendChild(largeImg)
//        }
//      })
    },
    components: {
      'v-header': header
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/style/fun.styl"
  .findExpertWrapper
    display: flex
    flex-direction: column
    align-items: center
    min-height: 100vh
    font-size: px2-2-rem(32)
    color:#353535
    background-color: #f8f8f8
    padding-bottom: px2-2-rem(30)
    .tabBarWrapper
      display: flex
      align-items: center
      width: 100%
      height: px2-2-rem(100)
      background-color: #ffffff
      margin-bottom :px2-2-rem(24)
      .tabItem
        display :flex
        align-items :center
        justify-content :center
        flex: 1
        height: 100%
        .tabItemText
          box-sizing : border-box
          line-height :px2-2-rem(100)
          height :px2-2-rem(100)
          &.active
            color:#00a0e9
            border-bottom :px2-2-rem(6) solid #00a0e9
    .expertBlock
      position: relative
      display: flex
      flex-direction: column
      align-items: center
      width: px2-2-rem(710)
      margin-bottom: px2-2-rem(14)
      background-color: #ffffff
      border-radius: px2-2-rem(8)
      .contentBlock
        box-sizing :border-box
        width :100%
        padding: px2-2-rem(10) px2-2-rem(30)
        .name
          line-height: px2-2-rem(60)
          color: #353535
        .desc
          font-size: px2-2-rem(28)
          color: #b3b3b3
      .group
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
  .findExpertWrapper
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
