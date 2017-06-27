import {database} from 'firebase/app';

function getChatsRef(): database.Reference | null
{
	return database().ref( `/chats/` );
}

function getChatRef( chatId?: string ): database.Reference | null
{
	if ( !chatId )
	{
		return null;
	}

	return database().ref( `/chats/${chatId}` );
}

export {
	getChatsRef as default,
	getChatRef,
};
