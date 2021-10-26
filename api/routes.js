const apiMiddleware = require("../middlewares/ApiMiddleware");
const registerApi = require("./register");
const loginApi = require("./login");

const api = function (app) {
    app.post("/api/account/register", apiMiddleware, registerApi);
    app.post("/api/account/login", apiMiddleware, loginApi);
};

module.exports = api;
