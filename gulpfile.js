const gulp = require('gulp');
const browserSync = require('browser-sync').create();

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

gulp.task('watch', () => {
  gulp.watch(['src/*.html', 'src/css/*.css', 'src/js/*.js'])
  .on('change', browserSync.reload);
});


gulp.task('default', ['browser-sync', 'watch']);

