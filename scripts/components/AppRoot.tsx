import {h} from 'preact';
import Auth from './Auth';
import UserList from './UserList';
import ChatList from './ChatList';
import SendMessage from './SendMessage';
import MessageList from './MessageList';

function TodoApp(): JSX.Element
{
	return (
		<div class='content'>
			<Auth />
			<div class='info'>
				<div class='left-side'>
					<ChatList />
					<UserList />
				</div>
				<div  class='right-side'>
					<MessageList />
					<SendMessage />
				</div>
			</div>
		</div>
	);
}

const AppRoot = <TodoApp />;

export {
	AppRoot as default,
	TodoApp,
};
