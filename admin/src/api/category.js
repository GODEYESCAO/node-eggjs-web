import fetch from './fetch';

export default {
  // 获取分类列表
  list(params) {
    return fetch.get('/category/list', params)
  },

  // 更新分类
  update(params) {
    return fetch.post('/category/edit', params)
  },

  // 删除分类
  destroy(params) {
    return fetch.post('/category/delete',params)
  },

  // 分类详情
  detail(params) {
    return fetch.get('/category/detail', params);
  },

  // 创建分类
  create(params) {
    return fetch.post('/category/create', params);
  },

  // 查询分类ID下的所有文章列表
  article(params) {
    const {id} = params;
    delete params.id;

    return fetch.get('/category/' + id + '/article', params);
  }
}
