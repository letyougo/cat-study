import request from 'axios'

export default {
  symptom: {
    async listSymptomCheck (params) {
      const url = '/manager/symptom/listSymptomCheck'
      const res = await request.get(url, { params })
      return res
    },
    async getCheck (params) {
      const url = '/manager/symptom/getCheck'
      const res = await request.get(url, { params })
      return res
    },
    async add (data) {
      const url = '/manager/symptom/add'
      const res = await request.post(url, data)
      return res
    },
    async update (id, data) {
      const url = `/manager/symptom/update?id=${id}`
      const res = await request.post(url, data)
      return res
    },
    async del (id, data) {
      const url = `/manager/symptom/delete?id=${id}`
      const res = await request.get(url, data)
      return res
    }
  },
  operation: {
    async list (params) {
      const url = '/operation/listByParam'
      const res = await request.get(url, { params })
      return res
    },
    async update (data) {
      const url = '/operation/update'
      delete data.createTime
      delete data.updateTime
      const res = await request.post(url, data)
      return res
    },
    async del (id) {
      const url = `/operation/delete?id=${id}`
      const res = await request.get(url)
      return res
    },
    async add (data) {
      const url = '/operation/add'
      const res = await request.post(url, data)
      return res
    }
  }
}
