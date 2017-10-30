// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import VueLazyload from 'vue-lazyload'

import '@/common/style/index.scss'

Vue.prototype.$http = axios;

Vue.use(VueAwesomeSwiper);
require('swiper/dist/css/swiper.css');

Vue.use(VueLazyload, {
    error: require('@/common/images/error_img.jpg'),
    loading: require('@/common/images/loading.gif'),
    attempt: 1
});

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})
