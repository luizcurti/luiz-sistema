module.exports.HandlePrivateRouter = async (req, res, next) => {
  try {
    const { 'x-api-key': xApiKey } = req.headers;

    if (!xApiKey) { res.status(401).json({ 'Bad Request 2': 'Something went wrong!' }); }
    if (xApiKey !== process.env.x_api_key) { res.status(401).json({ 'Bad Request 34': 'Something went wrong!' }); }

    next();
  } catch (error) {
    next(error);
  }
};
