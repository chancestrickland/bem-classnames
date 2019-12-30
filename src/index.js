let prefixes = {
  modifiers: '{name}--',
  states: 'is-',
};

let { push } = Array.prototype;

/**
 * detectPrefix('modifiers', { name: 'foo' }) === 'foo--'
 *
 * @param {string} prefixName
 * @param {Object} classes
 * @return {string}
 */
const detectPrefix = (prefixName, classes) =>
  (prefixes[prefixName] || '').replace(
    /\{([\w-]*?)\}/g,
    (_, p1) => classes[p1] || ''
  );

/**
 * Filter all duplicate values from an array.
 *
 * @param {Array} array
 * @return {Array}
 */
function filterDuplicateValues(array) {
  let n = [];
  for (let i = 0; i < array.length; i++) {
    let el = array[i];
    if (array.indexOf(el) === i) {
      n.push(el);
    }
  }
  return n;
}

/**
 * Exclude non-empty strings and non-string values from an array.
 *
 * @param {Array} array
 * @return {string[]}
 */
function filterNonStringValues(array) {
  let filtered = [];
  for (let i = 0; i < array.length; i++) {
    let el = array[i];
    if (typeof el === 'string') {
      let trimmed = el.trim();
      if (trimmed) {
        filtered.push(trimmed);
      }
    }
  }
  return filtered;
}

/**
 * getClassNamesByProps(['a'], { a: 'foo' }, '-') -> [ '-foo' ]
 *
 * @param {string[]} propNames
 * @param {Object} props
 * @param {string} [prefix]
 * @return {string[]}
 */
function getClassNamesByProps(propNames, props, prefix) {
  prefix = prefix || '';
  let i;
  let filtered = [];

  for (i = 0; i < propNames.length; i++) {
    let name = propNames[i];
    if (props[name]) {
      filtered.push(
        prefix + (typeof props[name] === 'boolean' ? name : props[name])
      );
    }
  }

  return filtered;
}

/**
 * split(' a  b  ') -> ['a', 'b']
 *
 * @param {string} className
 * @return {string[]}
 */
const split = className => className.trim().split(/ +/);

/**
 * toClassName(['a', 'b']) -> 'a b'
 *
 * @param {string[]} names
 * @return {string}
 */
const toClassName = names => names.join(' ').trim();

/**
 * toType([]) -> 'array'
 *
 * @param {*} object
 * @return {string}
 */
const toType = o =>
  Object.prototype.toString
    .call(o) // e.g. [object Array]
    .slice(8, -1) // e.g. Array
    .toLowerCase(); // array

/**
 * @param {Object} classes
 * @param {...Object|string} [props|className]
 * @return {string}
 */
function cx(classes, ...args) {
  if (!classes) return '';

  let classNames = [];
  let names = Object.keys(classes);

  // Counter variables for loops
  let i;
  let n;

  for (i = 0; i < names.length; i++) {
    let name = names[i];
    switch (toType(classes[name])) {
      case 'string':
        push.apply(classNames, split(classes[name]));
        break;
      case 'array':
        for (n = 0; n < args.length; n++) {
          let arg = args[n];
          if (toType(arg) === 'object') {
            let newNames = getClassNamesByProps(
              classes[name],
              arg,
              detectPrefix(name, classes)
            );
            push.apply(classNames, newNames);
          }
        }
        break;
      default:
    }
  }

  for (i = 0; i < args.length; i++) {
    let arg = args[i];
    switch (toType(arg)) {
      case 'string':
        push.apply(classNames, split(arg));
        break;
      case 'array':
        push.apply(classNames, arg);
        break;
      default:
    }
  }

  return toClassName(filterNonStringValues(filterDuplicateValues(classNames)));
}

cx.prefixes = prefixes;

export default cx;
