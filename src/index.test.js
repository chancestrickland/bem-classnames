import cx from './index';

describe('cx', () => {
  let classes = {
    name: 'button',
    modifiers: ['color', 'block'],
    states: ['loading', 'disabled'],
  };

  it('should return empty string', () => {
    expect(cx()).toEqual('');
  });

  it('should return block name', () => {
    expect(cx(classes)).toEqual('button');
  });

  it('should return modifiers', () => {
    expect(cx(classes, { color: 'green' })).toEqual('button button--green');
    expect(cx(classes, { color: 'green', block: true })).toEqual(
      'button button--green button--block'
    );
    expect(cx(classes, { color: 'green' }, { block: true })).toEqual(
      'button button--green button--block'
    );
    expect(cx(classes, { color: false }, { block: true })).toEqual(
      'button button--block'
    );
  });

  it('should return states', () => {
    expect(cx(classes, { loading: true })).toEqual('button is-loading');
    expect(cx(classes, { loading: true, disabled: true })).toEqual(
      'button is-loading is-disabled'
    );
    expect(cx(classes, { loading: true }, { disabled: true })).toEqual(
      'button is-loading is-disabled'
    );
  });

  it('supports a string of class names', () => {
    expect(cx({ name: 'button' }, 'a')).toEqual('button a');
    expect(cx(classes, 'a')).toEqual('button a');
    expect(cx(classes, 'a', 'b c')).toEqual('button a b c');
    expect(cx(classes, 'a', { b: false })).toEqual('button a');
  });

  it('supports an array of class names', () => {
    expect(cx(classes, ['a'])).toEqual('button a');
    expect(cx(classes, ['a'], ['b', 'c'])).toEqual('button a b c');
  });

  it('should ignore, except for valid objects', () => {
    expect(
      cx(
        classes,
        null,
        undefined,
        1,
        0,
        true,
        false,
        '',
        { color: 'green' },
        'a',
        ['b', 'c']
      )
    ).toEqual('button button--green a b c');
  });

  it('should be trimmed', () => {
    expect(cx(classes, '', ' b  ', [' '])).toEqual('button b');
  });

  it('should dedupe', () => {
    expect(cx(classes, 'foo', 'bar', 'foo', 'bar')).toEqual('button foo bar');
  });

  it('should be custom prefixes', () => {
    cx.prefixes.modifiers = '-';
    expect(cx(classes, { color: 'green', block: true })).toEqual(
      'button -green -block'
    );
  });

  it('should be custom rules', () => {
    cx.prefixes.foo = 'foo-';
    classes.foo = ['a', 'b'];
    expect(cx(classes, { a: true, b: true })).toEqual('button foo-a foo-b');
  });
});
