const express = require("express");
const router = express.Router();
const controller = require("../controllers/prevoz.controller");

router.get("/getTipPrevoza", controller.getTipPrevoza);
router.post("/postTipPrevoza", controller.addTipPrevoza);
router.put("/updateTipPrevoza/:id", controller.updateTipPrevoza);
router.delete("/deleteTipPrevoza/:id", controller.deleteTipPrevoza);

router.get("/getPrevoznik", controller.getPrevoznik);
router.get("/getPrevoznik/:id", controller.getSinglePrevoznik);
router.post("/postPrevoznik", controller.addPrevoznik);
router.put("/updatePrevoznik/:id", controller.updatePrevoznik);
router.delete("/deletePrevoznik/:id", controller.deletePrevoznik);

router.get("/getOvlascenoLice", controller.getOvlascenoLice);
router.post("/postOvlascenoLice", controller.addOvlascenoLice);
router.put("/updateOvlascenoLice/:id", controller.updateOvlascenoLice);
router.post("/deleteOvlascenoLice/:id", controller.deleteOvlascenoLice);

module.exports = router;
