import gulp from 'gulp';
import gulpSass from 'gulp-sass';
import imageMin from 'gulp-imagemin';
import uglify from 'gulp-uglify';
import fs from 'fs';
import * as sassCompiler from 'sass'; 

// Caminhos dos arquivos
const paths = {
  sass: {
    src: 'src/scss/style.scss',
    dest: 'dist/css'
  },
  images: {
    src: [
      'images/bird-ga5d9ed257_1920.jpg',
      'images/birds-g6b63afc7a_1920.jpg',
      'images/butterfly-g7f3546b64_1920.jpg',
      'images/hands-gc143a78ba_1920.png',
      'images/lilies-g19bcb21a4_1920.jpg',
      'images/street-gddeece843_1920.jpg'
    ],
    dest: 'dist/images'
  },
  js: {
    src: 'src/js/script.js',
    dest: 'dist/js'
  }
};

// Tarefa para criar as pastas de saída
function createFolders(done) {
  if (!fs.existsSync(paths.sass.dest)) {
    fs.mkdirSync(paths.sass.dest, { recursive: true });
  }
  if (!fs.existsSync(paths.images.dest)) {
    fs.mkdirSync(paths.images.dest, { recursive: true });
  }
  if (!fs.existsSync(paths.js.dest)) {
    fs.mkdirSync(paths.js.dest, { recursive: true });
  }
  done();
}

// Tarefa de compilação SASS
const sass = gulpSass(sassCompiler); // Mude aqui

function compileSass() {
  return gulp.src(paths.sass.src)
    .pipe(sass().on('error', sass.logError)) // Mantenha o log de erro
    .pipe(gulp.dest(paths.sass.dest));
}

// Tarefa de compressão de imagens
function compressImages() {
  return gulp.src(paths.images.src)
    .pipe(imageMin())
    .pipe(gulp.dest(paths.images.dest));
}

// Tarefa de compressão de JavaScript
function compressJs() {
  return gulp.src(paths.js.src)
    .pipe(uglify())
    .pipe(gulp.dest(paths.js.dest));
}

// Tarefa que executa todas as tarefas acima
const build = gulp.series(createFolders, compileSass, compressImages, compressJs);

// Exporta as tarefas
export { build, compileSass, compressImages, compressJs };
