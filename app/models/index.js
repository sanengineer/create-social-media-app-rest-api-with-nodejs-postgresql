"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/configDatabase.js")[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.user = require("./user")(sequelize, Sequelize);
db.post = require("./post")(sequelize, Sequelize);
db.comment = require("./comment")(sequelize, Sequelize);
db.love = require("./love")(sequelize, Sequelize);
db.storagefile = require("./storage-file")(sequelize, Sequelize);
db.storageimage = require("./storage-image")(sequelize, Sequelize);
db.storagevideo = require("./storage-video")(sequelize, Sequelize);

db.post.belongsTo(db.user, {
  foreignKey: {
    name: "user_id",
  },
});

db.comment.belongsTo(db.post, {
  foreignKey: {
    name: "post_id",
  },
});
db.comment.belongsTo(db.user, {
  foreignKey: {
    name: "user_id",
  },
});

db.love.belongsTo(db.post, {
  foreignKey: {
    name: "post_id",
  },
});

db.love.belongsTo(db.user, {
  foreignKey: {
    name: "user_id",
  },
});

db.storagefile.belongsTo(db.user, {
  foreignKey: {
    name: "user_id",
  },
});

db.storagevideo.belongsTo(db.user, {
  foreignKey: {
    name: "user_id",
  },
});

db.storageimage.belongsTo(db.user, {
  foreignKey: {
    name: "user_id",
  },
});

module.exports = db;
