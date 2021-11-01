import React from 'react';
import Header from '../components/Header';
import { Link } from 'react-router-dom';
import './styles/Home.css';

function Home() {
	const token = localStorage.getItem('token');
	return (
		<div>
			<Header />
			{!token ? (
				<div className="divh1-home">
					<h1 className="h1-home">
						Você precisa estar logado para poder criar uma task.
					</h1>
					<Link to="/login">Clique aqui para fazer seu login</Link>
				</div>
			) : (
				token
			)}
		</div>
	);
}

export default Home;
