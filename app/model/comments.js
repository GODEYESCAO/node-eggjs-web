/* jshint indent: 2 */
'use strict';
module.exports = app => {
  const { STRING, INTEGER, DATE, TEXT } = app.Sequelize;
  const comments = app.model.define('comments', {
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
      type: STRING(255),
      allowNull: true,
    },
    content: {
      type: TEXT,
      allowNull: true,
    },
    article_id: {
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
  return comments;
};
