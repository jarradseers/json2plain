/*!
 *  JSON2Plain Converter.
 *
 *  @author Jarrad Seers <jarrad@jarradseers.com>
 *  @created Fri 21 Dec 2012 01:25:58 NZDT
 */

/**
 *  JSON2Plain constructor.
 *
 *  @param json {Object|String} - valid JSON struct to convert.
 *  @param options {Object} - options object containing any or all of:
 *    depth     {Number}   - amount of indentation to start with, defaults to 1.
 *    newline   {String}   - string to use for newline, defaults to '\n'.
 *    indent    {String}   - indentation, defaults to two spaces: '  '.
 *    separator {String}   - used to separate key from value, default: ': '.
 *    prefix    {String}   - inserted before the output, defaults to '\n'.
 *    suffix    {String}   - appended to the final output, defaults to '\n'.
 *    list      {String}   - 'numbered' will list numbered array keys, defaults to '- '.
 *    formatKey {Function} - format the keys: function(key){return key.toUpperCase()}..
 *    formatVal {Function} - format the values: function(val) {return val}.
 *  @returns JSON2Plain {Object} - this instance.
 */

var JSON2Plain = function(json, options) {
  var options = options || {};

  if (typeof json !== 'string') {
    json = JSON.stringify(json);
  }

  json = JSON.parse(json);

  this.depth      = options.depth     || 1;
  this.newline    = options.newline   || '\n';
  this.indent     = options.indent    || '  ';
  this.separator  = options.separator || ': ';
  this.list       = options.list      || '- ';

  this.output     = options.prefix    || '\n';

  this.formatKey  = options.formatKey || this.ucFirst;
  this.formatVal  = options.formatVal || this.ucFirst; 

  this.__process(this.depth, json);
  this.output += options.suffix || '\n';

  return this;
};

/**
 *  Format indentation based on depth.
 *
 *  @param depth {Number} - indentation depth.
 *  @returns JSON2Plain {Object} - this instance.
 */

JSON2Plain.prototype.__format = function(depth) {
  for (var d=0; d<depth; d++) {
    this.output += this.indent;
  }

  return this;
};

/**
 *  Uppercase first method.
 *
 *  @param string {String} - string to uppercase first char.
 *  @returns {String} - uppercased first character.
 */

JSON2Plain.prototype.ucFirst = function(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

/**
 *  Recursive processing.
 *
 *  @param depth {Number} - indentation depth.
 *  @param json {Object} - valid JSON object.
 *  @returns JSON2Plain {Object} - this instance.
 */

JSON2Plain.prototype.__process = function(depth, json) {
  var count = 0;

  for (var key in json) {
    if (count !== 0 || depth !== this.depth) {
      this.output += this.newline;
    }

    this.__format(depth);
    if (this.list.toLowerCase() !== 'numbered' && !isNaN(key)) {
      this.output += this.list;
    } else {
      this.output += this.formatKey(key.toString()) + this.separator;
    }

    if (typeof json[key] === 'object') {
      this.__process(depth +1, json[key]);
    } else {
      this.output += this.formatVal(json[key].toString());
    }

    count++;
  }

  return this;
};

/**
 *  Expose the JSON2Plain.
 *
 *  @param depth {Number} - indentation depth.
 *  @param json {Object} - valid JSON object.
 *  @returns output {String} - Plain text.
 */

module.exports = function(json, options) {
  return new JSON2Plain(json, options).output;
};