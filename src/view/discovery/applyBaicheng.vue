<template>
  <div class="applyBaichengWrapper">
    <v-header title="百城旅创 寻找城市合伙人"></v-header>
    <img src="/static/discovery/find_02.png"/>
    <img src="/static/discovery/find_03.png"/>
    <img src="/static/discovery/find_04.png"/>
    <img src="/static/discovery/find_05.png"/>
    <img src="/static/discovery/find_06.png"/>
    <div class="formWrapper">
      <div class="form">
        <p>符合以上条件，快加入我们</p>
        <div class="inputItem">
          <div class="itemTitle"><span>*</span> 您的姓名</div>
          <input type="text" placeholder="请填写您的真实姓名" v-model="name"/>
        </div>
        <div class="inputItem">
          <div class="itemTitle"><span>*</span> 您的微信</div>
          <input type="text" placeholder="请填写您的真实微信" v-model="wechat"/>
        </div>
        <div class="inputItem">
          <div class="itemTitle"><span>*</span> 联系电话</div>
          <input type="text" placeholder="请填写您的真实电话" v-model="phone"/>
        </div>
        <div class="inputItem">
          <div class="itemTitle"><span>*</span> 所在城市</div>
          <input type="text" placeholder="请填写您所在城市" v-model="city"/>
        </div>
        <div class="inputItem">
          <div class="itemTitle"><span>*</span> 公司名称</div>
          <input type="text" placeholder="请填写您公司名称" v-model="company"/>
        </div>
        <div class="inputItem">
          <div class="itemTitle"><span>*</span> 目前从事行业</div>
          <input type="text" placeholder="请填写您从事的行业" v-model="industry"/>
        </div>
        <div class="multiLineInputItem">
          <div class="itemTitle"><span>*</span> 申请理由</div>
          <textarea v-model="reason"></textarea>
        </div>
      </div>
      <div @click="sendApply" class="submit">提交</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import header from '@/components/v-header/v-header'

  export default {
    data() {
      return {
        wechat: '',
        name: '',
        phone: '',
        city:'',
        company: '',
        industry: '',
        reason: '',
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
        this.$http.post(`${this.globalDOMAIN}Api/Common/applyBaicheng`,{
          name:this.name,
          city:this.city,
          phone:this.phone,
          wechat:this.wechat,
          company:this.company,
          industry:this.industry,
          remark:this.reason
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

  .applyBaichengWrapper
    width: 100%
    font-size: px2-2-rem(32)
    overflow: hidden
    padding-bottom :px2-2-rem(100)
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
      .multiLineInputItem
        display: flex
        flex-direction :column
        width: px2-2-rem(630)
        padding: 0 px2-2-rem(16)
        margin: 0 auto
        color: #231815
        span
          color: #00a0e9
        .itemTitle
          height: px2-2-rem(100)
          line-height: px2-2-rem(100)
  //      以下开始修改系统默认样式
  textarea
    font-size: 0.4rem
    box-sizing: border-box
    outline: none
    resize: none
    width: 100%
    height :px2-2-rem(140)
</style>
