const db = require("../../../models");
const Post = db.post;
const User = db.user;
const Comment = db.comment;
const sequelize = db.Sequelize;

module.exports = {
  // fetch all post
  index: (req, res) => {
    const content = req.query.content
    var condition = content ? { content: { [Op.iLike]: `%${content}%` } } : null

    Comment.findAll({ 
        where: condition,
        include: [
            {
                model: User,
                attributes: ['username']
            },
            {
                model: Post,
                attributes: ['content']
            }
        ],
        order: [["createdAt", "DESC"]]
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
                err.message || "Some error ocurred while retrieving Comment"
        })
    })
  },

  // fetch all comment by post id
  getCommentByUser: (req, res) => {
    const post_id = req.params.id

    Comment.findAll({ 
        where: {post_id: post_id},
        include: [
            {
                model: User,
                attributes: ['username', 'avatar']
            }
        ],
        order: [["createdAt", "DESC"]]
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
            message: "Comment with post id : "+post_id+" is empty"
          })  
        }
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error ocurred while retrieving comment"
        })
    })
  },

  // fetch one Comment by id
  show: (req, res) => {
      const id = req.params.id

      Comment.findByPk(id,{
          include: [
            {
                model: User,
                attributes: ['username', 'avatar']
            },
            {
                model: Post,
                attributes: ['content', 'image']
            }
          ],
      })
      .then(data => {
          if (!data) {
              return res.status(401).send({
                  status: 'failed',
                  message: 'Comment not found.'
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
                  err.message || "Error retrieving Comment with id="+ id
          })           
      })
  },

  // create Comment
  create: (req, res) => {
    try{
        if (!req.body.content) {
            res.status(400).send({
                message: "Content comment cannot be empty!"
            })
            return
        }
    
        // new Comment
        const new_comment = {
            post_id: req.body.post_id,
            user_id: req.body.user_id,
            content: req.body.content,
        }
    
        // save new Comment to database
        Comment.create(new_comment)
        .then(
            res.status(200).send({
                status: "success",
                message: "Comment successfully created"
            })
        )
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occured while creating the Comment"
            })
        })
    }catch(err){
        console.log('An error you know ? :D');
    }  
  },
};
