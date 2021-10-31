var gulp = require('gulp'),  // подключаем Gulp
    webserver = require('browser-sync'), // сервер для работы и автоматического обновления страниц  
    sass = require('gulp-sass')(require('sass')); // модуль для компиляции SASS (SCSS) в CSS
    autoprefixer = require('gulp-autoprefixer'), // модуль для автоматической установки автопрефиксов
    cleanCSS = require('gulp-clean-css'), // плагин для минимизации CSS   
    rename = require('gulp-rename');


gulp.task('server', function () {
    webserver.init({
        server: {
            baseDir: "src"
        }
    });
    gulp.watch("./src/*.+(html)").on("change", webserver.reload);
});


gulp.task('css:build', function () {
    return gulp.src('./src/sass/**/*.scss')
        .pipe(sass({outputStyle:"compressed"}))
        .pipe(autoprefixer())
        .pipe(rename({ suffix: '.min' }))
        .pipe(cleanCSS())
        .pipe(gulp.dest('./src/css'))
        .pipe(webserver.reload({ stream: true }));/*  */
});
gulp.task("watch", function () {
    gulp.watch('./src/sass/**/*.scss', gulp.parallel('css:build'));
    gulp.watch("./src/*.+(html)").on("change", webserver.reload)
});

gulp.task('default', gulp.parallel('watch', 'server', 'css:build'));

