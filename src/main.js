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
Vue.use(VeeValidate, config);
const dictionary = {
  zh_CN: {
    messages: {
      email: () => '请填写正确的邮箱', // 触发‘email’规则时显示的内容,
    },
    attributes: {
      wxId: '微信号' // name为wxId的东西为空时显示的内容
    }
  }
};
Validator.updateDictionary(dictionary);
// 表单验证配置end
Vue.use(vueResource);// 使用vue-resource


Vue.config.productionTip = false


/* eslint-disable no-new */


new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App},
})


