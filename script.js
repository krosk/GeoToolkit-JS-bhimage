// First parameter for define is an array with alias names for dependencies,
// or actual paths to javascript filed which should be loaded before the
// body of the module is executed
define(["jquery", "geotoolkit", "geotoolkit.data", "geotoolkit.controls"], function(){
    var initialize = function() {
        // initialization function of the module
        console.log('initialized');

        // Create a group to hold nodes
        var rootGroup = new geotoolkit.scene.Group();

        // Get the canvas as a DOM object
        var canvas = document.getElementById("tutorial-canvas");

        // populate the plot
        var plot = new geotoolkit.plot.Plot({
            'canvasElement' : canvas,
            'root' : rootGroup
        });

        // axis example
        var tickAxis = new geotoolkit.axis.AdaptiveTickGenerator();
        var boundsAxis = new geotoolkit.util.Rect(10, 0, 50, 400);
        var modelLimits = new geotoolkit.util.Rect(0, 0, 600, 600);
        var axis = new geotoolkit.axis.Axis(tickAxis)
                .setBounds(boundsAxis)
                .setModelLimits(modelLimits)
                .setAutoLabelRotation(true);

        // line example
        var line = new geotoolkit.scene.shapes.Line({
            'from' : new geotoolkit.util.Point(0, 0),
            'to' : new geotoolkit.util.Point(600, 600),
            'linestyle' : new geotoolkit.attributes.LineStyle()
        });

        // grid example
        var hTickGrid = new geotoolkit.axis.AdaptiveTickGenerator();
        var vTickGrid = new geotoolkit.axis.AdaptiveTickGenerator();
        var boundsGrid = new geotoolkit.util.Rect(0, 0, 600, 600);
        var grid = new geotoolkit.axis.Grid(hTickGrid, vTickGrid);

        // crosshair example
        var crossHairSettings = {
            'vertical': new geotoolkit.attributes.LineStyle(),
            'horizontal': new geotoolkit.attributes.LineStyle(),
            'group': rootGroup
        };
        var crossHair = new geotoolkit.controls.tools.CrossHair(crossHairSettings);
        crossHair.setEnabled(false);

        // panning example
        var panning = new geotoolkit.controls.tools.Panning()
            .setEnabled(true)
            .addListener(geotoolkit.controls.tools.Panning.Events.onPanning, function (sender, eventArgs) {
                var diff = eventArgs.getDirection();
                console.log(diff);
            }.bind(this));

        // Add the shape to the group
        rootGroup.addChild(line);
        rootGroup.addChild(axis);
        rootGroup.addChild(grid);

        new geotoolkit.controls.tools.ToolsContainer(plot)
            .add(crossHair)
            .add(panning);

        return plot;
    }

    /*
    function CreatePanning() {
        var panningAnnotated = createAnnotatedNode();
        var panning = new geotoolkit.controls.tools.Panning()
            .setEnabled(true)
            .addListener(geotoolkit.controls.tools.Panning.Events.onPanning, function (sender, eventArgs) {
                var diff = eventArgs.getDirection();
                panningAnnotated.translateModel(diff.x, diff.y);
            }.bind(this));

        var plot = addShapeToCanvas('PanningCanvas', panningAnnotated);
        new geotoolkit.controls.tools.ToolsContainer(plot)
            .add(
                new geotoolkit.controls.tools.CompositeTool(panningAnnotated.getModel(),"compositeNode")
                    .add(panning)
            );
    }
        */

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