const express = require("express");
const router = express.Router();
const controller = require("../controllers/mesto.controller");

router.get("/getDrzava", controller.getDrzava);
router.post("/postDrzava", controller.addDrzava);
router.put("/updateDrzava/:id", controller.updateDrzava);
router.delete("/deleteDrzava/:id", controller.deleteDrzava);

router.get("/getGrad", controller.getGrad);
router.post("/postGrad", controller.addGrad);
router.put("/updateGrad/:id", controller.updateGrad);
router.post("/deleteGrad/:id", controller.deleteGrad);

router.get("/getAdresa", controller.getAdresa);
router.post("/postAdresa", controller.addAdresa);
router.put("/updateAdresa/:id", controller.updateAdresa);
router.post("/deleteAdresa/:id", controller.deleteAdresa);

module.exports = router;
