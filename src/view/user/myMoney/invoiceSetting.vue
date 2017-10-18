<template>
  <div class="invoiceSetting">
    <v-header title="开票设置"></v-header>
    <ul class="invoiceSettingTab" @click="onTabbarClick">
      <li :class="[activeIndex == 0? 'active' : '', 'tabItem']" data-id="0">
        <div class="personal" data-id="0"></div>
        个人
      </li>
      <li :class="[activeIndex == 1? 'active' : '','tabItem']" data-id="1">
        <div class="company" data-id="1"></div>
        公司
      </li>
    </ul>
    <div class="personalInputBlock" v-show="activeIndex == 0">
      <div class="inputBlock">
        <div class="itemTitle">名称</div>
        <input type="text" placeholder="郑某某" name="name"/>
      </div>
      <input-select :isRight=true :index="0" @onInputSelectChange="changeValue" title="开户行" :data="bankList"
                    :isRequire=false placeholder="选择银行"></input-select>
      <div class="inputBlock">
        <div class="itemTitle">银行卡号</div>
        <input type="text" placeholder="输入卡号" name="cardNum"/>
      </div>
      <div class="inputBlock">
        <div class="itemTitle">收件人</div>
        <input type="text" placeholder="郑某某" name="receiverName"/>
      </div>
      <div class="inputBlock">
        <div class="itemTitle">联系电话</div>
        <input type="text" placeholder="13411569879" name="phone"/>
      </div>
      <div class="inputBlock">
        <div class="itemTitle">省市</div>
        <input type="text" placeholder="广东省广州市" name="city"/>
      </div>
      <div class="inputBlock">
        <div class="itemTitle">详细街道</div>
        <input type="text" placeholder="新港东路1516号" name="add"/>
      </div>
    </div>
    <div class="companyInputBlock" v-show="activeIndex == 1">
      <div class="inputBlock">
        <div class="itemTitle">名称</div>
        <input type="text" placeholder="郑某某" name="nameCompany"/>
      </div>
      <div class="inputBlock">
        <div class="itemTitle">纳税号</div>
        <input type="text" placeholder="xxxxxxxxxx" name="taxNumCompany"/>
      </div>
      <input-select :isRight=true :index="1" @onInputSelectChange="changeValue" title="开户行" :data="bankList"
                    :isRequire=false placeholder="选择银行"></input-select>
      <div class="inputBlock">
        <div class="itemTitle">银行卡号</div>
        <input type="text" placeholder="输入卡号" name="cardNumCompany"/>
      </div>
      <div class="inputBlock">
        <div class="itemTitle">收件人</div>
        <input type="text" placeholder="郑某某" name="receiverNameCompany"/>
      </div>
      <div class="inputBlock">
        <div class="itemTitle">联系电话</div>
        <input type="text" placeholder="13411569879" name="phoneCompany"/>
      </div>
      <div class="inputBlock">
        <div class="itemTitle">省市</div>
        <input type="text" placeholder="广东省广州市" name="cityCompany"/>
      </div>
      <div class="inputBlock">
        <div class="itemTitle">详细街道</div>
        <input type="text" placeholder="新港东路1516号" name="addCompany"/>
      </div>
    </div>
    <div class="settingBtn" @click="onSettingBtnClick">
      保存
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import header from '@/components/v-header/v-header'
  import select from '@/components/inputSelect/inputSelect'

  export default {
    data() {
      return {
        activeIndex: 0, // 当前选择项， 默认选择第一个
        bankList: [['中国银行', '工商银行', '建设银行', '农业银行']],
        selectedList: [],// 保存被选择的数据
      }
    },
    methods: {
      onTabbarClick(e) {
        this.activeIndex = e.target.dataset.id
      },
      changeValue(data, index) {

        this.selectedList[index] = data[0]

      },
      onSettingBtnClick() {
        alert('已保存')
      }
    },
    components: {
      'v-header': header,
      'input-select': select,
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '../../../common/style/fun.styl'
  .invoiceSetting
    display: flex
    flex-direction: column
    align-items: center
    min-height: 100vh
    font-size: px2-2-rem(32)
    background-color: #f8f8f8
    .invoiceSettingTab
      display: flex
      flex-direction: row
      width: 100%
      height: px2-2-rem(180)
      margin-bottom: px2-2-rem(20)
      background-color: #ffffff
      .tabItem
        flex: 1
        display: flex
        flex-direction: column
        align-items: center
        justify-content: center
        color: #b3b3b3
        .personal, .company
          display: block
          width: px2-2-rem(90)
          height: px2-2-rem(90)
          background-size: px2-2-rem(180) px2-2-rem(90)
          background-position: 0 0
        .company
          background-image: url("./home.png")
        .personal
          background-image: url("./my.png")
      .active
        color: #00a0e9
        .personal, .company
          background-position: px2-2-rem(90) 0
    .personalInputBlock,.companyInputBlock
      display: flex
      flex-direction: column
      width: 100%
      border-top: 1px solid #e5e5e5
      background-color: #ffffff
      /*border-bottom: 1px solid #e5e5e5*/
      font-size: px2-2-rem(32)
      .inputSelectTitle
        margin-right: px2-2-rem(72)
      .inputBlock
        display: flex
        flex-direction: row
        align-items: center
        height: 1.146rem
        border-bottom: 1px solid #e7e7e7
        padding: 0 0.4rem
        justify-content: space-between
        .itemTitle
        // 根据inputSelect的实际文字宽度算出
          width: px2-2-rem(168)
        input
          flex-grow: 1
          text-align: left

    .settingBtn
      width: px2-2-rem(686)
      height: px2-2-rem(84)
      line-height: px2-2-rem(84)
      border-radius: px2-2-rem(8)
      margin-top: px2-2-rem(34)
      color: #ffffff
      text-align: center
      background-color: #00a0e9

  ::-webkit-input-placeholder // 修改placeholder
    color: #999999
    font-size: px2-2-rem(32)
</style>
