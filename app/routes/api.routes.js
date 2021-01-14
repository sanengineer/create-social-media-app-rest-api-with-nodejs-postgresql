const Router = require("express-group-router");
const router = new Router();
const controllerUser = require("../controllers/api/v1/UserControllers");
const controllerPost = require("../controllers/api/v1/PostControllers");
// middleware
const middlewares = require("../middlewares/middlewares");
const upload = require("../utils/multer");

module.exports = (app) => {
  /**
   * Auth Route
   */
  // register
  router.post("/register", controllerUser.userRegister);
  // login
  router.post("/login", controllerUser.userLogin);

  // Api route public
  // show all users
  router.get("/all-profiles", controllerUser.getAllProfiles);
  // show detail profile
  router.get("/public-user/:id", controllerUser.getProfile);

  router.get("/posts", controllerPost.index);
  router.get("/post/:id", controllerPost.show);
  router.get("/posts/:id", controllerPost.getPostByUser);

  /**
   *   Route with middleware
   */
  router.group([middlewares.verifyToken], (router) => {
    // show detail private profile
    router.get("/user/:id", controllerUser.getProfilePrivate);
    // update profile
    router.put("/user/:id", controllerUser.updateProfile);
    router.put(
      "/avatar/:id",
      upload.single("image"),
      controllerUser.uploadProfilePict
    );
    // create new post
    router.post("/new-post", controllerPost.create);
  });

  const listRoutes = router.init();
  app.use("/api/v1/", listRoutes);
};
