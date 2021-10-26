const userModel = require("../models/UsersModel");

const CheckUserExist = async function (email) {
    return await userModel.findOne({ email }, "email");
};

module.exports = CheckUserExist;
