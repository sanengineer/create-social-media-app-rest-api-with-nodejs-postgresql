const { decode } = require("jsonwebtoken");
// const { verifyJwt } = require("../config/jwt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.SECRET;

const passport = require("../lib/passport");

const getToken = (headers) => {
  if (headers && headers.authorization) {
    //
    //debugging
    // console.log("\nHEADER AUTHORIZATION:\n", headers.authorization, "\n");

    var parted = headers.authorization.split(" ");
    if (parted.length === 2) {
      //
      //debugging
      // console.log(
      //   "\nPARTED ARRAY:\n",
      //   parted,
      //   "\n\n",
      //   "\nPARTED[0]:\n",
      //   parted[0],
      //   "\n\n",
      //   "\nPARTED[1]:\n",
      //   parted[1]
      // );
      if (parted[0] == "JWT") {
        return parted[1];
      }
    } else {
      return null;
    }
  } else {
    return null;
  }
};

const verifyPassportJwt = () => {
  passport.authenticate("jwt", { session: false });
};

function verifyToken(req, res, next) {
  var token = getToken(req.headers);

  const decoded = decode(token);
  console.log(`ini adalah decode ${token}`);

  const reqBodyUserId = req.body.user_id;
  const reqParamsUserId = req.params.id;

  //
  //debugging
  // console.log(
  //   "\nFX_VERIFYTOKEN_DECODED:\n",
  //   decoded,
  //   "\n",
  //   "\nFX-VERIFYTOKEN-DECODED.ID:\n",
  //   decoded.id,
  //   "\n"
  // );

  if (
    (token && reqBodyUserId == decoded.id) ||
    (token && reqParamsUserId == decoded.id)
  ) {
    // verifyJwt(token);
    // next();
    jwt.verify(token, secret, (err, decode) => {
      if(err){
          return res.status(500).send({
              auth: false,
              message: "Error",
              errors: err
          });
      }
      console.log("ini adalah decode.id", decode.user_id)
      req.userId = decode.user_id;
      next();
    });
  } else {
    res.status(403).send({
      success: false,
      message: "access denied",
    });
  }
}

const tokenDecoded = (req, res, next) => {
  var token = getToken(req.headers);
  const decoded = decode(token);

  //
  //debugging
  // console.log(
  //   "\nFX_TOKENDECODED_DECODED:\n",
  //   decoded,
  //   "\n",
  //   "\nFX_TOKENDECODED_DECODED.ID:\n",
  //   decoded.id,
  //   "\n"
  // );

  if (token) {
    res.send({
      success: true,
      data: decoded,
    });
    next();
  } else {
    res.status(403).send({
      success: false,
      message: "token not valid",
    });
  }
};

module.exports = {
  verifyToken,
  verifyPassportJwt,
  tokenDecoded,
};
