const model = require("../../models");
const User = model.users;
const bcrypt = require("bcryptjs");

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
    // user login
    signin : (req, res) => {
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
        .catch((error) => res.status(400).send(error))
    },

    // change user password
    changePassword: async (req, res) => {
        const id = req.params.id
        const hashPassword = await bcrypt.hashSync(req.body.password, 10)
        
        if (req.body.confirm_password == "") {
            res.send({
                status: "failed",
                message: "Password confirmation must be filled"
            })
        }

        // password and confirm must =
        if (req.body.password !== req.body.confirm_password) {
            res.send({
                status: "failed",
                message: "Password and Password confirmation must be the same"
            })
        }
        
        const user = {
            password: hashPassword
        }

        User.update(
            user,
            { where: {id: id} }
        )
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Change password was updated successfully"
                })
            } else {
                res.send({
                    message: `Cannot change password user with id=${id}. Maybe user was not found`
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error change password user with id=" + id
            })
        })
    }
}
