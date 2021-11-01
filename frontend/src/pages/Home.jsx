import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import TodoCard from '../components/TodoCard';
import InputTodo from '../components/InputTodo';
import { useTodo } from '../contexts/TodoContext';
import './styles/Home.css';

function Home() {
	const token = localStorage.getItem('token');
	const { todoByName, update, forceUpdate } = useTodo();

	return (
		<div>
			<Header />
			{!token ? (
				<div className="divh1-home">
					<h1 className="h1-home">
						Você precisa estar logado para poder criar uma task.
					</h1>
					<Link to="/login">Clique aqui para fazer seu login</Link>
				</div>
			) : !todoByName ? (
				'Carregando'
			) : todoByName.todos.length > 0 ? (
				<div>
					<InputTodo forceUpdate={forceUpdate} update={update} />
					<div className="divtodo-home">
						{todoByName.todos.map((e, i) => (
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
				<div>
					<InputTodo forceUpdate={forceUpdate} update={update} />
					Sem tasks no momento
				</div>
			)}
		</div>
	);
}

export default Home;
