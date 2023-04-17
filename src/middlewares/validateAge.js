const HTTP_BAD_REQUEST_STATUS = 400;

module.exports = (req, res, next) => {
  const { age } = req.body;

  if (!age) {
    return res
      .status(HTTP_BAD_REQUEST_STATUS)
      .json({ message: "O campo \"age\" é obrigatório" });
  }

  if (!Number.isInteger(Number(age)) || (Number(age) < 18)) {
    return res
      .status(HTTP_BAD_REQUEST_STATUS)
      .json({ message: "O campo \"age\" deve ser um número inteiro igual ou maior que 18" });
  }

  next();
};
