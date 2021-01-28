// Определяем константы Gulp
const { src, dest, parallel, series, watch } = require('gulp');
const gulp = require('gulp');
// Подключаем модули
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const iconfont = require('gulp-iconfont');
const iconfontCss = require('gulp-iconfont-css');
const image = require('gulp-image');
// Подключаем gulp-concat
const concat = require('gulp-concat');

// Подключаем gulp-uglify-es
const uglify = require('gulp-uglify-es').default;

function styles() {
  return src('assets/scss/style.scss') // Выбираем источник: "app/sass/main.sass" или "app/less/main.less"
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError)) // Преобразуем значение переменной "preprocessor" в функцию
    .pipe(autoprefixer({ browsers: ['last 2 versions'], grid: true }))
    .pipe(dest('build/css')); // Выгрузим результат в папку "app/css/"
}

function scripts() {
  return src([
    // Берём файлы из источников
    'assets/scripts/*.js', // Пользовательские скрипты, использующие библиотеку, должны быть подключены в конце
  ])
    .pipe(concat('script.min.js')) // Конкатенируем в один файл
    .pipe(uglify()) // Сжимаем JavaScript
    .pipe(dest('build/scripts/')); // Выгружаем готовый файл в папку назначения
}

function startwatch() {
  // Мониторим файлы препроцессора на изменения
  watch('assets/scss/**/*', styles);
  watch(['assets/scripts/*.js', '!assets/scripts/*.min.js'], scripts);
}

let fontName = 'icons';

async function icons() {
  gulp
    .src(['assets/icons/*.svg'], { base: 'assets' })
    .pipe(
      iconfontCss({
        fontName: fontName,
        // где будет наш scss файл
        targetPath: '../../assets/scss/_icons.scss',
        // пути подлючения шрифтов в _icons.scss
        fontPath: '../../build/fonts/',
      })
    )
    .pipe(
      iconfont({
        fontName: fontName,
        formats: ['svg', 'ttf', 'eot', 'woff', 'woff2'],
        normalize: true,
        fontHeight: 1001,
      })
    )
    .pipe(gulp.dest('build/fonts/'));
}

async function compress() {
  gulp.src('assets/images/*').pipe(image()).pipe(gulp.dest('build/images'));
}

// Экспортируем функцию styles() в таск styles
exports.startwatch = startwatch;
exports.icons = icons;
exports.compress = compress;
