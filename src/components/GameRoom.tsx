import { useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';
import { DefaultEventsMap } from '@socket.io/component-emitter';

type Props = {
	roomName: string;
	socket: Socket<DefaultEventsMap, DefaultEventsMap>;
	userName: string;
};

export const GameRoom: React.FC<Props> = ({ roomName, socket, userName }) => {
	const [opponent, setOpponent] = useState<string | undefined>(undefined);
	useEffect(() => {
		socket.on('full-room', (players: string[]) => {
			const opponent = players.find((player) => player !== userName);
			setOpponent(opponent);
		});
	}, []);
	return (
		<>
			<h1>{roomName}</h1>
			{opponent ? (
				<p>Your opponent is {opponent}</p>
			) : (
				<p>You are waiting for another player</p>
			)}
		</>
	);
};
