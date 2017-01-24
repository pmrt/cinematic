define([
    "./core"
], function( Cinematic ) {

var msg;

function connTimeout() {
    msg = new Message( "loading...", "bottom");
}

function connFail() {
    msg = new Message( "No network connection", "top");
}

function contentTimeout( title, year, plot ) {
    plot.text('Loading...');
    year.text('Loading...');
    title.text('Loading...');
}

//TODO re-indent
Cinematic.extend( "query", function( name, searchType, reset) {
    // We do two requests each first search
    // since omdbAPI limit each request to 10
    // movies per page.
    var reset = reset || false;
    if ( reset ) {
        // Reset
        Cinematic.lastPage = 1;
        Cinematic.clearResults();
        Cinematic.newRequest( name, searchType );
        Cinematic.newRequest( name, searchType );
    } else {
        Cinematic.newRequest( name, searchType );
    }
}, true);

Cinematic.extend( "newRequest", function( name, searchType ) {
    var timeout = setTimeout( connTimeout, 1000),
        URI = "http://www.omdbapi.com/?s=" + name + "&page=" + Cinematic.lastPage++
        + "&type=" + searchType;
    $.ajax({
        url: URI,
        "success": function( data ){
            clearTimeout( timeout );
            if ( data.Response == 'True' ) {
                Cinematic.lastResults = data;
                Cinematic.lastTitleSearch = name;
                Cinematic.appendResults();
            } else {
                new Message( "No results for search", "top" );
            }
            if ( msg ) msg.miss();
        },
        "error": function( XMLHttpRequest ) {
            if ( XMLHttpRequest.readyState == 0) connFail();
        }
    });
}, true);

Cinematic.extend( "getContents", function( imdbID ) {
    var timeout,
        URI = "http://www.omdbapi.com/?i="+imdbID+"&plot=full&r=json",
        title = $('sidebar .title'), 
        year = $('sidebar .year'),
        plot = $('sidebar .plot');
        timeout = setTimeout(function() {
            contentTimeout( title, year, plot)
        }, 500);
    $.ajax({
        url: URI,
        "success": function( data ) {
            clearTimeout(timeout)
            title.text(data.Title);
            year.text(data.Year);
            plot.text(data.Plot);
        }
    });
}, true)

Cinematic.extend( "update", function() {
    Cinematic.query( Cinematic.lastTitleSearch, Cinematic.searchType );
}, true)

Cinematic.debug.extend( "newRequest", function( onSuccessFn ) {
    const URI = "../test/assets/movie.fixture.json";
    $.ajax({
        url: URI,
        "success": onSuccessFn
    });
}, true);

});
