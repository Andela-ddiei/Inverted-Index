const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const nodemon = require('gulp-nodemon');

gulp.task('browser-sync', () => {
  browserSync.init({
    server: {
      baseDir: './src'
    },
    port: 3030,
    ui: {
      port: 3020
    }
  });
});

gulp.task('start', () => {
  nodemon({
    script: 'server.js',
    ext: 'js',
    ignore: ['node_modules/**', 'src/bower_components', 'coverage']
  });
});
gulp.task('watch', () => {
  gulp.watch(['src/*.html', 'src/css/*.css', 'src/js/*.js'])
  .on('change', browserSync.reload);
});


gulp.task('default', ['browser-sync', 'start', 'watch']);

