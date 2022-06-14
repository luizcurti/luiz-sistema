const { Router } = require('express');
const { HandlePrivateRouter } = require('../middlewares/authentication');
const { Model } = require('../resources/model');

const router = Router();

router.post('/save', HandlePrivateRouter, async (req, res, next) => {
  try {
    const { name, model } = req.body;
    const response = await Model.saveModel(name, model);
    const { statusCode, txtResponse } = response;
    res.status(statusCode).json(txtResponse);
  } catch (error) {
    next(error);
  }
});

router.put('/edit', HandlePrivateRouter, async (req, res, next) => {
  try {
    const { name, model, id } = req.body;

    const response = await Model.editModel(name, model, id);
    const { statusCode, txtResponse } = response;
    res.status(statusCode).json(txtResponse);
  } catch (error) {
    next(error);
  }
});

router.get('/', HandlePrivateRouter, async (req, res, next) => {
  try {
    const { id } = req.body;

    const response = await Model.listModel(id);
    const { statusCode, txtResponse } = response;
    res.status(statusCode).json(txtResponse);
  } catch (error) {
    next(error);
  }
});

router.delete('/', HandlePrivateRouter, async (req, res, next) => {
  try {
    const { id } = req.body;

    const response = await Model.deleteModel(id);
    const { statusCode, txtResponse } = response;
    res.status(statusCode).json(txtResponse);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
