const jwt = require("jsonwebtoken");
require("dotenv").config();

const secret = process.env.SECRET;

// generate JWT saat login, jwt token ini disimpan di localStorage browser milik client
const generateJwt = (payload) => {
  return jwt.sign(payload, secret);
};

// verifikasi token dari client
const verifyJwt = (token) => {
  jwt.verify(token, secret);

  // debugging
  // console.log("\ntoken:\n", token, "\n\nsecret:\n", secret, "\n");

};

module.exports = {
  generateJwt,
  verifyJwt,
};
