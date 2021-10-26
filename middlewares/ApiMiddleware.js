const API_KEY = process.env.API_KEY;

const apiMiddleware = (req, res, next) => {
    if (!req.query.api_key || req.query.api_key !== API_KEY) {
        return res.json({
            status: false,
            message: "Permission denied.",
        });
    }
    return next();
};

module.exports = apiMiddleware;
