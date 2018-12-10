var syntax        = 'sass'; // Синтаксис: sass или scss;

var gulp          = require('gulp'),
        browsersync   = require('browser-sync'), 
        autoprefixer  = require('gulp-autoprefixer'),
        cache         = require('gulp-cache'),
        cleancss      = require('gulp-clean-css'),
        concat        = require('gulp-concat'),
        imagemin      = require('gulp-imagemin'),
		gutil         = require('gulp-util' ),
        notify        = require("gulp-notify"),
        rename        = require('gulp-rename'),
        sass          = require('gulp-sass'),
		uglify        = require('gulp-uglify'),
        del           = require('del');
		

// Scripts concat & minify

gulp.task('js', function() {
	return gulp.src([
		'app/libs/jquery/dist/jquery.min.js',
		'app/libs/Headhesive.js/dist/headhesive.min.js',
		'app/libs/jQuery.mmenu/dist/jquery.mmenu.all.js',
		'app/js/common.js', // Всегда в конце
		])
	// .pipe(concat('scripts.min.js')) // Конкатенация js (опц.)
	// .pipe(uglify()) // Минимизация js (опц.)
	.pipe(gulp.dest('app/js'))
	.pipe(browsersync.reload({ stream: true }))
});

gulp.task('browser-sync', function() {
	browsersync({
		server: {
			baseDir: 'app'
		},
		notify: false,
        // open: false,
		// online: false, // Work Offline Without Internet Connection
		// tunnel: true, tunnel: "projectname", // Demonstration page: http://projectname.localtunnel.me
	})
});

gulp.task('sass', function() {
	return gulp.src('app/'+syntax+'/**/*.'+syntax+'')
	.pipe(sass({ outputStyle: 'expand' }).on("error", notify.onError()))
    // .pipe(rename({ suffix: '.min', prefix : '' })) // Mifify css (opt.)
	.pipe(autoprefixer(['last 15 versions']))
    .pipe(cleancss( {level: { 1: { specialComments: 0 } } })) // Opt., comment out when debugging
	.pipe(gulp.dest('app/css'))
	.pipe(browsersync.reload( {stream: true} )) // --???
});

gulp.task('watch', ['sass', 'js', 'browser-sync'], function() {
	gulp.watch('app/'+syntax+'/**/*.'+syntax+'', ['sass']);
	gulp.watch(['libs/**/*.js', 'app/js/common.js'], ['js']);
	gulp.watch('app/*.html', browsersync.reload)
});

gulp.task('imagemin', function() {
	return gulp.src('app/img/**/*')
	.pipe(imagemin([
      imagemin.gifsicle({interlaced: true}),
      imagemin.jpegtran({progressive: true}),
      imagemin.optipng({optimizationLevel: 5}),
      imagemin.svgo({
        plugins: [
          {removeViewBox: true},
          {cleanupIDs: false}
        ]
      })
    ]))
	.pipe(gulp.dest('dist/img')); 
});

gulp.task('build', ['removedist', 'imagemin', 'sass', 'js'], function() {

	var buildFiles = gulp.src([
		'app/*.html',
        'app/*.php',
		'app/.htaccess',
		]).pipe(gulp.dest('dist'));

	var buildCss = gulp.src([
		'app/css/*.css',
		]).pipe(gulp.dest('dist/css'));

	var buildJs = gulp.src([
		'app/js/*.js',
		'app/js/common.js',
		]).pipe(gulp.dest('dist/js'));

	var buildFonts = gulp.src([
		'app/fonts/**/*',
		]).pipe(gulp.dest('dist/fonts'));

});


gulp.task('removedist', function() { return del.sync('dist'); });
gulp.task('clearcache', function () { return cache.clearAll(); });

gulp.task('default', ['watch']);
