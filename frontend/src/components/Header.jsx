import React from 'react';
import { Link } from 'react-router-dom';
import { useToken } from '../contexts/TokenContext';
import './styles/Header.css';

function Header() {
	const { setToken } = useToken();
	const token = localStorage.getItem('token');

	const handleLogout = () => {
		localStorage.removeItem('token');
		setToken('');
	};

	return (
		<header className="header">
			<Link to="/">Minha Todo List</Link>
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
