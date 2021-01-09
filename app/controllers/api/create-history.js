const { sequelize } = require("../../models");
const db = require("../../models");
const history = db.history;

module.exports = {
  //create history
  createHistory: (req, res) => {
    const addHistory = {
      user_id: req.body.user_id,
      game_id: req.body.game_id,
      high_score: req.body.high_score,
      last_play: sequelize.fn('NOW')
    };

    history
      .create(addHistory)
      .then(() => {
        res.send({
          success: true,
          message: "success create history",
        });
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "found error while creating history",
        });
      });
  },
};
