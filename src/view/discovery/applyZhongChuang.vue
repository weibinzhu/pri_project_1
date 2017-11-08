<template>
  <div class="applyZhongChuangWrapper">
    <v-header title="众创空间"></v-header>
    <img src="/static/discovery/zone_02.png"/>
    <img src="/static/discovery/zone_03.png"/>
    <div class="formWrapper">
      <div class="form">
        <p>提交入驻孵化项目</p>
        <div class="inputItem">
          <div class="itemTitle"><span>*</span> 项目名称</div>
          <input type="text" placeholder="请填写您的项目名称" v-model="title"/>
        </div>
        <div class="inputItem">
          <div class="itemTitle"><span>*</span> 项目简介</div>
          <input type="text" placeholder="请填写您的项目简介" v-model="desc"/>
        </div>
        <div class="inputItem">
          <div class="itemTitle"><span>*</span> 需求说明</div>
          <input type="text" placeholder="请填写您的需求说明" v-model="requirement"/>
        </div>
        <div class="inputItem">
          <div class="itemTitle"><span>*</span> 创客姓名</div>
          <input type="text" placeholder="请填写您的姓名" v-model="name"/>
        </div>
        <div class="inputItem">
          <div class="itemTitle"><span>*</span> 联系电话</div>
          <input type="text" placeholder="请填写您的电话" v-model="phone"/>
        </div>
        <div class="inputItem">
          <div class="itemTitle"><span>*</span> 其他</div>
          <input type="text" placeholder="请填写您的备注内容" v-model="remark"/>
        </div>
      </div>
      <div @click="sendApply" class="submit">提交</div>
    </div>
    <img src="/static/discovery/zone_05.png"/>
  </div>
</template>

<script type="text/ecmascript-6">
  import header from '@/components/v-header/v-header'

  export default {
    data() {
      return {
        title: '',
        name: '',
        phone: '',
        requirement: '',
        remark: '',
        desc: '',
      }
    },
    computed: {
      globalDOMAIN() {
        return this.$store.state.globalDOMAIN
      },
      token() {
        return sessionStorage.getItem('token')
      }
    },
    methods: {
      sendApply() {
        this.$http.post(`${this.globalDOMAIN}Api/Common/applyZhongChuang`,{
          name:this.name,
          title:this.title,
          phone:this.phone,
          require:this.requirement,
          remark:this.remark,
          desc:this.desc
        },{
          headers:{token:this.token},
          emulateJSON:true
        }).then(res=>{
          this.$vux.toast.text('提交成功')
        })
      },
    },
    components: {
      'v-header': header
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/style/fun.styl"

  .applyZhongChuangWrapper
    width: 100%
    font-size: px2-2-rem(32)
    overflow: hidden
    img
      width: 100%
    .formWrapper
      width: 100%
      .form
        margin: px2-2-rem(20) auto
        padding-bottom: px2-2-rem(50)
        width: px2-2-rem(692)
        border: 1px solid #000000
        border-radius: px2-2-rem(8)
        p
          width: 100%
          height: px2-2-rem(160)
          line-height: px2-2-rem(160)
          text-align: center
          font-size: px2-2-rem(40)
      .inputItem
        display: flex
        flex-direction: row
        align-items: center
        justify-content: space-between
        height: px2-2-rem(110)
        width: px2-2-rem(630)
        padding: 0 px2-2-rem(16)
        margin: 0 auto
        color: #231815
        border-bottom: 1px solid #b1b2b2
        span
          color: #00a0e9
        input
          flex: 1
          height: 100%
          text-align: right
      .submit
        margin: px2-2-rem(40) auto
        width: px2-2-rem(592)
        height: px2-2-rem(100)
        line-height: px2-2-rem(100)
        text-align: center
        font-size: px2-2-rem(40)
        color: #fff
        border-radius :px2-2-rem(8)
        background-color: #00a0e9
</style>
