const express = require('express');
const talkerManager = require('./talkerManager');
const generateToken = require('./utils/generateToken');
const validateEmail = require('./middlewares/validateEmail');
const validatePassword = require('./middlewares/validatePassword');
const validateToken = require('./middlewares/validateToken');
const validateName = require('./middlewares/validateName');
const validateAge = require('./middlewares/validateAge');
const validations = require('./middlewares/validations');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const HTTP_CREATED_STATUS = 201;
// const HTTP_NO_CONTENT_STATUS = 204;
const HTTP_NOT_FOUND_STATUS = 404;
const PORT = process.env.PORT || '3001';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (_req, res) => {
  const talkers = await talkerManager.getTalkers();
  return res.status(HTTP_OK_STATUS).json(talkers);
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const talker = await talkerManager.getTalkerById(id);

  if (!talker) {
    return res
      .status(HTTP_NOT_FOUND_STATUS)
      .json({ message: 'Pessoa palestrante não encontrada' });
  }
  return res.status(HTTP_OK_STATUS).json(talker);
});

app.post('/login', validateEmail, validatePassword, async (_req, res) => {
  const token = generateToken();
  return res.status(HTTP_OK_STATUS).json({ token });
});

app.post(
  '/talker',
  validateToken,
  validateName,
  validateAge,
  validations.validateTalk,
  validations.validateWatchedAt,
  validations.validateRate,
  async (req, res) => {
    const { name, age, talk } = req.body;
    const newTalker = await talkerManager.createNewTalker({ name, age, talk });
    return res.status(HTTP_CREATED_STATUS).json(newTalker);
  },
);

app.listen(PORT, () => {
  console.log('Online');
});
