<template>
  <div class="editCaseWrapper">
    <v-header title="编辑项目案例"></v-header>
    <div class="multiInputItem">
      <div class="itemTitle">项目名称<span class="asteroid">*</span></div>
      <div class="multiInputContent">
        <textarea :maxlength="wordLimit" v-model="caseNameValue" :placeholder="caseNamePlaceholder"
                  class="multiInput"></textarea>
        <div class="count">
          {{caseNameValue.length}}/{{wordLimit}}
        </div>
      </div>
    </div>
    <div class="basicInfoItem">
      <div class="itemTitle">职责<span class="asteroid">*</span></div>
      <input type="text" placeholder="请填写" name="duty"/>
      <div class="block"></div>
    </div>
    <div class="basicInfoItem">
      <div class="itemTitle">起始时间<span class="asteroid">*</span></div>
      <input id="start" type="text" readonly="true" placeholder="请选择"/>
      <img class="editCaseArrow" src="/static/arrow-right-gray.png"/>
    </div>
    <div class="basicInfoItem">
      <div class="itemTitle">结束时间<span class="asteroid">*</span></div>
      <input id="end" type="text" readonly="true" placeholder="请选择"/>
      <img class="editCaseArrow" src="/static/arrow-right-gray.png"/>
    </div>
    <div class="multiInputItem noBorder">
      <div class="itemTitle">项目描述<span class="asteroid">*</span></div>
      <div class="multiInputContent">
        <textarea :maxlength="wordLimit" v-model="caseDescValue" :placeholder="caseDescPlaceholder"
                  class="multiInput"></textarea>
        <div class="count">
          {{caseDescValue.length}}/{{wordLimit}}
        </div>
      </div>
    </div>
    <div class="basicInfoItem">
      <div class="itemTitle">作品链接</div>
      <input type="text" placeholder="请填写" name="duty"/>
      <div class="block"></div>
    </div>
    <div class="multiInputItem">
      <div class="itemTitle">作品图片</div>
      <div class="photoUploadText">如需要可上传相关作品图片（最多上传5张）</div>
      <div class="chooseImageWrapper">
        <img class="imagePreview" :src="image" v-for="(image,index) in images">
        <div class="chooseImage" v-show="images.length<5">
          <input id="image" type="file" placeholder="choose image" @change="onFileChange"/>
          <label for="image"></label>
        </div>
      </div>
    </div>
    <footer class="editCaseFooter" @click="editCaseSave">
      <div class="editCaseSave">保存</div>
    </footer>
    <!--<input-select :key="index" v-for="(item,index) in haha" :index="index" @onInputSelectChange="changeValue" title="工作城市" :data="cities" :isRequire="isRequire" :placeholder="ph"></input-select>-->
  </div>
</template>

<script type="text/ecmascript-6">
  import header from '@/components/v-header/v-header'
  //  import inputSelect from '@/components/inputSelect/inputSelect'
  import '../../../../../common/utils/LCalendar.js' // 引入日期选择插件，只能用相对路径
  export default {
    data() {
      return {
        cities: [['北京', '上海', '广州', '深圳']],
        ph: '请选择',
        isRequire: true,
        value: [], // 存储各个选择的数据
        caseNamePlaceholder: '简单描述你有空的时间段，给预约方提供参考',
        caseNameValue: '',// 存放输入名字的值
        caseDescPlaceholder: '添加成功的项目案例，为自己加分',
        caseDescValue: '',// 存放描述的值
        wordLimit: 500, // 字数限制
        images: []
      }
    },
    components: {
      'v-header': header,
//      'input-select':inputSelect
    },
    methods: {
      changeValue(msg, index) {
        this.value[index] = msg[0]
        console.log(this.value)
      },
      editCaseSave() {
        alert('已保存')
        console.log(this.images)
      },
      onFileChange(e) {
        let files = e.target.files || e.dataTransfer.files;
        let supportedTypes = ['image/jpg', 'image/jpeg', 'image/png'];
        if (!files.length || supportedTypes.indexOf(files[0].type) < 0) {
          alert('文件格式只支持：jpg、jpeg 和 png')
          return;
        }
        this.createImage(files[0]);
      },
      createImage(file) {
        let image = new Image();
        let reader = new FileReader();
        let vm = this;

        reader.onload = (e) => {
          vm.images.push(e.target.result);
        };

        reader.readAsDataURL(file);
        console.log(vm.images)
      },
    },
    mounted() {
      let calendarStart = new LCalendar(); // 涉及到new一个构造函数的过程
      let calendarEnd = new LCalendar(); // 涉及到new一个构造函数的过程
      calendarStart.init({
        'trigger': '#start', //标签id
        'type': 'date', //date 调出日期选择 datetime 调出日期时间选择 time 调出时间选择 ym 调出年月选择,
//        'minDate': new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate(), //最小日期
        'minDate': '1900-1-1', //最小日期
        'maxDate': '2100-1-1' //最大日期
      });
      calendarEnd.init({
        'trigger': '#end', //标签id
        'type': 'date', //date 调出日期选择 datetime 调出日期时间选择 time 调出时间选择 ym 调出年月选择,
        'minDate': '1900-1-1', //最小日期
        'maxDate': '2100-1-1' //最大日期
      });
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../../../../common/style/lCalendar.css" /*引入日期选择插件*/
  @import "../../../../../common/style/fun.styl"
  .editCaseWrapper
    display: flex
    flex-direction: column
    font-size: px2-2-rem(32)
    min-height: 100vh
    background-color: #f7f9f9
    color: #404040
    padding-bottom: 1.1466rem
    .basicInfoItem
      display: flex
      flex-direction: row
      align-items: center
      height: 1.146rem
      border-bottom: 1px solid #e7e7e7
      padding: 0 0.4rem
      justify-content: space-between
      background-color: #fff
      input
        flex-grow: 1
        text-align: right
      .block
        width :px2-2-rem(16)
        margin-left :px2-2-rem(28)
      .editCaseArrow
        width :px2-2-rem(16)
        margin-left :px2-2-rem(28)
    .itemTitle
      flex-grow: 0
      .asteroid
        color: #f0724f
        .specialNotice
          color: #666
          font-size: 0.3rem
    .multiInputItem
      display: flex
      flex-direction: column
      border-bottom: 1px solid #e7e7e7
      padding: 0 0.4rem
      justify-content: space-between
      background-color: #fff
      margin-bottom: 0.2666rem
      .itemTitle
        display: flex
        align-items: center
        height: 1.12rem
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
      .multiInput
        margin-top: 0.4rem
        color: #000
      .photoUploadText
        font-size: 0.32rem
        color: #999999
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
          display: block
          font-size: 1.5rem
          color: #cccccc
          font-weight: 100
          text-align: center
          line-height: 1.6rem
          width: 1.6rem
          height: 1.6rem
          background-image: url("./add@3x.png")
          background-size: cover
    .noBorder // 偷懒样式
      border: none
    .editCaseFooter
      display: flex
      flex-direction: row
      position: fixed
      bottom: 0
      z-index: 100
      height: 1.1466rem
      width: 100%
      .editCaseSave
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
      font-size: px2-2-rem(32)

</style>
