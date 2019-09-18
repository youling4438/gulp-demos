var gulp = require("gulp");
var { series, parallel, src, dest, watch } = gulp;
var { EventEmitter } = require("events");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");
const rename = require("gulp-rename");
const gulpIf = require("gulp-if");
const rollup = require("rollup");
const del = require("delete");

function streamTask() {
    console.log("gulp streamTask running");
    return src("*.js").pipe(dest("dist"));
}

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

const delCss = cb => del(["dist/**.css"], cb);
const copyCss = cb => src("**.css").pipe(dest("dist/", cb));
const delJs = cb => del(["dist/**.js"], cb);
const buildJs = cb =>
    src("foo.js")
        .pipe(babel())
        .pipe(uglify())
        .pipe(rename({ extname: ".min.js" }))
        .pipe(
            dest("dist/"),
            cb
        );

const copyJs = cb => src("foo.js").pipe(dest("dist/", cb));

const watchTask = cb => {
    console.log("gulp watch running");
    cb();
    watch("**.css", { events: "all" }, series(delCss, copyCss));
    // watch("foo.js", series(delJs, copyJs));
    watch("foo.js", series(delJs, buildJs, copyJs));
};

const watchTaskConfig = cb => {
    console.log("gulp watch with config running");
    watch(["a.js", "b.js"], { ignoreInitial: false }, cb => {
        cb();
        console.log("watch.js");
    });
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

const babelTask = cb => {
    cb();
    console.log("babel *****  task");
    return src("babel.js")
        .pipe(babel())
        .pipe(dest("./dist/babel"));
};

const fileStreamTask = cb => {
    cb();
    console.log("file stream");
    return (
        src(["babel.js", "gulpfile.js"])
            .pipe(babel())
            // .pipe(src("gulpfile.js"))
            // .pipe(babel())
            .pipe(
                uglify({
                    mangle: true, //类型：Boolean 默认：true 是否修改变量名
                    compress: true //类型：Boolean 默认：true 是否完全压缩
                })
            )
            .pipe(dest("dist/stream"))
    );
    // return src("babel.js")
    //     .pipe(babel())
    //     .pipe(src("gulpfile.js"))
    //     .pipe(babel())
    //     .pipe(
    //         uglify({
    //             mangle: true, //类型：Boolean 默认：true 是否修改变量名
    //             compress: true //类型：Boolean 默认：true 是否完全压缩
    //         })
    //     )
    //     .pipe(dest("dist/stream"));
};

const renameTask = cb => {
    cb();
    console.log("rename task");
    return (
        src(["babel.js", "gulpfile.js"])
            .pipe(babel())
            // .pipe(src("gulpfile.js"))
            // .pipe(babel())
            .pipe(
                uglify({
                    mangle: true, //类型：Boolean 默认：true 是否修改变量名
                    compress: true //类型：Boolean 默认：true 是否完全压缩
                })
            )
            .pipe(rename({ extname: ".min.js" }))
            .pipe(dest("dist/stream"))
    );
};

const asyncTask = async cb => {
    cb();
    console.log("async task");
    const bundle = await rollup.rollup({
        input: "foo.js"
    });

    return bundle.write({
        file: "dist/rollup/bundle.js",
        format: "iife"
    });
};

const delTask = cb => {
    // Use the `delete` module directly, instead of using gulp-rimraf
    console.log("delTask running");
    del(["dist"], cb);
};

const ifTask = cb => {
    const isJavaScript = file => {
        file.extname === ".js" && console.log(file.contents.toString());
        return file.extname === ".js";
    };
    const isHtml = file => {
        // console.log(file.contents.toString());
        return file.extname === ".html";
    };
    const isCss = file => {
        // console.log(file.contents.toString());
        return file.extname === ".css";
    };
    cb();
    console.log("if Task");
    return src(["*.js", "*.css", "*.html"])
        .pipe(gulpIf(isJavaScript, babel()))
        .pipe(gulpIf(isJavaScript, uglify()))
        .pipe(gulpIf(isJavaScript, rename({ extname: ".min.js" })))
        .pipe(gulpIf(isHtml, rename({ extname: ".if.html" })))
        .pipe(gulpIf(isCss, rename({ extname: ".if.css" })))
        .pipe(dest("dist/ifTask"));
};

exports.build1 = parallel(css, javascript);
exports.build2 = series(clean, parallel(css, javascript));
exports.task1 = task1;
exports.task3 = task3;
exports.streamTask = streamTask;
exports.promise = promiseTask;
exports.eventTask = eventTask;
exports.babelTask = babelTask;
exports.fileStreamTask = fileStreamTask;
exports.renameTask = renameTask;
exports.asyncTask = asyncTask;
exports.delTask = delTask;
exports.ifTask = ifTask;
exports.watchTask = watchTask;
exports.watchTaskConfig = watchTaskConfig;

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
