const userModel = require("../models/UsersModel");

const LastLogin = async function (email) {
    return await userModel.updateOne({ email }, { lastLogin: Date.now() });
};

module.exports = LastLogin;
