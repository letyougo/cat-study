import request from 'axios'
import moment from 'moment'
import Vue from 'vue'
import App from '../main'
request.defaults.baseURL = 'http://39.104.82.5:8080'

request.interceptors.request.use(
  function (req) {
    req.params = req.params || {}
    req.params.JSESSIONID = global.user.token

    if (req.method === 'post') {
      for (let key in req.data) {
        req.params[key] = req.data[key]
      }
    }
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

const queryUrl = (url, data) => {
  let list = []
  for (let key in data) {
    list.push(`${key}=${data[key]}`)
  }
  let str = list.join('&')
  str = url + '?' + str
  return str
}

const api = {

  // 通过症状，来做检查
  symptom: {
    async check (data) {
      const url = '/disease/listDiseaseBySymptom'
      const res = await request.get(url, { params: data })
      return res
    }
  },
  account: {
    async login (data) {
      const url = '/login'
      let res = await request.post(
        `${url}?phoneNum=${data.phoneNum}&password=${data.password}`
      )
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

  // 处方

  chufang: {
    async list (params) {
      const url = '/prescription/listByParam'
      let res = await request.get(url, { params })
      return res
    },
    async item () {

    },
    async add (data) {
      const url = '/prescription/add'
      let res = await request.post(url, data)
      return res
    },
    async update (data) {
      const url = '/prescription/update'
      let res = await request.post(url, data)
      return res
    },
    async del () {
      const url = '/prescription/delete'
      let res = await request.post(url, data)
      return res
    }
  },

  // 疾病
  ill: {
    async list (params) {
      const url = '/disease/listByParam'
      let res = await request.get(url, { params })
      return res
    },
    async item (params) {
      const url = '/disease/getById'
      let res = await request.get(url, { params })
      return res
    },
    async add (data) {
      const url = '/disease/add'
      let res = await request.post(url, data)
      return res
    },
    async update (data) {
      const url = '/disease/update'
      let res = await request.post(url, data)
      return res
    },
    async del (data) {
      const url = '/disease/delete'
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

  // 接诊
  caseVisit: {
    update (data) {
      const url = '/caseVisit/update'
      let res = request.post(queryUrl(url, data))
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
      data.isDeleted = false
      let res = await request.get(url, { params: data })
      return res
    },
    async item (data) {
      const url = '/case/getById'
      let res = await request.get(url, { params: data })
      return res
    },
    async add (data) {
      const url = '/case/add'
      let res = await request.post(url, data)
      return res
    },
    async update (data) {
      const url = '/case/update'
      let res = await request.post(url, data)
      return res
    },
    async del (data) {
      const url = '/case/delete'
      let res = await request.get(url, { params: data })
      return res
    }
  },

  hosmed: {
    async list (data) {
      const url = '/hospMedicine/listByParam'
      let res = await request.get(url, { params: data })
      return res
    },
    async add (data) {
      const url = '/hospMedicine/add'
      let res = await request.post(queryUrl(url, data))
      return res
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
  },
  // 接诊
  visit: {
    async list () {
      const url = '/visit/listAllItemWithOptions'
      let res = await request.get(url)
      let { data: { data } } = res

      return res
    },
    async item (data) {
      const url = '/caseVisit/getByCaseId'
      let res = await request.get(url, { params: data })
      return res
    }
  },
  // 检查
  disease: {
    list (params) {
      const url = '/disease/listDiseaseBySymptom'
      let res = request.get(url, { params })
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
    Vue.prototype.moment = moment
    Vue.prototype.config = {
      ghxm: [
        { name: '问诊', id: 1 },
        { name: '免疫', id: 2 },
        { name: '绝育/去势', id: 3 },
        { name: '驱虫', id: 4 },
        { name: '拔牙', id: 5 }
      ],
      ghzt: [
        { name: '待接诊', id: 1 },
        { name: '接诊中', id: 2 },
        { name: '检查中', id: 3 },
        { name: '已出检查结果', id: 4 }
      ]
    }
  }
}
