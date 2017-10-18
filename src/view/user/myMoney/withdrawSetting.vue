<template>
  <div class="withdrawSetting">
    <v-header title="提现设置"></v-header>
    <div class="withdrawSettingBlock">
      <input-select :isRight=true :index="0" @onInputSelectChange="changeValue" title="开户行" :data="bankList"
                    :isRequire=false placeholder="选择银行"></input-select>
      <div class="inputBlock">
        <div class="itemTitle">银行卡号</div>
        <input type="text" placeholder="输入卡号" name="cardNum"/>
      </div>
      <div class="inputBlock">
        <div class="itemTitle">户名</div>
        <input type="text" placeholder="输入户主姓名" name="name"/>
      </div>
      <div class="inputBlock">
        <div class="itemTitle">提醒手机</div>
        <input type="text" placeholder="13位手机号码" name="phoneNum"/>
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
        bankList: [['中国银行', '工商银行', '建设银行', '农业银行']],
        selectedList: [],// 保存被选择的数据
      }
    },
    methods: {
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
  .withdrawSetting
    display: flex
    flex-direction: column
    align-items: center
    min-height: 100vh
    background-color: #f8f8f8
    font-size: px2-2-rem(32)
    .withdrawSettingBlock
      display: flex
      flex-direction: column
      background-color: #ffffff
      width: 100%
      margin-top: px2-2-rem(32)
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
      .inputBlock:last-child
        border: none

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
