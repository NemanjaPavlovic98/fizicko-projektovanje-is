const express = require("express");
const router = express.Router();
const controller = require("../controllers/putovanja.controller");

router.get("/getProgramiPutovanja", controller.getProgramiPutovanja);
router.post("/postProgramiPutovanja", controller.addProgramiPutovanja);
router.put("/updateProgramiPutovanja/:id", controller.updateProgramiPutovanja);
router.delete("/deleteProgramiPutovanja/:id", controller.deleteProgramiPutovanja);

router.get("/getProgramPutovanja", controller.getProgramPutovanja);
router.get("/getProgramPutovanja/:id", controller.getSingleProgramPutovanja);
router.post("/postProgramPutovanja", controller.addProgramPutovanja);
router.put("/updateProgramPutovanja/:id", controller.updateProgramPutovanja);
router.delete("/deleteProgramPutovanja/:id", controller.deleteProgramPutovanja);

module.exports = router;
