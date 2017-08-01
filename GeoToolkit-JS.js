
//Called when application is started.
function OnStart()
{
	//Create a layout with objects vertically centered.
  	var lay = app.CreateLayout( "linear", "VCenter,FillXY" );	

    var web = app.CreateWebView( 1, 0.9 );
  	loadHtmlWrapper(web);
  	lay.AddChild( web );
    app.AddLayout( lay );
}

function loadHtmlWrapper( webview )
{
  	var file = app.ReadFile( 'index.html' );
  	webview.LoadHtml( file );
}