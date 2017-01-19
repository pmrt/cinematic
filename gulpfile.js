"use strict";

// Modules
const
    gulp = require( 'gulp' ),
    uglify = require( 'gulp-uglify' ),
    rename = require( 'gulp-rename' ),
    runSequence = require( 'run-sequence' ),
    plumber = require('gulp-plumber'),
    umd = require( 'gulp-umd' ),
    copy = require( 'gulp-copy' );

// Environment data
const
    paths = require( './data/paths.js' ),
    build = require( './build/build.js' ),
    debug = require( './data/debug.js' );

var
    config = {
    baseUrl: "./src/js",
    name: "cinematic",
    useStrict: true,
    optimize: "none",
    findNestedDependencies: true,
    skipModuleInsertion: true,
    skipSemiColonInsertion: true,
    out: "./dist/js/cinematic.js",
    onBuildWrite: build.convert
};


// Tasks
gulp.task('copy:html', function(){
    return gulp.src( paths.src.html )
        .pipe( copy(paths.build.root, { prefix: 1 }) )
        .pipe( gulp.dest(paths.build.html) )
});

gulp.task('copy:css', function(){
    return gulp.src( paths.src.css )
        .pipe( copy(paths.build.root, { prefix: 1 }) )
        .pipe( gulp.dest(paths.build.css) )
});

gulp.task('copy:img', function(){
    return gulp.src( paths.src.img )
        .pipe( copy(paths.build.root, { prefix: 1 }) )
        .pipe( gulp.dest(paths.build.img) )
});


// Copy the js libraries
gulp.task('copy:lib', function() {
    return gulp.src( paths.src.js_lib )
        .pipe( copy(paths.build.root, { prefix: 1}) )
        .pipe( gulp.dest(paths.build.js) )
})

gulp.task('copy:font', function() {
    return gulp.src( paths.src.font)
        .pipe( copy(paths.build.root, { prefix: 1}) )
        .pipe( gulp.dest(paths.build.font) )
})

gulp.task('build', function(){
        build.merge(config)
});

gulp.task('minify:js', function(){
    return gulp.src( paths.build.js + paths.name + '.js' )
        .pipe( umd() )
        .pipe( rename('cinematic.min.js') )
        .pipe( uglify({
            'banner': '/*! Cinematic (c) 2017 */'
        }) )
        .pipe( gulp.dest(paths.build.js) )
});

gulp.task('default', function(){
    runSequence( 'copy:html', 'copy:css', 'copy:lib', 'copy:img', 'copy:font', 'build' );
});