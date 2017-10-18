<template>
  <div class="messageWrapper">
    <ul class="messageTab" @click="showMessage">
      <li class="messageChat" :class="{active:activeId==0}" data-id="0"><span data-id="0">聊天</span></li>
      <li class="messageNotice" :class="{active:activeId==1}" data-id="1"><span data-id="1">通知</span></li>
    </ul>
    <router-link tag="div" to="/messageTest" v-for="(item,index) in messages" v-show="activeId==item.type" class="messageItem">
      <img :src="item.image"/>
      <div class="messageItemText">
        <div class="title">
          {{item.title}}<span>{{item.time}}</span>
        </div>
        <p>{{item.content}}</p>
      </div>
    </router-link>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        activeId: 0,
        messages: [
          {
            image: '/static/icon.png',
            title: '系统通知',
            time: '8月10日',
            content: '最新一条消息概览',
            type: 0,
          },
          {
            image: '/static/icon.png',
            title: '系统通知',
            time: '8月10日',
            content: '最新一条消息概览',
            type: 0,
          },
          {
            image: '/static/icon.png',
            title: '系统通知',
            time: '8月10日',
            content: '最新一条消息概览',
            type: 0,
          },
          {
            image: '/static/icon.png',
            title: '系统通知',
            time: '14:05',
            content: '最新一条消息概览',
            type: 1,
          },
          {
            image: '/static/icon.png',
            title: '系统通知',
            time: '8月10日',
            content: '最新一条消息概览',
            type: 0,
          },
          {
            image: '/static/icon.png',
            title: '系统通知',
            time: '8月10日',
            content: '最新一条消息概览',
            type: 0,
          },
          {
            image: '/static/icon.png',
            title: '系统通知',
            time: '14:05',
            content: '最新一条消息概览',
            type: 1,
          },
          {
            image: '/static/icon.png',
            title: '系统通知',
            time: '8月10日',
            content: '最新一条消息概览',
            type: 0,
          },
          {
            image: '/static/icon.png',
            title: '系统通知',
            time: '8月10日',
            content: '最新一条消息概览',
            type: 0,
          },
          {
            image: '/static/icon.png',
            title: '系统通知',
            time: '14:05',
            content: '最新一条消息概览',
            type: 1,
          },
          {
            image: '/static/icon.png',
            title: '系统通知',
            time: '8月10日',
            content: '最新一条消息概览',
            type: 0,
          },
          {
            image: '/static/icon.png',
            title: '系统通知',
            time: '8月10日',
            content: '最新一条消息概览',
            type: 0,
          }, {
            image: '/static/icon.png',
            title: '系统通知',
            time: '14:05',
            content: '最新一条消息概览',
            type: 1,
          },
          {
            image: '/static/icon.png',
            title: '系统通知',
            time: '8月10日',
            content: '最新一条消息概览',
            type: 0,
          },
          {
            image: '/static/icon.png',
            title: '系统通知',
            time: '8月10日',
            content: '最底下的一条消息概览',
            type: 0,
          },
        ],
      }
    },
    methods: {
      showMessage(e) {
        if (this.activeId == e.target.dataset.id) {
          return
        } else {
          this.activeId = e.target.dataset.id
        }
      }
    }

  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .messageWrapper
    width: 100%
    background-color: #f8f8f8
    min-height: 100vh
    padding-bottom: 1.9rem  /*防止底部内容被tap bar挡住*/
  .messageTab
    display: flex
    flex-direction: row
    justify-content: space-around
    align-items: center
    text-align: center
    height: 1.2rem
    font-size: 0.42666rem
    background-color: #fff
    .messageChat, .messageNotice
      flex-grow: 1
      display: flex
      justify-content: center
      height: 1.2rem
      line-height: 1.2rem
      box-sizing: border-box
      span
        display: inline-block
        width: 2rem
    .active
      span
        color: #00a0e9
        border-bottom: 3px solid #00a0e9

  .messageItem
    height: 1.86667rem
    display: flex
    flex-direction: row
    align-items: center
    font-size: 0.42667rem
    padding: 0.4rem 0.53333rem 0.48rem 0.586667rem
    border-bottom: 1px solid #e5e5e5
    box-sizing: border-box
    background-color: #fff
    img
      width: 0.96rem
      height: 0.96rem
      margin-right: 0.34667rem

  .messageItemText
    width: 7.57333rem
    p
      color: #a4a4a4
      font-size: 0.32rem
    .title
      span
        float: right
        font-size: 0.32rem
        color: #a4a4a4
</style>
