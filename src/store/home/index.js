// home模块的小仓库
import { reqCategoryList, reqGetBannerList, reqGetFloorList } from "@/api";

const state = {
    // state中数据的默认初始值根据服务器返回的是什么，就定义成什么
    categoryList: [],
    // 轮播图的数据
    bannerList: [],
    // floor的数据
    floorList: []
};
const mutations = {
    CATEGORYLIST(state, categoryList) {
        state.categoryList = categoryList
    },
    GETBANNERLIST(state, bannerList) {
        state.bannerList = bannerList
    },
    GETFLOORLIST(state, floorList) {
        state.floorList = floorList
    }
};
const actions = {
    // 通过API里面的接口函数调用，向服务器发请求，获取服务器的数据
    async categoryList({ commit }) {
        let result = await reqCategoryList()
        if (result.code == 200) {
            commit("CATEGORYLIST", result.data)
        }
    },
    // 获取首页轮播图的数据
    async getBannerList({ commit }) {
        let result = await reqGetBannerList()
        if (result.code == 200) {
            commit("GETBANNERLIST", result.data)
        }
    },
    // 获取floor的数据
    async getFloorList({ commit }) {
        let result = await reqGetFloorList()
        if (result.code == 200) {
            commit("GETFLOORLIST", result.data)
        }
    }
};
const getters = {};
export default {
    state,
    mutations,
    actions,
    getters
}