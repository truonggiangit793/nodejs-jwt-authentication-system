const authController = require("../controllers/Auth");
const sitesController = require("../controllers/Sites");
const authenticator = require("../middlewares/Authentication");

const route = function (app) {
    app.get("/", authenticator, sitesController.home);
    app.get("/features", authenticator, sitesController.features);
    app.get("/about", authenticator, sitesController.about);
    app.get("/protected", authenticator, sitesController.protected);
    app.get("/register", authController.register);
    app.get("/login", authController.login);
    app.get("/logout", authController.logout);
};

module.exports = route;
