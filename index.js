require("dotenv").config();
require("./config/db").connect();
const PORT = process.env.PORT || 8080;
const route = require("./routes");
const api = require("./api/routes");
const cookieParser = require("cookie-parser");
const errorHandler = require("./utils/ErrorHandler");
const express = require("express");
const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));

route(app);
api(app);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
