// API接口进行统一管理
import requests from "./request";
import mockRequests from "./mockAjax";

// 三级联动的接口
// /api/product/getBaseCategoryList  get  无参数
// 发请求：axios发请求返回的结果是Promise对象
export const reqCategoryList = () => {
    return requests({ url: '/api/product/getBaseCategoryList', method: 'get' })
}

// 获取banner（首页轮播图）的接口
export const reqGetBannerList = () => {
    return mockRequests.get('/banner')
}

// 获取floor数据的接口
export const reqGetFloorList = () => {
    return mockRequests.get('/floor')
}

// 获取Search模块数据的接口
// 当前这个接口，给服务器传递参数params，至少传递一个空对象
export const reqGetSearchInfo = (params) => {
    return requests({ url: '/api/list', method: 'post', data: params })
}

// 获取产品详情信息的接口
export const reqGoodsInfo = (skuId) => {
    return requests({ url: `/api/item/${skuId}`, method: 'get' })
}

// 将产品添加到购物车中（更新某一个产品的个数）
export const reqAddOrUpdateShopCart = (skuId, skuNum) => {
    return requests({ url: `/api/cart/addToCart/${skuId}/${skuNum}`, method: 'post' })
}

// 获取购物车列表数据的接口
export const reqCartList = () => {
    return requests({ url: '/api/cart/cartList', method: 'get' })
}

// 删除购物车产品的接口
export const reqDeleteCartById = (skuId) => {
    return requests({ url: `/api/cart/deleteCart/${skuId}`, method: 'delete' })
}

// 修改商品选中状态的接口
export const reqUpdateCheckedById = (skuId, isChecked) => {
    return requests({ url: `/api/cart/checkCart/${skuId}/${isChecked}`, method: 'get' })
}

// 获取验证码的接口
export const reqGetCode = (phone) => {
    return requests({ url: `/api/user/passport/sendCode/${phone}`, method: 'get' })
}

// 注册的接口
export const reqUserRegister = (data) => {
    return requests({ url: '/api/user/passport/register', data, method: 'post' })
}

// 登录的接口
export const reqUserLogin = (data) => {
    return requests({ url: '/api/user/passport/login', data, method: 'post' })
}

// 获取用户的信息【需要带着用户的token向服务器获取用户信息】
export const reqUserInfo = () => {
    return requests({ url: '/api/user/passport/auth/getUserInfo', method: 'get' })
}

// 退出登录
export const reqLogout = () => {
    return requests({ url: '/api/user/passport/logout', method: 'get' })
}

// 获取用户地址信息
export const reqAddressInfo = () => {
    return requests({ url: '/api/user/userAddress/auth/findUserAddressList', method: 'get' })
}

// 获取商品清单
export const reqOrderInfo = () => {
    return requests({ url: '/api/order/auth/trade', method: 'get' })
}

// 提交订单
export const reqSubmitOrder = (tradeNo, data) => {
    return requests({ url: `/api/order/auth/submitOrder?tradeNo=${tradeNo}`, data, method: 'post' })
}

// 获取订单支付信息
export const reqPayInfo = (orderId) => {
    return requests({ url: `/api/payment/weixin/createNative/${orderId}`, method: 'get' })
}

// 获取支付订单状态
export const reqPayStatus = (orderId) => {
    return requests({ url: `/api/payment/weixin/queryPayStatus/${orderId}`, method: 'get' })
}

// 获取个人中心的数据
export const reqMyOrderList = (page, limit) => {
    return requests({ url: `/api/order/auth/${page}/${limit}`, method: 'get' })
}