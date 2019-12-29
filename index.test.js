'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

var _index = _interopRequireDefault(require('./index'));

describe('cx', function() {
  var classes = {
    name: 'button',
    modifiers: ['color', 'block'],
    states: ['loading', 'disabled'],
  };
  it('should return empty string', function() {
    expect((0, _index['default'])()).toEqual('');
  });
  it('should return block name', function() {
    expect((0, _index['default'])(classes)).toEqual('button');
  });
  it('should return modifiers', function() {
    expect(
      (0, _index['default'])(classes, {
        color: 'green',
      })
    ).toEqual('button button--green');
    expect(
      (0, _index['default'])(classes, {
        color: 'green',
        block: true,
      })
    ).toEqual('button button--green button--block');
    expect(
      (0, _index['default'])(
        classes,
        {
          color: 'green',
        },
        {
          block: true,
        }
      )
    ).toEqual('button button--green button--block');
    expect(
      (0, _index['default'])(
        classes,
        {
          color: false,
        },
        {
          block: true,
        }
      )
    ).toEqual('button button--block');
  });
  it('should return states', function() {
    expect(
      (0, _index['default'])(classes, {
        loading: true,
      })
    ).toEqual('button is-loading');
    expect(
      (0, _index['default'])(classes, {
        loading: true,
        disabled: true,
      })
    ).toEqual('button is-loading is-disabled');
    expect(
      (0, _index['default'])(
        classes,
        {
          loading: true,
        },
        {
          disabled: true,
        }
      )
    ).toEqual('button is-loading is-disabled');
  });
  it('supports a string of class names', function() {
    expect(
      (0, _index['default'])(
        {
          name: 'button',
        },
        'a'
      )
    ).toEqual('button a');
    expect((0, _index['default'])(classes, 'a')).toEqual('button a');
    expect((0, _index['default'])(classes, 'a', 'b c')).toEqual('button a b c');
    expect(
      (0, _index['default'])(classes, 'a', {
        b: false,
      })
    ).toEqual('button a');
  });
  it('supports an array of class names', function() {
    expect((0, _index['default'])(classes, ['a'])).toEqual('button a');
    expect((0, _index['default'])(classes, ['a'], ['b', 'c'])).toEqual(
      'button a b c'
    );
  });
  it('should ignore, except for valid objects', function() {
    expect(
      (0, _index['default'])(
        classes,
        null,
        undefined,
        1,
        0,
        true,
        false,
        '',
        {
          color: 'green',
        },
        'a',
        ['b', 'c']
      )
    ).toEqual('button button--green a b c');
  });
  it('should be trimmed', function() {
    expect((0, _index['default'])(classes, '', ' b  ', [' '])).toEqual(
      'button b'
    );
  });
  it('should dedupe', function() {
    expect((0, _index['default'])(classes, 'foo', 'bar', 'foo', 'bar')).toEqual(
      'button foo bar'
    );
  });
  it('should be custom prefixes', function() {
    _index['default'].prefixes.modifiers = '-';
    expect(
      (0, _index['default'])(classes, {
        color: 'green',
        block: true,
      })
    ).toEqual('button -green -block');
  });
  it('should be custom rules', function() {
    _index['default'].prefixes.foo = 'foo-';
    classes.foo = ['a', 'b'];
    expect(
      (0, _index['default'])(classes, {
        a: true,
        b: true,
      })
    ).toEqual('button foo-a foo-b');
  });
});
