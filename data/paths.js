module.exports = {
    name: 'cinematic',
    src : {
        root: './src',
        html: './src/**/*.html',
        js: './src/**/*.js',
        js_lib: './src/js/lib/*.*',
        css: './src/**/*.css',
        img: './src/img/*.*',
        font: './src/font/*.*'
    },

    build : {
        root: './dist/',
        html: './dist/',
        js: './dist/js/',
        css: './dist/',
        img: './dist/',
        font: './dist/'
    },

    test : {
        lib: './test/lib'
    }
};