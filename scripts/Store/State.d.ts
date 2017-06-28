import {User} from 'firebase/app';

interface State
{
	user: User | null;
	users: StateUser[];
	chats: StateChat[];
	currentChat: StateCurrentChat;
}

interface StateChat
{
	id: string;
	chatUsers: StateUser[],
	messages: Message[],
}

interface StateUser
{
	uid: string;
	photoURL: string;
	name: string;
}

interface Message
{
	text: string;
	timestamp: string;
	fromUser: StateUser;
	isRead: boolean;
}

interface StateCurrentChat 
{
	id: string;
}

export {
	State as default,
	StateUser,
	StateChat,
	Message,
	StateCurrentChat,
};
