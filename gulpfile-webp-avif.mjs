import gulp from 'gulp';
import webp from 'gulp-webp';
import avif from 'gulp-avif';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';

// Путь к исходным изображениям и для сохранения обработанных
const srcPath = 'src/assets/images/**/*.{jpg,png}';
const distPath = 'dist/assets/images/';

// Задача для конвертации изображений в формат WebP
function imagesWebp() {
    console.log('Запуск конвертации в WebP...');
    return gulp.src(srcPath)
        .pipe(plumber({ errorHandler: notify.onError('Ошибка в Gulp: <%= error.message %>') }))
        .on('data', function(file) { console.log('Файл для конвертации (WebP):', file.path); }) // Логирование файла
        .pipe(webp()) // Конвертируем в WebP
        .pipe(gulp.dest(distPath)) // Сохраняем в целевой папке
        .on('end', () => console.log('Конвертация в WebP завершена.'));
}

// Задача для конвертации изображений в формат AVIF
function imagesAvif() {
    console.log('Запуск конвертации в AVIF...');
    return gulp.src(srcPath)
        .pipe(plumber({ errorHandler: notify.onError('Ошибка в Gulp: <%= error.message %>') }))
        .on('data', function(file) { console.log('Файл для конвертации (AVIF):', file.path); }) // Логирование файла
        .pipe(avif()) // Конвертируем в AVIF
        .pipe(gulp.dest(distPath)) // Сохраняем в целевой папке
        .on('end', () => console.log('Конвертация в AVIF завершена.'));
}

// Задача по умолчанию, которая выполняет конвертацию
export default gulp.series(imagesWebp, imagesAvif);
