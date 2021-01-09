const Router = require("express-group-router");
const router = new Router();
const user = require("../controllers/api/user-login");
const controllerUserRegister = require("../controllers/api/user-register");
const controllerHistory = require("../controllers/api/create-history");
const controllerUpdateProfile = require("../controllers/api/update-profile");
const controllerGetProfile = require("../controllers/api/get-profile");
const controllerGetProfiles = require("../controllers/api/get-profiles");
const controllerGetHistory = require("../controllers/api/get-history");
const controllerGame = require("../controllers/api/game");
const controllerGameAsset = require("../controllers/api/game-asset");

// middleware
const middlewares = require("../middlewares/middlewares");

module.exports = (app) => {
  /**
   * Auth Route
   */
  // register
  router.post("/register", controllerUserRegister.registerUser);
  // login
  router.post("/login", user.signin);

  // Api route public
  // profile
  router.get("/user-public/:id", controllerGetProfile.getProfile);
  router.get("/user-public", controllerGetProfiles.getProfiles);
  // router.get("/user-details", controllerGetHistories.getHistories);
  router.get("/me", middlewares.tokenDecoded);

  // game
  router.get("game", controllerGame.index);
  router.get("game/:id", controllerGame.show);
  // router.post("game", controllerGame.create)
  // router.put("game/:id", controllerGame.update)
  // router.delete("game/:id", controllerGame.delete)

  // game asset
  router.get("game_asset", controllerGameAsset.index);
  router.get("game_asset/:id", controllerGameAsset.show);
  // router.post("game_asset", controllerGameAsset.create)
  // router.put("game_asset/:id", controllerGameAsset.update)
  // router.delete("game_asset/:id", controllerGameAsset.delete)

  // score game dari game = game id
  // 3 top score setiap game
  router.get("/top-score/:id", controllerGetHistory.topScore);

  /**
   *   Route with middleware
   */
  router.group([middlewares.verifyToken], (router) => {
    //user
    router.get("/user/:id", controllerGetProfile.getProfilePrivate);
    router.put("/user/:id", controllerUpdateProfile.updateProfile);
    router.put("/change_password/:id", user.changePassword);

    //history
    router.post("/history", controllerHistory.createHistory);
    // score game dari user = user id 
    // dari berbagai game yang dimainkan
    router.get("/score-summary/:id", controllerGetHistory.scoreSummary);
  });

  const listRoutes = router.init();
  app.use("/api/v1/", listRoutes);
};
