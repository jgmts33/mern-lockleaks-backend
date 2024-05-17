import config from "../config/db.config.js";

import { DataTypes, Sequelize } from "sequelize";

import userModel from "./user.model.js";
import roleModel from "./role.model.js";
import refreshTokenModel from "./refreshToken.model.js";
import basicKeywordsModel from "./basic-keywords.model.js";
import customKeywordsModel from "./custom-keywords.model.js";
import scrapeSummaryModel from "./scrap-summary.model.js";
import usernamesModel from "./usernames.model.js";
import dmcaImagesModel from "./dmca-images.model.js";

const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    pool: {
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = userModel(sequelize, Sequelize);
db.role = roleModel(sequelize, Sequelize);
db.refreshToken = refreshTokenModel(sequelize, Sequelize);
db.basicKeywords = basicKeywordsModel(sequelize, Sequelize);
db.customKeywords = customKeywordsModel(sequelize, Sequelize);
db.scrapeSummary = scrapeSummaryModel(sequelize, Sequelize);
db.usernames = usernamesModel(sequelize, Sequelize);
db.dmcaImages = dmcaImagesModel(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});

db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});

db.refreshToken.belongsTo(db.user, {
  foreignKey: 'userId', targetKey: 'id'
});
db.user.hasOne(db.refreshToken, {
  foreignKey: 'userId', targetKey: 'id'
});

db.ROLES = ["user", "admin", "moderator"];

export default db;