// First parameter for define is an array with alias names for dependencies,
// or actual paths to javascript filed which should be loaded before the
// body of the module is executed
define(["jquery", "geotoolkit"], function(){
    var initialize = function() {
        // initialization function of the module
        console.log('initialized');

        var tickAxis = new geotoolkit.axis.AdaptiveTickGenerator();
        var boundsAxis = new geotoolkit.util.Rect(10, 0, 50, 400);
        var modelLimits = new geotoolkit.util.Rect(0, 0, 400, 400);
        var axis = new geotoolkit.axis.Axis(tickAxis)
                .setBounds(boundsAxis)
                .setModelLimits(modelLimits)
                .setAutoLabelRotation(true);

        // Create a shape and define its properties
        var line = new geotoolkit.scene.shapes.Line({
            'from' : new geotoolkit.util.Point(0, 0),
            'to' : new geotoolkit.util.Point(400, 400),
            'linestyle' : new geotoolkit.attributes.LineStyle()
        });

        var hTickGrid = new geotoolkit.axis.AdaptiveTickGenerator();
        var vTickGrid = new geotoolkit.axis.AdaptiveTickGenerator();
        var boundsGrid = new geotoolkit.util.Rect(60, 0, 300, 400);
        var grid = new geotoolkit.axis.Grid(hTickGrid, vTickGrid);

        // Create a group to hold nodes
        var rootGroup = new geotoolkit.scene.Group();

        // Add the shape to the group
        rootGroup.addChild(line);
        rootGroup.addChild(axis);
        rootGroup.addChild(grid);

        // Get the canvas as a DOM object
        var canvas = document.getElementById("tutorial-canvas");

        // Create a new Plot object from the canvas and group
        return new geotoolkit.plot.Plot({
            'canvasElement' : canvas,
            'root' : rootGroup
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