var gulp = require('gulp'),
    gutil = require("gulp-util"),
    childProcess = require('child_process'),
    webpack = require("webpack"),
    webpack_config = require('./webpack.config');

gulp.task('default', ['run'], function() {
});

gulp.task('run', ['webpack', 'server'], function() {
});

gulp.task("webpack", function(callback) {
    webpack(webpack_config, function(err, stats) {
        if(err) {
            throw new gutil.PluginError("webpack", err);
        }
        gutil.log("[webpack]", stats.toString());
        callback();
    });
});

gulp.task('server', function() {
    var serverProcess = childProcess.execFile('node', [
        'server/server.js'
    ]);
    serverProcess.stdout.on('data', function(data) {
        process.stdout.write(data);
    });
    serverProcess.stderr.on('data', function(data) {
        process.stderr.write(data);
    });

    return serverProcess;
});