<template>
  <div class="caseWrapper">
    <!--使用v-header组件时需要传递参数，以决定显示标题、是否需要分享、收藏按钮-->
    <v-header :starShow="false" :shareShow="false" :title="'精彩案例'"></v-header>
    <div v-for="(item, index) in caseList" class="caseItem" @click="selectCase(item)">
      <img :src="item.img"/>
      <div class="caseContent">
        <p class="caseTitle">{{item.title}}</p>
        <p class="caseDescription">{{item.description}}</p>
      </div>
    </div>
    <case-detail :selectedCase="selectedCase" ref="caseDetail"></case-detail>
  </div>
</template>

<script type="text/ecmascript-6">
  import header from 'components/v-header/v-header.vue'
  import CaseDetail from '@/view/task/cases/caseDetail/caseDetail'
  export default {
    data() {
      return {
        caseList: [
          {
            title: '清新梦幻蓝色地中海厕所',
            description: '80m^2/三居/简约/全包80m^2/三居简约/全包80m^2/三居简约',
            term:'36天',
            img: '/static/image1.png',
            content: '占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位',
            contentImg: '/static/caseDetail.png'
          },
          {
            title: '清新梦幻蓝中海厕所',
            description: '80m^2/三居/简约/全包80m^2',
            term:'60天',
            img: '/static/image1.png',
            content: '占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位',
            contentImg: '/static/caseDetail.png'
          },
          {
            title: '清新梦海厕所',
            description: '80m^2/三居/简约/全包80m^2/三居简约/全包80m^2/三居简约',
            term:'6天',
            img: '/static/image1.png',
            content: '占位占位占位占位占位',
//            contentImg: '/static/caseDetail.png'
          },
          {
            title: '清新梦幻蓝中海厕所',
            description: '80m^2/三居/简约/全包80m^2',
            term:'60天',
            img: '/static/image1.png',
            content: '占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位',
            contentImg: '/static/caseDetail.png'
          },
          {
            title: '清新梦幻蓝中海厕所',
            description: '80m^2/三居/简约/全包80m^2',
            term:'60天',
            img: '/static/image1.png',
            content: '占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位',
            contentImg: '/static/caseDetail.png'
          },
          {
            title: '清新梦幻蓝中海厕所',
            description: '80m^2/三居/简约/全包80m^2',
            term:'60天',
            img: '/static/image1.png',
            content: '占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位',
            contentImg: '/static/caseDetail.png'
          },
          {
            title: '清新梦幻蓝中海厕所',
            description: '80m^2/三居/简约/全包80m^2',
            term:'60天',
            img: '/static/image1.png',
            content: '占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位',
            contentImg: '/static/caseDetail.png'
          },
          {
            title: '清新梦幻蓝中海厕所',
            description: '80m^2/三居/简约/全包80m^2',
            term:'60天',
            img: '/static/image1.png',
            content: '占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位',
            contentImg: '/static/caseDetail.png'
          },
        ],
        selectedCase:{}
      }
    },
    components: {
      CaseDetail,
      'v-header': header,
    },
    methods:{
      selectCase(item){
        this.selectedCase = item
        this.$refs.caseDetail.show()
      },
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .caseWrapper
    position: absolute
    z-index: 10
    width: 100%
    min-height: 100vh
    background-color: #f8f8f8
    .caseItem
      display: flex
      flex-direction: row
      align-items: center
      justify-content: space-around
      height: 2.88rem
      width: 100%
      background-color: #fff
      margin-bottom: 0.2135rem
      img
        width: 2.1867rem
        height: 2.1867rem
    .caseContent
      width: 6rem
      height: 2.1867rem
      display: flex
      justify-content: space-between
      flex-direction: column
      .caseTitle
        font-size: 0.426rem
        color: #353535
      .caseDescription
        font-size: 0.3467rem
        color: #b0b0b0
</style>
