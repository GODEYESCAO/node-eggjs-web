import fetch from './fetch';

export default {
  // 获取文章列表
  list(params) {
    return fetch.get('/article/list', params)
  },

  // 搜索文章列表
  search(params) {
    return fetch.get('/search/article', params)
  }, 

  // 获取文章详情
  detail(params) {
    console.log(params)
    return fetch.get('/article/detail', params);
  },

  // 更新文章
  update(params) {
    return fetch.post('/article/update', params)
  },

  // 删除文章
  destroy(id) {
    return fetch.post('/article/delete/' + id)
  },

  // 创建文章
  create(params) {
    return fetch.post('/article/create', params);
  }
}
