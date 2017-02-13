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

  gulp.watch('src/*.js', browserSync.reload);
  gulp.watch('src/*.css', browserSync.reload);
  gulp.watch('src/*.html', browserSync.reload);
});
gulp.task('default', ['browser-sync', 'watch']);

