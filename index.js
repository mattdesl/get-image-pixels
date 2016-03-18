//TODO: use a 'canvas2d-pool' module?
var context,
    canvas 

module.exports = function(image, opts) {
    opts = opts||{}
    opts.x = opts.x||0
    opts.y = opts.y||0
    opts.width = typeof opts.width === 'number' ? opts.width : image.width
    opts.height = typeof opts.height === 'number' ? opts.height : image.height
    
    if (!context) {
        canvas = document.createElement("canvas")
        context = canvas.getContext('2d')
    }
    canvas.width = opts.width
    canvas.height = opts.height
    context.clearRect(0,0,opts.width,opts.height)
    context.drawImage(image, opts.x, opts.y, opts.width, opts.height, 0, 0, opts.width, opts.height)

    var imgData
    try {
        imgData = context.getImageData(0, 0, opts.width, opts.height)
    } catch(e){
        module.exports.dispose()
        throw e
    }

    return imgData.data
}

module.exports.dispose = function() {
    context = undefined
    canvas = undefined
}