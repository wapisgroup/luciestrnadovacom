var gulp = require('gulp');
//var exec = require('gulp-exec');
var gutil = require('gulp-util');
var ftp = require('gulp-ftp');
var exec = require('child_process').exec;



gulp.task('build', function(){
  var options = {
    continueOnError: false, // default = false, true means don't emit error event
    pipeStdout: false, // default = false, true means stdout is written to file.contents
    customTemplatingThing: "test" // content passed to gutil.template()
  };
  var reportOptions = {
    err: true, // default = true, false means don't write err
    stderr: true, // default = true, false means don't write stderr
    stdout: true // default = true, false means don't write stdout
  }

  return gulp.src('./**/**')
    .pipe(exec('ng build -prod', options))
    .pipe(exec.reporter(reportOptions));

});

gulp.task('server', function() {
  return gulp.src('dist/**/*')
    .pipe(ftp({
      host: 'luciestrnadova.golf',
      user: 'z_strnad2_admin',
      pass: 'ajiYCqYG8_',
      remotePath: '/web'
    }))
    // you need to have some kind of stream after gulp-ftp to make sure it's flushed
    // this can be a gulp plugin, gulp.dest, or any kind of stream
    // here we use a passthrough stream
    .pipe(gutil.noop());
});

gulp.task('gzip:js', function() {
  exec('for file in ./dist/*.js; do gzip -c "$file" > "$file.gz"; done', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    console.log(err);
    console.log('gzip:js DONE')
  });
});
gulp.task('gzip:css', function() {
  exec('for file in ./dist/*.css; do gzip -c "$file" > "$file.gz"; done', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    console.log(err);
    console.log('gzip:css DONE')
  });
});


gulp.task('gzip:svg', function() {
  exec('for file in ./dist/assets/images/*.svg; do gzip -c "$file" > "$file.gz"; done', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    console.log(err);
    console.log('gzip:svg DONE')
  });
});

gulp.task('gzip', [ 'gzip:js', 'gzip:css', 'gzip:svg' ]);
gulp.task('deploy', [ 'build', 'server' ]);
