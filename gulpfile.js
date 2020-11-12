const { task, dest, src, parallel, series, watch } = require('gulp'),
	pug = require('gulp-pug'),
	sass = require('gulp-sass'),
	browserSync = require('browser-sync'),
	uglify = require('gulp-uglify'),
	concat = require('gulp-concat'),
	rename = require('gulp-rename'),
	del = require('del'),
	autoprefixer = require('gulp-autoprefixer');

task('clean', async function () {
	del.sync('dist');
});

task('pug', function () {
	return src('app/*.pug')
		.pipe(
			pug({
				pretty: true,
			})
		)
		.pipe(dest('app'))
		.pipe(browserSync.reload({ stream: true }));
});

task('scss', function () {
	return src('app/scss/**/*.scss')
		.pipe(sass({ outputStyle: 'compressed' }))
		.pipe(
			autoprefixer({
				browsers: ['last 8 versions'],
			})
		)
		.pipe(rename({ suffix: '.min' }))
		.pipe(dest('app/css'))
		.pipe(browserSync.reload({ stream: true }));
});

task('css', function () {
	return src([
		'node_modules/normalize.css/normalize.css',
		'node_modules/slick-carousel/slick/slick.css',
	])
		.pipe(concat('_libs.scss'))
		.pipe(dest('app/scss'))
		.pipe(browserSync.reload({ stream: true }));
});

task('html', function () {
	return src('app/*.html').pipe(browserSync.reload({ stream: true }));
});

task('script', function () {
	return src('app/js/*.js').pipe(browserSync.reload({ stream: true }));
});

task('js', function () {
	return src(['node_modules/slick-carousel/slick/slick.js'])
		.pipe(concat('libs.min.js'))
		.pipe(uglify())
		.pipe(dest('app/js'))
		.pipe(browserSync.reload({ stream: true }));
});

task('browser-sync', function () {
	browserSync.init({
		server: {
			baseDir: 'app/',
		},
	});
});

task('export', function () {
	let buildHtml = src('app/**/*.html').pipe('dist');

	let BuildCss = src('app/css/**/*.css').pipe('dist/css');

	let BuildJs = src('app/js/**/*.js').pipe('dist/js');

	let BuildFonts = src('app/fonts/**/*.*').pipe('dist/fonts');

	let BuildImg = src('app/img/**/*.*').pipe('dist/img');
});

task('watch', function () {
	watch('app/scss/**/*.scss', parallel('scss'));
	watch('app/*.pug', parallel('pug'));
	watch('app/js/*.js', parallel('script'));
});

task('build', series('clean', 'export'));

task('default', parallel('pug', 'css', 'scss', 'js', 'browser-sync', 'watch'));
