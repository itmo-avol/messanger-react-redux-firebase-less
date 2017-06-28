import {Component, h} from 'preact';

interface MessageProps
{
	userName:string;
	timestamp:string;
	text:string;
	yourMessage:boolean;
	isRead: boolean;
}

type MessageState = object;

class Message extends Component<MessageProps, MessageState>
{
	public render( {userName, timestamp, text, yourMessage, isRead}: MessageProps ): JSX.Element
	{
		return (
			<li class={yourMessage ? "yourMessage" : ""}>
				<p class="messageUser">{userName}</p>
				<p class="messagetime">{timestamp}</p>
				<div class={!isRead && yourMessage ? "flag" : ""}></div>
				<p class="messageText">{text}</p>
			</li>
		);
	}
}

export {
	Message as default,
	MessageProps,
	MessageState,
};
