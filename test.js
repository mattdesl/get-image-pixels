var test = require('tape').test
var uri = require('baboon-image-uri')
var getPixels = require('./')

test('creates image', function(t) {
    t.plan(3)

    if (typeof Image === 'undefined')
        throw new Error('test must be performed in a browser with Image support')
    
    var img = new Image()
    img.onload = function() {
        var w = img.width/2,
            h = img.height/2
        
        var full = getPixels(img)
        t.equal(full.length, (4*img.width*img.height), 'pixels loaded with correct length')

        var sub = getPixels(img, { width: w, height: h })
        t.equal(sub.length, (4*w*h), 'clipping reshapes array')

        var canvas = document.createElement("canvas")
        canvas.width = img.width
        canvas.height = img.height
        var ctx = canvas.getContext("2d")

        var imgData = ctx.createImageData(img.width, img.height)
        imgData.data.set(full)

        ctx.putImageData(imgData, 0, 0)

        var result = getPixels(canvas)
        t.deepEqual(full, result, 'putImageData matches pixels')
    }
    img.onerror = img.oncancel = function() {
        t.fail('there was an error loading the data URI image...')
        t.end()
    }
    img.src = uri
})