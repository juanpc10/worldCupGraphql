const gulp = require('gulp');
const fs = require('fs');
const del = require('del');
const $ = require('gulp-load-plugins')();

// Utility to ignore unnecessary files
// when generating the glob patterns array for gulp.src()
function addDefSrcIgnore (srcArr) {
  return srcArr.concat([
    '!**/REMOVE{,/**}',
    '!node_modules{,/**}',
    '!private{,/**}',
    '!dist{,/**}',
    '!.git{,/**}',
    '!**/.DS_Store'
  ]);
}

// JavaScript and JSON linter
gulp.task('lint', function () {
  return gulp
    .src(addDefSrcIgnore(['**/*.js', '**/*.json']), { dot: true })
    .pipe($.eslint({ dotfiles: true }))
    .pipe($.eslint.format())
    .pipe($.eslint.failAfterError());
});

// Remove solutions from exercises
gulp.task('remove-solutions', function () {
  del.sync('dist');
  return gulp
    .src(addDefSrcIgnore(['**']), { dot: true })
    .pipe(
      $.replace(
        /^\s*(\/\/|<!--|\/\*)\s*REMOVE-START[\s\S]*?REMOVE-END\s*(\*\/|-->)?\s*$/gm,
        ''
      )
    )
    .pipe(gulp.dest('dist'));
});

// Prepare for distribution to students
gulp.task(
  'dist',
  gulp.series('remove-solutions', function (done) {
    function removeMaster (str) {
      var strArr = str.split('-');
      strArr[strArr.length - 1] === 'master' && strArr.pop();
      return strArr.join('-');
    }

    const npmConfig = require('./package.json');
    npmConfig.name = removeMaster(npmConfig.name);
    npmConfig.repository.url = removeMaster(npmConfig.repository.url);
    npmConfig.scripts['dev'] = 'nodemon src/index.js';
    npmConfig.scripts['precommit'] = 'gulp lint';
    npmConfig.scripts['start'] = 'node src/index.js';
    fs.writeFileSync('dist/package.json', JSON.stringify(npmConfig, null, 2));

    const esLintConfig = require('./.eslintrc.json');
    esLintConfig.rules['no-undef'] = 'off';
    esLintConfig.rules['no-unused-vars'] = 'off';
    fs.writeFileSync(
      'dist/.eslintrc.json',
      JSON.stringify(esLintConfig, null, 2)
    );
    done();
  })
);
