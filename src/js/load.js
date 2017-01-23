define([
    "./core",
    "./ajax",
    "./utils"

], function( Cinematic ) {

Cinematic.extend( "clearResults", function() {
    var content = $('.content');
    content.empty()
}, true);

Cinematic.extend( "addEvent", function( elem ) {
    elem.click( function() {
        Cinematic.getContents( $(this)[0].imdbID );
    })
}, true);

Cinematic.extend( "appendTo", function( results, content ) {
    var i, elem, currentPoster, imdbID, style = '';
    for ( i in results ) {
        if ( results[i].hasOwnProperty('Poster') ) {
            currentPoster = results[i].Poster;
            imdbID = results[i].imdbID;
            if ( !isValidPoster(currentPoster) ){
                currentPoster = 'img/postererr.svg';
                style = 'background-position: center;'
            }

            elem = $('<div class="movie" style="background-image: url(' + currentPoster + ');'+style+'"</div>');
            elem[0]['imdbID'] = imdbID;
            content.append(elem);
            elem.fadeIn(600);
            Cinematic.addEvent( elem );
        }
    }
}, true);

Cinematic.extend( "appendResults", function() {
    var results = Cinematic.lastResults.Search,
        content = $('.content');
    Cinematic.appendTo( results, content);


}, true);
});