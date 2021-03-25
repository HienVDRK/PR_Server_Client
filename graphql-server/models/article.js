'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Article extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Article.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    summary: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false
  }
  }, {
    sequelize,
    modelName: 'Article',
  });
  Article.associate = function (models) {
    Article.belongsTo(models.Category, { foreignKey: 'categoryId' })
  }
  return Article;
};