const jwt = require("jsonwebtoken");

const checkToken = async function (token) {
    try {
        return await jwt.verify(token, process.env.TOKEN_SECRET);
    } catch (error) {
        return false;
    }
};

module.exports = checkToken;
