import { useEffect, useState } from 'react';
import './App.css';
import { RoomList } from './components/RoomList';
import { Form } from './components/Form';
import { io } from 'socket.io-client';
const socket = io('http://localhost:3000');
export type Room = {
	name: string;
	numberOfPlayers: number;
};

function App() {
	const [userName, setUserName] = useState('');
	const [rooms, setRooms] = useState<Room[]>([]);

	const createUserName = (inputText: string) => {
		if (inputText.length < 3) return;
		setUserName(inputText);
	};

	useEffect(() => {
		sessionStorage.setItem('username', userName);
	}, [userName]);

	useEffect(() => {
		socket.on('updateRooms', (updatedRooms) => {
			setRooms(updatedRooms);
		});

		return () => {
			socket.off('updateRooms');
		};
	}, []);

	return (
		<>
			{userName === '' ? (
				<Form createUserName={createUserName} />
			) : (
				<RoomList userName={userName} rooms={rooms} socket={socket} />
			)}
		</>
	);
}

export default App;
