import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { useTodo } from '../contexts/TodoContext';
import TodoCard from '../components/TodoCard';
import ButtonSort from '../components/ButtonSort';

function AllTodos() {
	const token = localStorage.getItem('token');
	const { todos, forceUpdate, update } = useTodo();

	return (
		<div>
			<Header />
			{!token ? (
				<div className="divh1-home">
					<h1 className="h1-home">
						Você precisa estar logado para poder ver todas as tasks.
					</h1>
					<Link to="/login">Clique aqui para fazer seu login</Link>
				</div>
			) : !todos ? (
				<p style={{ textAlign: 'center' }}>Carregando</p>
			) : (
				<div>
					<ButtonSort />
					<div className="divtodo-home">
						{todos.todos.map((e, i) => (
							<TodoCard
								key={i}
								id={e._id}
								name={e.name}
								todo={e.todo}
								status={e.status}
								createdAt={e.createdAt}
								forceUpdate={forceUpdate}
								update={update}
							/>
						))}
					</div>
				</div>
			)}
		</div>
	);
}

export default AllTodos;
