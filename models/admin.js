/* jshint indent: 2 */
'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const admin = app.model.define('admin', {
    id: {
      type: INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    nickname: {
      type: STRING(255),
      allowNull: true,
    },
    email: {
      type: STRING(128),
      allowNull: true,
      unique: true,
    },
    password: {
      type: STRING(255),
      allowNull: true,
    },
    created_at: {
      type: DATE,
      allowNull: false,
    },
    updated_at: {
      type: DATE,
      allowNull: false,
    },
    deleted_at: {
      type: DATE,
      allowNull: true,
    },
  });

  return admin;
};

// module.exports = function(sequelize, DataTypes) {
//   return sequelize.define('admin', {
//     id: {
//       type: DataTypes.INTEGER(11),
//       allowNull: false,
//       primaryKey: true,
//       autoIncrement: true,
//     },
//     nickname: {
//       type: DataTypes.STRING(255),
//       allowNull: true,
//     },
//     email: {
//       type: DataTypes.STRING(128),
//       allowNull: true,
//       unique: true,
//     },
//     password: {
//       type: DataTypes.STRING(255),
//       allowNull: true,
//     },
//     created_at: {
//       type: DataTypes.DATE,
//       allowNull: false,
//     },
//     updated_at: {
//       type: DataTypes.DATE,
//       allowNull: false,
//     },
//     deleted_at: {
//       type: DataTypes.DATE,
//       allowNull: true,
//     },
//   }, {
//     tableName: 'admin',
//   });
// };
