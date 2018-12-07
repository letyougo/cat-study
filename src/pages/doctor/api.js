import request from 'axios'

export default {
  async listByLikeStr (str) {
    let res = await request.get(`/knowledge/listByLikeStr?likeStr=${str}`)
    return res
  },
  async listHistoryLearnCase (params) {
    let res = await request.get(`/knowledge/listHistoryLearnCase`, { params })
    return res
  },
  async generateMockCase (params) {
    let res = await request.get(`/knowledge/generateMockCase`, { params })
    return res
  },
  async addLearnCaseId (params) {
    let res = await request.post(`/knowledge/addLearnCaseId`, params)
    return res
  },
  async searchOpt (params) {
    let res = await request.get(`/searchOpt`, { params })
    return res
  },
  async search (params) {
    let res = await request.get(`/search`, { params })
    return res
  }

}
