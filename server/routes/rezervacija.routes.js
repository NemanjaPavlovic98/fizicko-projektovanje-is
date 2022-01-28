const express = require("express");
const router = express.Router();
const controller = require("../controllers/rezervacija.controller");

router.get("/getPotvrdaRezervacije", controller.getPotvrdaRezervacije);
router.post("/postPotvrdaRezervacije", controller.addPotvrdaRezervacije);
router.put("/updatePotvrdaRezervacije/:id", controller.updatePotvrdaRezervacije);
router.delete("/deletePotvrdaRezervacije/:id", controller.deletePotvrdaRezervacije);

module.exports = router;
