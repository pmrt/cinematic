define(function() {

function isValidPoster( exp ) {
    return exp != 'N/A';
}

function debounce( func, wait ) {
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


});