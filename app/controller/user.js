'use strict';

// const Controller = require('egg').Controller;

const Controller = require('../core/base_controller');
class userController extends Controller {
  async info() {
    const { ctx, app } = this;
    console.log(ctx.params);
    const userId = ctx.params.id;
    const userInfo = await ctx.service.user.find(userId);
    this.success(userInfo);
  }
  async list() {
    const { ctx, app } = this;
    // const result = await ctx.model.User.findAll();
    // this.success(result);
  }
  async edit() {
    const { ctx, app } = this;
    console.log(ctx.query, ctx.queries);
    ctx.body = {
      name: `eidt user:${ctx.query.name}`,
    };
  }
  // 登录
  async login() {
    const { ctx, app } = this;
    const result = await ctx.service.user.checkUser(ctx.request.body);
    this.success(result);
  }
  // 注册
  async register() {
    const { ctx, app } = this;
    const result = await ctx.service.user.registerkUser(ctx.request.body);
    this.success(result);
  }
  // 注册
  async auth() {
    const { ctx, app } = this;
    const token = ctx.request.header.authorization.split(' ')[1];
    const userinfo = app.jwt.verify(token, app.config.jwt.secret);
    const result = await ctx.service.user.findname(userinfo);
    console.log(userinfo);
    this.success(result);
  }
}

module.exports = userController;
