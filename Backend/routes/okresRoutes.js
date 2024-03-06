const express = require("express");
const router = express.Router();
const { okresController } = require("../controllers/okresController");

router.post("/get-okres", okresController);

module.exports = router;
