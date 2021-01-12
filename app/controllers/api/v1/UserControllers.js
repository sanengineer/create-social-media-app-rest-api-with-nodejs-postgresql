const db = require("../../../models");
const User = db.user;
const bcrypt = require("bcryptjs");
const sequelize = db.Sequelize;


// payload format
function format(user) {
  const { id, email } = user;
  return {
    status_code: 200,
    status: "success",
    message: "User login successfully",
    id,
    email,
    accessToken: "JWT " + user.generateToken(),
  };
}

module.exports = {
  //register user
  userRegister: (req, res) => {
    const registerUserReqBody = {
      username: req.body.username,
      email: req.body.email,
      // password: bcrypt.hashSync(req.body.password, 10),
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
      User
        .create(registerUserReqBody)
        .then(() => {
          res.status(201).send({
            message: "user registration success",
          });
        })
        .catch((err) => {
          res.status(500).send({
            message: err.message || "error while registration user",
          });
        });
  },

  // login user
  userLogin : (req, res) => {
    User.findOne({
        where: {email: req.body.email}
    })
    .then((user) => {
        if (!user) {
            return res.status(401).send({
                status: "failed",
                message: "Authentication failed. User not found."
            })
        }
        user.checkPassword(req.body.password, (err, isMatch) => {
            if (isMatch && !err) {
                res.json(
                    format(user)
                )
            } else {
                res.status(401).send({
                    status: false,
                    message: "Authentication failed. Wrong Password."
                })
            }
        })
    })
    .catch((error) => 
      res.status(400).send({
          status: false,
          message: error
      }
    ))
  },

  // show all public profiles
  getAllProfiles: (req, res) => {
    User
      .findAll({
        attributes: {
          exclude: [
            "birthdate",
            "email",
            "password",
            "gender",
            "address",
            "createdAt",
            "updatedAt"
          ],
          order: sequelize.literal(["username DESC"]),
        },
      })
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "error while retrive public users",
        });
      });
  },

  // show detail profile
  getProfile: (req, res) => {
    const id = req.params.id;
    User
      .findOne({
        where: { user_id: id },
        attributes: {
          exclude: [
            "password",
            "email",
            "birthdate",
            "address",
            "createdAt",
            "updatedAt",
          ],
        },
      })
      .then((data) => {
        if (data != null) {
          res.status(200).send(data);
        } else {
          res.status(200).send({
            message: `profile id=${id} unavailable`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || `no user profile id=${id}`,
        });
      });
  },

  // show detail private profile
  getProfilePrivate: (req, res) => {
    const id = req.params.id;

    User
      .findOne({
        where: { user_id: id },
        attributes: {
          exclude: ["password"],
        },
      })
      .then((data) => {
        if (data != null) {
          res.status(200).send(data);
        } else {
          res.status(200).send({
            message: `profile id=${id} unavailable`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || `no user profile id=${id}`,
        });
      });
  },

  //update profile user
  updateProfile: (req, res) => {
    const { id } = req.params;

    User
      .update(req.body, {
        where: { user_id: id },
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
