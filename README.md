### Validate Image URL 

[![NPM Version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Test Coverage][coveralls-image]][coveralls-url]
[![Dependencies][dependencies-image]][dependencies-url]
[![devDependencies][devdependencies-image]][devdependencies-url]  
[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

Checks asynchronously whether an image URL is valid or not.

By default, if an image URL is invalid, the browser would show the following image:  
![before](/docs/invalid-image-before.png?raw=true)  
In that case, you might want show a different image such as:  
![after](/docs/invalid-image-after.png?raw=true)

This package tells you whether the image URL is valid or not.

#### Installation:
```
npm install --save validate-image-url
```

#### Usage:
```javascript
import validator from 'validate-image-url'

const promise = validator({url: '<image-url>', timeout: 10000})
  .then(({image, url}) => {
    console.log('Image URL is valid.', 'URL:', url, 'image:', image)
  })
  .catch((err) => {
    console.error('Invalid image URL or image could not be fetched within 10000 milliseconds.', 'error:', err)
  })
  
  // NOTE: the promise can be canceled by calling 
  // promise.cancel()
```

#### Options:
* **url** - (required) image URL.
* **timeout** - (optional) timeout in milliseconds before canceling request and rejecting the promise. Default: 5000 milliseconds.

### License
[MIT](https://tldrlegal.com/license/mit-license)

### Author
[Oron Nadiv](https://github.com/OronNadiv) ([oron@nadiv.us](mailto:oron@nadiv.us))

[npm-image]: https://img.shields.io/npm/v/validate-image-url.svg?style=flat-square
[npm-url]: https://npmjs.org/package/validate-image-url
[travis-image]: http://img.shields.io/travis/OronNadiv/validate-image-url.svg?style=flat-square
[travis-url]: https://travis-ci.org/OronNadiv/validate-image-url
[coveralls-image]: http://img.shields.io/coveralls/OronNadiv/validate-image-url.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/OronNadiv/validate-image-url?branch=master

[dependencies-image]: https://david-dm.org/OronNadiv/validate-image-url/status.svg?style=flat-square
[devdependencies-image]: https://david-dm.org/OronNadiv/validate-image-url/dev-status.svg?style=flat-square

[dependencies-url]: https://david-dm.org/OronNadiv/validate-image-url
[devdependencies-url]: https://david-dm.org/OronNadiv/validate-image-url?type=dev
