import request from 'axios'

export default {
  async listByLikeStr (str) {
    let res = await request.get(`knowledge/listByLikeStr?likeStr=${str}`)
    return res
  }
}
