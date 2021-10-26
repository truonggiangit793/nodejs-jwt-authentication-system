const mongoose = require("mongoose");
const db_name = "jwt_authentication_system";
const uri = `mongodb://127.0.0.1:27017/${db_name}`;

const connect = async function () {
    try {
        await mongoose.connect(uri, () => {
            console.log("Connect to mongoDB successfully!\n\n\n");
        });
    } catch (error) {
        console.log(error);
        console.log("Failed to connect to MongoDB\n\n\n");
    }
};

module.exports = { connect };
