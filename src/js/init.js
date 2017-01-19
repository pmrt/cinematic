define([
    "./core",
    "./var/initializer"
], function( Cinematic, initializer ) {

    // Initial app state
function _setup() {
    Cinematic.query( initializer.initial_title_search, initializer.initial_reset );
}

$(document).ready(_setup);
});