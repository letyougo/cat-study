import request from 'axios'
import Vue from 'vue'
import qs from 'qs'
import App from '../App'
request.defaults.baseURL = 'http://39.104.82.5:8080'

request.interceptors.request.use(function (config) {
  return config
}, function (error) {
  App.$message.error(error)
})
request.interceptors.response.use(function (res) {
  // if (res.headers.token && res.headers.token === 'timeout') {
  //   window.location.hash = '/account'
  // }
  let { code, desc } = res.data
  if (code !== 200) {
    App.$message.error(code)
  }
  return res
})

const api = {
  account: {
    async login (data) {
      const url = '/login'
      let res = await request.post(`${url}?phoneNum=${data.phoneNum}&password=${data.password}`)
      let { data: { data: { token } } } = res
      window.localStorage.setItem('cat-study-token', token)
      return res
    }
  },
  // 病例
  case: {
    async list (data) {
      const url = '/case/listByParam'
      let res = await request.get(url, { params: data })
      return res
    },
    item () {

    }
  }

}

export default {
  install: function (vue) {
    Vue.prototype.api = api
  }
}
