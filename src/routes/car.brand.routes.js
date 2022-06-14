const { Router } = require('express');
const { HandlePrivateRouter } = require('../middlewares/authentication');
const { carBrand } = require('../resources/brand');

const router = Router();

router.post('/save', HandlePrivateRouter, async (req, res, next) => {
  try {
    const { name, nationality } = req.body;

    const response = await carBrand.saveBrand(name, nationality);
    const { statusCode, txtResponse } = response;
    res.status(statusCode).json(txtResponse);
  } catch (error) {
    next(error);
  }
});

router.put('/edit', HandlePrivateRouter, async (req, res, next) => {
  try {
    const { name, nationality, id } = req.body;

    const response = await carBrand.editBrand(name, nationality, id);
    const { statusCode, txtResponse } = response;
    res.status(statusCode).json(txtResponse);
  } catch (error) {
    next(error);
  }
});

router.get('/', HandlePrivateRouter, async (req, res, next) => {
  try {
    const { id } = req.body;

    const response = await carBrand.listBrand(id);
    const { statusCode, txtResponse } = response;
    res.status(statusCode).json(txtResponse);
  } catch (error) {
    next(error);
  }
});

router.delete('/', HandlePrivateRouter, async (req, res, next) => {
  try {
    const { id } = req.body;

    const response = await carBrand.deleteBrand(id);
    const { statusCode, txtResponse } = response;
    res.status(statusCode).json(txtResponse);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
