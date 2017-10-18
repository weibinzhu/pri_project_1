<template>
  <div class="editEmployerMainPageWrapper">
    <v-header title="编辑雇主信息"></v-header>
    <div class="basicInfoBlock">
      <div class="employerAvatar">
        <span>头像</span>
        <img :src="employerAvatar"/>
      </div>
      <div class="basicInfoItem">
        <div class="itemTitle">单位名称<span class="asteroid">*</span></div>
        <input type="text" placeholder="请填写" name="name"/>
        <div class="block"></div>
      </div>
      <div class="basicInfoItem">
        <div class="itemTitle">单位简称<span class="asteroid">*</span></div>
        <input type="text" placeholder="请填写" name="name"/>
        <div class="block"></div>
      </div>
      <input-select :index="0" @onInputSelectChange="changeValue" title="所在行业" :data="industries" :isRequire=true
                    placeholder="请选择"></input-select>
      <input-select :index="1" @onInputSelectChange="changeValue" title="单位规模" :data="companyScale" :isRequire=true
                    placeholder="请选择"></input-select>
      <input-select :index="2" @onInputSelectChange="changeValue" title="所在城市" :data="cities" :isRequire=true
                    placeholder="请选择"></input-select>
    </div>
    <div class="detailInfoBlock">
      <div class="detailInfoItem">
        <div class="itemTitle">技能标签<span class="asteroid">*</span>
          <span class="specialNotice">（不超过3个，一旦选定后不能修改）</span>
        </div>
        <div class="detailInfoTagWrapper">
          <div class="detailInfoTag" v-for="(tag,index) in skillTags">{{tag}}</div>
          <div class="detailInfoTag">+</div>
        </div>
      </div>
    </div>
    <div class="detailInfoBlock">
      <div class="detailInfoItem">
        <div class="itemTitle">单位简介<span class="asteroid">*</span></div>
        <div class="detailInfoContent">
          <!--{{单位简介}}-->
          <textarea :maxlength="wordLimit" :placeholder="companyIntroPlaceHolder" class="companyIntro"
                    v-model="companyIntroValue"></textarea>
        </div>
        <div class="count">
          {{companyIntroValue.length}}/{{wordLimit}}
        </div>
      </div>
    </div>
    <div class="detailInfoBlock">
      <div class="detailInfoItem">
        <div class="itemTitle">请上传身份证正面照<span class="asteroid">*</span>
          <span class="specialNotice">（仅用于认证，不对外公开）</span>
        </div>
        <div class="chooseImageWrapper">
          <img class="imagePreview" :src="image" v-for="(image,index) in images">
          <div class="chooseImage" v-show="images.length<3">
            <input id="image" type="file" placeholder="choose image" @change="onFileChange"/>
            <label for="image"></label>
          </div>
        </div>
      </div>
    </div>
    <footer @click="editSave" class="editEmployerMainPageFooter">
      保存
    </footer>
  </div>
</template>

