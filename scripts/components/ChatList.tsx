import {h} from 'preact';
import {dispatch, SubscribedComponent} from '../Store/index';
import State, {StateChat, Message, StateCurrentChat} from '../Store/State';
import {User} from 'firebase/app';
import {setCurrentChat} from '../Store/creators';

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
		
		return (
			<ul>
				<p class="header">Чаты</p>
				{
					chats.map(
						( chat: StateChat ) => {
							let showUser: number = user.uid !== chat.chatUsers[0].uid ? 0 : 1, 
								showMessage: boolean = chat.messages.length !== 0;

							if (showMessage) {
								let messagesLength: number = chat.messages.length - 1;
								let lastMessage:Message = chat.messages[messagesLength ];


								return	(
								<li
									onClick={() => this.onChatClick( chat.id )}
									class={chat.id === currentChat.id ? "currentChat" : ""}
								>
								<p class="messageUser">{chat.chatUsers[showUser].name}</p>
								<p class="messagetime">{showMessage ? lastMessage.timestamp : ""}</p>
								<p class="messageText">{showMessage && lastMessage.fromUser.uid  === user.uid ? "you: " : ""}
								{showMessage ? lastMessage.text : ""}</p>
								</li>);
							}
							else {
								return	(
								<li
									onClick={() => this.onChatClick( chat.id )}
									class={chat.id === currentChat.id ? "currentChat" : ""}
								>
								<p class="messageUser">{chat.chatUsers[showUser].name}</p>
								</li>);
							}

						}
					)
				}
			</ul>
		);
		
		
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
	
	private onChatClick = ( id: string ): void =>
	{
		dispatch( setCurrentChat( {id} ) );
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
