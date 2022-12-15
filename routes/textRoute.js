const express = require('express');
const controller = require("../controllers/textController");

const router = express.Router();

router.get('/', controller.index)

router.get('/text', controller.textIndex);

router.post('/text', controller.translate);

router.get('/languages', controller.lagnuages);


module.exports = router;