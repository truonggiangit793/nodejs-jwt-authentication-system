class Sites {
    home(req, res) {
        res.render("layouts/main", {
            page: "home",
            title: "Home page",
        });
    }
    features(req, res) {
        res.render("layouts/main", {
            page: "features",
            title: "Features",
        });
    }
    protected(req, res) {
        res.render("layouts/main", {
            page: "protected",
            title: "Protected",
        });
    }
    about(req, res) {
        res.render("layouts/main", {
            page: "about",
            title: "About",
        });
    }
}

module.exports = new Sites();
