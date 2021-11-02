import React from 'react';
import { useTodo } from '../contexts/TodoContext';

function ButtonSort() {
	const { setSortStatus, sortStatus } = useTodo();

	return (
		<div>
			<button type="button" onClick={() => setSortStatus(!sortStatus)}>
				Ordernar por status
			</button>
		</div>
	);
}

export default ButtonSort;
