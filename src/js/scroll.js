define([
    "./core",
    "./utils"
], function( Cinematic ) {

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

});