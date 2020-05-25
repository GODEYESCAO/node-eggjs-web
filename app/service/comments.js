'use strict';
const Service = require('egg').Service;
class UserService extends Service {
  // 分类列表
  async find(params) {
    const result = await this.app.mysql.select('comments', {
      limit: 10, // 返回数据量
      offset: (params.page - 1) * 10, // 数据偏移量
    });
    if (result) return { data: { data: result, meta: { total: result.length, per_page: 10, current_page: Number(params.page) } }, code: 0, msg: '请求成功！' };
    return { code: 1, msg: '请求失败' };
  }
  async delete(id) {
    const result = await this.app.mysql.delete('comments', { id });
    if (result.affectedRows === 1) return { data: result, code: 0, msg: '删除成功！' };
    return { code: 1, msg: '删除失败' };
  }
}
module.exports = UserService;
