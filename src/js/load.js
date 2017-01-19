define([
    "./core",
    "./utils"
], function( Cinematic ) {

Cinematic.extend( "clearResults", function() {
    var content = $('.content');
    content.empty()
}, true);

Cinematic.extend( "appendTo", function( results, content ) {
    var i, elem, currentPoster;
    for ( i in results ) {
        if ( results[i].hasOwnProperty('Poster') ) {
            currentPoster = results[i].Poster;
            if (isValidPoster(currentPoster)) {
                elem = $('<div class="movie" style="background-image: url(' + currentPoster + ');"</div>');
                content.append(elem);
                elem.fadeIn(600);
            }
        }
    }
}, true);

Cinematic.extend( "appendResults", function() {
    var
        results = Cinematic.lastResults.Search,
        content = $('.content');
    Cinematic.appendTo( results, content);


}, true);
});