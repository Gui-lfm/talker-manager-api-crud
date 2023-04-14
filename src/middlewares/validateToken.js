const HTTP_UNATHORIZED_STATUS = 401;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    res
      .status(HTTP_UNATHORIZED_STATUS)
      .json({ message: 'Token não encontrado' });
  }

  if (authorization.length < 16 && typeof authorization === 'string') {
    res.status(HTTP_UNATHORIZED_STATUS).json({ message: 'Token inválido' });
  }

  next();
};
