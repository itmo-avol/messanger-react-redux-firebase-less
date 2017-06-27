import * as Firebase from 'firebase/app';
import {setUser, setUsers, setChats, setCurrentChat} from '../Store/creators';
import {dispatch} from '../Store/index';
import getUsersRef from './getUsersRef';
import getChatsRef from './getChatsRef';
import {database} from 'firebase/app';
import {StateUser, StateChat} from '../Store/State';

function subscribe(): void
{
	Firebase.auth().onAuthStateChanged(
		( user: Firebase.User | null ) =>
		{
			if ( user )
			{
				subscribeToUsers( user.uid );
				subscribeToChats( user.uid );
				
				database().ref( `/users/${user.uid}/` ).update({
					photoURL: user.photoURL,
					name: user.displayName,
				});
			}
			else
			{
				unsubscribeFromUsers();
				unsubscribeFromChats();
				dispatch ( setCurrentChat({id: ''}) );
			}
			

			dispatch( setUser( user ) );
		}
	);
}

function subscribeToUsers( uid: string ): void
{
	const usersRef = getUsersRef( );

	if (usersRef === null)
		return;
	
	usersRef.on(
		'value',
		( snapshot ) =>
		{
			const value = (
				snapshot
				? snapshot.val()
				: null
			);
			
			if ( !value )
			{
				dispatch( setUsers( [] ) );
				return;
			}
			
			const keys = Object.keys( value );
			const users: StateUser[] = [];
			
			for ( const key of keys )
			{
				const {photoURL, name} = value[key] as StateUser;
				
				if ( uid !== key)
				{
					users.push(
						{
							uid: key,
							photoURL,
							name,
						},
					);
				}
			}
			
			dispatch( setUsers( users ) );
		},
	);
}

function subscribeToChats( uid: string ): void
{
	const chatsRef = getChatsRef(  );
	
	if (chatsRef === null)
		return;

	chatsRef.on(
		'value',
		( snapshot ) =>
		{
			const value = (
				snapshot
				? snapshot.val()
				: null
			);
			
			if ( !value )
			{
				dispatch( setChats( [] ) );
				return;
			}
			
			const keys = Object.keys( value );
			const chats: StateChat[] = [];
			
			for ( const key of keys )
			{
				const {chatUsers, messages} = value[key] as StateChat;

				let arrayOfMessages = messages === undefined || messages === null ? [] : Object.keys(messages).map(key => messages[key]);
				
				if ( [].concat.apply( [], chatUsers.map( ( user: StateUser ) => (user.uid)  ) )
					
					.includes(uid) )
				{
					chats.push(
						{
							id: key,
							chatUsers,
							messages: arrayOfMessages,
						},
					);
				}
			}
			
			dispatch( setChats( chats ) );
		},
	);
}

function unsubscribeFromUsers(): void
{
	const usersRef = getUsersRef();
	
	usersRef && usersRef.off();

	dispatch( setUsers( [] ) );
}

function unsubscribeFromChats(): void
{
	const chatsRef = getChatsRef();
	
	chatsRef && chatsRef.off();

	dispatch( setChats( [] ) );
}

/**
 * Module.
 */
export {
	subscribe as default,
};
