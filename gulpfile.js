var gulp = require('gulp'),
    watch = require('gulp-watch'),
    prefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    rigger = require('gulp-rigger'),
    cleanCss = require('gulp-clean-css'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    rimraf = require('rimraf'),
    browserSync = require("browser-sync"),
    reload = browserSync.reload,
    bust = require('gulp-buster'),
    argv = require('yargs').argv, //передача параметров таска из консоли
    gulpIfElse = require('gulp-if'); // c помощью него разделяю окружение //.pipe( ifElse(condition, ifCallback, elseCallback) )

 //gulp --dev , gulp --production


var path = {
    dist : {
        html : 'dist/src_design/',
        js : 'dist/src_design/js',
        vendorJs : 'dist/src_design/js/vendors/',
        style: 'dist/src_design/styles/',
        img: 'dist/src_design/img/',
        fonts: 'dist/src_design/fonts/'
    },
    build : {
        html : 'build/src_design/',
        js : 'build/src_design/js',
        vendorJs : 'build/src_design/js/vendors/',
        style: 'build/src_design/styles/',
        img: 'build/src_design/img/',
        fonts: 'build/src_design/fonts/'
    },
    src_design : {
        js : 'src_design/js',
        vendorJs : 'src_design/js/vendors/',
        style: 'src_design/styles/',
        img: 'src_design/img/',
        fonts: 'src_design/fonts/'
    },
    src: { //Пути откуда брать исходники
        html: 'src/*.html',
        js: 'src/js/main.js',
        vendorJs : 'src/js/vendors/**/*.*',
        style: 'src/styles/pages/**/*.*',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*'
    },
    watch: {
        html: 'src/**/*.html',
        js: 'src/js/**/*.js',
        style: 'src/styles/**/*.scss',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*'
    },
    clean: './build'
};

var config = {
    server: {
        baseDir: "./build/src_design"
    },
    host: 'localhost',
    port: 9090,
    logPrefix: "Opteum_promo"
};
//clean get gulp clean
gulp.task('clean', function (cb) {
    rimraf(path.clean, cb);
});

//server
gulp.task('webserver', function () {
    browserSync(config);
});

//html
gulp.task('html:build', function () {
    gulp.src(path.src.html)
        .pipe(rigger())
        .pipe(gulpIfElse(argv.production,
            gulp.dest(path.dist.html),
            //else
            gulp.dest(path.build.html)))
        .pipe(reload({stream: true}));
});
//js
gulp.task('js:build', function () {
    gulp.src(path.src.js)
        .pipe(rigger())
        .pipe(gulpIfElse(argv.dev, sourcemaps.init()))
        .pipe(gulpIfElse(argv.production,uglify()))
        .pipe(gulpIfElse(argv.dev, sourcemaps.write()))
        .pipe(gulpIfElse(argv.production,
            gulp.dest(path.dist.js),
            //else
            gulp.dest(path.build.js)))
        .pipe(gulpIfElse(argv.production, gulp.dest(path.src_design.js)))
        .pipe(reload({stream: true}));

});
gulp.task('vendorJs:build',function () {
    gulp.src(path.src.vendorJs)
        .pipe(gulpIfElse(argv.production,
            gulp.dest(path.dist.vendorJs),
            //else
            gulp.dest(path.build.vendorJs)))
        .pipe(gulpIfElse(argv.production, gulp.dest(path.src_design.vendorJs)))
});

//styles
gulp.task('style:build', function () {
    gulp.src(path.src.style)
        .pipe(gulpIfElse(argv.dev,sourcemaps.init())) //включить мапы только для dev
        .pipe(sass())
        .pipe(prefixer())
        .pipe(gulpIfElse(argv.production, cleanCss()))
        .pipe(gulpIfElse(argv.dev,sourcemaps.write())) //записать мапы только для dev
        .pipe(gulpIfElse(argv.production,
            gulp.dest(path.dist.style),
            // else
            gulp.dest(path.build.style)))
        .pipe(gulpIfElse(argv.production, gulp.dest(path.src_design.style)))
        .pipe(reload({stream: true}));
});

//images
gulp.task('image:build', function () {
    gulp.src(path.src.img)
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest(path.build.img))
        .pipe(gulp.dest(path.dist.img))
        .pipe(gulp.dest(path.src_design.img));
});
//fonts
gulp.task('fonts:build', function() {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))
        .pipe(gulp.dest(path.dist.fonts))
        .pipe(gulp.dest(path.src_design.fonts))
});
// get all
gulp.task('build', [
    'html:build',
    'vendorJs:build',
    'js:build',
    'style:build',
    'fonts:build',
    'image:build'
]);

//watch
gulp.task('watch', function(){
    watch([path.watch.html], function(event, cb) {
        gulp.start('html:build');
    });
    watch([path.watch.style], function(event, cb) {
        gulp.start('style:build');
    });
    watch([path.watch.js], function(event, cb) {
        gulp.start('js:build');
    });
    watch([path.watch.img], function(event, cb) {
        gulp.start('image:build');
    });
    watch([path.watch.fonts], function(event, cb) {
        gulp.start('fonts:build');
    });
});
// default gulp task
gulp.task('default', ['build', 'webserver', 'watch']);