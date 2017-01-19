define([
    "./core"
], function( Cinematic ) {

    Cinematic.extend( "clearResults", function() {
        var content = $('.content');
        content.empty()
    })

    Cinematic.extend( "appendResults", function() {
        var
            i, elem,
            results = Cinematic.lastResults.Search,
            content = $('.content');

        for ( i in results ) {
            elem = $( '<div class="movie" style="background-image: url(' + results[i].Poster + ');"</div>' );
            content.append( elem );
            elem.fadeIn( 600 );
        }
    }, true);
});