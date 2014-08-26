var baboon = require('baboon-image-uri')
var run = require('canvas-testbed')

var getPixels = require('../')

var image = new Image()
image.onload = run.bind(this, null, start)
image.src = baboon

function start(context, width, height) {
    var imgWidth = image.width/2,
        imgHeight = image.height

    var pix = getPixels(image, { x: imgWidth, y: 0, width: imgWidth, height: imgHeight })

    var imgData = context.createImageData(imgWidth, imgHeight)
    imgData.data.set(pix)

    context.clearRect(0,0,width,height)
    context.putImageData(imgData, 0, 0)

    getPixels.dispose()
}