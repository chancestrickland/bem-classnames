# bem-classnames

[![npm](https://img.shields.io/npm/v/bem-classnames.svg)](https://npmjs.org/package/bem-classnames)

bem-classnames is a simple utility to manage BEM class names in JavaScript.

Inspired by [classnames](https://github.com/JedWatson/classnames).

```sh
npm install bem-classnames
```

## Usage

```js
import cx from '@chancestrickland/bem-classnames';

cx(/* classes, [...props|className] */);
```

### Simple

```js
let classes = {
  name: 'button',
  modifiers: ['color', 'block'],
  states: ['disabled'],
};

cx(classes, { color: 'green', block: true }); // "button button--green button--block"
cx(classes, { disabled: true }); // "button is-disabled"
cx(classes, 'a b', ['c', 'd']); // "button a b c d"
```

### With a Custom Prefix

```js
// Default prefixes:
//
// cx.prefixes = {
//   modifiers: '{name}--',
//   states: 'is-'
// };

cx.prefixes.modifiers = '{name}-';
cx(classes, { color: 'green' }); // "button-green"

// You can add the prefixes
cx.prefixes.foo = 'foo-';
classes.foo = ['a', 'b'];
cx(classes, { a: true, b: true }); // "button foo-a foo-b"
```

### With React

```js
import React from 'react';
import cx from 'bem-classnames';

function Button({ children, className, ...props }) {
  let classes = {
    name: 'button',
    modifiers: ['color', 'size'],
    states: ['disabled'],
  };

  return (
    <button className={cx(classes, props, className)} disabled={props.disabled}>
      {children}
    </button>
  );
}

React.render(
  <Button color="green" size="xl" disabled={true} className="a b">
    Alo!
  </Button>,
  document.getElementById('example')
);

// "button button--green button--xl is-disabled a b"
```

### Managing the BEM Elements

```js
function Button({ children, className, ...props }) {
  let classes = {
    button: {
      name: 'button',
      modifiers: ['color', 'size'],
      states: ['disabled'],
    },
    button__inner: {
      name: 'button__inner',
      modifiers: ['align'],
    },
  };

  return (
    <button className={cx(classes.button, props, className)}>
      <span className={cx(classes.button__inner, props)}>{children}</span>
    </button>
  );
}

React.render(
  <Button color="green" align="center">
    Alo!
  </Button>,
  document.getElementById('example')
);

// button -> "button button--green"
// span -> "button__inner button__inner--center"
```
