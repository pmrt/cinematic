define([
    "./core"
], function( Cinematic ) {

    Cinematic.extend( "appendResults", function() {
        var
            i,
            results = Cinematic.lastResults.Search,
            content = $('.content');

        for ( i in results ) {
            console.log( )
            content.append( '<div class="movie" style="background: url(' + results[i].Poster + ');"</div>');
        }
    }, true);
});