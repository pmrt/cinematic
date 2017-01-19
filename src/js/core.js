define(function() {
var
    Cinematic = function() {
};

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

Cinematic.extend( "lastResults", function() {
    return "";
})

    return Cinematic;
});