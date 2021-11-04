import React from 'react';
import { Link } from 'react-router-dom';
import { useToken } from '../contexts/TokenContext';
import './styles/Header.css';

function Header() {
	const token = localStorage.getItem('token');
	const { setLogged } = useToken();

	const handleLogout = () => {
		localStorage.removeItem('token');
		setLogged(false);
	};

	return (
		<header className="header">
			<div>
				<Link to="/">Minha Todo List</Link>
				<Link to="/all-tasks">Todas as todo lists</Link>
				<Link to="/search">Todo list por nome</Link>
			</div>
			{!token ? (
				<div>
					<Link to="/login">Logar</Link>
					<Link to="/signup">Registrar</Link>
				</div>
			) : (
				<Link to="/" onClick={handleLogout}>
					Deslogar
				</Link>
			)}
		</header>
	);
}

export default Header;
