import fetch from './fetch';

export default {
  // 获取文章列表
  list(params) {
    return fetch.get('/web/article/list', params)
  },

  // 搜索文章列表
  search(params) {
    return fetch.get('/search/article', params)
  },

  // 获取文章详情
  detail(id) {
    return fetch.get('/web/article/detail/' + id);
  }
}
