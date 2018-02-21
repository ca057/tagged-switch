const { test } = require('ava');

const ts = require('.');

test('should return the correct case if one matches', t => {
  const fnKey = () => {};
  const strKey = 'string';
  const numKey = 1337;
  const trueKey = true;
  const falseKey = false;

  const testCases = ts`
    ${fnKey} -> ${'function'}
    ${strKey} -> ${'string'}
    ${numKey} -> ${'number'}
    ${trueKey} -> ${'true'}
    ${falseKey} -> ${'false'}
    _ -> ${'default'}
  `;

  t.is(testCases(fnKey), 'function');
  t.is(testCases(strKey), 'string');
  t.is(testCases(numKey), 'number');
  t.is(testCases(trueKey), 'true');
  t.is(testCases(falseKey), 'false');
});

test.skip('should return default case when no case matches', t => {});

test('should throw error if no default case is specified', t => {
  t.throws(
    () => ts`
    ${0} -> ${0}
  `
  );
});

test('should throw error if not at least one case is specified', t => {
  t.throws(ts``);
});

test.skip('should throw error if there are keys passed twice', t => {});
