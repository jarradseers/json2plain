# JSON2Plain

[![CI](https://github.com/jarradseers/json2plain/actions/workflows/ci.yml/badge.svg)](https://github.com/jarradseers/json2plain/actions/workflows/ci.yml)
[![npm](https://img.shields.io/npm/v/json2plain.svg)](https://www.npmjs.com/package/json2plain)

JSON in, plain text out.

The _json2plain_ module was written as a suitable final fallback for a REST API doing automatic content negotiation. Small, with no dependencies.

## Installation

```bash
$ npm install json2plain
```

## Usage

```js
const json2plain = require('json2plain');

const plain = json2plain(json, options);
```

* `json` - an object, an array, or a valid JSON string.
* `options` - optional object, see [Options](#options).

It returns a string. An invalid JSON string throws a `SyntaxError`.

### Simple example

```js
const json2plain = require('json2plain');

const json = {
  code: 7489394874,
  error: "It don't workie",
  description: 'Someone broke it.'
};

console.log(json2plain(json));
```

```

  Code: 7489394874
  Error: It don't workie
  Description: Someone broke it.

```

### More advanced example

```js
const json2plain = require('json2plain');

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

function ucFirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const options = {
  list: '* ',
  indent: '   ',
  separator: ' = ',
  formatVal: ucFirst
};

console.log(json2plain(json, options));
```

```

   Hello = World
   Number = 48392
   Array = 
      * String
      * 3948484
      * True
      * String
   Object = 
      String = Hello again
      Another = 
         Hey = There

```

There are more in the [examples folder](examples).

## Options

| Option | Type | Default | Description |
|---|---|---|---|
| `depth` | number | `1` | Levels of indentation to start with. |
| `newline` | string | `'\n'` | Line separator. |
| `indent` | string | two spaces | One level of indentation. |
| `separator` | string | `': '` | Placed between a key and its value. |
| `prefix` | string | `'\n'` | Inserted before the output. |
| `suffix` | string | `'\n'` | Appended to the output. |
| `list` | string | `'- '` | Placed before each array item. `'numbered'` shows the item's index as a key instead. |
| `formatKey` | function | capitalise the first letter | Format each key. |
| `formatVal` | function | leave as is | Format each value, which is passed as a string. `formatValue` is accepted as well. |

String options can be set to `''`, for example `{ prefix: '', suffix: '' }` for output with no surrounding blank lines.

## How values are written

* Objects and arrays are written one level deeper, on the lines below their key.
* `null` and empty objects and arrays leave the value blank.
* Values JSON cannot represent, such as functions and `undefined`, are dropped.

## Upgrading from 0.1.x

* Values are no longer capitalised by default; this now matches the documentation. Pass `formatVal` to format them.
* Object keys that look like numbers, such as `"2024"`, are written as keys. They were written as list items and the key was lost.
* Empty strings and `depth: 0` are honoured as options. They were replaced by the defaults.

## Tests

```bash
$ npm install
$ npm test
```

## License

[MIT](LICENSE)
