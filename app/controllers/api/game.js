const model = require("../../models")
const Game = model.games
const GameAsset = model.game_assets
const Op = model.Sequelize.Op

module.exports = {
    // fetch all game
    index: (req, res) => {
        const name = req.query.name
        var condition = name ? { name: { [Op.iLike]: `%${name}%` } } : null

        Game.findAll({ 
            where: condition,
            attributes: { exclude:['createdAt','updatedAt'] },
            order: [['name', 'ASC']]
        })
        .then(data => {
            res.status(200).send({
                status: "success",
                data
            })
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error ocurred while retrieving game"
            })
        })
    },

    // fetch one game by id
    show: (req, res) => {
        const id = req.params.id

        Game.findByPk(id,{
            include: [
                {
                    model: GameAsset,
                    attributes: { exclude:['createdAt','updatedAt'] }
                }
            ],
            attributes: { exclude:['createdAt','updatedAt'] }
        })
        .then(data => {
            if (!data) {
                return res.status(401).send({
                    status: 'failed',
                    message: 'Game not found.'
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
                    err.message || "Error retrieving game with id="+ id
            })           
        })
    },

    // create game 
    // create: (req,res) => {
    //     // validate game id request
    //     if (!req.body.name) {
    //         res.status(400).send({
    //             message: "Content game name cannot be empty"
    //         })
    //         return
    //     }

    //     // new game 
    //     const new_game = {
    //         name: req.body.name,
    //         description: req.body.description,
    //         images: req.body.images
    //     }

    //     // save new game  to database
    //     Game.create(new_game)
    //     .then(
    //         res.status(200).send({
    //             status: "success",
    //             message: "Game successfully added"
    //         })
    //     )
    //     .catch(err => {
    //         res.status(500).send({
    //             message:
    //                 err.message || "Some error occured while creating the game"
    //         })
    //     })
    // },

    // // update game 
    // update: (req, res) => {
    //     const id = req.params.id
    
    //     Game.update(req.body, {
    //         where: {id: id}
    //     })
    //     .then(num => {
    //         if (num == 1) {
    //             res.send({
    //                 message: "Game was updated successfully"
    //             })
    //         } else {
    //             res.send({
    //                 message: `Cannot update game with id=${id}. Maybe game was not found`
    //             })
    //         }
    //     })
    //     .catch(err => {
    //         res.status(500).send({
    //             message: "Error updating game with id="+id
    //         })
    //     })
    // },

    // // delete game 
    // delete : (req, res) => {
    //     const {id} = req.params
    
    //     Game.destroy({
    //         where: {id: id}
    //     })
    //     .then(num => {
    //         if (num == 1) {
    //             res.send({
    //                 message: "Game was deleted successfully"
    //             })
    //         } else {
    //             res.send({
    //                 message: `Cannot delete game with id=${id}. Maybe game was not found`
    //             })
    //         }
    //     })
    //     .catch(err => {
    //         res.status(500).send({
    //             message: "Could not delete game with id="+id                
    //         })
    //     })
    // }
}