import axios from 'axios'
import store from './store'
import router from './router'

// HTTP 请求拦截器
axios.interceptors.request.use(config => {
  if (store.state.token) {
    // 在发送请求之前做些什么
    // 获取token, 并添加到 headers 请求头中
    config.headers.token = store.state.token
  }
  return config
})

// HTTP 响应拦截器
// 统一处理 401 状态
axios.interceptors.response.use(
  response => {
    // 响应成功
    if (response.status === 200) {
      const data = response.data
      if (data.code === -1) {
        clearHandler()
      }
    }
    return response
  },
  err => {
    // 响应失败
    if (err.response.status === 401) {
      clearHandler()
    }
  }
)

function clearHandler() {
  store.commit('setToken', '')
  localStorage.removeItem('token')
  router.push({
    path: '/login',
    query: {
      redirect: router.currentRoute.path
    }
  })
}
