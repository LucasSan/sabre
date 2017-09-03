const gulp = require('gulp');
const concatCss = require('gulp-concat-css');
const concat = require('gulp-concat');
const ngAnnotate = require('gulp-ng-annotate');
const cleanCSS = require('gulp-clean-css');
const plumber = require('gulp-plumber');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const babel = require('gulp-babel');
const browserSync = require('browser-sync').create();
const inject = require('gulp-inject');
const del = require('del');
const htmlmin = require('gulp-htmlmin');
const gutil = require('gulp-util');

const CSSSources = [
];

const JSSources = [
  './node_modules/angular/angular.js'
];

const sabreJSSources = [
  './src/app/app.js',
  './src/app/routes.js'
];

gulp.task('css', () =>
  gulp.src(CSSSources)
    .pipe(plumber())
    .pipe(concatCss('vendors.css'))
    .pipe(cleanCSS())
    .pipe(rename('vendors.min.css'))
    .pipe(gulp.dest('./dist/'))
);

gulp.task('scripts', () =>
  gulp.src(JSSources)
    .pipe(plumber())
    .pipe(concat('vendors.js'))
    .pipe(ngAnnotate())
    .pipe(uglify({
      mangle: true,
      exportAll: true
    }))
    .pipe(rename('vendors.min.js'))
    .pipe(gulp.dest('./dist/'))
);

gulp.task('sabre', () =>
  gulp.src(sabreJSSources)
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(plumber())
    .pipe(concat('sabre.js'))
    .pipe(ngAnnotate())
    .pipe(uglify({
      mangle: true,
      exportAll: true
    }))
    .pipe(rename('sabre.min.js'))
    .pipe(gulp.dest('./dist/'))
);

gulp.task('index', () =>
  gulp.src('./index.html')
    .pipe(gulp.dest('./dist/'))
);

gulp.task('clean', () => del(['./dist/*', '!dist/.gitkeep']));

gulp.task('bs-reload', (done) => {
  browserSync.reload();
  done();
});

gulp.task('browser-sync', () => {
  browserSync.init({
    server: {
      baseDir: './'
    },
    port: 4000
  });

  gulp.watch(
    ['src/app/*.js', 'src/app/components/*.js', 'src/app/components/**/*.js', 'src/app/services/*.js',
      'src/app/components/**/*.html', 'src/app/components/**/**/.html', './*.html'
    ],
    gulp.series('bs-reload'));
});

gulp.task('templates', () =>
  gulp.src(['src/app/components/**/*.html'])
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('./dist/src/app/components')));

gulp.task('inject', () => {
  const target = gulp.src('./index.html');
  const sources = gulp.src(CSSSources.concat(JSSources).concat(sabreJSSources), { read: false });

  return target.pipe(inject(sources))
    .pipe(gulp.dest('./'));
});


gulp.task('start', gulp.series('inject', 'browser-sync'));
gulp.task('build', gulp.series('clean', 'scripts', 'css', 'sabre', 'templates', 'index'));
