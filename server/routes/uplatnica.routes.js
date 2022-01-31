const express = require("express");
const router = express.Router();
const controller = require("../controllers/uplatnica.controller");

router.get("/getUplatnica", controller.getUplatnica);
router.get("/getUplatnica/:id", controller.getSingleUplatnica);
router.post("/postUplatnica", controller.addUplatnica);
router.put("/updateUplatnica/:id", controller.updateUplatnica);
router.delete("/deleteUplatnica/:id", controller.deleteUplatnica);

module.exports = router;
