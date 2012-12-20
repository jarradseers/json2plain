var json2plain = require('../');

var json = {
  code: 7489394874,
  error: 'It don\'t workie',
  description: 'Someone broke it.'
};

var plain = json2plain(json);
console.log(plain);