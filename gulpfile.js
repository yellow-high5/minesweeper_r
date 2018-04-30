
var gulp = require('gulp');
var sass = require('gulp-sass');

//confirm gulp execution
gulp.task('hello', function(){
  console.log('start gulp!');
});

//compile sass
gulp.task('sass-watch', function () {
  gulp.watch('./src/sass/**/*.scss', function () {
    gulp.src('./src/sass/**/*.scss')
      .pipe(sass({
        outputStyle: 'expanded'
      })
      .on('error', sass.logError))
      .pipe(gulp.dest('./src/css'));
  });
});

gulp.task('default', ['hello', 'sass-watch']);
