# `tagged-switch`

Library to experiment using [template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) for creating a `switch`/`case` expression returning the respective value.

## Installation

    npm install --save tagged-switch
    yarn add tagged-switch

## Usage

The library can be used to create case-matching statements which returns the respective value:

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

## License
