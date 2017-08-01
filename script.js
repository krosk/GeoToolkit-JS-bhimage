// First parameter for define is an array with alias names for dependencies,
// or actual paths to javascript filed which should be loaded before the
// body of the module is executed
define(["jquery",
    "geotoolkit",
    "geotoolkit.data",
    "geotoolkit.controls",
    "geotoolkit.welllog"], function()
{
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
        var trackContainer = buildTrackContainerExample();

        var crossHair = buildCrosshairExample(rootGroup);
        var panning = buildPanningExample();

        //rootGroup.addChild(line);
        //rootGroup.addChild(axis);
        //rootGroup.addChild(grid);
        rootGroup.addChild(trackContainer);

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
        var boundsAxis = new geotoolkit.util.Rect(10, 0, 50, 550);
        var modelLimits = new geotoolkit.util.Rect(0, 0, 60, 55);
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
            'to' : new geotoolkit.util.Point(400, 400),
            'linestyle' : new geotoolkit.attributes.LineStyle()
        });
    }

    var buildGridExample = function()
    {
        var hTickGrid = new geotoolkit.axis.AdaptiveTickGenerator().setVisibleTickGrade("MINOR", true);
        var vTickGrid = new geotoolkit.axis.AdaptiveTickGenerator().setVisibleTickGrade("MINOR", true);
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

    var buildTrackDepth = function()
    {
        var axis = new geotoolkit.welllog.LogAxis()
            .setName("Depth");
        return axis;
    }

    var buildTrackDataExample = function()
    {
        var grid = new geotoolkit.axis.Grid(
            new geotoolkit.axis.AdaptiveTickGenerator()
                .setVisibleTickGrade("MINOR", true),
            new geotoolkit.axis.AdaptiveTickGenerator()
                .setVisibleTickGrade("MINOR", true)
        );

        var track = new geotoolkit.welllog.LogTrack()
            .enableClipping(true)
            .addChild(grid);

        return track;
    }
    
    var buildTrackContainerExample = function()
    {
        var minDepth = 0;
        var maxDepth = 550;

        var depthTrack = buildTrackDepth();
        var dataTrack = buildTrackDataExample();

        depthTrack.setBounds(new geotoolkit.util.Rect(0, minDepth, 35, maxDepth));
        dataTrack.setBounds(new geotoolkit.util.Rect(35, minDepth, 135, maxDepth));

        var trackContainer = new geotoolkit.welllog.TrackContainer()
            .addChild([depthTrack, dataTrack])
            .setDepthLimits(minDepth, maxDepth);
        
        /*
        
        var bounds = new geotoolkit.util.Rect(trackStart, minDepth, trackEnd, maxDepth);
        var modelLimits = new geotoolkit.util.Rect(0, 0, 60, 55);
        var grid = buildGridExample();
        var axis = new geotoolkit.welllog.LogAxis()
              .setName("Depth");
        var track = new geotoolkit.welllog.LogTrack()
             .setBounds(bounds)
             .setDepthLimits(minDepth, maxDepth)
             .enableClipping(true)
             .addChild(axis)
             .addChild(grid);
        return track;
        */
        return trackContainer;
    }

    // When this module is loaded into html, or other module, this object is returned
    return {
        'initialize': initialize,
        'start': start
    }
});