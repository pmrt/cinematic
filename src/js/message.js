define(function(){
var Message = function( message, position, timing ) {
    this.message = message;
    this.position = position;
    this.timing = timing || false;
    this.parent = $('.content'),
    this._setup();
}

Message.prototype._setup = function() {
    var self = this;
    this.render();
    this.popup();
    if ( this.timing ) {
        setTimeout(function () {
            self.miss();
        }, this.timing);
    }
}

Message.prototype.render = function() {
    var style = this.position == "top" ? "top: 18px;" : "bottom: 0.3%;";
    this.me = $( "<div class='message' style='" +style+ "'><p>" +this.message+ "</p></div>" );
    this.parent.append( this.me );
}

Message.prototype.popup = function() {
    this.me.animate({
        opacity:1
    }, 200);
}

Message.prototype.miss = function() {
    var that = this;
    this.me.animate({
        'opacity':0
    }, 600, function(){
        that.me.remove();
    })

}
});