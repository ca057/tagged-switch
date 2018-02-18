const ts = require('./');

const fKey = () => {};

const fruitName = ts`
${fKey} -> ${'apple'}
${1} -> ${'bananna'}
${2} -> ${'clementine'}
_ -> ${'no number no fruit'}`(fKey);

console.log(fruitName);
