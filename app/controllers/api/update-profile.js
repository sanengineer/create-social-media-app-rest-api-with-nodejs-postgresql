const db = require("../../models");
const user = db.user;

module.exports = {
  //update user
  updateProfile: (req, res) => {
    const { id } = req.params;

    user
      .update(req.body, {
        where: { id: id },
        attributes: {
          exclude: ["password"],
        },
      })
      .then((num) => {
        if (num == 1) {
          res.send({
            message: `profile user_id=${id} was updated `,
          });
        } else {
          res.send({
            message: `can't update profile user_id=${id}`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || `error update profile`,
        });
      });
  },
};
