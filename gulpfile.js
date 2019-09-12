var gulp = require("gulp");
var { series } = gulp;

// default task
// gulp.task("default", () => {
//     console.log("gulp running!");
// });

function clean(cb) {
    console.log("gulp clean running");
    cb && cb();
}

function build(cb) {
    console.log("gulp build running");
    cb && cb();
}

const copy = cb => {
    console.log("gulp copy running");
    cb && cb();
};

const watch = cb => {
    console.log("gulp watch running");
    cb && cb();
};

const task1 = cb => {
    console.log("gulp watch running");
    cb && cb();
};

exports.task1 = task1;
exports.watch = watch;
exports.build = build;
exports.copy = copy;
exports.default = series(clean, build);
