import React from 'react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import userEvent from '@testing-library/user-event';

describe('Page Login', () => {
	it('Teste se a página contém as labels para login', () => {
		const { container } = renderWithRouter(<App />, { route: '/login' });
		const labelLogin = container.querySelectorAll('label');
		expect(labelLogin.length).toBe(2);
		expect(labelLogin[0].textContent).toContain('Qual é o seu e-mail?');
		expect(labelLogin[1].textContent).toContain(
			'Informe sua senha, por favor.'
		);
	});

	it('Teste se é possível escrever no input', () => {
		const { container } = renderWithRouter(<App />, {
			route: '/login',
		});
		const inputName = container.querySelector('.input-login');
		userEvent.type(inputName, 'Jean');
		expect(inputName.value).toContain('Jean');
	});

	it('Teste se entrega erro ao entregar dados inválidos', async () => {
		const { container, findByText } = renderWithRouter(<App />, {
			route: '/login',
		});
		const buttonSubmit = container.querySelector('.submit-login');
		userEvent.click(buttonSubmit);
		const pRegister = await findByText(
			/Email ou senha inválidos ou usuário ainda não criado/i
		);
		expect(pRegister.innerHTML).toContain(
			'Email ou senha inválidos ou usuário ainda não criado'
		);
	});
});
