<template>
  <div class="inputSelect">
    <div class="inputSelectTitle">{{title}}<span class="asteroid" v-if="isRequire">*</span></div>
    <popup-picker @on-change="notifyParent" :data="data" v-model="bindData" :placeholder="placeholder"></popup-picker>
    <img src="/static/arrow-right-gray.png"/>
  </div>
</template>

<script type="text/ecmascript-6">
  //  import {PopupPicker} from 'vux'
  import PopupPicker from 'vux/src/components/popup-picker/index.vue'

  export default {
    data() {
      return {
        bindData: []
      }
    },
    mounted() {
      if (this.isRight) {
        var text = document.getElementsByClassName('vux-popup-picker-select')
        for (let i = 0; i < text.length; i++) {
          text[i].style.textAlign = 'left'
        }
      }
    },
    props: {
      title: { // 标题
        type: String
      },
      isRequire: { // 是否为必填项
        type: Boolean,
        default: true
      },
      placeholder: { // placeholder
        type: String,
        default: '请选择'
      },
      data: { // 可选项列表
        type: Array,
        default: [[]]
      },
      index: {
        // 循环时产生的index
        type: Number,
        default: 0
      },
      isRight: {
        // placeholder是否左对齐
        type: Boolean,
        default: false
      }
    },
    components: {
      PopupPicker
    },
    methods: {
      notifyParent() {
        this.$emit("onInputSelectChange", this.bindData, this.index);
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '../../common/style/fun.styl'

  .asteroid
    color: #f0724f

  .inputSelect
    display: flex
    flex-direction: row
    align-items: center
    height: 1.146rem
    border-bottom: 1px solid #e7e7e7
    padding: 0 0.4rem
    justify-content: space-between
    font-size: px2-2-rem(32)
    background-color: #ffffff
    input
      flex-grow: 1
      text-align: left

  .inputSelectTitle
    margin-right: px2-2-rem(72) // 为部分需要文字左对齐的页面（如开票设置页）的选择框订制

  .inputSelect
    .vux-cell-box:before
      border: none

  img
    width: px2-2-rem(16)
    height: px2-2-rem(24)
    margin-left: px2-2-rem(28)

  .vux-cell-box
    flex-grow: 1

  .weui-cell
    display: flex
    flex-direction: row
    flex-grow: 1

  .weui-cell
    flex-grow: 1

  .weui-label:before
    display: none

  ::placeholder, .vux-popup-picker-placeholder
    color: #888
</style>
