'use strict';

module.exports = {
  keys: 'WjX5dBddMgm5LPlfkTdtmtM0XoEFL2Cx',
  development: {
    reloadPattern: [ '**', '!**/*.ts' ],
  },
  view: {
    defaultViewEngine: 'nunjucks',
    mapping: {
      '.tpl': 'nunjucks',
    },
  },
  news: {
    pageSize: 5,
    serverUrl: 'https://hacker-news.firebaseio.com/v0',
  },

  middleware: [
    'robot',
  ],

  // security: {
  //   csrf: false,
  // },

  bodyParser: {
    jsonLimit: '1mb',
    formLimit: '1mb',
  },

  security: {
    csrf: {
      enable: false,
      ignoreJSON: true,
    },
    domainWhiteList: '*',
  },

  cors: {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  },

  multipart: {
    fileSize: '50mb',
    mode: 'stream',
    fileExtensions: [ '.xls', '.txt', '.jpg', '.png' ], // 扩展几种上传的文件格式
  },

  Session: {
    key: 'EGG_SESS', // 承载 Session 的 Cookie 键值对名字
    maxAge: 86400000, // Session 的最大有效时间
  },

  jwt: {
    secret: '165165',
  },
  sequelize: {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    database: 'boblog',
    username: 'root', // 数据库用户名
    password: 'root', // 数据库密码
    define: { // model的全局配置
      timestamps: false, // 添加create,update,delete时间戳
      paranoid: true, // 添加软删除
      freezeTableName: true, // 防止修改表名为复数
      underscored: false, // 防止驼峰式字段被默认转为下划线
    },
    // timezone: '+8:00', // 由于orm用的UTC时间，这里必须加上东八区，否则取出来的时间相差8小时
    // dialectOptions: { // 让读取date类型数据时返回字符串而不是UTC时间
    //   dateStrings: true,
    //   typeCast(field, next) {
    //     if (field.type === 'DATETIME') {
    //       return field.string();
    //     }
    //     return next();
    //   },
    // },
  },

  mysql: {
    // 单数据库信息配置
    client: {
      // host
      host: '127.0.0.1',
      // 端口号
      port: '3306',
      // 用户名
      user: 'root',
      // 密码
      password: 'root',
      // 数据库名
      database: 'boblog',
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  },
};

// keys = 'WjX5dBddMgm5LPlfkTdtmtM0XoEFL2Cx';

// exports.development = {
//   // don't reload when ts fileChanged
//   // https://github.com/sindresorhus/multimatch
//   reloadPattern: [ '**', '!**/*.ts' ],
// };

// // 添加 view 配置
// exports.view = {
//   defaultViewEngine: 'nunjucks',
//   mapping: {
//     '.tpl': 'nunjucks',
//   },
// };

// exports.news = {
//   pageSize: 5,
//   serverUrl: 'https://hacker-news.firebaseio.com/v0',
// };

// exports.middleware = [
//   'robot',
// ];

// exports.security = {
//   csrf: false,
// };

// exports.bodyParser = {
//   jsonLimit: '1mb',
//   formLimit: '1mb',
// };

// exports.security = {
//   csrf: {
//     enable: false,
//     ignoreJSON: true,
//   },
//   domainWhiteList: '*',
// };

// exports.cors = {
//   origin: '*',
//   allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
// };

// exports.multipart = {
//   fileSize: '50mb',
//   mode: 'stream',
//   fileExtensions: [ '.xls', '.txt', '.jpg', '.png' ], // 扩展几种上传的文件格式
// };

// exports.Session = {
//   key: 'EGG_SESS', // 承载 Session 的 Cookie 键值对名字
//   maxAge: 86400000, // Session 的最大有效时间
// };

// exports.jwt = {
//   secret: '165165',
// };

// exports.mysql = {
//   // 单数据库信息配置
//   client: {
//     // host
//     host: '127.0.0.1',
//     // 端口号
//     port: '3306',
//     // 用户名
//     user: 'root',
//     // 密码
//     password: 'root',
//     // 数据库名
//     database: 'boblog',
//   },
//   // 是否加载到 app 上，默认开启
//   app: true,
//   // 是否加载到 agent 上，默认关闭
//   agent: false,
// };
