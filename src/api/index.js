import request from 'axios'
import Vue from 'vue'
import qs from 'qs'
import App from '../main'
request.defaults.baseURL = 'http://39.104.82.5:8080'

request.interceptors.request.use(function (req) {
  if (req.method === 'post') {
    req.data = qs.stringify(req.data)
  }
  return req
}, function (error) {
  App.$message.error(error)
})
request.interceptors.response.use(function (res) {
  // if (res.headers.token && res.headers.token === 'timeout') {
  //   window.location.hash = '/account'
  // }
  let { code, desc } = res.data
  console.log(code, desc)
  if (code !== 200) {
    return App.$message.error(desc)
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
    },
    async list (data) {
      const url = '/sysUser/listUserWithRole'
      let res = await request.get(url, { params: data })
      return res
    },
    async post (data) {
      const url = '/sysUser/addUser'
      let res = await request.post(url, data)
      return res
    },
    async del (data) {
      const url = '/sysUser/deleteUser '
      let res = await request.post(url, data)
      return res
    }
  },

  // 角色
  role: {
    async list () {
      const url = '/sysRole/listRoleWithPerm'
      let res = await request.get(url)
      return res
    },
    async add (data) {
      const url = '/sysUser/addRoleForUser'
      let res = await request.post(url, data)
      return res
    },
    async del (data) {
      const url = '/sysUser/deleteRoleForUser'
      let res = await request.post(url, data)
      return res
    },
    async update (data) {
      const url = '/sysUser/updateUser'
      let res = await request.post(url, data)
      return res
    }
  },
  // 权限
  perm: {
    async list () {
      const url = '/sysPermission/listPermissionByParam'
      let res = await request.get(url)
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
  },
  // 药品
  med: {
    async list (data) {
      const url = '/medicine/listByParam'
      let res = await request.get(url, { params: data })
      return res
    }
  },
  // 医院
  hospital: {
    async list (data) {
      const url = '/hospital/listByParam'
      let res = await request.get(url, { params: data })
      return res
    }
  }

}

export default {
  install: function (vue) {
    Vue.prototype.api = api
    Vue.prototype.tip = function (code, succ, err, cb) {
      if (code === 200) {
        this.$message.success(succ)
        cb()
      } else {
        this.$message.error(err)
      }
    }
  }
}
