import React from 'react';
import Header from '../components/Header';
import { useTodo } from '../contexts/TodoContext';
import TodoCard from '../components/TodoCard';

function AllTodos() {
	const { todos, forceUpdate, update } = useTodo();

	return (
		<div>
			<Header />
			{!todos ? (
				'Carregando'
			) : (
				<div className="divtodo-home">
					{todos.todos.map((e, i) => (
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
			)}
		</div>
	);
}

export default AllTodos;
