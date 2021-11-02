import React from 'react';
import axios from 'axios';
import { useToken } from './TokenContext';

const TodoContext = React.createContext();

export function TodoProvider({ children }) {
	const { decoded } = useToken();
	const [todos, setTodos] = React.useState(null);
	const [todoByName, setTodoByName] = React.useState(null);
	const [update, forceUpdate] = React.useState(false);
	const [sortStatus, setSortStatus] = React.useState(false);

	const sortByStatus = ({ todos }, byName) => {
		if (todos) {
			const filterByPending = todos.filter((e) => e.status === 'pendente');
			const filterByInProgress = todos.filter((e) => e.status === 'andamento');
			const filterByDone = todos.filter((e) => e.status === 'pronto');
			const objectFiltered = {
				todos: [...filterByPending, ...filterByInProgress, ...filterByDone],
			};
			if (sortStatus && !byName) setTodos(objectFiltered);
			if (sortStatus && byName) setTodoByName(objectFiltered);
		}
	};

	React.useEffect(() => {
		const fetchAllTodo = async () => {
			const result = await axios.get(`https://ebytr.herokuapp.com/todo`);
			const resultByName = await axios.get(
				`https://ebytr.herokuapp.com/todo/${decoded.data.name}`
			);
			setTodos(result.data);
			setTodoByName(resultByName.data);
			sortByStatus(result.data);
			sortByStatus(resultByName.data, true);
		};
		fetchAllTodo();
	}, [decoded, update, sortStatus]);

	return (
		<TodoContext.Provider
			value={{
				todos,
				todoByName,
				forceUpdate,
				update,
				setSortStatus,
				sortStatus,
			}}
		>
			{children}
		</TodoContext.Provider>
	);
}

export const useTodo = () => React.useContext(TodoContext);
