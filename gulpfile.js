var gulp = require("gulp")
var sass = require("gulp-sass");
var minCss = require("gulp-clean-css")
var server = require("gulp-webserver")
var url = require("url")
var path = require("path")
var fs = require("fs")
var swiper = require("./mock/swiper.json")
var uglify = require("gulp-uglify")
var babel = require("gulp-babel")
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

            if(pathname === '/api/swiper') {
                res.end(JSON.stringify({code : 1,data : swiper})) 
            }else {
               pathname = pathname === '/' ? 'index.html' : pathname;

                res.end(fs.readFileSync(path.join(__dirname, "src" , pathname))) 
            }
            
        }
    }))
})
gulp.task('dev',gulp.series('devSass','devServer','watch'))

gulp.task("bCss",() => {
    return gulp.src("./src/css/*.css")
    .pipe(gulp.dest('./build/css'))
})

gulp.task('Buglfy',() => {
    return gulp.src('./src/js/*.js')
    .pipe(babel({
        presets : ['@babel/env']
    }))
    .pipe(uglify())
    .pipe(gulp.dest('./build/js'))
})

gulp.task('bCopy',() => {
    return gulp.src('./src/js/libs/*.js')
    .pipe(gulp.dest('./build/js/libs'))
})

gulp.task('bHtml',() => {
    return gulp.src('./src/*.html')
    .pipe(gulp.dest('./build'))
})

gulp.task('build',gulp.parallel('bCss','Buglfy','bCopy','bHtml'))