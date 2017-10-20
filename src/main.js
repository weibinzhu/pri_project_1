// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VeeValidate, {Validator} from 'vee-validate'; // 表单验证
import zh from 'vee-validate/dist/locale/zh_CN'; // 本地化文件
import vueResource from 'vue-resource' // 引入vue-resource插件，用于Ajax

// 表单验证配置start
Validator.addLocale(zh);
const config = {
  locale: 'zh_CN'
};
Validator.extend('mobilePhone', {
  messages: {
    zh_CN:field => '请输入正确的手机号mn'
  },
  validate: value => {
    return /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/.test(value);
  }
});

Vue.use(VeeValidate, config);
const dictionary = {
  zh_CN: {
    messages: {
      email: () => '请填写正确的邮箱', // 触发‘email’规则时显示的内容,
    },
    attributes: {
      // 一个字典，本来显示左边，现在显示右边的中文
      wxId: '微信号', // name为wxId的东西为空时显示的内容
      phoneNum: '手机号',
      password: '密码'
    }
  }
};
Validator.updateDictionary(dictionary);
// 表单验证配置end
Vue.use(vueResource);// 使用vue-resource
// Vue.http.options.headers = {
//   'token': '5256'
// }


Vue.config.productionTip = false


/* eslint-disable no-new */


new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App},
})


