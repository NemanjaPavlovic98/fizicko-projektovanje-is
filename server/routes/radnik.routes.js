const express = require("express");
const router = express.Router();
const controller = require("../controllers/radnik.controller");

router.get("/getRadnici", controller.getRadnici);
router.post("/postRadnik", controller.addRadnik);
router.put("/updateRadnik/:id", controller.updateRadnik);
router.delete("/deleteRadnik/:id", controller.deleteRadnik);

module.exports = router;
