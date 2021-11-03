import React from 'react';
import InputTodo from '../components/InputTodo';
import renderWithRouter from '../renderWithRouter';
import userEvent from '@testing-library/user-event';

describe('Component InputTodo', () => {
	it('Teste se o componente faz as labels para home', () => {
		const { container } = renderWithRouter(<InputTodo />, { route: '/' });
		const input = container.querySelector('.input-todo');
		userEvent.type(input, 'Jean');
		expect(input.value).toContain('Jean');
		userEvent.click(container.querySelector('.submit-login'));
		expect(container.querySelector('.submit-login').innerHTML).toContain(
			'Adicionar'
		);
	});

	// it('Teste se é possível escrever no input', () => {
	// 	const { container } = renderWithRouter(<Login />, {
	// 		route: '/login',
	// 	});
	// 	const inputName = container.querySelector('.input-todo');
	// 	userEvent.type(inputName, 'Jean');
	// 	expect(inputName.value).toContain('Jean');
	// });

	// it('Teste se entrega erro ao entregar dados inválidos', async () => {
	// 	const { container, findByText } = renderWithRouter(<Login />, {
	// 		route: '/login',
	// 	});
	// 	const buttonSubmit = container.querySelector('.submit-login');
	// 	userEvent.click(buttonSubmit);
	// 	const pRegister = await findByText(
	// 		/Email ou senha inválidos ou usuário ainda não criado/i
	// 	);
	// 	expect(pRegister.innerHTML).toContain(
	// 		'Email ou senha inválidos ou usuário ainda não criado'
	// 	);
	// });
});
