define([
    "./core"
], function( Cinematic ) {

Cinematic.extend( "newRequest", function( name, page ) {
        const
            URI = "http://www.omdbapi.com/?s=" + name + "&page=" + page;

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
