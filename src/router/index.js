import Vue from 'vue'
import Router from 'vue-router'

// miscellaneous

import cases from '@/view/task/cases/cases' // 案例页，已弃


// 登录

import login from '@/view/login/login' // 登录首页
import signUpPhone from '@/view/login/signUpPhone' // 手机注册页(也是重置密码页)
import selectIdentity from '@/view/login/selectIdentity' // 身份选择页
import xiakeSignUp from '@/view/login/xiakeSignUp' // 峡客注册所要填的表格
import underChecking from '@/view/login/underChecking' // 审核中

// 带底部tab bar的home。是各个主板块的入口

import home from '@/view/home/home' // home

// 任务页

import task from '@/view/task/task' // 任务页首页
import releaseTask from '@/view/task/releaseTask/releaseTask' // 发布任务页

// 峡客页

import xiake from '@/view/xiake/xiake' // 峡客页首页
import serviceDetail from '@/view/xiake/serviceDetail' // 服务详情页
import makeReservation from '@/view/xiake/makeReservation' // 服务预约页
import makeReservationSuccess from '@/view/xiake/makeReservationSuccess' // 提交预约成功
// 发现

import discovery from '@/view/discovery/discovery' // 发现首页
import findProject from '@/view/discovery/findProject' // 找项目（项目推荐）页
import findExpert from '@/view/discovery/findExpert' // 专家智库（旅创智库）
import headline from '@/view/discovery/headline' // 行峡头条

// 消息页

import message from '@/view/message/message' // 消息页首页
import messageTest from '@/view/message/messageTest' // 消息，一张图片，预览用
// 个人中心
import user from '@/view/user/user' // 个人中心首页
import myFav from '@/view/user/myFav/myFav' // 我的收藏页

// ------------雇主版
import employerMainPage from '@/view/user/employerMainPage/employerMainPage' // 雇主主页
import editEmployerMainPage from '@/view/user/employerMainPage/editEmployerMainPage' // 编辑雇主主页
import employerAppointment from '@/view/user/employerAppointment/employerAppointment' // 我预约的
import taskManageMainPage from '@/view/user/taskManage/taskManageMainPage' // 任务管理页首页
import taskRelease2 from '@/view/user/taskManage/taskRelease2/taskRelease2' // 任务管理页内的发布任务页
import myUnion from '@/view/user/myUnion/myUnion' // 我的联盟
import unionDetail from '@/view/user/myUnion/unionDetail' // 联盟列表

// ------------峡客版
import xiakeMainPage from '@/view/user/xiakeMainPage/xiakeMainPage' // 峡客主页首页
import myService from '@/view/user/xiakeMainPage/myService/myService' // 峡客-我的服务列表
import serviceDetail2 from '@/view/user/xiakeMainPage/myService/serviceDetail2' // 峡客-服务详情
import serviceContract from '@/view/user/whoReservedMe/serviceContract' // 服务用合同
import releaseService from '@/view/user/xiakeMainPage/myService/releaseService/releaseService' // 发布服务
import editXiake from '@/view/user/xiakeMainPage/editXiake/editXiake' // 峡客主页编辑页
import editCase from '@/view/user/xiakeMainPage/editXiake/editCase/editCase' // 峡客案例编辑页
import whoReservedMe from '@/view/user/whoReservedMe/whoReservedMe' // 峡客-谁预约我
import reservationDetail from '@/view/user/whoReservedMe/reservationDetail' // 预约服务详情
import hasBidded from '@/view/user/hasBidded/hasBidded' // 我竞标的
import hasBiddedItemDetail from '@/view/user/hasBidded/hasBiddedItemDetail' // 我竞标的详情

