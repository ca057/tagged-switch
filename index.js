const forEachSecond = (callback, start, data) => {
  for (let i = start; i < data.length - 1; i += 2) {
    callback(i, data);
  }
};

const validateCases = cases => cases.length && cases.length % 2 !== 0;

const validateTemplate = template => {
  if (template.length < 4) {
    return false;
  }
  // every second string should contain "->"
  let everySecondIsArrow = true;
  forEachSecond(
    index => {
      const nextTemplate = template[index];
      console.log('nextTemplate', nextTemplate);
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

module.exports = (...args) => {
  const [template, ...cases] = args;
  if (!validateTemplate(template)) {
    throw new TypeError(
      'The syntax declaring the cases seems not to be correct.'
    );
  } else if (!validateCases(cases)) {
    throw new TypeError(
      'Looks like there are no case definitions or a missing default case.'
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

  return data =>
    casesMap.has(data) ? casesMap.get(data) : cases[cases.length - 1];
};
