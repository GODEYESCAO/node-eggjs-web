'use strict';

const { Controller } = require('egg');
const fs = require('fs');
const path = require('path');
// 故名思意 异步二进制 写入流
const awaitWriteStream = require('await-stream-ready').write;
// 管道读入一个虫洞。
const sendToWormhole = require('stream-wormhole');
const dayjs = require('dayjs');

class BaseController extends Controller {
  get user() {
    return this.ctx.session.user;
  }

  success(data) {
    this.ctx.body = {
      success: true,
      code: data.code,
      msg: data.msg,
      data: data.data,
    };
  }

  notFound(msg) {
    msg = msg || 'not found';
    this.ctx.throw(404, msg);
  }

  // 上传文件的通用方法
  async uploadFile(category = '') {
    const stream = await this.ctx.getFileStream();
    // 基础的目录
    const uplaodBasePath = 'app/public/uploads';
    // 生成文件名
    const filename = `${Date.now()}${Number.parseInt(
      Math.random() * 1000
    )}${path.extname(stream.filename).toLocaleLowerCase()}`;
    // 生成文件夹
    const dirname = dayjs(Date.now()).format('YYYY/MM/DD');
    function mkdirsSync(dirname) {
      if (fs.existsSync(dirname)) {
        return true;
      }
      if (mkdirsSync(path.dirname(dirname))) {
        fs.mkdirSync(dirname);
        return true;
      }

    }
    mkdirsSync(path.join(uplaodBasePath, category, dirname));
    // 生成写入路径
    const target = path.join(uplaodBasePath, category, dirname, filename);
    // 写入流
    const writeStream = fs.createWriteStream(target);
    try {
      // 异步把文件流 写入
      await awaitWriteStream(stream.pipe(writeStream));
    } catch (err) {
      // 如果出现错误，关闭管道
      await sendToWormhole(stream);
      return {
        error: '错误',
      };
    }
    return {
      url: path.join('/public/uploads', category, dirname, filename),
      fields: stream.fields,
    };
  }
}
module.exports = BaseController;
