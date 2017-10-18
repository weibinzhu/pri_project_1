<template>
  <div class="editXiakeWrapper">
    <v-header :starShow="false" :shareShow="false" :title="'编辑峡客信息'"></v-header>
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
      <div class="basicInfoItem">
        <div class="itemTitle">单位职务<span class="asteroid">*</span></div>
        <input type="text" placeholder="请填写" name="name"/>
        <div class="block"></div>
      </div>
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
    <div class="detailInfoBlock">
      <div class="basicInfoItem">
        <div class="itemTitle">项目案例</div>
        <input-select style="padding: 0" :data="years" :index="4" @onInputSelectChange="changeValue" title=""
                      :isRequire=false placeholder="点击选择"></input-select>
        <!--<popup-picker placeholder="点击选择"></popup-picker>-->
      </div>
      <div class="detailInfoItem">
        <div class="mainPageCaseItem" v-for="(item,index) in cases">
          <div class="caseTitle">
            <span></span>
            <p>{{item.title}}</p><a :href="item.url">作品链接</a>
          </div>
          <!--点击进入项目案例编辑页-->
          <router-link tag="div" to="/editCase" class="caseContent">{{item.content}}</router-link>
        </div>
      </div>
    </div>
    <div class="detailInfoBlock">
      <div class="basicInfoItem">
        <div class="itemTitle">手机号<span class="asteroid">*</span></div>
        <input type="text" placeholder="请填写" name="name"/>
      </div>
      <div class="detailInfoItem">
        <div class="itemTitle">方便提供服务的时间<span class="asteroid">*</span></div>
        <div class="detailInfoContent">
          <!--{{availableTime}}-->
          <textarea :maxlength="wordLimit" :placeholder="availableTimePlaceHolder" class="availableTime"
                    v-model="availableTimeValue"></textarea>
        </div>
        <div class="count">
          {{availableTimeValue.length}}/{{wordLimit}}
        </div>
      </div>
    </div>
    <footer class="editXiakeFooter" @click="editXiakeSave">
      <div class="editXiakeSave">保存</div>
    </footer>
  </div>
</template>

<script type="text/ecmascript-6">
  import header from '@/components/v-header/v-header'
  import '../../../../common/utils/LCalendar.js' // 引入日期选择插件，只能用相对路径
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
        skillTags: ['自定义', '自定义', '自定义'],//技能标签
        cases: [
          {
            title: '城市人家装修',
            content: '本方案是围绕现代简约为主题，适合于30岁左右的三口之家居住，再加上中式的元素在里面',
            url: 'http://www.baidu.com'
          },
          {
            title: '现代简约风格',
            content: '本方案是围绕现代简约为主题，适合于30岁左右的三口之家居住，再加上中式的元素在里面',
            url: 'http://www.baidu.com'
          }
        ],// 项目案例
        availableTimePlaceHolder: '简单描述你有空的时间段，给预约方提供参考',// 可以服务的时间-描述
        availableTimeValue:'',// 用于存放可服务的时间的值
        selfIntroPlaceHolder: '请详细描述你的服务需求，以便对方做好准备。',//  自我介绍
        selfIntroValue:'',// 用于存放自我介绍的值
        selectValue: [], // 用于存放popup-picker选择的值（测试用）（必须是数组）
        wxId: '', // 通过v-model与上面的input绑定起来
        wordLimit:500, // 字数限制
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

      // 提交编辑，一次性验证全部表单数据
      editXiakeSave() {
        var that = this
        this.validator.validateAll({wxIdRule: this.wxId}).then(result => {
          if (!result) {
            // validation failed.
            alert('请确保必填项都已经填上')
            return
          }
          // success stuff.
          alert('保存成功')
        }).catch(() => {
          // something went wrong (non-validation related).
        });
      },

      // 将选择的数据存入
      changeValue(msg, index) {
        this.selectValue[index] = msg[0]
        console.log(this.selectValue)
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
  @import "../../../../common/style/lCalendar.css" /*引入日期选择插件*/
  @import "../../../../common/style/fun.styl"
  .editXiakeWrapper
    display: flex
    flex-direction: column
    font-size: px2-2-rem(32)
    background-color: #f7f9f9
    color: #404040
    padding-bottom: 1.1466rem

  .basicInfoBlock, .detailInfoBlock
    display: flex
    flex-direction: column
    margin-bottom: 0.2666rem
    background-color: #fff

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
    .selfIntro,.availableTime
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
      width :px2-2-rem(16)
      margin-left :px2-2-rem(28)
    .editXiakeArrow
      width :px2-2-rem(16)
      margin-left :px2-2-rem(28)

  .itemTitle
    flex-grow: 0
    .asteroid
      color: #f0724f
    .specialNotice
      color: #666
      font-size: 0.3rem

  .mainPageCaseItem
    padding: 0.1866rem 0.1866rem
    color: #b6b6b6
    .caseTitle
      display: flex
      /*position :relative*/
      flex-direction: row
      align-items: center
      color: #353535
      span
        display: inline-block
        width: 0.1866rem
        height: 0.1866rem
        margin-right: 0.1866rem
        background-color: #00a0e9
        border-radius: 50%
      p
        flex: 1
      a
        color: #00a0e9
        font-size: 0.32rem
        align-self: right

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

  /*footer*/
  .editXiakeFooter
    display: flex
    flex-direction: row
    position: fixed
    bottom: 0
    z-index: 100
    height: 1.1466rem
    width: 100%
    .editXiakeSave
      height: 1.1466rem
      line-height: 1.1466rem
      flex: 1
      text-align: center
      background-color: #00a0e9
      color: #fff

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
