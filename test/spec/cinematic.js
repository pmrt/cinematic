var
    Cinematic = function() {
        this.version = "0.0.1-alp"
};
    Cinematic.debug = {};
// Process:
    // - called by newRequest()
    // Desc: Process the json results if succesful
    // return an array with movies
    Cinematic._proccess = function( data ) {
        return data.Search;
    }

    Cinematic.newRequest = function( name, page ) {
        const
            URI = "http://www.omdbapi.com/?s=" + name + "&page=" + page;

        $.getJSON( URI  , Cinematic._proccess);
    };

    Cinematic.debug.newRequest = function( onSuccessFn ) {
        const
            URI = "../test/assets/movie.fixture.json";
        console.log('jeje');
        $.ajax({
            url: URI,
            "success": function a(){ console.log('hi'); alert('hi')},
            "error": function x(){ alert('error')}
        });
        return Cinematic;
    }

module.exports = Cinematic;