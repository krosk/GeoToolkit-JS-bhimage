// First parameter for define is an array with alias names for dependencies,
// or actual paths to javascript filed which should be loaded before the
// body of the module is executed
define(["jquery", "geotoolkit"], function(){
    var initialize = function() {
        // initialization function of the module
        console.log('initialized');
    }

    ///////////////////////////////////////////////////////////////
    // Module body
    ///////////////////////////////////////////////////////////////

    // When this module is loaded into html, or other module, this object is returned
    return {
        'initialize': initialize
    }
});