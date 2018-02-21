const { test } = require('ava');

const ts = require('.');

test('should return the correct case if one matches', t => {
  const fnKey = () => {};
  const strKey = 'string';
  const numKey = 1337;
  const trueKey = true;
  const falseKey = false;
  const objKey = {};
  const NaNKey = NaN;

  const testCases = ts`
    ${fnKey} -> ${'function'}
    ${strKey} -> ${'string'}
    ${numKey} -> ${'number'}
    ${trueKey} -> ${'true'}
    ${falseKey} -> ${'false'}
    ${objKey} -> ${'object'}
    ${NaNKey} -> ${'NaN'}
    _ -> ${'default'}
  `;

  t.is(testCases(fnKey), 'function');
  t.is(testCases(strKey), 'string');
  t.is(testCases(numKey), 'number');
  t.is(testCases(trueKey), 'true');
  t.is(testCases(falseKey), 'false');
  t.is(testCases(objKey), 'object');
  t.is(testCases(NaNKey), 'NaN');
});

test.skip('should return default case when no case matches', t => {});

test('should throw error if no default case is specified', t => {
  t.throws(
    () => ts`
    ${0} -> ${0}
  `
  );
});

test('should throw error if not at least one case and one default case is specified', t => {
  t.throws(() => ts``);
});

test('should throw error if there are keys passed twice', t => {
  const strKey = 'key';
  const fnKey = () => {};

  t.throws(
    () => ts`
    ${strKey} -> ${'first'}
    ${strKey} -> ${'second'}
    _ -> ${'default'}
  `
  );
  t.throws(
    () => ts`
    ${fnKey} -> ${'first'}
    ${fnKey} -> ${'second'}
    _ -> ${'default'}
  `
  );
});
