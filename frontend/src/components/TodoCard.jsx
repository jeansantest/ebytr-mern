import React from 'react';

function TodoCard(props) {
	return (
		<div>
			<h4>{props.name}</h4>
			<p>{props.todo}</p>
			<p>{props.status}</p>
		</div>
	);
}

export default TodoCard;
