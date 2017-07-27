// Contents of config.js, basic require configuration
require.config({
    // Alias name for files and paths to them
    paths: {
        // Note that .js extension is not specified, it is applied automatically
        'geotoolkit': 'GeoToolkit-JS/bin/geotoolkit.adv',
        'jquery': 'GeoToolkit-JS/3rdparty/js/jquery.min',
    },
    // Browser independent configuration of the dependencies, exports, and custom init
    shim: {
    }
});