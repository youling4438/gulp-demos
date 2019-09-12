var gulp = require("gulp");
var { series, parallel } = gulp;

// default task
// gulp.task("default", () => {
//     console.log("gulp running!");
// });

function clean(cb) {
    console.log("gulp clean running");
    cb();
}

function build(cb) {
    console.log("gulp build running");
    cb();
}

const copy = cb => {
    console.log("gulp copy running");
    cb();
};

const watch = cb => {
    console.log("gulp watch running");
    cb();
};

const task1 = cb => {
    console.log("gulp watch running");
    cb();
};

const minify = cb => {
    console.log("gulp minify running");
    cb();
};

const livereload = cb => {
    console.log("gulp livereload running");
    cb();
};
exports.task1 = task1;
exports.watch = watch;
exports.build = build;
exports.copy = copy;
exports.minify = minify;
/*
 * series 依次执行每个任务
 */
exports.default = series(clean, build, copy, livereload);
/*
 * parallel 同时执行多个任务
 */
exports.task2 = parallel(copy, watch, task1);

if (process.env.NODE_ENV === "production") {
    exports.default = series(clean, build, copy, minify);
}
