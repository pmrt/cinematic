const
    requirejs = require('requirejs'),
    debug = require('../data/debug.js'),
    rdefineEnd = /\}\s*?\);[^}\w]*$/;

var build = {

    merge: function (cfg) {
        requirejs.optimize(cfg, function () {
            debug.log('[OK] Module merging');
        }, function (err) {
            debug.log('[ERROR] Module merging: ' + err);
        });
    },

    convert: function (name, path, contents) {
        /*
           Amd cleaner function by JS Foundation,
           originally introduced within jQuery.
        */
        // Convert var modules
        if (/.\/var\//.test(path.replace(process.cwd(), ""))) {
            contents = contents
                .replace(
                    /define\([\w\W]*?return/,
                    "var " +
                    ( /var\/([\w-]+)/.exec(name)[1] ) +
                    " ="
                )
                .replace(rdefineEnd, "");

            // Sizzle treatment
        } else if (/\/sizzle$/.test(name)) {
            contents = "var Sizzle =\n" + contents

                // Remove EXPOSE lines from Sizzle
                    .replace(/\/\/\s*EXPOSE[\w\W]*\/\/\s*EXPOSE/, "return Sizzle;");

        } else {

            contents = contents
                .replace(/\s*return\s+[^\}]+(\}\s*?\);[^\w\}]*)$/, "$1")

                // Multiple exports
                .replace(/\s*exports\.\w+\s*=\s*\w+;/g, "");

            // Remove define wrappers, closure ends, and empty declarations
            contents = contents
                .replace(/define\([^{]*?{\s*(?:("|')use strict\1(?:;|))?/, "")
                .replace(rdefineEnd, "");

            // Remove anything wrapped with
            // /* ExcludeStart */ /* ExcludeEnd */
            // or a single line directly after a // BuildExclude comment
            contents = contents
                .replace(/\/\*\s*ExcludeStart\s*\*\/[\w\W]*?\/\*\s*ExcludeEnd\s*\*\//ig, "")
                .replace(/\/\/\s*BuildExclude\n\r?[\w\W]*?\n\r?/ig, "");

            // Remove empty definitions
            contents = contents
                .replace(/define\(\[[^\]]*\]\)[\W\n]+$/, "");
        }

        return contents;

        }
};

module.exports = build;
