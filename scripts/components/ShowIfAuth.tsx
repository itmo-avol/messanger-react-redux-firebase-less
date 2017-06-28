import {h} from 'preact';
import {SubscribedComponent} from '../Store/index';
import State from '../Store/State';
import {User} from 'firebase/app';

import UserList from './UserList';
import ChatList from './ChatList';
import SendMessage from './SendMessage';
import MessageList from './MessageList';

type ShowIfAuthProps = object;

interface ShowIfAuthState
{
	user: User | null;
}

class ShowIfAuth extends SubscribedComponent<State, ShowIfAuthProps, ShowIfAuthState>
{
	public render( ): JSX.Element
	{
		if (this.state.user)
			return (
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
			);

		return (
			<div class='info'>
			</div>
		);
		
		
	}

	protected storeStateChanged( {user}: State ): void
	{
		if ( user === this.state.user )
		{
			return;
		}
		
		this.setState( {user} );
	}
}


export {
	ShowIfAuth as default,
	ShowIfAuthProps,
	ShowIfAuthState,
};
