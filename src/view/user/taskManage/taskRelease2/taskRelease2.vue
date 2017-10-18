<template>
  <div class="taskRelease2Wrapper">
    <v-header title="发布任务"></v-header>
    <img class="headImg" src="/static/releaseTask/banner@3x.png"/>
    <div class="taskInfoBlock">
      <div class="taskInfoHeader">任务名称</div>
      <div class="taskInfoContent">
        <textarea :placeholder="taskNamePlaceholder" class="taskInfoName"></textarea>
        <div class="count">
          {{nameWordCount}}/500
        </div>
      </div>
      <div class="taskInfoHeader borderTop">任务要求</div>
      <div class="taskInfoContent">
        <textarea :placeholder="taskDemandPlaceholder" class="taskInfoDemand"></textarea>
        <div class="count">
          {{demandWordCount}}/500
        </div>
      </div>
    </div>
    <input-select :index="0" @onInputSelectChange="changeValue" title="任务类别" :data="taskType" :isRequire=true placeholder="请选择"></input-select>
    <input-select :index="1" @onInputSelectChange="changeValue" title="城市选择" :data="cities" :isRequire=false placeholder="请选择"></input-select>
    <input-select :index="2" @onInputSelectChange="changeValue" title="所需人数" :data="peopleNum" :isRequire=false placeholder="请选择"></input-select>
    <div class="taskInfoBlock">
      <div class="taskInfoHeader">工作形式</div>
      <div class="taskInfoContent">
        <div class="radio">
          <input id="asRequest" type="radio" name="taskForm" value="asRequest">
          <label class="taskReleaseRadioLabel" for="asRequest">按需出勤（时间相对灵活）</label>
        </div>
        <div class="radio">
          <input id="asRoutine" type="radio" name="taskForm" value="asRoutine">
          <label class="taskReleaseRadioLabel" for="asRoutine">固定出勤（按时到岗办公）</label>
        </div>
        <div class="radio">
          <input id="asDiscuss" type="radio" name="taskForm" value="asDiscuss">
          <label class="taskReleaseRadioLabel" for="asDiscuss">双方协定（协作方式选定）</label>
        </div>
      </div>
    </div>
    <div class="taskInfoBlock">
      <div class="taskInfoHeader">项目周期</div>
      <div class="taskInfoContent">
        <div class="radio">
          <input id="month" type="radio" name="taskPeriod" value="month">
          <label class="taskReleaseRadioLabel" for="month">按月计算</label>
        </div>
        <div class="radio">
          <input id="day" type="radio" name="taskPeriod" value="day">
          <label class="taskReleaseRadioLabel" for="day">按天计算</label>
        </div>
        <div class="radio">
          <input id="hour" type="radio" name="taskPeriod" value="hour">
          <label class="taskReleaseRadioLabel" for="hour">按小时计算</label>
        </div>
      </div>
    </div>
    <div class="taskInfoBlock">
      <div class="taskInfoHeader">项目总预算</div>
      <div class="taskInputItem">
        <div class="itemTitle">最低价</div>
        <input type="text" placeholder="请填写" name="minPrice"/>
        <!--<div class="block"></div>-->
      </div>
      <div class="taskInputItem">
        <div class="itemTitle">最高价</div>
        <input type="text" placeholder="请填写" name="maxPrice"/>
        <!--<div class="block"></div>-->
      </div>
    </div>
    <div class="releaseTask2Notice">
      <div class="noticeText">*{{noticeText}}</div>
      <div class="service" @click="toggleWxId"><img src="/static/kefu@3x.png"/></div>
    </div>
    <footer class="taskRelease2Footer" @click="releaseTask2">
      <div class="releaseTask2">立即发布</div>
    </footer>
    <transition name="getWxFade">
      <div class="getWxModel" v-show="showGetWxModel">
        <div class="showText">
          <div class="title">请添加客服微信联系我们</div>
          <input class="wxId" :value="wxId" readonly/>
        </div>
        <div class="getWxIdBtn" data-clipboard-target=".wxId" @click="checkIphone">
          点击复制微信号
        </div>
      </div>
    </transition>
    <transition name="overlayFade">
      <div class="overlay" v-show="showGetWxModel" @click="toggleWxId"></div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import header from '../../../../components/v-header/v-header'
  import inputSelect from '@/components/inputSelect/inputSelect'
  import Clipboard from 'clipboard'
  // 放在这里是为了避免多次绑定事件
  // 这里不需要再弄一个，task主页已经创建一个了
