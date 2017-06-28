import {h} from 'preact';
import Auth from './Auth';
import ShowIfAuth from './ShowIfAuth';

function TodoApp(): JSX.Element
{
	return (
		<div class='content'>
			<Auth />
			<ShowIfAuth />
		</div>
	);
}

const AppRoot = <TodoApp />;

export {
	AppRoot as default,
	TodoApp,
};
