/*!
 *  JSON2Plain Converter.
 *
 *  @author Jarrad Seers <jarrad@jarradseers.com>
 *  @created Fri 21 Dec 2012 01:25:58 NZDT
 */

/**
 *  Capitalise the first character of a string.
 *
 *  @param string {String}
 *  @returns {String}
 */

function ucFirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 *  Pick the first value that was given, so that empty strings and zero
 *  can be passed as options.
 *
 *  @param values {...*} - candidates, in order of preference.
 *  @returns {*}
 */

function pick(...values) {
  return values.find((value) => value !== undefined && value !== null);
}

/**
 *  JSON2Plain.
 *
 *  @param json {Object|Array|String} - structure, or valid JSON string, to convert.
 *  @param options {Object} - options object containing any or all of:
 *    depth     {Number}   - amount of indentation to start with, defaults to 1.
 *    newline   {String}   - string to use for newline, defaults to '\n'.
 *    indent    {String}   - indentation, defaults to two spaces: '  '.
 *    separator {String}   - used to separate key from value, default: ': '.
 *    prefix    {String}   - inserted before the output, defaults to '\n'.
 *    suffix    {String}   - appended to the final output, defaults to '\n'.
 *    list      {String}   - prefix for array items, defaults to '- '.
 *                           'numbered' uses the item's index as its key.
 *    formatKey {Function} - format the keys, defaults to capitalising the first letter.
 *    formatVal {Function} - format the values, defaults to leaving them as they are.
 *  @returns {String} - plain text.
 */

function json2plain(json, options) {
  options = options || {};

  if (typeof json !== 'string') {
    json = JSON.stringify(json);
  }

  json = JSON.parse(json);

  const start = pick(options.depth, 1);
  const newline = pick(options.newline, '\n');
  const indent = pick(options.indent, '  ');
  const separator = pick(options.separator, ': ');
  const list = pick(options.list, '- ');
  const numbered = list.toLowerCase() === 'numbered';
  const formatKey = options.formatKey || ucFirst;
  const formatVal = options.formatVal || options.formatValue || String;

  let output = pick(options.prefix, '\n');

  /**
   *  Write out one level of the structure.
   *
   *  @param depth {Number} - current indentation level.
   *  @param node {Object|Array} - object or array to write.
   */

  function process(depth, node) {
    Object.keys(node).forEach((key, count) => {
      const value = node[key];

      if (count !== 0 || depth !== start) {
        output += newline;
      }

      output += indent.repeat(depth);

      if (Array.isArray(node) && !numbered) {
        output += list;
      } else {
        output += formatKey(key) + separator;
      }

      if (value !== null && typeof value === 'object') {
        process(depth + 1, value);
      } else if (value !== null) {
        output += formatVal(String(value));
      }
    });
  }

  if (json !== null && typeof json === 'object') {
    process(start, json);
  } else if (json !== null) {
    output += indent.repeat(start) + formatVal(String(json));
  }

  return output + pick(options.suffix, '\n');
}

/**
 *  Module exports.
 */

module.exports = json2plain;
