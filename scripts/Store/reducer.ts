import {User} from 'firebase/app';
import {combineReducers} from 'small-redux';
import Actions, {Action} from './Actions';
import State, {StateUser, StateChat, StateCurrentChat} from './State';


const initialState: State = {
	user: null,
	users: [],
	chats: [],
	currentChat: {id: ''},
};

function user(
	state: User | null = initialState.user,
	action: Action,
): User | null
{
	switch ( action.type )
	{
		case Actions.SET_USER:
			return action.payload.user;
		
		default:
			return state;
	}
}

function users(
	state: StateUser[] = initialState.users,
	action: Action,
): StateUser[]
{
	switch ( action.type )
	{
		case Actions.SET_USERS:
			return action.payload.users;
		
		default:
			return state;
	}
}

function chats(
	state: StateChat[] = initialState.chats,
	action: Action,)
{
	switch ( action.type )
	{
		case Actions.SET_CHATS:
			return action.payload.chats;
		
		default:
			return state;
	}
}

function currentChat(
	state: StateCurrentChat = initialState.currentChat,
	action: Action,)
{
	switch ( action.type )
	{
		case Actions.SET_CURRENT_CHAT:
			return action.payload.currentChat;
		
		default:
			return state;
	}
}

const reducer = combineReducers<State, Action>(
	{
		user,
		users,
		chats,
		currentChat
	},
);

/**
 * Module.
 */
export {
	reducer as default,
};
