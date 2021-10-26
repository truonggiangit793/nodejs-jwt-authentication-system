const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");
const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            require: true,
            max: 255,
            min: 10,
        },
        password: {
            type: String,
            require: true,
            max: 255,
            min: 8,
        },
        lastLogin: {
            type: Date,
            default: null,
        },
    },
    {
        timestamps: true,
    }
).plugin(mongooseDelete, {
    overrideMethods: "all",
    deletedAt: true,
});

module.exports = mongoose.model("User", userSchema);
