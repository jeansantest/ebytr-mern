import React from 'react';
import axios from 'axios';
import { useToken } from '../contexts/TokenContext';
import { Redirect } from 'react-router-dom';
import './styles/Login.css';

function Login() {
	const [data, setData] = React.useState({ email: '', password: '' });
	const [logged, setLogged] = React.useState(false);
	const { token, setToken } = useToken();

	const handleChange = ({ target }) => {
		const { name, value } = target;
		setData({ ...data, [name]: value });
	};

	const handleSubmit = async (e) => {
		try {
			e.preventDefault();
			const result = await axios.post(
				'https://ebytr.herokuapp.com/users/login',
				data
			);
			setToken(result.data.token);
			console.log(token);
		} catch (err) {
			setLogged('invalid');
		}
	};

	return (
		<div className="div-login">
			<div className="divh1-login">
				<h1 className="h1-login">Entre para continuar</h1>
			</div>
			<form className="form-login">
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
				{logged === 'invalid' &&
					'Email ou senha inválidos ou usuário ainda não criado'}
				<button type="submit" onClick={handleSubmit} className="submit-login">
					Entrar
				</button>
				{token && <Redirect to="/" />}
			</form>
		</div>
	);
}

export default Login;
