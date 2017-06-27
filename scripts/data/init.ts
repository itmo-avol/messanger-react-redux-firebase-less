import * as Firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
	apiKey: "AIzaSyDiKa2XmqWveW3iCI0Xs4mBMoZET2MMrcE",
    authDomain: "fir-198e1.firebaseapp.com",
    databaseURL: "https://fir-198e1.firebaseio.com",
    projectId: "fir-198e1",
    storageBucket: "fir-198e1.appspot.com",
    messagingSenderId: "518679887092"
};

Firebase.initializeApp( config );
