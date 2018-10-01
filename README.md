# `tagged-switch`

[![npm](https://img.shields.io/npm/v/tagged-switch.svg?style=flat-square)](https://www.npmjs.com/package/tagged-switch)
[![npm](https://img.shields.io/npm/l/tagged-switch.svg?style=flat-square)](https://www.npmjs.com/package/tagged-switch)

Library to experiment using [template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) for creating a `switch`/`case` expression returning the respective value.

## Installation

    npm install --save tagged-switch
    yarn add tagged-switch

## Usage

The library can be used to create case-matching statements which return their respective values:

```javascript
import taggedSwitch from 'tagged-switch';

const currencySymbolToName = taggedSwitch`
  ${'€'} -> ${'Euro'}
  ${'$'} -> ${'Dollar'}
  ${'£'} -> ${'Pound'}
  _ -> ${'Unknown'}
`;

console.log(currencySymbolToName('€')); // Euro
```

The following checks will be performed and will throw an error in the case that one check fails:

* There must be at least one specific case and one default case.
* The cases must use a `->`-string to separate the key of the case from its value.
* The default value must be the last one, declared by a `_`-string followed by the `->`-string.
* Keys can only occur once.

## TODO

* useful tests
* support of ES5

## License

Licensed under GNU General Public License v3.0. See [LICENSE](./LICENSE).
