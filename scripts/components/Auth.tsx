import {User} from 'firebase/app';
import {h} from 'preact';
import {SubscribedComponent} from '../Store/index';
import State from '../Store/State';
import signIn from '../data/signIn';
import signOut from '../data/signOut';

/**
 * Component Properties.
 */
interface AuthProps
{
	// Empty
}

/**
 * Component State.
 */
interface AuthState
{
	user: User | null;
}

class Auth extends SubscribedComponent<State, AuthProps, AuthState>
{
	/**
	 * Render component.
	 */
	public render( _props: AuthProps, {user}: AuthState ): JSX.Element
	{
		console.log(this.state);

		return (
			<div class="auth">
				{
					user
					? [
						(
							<span className="name">
								{user.displayName}
							</span>
						),
						' ',
						(
							<button type="button"
								class="sign-out"
								onClick={signOut}
							>
								Sign out
							</button>
						),
					]
					: (
						<button type="button"
							class="sign-in"
							onClick={signIn}
						>
							Sign in with Google
						</button>
					)
				}
			</div>
		);
	}
	
	protected storeStateChanged( {user}: State ): void
	{
		if ( user === this.state.user )
		{
			return;
		}
		
		this.setState( {user} );
	}
}

/**
 * Module.
 */
export {
	Auth as default,
	AuthProps,
	AuthState,
};
