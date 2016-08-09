var gulp = require('gulp')
var browserSync = require('browser-sync')

gulp.task('default', function(){
  browserSync.init({
    server:{
      baseDir: "./"
    }
  })

  gulp.watch(["js/*.js", "test/test.js", "*.html", "*.css"]).on('change', browserSync.reload)
})