/**
 * @param {gulp} Gulp Объект Gulp.
 */
function main( Gulp )
{
	return () =>
	{
		const less = require( 'gulp-less' );
		const LessAutoprefix = require( 'less-plugin-autoprefix' );
		
		const autoprefix = new LessAutoprefix(
			{
				browsers: ['last 2 versions'],
			}
		);
		
		return Gulp.src( './styles/less/index.less' )
			.pipe(
				less(
					{
						plugins: [autoprefix],
					}
				)
			)
			.pipe(
				Gulp.dest( './public/styles/' )
			);
	};
}

module.exports = main;
