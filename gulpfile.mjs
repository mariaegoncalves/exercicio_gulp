import gulp from 'gulp';
import sass from 'gulp-sass';
import imageMin from 'gulp-imagemin';
import uglify from 'gulp-uglify';
import fs from 'fs';
import sassCompiler from 'sass';

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
function compileSass() {
  return gulp.src(paths.sass.src)
    .pipe(sass(sassCompiler).on('error', sass.logError))
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

// Exporta a tarefa de build
export { build };
