const validateCases = cases => {};
const validateTemplate = template => {};

module.exports = (...args) => {
  const [template, ...cases] = args;

  // TODO validate inputs
  const casesMap = new Map();
  for (let i = 0; i < cases.length - 1; i += 2) {
    casesMap.set(cases[i], cases[i + 1]);
  }

  return data =>
    casesMap.has(data) ? casesMap.get(data) : cases[cases.length - 1];
};
