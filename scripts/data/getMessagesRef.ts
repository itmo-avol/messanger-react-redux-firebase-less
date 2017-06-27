import {database} from 'firebase/app';

function getMessagesRef( chatId?: string ): database.Reference | null
{
	if ( !chatId )
	{
		return null;
	}

	return database().ref( `/chats/${chatId}/messages` );
}

export {
	getMessagesRef as default,
	getMessagesRef,
};
