const gulp = require("gulp");
const minify = require("gulp-minify");
const connect = require("gulp-connect");
const babel = require("gulp-babel");
const htmlmin = require("gulp-htmlmin");
const imagemin = require("gulp-imagemin");

function html(next) {
    gulp.src("./src/*.html")
        .pipe(
            htmlmin({
                collapseInlineTagWhitespace: false,
                collapseWhitespace: true,
                removeComments: true,
                minifyCSS: true,
                minifyJS: true,
                minifyURLs: true,
            })
        )
        .pipe(gulp.dest("./dist/"))
        .pipe(connect.reload());

    next();
}

function public(next) {
    gulp.src("./src/assets/**/*.*")
        .pipe(imagemin([imagemin.optipng({ optimizationLevel: 5 })]))
        .pipe(gulp.dest("./dist/assets/"))
        .pipe(connect.reload());

    next();
}

function js(next) {
    gulp.src("./src/js/**/*.js")
        .pipe(
            babel({
                presets: ["@babel/env"],
            }).on("error", (err) => console.log(err))
        )
        .pipe(
            minify({
                ext: {
                    min: ".js",
                },
                noSource: true,
            }).on("error", (err) => console.error(err))
        )
        .pipe(gulp.dest("./dist/js"))
        .pipe(connect.reload());

    next();
}

gulp.task("build", function (next) {
    html(next);
    public(next);
    js(next);

    next();
});

gulp.task("build-html", function (next) {
    html(next);

    next();
});

gulp.task("build-public", function (next) {
    public(next);

    next();
});

gulp.task("build-js", function (next) {
    js(next);

    next();
});
