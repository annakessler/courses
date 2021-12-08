const {
	src,
	dest,
	parallel,
	series,
	watch
} = require('gulp');
const del = require('del');
const browserSync = require('browser-sync').create();
const fileInclude = require('gulp-file-include');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const autoPrefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const svgSprite = require('gulp-svg-sprite');
const uglify = require('gulp-uglify-es').default;
const htmlmin = require('gulp-htmlmin');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const ghPages = require('gulp-gh-pages');
const gutil = require('gulp-util');
const ftp = require('vinyl-ftp');

// Deploy вёрстки на gh-pages
function deploy() {
	return src('./dist/**/*')
		.pipe(ghPages());
}

// Удаление папки dist
function clean() {
	return del(['dist/*'])
}

// HTML файлы
function html() {
	return src(['./src/*.html', '!./src/parts.html'])
		.pipe(fileInclude({
			prefix: '@',
			basepath: '@file'
		}))
		.pipe(dest('./dist'))
		.pipe(browserSync.stream());
}

function htmlBuild() {
	return src('dist/**/*.html')
		.pipe(htmlmin({
			collapseWhitespace: true
		}))
		.pipe(dest('dist'));
}

// Стили
function css() {
	return src('./src/sass/**/*.+(sass|scss)')
		.pipe(sourcemaps.init())
		.pipe(sass({
			outputStyle: 'expanded'
		}))
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(autoPrefixer({
			overrideBrowserslist: ['last 10 version'],
			grid: true
		}))
		.pipe(sourcemaps.write('.'))
		.pipe(dest('./dist/css/'))
		.pipe(browserSync.stream())
}

function cssBuild() {
	return src('./src/sass/**/*.+(sass|scss)')
		.pipe(sass({
			outputStyle: 'compressed'
		}))
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(autoPrefixer({
			overrideBrowserslist: ['last 10 version'],
			grid: true
		}))
		.pipe(dest('./dist/css/'))
}

// Изображения
function img() {
	return src('./src/img/**/*')
		.pipe(dest('./dist/img'))
}

function imgWebp() {
	return src('./src/img/**/*')
		.pipe(webp())
		.pipe(dest('./dist/img'))
}

function imgBuild() {
	return src('./src/img/**/*')
		.pipe(imagemin([
			imagemin.gifsicle({
				interlaced: true
			}),
			imagemin.mozjpeg({
				quality: 75,
				progressive: true
			}),
			imagemin.optipng({
				optimizationLevel: 5
			}),
			imagemin.svgo({
				plugins: [{
						removeViewBox: true
					},
					{
						cleanupIDs: false
					}
				]
			})
		]))
		.pipe(dest('./dist/img'))
}

function imgWebpBuild() {
	return src('./src/img/**/*')
		.pipe(webp())
		.pipe(dest('./dist/img'))
}

// Svg sprite
function svgSprites() {
	return src('./src/img/svg/*.svg')
		.pipe(svgSprite({
			mode: {
				stack: {
					sprite: "../sprite.svg" // Sprite file name
				}
			},
		}))
		.pipe(dest('./dist/img'));
}

// Скрипты
function js() {
	return src('./src/js/scripts.js')
		.pipe(sourcemaps.init())
		.pipe(fileInclude({
			prefix: '@',
			basepath: '@file'
		}))
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(sourcemaps.write('.'))
		.pipe(dest('./dist/js/'))
		.pipe(browserSync.stream())
}

function jsBuild() {
	return src('./src/js/scripts.js')
		.pipe(fileInclude({
			prefix: '@',
			basepath: '@file'
		}))
		.pipe(uglify())
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(dest('./dist/js/'))
}

// Прочие ресурсы
function resources() {
	return src(['./src/resources/**', '!./src/resources/untraceable/**'])
		.pipe(dest('./dist'))
}

// Слежениe
function watching() {
	browserSync.init({
		server: {
			baseDir: "./dist"
		}
	});

	watch(['./src/*.html'], html);
	watch(['./src/templates/*.html'], html);
	watch(['./src/sass/**/*.{sass,scss}'], css);
	watch(['./src/img/*.{jpg,jpeg,png,svg}'], img);
	watch(['./src/img/**/*.{jpg,jpeg,png}'], img);
	watch(['./src/img/*.{jpg,jpeg,png,svg}'], imgWebp);
	watch(['./src/img/**/*.{jpg,jpeg,png}'], imgWebp);
	watch(['./src/img/svg/**.svg'], svgSprites);
	watch(['./src/js/**/*.js'], js);
	watch(['./src/resources/**'], resources);
}

// Деплой build версии на хостинг по FTP
function FtpDeploy() {

	let conn = ftp.create({
		host: '77.222.61.25',
		user: 'mogilevkos',
		password: 'Gfyfcjybr09',
		parallel: 10,
		log: gutil.log
	});

	let globs = [
		'dist/**',
	];

	return src(globs, {
			base: './dist',
			buffer: false
		})
		.pipe(conn.newer('test_zayrexan_ru/public_html'))
		.pipe(conn.dest('test_zayrexan_ru/public_html'));
}

exports.default = series(clean, html, css, img, imgWebp, svgSprites, js, resources, watching);

exports.deploy = series(deploy);

exports.ftp = series(FtpDeploy);

exports.build = series(clean, html, cssBuild, svgSprites, jsBuild, resources, htmlBuild, imgWebpBuild, imgBuild);