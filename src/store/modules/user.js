import { login, logout, getInfo } from '@/api/login'
import {findOneLogin,findOneLogout} from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import defAva from '@/assets/images/profile.jpg'

const useUserStore = defineStore(
  'user',
  {
    state: () => ({
      token: getToken(),
      name: '',
      avatar: '',
      roles: [],
      permissions: []
    }),
    actions: {
      // 登录
      login(userInfo) {
        const username = userInfo.username.trim()
        const password = userInfo.password
        const code = userInfo.code
        const uuid = userInfo.uuid
        return new Promise((resolve, reject) => {
          findOneLogin(userInfo).then(res => {
            // debugger
            setToken(res.data)
            this.token = res.data
            resolve()
          }).catch(error => {
            reject(error)
          })
        })
      },
      // 获取用户信息
      getInfo() {
        return new Promise((resolve, reject) => {
          getInfo().then(res => {
            const user = res.data.data
            const avatar = (user.avatar == "" || user.avatar == null) ? defAva : import.meta.env.VITE_HOST_URL + user.avatar; // 我们后端的上传图片不需要后缀import.meta.env.VITE_APP_BASE_API
            
            if(user.admin){ // 如果是超级管理员
                user.roleIds = ['admin']
                res.data.permissions = ["*:*:*"]
            }

            // console.log(user.roleIds,user.admin)
            
            if ((user.roleIds && user.roleIds.length > 0)||user.admin) { // 验证返回的roles是否是一个非空数组
              this.roles = user.roleIds
              this.permissions = res.data.permissions // 直接给予最高权限，后台会进行隐藏处理，接口也会设置判断
            } else {
              this.setRoutes = ['ROLE_DEFAULT']
            }
            this.name = user.userName
            this.avatar = avatar;
            resolve(res)
          }).catch(error => {
            reject(error)
          })
        })
      },
      // 退出系统
      logOut() {
        return new Promise((resolve, reject) => {
          findOneLogout(this.token).then(() => {
            this.token = ''
            this.roles = []
            this.permissions = []
            removeToken()
            resolve()
          }).catch(error => {
            reject(error)
          })
        })
      }
    }
  })

export default useUserStore
