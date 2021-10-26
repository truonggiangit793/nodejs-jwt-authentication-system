const Joi = require("@hapi/joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const querystring = require("querystring");
const userModel = require("../models/UsersModel");
const checkUser = require("../utils/CheckUserExist");
const lastLogin = require("../utils/LastLogin");

const userSchema = Joi.object({
    email: Joi.string().required().max(255).email(),
    password: Joi.string().required().max(255).min(8),
});

const login = async (req, res) => {
    const returnURL =
        querystring.unescape(req.query.returnURL) === "undefined"
            ? process.env.BASE_URL
            : querystring.unescape(req.query.returnURL);
    const { error } = userSchema.validate(req.body);
    if (error) {
        res.status(200).json({
            status: false,
            message: error.details[0].message,
        });
    } else {
        const email = req.body.email;
        const password = req.body.password;
        checkUser(email).then((isExist) => {
            if (!isExist) {
                res.status(200).json({
                    status: false,
                    message: "This account does not exists.",
                });
            } else {
                userModel.findOne({ email }, "password").then(async (user) => {
                    const validPassword = await bcrypt.compare(
                        password,
                        user.password
                    );
                    if (!validPassword) {
                        res.status(200).json({
                            status: false,
                            message: "Password is incorrect.",
                        });
                    } else {
                        lastLogin(email).then((result) => {
                            const token = jwt.sign(
                                { email, _id: user._id },
                                process.env.TOKEN_SECRET
                            );
                            res.cookie("SSID", token, {
                                expires: new Date(
                                    // Set cookie expires for 1 day
                                    Date.now() + 60000 * 60 * 24
                                ),
                            });
                            res.status(200).json({
                                status: true,
                                message: "Logged in!",
                                url: returnURL,
                            });
                        });
                    }
                });
            }
        });
    }
};

module.exports = login;
