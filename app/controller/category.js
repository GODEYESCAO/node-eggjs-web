'use strict';
const Controller = require('../core/base_controller');
class CategoryController extends Controller {
  async list() {
    const { ctx, app } = this;
    const result = await ctx.service.category.find(ctx.query);
    this.success(result);
  }
  async create() {
    const { ctx, app } = this;
    const result = await ctx.service.category.create(ctx.request.body);
    this.success(result);
  }
  async detail() {
    const { ctx, app } = this;
    const result = await ctx.service.category.detail(ctx.query);
    this.success(result);
  }
  async edit() {
    const { ctx, app } = this;
    const result = await ctx.service.category.edit(ctx.request.body);
    this.success(result);
  }
  async delete() {
    const { ctx, app } = this;
    const result = await ctx.service.category.delete(ctx.request.body);
    this.success(result);
  }
}

module.exports = CategoryController;
