import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import './styles/Login.css';
import Header from '../components/Header';

function Register() {
	const [data, setData] = React.useState({ name: '', email: '', password: '' });
	const [registered, setRegistered] = React.useState(false);
	const token = localStorage.getItem('token');

	const handleChange = ({ target }) => {
		const { name, value } = target;
		setData({ ...data, [name]: value });
	};

	const handleSubmit = async (e) => {
		try {
			e.preventDefault();
			await axios.post('https://ebytr.herokuapp.com/users/signup', data);
			alert('Conta criada com sucesso');
			setRegistered('registered');
		} catch (err) {
			setRegistered('invalid');
		}
	};

	return (
		<div>
			<Header />
			<div className="div-login">
				<div className="divh1-login">
					<h1 className="h1-login">Registre-se para criar suas tasks</h1>
				</div>
				<form className="form-login">
					<label htmlFor="name">Qual é o seu nome?</label>
					<input
						type="text"
						name="name"
						onChange={handleChange}
						value={data.name}
						placeholder="Ex.: johndoe (deve ser único)"
						className="input-login"
					/>
					<label htmlFor="email">Qual é o seu e-mail?</label>
					<input
						type="text"
						name="email"
						onChange={handleChange}
						value={data.email}
						placeholder="Ex.: john.doe@gmail.com"
						className="input-login"
					/>
					<label htmlFor="password">Informe sua senha, por favor.</label>
					<input
						type="password"
						name="password"
						onChange={handleChange}
						value={data.password}
						placeholder="Sua senha"
						className="input-login"
					/>
					{registered === 'invalid' && (
						<p>Nome, email ou senha inválidos ou usuário já criado</p>
					)}
					<button type="submit" onClick={handleSubmit} className="submit-login">
						Registrar
					</button>
					{registered === 'registered' && <Redirect to="/login" />}
					{token && <Redirect to="/" />}
				</form>
			</div>
		</div>
	);
}

export default Register;
