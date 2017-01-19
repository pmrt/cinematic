define([
    "./core"
], function( Cinematic ) {

Cinematic.extend( "newRequest", function( name, page, doTwice ) {
        const
            URI = "http://www.omdbapi.com/?s=" + name + "&page=" + page;
        var
            doTwice = doTwice || false;

        $.ajax({
            url: URI,
            "success": function( data ){
                Cinematic.lastResults = data;
                Cinematic.appendResults();
            }
        });

        // We do two requests each first search
        // since omdbAPI limit each request to 10
        // movies per page.
        if ( doTwice ) {
            Cinematic.newRequest( name, ++page);
        }
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