import taskDetail from '@/view/user/taskManage/taskDetail/taskDetail' // 任务详情页
import contract from '@/view/user/taskManage/contract' // 查看合同
import toRateTask from '@/view/user/taskManage/toRateTask' // 评价任务
import takeCareMoney from '@/view/user/taskManage/takeCareMoney' // 托管资金
import applyCheck from '@/view/user/taskManage/applyCheck'
import myMoney from '@/view/user/myMoney/myMoney' //我的钱包首页
import withdraw from '@/view/user/myMoney/withdraw' // 提现页首页
import withdrawSetting from '@/view/user/myMoney/withdrawSetting' // 提现设置
import invoiceSetting from '@/view/user/myMoney/invoiceSetting' // 开票设置
import myReputation from '@/view/user/myReputation/myReputation' // 我的名号首页
import lightUpBadge from '@/view/user/myReputation/lightUpBadge' // 点亮徽章
import zhima from '@/view/user/myReputation/zhima' // 芝麻认证
import invitationManage from '@/view/user/invitationManage/invitationManage' // 邀请管理
import toInvite from '@/view/user/invitationManage/toInvite' // 邀请好友
import setting from '@/view/user/setting/setting' // 设置
import aboutXingxia from '@/view/user/setting/aboutXingxia' // 关于行峡网
import userAgreement from '@/view/user/setting/userAgreement' // 用户协议
import feedback from '@/view/user/setting/feedback' // 用户反馈
import helpPage from '@/view/user/setting/help' // 帮助
import signIn from '@/view/user/signIn/signIn' // 签到


Vue.use(Router)

