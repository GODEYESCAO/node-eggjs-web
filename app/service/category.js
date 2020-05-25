'use strict';
const Service = require('egg').Service;
class UserService extends Service {
  // 分类列表
  async find(params) {
    // `SELECT id,name,key,COUNT(category.id) AS article_nums FROM category LEFT JOIN article ON category.id=article.category_id
    // GROUP BY category.name WHERE name LIKE ?`
    // const result = await this.app.mysql.query('SELECT * FROM category WHERE name LIKE ?', [ `%${params.name}%` ]);
    const result = await this.app.mysql.query(`SELECT category.id,category.name,category.key,COUNT(article.category_id) AS article_nums FROM category LEFT JOIN article ON category.id=article.category_id where name LIKE ?
    GROUP BY category.name`, [ `%${params.name}%` ]);
    // const result = await this.app.model.Category.findAll();
    if (result) return { data: result, code: 0, msg: '请求成功！' };
    return { code: 1, msg: '请求失败' };
  }
  // 写入  article_nums
  async create(info) {
    info.created_at = new Date();
    const result = await this.app.mysql.insert('category', info);
    if (result.affectedRows === 1) return { data: result, code: 0, msg: '创建成功！' };
    return { code: 1, msg: '创建失败' };
  }
  async detail(info) {
    const result = await this.app.mysql.get('category', { id: info.id });
    if (result) return { data: result, code: 0, msg: '请求成功！' };
    return { code: 1, msg: '请求失败' };
  }
  async edit(info) {
    info.updated_at = new Date();
    const result = await this.app.mysql.update('category', info);
    if (result.affectedRows === 1) return { data: result, code: 0, msg: '编辑成功！' };
    return { code: 1, msg: '编辑失败' };
  }
  async delete(info) {
    const result = await this.app.mysql.delete('category', { id: info.id });
    if (result.affectedRows === 1) return { data: result, code: 0, msg: '删除成功！' };
    return { code: 1, msg: '删除失败' };
  }
}
module.exports = UserService;
