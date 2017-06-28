import {Component, h} from 'preact';
import {StateChat, Message} from '../Store/State';
import {User} from 'firebase/app';

interface ChatProps
{
	chat:StateChat;
	user:User;
	liClass:string;
	onClick(): void;
}

type ChatState = object;

class Chat extends Component<ChatProps, ChatState>
{
	public render( {chat, user, liClass, onClick}: ChatProps ): JSX.Element
	{
		
		let showUser: number = user.uid !== chat.chatUsers[0].uid ? 0 : 1, 
			showMessage: boolean = chat.messages.length !== 0;

		if (showMessage) {
			let messagesLength: number = chat.messages.length - 1;
			let lastMessage:Message = chat.messages[messagesLength ];
			let yourMessage:boolean = lastMessage.fromUser.uid  === user.uid;
			
			console.log(!lastMessage.isRead && !yourMessage);

			return	(
			<li
				onClick={onClick}
				class={liClass}
			>
				<img src={chat.chatUsers[showUser].photoURL} alt="avatar" class="avatar"/>
				<div class="chatInfo">	
					<p class="messageUser">{chat.chatUsers[showUser].name}</p>
					<p class="messagetime">{lastMessage.timestamp}</p>
					<div class={!lastMessage.isRead && !yourMessage ? "flag" : ""}></div>
					<p class="messageText">{yourMessage ? "you: " + lastMessage.text: "" + lastMessage.text}</p>
				</div>
			</li>);
		}
		else {
			return	(
			<li
				onClick={onClick}
				class={liClass}
			>
			<img src={chat.chatUsers[showUser].photoURL} alt="avatar" class="avatar"/>	
			<p class="messageUser">{chat.chatUsers[showUser].name}</p>
			</li>);
		}
	}
}

export {
	Chat as default,
	ChatProps,
	ChatState,
};
