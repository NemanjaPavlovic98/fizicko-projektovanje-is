const express = require("express");
const router = express.Router();
const controller = require("../controllers/profaktura.controller");

router.get("/getProfaktura", controller.getProfaktura);
router.post("/postProfaktura", controller.addProfaktura);
router.put("/updateProfaktura/:id", controller.updateProfaktura);
router.delete("/deleteProfaktura/:id", controller.deleteProfaktura);

module.exports = router;
