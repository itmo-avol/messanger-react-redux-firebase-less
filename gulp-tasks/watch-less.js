/**
 * @param {gulp} Gulp Объект Gulp.
 * @param {string[]} tasks Массив задач для запуска.
 */
function main( Gulp, tasks )
{
	return () =>
	{
		return Gulp.watch(
			'less/**/*.less',
			{cwd: __dirname},
			tasks
		);
	};
}

module.exports = main;
