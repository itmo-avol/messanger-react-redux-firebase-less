import {h} from 'preact';
import {SubscribedComponent} from '../Store/index';
import State, {StateChat, StateCurrentChat, Message} from '../Store/State';
import {User} from 'firebase/app';
import ChatComponent from './Chat';
import {setCurrentChat} from '../Store/creators';
import {dispatch} from '../Store/index';
import changeChatMessages from '../data/changeChatMessages';

type ChatListProps = object;

interface ChatListState
{
	chats: StateChat[];
	user: User | null;
	currentChat: StateCurrentChat;
}

class ChatList extends SubscribedComponent<State, ChatListProps, ChatListState>
{
	public render(): JSX.Element
	{
		const chats = this.getVisibileChats();

		const { user, currentChat } = this.state;

		if (!user || chats.length === 0)
		{
			return <div> </div>;
		}

		this.readMessagesFromCurrentChat ( currentChat.id );
		
		return (
			<ul>
				<p class="header">Chats</p>
				{
					chats.map(
						( chat: StateChat ) => {
							return (
								<ChatComponent 
									chat={chat}
									user={user}
									liClass={chat.id === currentChat.id ? "currentChat" : ""}
									onClick={() => this.onChatClick( chat.id )}
								/>);
						}
					)
				}
			</ul>
		);
		
		
	}

	private readMessagesFromCurrentChat ( id: string ):void 
	{
		const {chats, user} = this.state;
		let messages:Message[] = [];

		if( !user)
			return;

		chats.forEach( (chat:StateChat, index:number) => {
			if (chat.id == id)
				chats[index].messages.forEach ( (message:Message) => { 
					messages.push( {
						text: message.text,
						timestamp: message.timestamp,
						fromUser: message.fromUser,
						isRead: message.fromUser.uid !== user.uid ? true : message.isRead,
					} as Message ) } );
		} );

		changeChatMessages ( id, messages );

	}

	private onChatClick = ( id: string ): void =>
	{
		dispatch( setCurrentChat( {id} ) );
	}
	
	protected storeStateChanged( {chats, user, currentChat}: State ): void
	{
		if (
			( chats === this.state.chats )
			&& ( user === this.state.user )
			&& ( currentChat === this.state.currentChat )
		)
		{
			return;
		}
		
		this.setState( {chats, user, currentChat} );
	}
	
	private getVisibileChats(): StateChat[]
	{
		const {chats} = this.state;
		
		return chats;
	}
}


export {
	ChatList as default,
	ChatListProps,
	ChatListState,
};
