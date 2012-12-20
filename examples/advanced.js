var json2plain = require('../');

var json = {
  hello: "world",
  number: 48392,
  array: [
    'string',
    3948484,
    true,
    'string'
  ], "object": {
    "string": "hello again",
    "another": {
      "hey": "there"
    }
  }
};

function ucFirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

var options = {
  list: '* ',
  indent: '   ',
  separator: '\t=\t',
  formatKey: ucFirst,
  formatValue: ucFirst
};

var plain = json2plain(json, options);
console.log(plain);
