<template>
  <div class="releaseTaskWrapper">
    <v-header title="发布任务"></v-header>
    <div class="headImgPlaceholder" data-large="/static/releaseTask/banner@3x.png">
      <img class="headImgSm" src="/static/releaseTask/banner@2x-min.png"/>
    </div>
    <div class="taskInfoBlock">
      <div class="taskInfoHeader">服务名称</div>
      <div class="taskInfoContent">
        <textarea :maxlength="wordLimit" :placeholder="taskNamePlaceholder" class="taskInfoName"
                  v-model="taskNameValue"></textarea>
        <div class="count">
          {{taskNameValue.length}}/{{wordLimit}}
        </div>
      </div>
      <div class="taskInfoPrice">
        <div class="priceText">价格</div>
        <input type="text" placeholder="填写价格（元/次）" name="price"/>
      </div>
    </div>
    <div class="taskInfoBlock">
      <div class="taskInfoHeader">服务介绍</div>
      <div class="taskInfoContent">
        <textarea :maxlength="wordLimit" :placeholder="taskIntroPlaceholder" class="taskInfoIntro"
                  v-model="taskIntroValue"></textarea>
        <div class="count">
          {{taskIntroValue.length}}/{{wordLimit}}
        </div>
      </div>
      <div class="taskInfoHeader borderTop">我的成就</div>
      <div class="taskInfoContent">
        <textarea :maxlength="wordLimit" :placeholder="taskAchievePlaceholder" class="taskInfoAchieve"
                  v-model="taskAchieveValue"></textarea>
        <div class="count">
          {{taskAchieveValue.length}}/{{wordLimit}}
        </div>
      </div>
    </div>
    <div class="taskInfoBlock">
      <div class="taskInfoHeader">作品图片</div>
      <div class="photoUploadText">如需要可上传相关作品图片（最多上传5张）</div>
      <div class="chooseImageWrapper">
        <img class="imagePreview" :src="image" v-for="(image,index) in images">
        <div class="chooseImage" v-show="images.length<5">
          <input id="image" type="file" placeholder="choose image" @change="onFileChange"/>
          <label for="image"></label>
        </div>
      </div>
    </div>
    <footer class="releaseTaskFooter" @click="releaseTask">
      <div class="releaseTask">立即发布</div>
    </footer>
  </div>
</template>

<script type="text/ecmascript-6">
  import header from 'components/v-header/v-header'

  export default {
    data() {
      return {
        taskNamePlaceholder: '服务名称尽量直观清晰，包含必要的关键词，可以帮助您收到更多关注。例如：美女段子收帮您引爆公众号阅读量',
        taskNameValue: '',// 保存输入的值
        taskIntroPlaceholder: '请详细描述你可以提供的专业服务内容，可以帮组企业解决的问题',
        taskIntroValue: '',// 保存输入的值
        taskAchievePlaceholder: '请详细描述你可以提供的专业服务内容，可以帮组企业解决的问题', // 【我的成就】提示词
        taskAchieveValue: '',// 保存输入的值
        file: null,
        wordLimit: 500, // 最大字数
        images: [],
      }
    },
    mounted() {

      var placeholder = document.querySelector('.headImgPlaceholder'),
        small = placeholder.querySelector('.headImgSm')
      // 1: load small image and show it
      var img = new Image();
      img.src = small.src;
      img.onload = function () {
        small.classList.add('loaded');
      };

      // 2: load large image
      var imgLarge = new Image();
      imgLarge.src = placeholder.dataset.large;
      imgLarge.onload = function () {
        imgLarge.classList.add('loaded');
      };
      placeholder.appendChild(imgLarge);
    },
    methods: {
      releaseTask() {
        console.log(this.images[0])
//        let files = this.images
//        let data = new FormData()
//        let i = 0
//        let len = files.length
//        while(i<len){
//          data.append("image" + i, 1)
//          i++
//        }
////        console.log(data)
////        alert('已发布')
////        console.log(this.images)
//        console.log(data.get('image0'))
//        var xhr = new XMLHttpRequest;
//        xhr.open('POST', '/', true);
//        xhr.send(data);
      },
      previewImg(e) {
        // 弃用
        let file = e.target.files[0];
        let supportedTypes = ['image/jpg', 'image/jpeg', 'image/png'];
        if (file && supportedTypes.indexOf(file.type) >= 0) {
          console.log(file)
          this.file = file;
        } else {
          alert('文件格式只支持：jpg、jpeg 和 png');
          this.clearFile();
        }
      },
      onFileChange(e) {
        let files = e.target.files || e.dataTransfer.files;
        let supportedTypes = ['image/jpg', 'image/jpeg', 'image/png'];
        if (!files.length || supportedTypes.indexOf(files[0].type) < 0) {
          alert('文件格式只支持：jpg、jpeg 和 png')
          return;
        }
        // 利用url,浏览器缓存图片的base64 [ window.URL.createObjectURL(file) ] （短）
//         var url = window.URL.createObjectURL(document.getElementById('image').files.item(0));
//         this.images.push(url)
        // 利用base64, 实际上传图片的base64 [ new FileReader().readAsDataURL (file) ] （长）
        this.createImage(files[0]);
      },
      createImage(file) {
//        let image = new Image();
        let reader = new FileReader();
        let vm = this;

        reader.onload = (e) => {
          vm.images.push(e.target.result);
        };

        reader.readAsDataURL(file);
      },
    },
    components: {
      'v-header': header
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" > // 这里不能加scoped，因为大图的loaded是后来加上去的，不会有vue自动分配的id
  .releaseTaskWrapper
    display: flex
    flex-direction: column
    justify-content: center
    font-size: 0.4rem
    padding-bottom: 2.1466rem // footer高1.1466rem，不过为了好看，这里的padding再加1rem
    background-color: #f7f9f9
    .headImg, .headImgPlaceholder
      position: relative
      width: 100%
      height: 2.1333rem
      overflow :hidden
    .headImgPlaceholder
      img
        position: absolute
        top: 0
        left: 0
        opacity: 0
        width: 100%
        height: 100%
        transition: opacity 1s linear
      .loaded
        opacity: 1
      .headImgSm
        filter: blur(50px)
        transform: scale(1)
    .taskInfoBlock
      padding: 0 0.4rem
      background-color: #ffffff
      color: #353535
      margin-top: 0.26666rem
      font-size: 0.4rem
    .taskInfoHeader, .priceText
      font-size: 0.43rem
      height: 1.12rem
      line-height: 1.12rem
    .taskInfoContent
      margin-bottom: 0.26666rem
    .taskInfoName
      height: 1.6rem
    .taskInfoPrice
      display: flex
      flex-direction: row
      align-items: center
      height: 1.146rem
      border-top: 1px solid #e5e5e5
      justify-content: space-between
      input
        flex-grow: 1
        text-align: right
    .taskInfoIntro, .taskInfoAchieve
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
    /*footer*/
    .releaseTaskFooter
      display: flex
      flex-direction: row
      position: fixed
      bottom: 0
      z-index: 100
      height: 1.1466rem
      width: 100%
      .releaseTask
        height: 1.1466rem
        line-height: 1.1466rem
        flex: 1
        text-align: center
        background-color: #00a0e9
        color: #fff

  // 偷懒用样式
    .borderTop
      border-top: 1px solid #e5e5e5

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
