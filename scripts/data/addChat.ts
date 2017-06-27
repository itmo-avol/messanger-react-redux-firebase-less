import {StateChat} from '../Store/State';
import getChatsRef from './getChatsRef';
import {getUserRef} from './getUsersRef';
import {setCurrentChat} from '../Store/creators';
import {dispatch} from '../Store/index';

function addChat( currentUserId: string, otherUserId:string ): void
{
	const chatsRef = getChatsRef();
	const currentUserRef = getUserRef( currentUserId );
	const otherUserRef = getUserRef( otherUserId );

    if ( !chatsRef || !currentUserRef || !otherUserRef)
    {
        return;
    }
	
	currentUserRef.once("value", function(snapshot1) {
          const item1 = snapshot1.val();

		  otherUserRef.once("value", function(snapshot2) {
				const item2 = snapshot2.val();
				const newChatRef = chatsRef.push();
				newChatRef.set(
					{
						chatUsers: [
							{
								uid: currentUserId,
								...item1,
							}, 
							{
								uid: otherUserId,
								...item2,
							}, 
						],
						messages : [],
					} as Partial<StateChat>,
				);

				const id:string = newChatRef.key !== null ? newChatRef.key : "";
				dispatch( setCurrentChat( {id} ) );	
			});
        });
}

export {
	addChat as default,
    addChat
};
