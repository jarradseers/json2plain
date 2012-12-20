
# JSON2Plain

JSON in, Plain text out.

The _json2plain_ module was written as a suitable final fallback for a REST API doing automatic content negotiation.

## Installation

	$ npm install json2plain

## Usage

```js
var json2plain = require('json2plain');

var plain = json2plain(json, options);
```

### Parameters
`json` - Can be a JSON Object or valid JSON String.
`options` - Optional Object, options are listed below.

### Simple Example

```js
var json2plain = require('json2plain');

var json = {
  "code": 7489394874,
  "error": "It don\'t workie",
  "description": "Someone broke it."
};

var plain = json2plain(json);
console.log(plain);
```

	Code: 7489394874
	Error: It don't workie
	Description: Someone broke it.

## Options

`depth`     {Number}   - amount of indentation to start with, defaults to 1.
`newline`   {String}   - string to use for newline, defaults to '\n'.
`indent`    {String}   - indentation, defaults to two spaces: '  '.
`separator` {String}   - used to separate key from value, default: ': '.
`prefix`    {String}   - inserted before the output, defaults to '\n'.
`suffix`    {String}   - appended to the final output, defaults to '\n'.
`list`      {String}   - 'numbered' will list numbered array keys, defaults to '- '.
`formatKey` {Function} - format the keys: function(key){return key.toUpperCase()}..
`formatVal` {Function} - format the values: function(val) {return val}.

Please see the _examples_ folder for working examples of _json2plain_ in action.

# License 

(The MIT License)

Copyright (c) 2012 Jarrad Seers &lt;jarrad@jarradseers.com&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
