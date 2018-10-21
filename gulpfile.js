var gulp = require('gulp'),
	connect = require('gulp-connect'),
	gulpif = require('gulp-if'),
	minifyHTML = require('gulp-minify-html'),
	imagemin = require('gulp-imagemin'),
	pngcrush = require('imagemin-pngcrush'),
	concat = require('gulp-concat'),
	sass = require('gulp-sass'),
	cleanCSS = require('gulp-clean-css'),
	autoprefixer = require('gulp-autoprefixer'),
	uglify = require('gulp-uglify'),
	babel = require('gulp-babel');
var env,
	jsSources,
	sassSources,
	outputDir;

env = process.env.NODE_ENV || 'development';

if (env==='development') {
	outputDir = 'development/';
} else {
	outputDir = 'docs/';
}

jsSources = 'src/js/*.js';
sassSources = ['src/sass/styles.scss', 'src/sass/blocks/*.scss', 'src/sass/utility/*.scss'];


gulp.task('js', function() {
	gulp.src(jsSources)
		.pipe(concat('script.js'))
		.pipe(gulpif(env === 'production', babel({
			presets: ['env']
		})))
		.pipe(gulpif(env === 'production', uglify()))
		.pipe(gulp.dest(outputDir + 'js'))
		.pipe(connect.reload());
});

gulp.task('sass', function () {
	return gulp.src('src/sass/styles.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ['last 5 versions'],
			cascade: false
		}))
		.pipe(gulpif(env === 'production', cleanCSS({compatibility: 'ie8'})))
		.pipe(gulp.dest(outputDir + 'css'))
		.pipe(connect.reload());
});

gulp.task('watch', function() {
	gulp.watch(jsSources, ['js']);
	gulp.watch(sassSources, ['sass']);
	gulp.watch('development/*.html', ['html']);
	gulp.watch('development/images/**/*.*', ['images']);
	gulp.watch('development/fonts/*.*', ['fonts']);
});

gulp.task('connect', function() {
	connect.server({
		root: outputDir,
		livereload: true
	});
});

gulp.task('html', function() {
	gulp.src('development/*.html')
		.pipe(gulpif(env === 'production', minifyHTML()))
		.pipe(gulpif(env === 'production', gulp.dest(outputDir)))
		.pipe(connect.reload());
});

gulp.task('fonts', function() {
	gulp.src('development/fonts/*.*')
		.pipe(gulpif(env === 'production', gulp.dest(outputDir + 'fonts')))
		.pipe(connect.reload());
});

gulp.task('images', function() {
	gulp.src('development/img/**/*.*')
		.pipe(gulpif(env === 'production', imagemin({
			progressive: true,
			svgoPlugins: [{ removeViewBox: false }],
			use: [pngcrush()]
		})))
		.pipe(gulpif(env === 'production', gulp.dest(outputDir + 'img')))
		.pipe(connect.reload());
});

gulp.task('default', ['html', 'fonts', 'js', 'sass', 'images', 'connect', 'watch']);