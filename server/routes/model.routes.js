const express = require("express");
const router = express.Router();
const controller = require("../controllers/model.controller");

router.get("/getModeli", controller.getModeli);
router.post("/postModel", controller.addModel);
router.put("/updateModel/:id", controller.updateModel);
router.delete("/deleteModel/:id", controller.deleteModel);

module.exports = router;
