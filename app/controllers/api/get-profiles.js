const db = require("../../models");
const user = db.user;
const history = db.history;
const sequelize = db.Sequelize.literal;

module.exports = {
  // get public profiles
  getProfiles: (req, res) => {
    user
      .findAll({
        attributes: {
          exclude: [
            "password",
            "email",
            "birthdate",
            "address",
            "createdAt",
            "updatedAt",
          ],
          order: sequelize(["id ASC"]),
        },
      })
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "error while retrive public users",
        });
      });
  },
};
