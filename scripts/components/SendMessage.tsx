import {h} from 'preact';
import {SubscribedComponent} from '../Store/index';
import State, {StateCurrentChat} from '../Store/State';
import {User} from 'firebase/app';
import {SendTextMessage} from '../data/SendTextMessage';

type SendMessageProps = object;

interface SendMessageState
{
	user: User | null;
	currentChat: StateCurrentChat; 
}

class SendMessage extends SubscribedComponent<State, SendMessageProps, SendMessageState>
{
	private input: HTMLInputElement;

	public render(): JSX.Element
	{
		const {currentChat} = this.state;

		return (
			currentChat.id !== ''
			?
			(
				<form 
						action=''
						onSubmit={this.onSubmit}>
					<input
						ref={this.refInput}
					/>
					<button
						type="submit"
					>
						Send
					</button>
				</form>
			)
			:
			(
				<div></div>
			)
		);
	}

	private refInput = ( element: HTMLInputElement ): void =>
	{
		this.input = element;
	}
	
	private onSubmit = ( event ): boolean =>
	{
		event.preventDefault();
		
		if ( this.input.value !== "" )
			SendTextMessage( this.state.currentChat, this.input.value, this.state.user );
		
		this.input.value = '';
		return false;
	}
	
	protected storeStateChanged( {user, currentChat}: State ): void
	{
		if (
			( user === this.state.user )
			&& ( currentChat === this.state.currentChat )
		)
		{
			return;
		}
		
		this.setState( {user, currentChat} );
	}
}

export {
	SendMessage as default,
	SendMessageProps,
	SendMessageState,
};
