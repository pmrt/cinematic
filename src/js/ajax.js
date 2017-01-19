define([
    "./core"
], function( Cinematic ) {

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
        const
            URI = "http://www.omdbapi.com/?s=" + name + "&page=" + Cinematic.lastPage++;

        $.ajax({
            url: URI,
            "success": function( data ){
                Cinematic.lastResults = data;
                Cinematic.appendResults();
            }
        });
}, true);

Cinematic.debug.extend( "newRequest", function( onSuccessFn ) {
        const
            URI = "../test/assets/movie.fixture.json";

        $.ajax({
            url: URI,
            "success": onSuccessFn
        });
}, true);

});
