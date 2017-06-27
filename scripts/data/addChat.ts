import {StateChat} from '../Store/State';
import getChatsRef from './getChatsRef';
import {getUserRef} from './getUsersRef';

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
          var item1 = snapshot1.val();

		  otherUserRef.once("value", function(snapshot2) {
				var item2 = snapshot2.val();

				chatsRef.push()
				.set(
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
			});
        });
}

export {
	addChat as default,
    addChat
};
