<template>
  <div class="xiakeSignUpWrapper">
    <div class="xiakeSignUpHeader">
      <div class="headerBtn" @click="exit">退出注册</div>
      <div class="headerTitle">选择身份</div>
      <div class="headerBtn" @click="xiakeSignUpSave">完成</div>
    </div>
    <!--<v-header :starShow="false" :shareShow="false" :title="'选择身份'"></v-header>-->
    <div class="basicInfoBlock">
      <div class="xiakeAvatar">
        <span>头像</span>
        <img :src="xiakeAvatar"/>
      </div>
      <div class="basicInfoItem">
        <div class="itemTitle">姓名<span class="asteroid">*</span></div>
        <input type="text" placeholder="请填写" name="name"/>
        <div class="block"></div>
      </div>
      <div class="basicInfoItem">
        <div class="itemTitle">性别<span class="asteroid">*</span></div>
        <div class="radio">
          <input id="male" type="radio" name="gender" value="male">
          <label class="chooseGenderLabel" for="male">男</label>
          <input id="female" type="radio" name="gender" value="female">
          <label class="chooseGenderLabel" for="female">女</label>
        </div>
      </div>
      <div class="basicInfoItem">
        <div class="itemTitle">出生年月<span class="asteroid">*</span></div>
        <input id="birthday" type="text" readonly="true" placeholder="请选择"/>
        <img class="editXiakeArrow" src="/static/arrow-right-gray.png"/>
      </div>
      <input-select :index="0" @onInputSelectChange="changeValue" title="所在城市" :data="cities" :isRequire=true
                    placeholder="请选择"></input-select>
      <div class="basicInfoItem">
        <div class="itemTitle">微信号<span class="asteroid">*</span></div>
        <input name="wxId" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('wxId') }"
               type="text" placeholder="请填写" v-model="wxId"/>
        <div class="block"></div>
      </div>
      <div v-show="errors.has('wxId')" class="help is-danger">{{ errors.first('wxId') }}</div>
      <input-select :index="1" @onInputSelectChange="changeValue" title="入驻行业" :data="industries" :isRequire=true
                    placeholder="请选择"></input-select>
      <input-select :index="2" @onInputSelectChange="changeValue" title="工作年限" :data="years" :isRequire=true
                    placeholder="请选择"></input-select>
      <input-select :index="3" @onInputSelectChange="changeValue" title="技能类别" :data="skills" :isRequire=true
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
    <div class="detailInfoBlock">
      <div class="detailInfoItem">
        <div class="itemTitle">自我介绍<span class="asteroid">*</span></div>
        <div class="detailInfoContent">
          <!--{{selfIntro}}-->
          <textarea :maxlength="wordLimit" :placeholder="selfIntroPlaceHolder" class="selfIntro"
                    v-model="selfIntroValue"></textarea>
        </div>
        <div class="count">
          {{selfIntroValue.length}}/{{wordLimit}}
        </div>
      </div>
    </div>

    <div class="notRequireNotice">以下信息非必填，但为了让雇主更好地了解你，建议完善</div>
    <div class="detailInfoBlock">
      <div class="basicInfoItem">
        <div class="itemTitle">就职单位</div>
        <input type="text" placeholder="请填写" name="name"/>
        <div class="block"></div>
      </div>
      <div class="basicInfoItem">
        <div class="itemTitle">单位职务</div>
        <input type="text" placeholder="请填写" name="name"/>
        <div class="block"></div>
      </div>
      <input-select :index="4" @onInputSelectChange="changeValue" title="团队规模" :data="teamScale" :isRequire=false
                    placeholder="请选择"></input-select>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import header from '@/components/v-header/v-header'
  import '../../common/utils/LCalendar.js' // 引入日期选择插件，只能用相对路径
  import {Validator} from 'vee-validate';
  import inputSelect from '@/components/inputSelect/inputSelect'

  export default {
    validator: null,
    data() {
      return {
        xiakeAvatar: '/static/avatar.png',
        value: '',
        cities: [['北京', '上海', '广州', '深圳']],
        industries: [['新闻传媒', '互联网', '建筑设计']],
        years: [['1', '2', '3', '4', '5年以上']], // 工作年限
        skills: [['建筑设计', 'web前端开发', 'UI设计']], // 技能类别
        teamScale:[['1-10人','11-20人']],// 团队规模
        skillTags: ['自定义', '自定义', '自定义'],//技能标签
        selfIntroPlaceHolder: '请详细描述你的优势和特长，以便雇主更好地了解你。',//  自我介绍
        selfIntroValue: '',// 用于存放自我介绍的值
        selectValue: [], // 用于存放popup-picker选择的值（测试用）（必须是数组）
        wxId: '', // 通过v-model与上面的input绑定起来
        wordLimit: 500, // 字数限制
        images: [],// 存放身份证照片
      }
    },
    mounted() {
      var calendar = new LCalendar(); // 涉及到new一个构造函数的过程
      calendar.init({
        'trigger': '#birthday', //标签id
        'type': 'date', //date 调出日期选择 datetime 调出日期时间选择 time 调出时间选择 ym 调出年月选择,
        'minDate': '1900-1-1', //最小日期
        'maxDate': new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate() //最大日期
      });
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
      xiakeSignUpSave() {
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
  @import "../../common/style/lCalendar.css" /*引入日期选择插件*/
  @import "../../common/style/fun.styl"
  .xiakeSignUpWrapper
    display: flex
    flex-direction: column
    font-size: px2-2-rem(32)
    background-color: #f7f9f9
    color: #404040
    padding-bottom: 1.1466rem
    .xiakeSignUpHeader
      box-sizing: border-box
      position: sticky
      top: 0
      z-index: 100
      width: 100%
      height: 1.2rem
      display: flex
      flex-direction: row
      align-items: center
      justify-content: space-between
      font-size: px2-2-rem(26)
      padding: 0 0.4rem
      background-color: #fff
      .headerTitle
        position: absolute
        left: 42%
        font-size: 0.48rem

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
    .selfIntro, .availableTime
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

  .xiakeAvatar
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
  /*radio 样式*/
  .chooseGenderLabel
    display: inline-block
    position: relative

    padding-left: 0.58666rem
    margin-left: 0.58666rem
    font-size: px2-2-rem(32)

  .chooseGenderLabel:before
    content: ""
    display: inline-block
    width: 0.4rem
    height: 0.4rem
    margin-right: 0.2666rem
    position: absolute
    left: 0
    bottom: 0.1066rem
    background-color: #fff
    border: 1px solid #bababa

  .radio .chooseGenderLabel:before
    border-radius: 50%

  input[type=radio]
    display: none;

  input[type=radio]:checked + .chooseGenderLabel:before
    content: "\2022"
    color: #55abf4
    font-size: 0.4rem
    text-align: center
    line-height: 0.39rem // 微调，让小点在手机上也垂直居中
    border: 1px solid #55abf4

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
