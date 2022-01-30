const express = require("express");
const router = express.Router();
const controller = require("../controllers/korisnik.controller");

router.get("/getKorisnik", controller.getKorisnik);
router.get("/getKorisnik/:id", controller.getSingleKorisnik);
router.post("/postKorisnik", controller.addKorisnik);
router.put("/updateKorisnik/:id", controller.updateKorisnik);
router.delete("/deleteKorisnik/:id", controller.deleteKorisnik);

module.exports = router;
