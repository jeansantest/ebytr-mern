import React from 'react';
import axios from 'axios';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';
import './styles/TodoCard.css';

function TodoCard(props) {
	const token = localStorage.getItem('token');
	const [toEdit, setToEdit] = React.useState(false);
	const [todo, setTodo] = React.useState('');
	const [status, setStatus] = React.useState('');

	const handleEdit = () => {
		setToEdit(!toEdit);
		setTodo(props.todo);
	};

	const handleChange = ({ target }) => {
		setTodo(target.value);
	};

	const editTodo = async () => {
		try {
			await axios.put(
				`https://ebytr.herokuapp.com/todo/${props.id}`,
				{ todo },
				{ headers: { Authorization: token } }
			);
			props.forceUpdate(!props.update);
			setToEdit(!toEdit);
		} catch (err) {
			setToEdit(!toEdit);
		}
	};

	const deleteTodo = async () => {
		await axios.delete(`https://ebytr.herokuapp.com/todo/${props.id}`, {
			headers: { Authorization: token },
		});
		props.forceUpdate(!props.update);
	};

	const editStatus = async () => {
		let endpoint;
		if (props.status === 'pendente') {
			endpoint = `https://ebytr.herokuapp.com/todo/${props.id}/andamento`;
		} else if (props.status === 'andamento') {
			endpoint = `https://ebytr.herokuapp.com/todo/${props.id}/pronto`;
		} else {
			endpoint = `https://ebytr.herokuapp.com/todo/${props.id}/pendente`;
		}
		await axios.put(endpoint, {}, { headers: { Authorization: token } });
		props.forceUpdate(!props.update);
	};

	React.useEffect(() => {
		const statusFormated = () => {
			switch (props.status) {
				case 'pendente':
					setStatus('Pendente');
					break;
				case 'andamento':
					setStatus('Em andamento');
					break;
				case 'pronto':
					setStatus('Feita');
					break;
				default:
					console.log('Erro: Nenhum status');
			}
		};
		statusFormated();
	}, [status, props.status]);

	return (
		<div className="div-card">
			<h4>{props.name}</h4>
			{toEdit ? (
				<div className="edit-card">
					<input
						className="input-card"
						type="text"
						name="todo"
						onChange={handleChange}
						value={todo}
					/>
					<FaEdit style={{ cursor: 'pointer' }} onClick={editTodo}>
						Editar
					</FaEdit>
				</div>
			) : (
				<p>{props.todo}</p>
			)}
			<p>
				<span onClick={editStatus} className={`bola ${props.status}`} />
				{status}
			</p>
			<div>
				<FaTrashAlt style={{ cursor: 'pointer' }} onClick={deleteTodo} />

				<FaEdit
					style={{ cursor: 'pointer', marginLeft: '20px' }}
					onClick={handleEdit}
				/>
			</div>
		</div>
	);
}

export default TodoCard;
