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
		<div>
			<button type="button" onClick={() => setSortStatus(!sortStatus)}>
				Ordernar por status
			</button>
			<button type="button" onClick={() => setSortDate(!sortDate)}>
				Ordernar por data
			</button>
			<button type="button" onClick={() => setSortTodoName(!sortTodoName)}>
				Ordernar por ordem alfabética
			</button>
		</div>
	);
}

export default ButtonSort;
