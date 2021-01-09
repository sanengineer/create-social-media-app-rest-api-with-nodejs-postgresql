const passport = require("passport");
const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const model = require("../models");
const User = model.user;

require("dotenv").config();

//debugging
// console.log(
//   "\nLIB/PASSOPOR.JS TEST User:\n",
//   User,
//   "\n\n",
//   "\nLIB/PASSOPOR.JS TEST model.user:\n",
//   model.user
// );

const options = {
  jwtFromRequest: ExtractJwt.fromHeader("authorization"),
  secretOrKey: process.env.SECRET,
};

passport.use(
  new JwtStrategy(options, async (payload, done) => {
    User.findByPk(payload.id).then((user) => done(null, user));
  })
);

module.exports = passport;
