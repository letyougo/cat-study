import request from 'axios'
import moment from 'moment'
import Vue from 'vue'
import App from '../main'
request.defaults.baseURL = 'http://39.104.82.5:8080'

request.interceptors.request.use(
  function (req) {
    console.log('api', 'kongdong')
    return req
  },
  function (error) {
    App.$message.error(error)
  }
)
request.interceptors.response.use(function (res) {
  if (res.headers.token && res.headers.token === 'timeout') {
    window.location.hash = '/account'
  }
  let { code, desc } = res.data
  if (code !== 200) {
    return App.$message.error(desc)
  }
  return res
})

export default {
  check: {
    async addReport (caseId, data) {
      const url = `/check/addReport?caseId=${caseId}`
      const res = await request.post(url, data)
      return res
    }
  }
}
