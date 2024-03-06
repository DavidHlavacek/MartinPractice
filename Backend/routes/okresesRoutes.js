const express = require('express');
const router = express.Router();
const { okresesController } = require('../controllers/okresesController');

router.post('/get-okreses', okresesController);

module.exports = router;
