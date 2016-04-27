var gulp = require('gulp')
var browserSync = require('browser-sync')

gulp.task('default', function(){
  browserSync.init({
    server:{
      baseDir: "./"
    }
  })

  gulp.watch(["*.js", "test/test.js", "*.html"]).on('change', browserSync.reload)
})