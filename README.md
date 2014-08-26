[![browser support](https://ci.testling.com/mattdesl/get-image-pixels.png)](https://ci.testling.com/mattdesl/get-image-pixels)

# get-image-pixels

[![experimental](http://badges.github.io/stability-badges/dist/experimental.svg)](http://github.com/badges/stability-badges)

Uses an intermediary canvas node to grab the RGBA pixels of the given source, with an optional clipping region. Works on HTML Canvas, Image, and Video elements.

```js
var getPixels = require('get-image-pixels')

var data = getPixels(myImage) // returns a Uint8Array
console.log( data.length === (myImage.width * myImage.height * 4) ) //true
```

Or, with clipping:

```js
var halfWidth = myImage.width/2
var data = getPixels(myImage, { x: halfWidth, width: halfWidth })
console.log( data.length === (halfWidth * myImage.height * 4) ) //true
```

## Usage

[![NPM](https://nodei.co/npm/get-image-pixels.png)](https://nodei.co/npm/get-image-pixels/)

### `getPixels(image[, opts])`

Gets the RGBA pixels from HTML Image/Video/Canvas element as a Uint8Array with some optional parameters.

- `x` the x position to start clipping, default 0
- `y` the y position to start clipping, default 0
- `width` the width of the source to copy; this will change the returned array's shape. defaults to image width
- `height` the height of the source to copy; this will change the returned array's shape. defaults to image height

### `getPixels.dispose()`

Release the shared canvas for GC. This is mainly useful if you need to minimize disruptive GC hitches, e.g. in a game loop. 

## License

MIT, see [LICENSE.md](http://github.com/mattdesl/get-image-pixels/blob/master/LICENSE.md) for details.
