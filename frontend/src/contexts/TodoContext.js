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
	const [sortDate, setSortDate] = React.useState(false);
	const [sortTodoName, setSortTodoName] = React.useState(false);

	const sortByStatus = ({ todos }, byName) => {
		if (todos) {
			const filterByPending = todos.filter((e) => e.status === 'pendente');
			const filterByInProgress = todos.filter((e) => e.status === 'andamento');
			const filterByDone = todos.filter((e) => e.status === 'pronto');
			const objectFiltered = {
				todos: [...filterByPending, ...filterByInProgress, ...filterByDone],
			};
			if (sortStatus && !byName) {
				setSortTodoName(false);
				setSortDate(false);
				setTodos(objectFiltered);
			}
			if (sortStatus && byName) {
				setSortDate(false);
				setTodoByName(objectFiltered);
			}
		}
	};

	const sortByDate = ({ todos }, byName) => {
		if (todos) {
			const filterByDate = todos.sort(
				(a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt)
			);
			console.log(filterByDate);
			if (sortDate && !byName) {
				setSortTodoName(false);
				setSortStatus(false);
				setTodos({ todos: filterByDate });
			}
			if (sortDate && byName) {
				setSortStatus(false);
				setTodoByName({ todos: filterByDate });
			}
		}
	};

	const sortByTodoName = ({ todos }, byName) => {
		if (todos) {
			const filterByTodoName = todos.sort((a, b) => {
				let x = a.todo.toUpperCase();
				let y = b.todo.toUpperCase();
				return x === y ? 0 : x > y ? 1 : -1;
			});
			console.log(filterByTodoName);
			if (sortTodoName && !byName) {
				setSortDate(false);
				setSortStatus(false);
				setTodos({ todos: filterByTodoName });
			}
			if (sortTodoName && byName) {
				setSortDate(false);
				setSortStatus(false);
				setTodoByName({ todos: filterByTodoName });
			}
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
			sortByDate(result.data);
			sortByDate(resultByName.data, true);
			sortByTodoName(result.data);
			sortByTodoName(resultByName.data, true);
			sortByStatus(result.data);
			sortByStatus(resultByName.data, true);
		};
		fetchAllTodo();
	}, [decoded, update, sortStatus, sortDate, sortTodoName]);

	return (
		<TodoContext.Provider
			value={{
				todos,
				todoByName,
				forceUpdate,
				update,
				setSortStatus,
				sortStatus,
				sortDate,
				setSortDate,
				sortTodoName,
				setSortTodoName,
			}}
		>
			{children}
		</TodoContext.Provider>
	);
}

export const useTodo = () => React.useContext(TodoContext);
