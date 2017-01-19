define([
    "./core",
    "./var/initializer"
], function( Cinematic, initializer ) {
    // Initial app state

    function _setup() {
        Cinematic.newRequest( initializer.initial_title_search, initializer.initial_page, initializer.initial_double_request );
    }

    $(document).ready(_setup);
});