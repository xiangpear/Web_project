import Vue from 'vue'
import App from './App.vue'

// 三级联动、轮播图、分页器的组件---全局组件
import TypeNav from '@/components/TypeNav';
import Carousel from '@/components/Carousel';
import Pagination from '@/components/Pagination';
import { Button, MessageBox } from 'element-ui';

// 第一个参数：全局组件的名字  第二个参数：哪一个组件
Vue.component(TypeNav.name, TypeNav)
Vue.component(Carousel.name, Carousel)
Vue.component(Pagination.name, Pagination)

// ElementUI注册全局组件
Vue.component(Button.name, Button)

// ElementUI注册组件---挂在原型上
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

// 引入路由
import router from '@/router'

// 引入仓库
import store from '@/store'

// 引入mockServer.js
import '@/mock/mockServer'

// 引入swiper样式
import 'swiper/css/swiper.css'

// 统一引入api文件夹中全部请求函数
import * as API from '@/api'

// 引入vue-lazyload插件
import VueLazyload from 'vue-lazyload'
// import gqh from '@/assets/gqh.png'
// 注册插件
Vue.use(VueLazyload, {
    // 懒加载默认图片
    loading: ''
})

// 引入表单校验插件
import '@/plugins/validate'
new Vue({
    render: h => h(App),
    // 全局事件总线$bus的配置
    beforeCreate() {
        Vue.prototype.$bus = this
        Vue.prototype.$API = API
    },
    // 注册路由信息：当这里书写router的时候，组件身上都拥有$route, $router属性
    router,
    // 注册仓库：组件实例的身上会多一个$store属性
    store
}).$mount('#app')