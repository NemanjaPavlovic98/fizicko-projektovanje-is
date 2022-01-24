const express = require("express");
const router = express.Router();
const controller = require("../controllers/example.controller");

router.get("/exampleRoute", controller.functionExample);

module.exports = router;
