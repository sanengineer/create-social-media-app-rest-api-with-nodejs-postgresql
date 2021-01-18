const { Sequelize } = require("../../../models");
const db = require("../../../models");
const User = db.user;
const Follow = db.follow;
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
    following: (req, res) => {
        try{
            following_id = req.body.following_id;
            follower_id = req.body.follower_id;
            // new Love post
            const new_follower = {
                following_id: following_id,
                follower_id: follower_id,
            }
            console.log(new_follower);
            // save new Love to database
            Love.create(new_follower)
            .then(
                res.status(200).send({
                    status: "success",
                    message: `Following user with ${following_id} successfully !`
                })
            )
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occured while following user"
                })
            })
            
        }catch(err){
            console.log('An error you know ? :D');
        }  
    },
    
    // unfollowing user 
    unfollowing : (req, res) => {
        following_id = req.body.following_id;
        follower_id = req.body.follower_id;

        Post.destroy({
            where: Sequelize.and(
                {following_id: req.body.following_id},
                {follower_id: req.body.follower_id}
            )
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Unfollow user successfully"
                })
            } else {
                res.send({
                    message: `Cannot unfollow user `
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Post with id="+id                
            })
        })
    }
};
