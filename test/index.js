/*!
 *  JSON2Plain Converter.
 *
 *  Test entry.
 *  @author Jarrad Seers <jarrad@jarradseers.com>
 */

const { test } = require('node:test');
const assert = require('node:assert/strict');
const json2plain = require('../');

const json = {
  hello: 'world',
  number: 48392,
  array: ['string', 3948484, true, 'string'],
  object: {
    string: 'hello again',
    another: {
      hey: 'there'
    }
  }
};

const ucFirst = (string) => string.charAt(0).toUpperCase() + string.slice(1);

test('converts nested objects and arrays', () => {
  assert.equal(json2plain(json), [
    '',
    '  Hello: world',
    '  Number: 48392',
    '  Array: ',
    '    - string',
    '    - 3948484',
    '    - true',
    '    - string',
    '  Object: ',
    '    String: hello again',
    '    Another: ',
    '      Hey: there',
    ''
  ].join('\n'));
});

test('accepts a JSON string', () => {
  assert.equal(json2plain('{"code":7,"error":"broken"}'), '\n  Code: 7\n  Error: broken\n');
});

test('throws on an invalid JSON string', () => {
  assert.throws(() => json2plain('{nope'), SyntaxError);
});

test('capitalises keys and leaves values alone by default', () => {
  assert.equal(json2plain({ name: 'bob' }), '\n  Name: bob\n');
});

test('formatKey and formatVal format keys and values', () => {
  const options = {
    formatKey: (key) => `*${key.toUpperCase()}*`,
    formatVal: ucFirst
  };

  assert.equal(json2plain({ name: 'bob', on: true }, options), '\n  *NAME*: Bob\n  *ON*: True\n');
});

test('formatValue is accepted as another name for formatVal', () => {
  assert.equal(json2plain({ name: 'bob' }, { formatValue: ucFirst }), '\n  Name: Bob\n');
});

test('list, indent and separator are configurable', () => {
  const options = { list: '* ', indent: '   ', separator: '\t=\t', formatVal: ucFirst };

  assert.equal(
    json2plain(json, options),
    '\n   Hello\t=\tWorld\n   Number\t=\t48392\n   Array\t=\t\n      * String\n      * 3948484\n'
      + '      * True\n      * String\n   Object\t=\t\n      String\t=\tHello again\n'
      + '      Another\t=\t\n         Hey\t=\tThere\n'
  );
});

test('a numbered list uses the index as the key', () => {
  assert.equal(
    json2plain({ array: ['a', 'b'] }, { list: 'numbered' }),
    '\n  Array: \n    0: a\n    1: b\n'
  );
});

test('depth sets the starting indentation', () => {
  assert.equal(json2plain({ a: 1, b: { c: 2 } }, { depth: 2 }), '\n    A: 1\n    B: \n      C: 2\n');
  assert.equal(json2plain({ a: 1, b: { c: 2 } }, { depth: 0 }), '\nA: 1\nB: \n  C: 2\n');
});

test('prefix, suffix and newline are configurable, including as empty strings', () => {
  assert.equal(json2plain({ a: 1, b: 2 }, { prefix: '', suffix: '' }), '  A: 1\n  B: 2');
  assert.equal(json2plain({ a: 1, b: 2 }, { prefix: '<', suffix: '>', newline: '|' }), '<  A: 1|  B: 2>');
});

test('keeps object keys that look like numbers', () => {
  assert.equal(
    json2plain({ year: { 2024: 'a', 2025: 'b' } }),
    '\n  Year: \n    2024: a\n    2025: b\n'
  );
});

test('converts a top level array, and arrays of objects', () => {
  assert.equal(json2plain(['a', 'b']), '\n  - a\n  - b\n');
  assert.equal(json2plain([{ a: 1, b: 2 }, { a: 3 }]), '\n  - \n    A: 1\n    B: 2\n  - \n    A: 3\n');
});

test('converts nested arrays', () => {
  assert.equal(json2plain({ a: [[1, 2], [3]] }), '\n  A: \n    - \n      - 1\n      - 2\n    - \n      - 3\n');
});

test('null and empty values leave the value blank', () => {
  assert.equal(json2plain({ e: {}, l: [], n: null, s: '' }), '\n  E: \n  L: \n  N: \n  S: \n');
});

test('drops values JSON cannot represent', () => {
  assert.equal(json2plain({ a: 1, fn() {}, u: undefined }), '\n  A: 1\n');
});

test('converts a top level value that is not an object', () => {
  assert.equal(json2plain(5), '\n  5\n');
  assert.equal(json2plain('"hi"'), '\n  hi\n');
  assert.equal(json2plain(null), '\n\n');
});
