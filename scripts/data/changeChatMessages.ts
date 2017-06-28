import {Message} from '../Store/State';
import {getChatRef} from './getChatsRef';

function changeChatMessages( chatId: string, messages:Message[]): void
{

	const chatRef = getChatRef( chatId );

    if ( !chatRef )
    {
        return;
    }
	
	chatRef.update( {messages: messages} );
}

export {
	changeChatMessages as default,
    changeChatMessages
};
