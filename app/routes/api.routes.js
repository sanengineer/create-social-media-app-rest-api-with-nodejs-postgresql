const Router = require("express-group-router");
const router = new Router();
const controllerUser = require("../controllers/api/v1/UserControllers");
const controllerPost = require("../controllers/api/v1/PostControllers");
const controllerComment = require("../controllers/api/v1/CommentControllers");
// middleware
const middlewares = require("../middlewares/middlewares");
const upload = require("../utils/multer");
const { route } = require("./index.routes");

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

  // Post route 
  router.get("/posts", controllerPost.index);
  router.get("/post/:id", controllerPost.show);
  router.get("/posts/:id", controllerPost.getPostByUser);

  // Comment route
  router.get("/comments", controllerComment.index);
  router.get("/comment/:id", controllerComment.show);
  router.get("/comments/:id", controllerComment.getCommentByUser);

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
    router.post(
      "/new-post",
      upload.single("image"),
      controllerPost.create);
    // route new comment
    router.post("/comment-post", controllerComment.create);
  });

  const listRoutes = router.init();
  app.use("/api/v1/", listRoutes);
};
