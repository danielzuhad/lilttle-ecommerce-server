"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Transaction_Detail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transaction_Detail.belongsTo(models.Product, { foreignKey: "stock" });
    }
  }
  Transaction_Detail.init(
    {
      id_product: DataTypes.INTEGER,
      no_order: DataTypes.STRING,
      quantity: DataTypes.INTEGER,
      stock_product: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Transaction_Detail",
    }
  );
  return Transaction_Detail;
};