export default new Router({
  routes: [
    {
      // 根路径，跳转到登录页
      path: '/',
      redirect: '/login',
    },
    {
      // 登录页
      path: '/login',
      name: 'login',
      component: login
    },
    {
      // 手机注册页
      path: '/signUpPhone',
      name: 'signUpPhone',
      component: signUpPhone
    },
    {
      // 身份选择页
      path: '/selectIdentity',
      name: 'selectIdentity',
      component: selectIdentity
    },
    {
      // 审核中
      path: '/underChecking',
      name: 'underChecking',
      component: underChecking
    },
    {
      // 峡客注册所要填写的表格
      path: '/xiakeSignUp',
      name: 'xiakeSignUp',
      component: xiakeSignUp
    },
    {
      // 峡客主页
      path: '/xiakeMainPage/:type',// type-从哪里进入？从峡客的主页(type==0)还是从峡客列表(type==1)
      name: 'xiakeMainPage',
      component: xiakeMainPage
    },
    {
      // 峡客-我的服务列表
      path: '/myService',
      name: 'myService',
      component: myService
    },
    {
      // 发布服务
      path: '/releaseService',
      name: 'releaseService',
      component: releaseService
    },
    {
      // 峡客-服务详情2
      path: '/serviceDetail2/:id',
      name: 'serviceDetail2',
      component: serviceDetail2
    },
    {
      // 服务用合同
      path: '/serviceContract/:orderId',
      name: 'serviceContract',
      component: serviceContract
    },
    {
      // 雇主主页
      path: '/employerMainPage',
      name: 'employerMainPage',
      component: employerMainPage
    },
    {
      // 我的联盟
      path: '/myUnion',
      name: 'myUnion',
      component: myUnion
    },
    {
      // 联盟列表
      path: '/unionDetail/:id',
      name: 'unionDetail',
      component: unionDetail
    },
    {
      // 我预约的
      path: '/employerAppointment',
      name: 'employerAppointment',
      component: employerAppointment
    },
    {
      // 雇主主页编辑
      path: '/editEmployerMainPage',
      name: 'editEmployerMainPage',
      component: editEmployerMainPage
    },
    {
      // 峡客编辑页
      path: '/editXiake',
      name: 'editXiake',
      component: editXiake
    },
    {
      // 项目案例编辑
      path: '/editCase',
      name: 'editCase',
      component: editCase
    },
    {
      // 我的收藏
      path: '/myFav',
      name: 'myFav',
      component: myFav,
    },
    {
      // 发布任务
      path: '/releaseTask',
      name: 'releaseTask',
      component: releaseTask,
    },
    {
      // 发布任务-雇主？-任务管理页内
      path: '/taskRelease2',
      name: 'taskRelease2',
      component: taskRelease2
    },
    {
      // 任务管理首页
      path: '/taskManageMainPage',
      name: 'taskManageMainPage',
      component: taskManageMainPage
    },
    {
      // 查看合同。。
      path: '/contract/:taskId',
      name: 'contract',
      component: contract
    },
    {
      // 评价任务
      path: '/toRateTask/:taskId/:bidId',
      name: 'toRateTask',
      component: toRateTask
    },
    {
      // 托管资金
      path: '/takeCareMoney',
      name: 'takeCareMoney',
      component: takeCareMoney
    },
    {
      // 申请验收
      path: '/applyCheck',
      name: 'applyCheck',
      component: applyCheck
    },
    {
      // 任务详情页
      path: '/taskDetail/:id/:type',
      // 传递参数：id-任务id，type-入口类型（任务页，任务管理页，我的预约页）
      // type：0-任务，1-任务管理，2-我的预约
      name: 'taskDetail',
      component: taskDetail
    },
    {
      // 谁预约我
      path: '/whoReservedMe',
      name: 'whoReservedMe',
      component: whoReservedMe
    },
    {
      // 我竞标的
      path: '/hasBidded',
      name: 'hasBidded',
      component: hasBidded
    },
    {
      // 我竞标的详情
      path: '/hasBiddedItemDetail/:id',
      name: 'hasBiddedItemDetail',
      component: hasBiddedItemDetail
    },
    {
      // 预约服务详情
      path: '/reservationDetail/:id',
      name: 'reservationDetail',
      component: reservationDetail
    },
    {
      // 我的钱包首页
      path: '/myMoney',
      name: 'myMoney',
      component: myMoney
    },
    {
      // 提现
      path: '/withdraw',
      name: 'withdraw',
      component: withdraw
    },
    {
      // 提现设置
      path: '/withdrawSetting',
      name: 'withdrawSetting',
      component: withdrawSetting
    },
    {
      // 开票设置
      path: '/invoiceSetting',
      name: 'invoiceSetting',
      component: invoiceSetting
    },
    {
      // 我的名号首页
      path: '/myReputation',
      name: 'myReputation',
      component: myReputation
    },
    {
      // 点亮徽章
      path: '/lightUpBadge',
      name: 'lightUpBadge',
      component: lightUpBadge
    },
    {
      // 芝麻信用
      path: '/zhima',
      name: 'zhima',
      component: zhima
    },
    {
      // 设置
      path: '/setting',
      name: 'setting',
      component: setting
    },
    {
      // 关于行峡网
      path: '/aboutXingxia',
      name: 'aboutXingxia',
      component: aboutXingxia
    },
    {
      // 用户协议
      path: '/userAgreement',
      name: 'userAgreement',
      component: userAgreement
    },
    {
      // 使用帮助
      path: '/helpPage',
      name: 'helpPage',
      component: helpPage
    },
    {
      // 反馈
      path: '/feedback',
      name: 'feedback',
      component: feedback
    },
    {
      // 邀请管理
      path: '/invitationManage',
      name: 'invitationManage',
      component: invitationManage
    },
    {
      //邀请好友
      path: '/toInvite',
      name: 'toInvite',
      component: toInvite
    },
    {
      // 签到
      path: '/signIn',
      name: 'signIn',
      component: signIn
    },
    {
      // 找项目（项目推荐）页
      path: '/findProject',
      name: 'findProject',
      component: findProject
    },
    {
      // 专家智库（旅创智库）
      path: '/findExpert',
      name: 'findExpert',
      component: findExpert
    },
    {
      // 行峡头条
      path: '/headline',
      name: 'headline',
      component: headline
    },
    {
      // 服务详情页
      path: '/serviceDetail/:id',
      name: 'serviceDetail',
      component: serviceDetail
    },
    {
      // 服务预约页
      path: '/makeReservation/:id',
      name: 'makeReservation',
      component: makeReservation
    },
    {
      // 提交预约成功
      path: '/makeReservationSuccess',
      name: 'makeReservationSuccess',
      component: makeReservationSuccess
    },
    {
      // 消息，预览，一张图
      path: '/messageTest',
      name: 'messageTest',
      component: messageTest
    },
    {
      // 主页，带底部tab bar
      path: '/home',
      name: 'home',
      redirect: '/home/task',
      component: home,
      children: [
        {
          // 任务页
          path: 'task',
          name: 'task',
          component: task
        },
        {
          // 个人中心
          path: 'user',
          name: 'user',
          component: user,
        },
        {
          // 精彩案例页（内含案例详情）
          path: 'cases', // 已弃
          name: 'cases',
          component: cases
        },
        {
          path: 'message',
          name: 'message',
          component: message
        },
        {
          path: 'xiake',
          name: 'xiake',
          component: xiake
        },
        {
          path: 'discovery',
          name: 'discovery',
          component: discovery
        },
      ]
    },
  ],
  scrollBehavior(to, from, savedPosition) { // 并不生效
    console.log(to, from)
    return {x: 0, y: 500}
  }
})
