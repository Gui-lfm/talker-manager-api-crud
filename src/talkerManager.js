const fs = require('fs/promises');
const { join } = require('path');

const path = './talker.json';

const readTalkerFile = async () => {
  try {
    const content = await fs.readFile(join(__dirname, path), 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    return null;
  }
};

const WriteTalkerFile = async (content) => {
  try {
    await fs.writeFile(join(__dirname, path), JSON.stringify(content));
  } catch (error) {
    console.log('erro ao salvar modificações', error.message);
    return null;
  }
};

const getTalkers = async () => {
  const talkers = await readTalkerFile();
  return talkers;
};

const getTalkerById = async (id) => {
  const talkers = await readTalkerFile();
  const Selectedtalker = talkers.find((talker) => talker.id === Number(id));
  return Selectedtalker;
};

const createNewTalker = async (content) => {
  const talkers = await readTalkerFile();

  const newId = talkers[talkers.length - 1].id + 1;
  const newTalker = { id: newId, ...content };
  talkers.push(newTalker);

  await WriteTalkerFile(talkers);

  return newTalker;
};

const editTalk = async ({ id, name, age, talk }) => {
  const talkers = await readTalkerFile();
  const Selectedtalker = talkers.find((talker) => talker.id === Number(id));

  Selectedtalker.name = name;
  Selectedtalker.age = age;
  Selectedtalker.talk = talk;

  await WriteTalkerFile(talkers);
  return Selectedtalker;
};

const deleteTalker = async (id) => {
  const talkers = await readTalkerFile();
  const updatedTalkers = talkers.filter((talker) => talker.id !== Number(id));

  await WriteTalkerFile(updatedTalkers);
};

const searchTalkers = async (searchParams) => {
  const talkers = await readTalkerFile();
  const { rate, q } = searchParams;
  let searchResult = talkers;

  if (rate) {
    searchResult = searchResult.filter(
      (talker) => talker.talk.rate === Number(rate),
    );
  }

  if (q) {
    searchResult = searchResult.filter(
      (talker) => talker.name.toLowerCase().includes(q.toLowerCase()),
    );
  }

  return searchResult;
};

module.exports = {
  readTalkerFile,
  getTalkers,
  getTalkerById,
  createNewTalker,
  editTalk,
  deleteTalker,
  searchTalkers,
};
