var gulp = require("gulp");
var { series, parallel, src, dest } = gulp;
var { EventEmitter } = require("events");

function streamTask() {
    console.log("gulp streamTask running");
    return src("*.js").pipe(dest("dist"));
}

exports.streamTask = streamTask;

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

const css = function(cb) {
    // body omitted
    console.log("gulp css running");
    cb();
};

const javascript = function(cb) {
    // body omitted
    console.log("gulp javascript running");
    cb();
};

const task3 = cb => {
    console.log("********task3 running********");
    cb();
    src("**.html").pipe(dest("dist/task3"));
};

const promiseTask = cb => {
    cb();
    console.log("promise task");
    return Promise.resolve("the value is ignored!");
};

const eventTask = cb => {
    cb();
    console.log("event task");
    const emitter = new EventEmitter();
    setTimeout(() => {
        emitter.emit("哈哈，我是来自emit传回的信息！");
    }, 500);
    return emitter;
};

exports.build1 = parallel(css, javascript);
exports.build2 = series(clean, parallel(css, javascript));
exports.task1 = task1;
exports.task3 = task3;
exports.promise = promiseTask;
exports.eventTask = eventTask;
exports.watch = watch;
// exports.build = build;
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
