import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { DefaultEventsMap } from '@socket.io/component-emitter';
import { Room } from '../App';

type Props = {
	userName: string;
	rooms: Room[];
	socket: Socket<DefaultEventsMap, DefaultEventsMap>;
	setChosenRoomName: React.Dispatch<React.SetStateAction<string>>;
};
export const RoomList: React.FC<Props> = ({
	userName,
	rooms,
	socket,
	setChosenRoomName,
}) => {
	const joinRoom = (roomName: string) => {
		socket.emit('joinRoom', roomName, userName);
		sessionStorage.setItem('room-name', roomName);
		setChosenRoomName(roomName);
	};

	const isRoomFull = (numberOfPlayers: number, roomName: string) => {
		return numberOfPlayers < 2 ? (
			<button onClick={() => joinRoom(roomName)}>Join room</button>
		) : (
			<p>Room is full</p>
		);
	};
	console.log(rooms);
	return (
		<>
			{rooms.length === 0 && <p>Waiting for connection</p>}
			<ul>
				{rooms.map((room) => (
					<li key={room.name}>
						{room.name}: {room.numberOfPlayers}{' '}
						{isRoomFull(room.numberOfPlayers, room.name)}
					</li>
				))}{' '}
			</ul>
		</>
	);
};
