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
});