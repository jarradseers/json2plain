var json2plain = require('../');

var json = {
  hello: "world",
  array: [
    'string',
    3948484,
    true,
    'string'
  ]
};

var plain = json2plain(json, {
  list: 'numbered'
});
console.log(plain);