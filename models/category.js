/* jshint indent: 2 */
'use strict';
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('category', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    key: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    parent_id: {
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
    tableName: 'category',
  });
};
