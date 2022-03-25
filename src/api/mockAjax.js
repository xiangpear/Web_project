// 对于axios进行二次封装
import axios from 'axios';
// 引入进度条插件
import nprogress from 'nprogress';
// 引入进度条的样式
import "nprogress/nprogress.css";
// start方法：进度条开始  done方法：进度条结束

// 1.利用axios对象的方法create，创建一个axios实例
// 2. request就是axios，只不过需要稍微配置一下
const requests = axios.create({
    // 配置对象
    // 基础路径，发请求时，路径当中自动出现api
    baseURL: '/mock',
    // 代表请求超时的时间是5s
    timeout: 5000,
});
// 请求拦截器：在发请求之前，请求拦截器可以检测到，可以在请求发出去之前做一些事情
requests.interceptors.request.use((config) => {
    // config：配置对象，对象里面header请求头属性很重要
    // 进度条开始动
    nprogress.start()
    return config
});
// 响应拦截器
requests.interceptors.response.use((res) => {
    // 服务器响应成功的回调函数
    // 进度条结束
    nprogress.done()
    return res.data
}, (error) => {
    // 服务器响应失败的回调函数
    return Promise.reject(new Error('faile'))
})



// 对外暴露
export default requests