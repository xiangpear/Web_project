import { reqGetCode, reqUserRegister, reqUserLogin, reqUserInfo, reqLogout } from '@/api'
// 登录与注册的模块
const state = {
    code: '',
    token: localStorage.getItem('TOKEN'),
    userInfo: {}
}
const mutations = {
    GETCODE(state, code) {
        state.code = code
    },
    USERLOGIN(state, token) {
        state.token = token
    },
    GERUSERINFO(state, userInfo) {
        state.userInfo = userInfo
    },
    CLEAR(state) {
        // 清空仓库中的数据
        state.token = '';
        state.userInfo = {};
        // 清空本地存储的数据
        localStorage.removeItem('TOKEN');
    }
}
const actions = {
    // 获取验证码
    async getCode({ commit }, phone) {
        let result = await reqGetCode(phone)
        if (result.code == 200) {
            commit('GETCODE', result.data)
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    // 用户注册
    async userRegister({ commit }, user) {
        let result = await reqUserRegister(user)
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error(result.message))
        }
    },
    // 用户登录
    async userLogin({ commit }, data) {
        let result = await reqUserLogin(data);
        if (result.code == 200) {
            commit('USERLOGIN', result.data.token);
            // 持久化存储token
            localStorage.setItem('TOKEN', result.data.token);
            return 'ok';
        } else {
            return Promise.reject(new Error('faile'));
        }
    },
    // 获取用户信息
    async getUserInfo({ commit }) {
        let result = await reqUserInfo()
        if (result.code == 200) {
            commit('GERUSERINFO', result.data)
            return 'ok'
        } else {
            Promise.reject(new Error('faile'))
        }
    },
    // 退出登录
    async userLogout({ commit }) {
        let result = await reqLogout()
        if (result.code == 200 || result.code == 208) {
            commit('CLEAR')
            return 'ok'
        } else {
            Promise.reject(new Error('faile'))
        }
    }
}
const getters = {}
export default {
    state,
    mutations,
    actions,
    getters
}