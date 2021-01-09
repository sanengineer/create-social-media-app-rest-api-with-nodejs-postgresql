const db = require("../../models");
const user = db.user;
const sequelize = db.Sequelize.literal;

module.exports = {
  // get profile public
  getProfile: (req, res) => {
    const id = req.params.id;

    user
      .findOne({
        where: { id: id },
        attributes: {
          exclude: [
            "password",
            "email",
            "birthdate",
            "address",
            "createdAt",
            "updatedAt",
            "id",
          ],
        },
        order: sequelize(["id ASC"]),
      })
      .then((data) => {
        if (data != null) {
          res.status(200).send(data);
        } else {
          res.status(200).send({
            message: `profile id=${id} unavailable`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || `no user profile id=${id}`,
        });
      });
  },

  // get profile private
  getProfilePrivate: (req, res) => {
    const id = req.params.id;

    user
      .findOne({
        where: { id: id },
        attributes: {
          exclude: ["password"],
        },
        order: sequelize(["id ASC"]),
      })
      .then((data) => {
        if (data != null) {
          res.status(200).send(data);
        } else {
          res.status(200).send({
            message: `profile id=${id} unavailable`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || `no user profile id=${id}`,
        });
      });
  },
};
