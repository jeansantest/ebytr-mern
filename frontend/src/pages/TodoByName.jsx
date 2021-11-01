import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import TodoCard from '../components/TodoCard';
import { useTodo } from '../contexts/TodoContext';
import Header from '../components/Header';
import '../components/styles/InputTodo.css';

function TodoByName() {
	const token = localStorage.getItem('token');
	const [name, setName] = React.useState('');
	const [data, setData] = React.useState(null);
	const { forceUpdate, update } = useTodo();

	const handleChange = ({ target }) => {
		const { value } = target;
		setName(value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const resultByName = await axios.get(
			`https://ebytr.herokuapp.com/todo/${name}`
		);
		setData(resultByName.data);
	};

	return (
		<div>
			<Header />
			<div className="div-todo">
				<form>
					<input
						className="input-todo"
						type="text"
						name="name"
						onChange={handleChange}
						value={name}
						placeholder="Procurar por algum nome"
					/>
					<button className="submit-login" type="submit" onClick={handleSubmit}>
						Procurar
					</button>
				</form>
			</div>
			{!token ? (
				<div className="divh1-home">
					<h1 className="h1-home">
						Você precisa estar logado para poder criar uma task.
					</h1>
					<Link to="/login">Clique aqui para fazer seu login</Link>
				</div>
			) : !data ? (
				<p style={{ textAlign: 'center' }}>Pesquise por algum nome...</p>
			) : data.todos.length > 0 ? (
				<div>
					<div className="divtodo-home">
						{data.todos.map((e, i) => (
							<TodoCard
								key={i}
								id={e._id}
								name={e.name}
								todo={e.todo}
								status={e.status}
								forceUpdate={forceUpdate}
								update={update}
							/>
						))}
					</div>
				</div>
			) : (
				<p style={{ textAlign: 'center' }}>Sem tasks no momento</p>
			)}
		</div>
	);
}

export default TodoByName;
