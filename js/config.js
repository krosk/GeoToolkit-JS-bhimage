// Contents of config.js, basic require configuration
require.config({
    // Alias name for files and paths to them
    paths: {
        // Note that .js extension is not specified, it is applied automatically
        'geotoolkit': 'GeoToolkit-JS/bin/geotoolkit.adv',
        'geotoolkit.data': 'GeoToolkit-JS/bin/geotoolkit.data.adv',
        'geotoolkit.controls': 'GeoToolkit-JS/bin/geotoolkit.controls.adv',
        'geotoolkit.welllog': 'GeoToolkit-JS/bin/geotoolkit.welllog.adv',
        'geotoolkit.welllog.widgets': 'GeoToolkit-JS/bin/geotoolkit.welllog.widgets.adv',
        'geotoolkit.widgets': 'GeoToolkit-JS/bin/geotoolkit.widgets.adv',
        'geotoolkit.pdf': 'GeoToolkit-JS/bin/geotoolkit.pdf.adv',
        'jquery': 'GeoToolkit-JS/3rdparty/js/jquery.min',
    },
    // Browser independent configuration of the dependencies, exports, and custom init
    shim: {
    }
});
