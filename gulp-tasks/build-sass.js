/**
 * @param {gulp} Gulp Объект Gulp.
 */
function main( Gulp )
{
	return () =>
	{
		const sass = require( 'gulp-sass' );
		const autoprefixer = require( 'gulp-autoprefixer' );
		
		return Gulp.src( './sass/index.scss' )
			.pipe(
				sass().on( 'error', sass.logError )
			)
			.pipe(
				autoprefixer(
					{
						browsers: ['last 2 versions'],
					}
				)
			)
			.pipe(
				Gulp.dest( './styles/' )
			);
	};
}

module.exports = main;
