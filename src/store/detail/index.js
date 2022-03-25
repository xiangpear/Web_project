import { reqGoodsInfo, reqAddOrUpdateShopCart } from "@/api";
// 封装游客临时身份的模块uuid ---> 生成一个随机字符串（不能再变）
import { getUUID } from '@/utils/uuid_token';
const state = {
    goodInfo: {},
    // 游客临时身份
    uuid_token: getUUID()
}
const mutations = {
    GETGOODINFO(state, goodInfo) {
        state.goodInfo = goodInfo
    }
}
const actions = {
    // 获取产品信息的action
    async getGoodInfo({ commit }, skuId) {
        let result = await reqGoodsInfo(skuId)
        if (result.code == 200) {
            commit('GETGOODINFO', result.data)
        }
    },
    // 将产品添加到购物车中
    async addOrUpdateShopCart({ commit }, { skuId, skuNum }) {
        let result = await reqAddOrUpdateShopCart(skuId, skuNum);
        // 当前这个函数addOrUpdateShopCart如果执行返回Promise
        // 加入购物车成功
        if (result.code == 200) {
            return "ok"
        } else {
            // 加入购物车失败
            return Promise.reject(new Error('faile'))
        }
    }
}
const getters = {
    // 简化路径导航的数据
    categoryView(state) {
        return state.goodInfo.categoryView || {}
    },
    // 简化产品信息的数据
    skuInfo(state) {
        return state.goodInfo.skuInfo || {}
    },
    // 简化产品售卖属性的数据
    spuSaleAttrList(state) {
        return state.goodInfo.spuSaleAttrList || []
    }
}
export default {
    state,
    mutations,
    actions,
    getters
}