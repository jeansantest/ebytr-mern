import React from 'react';
import { useTodo } from '../contexts/TodoContext';

function ButtonSort() {
	const {
		setSortStatus,
		sortStatus,
		sortDate,
		setSortDate,
		sortTodoName,
		setSortTodoName,
	} = useTodo();

	return (
		<div className="div-todo">
			<button
				type="button"
				className="submit-login"
				onClick={() => setSortStatus(!sortStatus)}
			>
				Ordernar por status
			</button>
			<button
				type="button"
				className="submit-login"
				onClick={() => setSortDate(!sortDate)}
			>
				Ordernar por data
			</button>
			<button
				type="button"
				className="submit-login"
				onClick={() => setSortTodoName(!sortTodoName)}
			>
				Ordernar por ordem alfabética
			</button>
		</div>
	);
}

export default ButtonSort;
