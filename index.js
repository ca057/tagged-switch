const forEachSecond = (callback, start, data) => {
  for (let i = start; i < data.length - 1; i += 2) {
    callback(i, data);
  }
};

const validateCases = cases => cases.length >= 3 && cases.length % 2 !== 0;

const validateTemplate = template => {
  // every second string should contain "->"
  let everySecondIsArrow = true;
  forEachSecond(
    index => {
      const nextTemplate = template[index];
      everySecondIsArrow =
        everySecondIsArrow &&
        nextTemplate &&
        nextTemplate.trim().includes('->');
    },
    1,
    template
  );

  // the last but one should contain "_" followed by "->"
  const lastButOne = template[template.length - 2];
  const lastButOneIsDefault =
    (lastButOne && lastButOne.indexOf('_') < lastButOne.indexOf('->')) || false;

  return everySecondIsArrow && lastButOneIsDefault;
};

// internal helper to pluralize the string case/cases
const pluralizeCasesString = amount => (amount === 1 ? 'case' : 'cases');

module.exports = (...args) => {
  const [template, ...cases] = args;
  if (!validateCases(cases)) {
    throw new TypeError(
      'Looks like there is not at least one case definition or the default case is missing.'
    );
  } else if (!validateTemplate(template)) {
    throw new TypeError(
      'The syntax declaring the cases seems not to be correct.'
    );
  }

  const casesMap = new Map();
  forEachSecond(
    index => {
      casesMap.set(cases[index], cases[index + 1]);
    },
    0,
    cases
  );

  const finalCasesCount = casesMap.size;
  const passedCasesCount = (cases.length - 1) / 2;
  if (finalCasesCount !== passedCasesCount) {
    throw new Error(
      `Computed ${finalCasesCount} final ${pluralizeCasesString(
        finalCasesCount
      )}, but got ${passedCasesCount} ${pluralizeCasesString(
        passedCasesCount
      )} passed.`
    );
  }

  return data =>
    casesMap.has(data) ? casesMap.get(data) : cases[cases.length - 1];
};
