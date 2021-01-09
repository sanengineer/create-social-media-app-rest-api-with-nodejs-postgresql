const model = require("../../models");
const GameAsset = model.game_assets;
const Game = model.games;
const Op = model.Sequelize.Op;

module.exports = {
  // fetch all game assets
  index: (req, res) => {
    const asset_name = req.query.asset_name;
    var condition = asset_name
      ? { asset_name: { [Op.iLike]: `%${asset_name}%` } }
      : null;

    GameAsset.findAll({ where: condition })
      .then((data) => {
        res.status(200).send({
          status: "success",
          data,
        });
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error ocurred while retrieving game asset",
        });
      });
  },

  // fetch one game asset by id
  show: (req, res) => {
    const id = req.params.id;

    GameAsset.findByPk(id)
      .then((data) => {
        if (!data) {
          return res.status(401).send({
            status: "failed",
            message: "Game Asset not found.",
          });
        }
        res.status(200).send({
          status: "success",
          data,
        });
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Error retrieving game asset with id=" + id,
        });
      });
  },

  // create game asset
  // create: (req,res) => {
  //     gameId = req.body.game_id
  //     // validate game id request
  //     if (!gameId) {
  //         res.status(400).send({
  //             message: "Content game_id cannot be empty"
  //         })
  //         return
  //     }
  //     // new game asset
  //     const new_game_asset = {
  //         game_id: gameId,
  //         asset_name: req.body.asset_name,
  //         images: req.body.images
  //     }

  //     // validate game id on games table found
  //     Game.findByPk(gameId)
  //     .then(data => {
  //         // game id is not found
  //         if (!data) {
  //             return res.status(401).send({
  //                 status: 'failed',
  //                 message: 'Game id not found.'
  //             })
  //         }
  //         // game id is available
  //         // save new game asset to database
  //         GameAsset.create(new_game_asset)
  //         .then(
  //             res.status(200).send({
  //                 status: "success",
  //                 message: "Game Asset successfully added"
  //             })
  //         )
  //         .catch(err => {
  //             res.status(500).send({
  //                 message:
  //                     err.message || "Some error occured while creating the game asset"
  //             })
  //         })
  //     })
  //     .catch(err => {
  //         res.status(500).send({
  //             message:
  //                 err.message || "Error retrieving game with id="+ id
  //         })
  //     })
  // },

  // // update game asset
  // update: (req, res) => {
  //     const id = req.params.id

  //     GameAsset.update(req.body, {
  //         where: {id: id}
  //     })
  //     .then(num => {
  //         if (num == 1) {
  //             res.send({
  //                 message: "Game asset was updated successfully"
  //             })
  //         } else {
  //             res.send({
  //                 message: `Cannot update game asset with id=${id}. Maybe game asset was not found`
  //             })
  //         }
  //     })
  //     .catch(err => {
  //         res.status(500).send({
  //             message: "Error updating game asset with id="+id
  //         })
  //     })
  // },

  // // delete game asset
  // delete : (req, res) => {
  //     const {id} = req.params

  //     GameAsset.destroy({
  //         where: {id: id}
  //     })
  //     .then(num => {
  //         if (num == 1) {
  //             res.send({
  //                 message: "Game asset was deleted successfully"
  //             })
  //         } else {
  //             res.send({
  //                 message: `Cannot delete game asset with id=${id}. Maybe game asset was not found`
  //             })
  //         }
  //     })
  //     .catch(err => {
  //         res.status(500).send({
  //             message: "Could not delete game asset with id="+id
  //         })
  //     })
  // }
};
