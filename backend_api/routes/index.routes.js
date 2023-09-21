const router = require("express").Router();

router.use("/auth", require("./auth.routes"))
router.use("/movies", require("./movie.routes"))


module.exports = router;