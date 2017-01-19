var
    debug = {
        log: function(message) {
            process.stdout.write('\n' + message + '\n');
        }
}

module.exports = debug;