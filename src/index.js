let prefixes = {
  modifiers: '{name}--',
  states: 'is-',
};

let push = Array.prototype.push;
let slice = Array.prototype.slice;
let toString = Object.prototype.toString;

/**
 * toType([]) -> 'array'
 *
 * @param {*} object
 * @return {string}
 */
function toType(o) {
  return toString
    .call(o)
    .slice(8, -1)
    .toLowerCase();
}

/**
 * is.array([]) -> true
 *
 * @param {*} object
 * @return {string}
 */
let is = {};
['string', 'boolean', 'array', 'object'].forEach(function(t) {
  is[t] = function(o) {
    return toType(o) === t;
  };
});

/**
 * uniq(['a', 'b', 'a', 'b']) -> ['a', 'b']
 *
 * @param {Array} array
 * @return {Array}
 */
function uniq(array) {
  return array.filter(function(el, i) {
    return array.indexOf(el) === i;
  });
}

/**
 * exclude([null, undefined, 1, 0, true, false, '', 'a', ' b  ']) -> ['a', 'b']
 *
 * @param {Array} array
 * @return {string[]}
 */
function exclude(array) {
  let i;
  let n = [];

  for (i = 0; i < array.length; i++) {
    let el = array[i];
    if (is.string(el) && el.trim() !== '') {
      n.push(el.trim());
    }
  }

  return n;
}

/**
 * split(' a  b  ') -> ['a', 'b']
 *
 * @param {string} className
 * @return {string[]}
 */
function split(className) {
  return className.trim().split(/ +/);
}

/**
 * toClassName(['a', 'b']) -> 'a b'
 *
 * @param {string[]} names
 * @return {string}
 */
function toClassName(names) {
  return names.join(' ').trim();
}

/**
 * detectPrefix('modifiers', { name: 'foo' }) -> 'foo--'
 *
 * @param {string} prefixName
 * @param {Object} classes
 * @return {string}
 */
function detectPrefix(prefixName, classes) {
  return (prefixes[prefixName] || '').replace(/\{([\w-]*?)\}/g, function(
    _,
    p1
  ) {
    return classes[p1] || '';
  });
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
  let n = [];

  for (i = 0; i < propNames.length; i++) {
    let name = propNames[i];
    if (props[name]) {
      n.push(prefix + (is.boolean(props[name]) ? name : props[name]));
    }
  }

  return n;
}

/**
 * @param {Object} classes
 * @param {...Object|string} [props|className]
 * @return {string}
 */
function cx(classes /* , [...props|className] */) {
  if (!classes) {
    return '';
  }

  let args = slice.call(arguments).slice(1);
  let classNames = [];
  let names = Object.keys(classes);
  let i, n;

  for (i = 0; i < names.length; i++) {
    let name = names[i];
    switch (toType(classes[name])) {
      case 'string':
        push.apply(classNames, split(classes[name]));
        break;
      case 'array':
        for (n = 0; n < args.length; n++) {
          let arg = args[n];
          if (is.object(arg)) {
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

  return toClassName(exclude(uniq(classNames)));
}

cx.prefixes = prefixes;

export default cx;
