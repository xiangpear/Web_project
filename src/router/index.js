// 配置路由
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import store from '@/store'

// 使用插件
Vue.use(VueRouter)


// 先把VueRouter原型对象的push|replace方法，保存一份
let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace

// 重写push|replace方法
// location参数：告诉原来的push方法，你往哪里跳转（传递哪些参数）
// resolve参数：成功的回调
// reject参数：失败的回调
VueRouter.prototype.push = function(location, resolve, reject) {
    if (resolve && reject) {
        // 调用call方法，篡改函数上下文并执行
        originPush.call(this, location, resolve, reject)
    } else {
        originPush.call(this, location, () => {}, () => {})
    }
}
VueRouter.prototype.replace = function(location, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject)
    } else {
        originReplace.call(this, location, () => {}, () => {})
    }
}

// 配置路由
let router = new VueRouter({
    routes,
    // 滚动行为
    scrollBehavior(to, from, savedPosition) {
        // 返回的y=0，代表滚动条在最上方
        return { y: 0 }
    }
})

// 全局守卫，前置全局守卫（在路由跳转之前进行判断）
router.beforeEach(async(to, from, next) => {
    // to：即将要进入的目标 路由对象
    // from：当前导航正要离开的路由
    // next：放行函数
    // next()放行  next(path)放行到指定的path路由   next(false)中断当前的导航。如果浏览器的 URL 改变了 (可能是用户手动或者浏览器后退按钮)，那么 URL 地址会重置到 from 路由对应的地址。
    let token = store.state.user.token;
    let name = store.state.user.userInfo.name;
    // 用户已经登录，不能再去登录|注册界面
    if (token) {
        if (to.path == '/login' || to.path == '/register') {
            next('/home')
        } else {
            if (name) {
                next()
            } else {
                try {
                    // 获取用户信息成功
                    await store.dispatch('getUserInfo')
                    next()
                } catch (error) {
                    // token失效，获取不到用户信息，需要重新登录
                    // 清除token
                    await store.dispatch('userLogout')
                    next('/login')
                }
            }
        }
    } else {
        // 未登录：不能去交易相关、支付相关、个人中心
        let toPath = to.path
        if (toPath.indexOf('/trade') != -1 || toPath.indexOf('/pay') != -1 || toPath.indexOf('/center') != -1) {
            next('/login?redirect=' + toPath)
        } else {
            next()
        }
    }
})

export default router