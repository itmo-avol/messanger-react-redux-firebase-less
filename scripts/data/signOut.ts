import * as Firebase from 'firebase/app';

function signOut(): void
{
	Firebase.auth().signOut();
}

export {
	signOut as default,
};
