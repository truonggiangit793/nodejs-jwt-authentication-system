const jwt = require("jsonwebtoken");
const querystring = require("querystring");
const checkToken = require("../utils/checkValidToken");

const authentication = (req, res, next) => {
    const token = req.cookies.SSID;
    const returnURL = querystring.escape(process.env.BASE_URL + req.url);
    checkToken(token).then((success) => {
        if (success) {
            return next();
        } else {
            return res.redirect(
                `${process.env.BASE_URL}/login?returnURL=${returnURL}`
            );
        }
    });
};

module.exports = authentication;
