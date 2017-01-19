module.exports = {
    name: 'cinematic',
    src : {
        root: './src',
        html: './src/**/*.html',
        js: './src/**/*.js',
        js_lib: './src/js/lib/*.*',
        css: './src/**/*.css',
        img: './src/img/*.*'
    },

    build : {
        root: './dist/',
        html: './dist/',
        js: './dist/js/',
        css: './dist/',
        img: './dist/'
    },

    test : {
        lib: './test/lib'
    }
};