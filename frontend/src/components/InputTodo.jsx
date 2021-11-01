import React from 'react';
import axios from 'axios';

function InputTodo({ forceUpdate, update }) {
	const [todo, setTodo] = React.useState('');

	const token = localStorage.getItem('token');

	const handleChange = ({ target }) => {
		setTodo(target.value);
	};

	const handleSubmit = async (e) => {
		try {
			e.preventDefault();
			await axios.post(
				'https://ebytr.herokuapp.com/todo',
				{
					todo,
				},
				{ headers: { Authorization: token } }
			);
			forceUpdate(!update);
		} catch (err) {
			console.log(err.message);
		}
	};

	return (
		<div>
			<form>
				<input type="text" name="todo" onChange={handleChange} value={todo} />
				<button type="submit" onClick={handleSubmit}>
					Adicionar
				</button>
			</form>
		</div>
	);
}

export default InputTodo;
