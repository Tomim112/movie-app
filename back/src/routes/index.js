const { Router } = require("express");
const moviesRouter = require("./moviesRouter");

const router = Router();

router.use("/peliculas", moviesRouter);

module.exports = router;
