const jwt = require("jsonwebtoken");
const querystring = require("querystring");
const checkToken = require("../utils/checkValidToken");

class Auth {
    login(req, res) {
        const token = req.cookies.SSID;
        const returnURL = querystring.escape(req.query.returnURL);
        checkToken(token).then((success) => {
            if (success) {
                res.redirect("back");
            } else {
                res.render("layouts/main", {
                    page: "login",
                    title: "Login",
                    returnURL,
                });
            }
        });
    }
    logout(req, res) {
        const token = req.cookies.SSID;
        checkToken(token).then((success) => {
            if (success) {
                res.clearCookie("SSID");
                res.redirect(`${process.env.BASE_URL}/`);
            } else {
                res.redirect("back");
            }
        });
    }
    register(req, res) {
        const token = req.cookies.SSID;
        checkToken(token).then((success) => {
            if (success) {
                res.redirect(`${process.env.BASE_URL}/`);
            } else {
                res.render("layouts/main", {
                    page: "signup",
                    title: "Sign up",
                });
            }
        });
    }
}

module.exports = new Auth();
