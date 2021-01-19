const { Sequelize } = require("../../../models");
const db = require("../../../models");
const Post = db.post;
const User = db.user;
const Love = db.love;
const sequelize = db.Sequelize;

module.exports = {
  // total loved per post by post id
  totalLove: (req, res) => {
    const post_id = req.params.post_id

    Love.findAndCountAll({ 
        where: {post_id: post_id},
        attributes: ['love_id', 'user_id']
    })
    .then(data => {
        if (data.count !== 0) {
          res.status(200).send({
              status: "success",
              data
          })
        } else{
          res.status(200).send({
            status: "success",
            message: "Love with post id : "+post_id+" is empty"
          })  
        }
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error ocurred while retrieving Love"
        })
    })
  },

  // list user loved per post by post id
  loveThisPost: (req, res) => {
    const post_id = req.params.post_id

    Love.findAll({ 
        where: {post_id: post_id},
        include: [
            {
                model: User,
                attributes: ['username', 'avatar']
            },
        ],
        attributes: ['love_id'],
        order: [['createdAt', 'ASC']]
    })
    .then(data => {
        if (data.length !== 0) {
          res.status(200).send({
              status: "success",
              data
          })
        } else{
          res.status(200).send({
            status: "success",
            message: "Love with post id : "+post_id+" is empty"
          })  
        }
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error ocurred while retrieving Love"
        })
    })
  },

  // create Love
  lovedPost: (req, res) => {
    try{
        postId = req.body.post_id;
        userId = req.body.user_id;
        Love.findAndCountAll({
            where: Sequelize.and(
                {user_id: userId},
                {post_id: postId},
            )
        })
        .then(data => {
            console.log(data);
            if (data.count === 0) {
                // new Love post
                const new_love = {
                    post_id: req.body.post_id,
                    user_id: userId,
                }
                console.log(new_love);
                // save new Love to database
                Love.create(new_love)
                .then(
                    res.status(200).send({
                        status: "success",
                        message: "Liked successful posts"
                    })
                )
                .catch(err => {
                    res.status(500).send({
                        message: err.message || "Some error occured while liked posts"
                    })
                })
            } else {
                res.status(200).send({
                  status: "Error",
                  message: `User with ${userId} already liked this`
                })  
            }
        })
    }catch(err){
        console.log('An error you know ? :D');
    }  
  },
};
