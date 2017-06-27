const Gulp = require( 'gulp' );

function cleanExit()
{
	process.exit();
}

// Catch ctrl-c
process.on( 'SIGINT', cleanExit );
// Catch kill
process.on( 'SIGTERM', cleanExit );

function getTask( name, extra )
{
	return require( './gulp-tasks/' + name )( Gulp, extra );
}

Gulp.task(
	'build:less',
	getTask( 'build-less' )
);
Gulp.task(
	'watch:less',
	getTask(
		'watch-less',
		[
			'build:less',
		]
	)
);

Gulp.task(
	'build:sass',
	getTask( 'build-sass' )
);
Gulp.task(
	'watch:sass',
	getTask(
		'watch-sass',
		[
			'build:sass',
		]
	)
);
