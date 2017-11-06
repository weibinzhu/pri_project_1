<template>
  <div id="home">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <div class="tabBar">
      <router-link to="/home/task" tag="span">
        <div class="tabIcon home"></div>
        任务
      </router-link>
      <router-link to="/home/xiake" tag="span">
        <div class="tabIcon xiake"></div>
        峡客
      </router-link>
      <router-link to="/home/discovery" tag="span">
        <div class="tabIcon all"></div>
        发现
      </router-link>
      <router-link to="/home/message" tag="span">
        <div class="tabIcon comment"></div>
        消息
      </router-link>
      <router-link to="/home/user" tag="span">
        <div class="tabIcon my"></div>
        我的
      </router-link>
    </div>
    <div class="adWrapper" v-show="showAd">
      <a class="adImgWrapper" :href="ad.href"><img :src=adImg class="adImg"/></a>
      <img src="./Close@3x.png" class="closeBtn" @click="toggleShowAd"/>
    </div>
    <div class="overlay" v-show="showAd" @click="toggleShowAd"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'home',
    data() {
      return {
        showAd: false,
        ad: {},// 广告信息
      }
    },
    computed: {
      globalDOMAIN() {
        return this.$store.state.globalDOMAIN
      },
      adImg() {
        if (this.ad.img) {
          return `${this.globalDOMAIN.slice(0, -11)}${this.ad.img}`
        } else {
          return '/static/Popup@3x.png'
        }
      }
    },
    mounted() {
      this.getAd()
      if (!sessionStorage.showAd) { // 只在第一次进入的时候显示广告
        window.scrollTo(0, 0)
        this.showAd = true
        sessionStorage.showAd = true
      }

    },
    methods: {
      toggleShowAd() {
        this.showAd = !this.showAd
      },
      getAd() {
        this.$http.get(`${this.globalDOMAIN}Api/Common/getAd`).then(res => {
          this.ad = res.body.data.lists[0]
        })
      },// 获取广告信息
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/style/fun.styl"
  .tabBar {
    position: fixed;
    bottom: 0;
    display: flex;
    flex-direction: row;
    box-sizing: border-box;
    width: 100%;
    font-size: px2-2-rem(32);
    height: px2-2-rem(120);
    border-top: 1px solid #ccc;
    background-color: #fff;
    z-index: 100
  }

  .tabBar .tabIcon {
    display: block
    background-size: px2-2-rem(112)
    width: px2-2-rem(56)
    height: px2-2-rem(56)
  }

  .tabBar .home {
    background-image: url("./home.png")
  }

  .tabBar .xiake {
    background-image: url("./xiake.png")
  }

  .tabBar .all {
    background-image: url("./all.png")
  }

  .tabBar .comment {
    background-image: url("./comment.png")
  }

  .tabBar .my {
    background-image: url("./my.png")
  }

  .tabBar span {
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .router-link-active, .router-link-active .tabIcon {
    color: #00a0ea
    background-position: px2-2-rem(56) 0
  }

  .adImgWrapper {
    display: block;
    width: 100%;
    height: 100%;
  }

  .adImg {
    position: relative

    width: px2-2-rem(586)

  }

  .overlay {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1000;
    background-color: rgba(0, 0, 0, .8);
  }

  .adWrapper {
    position: absolute
    top: 26%
    left: 12%
    z-index: 10000
  }

  .closeBtn {
    position: absolute
    top: px2-2-rem(-40)
    right: px2-2-rem(-40)
    width: px2-2-rem(78)
    height: px2-2-rem(78)
  }
</style>
