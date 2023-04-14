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

// const WriteTalkerFile = async (content) => {
//   try {
//     await fs.writeFile(join(__dirname, path), JSON.stringify(content));
//   } catch (error) {
//     console.log('erro ao salvar modificações', error.message);
//     return null;
//   }
// };

const getTalkers = async () => {
  const talkers = await readTalkerFile();
  return talkers;
};

const getTalkerById = async (id) => {
  const talkers = await readTalkerFile();
  const Selectedtalker = talkers.find((talker) => talker.id === Number(id));
  return Selectedtalker;
};

module.exports = {
  getTalkers,
  getTalkerById,
};