<script type="text/ecmascript-6">
  import header from '@/components/v-header/v-header'
  import {Validator} from 'vee-validate';
  import inputSelect from '@/components/inputSelect/inputSelect'

  export default {
    validator: null,
    data() {
      return {
        employerAvatar: '/static/avatar.png',
        value: '',
        cities: [['北京', '上海', '广州', '深圳']],
        industries: [['新闻传媒', '互联网', '建筑设计']],
        companyScale:[['1-10人','11-20人']],// 单位规模
        skillTags: ['自定义', '自定义', '自定义'],//技能标签
        companyIntroPlaceHolder: '请详细描述你的公司，500字以内。',//  自我介绍
        companyIntroValue: '',// 用于存放自我介绍的值
        selectValue: [], // 用于存放popup-picker选择的值（测试用）（必须是数组）
        wxId: '', // 通过v-model与上面的input绑定起来
        wordLimit: 500, // 字数限制
        images: [],// 存放身份证照片
      }
    },
    components: {
      'v-header': header,
      'input-select': inputSelect
    },
    methods: {
      exit(){
        // 退出注册
        // this.$router.go(-1) // 返回上一步
        this.$router.push({path:'/login'}) // 或者完全退出注册，回到登录页
      },
      editSave() {
        // 完成注册，一次性验证全部表单数据
        var that = this
        this.validator.validateAll({wxIdRule: this.wxId}).then(result => {
          if (!result) {
            // validation failed.
            alert('请确保必填项都已经填上')
            return
          }
          // success stuff.
          this.$router.push({path:'/underChecking'})
        }).catch(() => {
          // something went wrong (non-validation related).
        });
      },

      // 将选择的数据存入
      changeValue(msg, index) {
        this.selectValue[index] = msg[0]
        console.log(this.selectValue)
      },
      onFileChange(e) {
        // 身份证上传
        let files = e.target.files || e.dataTransfer.files;
        let supportedTypes = ['image/jpg', 'image/jpeg', 'image/png'];
        if (!files.length || supportedTypes.indexOf(files[0].type) < 0) {
          alert('文件格式只支持：jpg、jpeg 和 png')
          return;
        }
        this.createImage(files[0]);
      },
      createImage(file) {
        // 身份证上传
        let reader = new FileReader();
        let vm = this;

        reader.onload = (e) => {
          vm.images.push(e.target.result);
        };

        reader.readAsDataURL(file);
      },
    },
    created() {
      this.validator = new Validator({
        wxIdRule: 'required',
        locationRule: 'required'
      });
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../../common/style/fun.styl"
  .editEmployerMainPageWrapper
    display: flex
    flex-direction: column
    font-size: px2-2-rem(32)
    background-color: #f7f9f9
    color: #404040
    padding-bottom: 1.1466rem
    .editEmployerMainPageFooter
      position :fixed
      bottom :0
      width :100%
      height :px2-2-rem(86)
      line-height :px2-2-rem(86)
      text-align :center
      color: #ffffff
      background-color :#00a0e9
      //font-size :px2-2-rem(32)
  .basicInfoBlock, .detailInfoBlock
    display: flex
    flex-direction: column
    margin-bottom: 0.2666rem
    background-color: #fff
  .chooseImageWrapper
    display: flex
    flex-wrap: wrap
    padding-bottom: 0.4rem
  .imagePreview, .chooseImage
    width: 1.6rem
    height: 1.6rem
    margin: 0.4rem 0.4rem 0 0
    border: none
  .chooseImage
    /*border: 1px solid #cccccc*/
    input
      display: none
    label
      /*display: flex*/
      /*justify-content: center*/
      /*align-items: center*/
      display: block
      font-size: 1.5rem
      color: #cccccc
      font-weight: 100
      text-align: center
      line-height: 1.6rem
      width: 1.6rem
      height: 1.6rem
      background-image :url("./add@3x.png")
      background-size :cover
  .detailInfoItem
    padding: 0 0.4rem
    .itemTitle
      margin-top: 0.4rem
    .detailInfoTagWrapper
      display: flex
      flex-direction: row
      align-items: center
      margin-top: 0.4rem
      margin-bottom: 0.4rem
      .detailInfoTag
        width: 1.6rem
        height: 0.6666rem
        line-height: 0.6666rem
        color: #999
        font-size: 0.32rem
        text-align: center
        border: 1px solid #999999
        border-radius: 0.35rem
        margin-right: 0.186rem
    .detailInfoContent
      margin-top: 0.4rem
      color: #999
    .companyIntro, .availableTime
      margin-top: 0.4rem
      height: 1.6rem
    .count
      width: 1.6rem
      height: 0.6666rem
      line-height: 0.6666rem
      color: #999
      font-size: 0.32rem
      text-align: center
      border: 1px solid #999999
      border-radius: 0.35rem
      float: right
      margin-top: 0.4rem
      margin-bottom: 0.4rem

  .employerAvatar
    display: flex
    flex-direction: row
    align-items: center
    height: 1.92rem
    border-bottom: 1px solid #e7e7e7
    padding: 0 0.3rem 0 0.4rem
    justify-content: space-between
    img
      width: 1.333rem
      height: 1.333rem
      border-radius: 50%

  .basicInfoItem
    display: flex
    flex-direction: row
    align-items: center
    height: 1.146rem
    border-bottom: 1px solid #e7e7e7
    padding: 0 0.4rem
    justify-content: space-between
    input
      flex-grow: 1
      text-align: right
    .block
      width: px2-2-rem(16)
      margin-left: px2-2-rem(28)
    .editXiakeArrow
      width: px2-2-rem(16)
      margin-left: px2-2-rem(28)
  .basicInfoItem:first-child
    border-top:1px solid #e7e7e7
  .itemTitle
    flex-grow: 0
    .asteroid
      color: #f0724f
    .specialNotice
      color: #666
      font-size: 0.3rem
  .notRequireNotice
    color: #999999
    font-size :px2-2-rem(26)
    text-align :center
    line-height :px2-2-rem(60)
  .basicInfoItem
    .vux-cell-box:before
      border: none

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

  /* 修改placeholder样式 */
  ::placeholder, .basicInfoItem .vux-popup-picker-placeholder
    color: #888;

  /*validate提示用样式*/
  .help
    padding: 0 0.4rem
    text-align: right
    font-size: 0.35rem
    color: #f0724f

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
    font-size: px2-2-rem(32)
</style>
