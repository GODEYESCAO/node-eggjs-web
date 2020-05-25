/* jshint indent: 2 */
'use strict';
module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;
  const category = app.model.define('category', {
    id: {
      type: INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: STRING(255),
      allowNull: true,
    },
    key: {
      type: STRING(255),
      allowNull: true,
    },
    parent_id: {
      type: INTEGER(11),
      allowNull: true,
      defaultValue: '0',
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
  return category;
};
