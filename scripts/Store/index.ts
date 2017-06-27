import createSubscribedComponent from 'preact-small-redux';
import {createStore} from 'small-redux';
import reducer from './reducer';

/**
 * A Redux store that lets you read the state, dispatch actions
 * and subscribe to changes.
 */
const store = createStore( reducer );

/**
 * Dispatches an action. It is the only way to trigger a state change.
 * 
 * @param action A plain object representing “what changed”.
 */
const dispatch = store.dispatch;

/**
 * Adds a change listener. It will be called any time an action is
 * dispatched, and some part of the state tree may potentially have changed.
 * You may then call `getState()` to read the current state tree inside the
 * callback.
 * 
 * @param listener A callback to be invoked on every dispatch.
 * @returns A function to remove this change listener.
 */
const subscribe = store.subscribe;

/**
 * Reads the state tree managed by the store.
 * 
 * @returns The current state tree of your application.
 */
const getState = store.getState;

/**
 * Abstract Class of Component with subscription to Store changes.
 */
// tslint:disable-next-line:variable-name
const SubscribedComponent = createSubscribedComponent( store );

/**
 * Module
 */
export {
	store as default,
	dispatch,
	subscribe,
	getState,
	SubscribedComponent,
};
