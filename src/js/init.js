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

    function onShortcut(e) {
        if ( e.key == 'Enter' ) {
            if ( !isEmpty(searchInput) ) {
                lazySearch();
            }
        }
    }

    lazySearch = debounce(search, 500);

    // Events
    Cinematic.query( initializer.initial_title_search, initializer.initial_reset );
    searchBtn.click( lazySearch );
    $document.keypress( onShortcut );

}

$(document).ready( _setup );
$(document).scroll( Cinematic._onScroll );
});