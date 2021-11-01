import React from 'react';

const TodoContext = React.createContext();

export function TodoProvider({ children }) {
	const [todos, setTodos] = React.useState({});

	return (
		<TokenContext.Provider value={{ todos, setTodos }}>
			{children}
		</TokenContext.Provider>
	);
}

export const useTodo = () => React.useContext(TodoContext);
