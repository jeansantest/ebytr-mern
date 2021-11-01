import React from 'react';
import axios from 'axios';
import { useToken } from './TokenContext';

const TodoContext = React.createContext();

export function TodoProvider({ children }) {
	const { decoded } = useToken();
	const [todos, setTodos] = React.useState(null);
	const [todoByName, setTodoByName] = React.useState(null);
	const [update, forceUpdate] = React.useState(false);

	React.useEffect(() => {
		const fetchAllTodo = async () => {
			const result = await axios.get(`https://ebytr.herokuapp.com/todo`);
			const resultByName = await axios.get(
				`https://ebytr.herokuapp.com/todo/${decoded.data.name}`
			);
			setTodos(result.data);
			setTodoByName(resultByName.data);
		};
		fetchAllTodo();
	}, [decoded, update]);

	return (
		<TodoContext.Provider value={{ todos, todoByName, forceUpdate, update }}>
			{children}
		</TodoContext.Provider>
	);
}

export const useTodo = () => React.useContext(TodoContext);
