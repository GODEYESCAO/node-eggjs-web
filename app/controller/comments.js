'use strict';
const Controller = require('../core/base_controller');
class CommentsController extends Controller {
  async list() {
    const { ctx, app } = this;
    const result = await ctx.service.comments.find(ctx.query);
    this.success(result);
  }
  async delete() {
    const { ctx, app } = this;
    const result = await ctx.service.comments.delete(ctx.params.id);
    this.success(result);
  }
}

module.exports = CommentsController;
