const db = require("../../../models");
const StorageFile = db.storagefile;
const StorageImage = db.storageimage;
const StorageVideo = db.storagevideo;
const cloudinary = require("../../../utils/cloudinary");

module.exports = {
  uploadDoc: async (req, res) => {
    try {
      const { id } = req.params;
      const post_file = await cloudinary.uploader.upload(req.file.path);

      //
      //debugging
      console.log("secure_url:\n" + post_file.secure_url, "\n");
      console.log("cloudinary_id:\n" + post_file.public_id, "\n\n");

      const new_post_file = {
        user_id: id,
        file_link: post_file.secure_url,
        cloudinary_id: post_file.public_id,
      };

      await StorageFile.create(new_post_file)
        .then(
          res.status(200).send({
            status: "success",
            message: "file successfully uploaded",
          })
        )
        .catch((err) => {
          res.status(500).send({
            message: err.message || "some error occured whole uploaded file",
          });
        });
    } catch (err) {
      console.log("error_message_upload_file:", err);
    }
  },
  uploadImage: async (req, res) => {
    try {
      const { id } = req.params;
      const post_image = await cloudinary.uploader.upload(req.file.path);

      //
      //
      console.log("cloudinary:\n", cloudinary.uploader.upload(req.file.path));
      //
      //debugging
      console.log("secure_url:" + post_image.secure_url);
      console.log("cloudinary_id:" + post_image.public_id);

      const new_post_image = {
        user_id: id,
        image_link: post_image.secure_url,
        cloudinary_id: post_image.public_id,
      };

      await StorageImage.create(new_post_image)
        .then((data) => {
          res.status(200).send({
            status: "success",
            message: "image successfully uploaded",
            image_link: data.image_link,
          });
          // res.status(200).send(data);
        })
        .catch((err) => {
          res.status(500).send({
            message: err.message || "some error occured whole uploaded image",
          });
        });
    } catch (err) {
      console.log("error_message_upload_image:", err);
    }
  },
  uploadVideo: async (req, res) => {
    try {
      const { id } = req.params;
      const post_video = await cloudinary.uploader.upload(req.file.path, {
        resource_type: "video",
      });

      //
      //debugging
      console.log("secure_url:" + post_video.secure_url);
      console.log("cloudinary_id:" + post_video.public_id);

      let new_post_video = {
        user_id: id,
        video_link: post_video.secure_url,
        cloudinary_id: post_video.public_id,
      };

      await StorageVideo.create(new_post_video)
        .then(
          res.status(200).send({
            status: "success",
            message: "video successfully uploaded",
          })
        )
        .catch((err) => {
          res.status(500).send({
            message: err.message || "some error occured whole uploaded video",
          });
        });
    } catch (err) {
      console.log("error_message_upload_video:", err);
    }
  },
  fetchImages: (req, res) => {
    const { id } = req.params;

    StorageImage.findAll({
      where: { user_id: id },
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
            message: "User with user id:" + user_id + "hasn't images",
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "some error occured while retrieving post",
        });
      });
  },
  fetchVideos: (req, res) => {
    const { id } = req.params;

    StorageVideo.findAll({
      where: { user_id: id },
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
            message: "User with user id:" + user_id + "hasn't images",
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "some error occured while retrieving post",
        });
      });
  },
  fetchDocs: (req, res) => {
    const { id } = req.params;

    StorageFile.findAll({
      where: { user_id: id },
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
            message: "User with user id:" + user_id + "hasn't images",
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "some error occured while retrieving post",
        });
      });
  },
};
