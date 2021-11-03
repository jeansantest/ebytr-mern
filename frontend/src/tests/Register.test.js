import React from 'react';
import Register from '../pages/Register';
import renderWithRouter from '../renderWithRouter';
import userEvent from '@testing-library/user-event';

describe('Page Register', () => {
	it('Teste se a página contém as labels de registro', () => {
		const { container } = renderWithRouter(<Register />, { route: '/signup' });
		const labelRegister = container.querySelectorAll('label');
		expect(labelRegister.length).toBe(3);
		expect(labelRegister[0].textContent).toContain('Qual é o seu nome?');
		expect(labelRegister[1].textContent).toContain('Qual é o seu e-mail?');
	});

	it('Teste se é possível escrever no input', () => {
		const { container } = renderWithRouter(<Register />, {
			route: '/signup',
		});
		const inputName = container.querySelector('.input-login');
		userEvent.type(inputName, 'Jean');
		expect(inputName.value).toContain('Jean');
	});

	it('Teste se entrega erro ao entregar dados inválidos', async () => {
		const { container, findByText } = renderWithRouter(<Register />, {
			route: '/signup',
		});
		const buttonSubmit = container.querySelector('.submit-login');
		userEvent.click(buttonSubmit);
		const pRegister = await findByText(
			/Nome, email ou senha inválidos ou usuário já criado/i
		);
		expect(pRegister.innerHTML).toBe(
			'Nome, email ou senha inválidos ou usuário já criado'
		);
	});
});
