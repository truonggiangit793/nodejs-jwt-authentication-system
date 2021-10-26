const errorHandler = function (req, res, next) {
    res.status(400);
    res.render("layouts/main", {
        page: "404",
        title: "Not found",
    });
};

module.exports = errorHandler;
