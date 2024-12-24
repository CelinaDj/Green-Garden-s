// models/Transaction.js
const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const User = require("./user");
const Bouquet = require("./bouquet");

const Transaction = sequelize.define(
  "Transaction",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    price: { type: DataTypes.FLOAT, allowNull: false },
  },
  {
    tableName: "transaction",
    timestamps: false,
  }
);

Transaction.belongsTo(User, { foreignKey: "userId", as: "user" });
Transaction.belongsTo(Bouquet, { foreignKey: "bouquetId", as: "bouquet" });

module.exports = Transaction;
