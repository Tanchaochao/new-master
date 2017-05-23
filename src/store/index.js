import storage from '../shared/services/storageService.js'
const store = {
    state: {
        isLogin:false,
        menus:storage.get('user')?storage.get('user').menus:[],
        userType:{
            0:'超级管理员',
            1:'普通管理员'
        }
    },
    actions: {

    },
    mutations: {

    },
    getters: {
        getUserType:(state,list)=>{
            if(state.hasOwnProperty(list.name)){
                return state[list.name][list.type]
            }
            return '';
        }
    }
};

export default store