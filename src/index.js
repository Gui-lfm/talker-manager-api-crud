const express = require('express');
const talkerManager = require('./talkerManager');
const generateToken = require('./utils/generateToken');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
// const HTTP_CREATED_STATUS = 201;
// const HTTP_NO_CONTENT_STATUS = 204;
// const HTTP_BAD_REQUEST_STATUS = 400;
// const HTTP_UNATHORIZED_STATUS = 401;
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

  const talker = await talkerManager.getTalkerById(id);

  if (!talker) {
    return res
      .status(HTTP_NOT_FOUND_STATUS)
      .json({ message: 'Pessoa palestrante não encontrada' });
  }
  return res.status(HTTP_OK_STATUS).json(talker);
});

app.post('/login', async (_req, res) => {
  // const { email, password } = req.body;
  const token = generateToken();
  return res.status(HTTP_OK_STATUS).json({ token });
});

app.listen(PORT, () => {
  console.log('Online');
});
