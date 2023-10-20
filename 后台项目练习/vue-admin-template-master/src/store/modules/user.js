import { login, logout, getInfo } from "@/api/user";
import { getToken, setToken, removeToken } from "@/utils/auth";
//路由模块中重置路由的方法
import { resetRouter ,anyRoutes,asyncRoutes,constantRoutes} from "@/router";
import router from "@/router";
const getDefaultState = () => {
  return {
    //获取token()
    token: getToken(),
    //存储用户名
    name: "",
    //存储用户头像
    avatar: "",
    //服务器返回的菜单信息【根据不同的角色，返回的标记信息，数组里面的元素是字符串】
    routes:[],
    //角色信息
    roles:[],
    //按钮权限的信息
    buttons:[],
    //对比之后【项目中已有的异步路由，与服务器返回的标记信息进行对比最终需要展示的路由】
    resultAsyncRoutes:'',
    //最终用户需要展示的全部路由
    resultAllRoutes:[]
  };
};

const state = getDefaultState();

const mutations = {
  //重置set
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState());
  },
  //存储token
  SET_TOKEN: (state, token) => {
    state.token = token;

  },
  //存储用户信息
  SET_USERINFO:(state,userinfo)=>{
    //用户名
      state.name=userinfo.name;
      //用户头像
      state.avatar=userinfo.avatar;
      //菜单权限标记
      state.routes=userinfo.routes;
      //按钮权限标记
      state.buttons=userinfo.buttons;
      //角色
      state.roles=userinfo.roles;
  },
  //
  //最终计算出的异步路由
  SET_RESULTASYNCROUTES:(state,asyncRoutes)=>{
    //vuex保存当前用户的异步路由，注意，一个用户需要展示完成路由：常量、异步、任意路由
    state.resultAsyncRoutes = asyncRoutes;
    //计算出当前用户需要展示所有路由
    state.resultAllRoutes = constantRoutes.concat(state.resultAsyncRoutes,anyRoutes);
    //给路由器添加新的路由
    console.log('resultAllRoutes',state.resultAllRoutes)
    console.log('resultAsyncRoutes',state.resultAsyncRoutes);
    console.log('anyRoutes',anyRoutes);
     router.addRoutes(state.resultAllRoutes)
 }
};
const actions = {
  // user login
 async login({ commit }, userInfo) {
    const { username, password } = userInfo;
    let result = await login({ username: username.trim(), password: password });
    console.log(result, 1111);
    if (result.code == 20000 || result.code == 200) {
      commit("SET_TOKEN", result.data.token);
      setToken(result.data.token,'tokentokentoken8888888888888');
      return "ok";
    } else {
      return Promise.reject(new Error("faile"));
    }
    //   return new Promise((resolve, reject) => {
    //     login({ username: username.trim(), password: password }).then(response => {
    //       console.log(response,'1111111');
    //     const { data } = response
    //     commit('SET_TOKEN', data.token)
    //     setToken(data.token)
    //     resolve()
    //   }).catch(error => {
    //     reject(error)
    //   })
    // })
  },

  // get user info
  async getInfo({ commit, state }) {
    let result = await getInfo(state.token);
    console.log(result,'result');
    if (result.code == 20000 || result.code == 200) {
    console.log(result.data.routes,'result1111111111111111');
      commit("SET_USERINFO",result.data);
      commit("SET_RESULTASYNCROUTES",computedAsyncRoutes(asyncRoutes,result.data.routes));
      return "ok";
    } else {
      return Promise.reject(new Error("faile"));
    }
    // return new Promise((resolve, reject) => {
    //   getInfo(state.token).then(response => {
    //     const { data } = response
    //     if (!data) {
    //       return reject('Verification failed, please Login again.')
    //     }

    //     const { name, avatar } = data

    //     commit('SET_NAME', name)
    //     commit('SET_AVATAR', avatar)
    //     resolve(data)
    //   }).catch(error => {
    //     reject(error)
    //   })
    // })
  },

  // user logout
   logout({ commit, state }) {
    // let result = await logout(state.token);
    // if (result.code == 20000 || result.code == 200) {
    //   removeToken();
    //   resetRouter();
    //   commit("RESET_STATE");
    //   return "ok";
    // } else {
    //   return Promise.reject(new Error("faile"));
    // }
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise((resolve) => {
      removeToken(); // must remove  token  first
      commit("RESET_STATE");
      resolve();
    });
  },
};
//定义一个函数，两个数组进行对比，对比当前用户到底展示那些异步路由
const computedAsyncRoutes = (asyncRoutes,routes)=>{
  //过滤出当前用户【超级管理|普通员工】需要展示的异步路由
 return asyncRoutes.filter(item=>{
      //数组当中没有这个元素返回索引值-1，如果有这个元素返回的索引值一定不是-1 
     if(routes.indexOf(item.name)!=-1){
       //递归:别忘记还有2、3、4、5、6级路由
       if(item.children&&item.children.length){
           item.children = computedAsyncRoutes(item.children,routes);
       }
       return true;
     }
  })
}
export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
