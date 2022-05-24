const { src, dest, watch, series, parallel } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const concat = require("gulp-concat");
const imagemin = require("gulp-imagemin");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const browsersync = require("browser-sync").create();

// File paths
const files = {
  scssPath: "./styles/**/*.scss",
  jsPath: "./js/**/*.js",
  imagePath: "./images/**/*.+(png|jpg|gif|svg)",
};

// Sass task: compiles the style.scss file into style.css
function scssTask() {
  return src(files.scssPath, { sourcemaps: true }) // set source and turn on sourcemaps
    .pipe(sass()) // compile SCSS to CSS
    .pipe(postcss([autoprefixer(), cssnano()])) // PostCSS plugins
    .pipe(dest("css", { sourcemaps: "." })); // put final CSS in dist folder with sourcemap
}
function imagesTask() {
  return src(files.imagePath, { sourcemaps: true })
    .pipe(
      imagemin({
        interlaced: true,
      })
    )
    .pipe(dest("dist/images"));
}

function scssTask() {
  return src(files.scssPath, { sourcemaps: true }) // set source and turn on sourcemaps
    .pipe(sass()) // compile SCSS to CSS
    .pipe(postcss([autoprefixer(), cssnano()])) // PostCSS plugins
    .pipe(dest("css", { sourcemaps: "." })); // put final CSS in dist folder with sourcemap
}

// JS task: concatenates and uglifies JS files to script.js
function jsTask() {
  return src(
    [
      files.jsPath,
      //,'!' + 'includes/js/jquery.min.js', // to exclude any specific files
    ],
    { sourcemaps: true }
  )
    .pipe(concat("all.js"))
    .pipe(dest("dist", { sourcemaps: "." }));
}

// Browsersync to spin up a local server
function browserSyncServe(cb) {
  // initializes browsersync server
  browsersync.init({
    server: {
      baseDir: ".",
    },
  });
  cb();
}
function browserSyncReload(cb) {
  browsersync.reload();
  cb();
}

function bsWatchTask() {
  watch("index.html", browserSyncReload);
  watch(
    [files.scssPath, files.jsPath, files.imagePath],
    { usePolling: true },
    series(parallel(scssTask, jsTask, imagesTask), browserSyncReload)
  );
}
exports.default = series(
  parallel(scssTask, jsTask, imagesTask),
  browserSyncServe,
  bsWatchTask
);
