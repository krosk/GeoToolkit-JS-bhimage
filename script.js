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

        var axis = buildAxisExample();
        var line = buildLineExample();
        var grid = buildGridExample();

        var crossHair = buildCrosshairExample(rootGroup);
        var panning = buildPanningExample();

        rootGroup.addChild(line);
        rootGroup.addChild(axis);
        rootGroup.addChild(grid);

        new geotoolkit.controls.tools.ToolsContainer(plot)
            .add(crossHair)
            .add(panning);

        return plot;
    }

    ///////////////////////////////////////////////////////////////
    // Module body
    ///////////////////////////////////////////////////////////////
    var start = function()
    {
        console.log('doing nothing')
    }

    var buildAxisExample = function()
    {
        // axis example
        var tickAxis = new geotoolkit.axis.AdaptiveTickGenerator();
        var boundsAxis = new geotoolkit.util.Rect(10, 0, 50, 400);
        var modelLimits = new geotoolkit.util.Rect(0, 0, 600, 600);
        return new geotoolkit.axis.Axis(tickAxis)
                .setBounds(boundsAxis)
                .setModelLimits(modelLimits)
                .setAutoLabelRotation(true);
    }

    var buildLineExample = function()
    {
        // line example
        return new geotoolkit.scene.shapes.Line({
            'from' : new geotoolkit.util.Point(0, 0),
            'to' : new geotoolkit.util.Point(600, 600),
            'linestyle' : new geotoolkit.attributes.LineStyle()
        });
    }

    var buildGridExample = function()
    {
        var hTickGrid = new geotoolkit.axis.AdaptiveTickGenerator();
        var vTickGrid = new geotoolkit.axis.AdaptiveTickGenerator();
        var boundsGrid = new geotoolkit.util.Rect(0, 0, 600, 600);
        return new geotoolkit.axis.Grid(hTickGrid, vTickGrid);
    }

    var buildCrosshairExample = function(group)
    {
        var crossHairSettings = {
            'vertical': new geotoolkit.attributes.LineStyle(),
            'horizontal': new geotoolkit.attributes.LineStyle(),
            'group': group
        };
        return new geotoolkit.controls.tools.CrossHair(crossHairSettings)
            .setEnabled(true);
    }

    var buildPanningExample = function()
    {
        return new geotoolkit.controls.tools.Panning()
            .setEnabled(true)
            .addListener(geotoolkit.controls.tools.Panning.Events.onPanning, function (sender, eventArgs) {
                var diff = eventArgs.getDirection();
                console.log(diff);
            }.bind(this));

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
    }

    // When this module is loaded into html, or other module, this object is returned
    return {
        'initialize': initialize,
        'start': start
    }
});