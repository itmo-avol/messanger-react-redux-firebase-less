/**
 * @param {gulp} Gulp Объект Gulp.
 */
function main( Gulp )
{
	const Path = require( 'path' );
	
	const errorHandler = function ( error )
	{
		console.log( String( error ) );
		this.emit( 'end' );
	};
	
	const importOptions = {
		root: Path.resolve( __dirname, '..' ),
		skipDuplicates: false,
	};
	
	const AUTOPREFIXER_BROWSERS = [
		'ie >= 10',
		'ie_mob >= 10',
		'ff >= 30',
		'chrome >= 34',
		'safari >= 7',
		'opera >= 23',
		'ios >= 7',
		'android >= 4.4',
		'bb >= 10',
	];
	
	return () =>
	{
		const plumber = require( 'gulp-plumber' );
		const postcss = require( 'gulp-postcss' );
		
		return Gulp.src( './postcss/index.pcss' )
			.pipe( plugins.plumber( {errorHandler: errorHandler} ) )
			.pipe(
				postcss(
					[
						require( 'postcss-import' )( importOptions ),
						require( 'postcss-sassy-mixins' ),
						require( 'postcss-advanced-variables' ),
						require( 'postcss-media-minmax' ),
						require( 'postcss-nested' ),
						require( 'postcss-extend' ),
						require( 'postcss-color-function' ),
						require( 'postcss-font-weights' ),
						require( 'postcss-quantity-queries' ),
						require( 'postcss-selector-matches' ),
						require( 'postcss-selector-not' ),
						require( 'postcss-calc' )( {precision: 2} ),
						require( 'postcss-round-subpixels' ),
						require( 'autoprefixer' )( AUTOPREFIXER_BROWSERS ),
						require( 'css-mqpacker' ),
					]
				)
			)
			.pipe(
				Gulp.dest( './styles/' )
			);
	};
}

module.exports = main;
