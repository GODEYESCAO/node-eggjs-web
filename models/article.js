/* jshint indent: 2 */
'use strict';
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('article', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    author: {
      type: DataTypes.STRING(64),
      allowNull: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    cover: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    category_id: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    browse: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: '0',
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    deleted_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  }, {
    tableName: 'article',
  });
};
