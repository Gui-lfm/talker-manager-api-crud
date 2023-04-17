const HTTP_BAD_REQUEST_STATUS = 400;
const validDateFormat =
  /^(((0[1-9]|[12][0-9]|3[01])[- /.](0[13578]|1[02])|(0[1-9]|[12][0-9]|30)[- /.](0[469]|11)|(0[1-9]|1\d|2[0-8])[- /.]02)[- /.]\d{4}|29[- /.]02[- /.](\d{2}(0[48]|[2468][048]|[13579][26])|([02468][048]|[1359][26])00))$/;

module.exports = (req, res, next) => {
  const { talk } = req.body;

  if (!talk) {
    res
      .status(HTTP_BAD_REQUEST_STATUS)
      .json({ message: 'O campo "talk" é obrigatório' });
  }

  if (!talk.watchedAt) {
    return res
      .status(HTTP_BAD_REQUEST_STATUS)
      .json({ message: 'O campo "watchedAt" é obrigatório' });
  }

  if (!validDateFormat.test(talk.watchedAt)) {
    return res
      .status(HTTP_BAD_REQUEST_STATUS)
      .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }

  if (!talk.rate && Number(talk.rate) !== 0) {
    return res
      .status(HTTP_BAD_REQUEST_STATUS)
      .json({ message: 'O campo "rate" é obrigatório' });
  }

  if (
    !Number.isInteger(Number(talk.rate)) ||
    !(talk.rate >= 1 && talk.rate <= 5)
  ) {
    return res.status(HTTP_BAD_REQUEST_STATUS).json({
      message: 'O campo "rate" deve ser um número inteiro entre 1 e 5',
    });
  }

  next();
};
