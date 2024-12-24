const sequelize = require("../db");

const Fleur = require("./fleur");
const Bouquet = require("./bouquet");
const BouquetFleur = require("./bouquetFleur");
const User = require("./user");
const Transaction = require("./transaction");

Bouquet.belongsToMany(Fleur, {
  through: BouquetFleur,
  as: "fleurs",
  foreignKey: "bouquetId",
});
Fleur.belongsToMany(Bouquet, {
  through: BouquetFleur,
  as: "bouquets",
  foreignKey: "fleurId",
});

User.belongsToMany(Bouquet, {
  through: "UserLikes",
  as: "likedBouquets",
  foreignKey: "userId",
});
Bouquet.belongsToMany(User, {
  through: "UserLikes",
  as: "likedBy",
  foreignKey: "bouquetId",
});

module.exports = {
  sequelize,
  Fleur,
  Bouquet,
  BouquetFleur,
  User,
  Transaction,
};
