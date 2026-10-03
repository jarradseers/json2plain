const json2plain = require('../');

const json = {
  hello: "world",
  array: [
    'string',
    3948484,
    true,
    'string'
  ]
};

const plain = json2plain(json, {
  list: 'numbered'
});
console.log(plain);