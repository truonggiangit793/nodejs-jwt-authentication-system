const Joi = require("@hapi/joi");
const bcrypt = require("bcrypt");
const userModel = require("../models/UsersModel");
const checkUser = require("../utils/CheckUserExist");

const userSchema = Joi.object({
    email: Joi.string().required().max(255).email(),
    password: Joi.string().required().max(255).min(8),
});

const register = async (req, res) => {
    const { error } = userSchema.validate(req.body);
    if (error) {
        res.status(200).json({
            status: false,
            message: error.details[0].message,
        });
    } else {
        const salt = await bcrypt.genSalt(10);
        const email = req.body.email;
        const password = await bcrypt.hash(req.body.password, salt);
        checkUser(email).then((isExist) => {
            if (isExist) {
                res.status(200).json({
                    status: false,
                    message: "This account already exists.",
                });
            } else {
                const user = new userModel({ email, password });
                user.save().then((success) => {
                    if (success) {
                        res.status(200).json({
                            status: true,
                            message: "Created successfully.",
                            data: {
                                email,
                                createdAt: Date.now(),
                            },
                        });
                    } else {
                        res.status(500).json({
                            status: false,
                            message: "An error occurred while registering.",
                        });
                    }
                });
            }
        });
    }
};

module.exports = register;
