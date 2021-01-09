const { sequelize } = require("../../models");
const db = require("../../models");
const user = db.user;
const game = db.game;
const history = db.history;

module.exports = {
  // get history
  getHistory: (req, res) => {
    const id = req.params.id;

    history
      .findAll({
        where: { user_id: id },
        include: {
          model: user,
          attributes: {
            exclude: [
              "password",
              "email",
              "birthdate",
              "address",
              "createdAt",
              "updatedAt",
            ],
          },
        },
      })
      .then((data) => {
        if (data.length != 0) {
          res.status(200).send(data);
        } else {
          res.status(200).send({
            message: `history user_id=${id} unavailable`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || `no user history user_id=${id}`,
        });
      });
  },

  // score user berdasarkan user id dan game yang dimainkan serta juga total score di game tersebut
  scoreSummary: (req, res) => {
    var user_id = req.params.id
    history.findAll({
        include:[
          {
            model: user,
            attributes: ["username"],
          },
          {
            model: game,
            attributes: ['name']
          }
        ],
        attributes: [
          ["game_id", "game_id"],
          "user_id",
          [sequelize.fn("sum", sequelize.col("high_score")), "totalscore"],
        ],
        group: ["game_id", "user_id", "username", "name", "user.id", "game.id"],
        having: { user_id: user_id },
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "error retrieving score summary from user with id="+user_id
      })
    })
  },

  // 3 top score setiap game
  topScore: (req, res) => {
    var game_id = req.params.id
    history.findAll({
        include:[
          {
            model: user,
            attributes: ['username']
          },
          {
            model: game,
            attributes: [["name", "name"]],
          },
        ],
        attributes: [
          ["game_id", "game_id"],
          "user_id",
          [sequelize.fn("sum", sequelize.col("high_score")), "totalscore"],
        ],
        group: [
          "username",
          "game_id",
          "user_id",
          "username",
          "name",
          "user.id",
          "game.id",
        ],
        having: { game_id: game_id },
        order: sequelize.literal("totalscore DESC"),
        limit: 3,
      })
      .then((data) => {
        if (!data) {
          return res.status(401).send({
            message: "top score not found",
          });
        }

      if (data == "") {
        return res.status(401).send({
          message: "top score is empty"
        })
      }

      res.status(200).send({
        status: "success",
        data
      })
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "error retrieving top score from game with id="+game_id
      })
    })
  }
};
