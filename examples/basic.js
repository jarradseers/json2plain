const json2plain = require('../');

const json = {
  code: 7489394874,
  error: 'It don\'t workie',
  description: 'Someone broke it.'
};

const plain = json2plain(json);
console.log(plain);