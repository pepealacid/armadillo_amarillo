const router = require("express").Router();
const movieController = require("../controllers/movie.controller")
const { isAuthenticated } = require("../middlewares/verifyToken.middleware");


router.get("/playing", movieController.getNowPlaying);
router.get("/popular", movieController.getPopular);
router.get("/credits/:id", movieController.getCredits);

//He eliminado el middleware al no estar funcionando la base de datos y la autenticación... pero debería ser así para todas las rutas:
// router.get("/playing", isAuthenticated, movieController.getNowPlaying);



module.exports = router;
