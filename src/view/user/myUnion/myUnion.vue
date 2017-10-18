<template>
  <div class="myUnionWrapper">
    <v-header title="我的联盟"></v-header>
    <div class="notice">须知</div>
    <img class="banner" src="/static/banner_@3x.png"/>
    <router-link :to="{name:'unionDetail',params:{id:item.id}}" class="unionItemWrapper"
                 v-for="(item,index) in unionListSorted">
      <div class="itemInfoWrapper">
        <div class="info">
          <img class="avatar" :src="item.avatar"/>
          <div class="detail">
            <p class="name">{{item.name}}</p>
            <p class="peopleNum">成员 {{item.peopleNum}} ></p>
          </div>
        </div>
        <div class="hasAdd" v-if="item.isIn">已加入</div>
        <!--不知道为什么这里使用prevent不用stop，反正就可以了-->
        <div @click.prevent="add(index)" class="addBtn" v-else>+联盟</div>
      </div>
      <div class="desc">
        {{item.desc}}
      </div>
    </router-link>
  </div>
</template>

<script type="text/ecmascript-6">
  import header from '@/components/v-header/v-header'

  export default {
    data() {
      return {
        unionListUnsorted: [
          {
            name: '移动办公1',// 联盟名称
            peopleNum: 50, // 成员人数
            desc: '选择自己喜欢的空间，OVE创客里实现和小伙伴们的沟通和协作OVE创客里实现和小伙伴的沟通',// 描述
            isIn: true,// 是否已经加入
            avatar: '/static/xiake/head@2x.png',
            id: 1,
          },
          {
            name: '移动办公2',// 联盟名称
            peopleNum: 50, // 成员人数
            desc: '选择自己喜欢的空间，OVE创客里实现和小伙伴们的沟通和协作OVE创客里实现和小伙伴的沟通',// 描述
            isIn: false,// 是否已经加入
            avatar: '/static/xiake/head@2x.png',
            id: 2,
          },
          {
            name: '移动办公3',// 联盟名称
            peopleNum: 50, // 成员人数
            desc: '选择自己喜欢的空间，OVE创客里实现和小伙伴们的沟通和协作OVE创客里实现和小伙伴的沟通',// 描述
            isIn: false,// 是否已经加入
            avatar: '/static/xiake/head@2x.png',
            id: 3,
          },
          {
            name: '移动办公4',// 联盟名称
            peopleNum: 50, // 成员人数
            desc: '选择自己喜欢的空间，OVE创客里实现和小伙伴们的沟通和协作OVE创客里实现和小伙伴的沟通',// 描述
            isIn: true,// 是否已经加入
            avatar: '/static/xiake/head@2x.png',
            id: 4,
          },
        ], // 拿回来的原始数据，未排序
        unionListSorted: [], // 存放已排序的数组
      }
    },
    created() {
      this.sortUnionList(this.unionListUnsorted)
    },
    methods: {
      sortUnionList(toBeSort) {
        toBeSort.forEach((item) => {
          if (item.isIn) {
            this.unionListSorted.push(item)
          } else {
            this.unionListSorted.unshift(item)
          }
        })
      },
      add(index) {
        // 点击加入
        // 该项的按钮会变成【已加入】同时放到最下面
        this.unionListSorted[index].isIn = true
        let item = this.unionListSorted.splice(index,1)
        this.unionListSorted.push(item[0])
      }
    },
    components: {
      'v-header': header
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../../common/style/fun.styl"
  .myUnionWrapper
    display: flex
    flex-direction: column
    min-height: 100%
    font-size: px2-2-rem(32)
    background-color: #f8f8f8
    .banner
      height: px2-2-rem(250)
      margin-bottom: px2-2-rem(30)
    .unionItemWrapper
      display: flex
      flex-direction: column
      background-color: #ffffff
      padding-left: px2-2-rem(30)
      margin-bottom: px2-2-rem(20)
      border-bottom: 1px solid #e5e5e5
    .itemInfoWrapper
      display: flex
      align-items: center
      justify-content: space-between
      height: px2-2-rem(190)
      padding-right: px2-2-rem(44)
      border-bottom: 1px solid #e5e5e5
    .info
      display: flex
      align-items: center
    .avatar
      width: px2-2-rem(128)
      height: px2-2-rem(128)
      margin-right: px2-2-rem(32)
    .detail
      display: flex
      flex-direction: column
      justify-content: space-between
      height: px2-2-rem(110)
      .peopleNum
        font-size: px2-2-rem(26)
        color: #999999
    .hasAdd, .addBtn
      width: px2-2-rem(130)
      height: px2-2-rem(50)
      line-height: px2-2-rem(50)
      text-align: center
      font-size: px2-2-rem(26)
      border-radius: px2-2-rem(8)
    .hasAdd
      color: #999999
      border: 1px solid #999999
    .addBtn
      color: #00a0e9
      border: 1px solid #00a0e9
    .desc
      color: #999999
      font-size: px2-2-rem(26)
      line-height: px2-2-rem(50)
      padding: px2-2-rem(20) 0
    .notice
      position: absolute
      top: px2-2-rem(22)
      right: px2-2-rem(30)
      color: #00a0e9
</style>
