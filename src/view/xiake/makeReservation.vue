<template>
  <div class="makeReservationWrapper">
    <v-header title="预约服务"></v-header>
    <loading v-show="isLoading"></loading>
    <div class="info">
      <p class="name">{{serviceName}}</p>
      <P class="price">￥{{price}}/次</P>
    </div>
    <div class="requirementWrapper">
      <div class="requirementHeader">服务需求</div>
      <div class="requirementContent">
        <textarea :maxlength="wordLimit" :placeholder="requirementPlaceholder" class="requirement"
                  v-model="requirementValue"></textarea>
        <div class="count">
          {{requirementValue.length}}/{{wordLimit}}
        </div>
      </div>
      <div class="example">查看示例</div>
    </div>
    <div class="notice">提交预约，待峡客确认后，即可直接协商</div>
    <footer class="submit" @click="submit">提交预约</footer>
  </div>
</template>

<script type="text/ecmascript-6">
  import header from '@/components/v-header/v-header'
  import loading from '@/components/loading'
  export default {
    name:'makeReservation',
    data() {
      return {
        id: '',// 服务id
        serviceName: '未查询到',
        price: '未查询到',
        wordLimit: 500,
        requirementPlaceholder: '请详细描述你的服务需求，以便对方做好准备',
        requirementValue: '',
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
    mounted() {
      this.id = this.$route.params.id
      this.getServiceInfo()
    },
    methods: {
      submit() {
        this.$http.post(`${this.globalDOMAIN}Employ/Service/book`, {
          'service_id': this.id,
          'remark': this.requirementValue,
        }, {
          emulateJSON: true,
          headers: {'token': this.token}
        }).then(res => {
          this.$vux.toast.text(res.body.msg)
          if (res.body.status) {
            console.log(res)
            this.$router.push({path: '/makeReservationSuccess'})
          }
        })
      },
      getServiceInfo() {
        this.$http.get(`${this.globalDOMAIN}Employ/Service/getById`, {
          params: {'service_id': this.id},
          emulateJSON: true,
          headers: {'token': this.token}
        }).then((res) => {
          this.processServiceInfoData(res.body.data)
        })
      },
      processServiceInfoData(data) {
        this.serviceName = data.title
        this.price = data.price
      },
    },
    components: {
      loading,
      'v-header': header
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/style/fun.styl"
  .makeReservationWrapper
    display: flex
    flex-direction: column
    min-height: 100vh
    font-size: px2-2-rem(32)
    background-color: #f8f8f8
    .info
      display: flex
      flex-direction: column
      justify-content: center
      height: px2-2-rem(158)
      margin-bottom: px2-2-rem(20)
      padding: px2-2-rem(20) px2-2-rem(34)
      border-top: 1px solid #e5e5e5
      background-color: #ffffff
      .name, .price
        line-height: px2-2-rem(60)
      .price
        color: #e4790f
    .requirementWrapper
      position: relative
      display: flex
      flex-direction: column
      height: px2-2-rem(252)
      padding: px2-2-rem(20) px2-2-rem(34)
      border-top: 1px solid #e5e5e5
      background-color: #ffffff
      /*justify-content :center*/
      .requirementHeader
        line-height: px2-2-rem(60)
      .requirementContent
        margin-top: px2-2-rem(20)
        .requirement
          height: px2-2-rem(100)
        .count
          position: relative
          right: -7.56rem
          width: 1.6rem
          height: 0.6666rem
          line-height: 0.6666rem
          color: #999
          font-size: 0.32rem
          text-align: center
          border: 1px solid #999999
          border-radius: 0.35rem
          margin-bottom: 0.4rem
      .example
        position: absolute
        top: px2-2-rem(28)
        right: px2-2-rem(30)
        font-size: px2-2-rem(28)
        color: #00a0e9
    .notice
      font-size: px2-2-rem(28)
      color: #00a0e9
      padding: px2-2-rem(20) px2-2-rem(34)
    .submit
      position: fixed
      bottom: 0
      width: 100%
      height: px2-2-rem(86)
      line-height: px2-2-rem(86)
      text-align: center
      color: #ffffff
      background-color: #00a0e9
  //      以下开始修改系统默认样式
    textarea
      font-size: 0.4rem
      box-sizing: border-box
      border: none
      outline: none
      resize: none
      width: 100%

    ::-webkit-input-placeholder // 修改placeholder
      color: #999999
      font-size: 0.4rem
</style>
