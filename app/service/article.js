'use strict';
const moment = require('moment');
const Service = require('egg').Service;
class UserService extends Service {
  // 分类列表
  async find(params) {
    if (!params.category_id) {
      const result = await this.app.mysql.query(`SELECT article.id,article.title,article.browse,article.created_at,COUNT(comments.article_id) AS comments_nums FROM article LEFT JOIN comments ON article.id=comments.article_id where category_id=? 
      GROUP BY article.title `, [ params.category_id ]);
      // const result = await this.app.mysql.query('select * from article join category on article.category_id=category.id where category_id=?', [ params.category_id ]);
      if (result) return { data: { data: result, meta: { total: result.length, per_page: 10, current_page: Number(params.page) } }, code: 0, msg: '请求成功！' };
      return { code: 1, msg: '请求失败' };
    }
    // console.log(12);
    const result = await this.app.mysql.query('select * from article join category on article.category_id=category.id');
    if (result) return { data: { data: result, meta: { total: result.length, per_page: 10, current_page: Number(params.page) } }, code: 0, msg: '请求成功！' };
    return { code: 1, msg: '请求失败' };
  }
  // 写入
  async create(info) {
    info.created_at = moment().format('YYYY-MM-DD H:mm');
    const result = await this.app.mysql.insert('article', info);
    const categoryResult = this.updataCategory(info.id, 'add');
    if (result.affectedRows === 1 && categoryResult) return { data: result, code: 0, msg: '创建成功！' };
    return { code: 1, msg: '创建失败' };
  }
  async detail(info) {
    console.log(info);
    const result = await this.app.mysql.get('article', { id: info.id });
    const results = await this.updataBrowse(info.id, result.browse);
    if (result && results) return { data: result, code: 0, msg: '请求成功！' };
    return { code: 1, msg: '请求失败' };
  }
  async updata(info) {
    // info.updated_at = new Date();
    info.updated_at = moment().format('YYYY-MM-DD H:mm');
    const result = await this.app.mysql.update('article', info);
    if (result.affectedRows === 1) return { data: result, code: 0, msg: '编辑成功！' };
    return { code: 1, msg: '编辑失败' };
  }
  async delete(info) {
    const result = await this.app.mysql.delete('article', { id: info.id });
    const categoryResult = this.updataCategory(info.id, 'delete');
    if (result.affectedRows === 1 && categoryResult) return { data: result, code: 0, msg: '删除成功！' };
    return { code: 1, msg: '删除失败' };
  }
  // 更新文章阅读次数
  async updataBrowse(id, browse) {
    const row = { id, browse: browse + 1 };
    const result = await this.app.mysql.update('article', row);
    if (result.affectedRows === 1) return true;
    return false;
  }
  // 更新文章次数
  async updataCategory(id, type) {
    const searchResult = await this.app.mysql.get('category', { id });
    const row = { articleNumber: type == 'add' ? searchResult.articleNumber + 1 : searchResult.articleNumber - 1 };
    const result = await this.app.mysql.update('category', row, { id });
    if (result.affectedRows === 1) return true;
    return false;
  }

}
module.exports = UserService;
