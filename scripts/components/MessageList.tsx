import {h} from 'preact';
import {SubscribedComponent} from '../Store/index';
import State, {StateChat, StateCurrentChat, Message} from '../Store/State';
import {User} from 'firebase/app';

type MessageListProps = object;

interface MessageListState
{
	chats: StateChat[];
	currentChat: StateCurrentChat;
	user: User | null;
}

class MessageList extends SubscribedComponent<State, MessageListProps, MessageListState>
{
	public render(): JSX.Element
	{
		const messages = this.getVisibileMessages();

		const {user} = this.state;

		if (!user) 
			return <div> </div>;
		
		return (
				<ul>
					{
						messages.map(
							( message: Message ) => (
								<li class={user.uid === message.fromUser.uid ? "yourMessage" : ""}>
									<p class="messageUser">{message.fromUser.name}</p>
									<p class="messagetime">{message.timestamp}</p>
									<p class="messageText">{message.text}</p>
								</li>
								),
						)
					}
				</ul>
		);
		
	}
	
	protected storeStateChanged( {chats, currentChat, user}: State ): void
	{
		if (
			( chats === this.state.chats )
			&& ( currentChat === this.state.currentChat )
			&& ( user === this.state.user )
		)
		{
			return;
		}
		
		this.setState( {chats, currentChat, user} );
	}
	
	private getVisibileMessages(): Message[]
	{
		const {currentChat, chats} = this.state;


		for (var i = 0; i < chats.length; i++) 
		{
			if (chats[i].id === currentChat.id)
				return chats[i].messages;
		}

		return [];
	}
}

export {
	MessageList as default,
	MessageListProps,
	MessageListState,
};
