<template>
  <div class="myUnionWrapper">
    <v-header title="我的联盟"></v-header>
    <loading v-show="isLoading"></loading>
    <div class="notice">须知</div>
    <img class="banner" :src="banner"/>
    <div @click="toDetail(item)" :key="index" class="unionItemWrapper"
                 v-for="(item,index) in unionList">
      <div class="itemInfoWrapper">
        <div class="info">
          <img class="avatar" :src="item.avatar"/>
          <div class="detail">
            <p class="name">{{item.name}}</p>
            <p class="peopleNum">成员 {{item.peopleNum}} ></p>
          </div>
        </div>
        <div @click.stop="hasAddClick" class="hasAdd" v-if="item.isIn == 1">已加入</div>
        <!--不知道为什么这里使用prevent不用stop，反正就可以了-->
        <div @click.prevent="add(item.id)" class="addBtn" v-else>+联盟</div>
      </div>
      <div class="desc">
        {{item.desc}}
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import header from '@/components/v-header/v-header'
  import loading from '@/components/loading'
  export default {
    name:'myUnion',
    data() {
      return {
        isLoading:false,
        banner:'',// 广告头图
        unionList: [
          {
            name: '移动办公1',// 联盟名称
            peopleNum: 50, // 成员人数
            desc: '选择自己喜欢的空间，OVE创客里实现和小伙伴们的沟通和协作OVE创客里实现和小伙伴的沟通',// 描述
            isIn: true,// 是否已经加入
            avatar: '/static/xiake/head@2x.png',
            id: 1,
          },
        ], // 拿回来的原始数据，未排序
//        unionListSorted: [], // 存放已排序的数组
      }
    },
    created() {
      this.getUnion()
      this.getAd()
//      this.sortUnionList(this.unionListUnsorted)
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
      getAd(){
        this.$http.get(`${this.globalDOMAIN}Api/Common/getAd`,{params:{type:4}}).then(res => {
          if(res.body.status){
            this.banner = `${this.globalDOMAIN.slice(0, -11)}${res.body.data.lists[0].img}`
          }
        })
      },// 获取banner广告图
      getUnion(){
        this.$http.post(`${this.globalDOMAIN}Employ/User/getUnion`,{},{
          headers:{token:this.token},
          emulateJSON:true
        }).then(res=>{
//          unionList: [
//            {
//              name: '移动办公1',// 联盟名称
//              peopleNum: 50, // 成员人数
//              desc: '选择自己喜欢的空间，OVE创客里实现和小伙伴们的沟通和协作OVE创客里实现和小伙伴的沟通',// 描述
//              isIn: true,// 是否已经加入
//              avatar: '/static/xiake/head@2x.png',
//              id: 1,
//            },
//          ],
          if(res.body.status){
            let list = res.body.data.lists
            let tempList = []
            for (let item of list){
              let tempItem = {
                name: item.title,
                peopleNum: item.member_num,
                desc: item.desc,
                isIn: item.is_join, // is_join==1代表已加入，0代表未加入
                avatar:`${this.globalDOMAIN.slice(0, -11)}${item.img}`,
                id:item.id
              }
              tempList.unshift(tempItem)
            }
            this.unionList = tempList
          }
        })
      },// 获取联盟列表
//      sortUnionList(toBeSort) {
//        toBeSort.forEach((item) => {
//          if (item.isIn) {
//            this.unionListSorted.push(item)
//          } else {
//            this.unionListSorted.unshift(item)
//          }
//        })
//      }, // 排序（弃用）
      add(id) {
        // 点击加入
        this.$http.post(`${this.globalDOMAIN}Employ/User/joinUnion`,{union_id:id},{
          headers:{token:this.token},
          emulateJSON:true
        }).then(res=>{
          if(res.body.status){
            this.$vux.toast.text('加入成功')
            this.getUnion()
          }
        })
      },
      hasAddClick(){
        this.$vux.toast.text('已加入')
      },
      toDetail(item){
        if(item.isIn == 1){
          this.$router.push({name:'unionDetail',query:{id:item.id}})
        }else{
          this.$vux.toast.text('您还没加入这个联盟')
        }
      }
    },
    components: {
      loading,
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
