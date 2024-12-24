const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Fleur = sequelize.define("Fleur", {
  name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING },
  image: { type: DataTypes.STRING },
  price: { type: DataTypes.FLOAT, allowNull: false },
});

module.exports = Fleur;
