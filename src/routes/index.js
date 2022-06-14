const express = require('express');
const carBrand = require('./car.brand.routes');
const carModel = require('./car.model.routes');

const router = express.Router();

router.use('/brand', carBrand);
router.use('/model', carModel);

module.exports = router;
