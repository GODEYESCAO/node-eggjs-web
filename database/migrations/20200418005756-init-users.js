'use strict';

module.exports = {
  // 在执行数据库升级时调用的函数，创建 users 表
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING } = Sequelize;
    await queryInterface.createTable('users', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      name: STRING(30),
      age: INTEGER,
      created_at: DATE,
      updated_at: DATE,
    });
  },
  // 在执行数据库降级时调用的函数，删除 users 表
  down: async queryInterface => {
    await queryInterface.dropTable('users');
  },
};

// 'use strict';

// module.exports = app => {
//   const { STRING, INTEGER } = app.Sequelize;

//   const User = app.model.define('user',
//     {
//       userid: { type: INTEGER, primaryKey: true, autoIncrement: true },
//       username: STRING(50),
//       sex: STRING(4),
//       userpass: STRING(32),
//     },
//     {
//       freezeTableName: true, // Model 对应的表名将与model名相同
//       timestamps: false,
//     }
//   );

//   return User;
// };
