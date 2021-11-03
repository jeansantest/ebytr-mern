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
});
