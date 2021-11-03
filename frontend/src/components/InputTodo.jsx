import React from 'react';
import axios from 'axios';
import './styles/InputTodo.css';

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
			return err.message;
		}
	};

	return (
		<div className="div-todo">
			<form>
				<input
					className="input-todo"
					type="text"
					name="todo"
					onChange={handleChange}
					value={todo}
					placeholder="Adicionar uma nova task"
				/>
				<button className="submit-login" type="submit" onClick={handleSubmit}>
					Adicionar
				</button>
			</form>
		</div>
	);
}

export default InputTodo;
