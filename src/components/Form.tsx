import { useState } from 'react';
type Props = {
	createUserName: (inputText: string) => void;
};

export const Form: React.FC<Props> = ({ createUserName }) => {
	const [inputText, setInputText] = useState('');
	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				createUserName(inputText);
			}}
		>
			<label htmlFor='user-name'>Enter your name</label>
			<input
				type='text'
				id='user-name'
				onChange={(e) => setInputText(e.target.value)}
				value={inputText}
			/>
			<button>Ok</button>
		</form>
	);
};
