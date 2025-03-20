import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { DefaultEventsMap } from '@socket.io/component-emitter';
import { Room } from '../App';

type Props = {
	userName: string;
	rooms: Room[];
	socket: Socket<DefaultEventsMap, DefaultEventsMap>;
};
export const RoomList: React.FC<Props> = ({ userName, rooms, socket }) => {
	const joinRoom = (roomName: string) => {
		socket.emit('joinRoom', roomName, userName);
	};

	const isRoomFull = (numberOfPlayers: number, roomName: string) => {
		return numberOfPlayers < 2 ? (
			<button onClick={() => joinRoom(roomName)}>Join room</button>
		) : (
			<p>Room is full</p>
		);
	};
	return (
		<>
			{rooms.length === 0 && <p>Waiting for connection</p>}
			<ul>
				{rooms.map((room) => (
					<li>
						{room.name}: {room.numberOfPlayers}{' '}
						{isRoomFull(room.numberOfPlayers, room.name)}
					</li>
				))}{' '}
			</ul>
		</>
	);
};
