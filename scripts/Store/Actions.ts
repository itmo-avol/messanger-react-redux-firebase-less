import {Action as BaseAction} from 'small-redux';

const Actions = {
	SET_USER: 'SET_USER' as 'SET_USER',
	SET_USERS: 'SET_USERS' as 'SET_USERS',
	SET_CHATS: 'SET_CHATS' as 'SET_CHATS',
	SET_CURRENT_CHAT: 'SET_CURRENT_CHAT' as 'SET_CURRENT_CHAT',
};

interface Action extends BaseAction
{
	type: keyof typeof Actions;
	payload: any;
}

export {
	Actions as default,
	Action,
};
