// First parameter for define is an array with alias names for dependencies,
// or actual paths to javascript filed which should be loaded before the
// body of the module is executed
define(["jquery", "geotoolkit"], function(){
    var initialize = function() {
        // initialization function of the module
        console.log('initialized');

        var axis = new geotoolkit.axis.Axis(new geotoolkit.axis.AdaptiveTickGenerator())
                .setBounds(new geotoolkit.util.Rect(10, 10, 50, 400))
                .setModelLimits(new geotoolkit.util.Rect(0, 0, 400, 400));

        // Create a shape and define its properties
        var line = new geotoolkit.scene.shapes.Line({
            'from' : new geotoolkit.util.Point(0, 0),
            'to' : new geotoolkit.util.Point(400, 400),
            'linestyle' : new geotoolkit.attributes.LineStyle()
        }); 

        // Create a group to hold nodes
        var group = new geotoolkit.scene.Group();

        // Add the shape to the group
        group.addChild(line);
        group.addChild(axis);

        // Get the canvas as a DOM object
        var canvas = document.getElementById("tutorial-canvas");

        // Create a new Plot object from the canvas and group
        return new geotoolkit.plot.Plot({
            'canvasElement' : canvas,
            'root' : group
        });
    }

    ///////////////////////////////////////////////////////////////
    // Module body
    ///////////////////////////////////////////////////////////////
    var start = function()
    {
        console.log('doing nothing')
    }

    // When this module is loaded into html, or other module, this object is returned
    return {
        'initialize': initialize,
        'start': start
    }
});