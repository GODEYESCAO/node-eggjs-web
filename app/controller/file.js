'use strict';
const Controller = require('./../core/base_controller');
class FileController extends Controller {
  async create() {
    // 上传头像的,会在uploads文件夹下有个avatar的文件夹下面才是2019、06、21
    const { url, fields } = await this.uploadFile('avatar');
    console.log(7, url, fields);
    if (url) {
      const _url = url.replace(/\\/g, '/');
      console.log(10, _url);
      this.success({ data: _url });
    }
    // const result = await 服务层;

  }
}

module.exports = FileController;
