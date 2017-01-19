var
    Cinematic = require('./cinematic.js')

describe( 'Ajax', function() {
    var onSuccess = jasmine.createSpy('onSuccess');

    beforeEach(function() {
        var URI = "../test/assets/movie.fixture.json";
        Cinematic.debug.newRequest( onSuccess );
    });

    it( 'should have gotten a response', function() {
        expect( onSuccess ).toHaveBeenCalled();


    });
} )