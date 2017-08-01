// First parameter for define is an array with alias names for dependencies,
// or actual paths to javascript filed which should be loaded before the
// body of the module is executed
define(["jquery",
    "geotoolkit",
    "geotoolkit.data",
    "geotoolkit.controls",
    "geotoolkit.widgets",
    "geotoolkit.welllog",
    "geotoolkit.welllog.widgets",], function()
{
    var initialize = function() {
        // initialization function of the module
        console.log('initialized');

        BHIMAGEDATA.initialize();

        // Create a group to hold nodes
        var rootGroup = new geotoolkit.scene.Group();

        // Get the canvas as a DOM object
        var canvas = document.getElementById("tutorial-canvas");

        // populate the plot
        var plot = new geotoolkit.plot.Plot({
            'canvasElement' : canvas,
            'root' : rootGroup,
            'autoSize': false,
            'autoRootBounds': true
        });

        var axis = buildAxisExample();
        var line = buildLineExample();
        var grid = buildGridExample();
        var trackContainer = buildTrackContainerExample();
        var widget = buildWellLogWidgetExample();

        //var crossHair = buildCrosshairExample(rootGroup);
        //var panning = buildPanningExample();

        //rootGroup.addChild(line);
        //rootGroup.addChild(axis);
        //rootGroup.addChild(grid);
        //rootGroup.addChild(trackContainer);
        rootGroup.addChild(widget);

        var toolContainer = new geotoolkit.controls.tools.ToolsContainer(plot)
            //.add(crossHair)
            //.add(panning)
            .add(widget.getTool());

        return plot;
    }

    ///////////////////////////////////////////////////////////////
    // Module body
    ///////////////////////////////////////////////////////////////
    var start = function()
    {
        console.log('doing nothing')
    }

    var BHIMAGEDATA = (function()
    {
        var public = {};
        var m_dataWidth = 36;
        var m_dataHeight = 1000;
        var m_depthData = [];
        var m_imageData = [];
        
        public.initialize = function()
        {
            var lastDepth = 1000;
            for ( var i = 0; i < m_dataHeight; i++ )
            {
                for ( var j = 0; j < m_dataWidth; j++ )
                {
                    m_imageData.push( Math.random() * 255 );
                }
                m_depthData.push( lastDepth );
                lastDepth += 1 + Math.random();
            }
        }
        
        public.dataWidth = function()
        {
            return m_dataWidth;
        }
        public.dataHeight = function()
        {
            return m_dataHeight;
        }
        public.imageValue = function( r, c )
        {
            return m_imageData[ r*m_dataWidth + c ];
        }
        public.depthValue = function( r )
        {
            return m_depthData[ r ];
        }
        
        return public;
    }());

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
        return trackContainer;
    }

    var buildWellLogWidgetExample = function()
    {
        var topLeftX = 10;
        var topLeftY = 30;
        var widgetWidth = 400;
        var widgetHeight = 500;
        var minDepth = 1000;
        var maxDepth = 2000;

        var widget = new geotoolkit.welllog.widgets.WellLogWidget()
            .setLayoutStyle({'left': '0', 'top': '0', 'right': '0', 'bottom': '0'})
            .setOrientation(geotoolkit.util.Orientation.Vertical);
        widget.addTrack(geotoolkit.welllog.widgets.TrackType.IndexTrack);

        var imageData = buildLog2DVisualData();
        var log2DVisual = buildLog2DVisualComponent(imageData, 'my image');
        widget.addTrack(geotoolkit.welllog.widgets.TrackType.LinearTrack)
            .addChild(log2DVisual);
        widget.setBounds(new geotoolkit.util.Rect(topLeftX, topLeftY, widgetWidth, widgetHeight));
        widget.setDepthLimits(minDepth, maxDepth);

        updateImage(log2DVisual, widget);

        widget.on('visibleDepthLimitsChanged', function ()
        {
            updateImage(log2DVisual, widget);
        });
        widget.on('updating', function ()
        {
            //updateImage(log2DVisual, widget);
        });

        return widget;
    }

    var updateImage = function(log2DVisual, widget)
    {
        var limits = widget.getVisibleDepthLimits();
        // select all curves in display
        geotoolkit.selection.from(widget)
            .where(function (node)
            {
                return node instanceof geotoolkit.welllog.Log2DVisual
            })
            .execute(function(node)
            {
                var log2DVisualData = node.getData();
                log2DVisualData.clear();

                var depths = [];
                var angles = [];
                var values = [];

                var dataHeight = BHIMAGEDATA.dataHeight();
                var dataWidth = BHIMAGEDATA.dataWidth();
                for (var r = 0; r < dataHeight; r++)
                {
                    var depth = BHIMAGEDATA.depthValue(r);
                    if(depth < limits.getLow() + 3)
                    {
                        continue;
                    }
                    if(depth > limits.getHigh() - 3)
                    {
                        break;
                    }
                    var values = [];
                    var angles = [];
                    for ( var c = 0; c < dataWidth; c++)
                    {
                        values[c] = BHIMAGEDATA.imageValue(r, c);
                        angles[c] = c * 1.0 / dataWidth * 2 * Math.PI;
                    }
                    log2DVisualData.getRows().push(new geotoolkit.welllog.data.Log2DDataRow(depth, values, angles));
                }

                log2DVisualData.updateLimits();

                // invalidate visual to refresh it on the screen
                node.invalidate();
            });
    }

    var buildLog2DVisualData = function()
    {
        var log2dData = new geotoolkit.welllog.data.Log2DVisualData();
        return log2dData;
    }

    var buildLog2DVisualComponent = function(log2dData, name)
    {
        //var min = log2dData.getMinValue();
        //var max = log2dData.getMaxValue();
        var min = 0;
        var max = 255;

        //Set options
        var colors = new geotoolkit.util.DefaultColorProvider({
            'values' : [ min, (min + max) / 2, max ],
            'colors' : [ 'black', 'orange' ,'white' ]
        });

        //Create Visual
        return new geotoolkit.welllog.Log2DVisual()
            .setName(name)
            .setData(log2dData)
            .setColorProvider(colors)
            .setMicroPosition(0, 1); //DEFAULT: Visual model limits are from 0,1
    }

    // When this module is loaded into html, or other module, this object is returned
    return {
        'initialize': initialize,
        'start': start
    }
});