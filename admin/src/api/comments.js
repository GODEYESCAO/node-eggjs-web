import fetch from './fetch';

export default {
  // 获取评论列表
  list(params) {
    return fetch.get('/comments/list', params);
  },
  // 删除评论
  destroy(id) {
    return fetch.post('/comments/delete/' + id);
  }
}
