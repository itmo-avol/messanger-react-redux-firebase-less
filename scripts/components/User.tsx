import {Component, h} from 'preact';

interface UserProps
{
	name: string;
	photoURL: string;
	onClick(): void;
}

type UserState = object;

class User extends Component<UserProps, UserState>
{
	public render( {onClick, name, photoURL}: UserProps ): JSX.Element
	{
		return (
			<li
				onClick={onClick}
			>
				<img src={photoURL} alt="avatar" class="avatar"/>	
                <p class="userName">{name}</p>
			</li>
		);
	}
}

export {
	User as default,
	UserProps,
	UserState,
};
