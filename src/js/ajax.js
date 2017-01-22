define([
    "./core"
], function( Cinematic ) {

var msg;

function connTimeout() {
    msg = new Message( "loading...", "bottom");
}

//TODO re-indent
Cinematic.extend( "query", function( name, reset) {
    // We do two requests each first search
    // since omdbAPI limit each request to 10
    // movies per page.
    var
        reset = reset || false;

    if ( reset ) {
        // Reset
        Cinematic.lastPage = 1;
        Cinematic.clearResults();
        Cinematic.newRequest( name );
        Cinematic.newRequest( name );
    } else {
        Cinematic.newRequest( name );
    }
}, true);

Cinematic.extend( "newRequest", function( name ) {
        var timeout = setTimeout( connTimeout, 1000),
            URI = "http://www.omdbapi.com/?s=" + name + "&page=" + Cinematic.lastPage++;
        $.ajax({
            url: URI,
            "success": function( data ){
                clearTimeout( timeout );
                if ( data.Response == 'True' ) {
                    Cinematic.lastResults = data;
                    Cinematic.lastTitleSearch = name;
                    Cinematic.appendResults();
                    msg.miss();
                } else {
                    msg.miss();
                    new Message( "No results for search", "top" );
                }
            }
        });
}, true);

Cinematic.extend( "update", function() {
    Cinematic.query( Cinematic.lastTitleSearch );
}, true)

Cinematic.debug.extend( "newRequest", function( onSuccessFn ) {
        const
            URI = "../test/assets/movie.fixture.json";

        $.ajax({
            url: URI,
            "success": onSuccessFn
        });
}, true);

});
