const express = require("express");
const router = express.Router();
const controller = require("../controllers/valuta.controller");

router.get("/getValute", controller.getValute);
router.post("/postValuta", controller.addValuta);
router.put("/updateValuta/:id", controller.updateValuta);
router.delete("/deleteValuta/:id", controller.deleteValuta);

module.exports = router;
