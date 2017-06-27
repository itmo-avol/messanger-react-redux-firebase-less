import {database} from 'firebase/app';

function getUsersRef(): database.Reference | null
{
	return database().ref( `/users` );
}

function getUserRef( uid?: string ): database.Reference | null
{
	if ( !uid )
	{
		return null;
	}

	return database().ref( `/users/${uid}` );
}

export {
	getUsersRef as default,
	getUserRef,
};
