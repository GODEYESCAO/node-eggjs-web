'use strict';
const utility = require('utility');// 密码加密

const Service = require('egg').Service;
class UserService extends Service {
  // 默认不需要提供构造函数。
  // constructor(ctx) {
  //   super(ctx); 如果需要在构造函数做一些处理，一定要有这句话，才能保证后面 `this.ctx`的使用。
  //   // 就可以直接通过 this.ctx 获取 ctx 了
  //   // 还可以直接通过 this.app 获取 app 了
  // }
  async find(uid) {
    const user = await this.app.mysql.get('admin', { id: uid });
    console.log(user);
    return user;
  }

  async findname(userinfo) {
    const user = await this.app.mysql.get('admin', { email: userinfo.email });
    const pwd = utility.md5(userinfo.password);
    if (user && pwd == user.password) return { data: user, code: 0, msg: '校验成功！' };
    return { data: null, code: 1, msg: '校验失败！' };
  }

  // 检测用户是否存在
  async checkUser(userinfo) {
    const user = await this.app.mysql.get('admin', { email: userinfo.email });
    const pwd = utility.md5(userinfo.password);
    const token = this.app.jwt.sign({
      email: userinfo.email,
      password: userinfo.password,
    }, this.app.config.jwt.secret);
    if (user && pwd == user.password) return { data: { token }, code: 0, msg: '登录成功！' };
    return { code: 1, msg: '密码错误' };
  }

  // 注册用户
  async registerkUser(userinfo) {
    const Row = {
      nickname: userinfo.nickname,
      password: utility.md5(userinfo.password1),
      email: userinfo.email,
    };
    const check = await this.getUser(userinfo.email);
    if (check) return { msg: '该邮箱已被注册！', code: 1 };
    const result = await this.app.mysql.insert('admin', Row);
    if (result.affectedRows === 1) return { msg: '创建用户成功！', code: 0 };
    return { msg: '创建用户失败！', code: 1 };
  }

  // 查询user表，验证密码和花名
  async validUser(nickname, password) {
    const data = await this.getUser();
    const pwd = utility.md5(password);
    if (data.email == nickname && data.password === pwd) return true;
    return false;
  }

  // 获取用户，不传id则查询所有
  async getUser(email) {
    const user = await this.app.mysql.get('admin', { email });
    if (user) return user;
    return 0;
  }
}
module.exports = UserService;
