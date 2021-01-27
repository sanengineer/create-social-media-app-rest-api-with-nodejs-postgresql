var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var cors = require("cors");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var swaggerUI = require("swagger-ui-express");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

// swagger api documentation
var swaggerFile = require("./api-documentation.json");
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerFile));
// db.sequelize.sync();

// router
var indexRouter = require("./app/routes/index.routes");
// api router
require("./app/routes/api.routes")(app);
app.use("/", indexRouter);

module.exports = app;
