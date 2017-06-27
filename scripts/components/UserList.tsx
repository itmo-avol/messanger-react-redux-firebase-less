import {h} from 'preact';
import {SubscribedComponent} from '../Store/index';
import State, {StateUser, StateChat} from '../Store/State';
import {User} from 'firebase/app';
import {addChat} from '../data/addChat';

type UserListProps = object;

interface UserListState
{
	user: User | null;
	users: StateUser[];
	chats: StateChat[];
}

class UserList extends SubscribedComponent<State, UserListProps, UserListState>
{
	public render(): JSX.Element
	{
		const {user} = this.state;

		const filterUsers = this.filterUsers();

		if (!user || filterUsers.length === 0) 
			return <div> </div>;

		return (
			<ul class="userList">
				<p class="header">Контакты</p>
				{
					filterUsers.map(
						( client: StateUser ) => (
							<li
								onClick={() => this.onUserClick( user === null ? '' : user.uid, client.uid )}
							> 
								<img src={client.photoURL} alt="avatar" class="avatar"/>	
								<p class="userName">{client.name}</p>

							</li>
						),
					)
				}
			</ul>
		);
	}

	private filterUsers = (  ): StateUser[] =>
	{
		const {user, users, chats} = this.state;

		const filterUsers = users.filter (
			( client: StateUser ) => (
				user !== null 
				&& client.uid !== user.uid 
				/* которых нет в других чатах */
				&& ! [].concat.apply([], chats.map( 
						( chat: StateChat ) => (chat.chatUsers) 
					))
					.map( ( user: StateUser ) => (user.uid)  )
					.includes(client.uid)
			)
		);

		return filterUsers;
	}
	
	protected storeStateChanged( {user, users, chats}: State ): void
	{
		if (
			( user === this.state.user )
			&& ( users === this.state.users )
			&& ( chats === this.state.chats )
		)
		{
			return;
		}
		
		this.setState( {user, users, chats} );
	}
	
	private onUserClick = ( currentUserId:string, otherUserId: string ): void =>
	{
		addChat( currentUserId , otherUserId );
	}
}

export {
	UserList as default,
	UserListProps,
	UserListState
};
