define([
    "./core",
    "./var/initializer"
], function( Cinematic, initializer ) {

    // Initial app state
function _setup() {
    var
        lazySearch,
        searchBtn = $( '.search-btn' ),
        searchInput = $( '.search-input'),
        $document = $(document);

    function search() {
        Cinematic.query( searchInput.val(), true );
    }

    lazySearch = debounce(search, 500);

    // Events
    Cinematic.query( initializer.initial_title_search, initializer.initial_reset );
    searchBtn.click( function() {
        search();
    })
    $document.keypress( function(e) {
        if ( e.key == 'Enter' ) {
            if ( !isEmpty($('.search-input')) ) {
                lazySearch();
            }
        }
    })

}

$(document).ready( _setup );
$(document).scroll( Cinematic._onScroll );
});