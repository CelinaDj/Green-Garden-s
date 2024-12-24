const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const BouquetFleur = sequelize.define("BouquetFleur", {
  quantity: { type: DataTypes.INTEGER, allowNull: false },
});

module.exports = BouquetFleur;
