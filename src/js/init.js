define([
    './core'
], function( Cinematic ) {
    // Initial app state

    function _setup() {
        Cinematic.newRequest('batman', 1, true);
    }

    $(document).ready(_setup);
});