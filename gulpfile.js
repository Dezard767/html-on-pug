import gulp from 'gulp';
import { parallel, series } from 'gulp';
import pug from 'gulp-pug';
import * as sass from 'sass';
import gulpSass from 'gulp-sass';
import cssnano from 'gulp-cssnano';
import rename from'gulp-rename';
import image from 'gulp-image';
import {deleteAsync} from 'del';

const sassCompiler = gulpSass(sass);

const paths = {
    build: 'build/**/*',
    styles: {
        src: 'src/styles/*.scss',
        dest: 'build/css'
    },
    images: {
        src: 'src/images/*.**',
        dest: 'build/images'
    },
    fonts: {
        src: 'src/styles/fonts/**/*.*',
        dest: 'build/css/fonts'
    }
};

const clean = () => {
    return deleteAsync(paths.build);
};

const html = () => {
    return gulp.src('src/pug/*.pug')
        .pipe(pug())
        .pipe(gulp.dest('build'))
}

const styles = () => {
    return gulp.src(paths.styles.src)
        .pipe(sassCompiler())
        .pipe(cssnano())
        .pipe(rename( { suffix: ".min" } ))
        .pipe(gulp.dest(paths.styles.dest));
}

const fonts = () => {
    return gulp.src(paths.fonts.src)
        .pipe(gulp.dest(paths.fonts.dest));
}

const images = () => {
    return gulp.src(paths.images.src, { encoding: false })
        .pipe(image())
        .pipe(gulp.dest(paths.images.dest));
}

export const build = series(
    clean,
    parallel(html, styles, images, fonts)
)

export default build