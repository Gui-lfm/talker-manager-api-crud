const HTTP_BAD_REQUEST_STATUS = 400;

const rate = (req, res, next) => {
  const { rate: Searchrate } = req.query;
  if (Searchrate === undefined) {
    return res
      .status(HTTP_BAD_REQUEST_STATUS)
      .json({ message: 'O campo "rate" é obrigatório' });
  }

  if (!(Number.isInteger(Number(Searchrate)) && Searchrate >= 1 && Searchrate <= 5)) {
    return res.status(HTTP_BAD_REQUEST_STATUS).json({
      message: 'O campo "rate" deve ser um número inteiro entre 1 e 5',
    });
  }

  next();
};

module.exports = {
  rate,
};
