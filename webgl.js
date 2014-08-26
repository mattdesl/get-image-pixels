var fbo;

function dispose() {
    this.gl.deleteFramebuffer(this.handle)
}

//Split into another module or use gl-fbo somehow
function getPixels(gl, texture, opts) {
    if (!fbo) {
        var handle = gl.createFramebuffer()

        fbo = {
            handle: handle,
            dispose: dispose,
            gl: gl
        }
    } 

    // make this the current frame buffer
    gl.bindFramebuffer(gl.FRAMEBUFFER, fbo.handle)

    // attach the texture to the framebuffer.
    gl.framebufferTexture2D(
        gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0,
        gl.TEXTURE_2D, texture, 0)

    // check if you can read from this type of texture.
    var status = gl.checkFramebufferStatus()
    if (status !== gl.FRAMEBUFFER_COMPLETE) 
        throw new Error("cannot read GL framebuffer: " + status)
    
    opts.x = opts.x|0
    opts.y = opts.y|0
    opts.width = typeof opts.width === 'number' ? opts.width : (texture.shape[0]|0)
    opts.height = typeof opts.height === 'number' ? opts.height : (texture.shape[1]|0)

    gl.readPixels(opts.x, opts.y, opts.width, opts.height, gl.RGBA, gl.UNSIGNED_BYTE)
    gl.bindFramebuffer(gl.FRAMEBUFFER, null)
}

module.exports = function(gl, texture, options) {
    
}

module.exports.dispose = function() {
    if (fbo) {
        fbo.dispose()
        fbo = undefined
    }
}