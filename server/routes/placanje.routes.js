const express = require("express");
const router = express.Router();
const controller = require("../controllers/placanje.controller");

router.get("/getNacinPlacanja", controller.getNacinPlacanja);
router.post("/postNacinPlacanja", controller.addNacinPlacanja);
router.put("/updateNacinPlacanja/:id", controller.updateNacinPlacanja);
router.delete("/deleteNacinPlacanja/:id", controller.deleteNacinPlacanja);

module.exports = router;
