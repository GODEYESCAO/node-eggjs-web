// /* jshint indent: 2 */
'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE, TEXT } = app.Sequelize;
  const article = app.model.define('article', {
    id: {
      type: INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: STRING(255),
      allowNull: true,
    },
    author: {
      type: STRING(64),
      allowNull: true,
    },
    content: {
      type: TEXT,
      allowNull: true,
    },
    cover: {
      type: STRING(255),
      allowNull: true,
    },
    category_id: {
      type: STRING(255),
      allowNull: true,
    },
    browse: {
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
  return article;
};
