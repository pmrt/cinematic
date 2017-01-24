var initializer = {
        initial_title_search : 'batman',
        initial_reset : true
    }

var
    Message = function( message, position, timing ) {
    this.message = message;
    this.position = position;
    this.timing = timing || false;
    this.parent = $('.content'),
    this._setup();
}

Message.prototype._setup = function() {
    var
        self = this;
    this.render();
    this.popup();
    if ( this.timing ) {
        setTimeout(function () {
            self.miss();
        }, this.timing);
    }
}

Message.prototype.render = function() {
    var style = this.position == "top" ? "top: 18px;" : "bottom: 0.3%;";
    this.me = $( "<div class='message' style='" +style+ "'><p>" +this.message+ "</p></div>" );
    this.parent.append( this.me );
}

Message.prototype.popup = function() {
    this.me.animate({
        opacity:1
    }, 200);
}

Message.prototype.miss = function() {
    var that = this;
    this.me.animate({
        'opacity':0
    }, 600, function(){
        that.me.remove();
    })

}

function isValidPoster( exp ) {
    return exp != 'N/A';
}

function debounce(func, wait) {
    var timeout;
    return function() {
        var context = this, args = arguments;
        var later = function() {
            timeout = null;
            func.apply(context, args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function isEmpty( elem ) {
    return elem.val() === "";
}



var
    Cinematic = function() {
};

// TODO Improve semantically extend()
Cinematic.extend = function( name, fn, rawFn ) {
    var rawFn = rawFn || false;
    this[name] = !rawFn ? fn.call() : fn;
}

Cinematic.extend( "version", function() {
    return "0.0.1-alp";
})

Cinematic.extend( "lastPage", function() {
    return 1;
})

Cinematic.extend( "debug", function() {
    return {
        extend : Cinematic.extend
    };
})

Cinematic.extend( "lastTitleSearch", function() {
    return 1;
})


Cinematic.extend( "lastResults", function() {
    return "";
})

Cinematic.extend( "searchType", function() {
    return "movie";
})
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
    var
        reset = reset || false;

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
    const
        URI = "../test/assets/movie.fixture.json";

    $.ajax({
        url: URI,
        "success": onSuccessFn
    });
}, true);


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

Cinematic.extend( '_onScroll', function() {
    var
        $window = $( window ),
        $document = $( document ),
        wScroll = $window.scrollTop(),
        wHeight = $window.height(),
        dHeight = $document.height();

    if ( wScroll + wHeight >= dHeight ) {
        Cinematic.update();
    }
}, true);


// Initial app state
function _setup() {
    var
        lazySearch,
        searchBtn = $( '.search-btn' ),
        searchInput = $( '.search-input'),
        list = $( 'sidebar .menu > ul > li'),
        $document = $(document);

    function search() {
        Cinematic.query( searchInput.val(), Cinematic.searchType, true );
    }


    function typeBtn() {
        var type = $(this).text().toLowerCase();
        Cinematic.searchType = type;
        lazySearch();
    }

    function onShortcut(e) {
        if ( e.key == 'Enter' ) {
            if ( !isEmpty(searchInput) ) {
                lazySearch();
            }
        }
    }

    lazySearch = debounce(search, 500);

    // Events
    Cinematic.query( initializer.initial_title_search, Cinematic.searchType, initializer.initial_reset );
    searchBtn.click( lazySearch );
    list.click( typeBtn );
    $document.keypress( onShortcut );

}

$(document).ready( _setup );
$(document).scroll( Cinematic._onScroll );


