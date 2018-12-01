var gulp = require("gulp")
var sass = require("gulp-sass");
var minCss = require("gulp-clean-css")
var server = require("gulp-webserver")
var url = require("url")
var path = require("path")
var fs = require("fs")
gulp.task("devSass",() => {
    return gulp.src("./src/scss/*.scss")
    .pipe(sass())
    .pipe(minCss())
    .pipe(gulp.dest('./src/css'))
})

gulp.task('watch',() => {
    return gulp.watch("./src/scss/*.scss",gulp.series('devSass'))
})

gulp.task("devServer",() => {
    return gulp.src("src")
    .pipe(server({
        port : 9997,
        middleware : function(req,res,next) {
            var pathname = url.parse(req.url).pathname;
            if(pathname == '/favicon.ico'){
                res.end('')
                return;
            }
            pathname = pathname === '/' ? 'index.html' : pathname;

            res.end(fs.readFileSync(path.join(__dirname, "src" , pathname)))
        }
    }))
})
gulp.task('dev',gulp.series('devSass','devServer','watch'))