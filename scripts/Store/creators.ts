import {User} from 'firebase/app';
import Actions, {Action} from './Actions';
import {StateUser, StateChat, StateCurrentChat} from './State';

function setChats( chats: StateChat[] ): Action
{
	return {
		type: Actions.SET_CHATS,
		payload: {chats},
	};
}

function setUsers( users: StateUser[]): Action
{
	return {
		type: Actions.SET_USERS,
		payload: {users},
	}
}

function setUser( user: User | null ): Action
{
	return {
		type: Actions.SET_USER,
		payload: {user},
	};
}

function setCurrentChat( currentChat: StateCurrentChat | null ): Action
{
	return {
		type: Actions.SET_CURRENT_CHAT,
		payload: {currentChat},
	};
}

export {
	setUser,
	setUsers,
	setChats,
	setCurrentChat,
};
