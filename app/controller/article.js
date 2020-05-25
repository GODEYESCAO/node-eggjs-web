'use strict';
const Controller = require('../core/base_controller');
class ArticleController extends Controller {
  async list() {
    const { ctx, app } = this;
    const result = await ctx.service.article.find(ctx.query);
    this.success(result);
  }
  async create() {
    const { ctx, app } = this;
    const result = await ctx.service.article.create(ctx.request.body);
    this.success(result);
  }
  async detail() {
    const { ctx, app } = this;
    const result = await ctx.service.article.detail(ctx.query || ctx.params);
    this.success(result);
  }
  async webdetail() {
    const { ctx, app } = this;
    const result = await ctx.service.article.detail(ctx.params);
    this.success(result);
  }
  async updata() {
    const { ctx, app } = this;
    const result = await ctx.service.article.updata(ctx.request.body);
    this.success(result);
  }
  async delete() {
    const { ctx, app } = this;
    const result = await ctx.service.article.delete(ctx.params);
    this.success(result);
  }
}

module.exports = ArticleController;