//  var clipboard2 = new Clipboard('.getWxIdBtn') // 绑定到【点击复制客服微信号】按钮
//  clipboard2.on('success', (e) => {
//    console.log(e)
//    alert('复制成功!')
//    clipboard2 = {} // 清除实例，避免多次生成
//  })
//  clipboard2.on('error', (e) => {
//    console.log(e)
//    alert('请选择“拷贝”进行复制!')
//  })
  export default {
    data() {
      return {
        taskNamePlaceholder: '任务名称尽量直观清晰，包含必要的关键词，可以帮助您受到更多关注。例如：引爆公众号阅读量',
        taskDemandPlaceholder: '请详细描述您的任务要求，需要创客解决什么问题，不得少于10个字',
        nameWordCount: 0,
        demandWordCount: 0,
        taskType:[['巴拉巴拉','喇叭喇叭','拔拔拔']], //任务类别
        cities:[['全部','北京','上海']],
        peopleNum:[['1-10人','11-30人','30人以上']],
        selectValue:[],// 储存弹出选择框选择的值
        noticeText:'请认真填写任务内容，如发现虚假信息，后果自负。',// 最下方温馨提示文字
        wxId: 'fwfa21', // 客服微信号
        showGetWxModel: false,// 客服微信号弹框显隐
      }
    },
    methods:{
      // 将选择的数据存入
      changeValue(msg,index){
        this.selectValue[index]= msg[0]
        console.log(this.selectValue)
      },
      releaseTask2(){
        alert('任务已发布')
      },
      toggleWxId() { // 弹出或隐藏【点击复制客服微信】框
        let y = window.scrollY + 200;
        let model = document.querySelector(".getWxModel")
        model.style.top = y + 'px'
        this.showGetWxModel = !this.showGetWxModel
      },
      checkIphone() { // 优雅降级。（暂时不需要用）
        if (navigator.userAgent.match(/ipad|ipod|iphone/i)) {
          alert('如果复制失败请手动复制')
        }
      }
    },
    components: {
      'input-select':inputSelect,
      'v-header': header
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../../../common/style/fun.styl"
  .taskRelease2Wrapper
    display: flex
    flex-direction: column
    min-height: 100vh
    font-size: px2-2-rem(32)
    background-color: #f7f9f9
    color: #404040
    padding-bottom: 1.1466rem
    .releaseTask2Notice
      position :relative
      padding: 0 0.4rem
      color :#888888
      margin-bottom :px2-2-rem(26)
      font-size: px2-2-rem(26)
      .noticeText
        padding-right :px2-2-rem(80)
      .service
        position :absolute
        right : px2-2-rem(36)
        top: px2-2-rem(-10)
        display :flex
        align-items :center
        justify-content :center
        /*width :px2-2-rem(62)
        height :px2-2-rem(62)*/
        img
          width :px2-2-rem(62)
          height :px2-2-rem(62)
          /*border-radius :50%
          box-shadow: 0px 2px 10px 0px rgba(194,194,194,1);*/
    .taskInfoBlock
      padding: 0 0.4rem
      background-color: #ffffff
      color: #353535
      margin: 0.26666rem 0
      font-size: px2-2-rem(32)
    .taskInfoHeader
      font-size:px2-2-rem(36)
      height: 1.12rem
      line-height: 1.12rem
    .taskInputItem
      display: flex
      flex-direction: row
      align-items: center
      height: 1.146rem
      font-size : px2-2-rem(26)
      border-bottom: 1px solid #e7e7e7
      justify-content: space-between
      input
        flex-grow: 1
        text-align: right
      .block
        width :px2-2-rem(16)
        margin-left :px2-2-rem(28)
      ::-webkit-input-placeholder // 修改这里的输入框的placeholder
        font-size :px2-2-rem(26)
    .taskInputItem:last-child
      border :none
    .taskInfoContent
      margin-bottom: 0.26666rem
    .taskInfoName, .taskInfoDemand
      height: 1.333rem
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
    .headImg
      height: px2-2-rem(190)
    /*radio 样式*/
    .radio
      display :flex
      /*flex-direction:column*/
      align-items :center
      height : px2-2-rem(90)
      border-top : 1px solid #e7e7e7
    .taskReleaseRadioLabel
      flex: 1
      display: inline-block
      position: relative
      padding-left: 0.58666rem
      font-size :px2-2-rem(26)

    .taskReleaseRadioLabel:before
      content: ""
      display: inline-block
      width: px2-2-rem(26)
      height: px2-2-rem(26)
      margin-right: 0.2666rem
      position: absolute
      left: 0
      bottom: 0.06rem
      background-color: #fff
      border: 1px solid #bababa

    .radio .taskReleaseRadioLabel:before
      border-radius: 50%

    input[type=radio]
      display: none;

    input[type=radio]:checked + .taskReleaseRadioLabel:before
      content: "\2022"
      color: #55abf4
      font-size: px2-2-rem(26)
      text-align: center
      line-height: px2-2-rem(24) // 微调，让小点在手机上也垂直居中
      border: 1px solid #55abf4
    /*footer*/
    .taskRelease2Footer
      display: flex
      flex-direction: row
      position: fixed
      bottom: 0
      z-index: 100
      height: 1.1466rem
      width: 100%
      .releaseTask2
        height: 1.1466rem
        line-height: 1.1466rem
        flex: 1
        text-align: center
        background-color: #00a0e9
        color: #fff
  //      以下开始修改系统默认样式
    textarea
      box-sizing: border-box
      border: none
      outline: none
      resize: none
      width: 100%

    ::-webkit-input-placeholder // 修改placeholder
      color: #999999
      font-size: 0.4rem


  .overlay {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1000;
    background-color: rgba(0, 0, 0, .8);
  }

  //    【点击复制客服微信弹框】
  .getWxModel
    position: absolute
    z-index: 10000
    left: calc(50vw - 3.7333rem)
    display: flex
    flex-direction: column
    align-items: center
    justify-content: space-around
    width: 7.46666rem
    height: 3.8933rem
    font-size: 0.48rem
    border-radius: 10px
    background-color: #fff
    .showText
      display: flex
      flex-direction: column
      align-items: center
      justify-content: space-around
      height: 2.1333rem
      box-sizing: border-box
      .title
        color: #000
      .wxId
        font-size: 0.42666rem
        color: #d2d3d5
        text-align: center
    .getWxIdBtn
      width: 100%
      height: 1.3333rem
      line-height: 1.3333rem
      text-align: center
      border-top: 1px solid #666
      color: #00a0e9

  .getWxFade-leave-active, .getWxFade-enter-active, .overlayFade-leave-active, .overlayFade-enter-active
    transition: all .5s

  .getWxFade-enter, .getWxFade-leave-to, .overlayFade-enter, .overlayFade-leave-to
    opacity: 0
</style>
