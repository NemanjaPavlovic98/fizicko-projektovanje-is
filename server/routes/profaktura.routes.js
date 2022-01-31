const express = require("express");
const router = express.Router();
const controller = require("../controllers/profaktura.controller");

router.get("/getProfaktura", controller.getProfaktura);
router.get("/getSingleProfaktura/:id", controller.getSingleProfaktura);
router.post("/postProfaktura", controller.addProfaktura);
router.put("/updateProfaktura/:id", controller.updateProfaktura);
router.delete("/deleteProfaktura/:id", controller.deleteProfaktura);

router.get("/getStavkeZaProfakturu/:id", controller.getStavkeZaProfakturu);
router.get("/getStavkeProfakture/:id", controller.getStavkeProfakture);
router.get("/getStavkaProfakture/:id", controller.getSingleStavkaProfakture);
router.post("/postStavkaProfakture", controller.addStavkaProfakture);
router.put("/updateStavkeProfakture", controller.updateStavkaProfakture);
router.post("/deleteStavkeProfakture/:id", controller.deleteStavkaProfakture);

module.exports = router;
