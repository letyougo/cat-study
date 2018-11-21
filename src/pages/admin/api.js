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
    }
  }
}
