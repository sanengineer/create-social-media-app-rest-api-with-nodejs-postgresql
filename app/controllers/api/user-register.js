const db = require("../../models");
const user = db.user;
const bcrypt = require("bcryptjs");

module.exports = {
  //register
  registerUser: (req, res) => {
    const registerUserReqBody = {
      username: req.body.username,
      email: req.body.email,
      //   password: bcrypt.hashSync(req.body.password, 10),
      password: req.body.password,
    };

    if (
      !registerUserReqBody.username ||
      !registerUserReqBody.email ||
      !registerUserReqBody.password
    ) {
      res.status(400).send({
        message: "please fill form username,password, email",
      });
    } else
      user
        .create(registerUserReqBody)
        .then((data) => {
          res.status(201).send({
            message: "register success",
          });
        })
        .catch((err) => {
          res.status(500).send({
            message: err.message || "error while register user",
          });
        });
  },
};
