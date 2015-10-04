var gulp = require('gulp');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('default',function(){
	return gulp.src('editor/js/app/**/*js')
  .pipe(sourcemaps.init())
  .pipe(babel({modules:"umd", highlightCode:false, moduleIds: true}).on('error',function(err){
    console.log(err.message);
    console.log(err.stack);
  }))
  .pipe(concat('app.bundle.js'))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('editor'))
})

gulp.task('watch',['default'], function(){
  gulp.watch('editor/js/app/**/*js',['default'])
});