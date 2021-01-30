const db = require("../../../models");
const Post = db.post;
const User = db.user;
const sequelize = db.Sequelize;
const cloudinary = require("../../../utils/cloudinary");

module.exports = {
  // fetch all post
  index: (req, res) => {
    const content = req.query.content;
    var condition = content
      ? { content: { [Op.iLike]: `%${content}%` } }
      : null;

    Post.findAll({
      where: condition,
      include: [
        {
          model: User,
          attributes: {
            exclude: [
              "user_id",
              "birthdate",
              "email",
              "password",
              "gender",
              "address",
              "createdAt",
              "updatedAt",
            ],
          },
        },
      ],
      order: [["createdAt", "DESC"]],
    })
      .then((data) => {
        res.status(200).send({
          status: "success",
          data,
        });
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error ocurred while retrieving Post",
        });
      });
  },

  // fetch all post by user id
  getPostByUser: (req, res) => {
    const user_id = req.params.id;

    Post.findAll({
      where: { user_id: user_id },
      include: [
        {
          model: User,
          attributes: {
            exclude: [
              "user_id",
              "birthdate",
              "email",
              "password",
              "gender",
              "address",
              "createdAt",
              "updatedAt",
            ],
          },
        },
      ],
      order: [["createdAt", "DESC"]],
    })
      .then((data) => {
        if (data.length !== 0) {
          res.status(200).send({
            status: "success",
            data,
          });
        } else {
          res.status(200).send({
            status: "success",
            message:
              "User with user id : " + user_id + " hasn't written a post yet",
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error ocurred while retrieving Post",
        });
      });
  },

  // fetch one Post by id
  show: (req, res) => {
    const id = req.params.id;

    Post.findByPk(id, {
      include: [
        {
          model: User,
          attributes: {
            include: [
              "user_id",
              "birthdate",
              "email",
              "password",
              "gender",
              "address",
              "createdAt",
              "updatedAt",
            ],
          },
        },
      ],
    })
      .then((data) => {
        if (!data) {
          return res.status(401).send({
            status: "failed",
            message: "Post not found.",
          });
        }
        res.status(200).send({
          status: "success",
          data,
        });
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Error retrieving Post with id=" + id,
        });
      });
  },

  // create post image
  createPostImage: async (req, res) => {
    try {
      //   if (!req.body.content) {
      //     res.status(400).send({
      //       message: "content post image content cannot be empty",
      //     });
      //     return;
      //   }

      const { id } = req.params;

      // upload to cloudinary
      const post_image = await cloudinary.uploader.upload(req.file.path);

      //
      //debugging
      console.log("secure_url:" + post_image.secure_url);
      console.log("cloudinary_id:" + post_image.public_id);

      // new Post
      const new_post_image = {
        user_id: id,
        image: post_image.secure_url,
        cloudinary_id: post_image.public_id,
      };

      // save new Post  to database
      await Post.create(new_post_image, { where: { user_id: id } })
        .then(
          res.status(200).send({
            status: "success",
            message: "Post successfully created",
          })
        )
        .catch((err) => {
          res.status(500).send({
            message:
              err.message || "Some error occured while creating the Post",
          });
        });
    } catch (err) {
      console.log(`TEST ERROT UPLOAD MEDIA IMAGE: ${err}`);
    }
  },

  // create post text
  createPostText: (req, res) => {
    const new_post_text = {
      user_id: req.body.user_id,
      content: req.body.content,
      image: req.body.image,
    };

    console.log("TEST:" + new_post_text);

    Post.create(new_post_text)
      .then(() => {
        res.status(200).send({
          status: "success",
          message: "Post was created successfully",
        });
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Error create post with id=" + id,
        });
      });
  },

  // // delete Post
  // delete : (req, res) => {
  //     const {id} = req.params

  //     Post.destroy({
  //         where: {id: id}
  //     })
  //     .then(num => {
  //         if (num == 1) {
  //             res.send({
  //                 message: "Post was deleted successfully"
  //             })
  //         } else {
  //             res.send({
  //                 message: `Cannot delete Post with id=${id}. Maybe Post was not found`
  //             })
  //         }
  //     })
  //     .catch(err => {
  //         res.status(500).send({
  //             message: "Could not delete Post with id="+id
  //         })
  //     })
  // }
};
