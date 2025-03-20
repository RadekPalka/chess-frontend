import { useEffect, useState } from 'react';
import './App.css';
import { RoomList } from './components/RoomList';
import { Form } from './components/Form';

function App() {
	const [userName, setUserName] = useState('');

	const createUserName = (inputText: string) => {
		if (inputText.length < 3) return;
		setUserName(inputText);
	};

	useEffect(() => {
		sessionStorage.setItem('username', userName);
	}, [userName]);

	return (
		<>{userName === '' ? <Form createUserName={createUserName} /> : <RoomList />}</>
	);
}

export default App;
